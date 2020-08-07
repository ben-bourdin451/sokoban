import {TILE_W, TILE_H, numTilesX, numTilesY} from './globals.js';
import Player from './player.js';
import Box from './box.js';
import '../static/css/style.css';

const FPS = 12;

function createCanvas() {
	let el = document.createElement('canvas');
	el.setAttribute("id", "screen");
	el.setAttribute("width", TILE_W * numTilesX);
	el.setAttribute("height", TILE_H * numTilesY);

	return el;
}

document.body.appendChild(createCanvas());

let screen = document.getElementById("screen");
let ctx = screen.getContext("2d");
console.log(screen.width, screen.height);

let p = new Player(0,0);
let b = new Box(TILE_W, TILE_H);
function draw() {
	ctx.clearRect(0, 0, screen.width, screen.height);
	p.draw(ctx);
	b.draw(ctx);
}

draw();

window.addEventListener("keydown", e => {
	p.handleKeyDown(e);
	e.preventDefault();

	draw();
});

