import '../scss/main.scss';

const cardElement = document.querySelector('.card');
const cardContainer = cardElement?.querySelector<HTMLElement>('.card__container');

cardElement?.addEventListener('mousemove', e => {
	const cardHalfWidth = cardElement.clientWidth / 2;
	const cardHalfHeight = cardElement.clientHeight / 2;

	const windowHalfWidth = window.innerWidth / 2;
	const windowHalfHeight = window.innerHeight / 2;

	// console.log(e.clientY - windowHalfHeight);
	// console.log((e.clientX - windowHalfWidth) / cardHalfWidth, (windowHalfHeight - e.clientY) / cardHalfHeight);
	// cardElement.style.setProperty('--x', `${(e.clientX - windowHalfWidth) / cardHalfWidth}`);
	// cardElement.style.setProperty('--y', `${(windowHalfHeight - e.clientY) / cardHalfHeight}`);

	processMovement(e, cardContainer);
});

cardElement?.addEventListener('mouseleave', e => {
	// cardElement.style.setProperty('--x', 0);
	// cardElement.style.setProperty('--y', 0);
	if (cardContainer) {
		cardContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
	}
});

const bd = document.body;
const htm = document.documentElement;

function processMovement(e: any, elem: any) {
	const bdst = bd.scrollTop || htm.scrollTop,
		bdsl = bd.scrollLeft,
		pageX = e.pageX,
		pageY = e.pageY,
		offsets = elem.getBoundingClientRect(),
		w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
		h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
		wMultiple = 100 / w,
		offsetX = 0.5 - (pageX - offsets.left - bdsl) / w,
		offsetY = 0.5 - (pageY - offsets.top - bdst) / h,
		dy = pageY - offsets.top - bdst - h / 2,
		dx = pageX - offsets.left - bdsl - w / 2,
		yRotate = (offsetX - dx) * (0.07 * wMultiple),
		xRotate = (dy - offsetY) * (0.05 * wMultiple),
		imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)';
	console.log(offsets.left, elem.offsetLeft);

	// 			arad = Math.atan2(dy, dx),
	// 			angle = arad * 180 / Math.PI - 90;

	// 		if (angle < 0) {
	// 			angle = angle + 360;
	// 		}

	// if(elem.firstChild.className.indexOf(' over') != -1){
	// 	imgCSS += ' scale3d(1.07,1.07,1.07)';
	// }

	elem.style.transform = imgCSS;

	// shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
	// shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';

	// var revNum = totalLayers;
	// for(var ly=0;ly<totalLayers;ly++){
	// 	layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
	// 	revNum--;
	// }
}
