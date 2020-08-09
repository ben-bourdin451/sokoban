import * as g from './globals.js';
import game from './game.js';
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

let level = 1;
game.loadLevel(level);

window.addEventListener("keydown", e => {
	if (game.isInMenu()) {
		if (game.hasNextLevel(level)) {
			level++;
		} else {
			level = 1;
		}
		game.loadLevel(level);
	}
	
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
		game.tick(d);
	}

	e.preventDefault();
	ctx.clearRect(0, 0, screen.width, screen.height);
	game.draw(ctx);
});

