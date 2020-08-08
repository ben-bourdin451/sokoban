import {TILE_W, TILE_H, tile} from './globals.js';

export default class Tile {
	constructor(t) {
		this.type = t;
	}

	getType() {
		return this.type;
	}

	is(t) {
		return this.type === t;
	}

	isTraversable() {
		return this.type === tile.objective || this.type === tile.empty;
	}

	isMoveable() {
		return this.type === tile.box || this.type === tile.boxOk;
	}
};
