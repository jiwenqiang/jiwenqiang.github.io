var oC = document.querySelector('canvas');
var ctx = oC.getContext('2d');

var bulletArray = [];
var fishArray = [];
var dieFishArray = [];
var netArray = [];
var coinArray = [];
var money = 0;

var distance = 61;
var chance = 0.08;

var COIN_TEXT = [
	{x:21},
	{x:43},
	{x:65},
	{x:87},
	{x:112},
	{x:135}
]

function addFish(){
	// 出鱼
	if( Math.random() < chance ){
		var fish = new Fish(rnd(1,6));
		if( Math.random() > 0.5 ){

			// 从左边出
			fish.x = - distance;
			fish.y = rnd(100,oC.height-100);
			fish.rotate = rndSign()*rnd(0,45);

		} else {

			// 从右边出
			fish.x = oC.width+distance;
			fish.y = rnd(100,oC.height-100);
			fish.rotate = rnd(135,225);
		}

		fishArray.push(fish);
	}
}

function drawTasks(ctx,cannon){

	function addMoney(number){
		money += Number(number);
	}

	function drawMoney(){
		var sixString = addZero(money);
		var sixStringArray = sixString.split('');

		sixStringArray.forEach(function(number,index){
			ctx.drawImage(images[`coinText`],
				number*36,0,36,49,
				COIN_TEXT[index].x,574,18.367346939,25
			);
		})
	}

	function addZero(number){
		var zeroStr = "000000";
		var length = (""+number).length;

		return zeroStr.substring(length) + number;
	}


	// 画鱼
	fishArray.forEach(function(fish,index){
		
		if(
			fish.x < -distance ||
			fish.x > oC.width + distance ||
			fish.y < -distance||
			fish.y > oC.height + distance
		){
			fishArray.splice(index,1)
		}

		fish.draw();
	})

	// 画死鱼
	dieFishArray.forEach(function(dieFish){
		dieFish.draw();
	})

	// 画网
	netArray.forEach(function(net){
		net.draw();
	})

	// 画钱
	coinArray.forEach(function(coin){
		coin.draw();
	})

	// 炮台
	ctx.drawImage(images['bottom'],
		0,0,765,70,
		0,532,765,70
	)

	// 画分
	drawMoney();

	// 画子弹
	bulletArray.forEach(function(bullet,index){

		// 判断子弹是否出界，出界删除
		if(
			bullet.x<-distance ||
			bullet.x>oC.width+distance ||
			bullet.y<-distance ||
			bullet.y>oC.height+distance
		){
			bulletArray[index] = null;
			bulletArray.splice(index,1)
		}

		bullet.draw();
	})

	fishArray.forEach(function(
		fish,
		fishIndex
	){
		bulletArray.forEach(function(
			bullet,
			bulletIndex
		){
			// 碰撞检测

			if(
				fish.isIn(
					bullet.x,
					bullet.y
				)
			){
				// 鱼死了

				fishArray.splice(fishIndex,1);
				bulletArray.splice(bulletIndex,1);

				// 生成死鱼
				var dieFish = new DieFish(fish.kind);
					dieFish.x = fish.x;
					dieFish.y = fish.y;
					dieFish.rotate = fish.rotate

				dieFishArray.push(dieFish);

				// 死鱼消失
				setTimeout(function(){
					dieFishArray.shift();
					netArray.shift();

					// 生成金币
					var coin = new Coin(fish.kind > 3 ? 2 : 1);
						coin.x = fish.x;
						coin.y = fish.y;

					coinArray.push(coin);

					// 金币消失
					setTimeout(function(){
						var money = coinArray.shift();
						// 金币文字
						addMoney(money.price);
					},3000)
				},500)

				// 生成渔网
				var net = new Net(cannon.kind);
					net.x = fish.x;
					net.y = fish.y;

				netArray.push(net);
			}
		})
	})
}