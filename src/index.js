import * as g from './globals.js';
import Player from './player.js';
import Box from './box.js';
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
let b = new Box(g.TILE_W, g.TILE_H);
function draw() {
	ctx.clearRect(0, 0, screen.width, screen.height);
	p.draw(ctx);
	b.draw(ctx);
}

draw();

window.addEventListener("keydown", e => {
	switch (e.keyCode) {
	case g.keyCodes.ARROW_UP:
		p.move(g.direction.up);
		break;
	case g.keyCodes.ARROW_RIGHT:
		p.move(g.direction.right);
		break;
	case g.keyCodes.ARROW_DOWN:
		p.move(g.direction.down);
		break;
	case g.keyCodes.ARROW_LEFT:
		p.move(g.direction.left);
		break;
	}


	e.preventDefault();
	draw();
});

