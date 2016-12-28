class DieFish{
	constructor(kind){
		this.x = 0;
		this.y = 0;
		this.rotate = 0;

		this.kind = kind;
		this.count = 4;

		this.move();
	}

	draw(){
		var {
			kind,x,y,rotate,count
		}= this;

		var {
			w,h
		} = FISH_SIZE[kind];

		ctx.save();
		ctx.translate(x,y);
		ctx.rotate(d2a(rotate));
		
		// 阴影始终在下方
		if( rotate > 90 && rotate < 270 ){
			ctx.scale(1,-1)
		}

		ctx.drawImage(images[`fish${kind}`],
			0,count*h,w,h,
			-w/2,-h/2,w,h
		);

		ctx.restore();
	}

	move(){
		setInterval(() => {
			this.count++;

			if( this.count == 8 ){
				this.count = 4
			}
		},60)
	}
}