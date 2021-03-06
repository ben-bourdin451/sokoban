import * as g from './globals.js';

export const nextPos = (x, y, direction) => {
	switch (direction) {
	case g.direction.up:
		y--;
		break;
	case g.direction.right:
		x++;
		break;
	case g.direction.down:
		y++;
		break;
	case g.direction.left:
		x--;
		break;
	}

	return boundPos(x, y);
};

const boundPos = (x, y) => {
	return [bound(x, g.numTilesX - 1), bound(y, g.numTilesY - 1)];
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

export const centerImg = (sw, sh, iw, ih) => {
	return [center(sw, iw), center(sh, ih)];
};

const center = (s, i) => {
	return s/2 - i/2;
};
