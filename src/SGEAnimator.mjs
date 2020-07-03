class SGEAnimator {
	constructor(entity, textures) {
		this.entity = entity;
		this.animationFrames = [];
		for (const texture of textures) {
			const animationFrame = new Image();
			animationFrame.src = texture;
			this.animationFrames.push(animationFrame);
		}
		this.frame = 0;
		this.currentAnimationFrame = 0;
	}

	animate(interval) {
		if (this.currentAnimationFrame === this.animationFrames.length - 1)
			this.currentAnimationFrame = 0;
		if (this.frame % interval === 0) {
			this.entity.texture.src = this.animationFrames[this.currentAnimationFrame++].src;
		}
		this.frame++;
	}

	endAnimation() {
		this.frame = 0;
		this.currentAnimationFrame = 0;
		this.entity.texture.src = this.entity.primaryTextureSource;
	}
}

export default SGEAnimator;
