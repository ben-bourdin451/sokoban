import '../static/css/style.css';
import box from '../static/images/box.png';

const FPS = 12;
const TILE_W = 34;
const TILE_H = 34;
const numTilesX = 12;
const numTilesY = 12;

function createCanvas() {
	let el = document.createElement('canvas');
	el.setAttribute("id", "screen");
	el.setAttribute("width", TILE_W * numTilesX);
	el.setAttribute("height", TILE_H * numTilesY);

	return el;
}

document.body.appendChild(createCanvas());

var screen = document.getElementById("screen");
var ctx = screen.getContext("2d");
console.log(screen.width, screen.height);

const boxImg = new Image(TILE_W, TILE_H);
boxImg.src = box;

function main() {
	window.addEventListener("keydown", event => {
		// TODO: keypress handling
		event.preventDefault();
	});

	let loop = setInterval(() => {
		// Draw	
		ctx.clearRect(0, 0, screen.width, screen.height);
		ctx.drawImage(boxImg, 0, 0);
	}, 1 / FPS * 1000);
}

main();
