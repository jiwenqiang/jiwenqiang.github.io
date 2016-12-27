var owrap = document.querySelector('.wrap');
var bSin = true;
for(let i = 0; i < 8; i++) {
	var odiv = document.createElement('div');
	odiv.style.backgroundImage = `url(static/img/cat/cat-${i+1}.png)`;
	odiv.classList.add('box');
	odiv.style.transition = `0.7s ${(7-i)*200}ms`;

	var odiv2 = document.createElement('div');
	odiv2.style.backgroundImage = `url(static/img/cat/cat-${i+1}.png)`;
	odiv2.classList.add('box2');

	odiv.appendChild(odiv2);
	owrap.appendChild(odiv);
}

var aDiv = document.querySelectorAll('.box');
document.addEventListener('click', move3D, false);

function move3D() {
	if(!bSin) return; //console.log(1);
	aDiv.forEach(function(odiv, index) {
		setTimeout(function() {
			odiv.style.transform = `rotateX(0deg) rotateY(${index*45}deg) translateZ(400px)`;
		});
	});
	aDiv[0].addEventListener('transitionend', function() {
		aDiv.forEach(function(oDiv, index) {
			oDiv.style.transition = `0.7s`
			oDiv.style.opacity = Math.abs(index * 45 - 180) / 180 + 0.2;
		});
		bSin = false;
	}, false);
};

var moveX = 0;
var moveY = 0;

var speedX = 0;
var speedY = 0;
var timer = null;
aSection[2].addEventListener('mousedown', secmousedown, false);

function secmousedown(ev) {
	var {
		clientX,
		clientY
	} = ev;
	if(bSin) return; //console.log(2);
	clearInterval(aSection[2].timer);
	speedX = 0;
	speedY = 0
	var disX = clientX;
	var disY = clientY;
	var goX = 0;
	var goY = 0;
	document.addEventListener('mousemove', secdocmove, false);

	function secdocmove({
		clientX,
		clientY
	}) {
		var lastX = goX;
		var lastY = goY;
		bResult = false;
		goX = moveX + -(clientY - disY) * 0.6;
		goY = moveY + (clientX - disX) * 0.6;
		//owrap.style.transform = `rotateX(${goX}deg) rotateY(${goY}deg)`;
		owrap.style.transform = `rotateY(${goY}deg)`;
		aDiv.forEach(function(el, index) {
			el.style.transition = '';
			el.style.opacity = Math.abs(Math.abs((index * 45 + goY) % 360) - 180) / 180 + 0.2;
		});
		speedX = goX - lastX;
		speedY = goY - lastY;
	};
	document.addEventListener('mouseup', secdocup, false);

	function secdocup() {
		bResult = true;
		moveX = goX;
		moveY = goY;
		document.removeEventListener('mousemove', secdocmove);
		if(speedX == 0 || speedY == 0) return;
		clearInterval(aSection[2].timer);
		aSection[2].timer = setInterval(function() {
			speedX *= 0.96;
			speedY *= 0.96;
			goX += speedX * 0.6;
			goY += speedY * 0.6;
			//owrap.style.transform = `rotateX(${goX}deg) rotateY(${goY}deg)`;
			owrap.style.transform = `rotateY(${goY}deg)`;
			aDiv.forEach(function(el, index) {
				el.style.opacity = Math.abs(Math.abs((index * 45 + goY) % 360) - 180) / 180 + 0.2;
			});
			moveX = goX;
			moveY = goY;
		}, 16);
		document.removeEventListener('mouseup', secdocup);
	};
	ev.preventDefault();
};

var oWorks = document.querySelector('#works');
var aWorksDiv = document.querySelectorAll('.box_work div');
var aWorksContains = document.querySelectorAll('#works_contains>li');
var iWorksDivR = 130;
oWorks.onclick = function(ev) { //console.log(1);
	setCtlArr();
	ev.stopPropagation();
};
setCtlArr();

function setCtlArr() {
	oWorks.classList.toggle('active');
	aWorksDiv.forEach(function(oDiv, index) {
		clearTimeout(oDiv.timer);
		oDiv.timer = setTimeout(function() {
			if(oWorks.classList.contains('active')) {
				oDiv.style.transform = `translateY(${Math.cos(dtr(index/3*90+90))*iWorksDivR}px) translateX(${Math.cos(dtr(index/3*90))*iWorksDivR}px)`;
			} else {
				oDiv.style.transform = '';
			}
			//console.log(dtr(index/3*90));

		}, index * 100);
	});
}
//alert(aWorksDiv.length);
function dtr(deg) {
	return deg / 180 * Math.PI;
}
aWorksDiv.forEach(function(oDiv, index) {
	oDiv.onclick = function(ev) { //console.log(aWorksContains.length);
		aWorksContains.forEach(function(oDivIn, ind) {
			oDivIn.classList.remove('active');
		});
		aWorksContains[index].classList.add('active');
		ev.stopPropagation();
	};
});
//图片懒加载 使性能更好
window.addEventListener('scroll', lazyLoad, false);
var aImg = document.querySelectorAll('img');

function lazyLoad() {
	aImg.forEach(function(oImg, index) {
		if(oImg.src == '' && (getFinilOffsetTop(oImg) - document.body.scrollTop) <= document.documentElement.clientHeight) {
			oImg.src = oImg.getAttribute('_src');
			//console.log(1);
		}
	});
}

function getFinilOffsetTop(obj) {
	var t = 0;
	while(obj.offsetParent) {
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return t;
}