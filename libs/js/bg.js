alert('本页面使用ECMA6语法,chrome支持度最高。请勿使用360！！！');
if(window.navigator.userAgent.indexOf('Chrome')==-1){
	alert("请使用谷歌浏览器");
}
console.log('本页面全部采用原生JS效果,不含任何添加库');

var oC = document.querySelector('canvas');
var ctx = oC.getContext('2d');
var r = 20;
var color = `rgba(255,255,255,1)`;
var dotArr = [];
oC.width = document.documentElement.clientWidth;
oC.height = document.documentElement.clientHeight;
window.addEventListener('resize', resetCancas, false);

function resetCancas() {
	oC.width = document.documentElement.clientWidth;
	oC.height = document.documentElement.clientHeight;
};

ctx.fillStyle = 'white';
//画点
setInterval(function() {
	ctx.clearRect(0, 0, oC.width, oC.height);
	dotArr.forEach(function(dot, index) {
		var {
			x,
			y,
			r,
			color,
			count
		} = dot;
		ctx.beginPath();
		ctx.fillStyle = color.substring(0, color.lastIndexOf(',') + 1) + (count / 100) + ')';
		ctx.arc(x, y, r, 0, Math.PI * 2, false);
		//console.log(color.substring(0,color.lastIndexOf(',')+1)+(count/100)+')');
		ctx.closePath();
		ctx.fill();
		//console.log(dot.count--);
		dot.count -= 0.5;
		if(dot.count == 0) {
			dotArr.splice(index, 1);
		}
		dot.r += 0.5;
		//dot.y -= 5;
	});
}, 16);

document.onclick = function({
	clientX,
	clientY
}) {
	//生成点
	dotArr.push({
		x: clientX,
		y: clientY,
		r: r,
		color: color,
		count: 100,
	});
};

setInterval(function() {
	dotArr.push({
		x: rnd(0, oC.width),
		y: rnd(0, oC.height),
		r: r,
		color: color,
		count: 100,
	});
}, 500);

var aSection = document.querySelectorAll('section');
aSection.forEach(function(oSec, index) {
	oSec.style.position = 'absolute';
	oSec.style.left = 0;
	oSec.style.height = document.documentElement.clientHeight + 'px';
	oSec.style.top = document.documentElement.clientHeight * parseInt(index / 2) + 'px';
	
});
window.addEventListener('resize', resetSection, false);

function resetSection() {
	aSection.forEach(function(oSec, index) {
		oSec.style.height = document.documentElement.clientHeight + 'px';
		oSec.style.top = document.documentElement.clientHeight * parseInt(index / 2) + 'px';
	});
}

function rnd(n, m) {
	return parseInt(Math.random() * (m - n) + n);
}

function rndSing() {
	return Math.random() > 0.5 ? 1 : -1;
}

function dtr(deg) {
	return deg / 180 * Math.PI;
}