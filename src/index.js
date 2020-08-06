import globals from './globals.js';
import Player from './player.js';
import '../static/css/style.css';


const FPS = 12;
const TILE_W = globals.TILE_W;
const TILE_H = globals.TILE_H;
const numTilesX = globals.numTilesX;
const numTilesY = globals.numTilesY;

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

function main() {
	window.addEventListener("keydown", event => {
		// TODO: keypress handling
		event.preventDefault();
	});

	let loop = setInterval(() => {
		// Draw	
		ctx.clearRect(0, 0, screen.width, screen.height);
		p.draw(ctx);
	}, 1 / FPS * 1000);
}

main();
