class SGECanvas {
	constructor(width, height, container) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext("2d");

		this.interval = null;

		container.append(this.canvas);
	}

	start(update, interval = 20) {
		if (!this.interval)
			this.interval = setInterval(update, interval);
	}

	stop() {
		if (this.interval)
			clearInterval(this.interval);
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

export default SGECanvas;
