import '../static/css/style.css';

const TILE_W = 32;
const TILE_H = 32;
const numTilesX = 12;
const numTilesY = 12;

function createCanvas() {
	let element = document.createElement('canvas');
	element.setAttribute("id", "screen");

	return element;
}

document.body.appendChild(createCanvas());

var screen = document.getElementById("screen");
var ctx = screen.getContext("2d");
console.log(screen.width, screen.height);

function main() {
	window.addEventListener("keydown", event => {
		// TODO: keypress handling
		event.preventDefault();
	});

	let loop = setInterval(() => {
		// Draw	
		ctx.clearRect(0, 0, screen.width, screen.height);
		ctx.strokeText(`test`, 2, 10);
	}, 1 / FPS * 1000);
}

main();
