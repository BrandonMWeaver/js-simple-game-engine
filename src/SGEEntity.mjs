class SGEEntity {
	constructor(context, texture, x = 0, y = 0, xSpeed = 0, ySpeed = 0) {
		this.context = context;
		this.texture = new Image();
		this.texture.src = texture;
		this.x = x;
		this.y = y;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
	}

	move() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	update() {
		this.move();
		this.context.drawImage(this.texture, this.x, this.y, this.texture.width, this.texture.height);
	}

	get perimeter() {
		return {
			left: this.x,
			right: this.x + this.texture.width,
			top: this.y,
			bottom: this.y + this.texture.height
		}
	}
}

export default SGEEntity;
