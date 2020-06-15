class SGEController {
	constructor() {
		this.keys = [];
		this.initialize(this);
	}

	initialize(self) {
		window.addEventListener("keydown", e => {
			self.keys[e.keyCode] = true;
		});
		window.addEventListener("keyup", e => {
			self.keys[e.keyCode] = false;
		});
	}
}

export default SGEController;
