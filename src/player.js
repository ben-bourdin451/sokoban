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
const KEYS = globals.KEYS;

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
	}

	move() {
		switch (this.direction) {
		case direction.up:
			this.y -= TILE_H;
			break;
		case direction.right:
			this.x += TILE_W;
			break;
		case direction.down:
			this.y += TILE_H;
			break;
		case direction.left:
			this.x -= TILE_W;
			break;
		}
	}

	handleKeyDown(e) {
		switch (e.keyCode) {
		case KEYS.ARROW_UP:
			this.direction = direction.up;
			break;
		case KEYS.ARROW_RIGHT:
			this.direction = direction.right;
			break;
		case KEYS.ARROW_DOWN:
			this.direction = direction.down;
			break;
		case KEYS.ARROW_LEFT:
			this.direction = direction.left;
			break;
		}

		this.move();
	}

	draw(ctx) {
		ctx.drawImage(this.sprites[this.direction], this.x, this.y, TILE_W, TILE_H);
	}
};

