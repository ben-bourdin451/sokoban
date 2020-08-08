import * as g from './globals.js';
import {nextPos} from './geo.js';

import pdown from "../static/images/mario_down.gif";
import pleft from "../static/images/mario_left.gif";
import pright from "../static/images/mario_right.gif";
import pup from "../static/images/mario_up.gif";

export default class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.direction = g.direction.down;

		this.sprites = Array();
		for (const v of Object.values(g.direction)) {
			let img = new Image(g.TILE_W, g.TILE_H);
			this.sprites.push(img);
		}
		this.sprites[g.direction.up].src = pup;
		this.sprites[g.direction.right].src = pright;
		this.sprites[g.direction.down].src = pdown;
		this.sprites[g.direction.left].src = pleft;
	}

	move(direction) {
		this.direction = direction;
		[this.x, this.y] = this.nextPos(direction);
	}

	nextPos(direction) {
		return nextPos(this.x, this.y, direction);
	}

	draw(ctx) {
		ctx.drawImage(this.sprites[this.direction], this.x, this.y, g.TILE_W, g.TILE_H);
	}
};

