import SGECanvas from './src/SGECanvas.mjs';
import SGEEntity from './src/SGEEntity.mjs';
import SGEController from './src/SGEController.mjs';

const engineCanvas = new SGECanvas(1280, 720, document.querySelector(".container"));

const background = new SGEEntity(engineCanvas.context, "./textures/background.png");
const ship = new SGEEntity(engineCanvas.context, "./textures/ship-1.png", 620, 660);
const enemies = [
	new SGEEntity(engineCanvas.context, "./textures/ship-1.png", 580, 340),
	new SGEEntity(engineCanvas.context, "./textures/ship-1.png", 620, 300),
	new SGEEntity(engineCanvas.context, "./textures/ship-1.png", 660, 340)
];

const controller = new SGEController();

engineCanvas.start(update);

let playerAngle = 0;

function update() {
	respondToAction();
	background.update();
	ship.update(playerAngle);
	for (const enemy of enemies) {
		enemy.update();
	}
}

function respondToAction() {
	ship.xSpeed = 0;
	ship.ySpeed = 0;
	let directions = [];
	let collisionInformation = ship.collidedWithAny(enemies);
	controller.respond(65, function() { if (ship.perimeter.left > background.perimeter.left && !collisionInformation.includes("left")) {
		ship.xSpeed = -4;
		directions.push('W');
	} });
	controller.respond(68, function() { if (ship.perimeter.right < background.perimeter.right && !collisionInformation.includes("right")) {
		ship.xSpeed = 4;
		directions.push('E');
	} });
	controller.respond(87, function() { if (ship.perimeter.top > background.perimeter.top && !collisionInformation.includes("top")) {
		ship.ySpeed = -4;
		directions.push('N');
	} });
	controller.respond(83, function() { if (ship.perimeter.bottom < background.perimeter.bottom && !collisionInformation.includes("bottom")) {
		ship.ySpeed = 4;
		directions.push('S');
	} });
	switch(directions.join(',')) {
		case "W":
			playerAngle = 270;
			break;
		case "E":
			playerAngle = 90;
			break;
		case "N":
			playerAngle = 0;
			break;
		case "S":
			playerAngle = 180;
			break;
		case "W,N":
			playerAngle = 315;
			break;
		case "W,S":
			playerAngle = 225;
			break;
		case "E,N":
			playerAngle = 45;
			break;
		case "E,S":
			playerAngle = 135;
			break;
		default:
			playerAngle = 0;
			break;
	}
}
