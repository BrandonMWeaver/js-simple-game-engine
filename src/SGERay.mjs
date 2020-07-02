class SGERay {
	constructor(context, pos = { x: 0, y: 0 }, dir = { x: 0, y: 0 }) {
		this.context = context;
		this.pos = pos;
		this.dir = dir;
	}

	update() {
		this.context.beginPath();
		this.context.moveTo(this.pos.x, this.pos.y);
		this.context.lineTo(this.dir.x, this.dir.y);
		this.context.strokeStyle = "#00F"; // Remove after testing
		this.context.stroke();
	}

	cast(boundary) {
		const x1 = boundary.a.x;
		const y1 = boundary.a.y;
		const x2 = boundary.b.x;
		const y2 = boundary.b.y;
	
		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.dir.x;
		const y4 = this.dir.y;
	
		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (den === 0) return null;
	
		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
	
		if (t > 0 && t < 1 && u > 0) {
			return {
				x: x1 + t * (x2 - x1),
				y: y1 + t * (y2 - y1)
			}
		}
		else return null;
	}

	findClosestPoint(points) {
		let minDistance = Infinity;
		let closestPoint = null;
		for (const point of points) {
			const distance = Math.sqrt(Math.pow(this.pos.x - point.x, 2) + Math.pow(this.pos.y - point.y, 2));
			if (distance < minDistance) {
				minDistance = distance;
				closestPoint = point;
			}
		}
		return closestPoint;
	}
}

export default SGERay;
