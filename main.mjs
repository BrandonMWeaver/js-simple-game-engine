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

engineCanvas.start(update, 5);

function update() {
	respondToAction();
	background.update();
	ship.update(Math.atan2(controller.mouse.x + 10 - ship.center.x, -(controller.mouse.y + 10 - ship.center.y)), function() {
		if ((ship.center.x - controller.mouse.x - 20 > 10 || ship.center.x - controller.mouse.x < -10)
		|| (ship.center.y - controller.mouse.y - 20 > 10 || ship.center.y - controller.mouse.y < -10)) {
			ship.x += Math.sin(Math.atan2(controller.mouse.x + 10 - ship.center.x, -(controller.mouse.y + 10 - ship.center.y))) * ship.xSpeed;
			ship.y -= Math.cos(Math.atan2(controller.mouse.x + 10 - ship.center.x, -(controller.mouse.y + 10 - ship.center.y))) * ship.ySpeed;
		}
	});
	for (const enemy of enemies) {
		enemy.update();
	}
}

function respondToAction() {
	ship.xSpeed = 0;
	ship.ySpeed = 0;
	controller.respond(87, function() {
		if ((ship.perimeter.left > background.perimeter.left || Math.sign(ship.rotation) === 1)
		&& (ship.perimeter.right < background.perimeter.right || Math.sign(ship.rotation) === -1)) {
			ship.xSpeed = 1;
		}
		if ((ship.perimeter.top > background.perimeter.top || !(ship.rotation >= -90 && ship.rotation <= 90))
		&& (ship.perimeter.bottom < background.perimeter.bottom || (ship.rotation >= -90 && ship.rotation <= 90))) {
			ship.ySpeed = 1;
		}
	});
}
