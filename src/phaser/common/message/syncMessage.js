class BombState {
	constructor(x, y, timeLeft) {
		this.x = x;
		this.y = y;
		this.timeLeft = timeLeft;
	}
}

class Explosion {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class DestroyedWall {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

