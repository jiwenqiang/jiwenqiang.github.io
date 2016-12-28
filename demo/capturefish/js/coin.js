class Coin{
	constructor(kind){
		this.x = 0;
		this.y = 0;

		this.kind = kind;
		this.price = kind == 2? 10 : 1;
		this.count = 0;

		this.speed = 10;

		this.move();
	}

	draw(){
		var {
			kind,x,y,count
		} = this;

		ctx.save();
		ctx.drawImage(images[`coinAni${kind}`],
			0,count%10*60,60,60,
			x-30,y-30,60,60
		)

		ctx.restore();
	}

	move(){
		setInterval(() => {
			this.count++
		},30)

		setTimeout(() => {
			setInterval(() => {
				var deltaX = this.x - 70;
				var deltaY = oC.height + distance - this.y;
				var dis = 
				Math.sqrt(
					Math.pow(deltaX,2)+
					Math.pow(deltaY,2)
				);

				this.x -= this.speed*deltaX/dis;
				this.y += this.speed*deltaY/dis;
			},20)
		},1000)
	}
}
