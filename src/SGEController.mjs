class SGEController {
	constructor() {
		this.keys = [];
		this.mouse = {
			x: 0,
			y: 0
		}
		this.initialize(this);
	}

	initialize(self) {
		window.addEventListener("keydown", e => {
			self.keys[e.keyCode] = true;
		});
		window.addEventListener("keyup", e => {
			self.keys[e.keyCode] = false;
		});
		window.addEventListener("mousemove", e => {
			const canvas = document.querySelector("canvas")
			this.mouse.x = e.pageX - canvas.offsetLeft;
			this.mouse.y = e.pageY - canvas.offsetTop;
		});
	}

	respond(keyCode, callback) {
		if (this.keys[keyCode])
			callback();
	}
}

export default SGEController;
