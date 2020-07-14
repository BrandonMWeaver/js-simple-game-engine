class SGEAudio {
	constructor(url) {
		this.file = new Audio(url);
	}

	play() {
		this.file.play();
	}

	pause() {
		this.file.pause();
	}

	stop() {
		this.file.pause();
		this.file.currentTime = 0;
	}
}

export default SGEAudio;
