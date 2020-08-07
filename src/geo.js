import * as g from './globals.js';

const maxX = g.TILE_W * (g.numTilesX-1);
const maxY = g.TILE_H * (g.numTilesY-1);

export const boundPos = (x, y) => {
	return [bound(x, maxX), bound(y, maxY)];
};

const bound = (x, max) => {
	if (x < 0) {
		x = 0;
	}

	if (x > max) {
		x = max;
	}

	return x;
};
