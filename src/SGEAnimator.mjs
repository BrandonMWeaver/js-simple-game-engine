class SGEAnimator {
	constructor(textures) {
		this.animationFrames = [];
		for (const texture of textures) {
			const animationFrame = new Image();
			animationFrame.src = texture;
			this.animationFrames.push(animationFrame);
		}
		this.frame = 0;
		this.currentAnimationFrame = 0;
	}

	animate(entity, interval) {
		if (this.currentAnimationFrame === this.animationFrames.length - 1)
			this.currentAnimationFrame = 0;
		if (this.frame % interval === 0) {
			entity.texture.src = this.animationFrames[this.currentAnimationFrame++].src;
		}
		this.frame++;
	}

	endAnimation(entity) {
		this.frame = 0;
		this.currentAnimationFrame = 0;
		entity.texture.src = entity.primaryTextureSource;
	}
}

export default SGEAnimator;
