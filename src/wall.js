import {TILE_W, TILE_H} from './globals.js';
import wall from '../static/images/wall.png';

export default class Wall {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.sprite = new Image(TILE_W, TILE_H);
		this.sprite.src = wall;
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, this.x, this.y, TILE_W, TILE_H);
	}
};
