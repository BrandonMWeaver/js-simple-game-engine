import SGECanvas from './src/SGECanvas.mjs';
import SGEEntity from './src/SGEEntity.mjs';
import SGEController from './src/SGEController.mjs';

const engineCanvas = new SGECanvas(1280, 720, document.querySelector(".container"));

const background = new SGEEntity(engineCanvas.context, "./textures/background.png");
const ship = new SGEEntity(engineCanvas.context, "./textures/ship-1.png", 620, 660);
const enemies = [
	new SGEEntity(engineCanvas.context, "./textures/ship-1.png", 300, 300),
	new SGEEntity(engineCanvas.context, "./textures/ship-1.png", 620, 300),
	new SGEEntity(engineCanvas.context, "./textures/ship-1.png", 940, 300)
];

const controller = new SGEController();

engineCanvas.start(update);

function update() {
	respondToAction();
	background.update();
	ship.update();
	for (const enemy of enemies) {
		enemy.update();
	}
}

function respondToAction() {
	let collisionInformation = ship.collidedWithAny(enemies, function() {
		ship.xSpeed = 0;
		ship.ySpeed = 0;
	});
	controller.respond(65, function() { if (ship.perimeter.left > background.perimeter.left && collisionInformation.side !== "left") {
		ship.xSpeed = -4;
	} });
	controller.respond(68, function() { if (ship.perimeter.right < background.perimeter.right && collisionInformation.side !== "right") {
		ship.xSpeed = 4;
	} });
	controller.respond(87, function() { if (ship.perimeter.top > background.perimeter.top && collisionInformation.side !== "top") {
		ship.ySpeed = -4;
	} });
	controller.respond(83, function() { if (ship.perimeter.bottom < background.perimeter.bottom && collisionInformation.side !== "bottom") {
		ship.ySpeed = 4;
	} });
}
