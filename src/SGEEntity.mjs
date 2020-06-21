class SGEEntity {
	constructor(context, texture, x = 0, y = 0, speed = 0) {
		this.context = context;
		this.texture = new Image();
		this.texture.src = texture;
		this.x = x;
		this.y = y;
		this.rotation = 0;
		this.Speed = speed;
		this.xSpeed = speed;
		this.ySpeed = speed;
	}

	move(callback = null) {
		if (callback) {
			callback();
		}
		else {
			this.x += this.xSpeed;
			this.y += this.ySpeed;
		}
	}

	update(degree = null, callback = null) {
		if (callback) {
			this.move(callback);
		}
		else {
			this.move();
		}
		if (degree) {
			this.rotation = degree * 180 / Math.PI;
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
		this.context.translate(this.center.x, this.center.y);
		this.context.rotate(degree);
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

	get center() {
		return { x: this.x + this.texture.width / 2, y: this.y + this.texture.height / 2 }
	}
}

export default SGEEntity;
