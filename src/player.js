import globals from './globals.js';
import pdown from "../static/images/mario_down.gif";
import pleft from "../static/images/mario_left.gif";
import pright from "../static/images/mario_right.gif";
import pup from "../static/images/mario_up.gif";

const direction = {
	up: 0,
	right: 1,
	down: 2,
	left: 3
};

const TILE_W = globals.TILE_W;
const TILE_H = globals.TILE_H;

export default class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.direction = direction.down;

		this.sprites = Array();
		for (const v of Object.values(direction)) {
			let img = new Image(TILE_W, TILE_H);
			this.sprites.push(img);
		}
		this.sprites[direction.up].src = pup;
		this.sprites[direction.right].src = pright;
		this.sprites[direction.down].src = pdown;
		this.sprites[direction.left].src = pleft;
		console.log(this.sprites[this.direction]);
	}

	draw(ctx) {
		ctx.drawImage(this.sprites[this.direction], this.x, this.y, TILE_W, TILE_H);
	}
};

