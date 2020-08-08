import * as g from './globals.js';
import Player from './player.js';
import Box from './box.js';
import Wall from './wall.js';
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

let p = new Player(0,0);

let boxes = Array();
boxes.push(new Box(g.TILE_W, 0));
boxes.push(new Box(g.TILE_W, g.TILE_H));

let walls = Array();
walls.push(new Wall(g.TILE_W*2, g.TILE_H));
walls.push(new Wall(g.TILE_W*3, g.TILE_H));

function draw() {
	ctx.clearRect(0, 0, screen.width, screen.height);

	p.draw(ctx);
	boxes.map(b => b.draw(ctx));
	walls.map(w => w.draw(ctx));
}

draw();

window.addEventListener("keydown", e => {
	switch (e.keyCode) {
	case g.keyCodes.K:
	case g.keyCodes.ARROW_UP:
		p.move(g.direction.up);
		break;

	case g.keyCodes.L:
	case g.keyCodes.ARROW_RIGHT:
		p.move(g.direction.right);
		break;

	case g.keyCodes.J:
	case g.keyCodes.ARROW_DOWN:
		p.move(g.direction.down);
		break;

	case g.keyCodes.H:
	case g.keyCodes.ARROW_LEFT:
		p.move(g.direction.left);
		break;
	default:
		console.log(`key ${e.keyCode} pressed`);
	}


	e.preventDefault();
	draw();
});

