import SGECanvas from './src/SGECanvas.mjs';
import SGEEntity from './src/SGEEntity.mjs';

const engineCanvas = new SGECanvas(1280, 720, document.querySelector(".container"));

const background = new SGEEntity(engineCanvas.context, "./textures/background.png");
const ship = new SGEEntity(engineCanvas.context, "./textures/ship-1.png");

engineCanvas.start(update);

function update() {
	background.update();
	ship.update();
}
