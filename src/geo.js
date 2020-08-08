import * as g from './globals.js';

const maxX = g.TILE_W * (g.numTilesX-1);
const maxY = g.TILE_H * (g.numTilesY-1);

export const nextPos = (x, y, direction) => {
	switch (direction) {
		case g.direction.up:
			y -= g.TILE_H;
			break;
		case g.direction.right:
			x += g.TILE_W;
			break;
		case g.direction.down:
			y += g.TILE_H;
			break;
		case g.direction.left:
			x -= g.TILE_W;
			break;
		}

		return boundPos(x, y);
};

const boundPos = (x, y) => {
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


export const isColliding = (x, y, xx, yy) => {
	return x == xx && y == yy;
};
