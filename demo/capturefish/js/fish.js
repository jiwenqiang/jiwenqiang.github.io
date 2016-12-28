var FISH_SIZE=[
	null,
	{w: 55, h: 37, collR: 17},
	{w: 78, h: 64, collR: 24},
	{w: 72, h: 56, collR: 20},
	{w: 77, h: 59, collR: 22},
	{w: 107, h: 122, collR: 29}
];

class Fish{
	constructor(kind){
		this.x = 0;
		this.y = 0;
		this.speed = 2;
		this.rotate = 0;
		this.kind = kind;

		this.count = 0;

		this.move();
	}

	draw(){
		var {
			kind,x,y,count,rotate
		} = this;

		var {
			w,h
		} = FISH_SIZE[kind];

		ctx.save();
		// ctx.translate(x+w/2,y+h/2);

		// 变布局xy为中心
		ctx.translate(x,y);
		ctx.rotate(d2a(rotate));

		// 阴影始终在下方
		if( rotate > 90 && rotate < 270 ){
			ctx.scale(1,-1)
		}

		ctx.drawImage(images[`fish${kind}`],
			0,count%4*h,w,h,
			-w/2,-h/2,w,h
		);

		ctx.restore();
	}

	move(){
		setInterval(() => {
			this.x += this.speed*Math.cos(d2a(this.rotate));
			this.y += this.speed*Math.sin(d2a(this.rotate));
		},40)

		setInterval(() => {
			this.count++
		},110)
	}

	isIn(x,y){
		return Math.sqrt(
			Math.pow(x - this.x,2)+
			Math.pow(y - this.y,2)
		) < FISH_SIZE[this.kind].collR;
	}
}