import * as g from './globals.js';
import Player from './player.js';
import Tile from './tile.js';
import {nextPos, isColliding} from './geo.js';

import '../static/css/style.css';

const FPS = 12;

function createCanvas() {
	let el = document.createElement('canvas');
	el.setAttribute("id", "screen");
	el.setAttribute("width", g.TILE_W * g.numTilesX);
	el.setAttribute("height", g.TILE_H * g.numTilesY);

	return el;
}

document.body.appendChild(createCanvas());

let screen = document.getElementById("screen");
let ctx = screen.getContext("2d");
console.log(screen.width, screen.height);

let p = new Player(0,0);

let tiles = Array();
tiles.push(new Tile(g.TILE_W, 0, g.tileType.box));
tiles.push(new Tile(g.TILE_W, g.TILE_H, g.tileType.box));

tiles.push(new Tile(g.TILE_W*2, g.TILE_H, g.tileType.wall));
tiles.push(new Tile(g.TILE_W*3, g.TILE_H, g.tileType.wall));

function draw() {
	ctx.clearRect(0, 0, screen.width, screen.height);

	p.draw(ctx);
	tiles.map(t => t.draw(ctx));
}

draw();

window.addEventListener("keydown", e => {

	let d;
	switch (e.keyCode) {
	case g.keyCodes.W:
	case g.keyCodes.K:
	case g.keyCodes.ARROW_UP:
		d = g.direction.up;
		break;

	case g.keyCodes.D:
	case g.keyCodes.L:
	case g.keyCodes.ARROW_RIGHT:
		d = g.direction.right;
		break;

	case g.keyCodes.S:
	case g.keyCodes.J:
	case g.keyCodes.ARROW_DOWN:
		d = g.direction.down;
		break;

	case g.keyCodes.A:
	case g.keyCodes.H:
	case g.keyCodes.ARROW_LEFT:
		d = g.direction.left;
		break;

	default:
		console.log(`${e.keyCode} not recognised`);
		break;
	}

	if (d !== undefined) {
		const [nx, ny] = p.nextPos(d);
		const c = tiles.filter(t => isColliding(t.x, t.y, nx, ny));

		if (c.length <= 0) {
			p.move(d);
		} else if (c.length == 1) {
			let obj = c[0];

			if (obj.isMoveable()) {
				// check tile after next position
				const [nnx, nny] = nextPos(nx, ny, d);
				const nct = tiles.filter(t => isColliding(t.x, t.y, nnx, nny));
				if (nct.length <=0) {
					obj.move(d);
					p.move(d);
				}
			}
		}
	}

	e.preventDefault();
	draw();
});

