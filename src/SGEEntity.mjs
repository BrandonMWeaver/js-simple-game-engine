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

	update(degree = null) {
		this.move();
		if (degree) {
			this.rotate(degree);
			this.context.drawImage(this.texture, this.texture.width / -2, this.texture.height / -2, this.texture.width, this.texture.height);
			this.context.restore();
		}
		else {
			this.context.drawImage(this.texture, this.x, this.y, this.texture.width, this.texture.height);
		}
	}

	rotate(degree) {
		this.context.save();
		this.context.translate(this.x + this.texture.width / 2, this.y + this.texture.height / 2);
		this.context.rotate(degree * Math.PI / 180);
	}

	collidedWith(entity) {
		let side = '';
		if (this.perimeter.left === entity.perimeter.right &&
			this.perimeter.top <= entity.perimeter.bottom &&
			this.perimeter.bottom >= entity.perimeter.top)
			side = "left";
		else if (this.perimeter.right === entity.perimeter.left &&
			this.perimeter.top <= entity.perimeter.bottom &&
			this.perimeter.bottom >= entity.perimeter.top)
			side = "right";
		else if (this.perimeter.top === entity.perimeter.bottom &&
			this.perimeter.left <= entity.perimeter.right &&
			this.perimeter.right >= entity.perimeter.left)
			side = "top";
		else if (this.perimeter.bottom === entity.perimeter.top &&
			this.perimeter.left <= entity.perimeter.right &&
			this.perimeter.right >= entity.perimeter.left)
			side = "bottom";
		else
			side = "none";
		return side;
	}

	collidedWithAny(entities) {
		let collisionInformation = [];
		for (const entity of entities) {
			let side = this.collidedWith(entity);
			if (side !== "none") {
				collisionInformation.push(side);
			}
		}
		return collisionInformation;
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
