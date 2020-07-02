class SGEEntity {
	constructor(context, texture, x = 0, y = 0, rotation = 0, speed = 0, destination = null) {
		this.context = context;
		this.texture = new Image();
		this.texture.src = texture;
		this.x = x;
		this.y = y;
		this.rotation = rotation;
		this.Speed = speed;
		this.xSpeed = speed;
		this.ySpeed = speed;
		if (destination) {
			this.destination = destination;
		}
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
			this.rotation = degree;
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
		return this.perimeter.bottom < entity.perimeter.top ||
		this.perimeter.top > entity.perimeter.bottom ||
		this.perimeter.right < entity.perimeter.left ||
		this.perimeter.left > entity.perimeter.right ? false : true;
	}

	sideCollidedWith(entity) {
		let side = '';
		if (this.collidedWith(entity)) {
			const leftCollision = this.perimeter.right - entity.perimeter.left;
			const rightCollision = entity.perimeter.right - this.perimeter.left;
			const topCollision = this.perimeter.bottom - entity.perimeter.top;
			const bottomCollision = entity.perimeter.bottom - this.perimeter.top;
			if (rightCollision < leftCollision && rightCollision < topCollision && rightCollision < bottomCollision)
				side = "left";
			else if (leftCollision < rightCollision && leftCollision < topCollision && leftCollision < bottomCollision)
				side = "right";
			else if (bottomCollision < leftCollision && bottomCollision < rightCollision && bottomCollision < topCollision)
				side = "top";
			else if (topCollision < leftCollision && topCollision < rightCollision && topCollision < bottomCollision)
				side = "bottom";
			}
		return side;
	}

	sideCollidedWithAny(entities) {
		let collisionInformation = [];
		for (const entity of entities) {
			let side = this.sideCollidedWith(entity);
			if (side !== '') {
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

	get angle() {
		return this.rotation * 180 / Math.PI;
	}
}

export default SGEEntity;
