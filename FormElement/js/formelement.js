var titleSummMin = document.querySelector(".range-title-summ_min");
console.log(titleSummMin);

var titleSummMax = document.querySelector(".range-title-summ_max");
console.log(titleSummMax);
var inputsRy = {
	sliderWidth: 266,
	minRange: 1000,
	maxRange: 20000,
	outputWidth:30, // output width
	thumbWidth: 16, // thumb width
	thumbBorderWidth: 2,
	trackHeight: 6,
	theValue: [5000, 10000] // theValue[0] < theValue[1]
};
console.log(inputsRy);
var isDragging0 = false;
var isDragging1 = false;

var range = inputsRy.maxRange - inputsRy.minRange;
var rangeK = inputsRy.sliderWidth / range;
var container = document.querySelector(".container");
var thumbRealWidth = inputsRy.thumbWidth + 2 * inputsRy.thumbBorderWidth;

// styles
var slider = document.querySelector(".slider");
console.log(slider);
//полоска слайдера высота
slider.style.height = inputsRy.trackHeight + "px";
//полоска слайдера ширина
slider.style.width = inputsRy.sliderWidth + "px";
//полоска слайдера отступы
slider.style.paddingLeft = (inputsRy.theValue[0] - inputsRy.minRange) * rangeK + "px";
slider.style.paddingRight = inputsRy.sliderWidth - inputsRy.theValue[1] * rangeK + "px";

var track = document.querySelector(".track");
track.style.width = inputsRy.theValue[1] * rangeK - inputsRy.theValue[0] * rangeK + "px";

var thumbs = document.querySelectorAll(".thumb");
console.log(thumbs);
for (var i = 0; i < thumbs.length; i++) {
	//пипки слайдера ширена=высоте
	thumbs[i].style.width = thumbs[i].style.height = inputsRy.thumbWidth + "px";
	console.log(inputsRy.thumbWidth + "px");
	//пипки слайдера бордюр
	thumbs[i].style.borderWidth = inputsRy.thumbBorderWidth + "px";
	//пипки слайдера позиция сверху
	thumbs[i].style.top = -((inputsRy.thumbWidth / 2 + inputsRy.thumbBorderWidth - inputsRy.trackHeight / 2) - 1) + "px";
	console.log(thumbs[i].style.top);
	//пипки слайдера позиция слева
	thumbs[i].style.left = (inputsRy.theValue[i] - inputsRy.minRange) * rangeK - (thumbRealWidth / 2) + "px";

}
var outputs = document.querySelectorAll(".output");
for (var i = 0; i < outputs.length; i++) {
	console.log(thumbs[i]);
	outputs[i].style.width = outputs[i].style.height = outputs[i].style.lineHeight = outputs[i].style.left = inputsRy.outputWidth + "px";
	outputs[i].style.top = -(Math.sqrt(2 * inputsRy.outputWidth * inputsRy.outputWidth) + inputsRy.thumbWidth / 2 - inputsRy.trackHeight / 2) + "px";
	outputs[i].style.left = (inputsRy.theValue[i] - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
	outputs[i].innerHTML = "<p>" + inputsRy.theValue[i] + "</p>";
	if (i == 0) {
		titleSummMin.textContent = inputsRy.theValue[0] + "₽";
		console.log(titleSummMin.textContent);
	}
	if (i == 1) {
		titleSummMax.textContent = inputsRy.theValue[1] + "₽";
		console.log(titleSummMax.textContent);
	}
}

//events

thumbs[0].addEventListener("mousedown", function(evt) {
	isDragging0 = true;
}, false);
thumbs[1].addEventListener("mousedown", function(evt) {
	isDragging1 = true;
}, false);
container.addEventListener("mouseup", function(evt) {
	isDragging0 = false;
	isDragging1 = false;
}, false);
container.addEventListener("mouseout", function(evt) {
	isDragging0 = false;
	isDragging1 = false;
}, false);

container.addEventListener("mousemove", function(evt) {
	var mousePos = oMousePos(this, evt);
	var theValue0 = (isDragging0) ? Math.round(mousePos.x / rangeK) + inputsRy.minRange : inputsRy.theValue[0];
	console.log(theValue0);
	var theValue1 = (isDragging1) ? Math.round(mousePos.x / rangeK) + inputsRy.minRange : inputsRy.theValue[1];

	if (isDragging0) {

		if (theValue0 < theValue1 - (thumbRealWidth / 2) &&	theValue0 >= inputsRy.minRange) {
			inputsRy.theValue[0] = theValue0;
			thumbs[0].style.left = (theValue0 - inputsRy.minRange) * rangeK - (thumbRealWidth / 2) + "px";
			outputs[0].style.left = (theValue0 - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
			outputs[0].innerHTML = "<p>" + theValue0 + "</p>";
			titleSummMin.textContent = theValue0 + "₽";
			slider.style.paddingLeft = (theValue0 - inputsRy.minRange) * rangeK + "px";
			track.style.width = (theValue1 - theValue0) * rangeK + "px";
		}
	} else if (isDragging1) {

		if (theValue1 > theValue0 + (thumbRealWidth / 2) &&	theValue1 <= inputsRy.maxRange) {
			inputsRy.theValue[1] = theValue1;
			thumbs[1].style.left = (theValue1 - inputsRy.minRange) * rangeK - (thumbRealWidth / 2) + "px";
			outputs[1].style.left = (theValue1 - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
			outputs[1].innerHTML = "<p>" + theValue1 + "</p>";
			titleSummMax.textContent = theValue1 + "₽";
			console.log(titleSummMax.textContent);
			slider.style.paddingRight = (inputsRy.maxRange - theValue1) * rangeK + "px";
			track.style.width = (theValue1 - theValue0) * rangeK + "px";
		}
	}

}, false);

// helpers

function oMousePos(elmt, evt) {
	var ClientRect = elmt.getBoundingClientRect();
	return { //objeto
		x: Math.round(evt.clientX - ClientRect.left),
		y: Math.round(evt.clientY - ClientRect.top)
	}
}