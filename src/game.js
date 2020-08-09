import * as g from './globals.js';
import Player from './player.js';
import Tile from './tile.js';
import {nextPos, centerImg} from './geo.js';

import levels from '../static/levels.json';
import box from '../static/images/box.png';
import boxOk from '../static/images/box_ok.png';
import objective from '../static/images/objective.png';
import wall from '../static/images/wall.png';

import bravo from '../static/images/bravo.png';

class Game {
	constructor() {
		this.w = levels.width;
		this.h = levels.height;
		this.tileW = levels.tileWidth;
		this.tileH = levels.tileHeight;
		this.screenW = this.w*this.tileW;
		this.screenH = this.h*this.tileH;

		this.bravo = new Image(235, 88);
		this.bravo.src = bravo;

		this.sprites = Array();
		for (const v of Object.values(g.tile)) {
			// ignore player & empty tiles
			if (v===0 || v===3 || v===6) {
				this.sprites.push({});
				continue;
			}

			let img = new Image(this.tileW, this.tileH);
			this.sprites.push(img);
		}
		this.sprites[g.tile.box].src = box;
		this.sprites[g.tile.boxOk].src = boxOk;
		this.sprites[g.tile.objective].src = objective;
		this.sprites[g.tile.wall].src = wall;
	}
	
	loadLevel(n) {
		if (!levels.maps[n]) {
			console.log(`level map not found`);
			return;
		}

		let arr = levels.maps[n];
		let tileMap = Array();
		for (let y = 0; y < this.w; y++) {
			tileMap.push(Array());
			for (let x = 0; x < this.h; x++) {
				let t = arr[y][x];

				if (t == g.tile.player || t == g.tile.playerOk) {
					this.player = new Player(x, y);
					t = t === g.tile.player ? g.tile.empty : g.tile.objective;
				}
				
				tileMap[y].push(new Tile(t));
			}
		}

		this.tileMap = tileMap;
		this.levelCompleted = false;
		this.loaded = true;
	}

	isInMenu() {
		return this.levelCompleted || !this.loaded;
	}

	hasNextLevel(n) {
		return !!levels.maps[n+1];
	}

	tick(d) {
		// todo: is next pos within bounds
		const [nx, ny] = this.player.nextPos(d);
		const nt = this.tileMap[ny][nx];

		if (nt.isTraversable()) {
			this.player.move(d);
		} else if (nt.isMoveable()) {
			
			// check tile after next position
			// todo: is nnp within bounds?
			const [nnx, nny] = nextPos(nx, ny, d);
			const nnt = this.tileMap[nny][nnx];
			if (nnt.isTraversable()) {

				// moveable object is always eiter a box or a boxOk
				this.tileMap[ny][nx] = nt.is(g.tile.box) ? new Tile(g.tile.empty) : new Tile(g.tile.objective);

				// traversable is either empty or an objective
				this.tileMap[nny][nnx] = nnt.is(g.tile.empty) ? new Tile(g.tile.box) : new Tile(g.tile.boxOk);

				this.player.move(d);
			}
		}

		// check winning condition
		let objectives = this.tileMap.flatMap(row => row.filter(t => t.is(g.tile.objective)));
		if (objectives.length <= 0) {
			this.levelCompleted = true;
		}
	}

	draw(ctx) {
		if (!this.loaded) {
			console.log(`level not loaded`);
			return;
		}

		for (let y = 0; y < this.w; y++) {
			for (let x = 0; x < this.h; x++) {

				const t = this.tileMap[y][x];
				if (!t.is(g.tile.empty)) {
					ctx.drawImage(this.sprites[t.getType()], x*this.tileW, y*this.tileH);
				}
			}
		}
		this.player.draw(ctx);

		if (this.levelCompleted) {
			const [bx, by] = centerImg(this.screenW, this.screenH, this.bravo.width, this.bravo.height);
			ctx.drawImage(this.bravo, bx, by);
		}
	}
};

export default new Game();
