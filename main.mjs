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
const bullets = [];
let delay = 0;

const controller = new SGEController();

engineCanvas.start(update, 5);

function update() {
	respondToAction();
	background.update();
	for (const bullet of bullets) {
		bullet.update(bullet.rotation, function() {
			bullet.x += Math.sin(bullet.rotation) * bullet.xSpeed;
			bullet.y -= Math.cos(bullet.rotation) * bullet.ySpeed;
		});
		for (let i = enemies.length - 1; i >= 0; i--) {
			if (bullet.collidedWith(enemies[i])) {
				enemies.splice(i, 1);
			}
		}
	}
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
	if (delay > 0)
		delay--;
}

function respondToAction() {
	ship.xSpeed = 0;
	ship.ySpeed = 0;
	const collisionInformation = ship.sideCollidedWithAny(enemies);
	const shipAngle = ship.rotation * 180 / Math.PI;
	controller.respond(87, function() {
		if ((ship.perimeter.left > background.perimeter.left || Math.sign(shipAngle) === 1)
		&& (ship.perimeter.right < background.perimeter.right || Math.sign(shipAngle) === -1)) {
			ship.xSpeed = 1;
		}
		if ((ship.perimeter.top > background.perimeter.top || !(shipAngle >= -90 && shipAngle <= 90))
		&& (ship.perimeter.bottom < background.perimeter.bottom || (shipAngle >= -90 && shipAngle <= 90))) {
			ship.ySpeed = 1;
		}
		if (collisionInformation.includes("left") && Math.sign(shipAngle) === -1) {
			ship.xSpeed = 0;
		}
		if (collisionInformation.includes("right") && Math.sign(shipAngle) === 1) {
			ship.xSpeed = 0;
		}
		if (collisionInformation.includes("top") && shipAngle >= -90 && shipAngle <= 90) {
			ship.ySpeed = 0;
		}
		if (collisionInformation.includes("bottom") && !(shipAngle >= -90 && shipAngle <= 90)) {
			ship.ySpeed = 0;
		}
	});
	controller.respond(32, function() {
		if (delay === 0) {
			bullets.push(
				new SGEEntity(
					engineCanvas.context,
					"./textures/bullet.png",
					ship.center.x - 2 + (Math.sin(ship.rotation) * 25), ship.center.y - 4 - (Math.cos(ship.rotation) * 25), ship.rotation,
					3,
					{ x: controller.mouse.x + 10, y: controller.mouse.y + 10 }
				)
			);
			delay = 50;
		}
	});
}
