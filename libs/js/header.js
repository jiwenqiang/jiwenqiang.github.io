var oHeader = document.querySelector('header');
var oBgMusic = oHeader.querySelector('ol');
var aBgMusicLi = oBgMusic.querySelectorAll('li'); //alert(aOlLi.length);
var oAudio = oHeader.querySelector('audio');
//var oAudio = new Audio('static/audio/RADWIMPS - なんでもないや (movie ver.).mp3');

oAudio.volume = 0.2;
var bAudio = true;

aBgMusicLi.forEach(function(oLi, index) {
	oLi.style.left = index * 7 + 'px';
});

function setmusic(color) {
	aBgMusicLi.forEach(function(oLi, index) {
		oLi.style.background = color;
	});
}
oBgMusic.onclick = function(ev) {
	if(bAudio) {
		oAudio.pause();
		setmusic('#ccc');
	} else {
		oAudio.play();
		setmusic('rgb(12, 141, 217)');
	}
	bAudio = !bAudio;
	ev.stopPropagation();
};
var aHeaderUlLi = oHeader.querySelectorAll('ul li');
var aHeaderDiv = oHeader.querySelectorAll('div');
var nowLevel = 0;
aHeaderUlLi.forEach(function(oli, index) {
	oli.onclick = function(ev) {
		//console.log(index);
		nowLevel = index;
		gotoNowLevel(nowLevel);
		setNowActive(nowLevel);
		ev.stopPropagation();
		ev.preventDefault();
	};
});

window.onwheel = function({
	wheelDelta
}) {
	if(wheelDelta > 0) {
		nowLevel > 0 && nowLevel--;
	} else {
		nowLevel < aHeaderUlLi.length - 1 && nowLevel++;
	}
	gotoNowLevel(nowLevel);
	setNowActive(nowLevel);
};
setNowActive();

function setNowActive() {
	aHeaderDiv.forEach(function(oDiv, index) {
		oDiv.style.transform = '';
		if(index == nowLevel) {
			oDiv.style.transform = 'rotateX(90deg)';
		}
	});
}

function gotoNowLevel(nowLevel) {
	//document.body.scrollTop = document.documentElement.clientHeight*nowLevel;
	//console.log(document.documentElement.clientHeight*nowLevel);
	var duration = 1000;
	var start = document.body.scrollTop;
	var distance = document.documentElement.clientHeight * nowLevel - document.body.scrollTop;
	var count = parseInt(1000 / 30);
	var now = 0;
	clearInterval(oHeader.timer);
	oHeader.timer = setInterval(function() {
		now++;
		var scale = 1 - Math.pow(1 - now / count, 3);
		document.body.scrollTop = start + distance * scale;
		//console.log(start + distance/count*now);
		if(now == count) {
			clearInterval(oHeader.timer);
		}
	}, 30);
}