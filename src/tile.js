import {TILE_W, TILE_H, tileType} from './globals.js';
import {nextPos} from './geo.js';
import wall from '../static/images/wall.png';
import box from '../static/images/box.png';

export default class Tile {
	constructor(x, y, t) {
		this.x = x;
		this.y = y;
		this.type = t;

		this.sprite = new Image(TILE_W, TILE_H);

		if (t == tileType.box) {
			this.sprite.src = box;
		} else {
			this.sprite.src = wall;
		}
	}

	move(d) {
		[this.x, this.y] = nextPos(this.x, this.y, d);
	}

	isMoveable() {
		return this.type == tileType.box;
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, this.x, this.y, TILE_W, TILE_H);
	}
};
