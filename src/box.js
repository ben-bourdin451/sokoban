import {TILE_W, TILE_H} from './globals.js';
import box from '../static/images/box.png';

export default class Box {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.sprite = new Image(TILE_W, TILE_H);
		this.sprite.src = box;
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, this.x, this.y, TILE_W, TILE_H);
	}
};
