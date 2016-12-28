// 加载资源
function loadImage(staticsArray,callback){
	var count = 0;

	statics.forEach(function(imageUrl){
		var oImage = new Image();
		oImage.src = `statics/FishingMaster/img/${imageUrl}.png`;

		oImage.onload = function(){
			count++;

			images[imageUrl] = oImage;

			if( count == staticsArray.length ){
				callback && callback();
			}
		}
	})
}

// 角度转换
function d2a(d){
	return d/180*Math.PI;
}

function a2d(a){
	return a/Math.PI*180;
}

// 获取随机数
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}

function rndSign(){
	return Math.random() > 0.5 ? -1 : 1;
}