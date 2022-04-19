/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./block/addamenities/addamenities.js":
/*!********************************************!*\
  !*** ./block/addamenities/addamenities.js ***!
  \********************************************/
/***/ (() => {

var addAmenitiesBtn = document.querySelector('.add-amenities-block-btn');
var addAmenitiesBlock = document.querySelector('.add-amenities-block-check');
addAmenitiesBtn.addEventListener('click', function () {
  addAmenitiesBtn.classList.toggle('check-list-closed_button');
  addAmenitiesBtn.classList.toggle('check-list-open_button');
  addAmenitiesBlock.classList.toggle('add-amenities-block-check_block');
});

/***/ }),

/***/ "./block/amenities/amenities.js":
/*!**************************************!*\
  !*** ./block/amenities/amenities.js ***!
  \**************************************/
/***/ (() => {

var amenitiesBtn = document.querySelector('.form-amenities-button'); //кнопка в поле выбора для разврота

var amenitiesInput = document.querySelector('.form-amenities-input'); //поле вывода вида и кол-ва удобств

var amenitiesForm = document.querySelector('.form-amenities'); //вся форма

var amenitiesDrop = document.querySelector('.drop-amenities'); //выпадающее меню

var amenitiesBtnSave = document.querySelector('.drop-input-menu_save-amenities'); //кнопка сохранить-применить

var amenitiesBtnClear = document.querySelector('.drop-input-menu_clear-amenities'); //кнопка очистить
//отбор настроек выпадающего меню
//let bigSelectMin = document.querySelector('.drop-big-select-small');

var bedroomSelectMin = document.querySelector('.drop-bedroom-select-small'); //уменьшение

var bedroomSelectMax = document.querySelector('.drop-bedroom-select-more'); //квеличение

var bedroomSelectResult = document.querySelector('.drop-bedroom-select-result'); //результат
//дети
//let childSelectMin = document.querySelector('.drop-children-select-small');  //сколько детей

var bedSelectMin = document.querySelector('.drop-bed-select-small');
var bedSelectMax = document.querySelector('.drop-bed-select-more');
var bedSelectResult = document.querySelector('.drop-bed-select-result'); //младенцы
//let babiSelectMin = document.querySelector('.drop-babies-select-small');   //сколько младенцев

var bathroomSelectMin = document.querySelector('.drop-bathroom-select-small');
var bathroomSelectMax = document.querySelector('.drop-bathroom-select-more');
var bathroomSelectResult = document.querySelector('.drop-bathroom-select-result');
amenitiesInput.value = 'Удобства'; //----------Кнопки------------------//
//-----разварот списка выборки------//

amenitiesBtn.addEventListener('click', function () {
  console.log('amenitiesDrop');
  console.log(amenitiesDrop);
  amenitiesDrop.classList.toggle('drop-amenities_display');
  amenitiesInput.classList.toggle('form-amenities-input_border');
}); //-----активация кнопок при значении более 0-------//
//function visitorHoverBig(namBigHover) {

function amenitiesHoverBedroom(namBedroomHover) {
  if (namBedroomHover >= 1) {
    bedroomSelectMin.classList.add('drop-select_small-hover');
    console.log(namBedroomHover);
  } else {
    bedroomSelectMin.classList.remove('drop-select_small-hover');
    console.log(namBedroomHover);
  }
} //function visitorHoverChild(namChildHover) {


function amenitiesHoverBed(namBedHover) {
  if (namBedHover >= 1) {
    bedSelectMin.classList.add('drop-select_small-hover');
  } else {
    bedSelectMin.classList.remove('drop-select_small-hover');
  }
} //function visitorHoverBabi(namBabiHover) {


function amenitiesHoverBathroom(namBathroomHover) {
  if (namBathroomHover >= 1) {
    bathroomSelectMin.classList.add('drop-select_small-hover');
  } else {
    bathroomSelectMin.classList.remove('drop-select_small-hover');
  }
} //---------выборка количеств удобств------//
//-----спальни----//


bedroomSelectMin.addEventListener('click', function () {
  if (bedroomSelectResult.textContent >= 1) {
    bedroomSelectResult.textContent = Number.parseInt(bedroomSelectResult.textContent) - 1;
    console.log(bedroomSelectResult.textContent);
    amenitiesHoverBedroom(Number.parseInt(bedroomSelectResult.textContent));
    amenitiesSummText(); //на сумму 1 аргумент, также сюда вставляем ховер
  }
});
bedroomSelectMax.addEventListener('click', function () {
  if (bedroomSelectResult.textContent != -1) {
    bedroomSelectResult.textContent = Number.parseInt(bedroomSelectResult.textContent) + 1;
    console.log(bedroomSelectResult.textContent);
    amenitiesHoverBedroom(Number.parseInt(bedroomSelectResult.textContent));
    amenitiesSummText();
  }
}); //-----кровати----//

bedSelectMin.addEventListener('click', function () {
  if (bedSelectResult.textContent >= 1) {
    bedSelectResult.textContent = Number.parseInt(bedSelectResult.textContent) - 1;
    console.log(bedSelectResult.textContent);
    amenitiesHoverBed(Number.parseInt(bedSelectResult.textContent));
    amenitiesSummText();
  }
});
bedSelectMax.addEventListener('click', function () {
  if (bedSelectResult.textContent != -1) {
    bedSelectResult.textContent = Number.parseInt(bedSelectResult.textContent) + 1;
    console.log(bedSelectResult.textContent);
    amenitiesHoverBed(Number.parseInt(bedSelectResult.textContent));
    amenitiesSummText();
  }
}); //-----ванные комнаты----//

bathroomSelectMin.addEventListener('click', function () {
  if (bathroomSelectResult.textContent >= 1) {
    bathroomSelectResult.textContent = Number.parseInt(bathroomSelectResult.textContent) - 1;
    console.log(bathroomSelectResult.textContent);
    amenitiesHoverBathroom(Number.parseInt(bathroomSelectResult.textContent));
    amenitiesSummText();
  }
});
bathroomSelectMax.addEventListener('click', function () {
  if (bathroomSelectResult.textContent != -1) {
    bathroomSelectResult.textContent = Number.parseInt(bathroomSelectResult.textContent) + 1;
    console.log(bathroomSelectResult.textContent);
    amenitiesHoverBathroom(Number.parseInt(bathroomSelectResult.textContent));
    amenitiesSummText();
  }
}); //----Функция числовых склонений количества гостей

function amenitiesSummText() {
  var inputNumBedroom = Number.parseInt(bedroomSelectResult.textContent);
  var inputNumBed = Number.parseInt(bedSelectResult.textContent);
  var inputNumBathroom = Number.parseInt(bathroomSelectResult.textContent);
  var inputNum = inputNumBedroom + inputNumBed + inputNumBathroom;

  if (inputNum == 0) {
    //visitorInput.textContent = 'Сколько гостей';
    amenitiesInput.value = 'Удобства';
  }

  btnClearAmenities(inputNum);
  var inputTextBedroom = ['cпальня', 'cпальни', 'cпален'];
  var inputTextBed = ['кровать', 'кровати', 'кроватей'];
  var inputTextBathroom = ['ванная', 'ванные', 'ванн'];
  var amenitiesBedroomAll = 0;
  var amenitiesBedAll = 0;
  var amenitiesBathroomAll = 0;

  if (inputNumBedroom >= 1) {
    amenitiesBedroomAll = "".concat(inputNumBedroom, " ").concat(nameNumber(inputNumBedroom, inputTextBedroom), ",");
    console.log(amenitiesBedroomAll);
  } else {
    amenitiesBedroomAll = '';
    inputNumBedroom = '';
    console.log(amenitiesBedroomAll);
  }

  if (inputNumBed >= 1) {
    console.log(inputNumBed, inputTextBed);
    amenitiesBedAll = "".concat(inputNumBed, " ").concat(nameNumber(inputNumBed, inputTextBed), ",");
    console.log(amenitiesBedAll);
  } else {
    amenitiesBedAll = '';
    inputNumBed = '';
    console.log(amenitiesBedAll);
  }

  if (inputNumBathroom >= 1) {
    if (inputNumBathroom >= 1 && inputNumBedroom >= 1 && inputNumBed >= 1) {
      amenitiesBathroomAll = '...';
      console.log(amenitiesBathroomAll);
    } else {
      amenitiesBathroomAll = "".concat(inputNumBathroom, " ").concat(nameNumber(inputNumBathroom, inputTextBathroom));
      console.log(amenitiesBathroomAll);
    }
  } else {
    amenitiesBathroomAll = '';
    inputNumBathroom = '';
    console.log(amenitiesBathroomAll);
  }

  amenitiesInput.value = "".concat(amenitiesBedroomAll, " ").concat(amenitiesBedAll, " ").concat(amenitiesBathroomAll);
  console.log(amenitiesInput.value);

  function nameNumber(number, text) {
    var cases = [2, 0, 1, 1, 1, 2];
    return text[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
  }
} //------------------------------------------//
//function amenitiesSummText() {
//	//iputNam = Number.parseInt(iputNam);
//	let inputNum = Number.parseInt(bedroomSelectResult.textContent) + Number.parseInt(bedSelectResult.textContent) + Number.parseInt(bathroomSelectResult.textContent);
//	console.log('inputNum');
//	console.log(inputNum);
//	btnClearAmenities(inputNum);
//	//fullSumm = Number(fullSumm);
//	if (inputNum == 0) {
//		//visitorInput.textContent = 'Сколько гостей';
//		amenitiesInput.value = 'Удобства';
//	}
//	if ((inputNum == 1) || (inputNum == 21)) {
//		//visitorInput.textContent = iputNam + ' гость';
//		amenitiesInput.value = inputNum + ' гость';
//	}
//	if ((inputNum > 1 && inputNum < 5) || (inputNum > 21 && inputNum < 25)) {
//		//visitorInput.textContent = iputNam + ' гостя';
//		amenitiesInput.value = inputNum + ' гостя';
//	}
//	if ((inputNum > 4 && inputNum < 21) || (inputNum > 24 && inputNum < 31)) {
//		//visitorInput.textContent = iputNam + ' гостей';
//		amenitiesInput.value = inputNum + ' гостей';
//	}
//	if (inputNum >= 31) {
//		//visitorInput.textContent = 'Слишком много!'
//		amenitiesInput.value = 'Слишком много!'
//	}
//}
//------------------всплытие и проверка кнопки очистить---------//


amenitiesBtnClear.addEventListener('click', function () {
  amenitiesInput.value = 'Удобства';
  bedroomSelectResult.textContent = 0;
  bedSelectResult.textContent = 0;
  bathroomSelectResult.textContent = 0; //visitorHoverBig(Number.parseInt(bigSelectResult.textContent));

  amenitiesHoverBedroom(Number.parseInt(bedroomSelectResult.textContent)); //visitorHoverChild(Number.parseInt(bedSelectResult.textContent));

  amenitiesHoverBed(Number.parseInt(bedSelectResult.textContent)); //visitorHoverBabi(Number.parseInt(bathroomSelectResult.textContent));

  amenitiesHoverBathroom(Number.parseInt(bathroomSelectResult.textContent));
  btnClearAmenities(0);
});

function btnClearAmenities(numClear) {
  var dropInputMenu = document.querySelector('.drop-input_props-amenities');

  if (numClear > 0) {
    amenitiesBtnClear.classList.add('drop-input-menu_clear-display');
    dropInputMenu.classList.add('drop-input_flex');
  }

  if (numClear <= 0) {
    amenitiesBtnClear.classList.remove('drop-input-menu_clear-display');
    dropInputMenu.classList.remove('drop-input_flex');
  }
} //------------------кнопка применить---------//


amenitiesBtnSave.addEventListener('click', function () {
  amenitiesDrop.classList.toggle('drop-amenities_display');
  amenitiesInput.classList.toggle('form-amenities-input_border');
});

/***/ }),

/***/ "./block/pagination/pagination.js":
/*!****************************************!*\
  !*** ./block/pagination/pagination.js ***!
  \****************************************/
/***/ (() => {

var blockPagination = document.querySelector('.pagination-href');
console.log(blockPagination);

blockPagination.onclick = function (event) {
  var punktPaginationTarget = event.target; //на чем был произведен клик

  console.log("punktPaginationTarget");
  console.log(punktPaginationTarget);
  var parentPunktTarget = punktPaginationTarget.parentElement; //родитель элемента на котором кликнули

  console.log("parentPunktTarget");
  console.log(parentPunktTarget);
  var childrenPunktTarget = parentPunktTarget.children; //дочерние элементы родителя элемента на котором был клик

  console.log("childrenPunktTarget");
  console.log(childrenPunktTarget);
  var lenghtChildrenPunktTarget = childrenPunktTarget.length; //количество ячеек в массиве

  console.log(lenghtChildrenPunktTarget); // обработка массива с удалением свойств

  for (var i = 0; i < childrenPunktTarget.length; i++) {
    var punktChildrenPagination = childrenPunktTarget[i];
    punktChildrenPagination.classList.remove('pagination-href_punkt-active'); //удаление свойств активного вида
  }

  punktPaginationTarget.classList.add('pagination-href_punkt-active'); //добавление свойств активного вида
};

/***/ }),

/***/ "./block/searchresult/searchresult.js":
/*!********************************************!*\
  !*** ./block/searchresult/searchresult.js ***!
  \********************************************/
/***/ (() => {



/***/ }),

/***/ "./block/visitor/visitor.js":
/*!**********************************!*\
  !*** ./block/visitor/visitor.js ***!
  \**********************************/
/***/ (() => {

//тип и колличество гостей
var visitorBtn = document.querySelector('.form-visitor-button');
var visitorInput = document.querySelector('.form-visitor-input'); //поле вывода колличества гостей

var visitorForm = document.querySelector('.form-visitor');
var visitorDrop = document.querySelector('.drop-visitor');
var visitorBtnSave = document.querySelector('.drop-input-menu_save');
var visitorBtnClear = document.querySelector('.drop-input-menu_clear'); //расчет гостей
//взрослые

var bigSelectMin = document.querySelector('.drop-big-select-small');
var bigSelectMax = document.querySelector('.drop-big-select-more');
var bigSelectResult = document.querySelector('.drop-big-select-result'); //сколько взрослых
//дети

var childSelectMin = document.querySelector('.drop-children-select-small');
var childSelectMax = document.querySelector('.drop-children-select-more');
var childSelectResult = document.querySelector('.drop-children-select-result'); //сколько детей
//младенцы

var babiSelectMin = document.querySelector('.drop-babies-select-small');
var babiSelectMax = document.querySelector('.drop-babies-select-more');
var babiSelectResult = document.querySelector('.drop-babies-select-result'); //сколько младенцев

console.log(visitorBtn);
console.log(visitorInput);
console.log(visitorForm);
console.log(visitorDrop);
console.log(bigSelectMin);
console.log(bigSelectMax);
console.log(bigSelectResult);
console.log(bigSelectResult.textContent);
console.log(bigSelectResult.value);
console.log(childSelectMin);
console.log(childSelectMax);
console.log(childSelectResult);
console.log(childSelectResult.textContent);
console.log(childSelectResult.value);
console.log(babiSelectMin);
console.log(babiSelectMax);
console.log(babiSelectResult);
console.log(babiSelectResult.textContent);
console.log(babiSelectResult.value);
visitorInput.value = 'Сколько гостей'; //----прописать активацию кнопок при значении более 0

function visitorHoverBig(namBigHover) {
  if (namBigHover >= 1) {
    bigSelectMin.classList.add('drop-select_small-hover');
    console.log(namBigHover);
  } else {
    bigSelectMin.classList.remove('drop-select_small-hover');
    console.log(namBigHover);
  }
}

function visitorHoverChild(namChildHover) {
  if (namChildHover >= 1) {
    childSelectMin.classList.add('drop-select_small-hover');
  } else {
    childSelectMin.classList.remove('drop-select_small-hover');
  }
}

function visitorHoverBabi(namBabiHover) {
  if (namBabiHover >= 1) {
    babiSelectMin.classList.add('drop-select_small-hover');
  } else {
    babiSelectMin.classList.remove('drop-select_small-hover');
  }
} //-----суммирование гостей нет смысла-----------//
//function visitorSumm(bigNam, childNam, babiNam) {
//	console.log(Number.parseInt(bigNam));
//	console.log(Number.parseInt(childNam));
//	console.log(Number.parseInt(babiNam));
//	let fullSumm = bigNam + childNam + babiNam;
//	console.log(fullSumm);
//	visitorSummText(fullSumm);
//	visitorHover(bigNam, childNam, babiNam);
//}
//-----разварот списка выборки------//


visitorBtn.addEventListener('click', function () {
  //let visitorDrop = document.querySelector('.drop-visitor');
  console.log('visitorDrop');
  console.log(visitorDrop); //visitorDrop.style.display = 'display';
  //visitorDrop.classList.add('drop-visitor_display');

  visitorDrop.classList.toggle('drop-visitor_display');
  visitorInput.classList.toggle('form-visitor-input_border');
}); //---------выборка количеств гостей------//
//-----взрослые----//

bigSelectMin.addEventListener('click', function () {
  if (bigSelectResult.textContent >= 1) {
    bigSelectResult.textContent = Number.parseInt(bigSelectResult.textContent) - 1;
    console.log(bigSelectResult.textContent); //btnClearVisitor();

    visitorHoverBig(Number.parseInt(bigSelectResult.textContent)); //visitorSumm(Number.parseInt(bigSelectResult.textContent), 0, 0);
    //visitorSummText(Number.parseInt(bigSelectResult.textContent));

    visitorSummText(); //на сумму 1 аргумент, также сюда вставляем ховер
  }
});
bigSelectMax.addEventListener('click', function () {
  if (bigSelectResult.textContent != -1) {
    bigSelectResult.textContent = Number.parseInt(bigSelectResult.textContent) + 1;
    console.log(bigSelectResult.textContent); //btnClearVisitor();

    visitorHoverBig(Number.parseInt(bigSelectResult.textContent)); //visitorSumm(Number.parseInt(bigSelectResult.textContent), 0, 0);
    //visitorSummText(Number.parseInt(bigSelectResult.textContent));

    visitorSummText();
  }
}); //-----дети----//

childSelectMin.addEventListener('click', function () {
  if (childSelectResult.textContent >= 1) {
    childSelectResult.textContent = Number.parseInt(childSelectResult.textContent) - 1;
    console.log(childSelectResult.textContent); //btnClearVisitor();

    visitorHoverChild(Number.parseInt(childSelectResult.textContent)); //visitorSumm(0, Number.parseInt(childSelectResult.textContent), 0);
    //visitorSummText(Number.parseInt(bigSelectResult.textContent));

    visitorSummText();
  }
});
childSelectMax.addEventListener('click', function () {
  if (childSelectResult.textContent != -1) {
    childSelectResult.textContent = Number.parseInt(childSelectResult.textContent) + 1;
    console.log(childSelectResult.textContent); //btnClearVisitor();

    visitorHoverChild(Number.parseInt(childSelectResult.textContent)); //visitorSumm(0, Number.parseInt(childSelectResult.textContent), 0);
    //visitorSummText(Number.parseInt(bigSelectResult.textContent));

    visitorSummText();
  }
}); //-----младенцы----//

babiSelectMin.addEventListener('click', function () {
  if (babiSelectResult.textContent >= 1) {
    babiSelectResult.textContent = Number.parseInt(babiSelectResult.textContent) - 1;
    console.log(babiSelectResult.textContent); //btnClearVisitor();

    visitorHoverBabi(Number.parseInt(babiSelectResult.textContent)); //visitorSumm(0, 0, Number.parseInt(babiSelectResult.textContent));
    //visitorSummText(Number.parseInt(bigSelectResult.textContent));

    visitorSummText();
  }
});
babiSelectMax.addEventListener('click', function () {
  if (babiSelectResult.textContent != -1) {
    babiSelectResult.textContent = Number.parseInt(babiSelectResult.textContent) + 1;
    console.log(babiSelectResult.textContent); //btnClearVisitor();

    visitorHoverBabi(Number.parseInt(babiSelectResult.textContent)); //visitorSumm(0, 0, Number.parseInt(babiSelectResult.textContent));
    //visitorSummText(Number.parseInt(bigSelectResult.textContent));

    visitorSummText();
  }
}); //----Функция числовых склонений количества гостей

function visitorSummText() {
  //iputNam = Number.parseInt(iputNam);
  var inputNum = Number.parseInt(bigSelectResult.textContent) + Number.parseInt(childSelectResult.textContent) + Number.parseInt(babiSelectResult.textContent);
  console.log('inputNum');
  console.log(inputNum);
  btnClearVisitor(inputNum); //fullSumm = Number(fullSumm);

  if (inputNum == 0) {
    //visitorInput.textContent = 'Сколько гостей';
    visitorInput.value = 'Сколько гостей';
  }

  if (inputNum == 1 || inputNum == 21) {
    //visitorInput.textContent = iputNam + ' гость';
    visitorInput.value = inputNum + ' гость';
  }

  if (inputNum > 1 && inputNum < 5 || inputNum > 21 && inputNum < 25) {
    //visitorInput.textContent = iputNam + ' гостя';
    visitorInput.value = inputNum + ' гостя';
  }

  if (inputNum > 4 && inputNum < 21 || inputNum > 24 && inputNum < 31) {
    //visitorInput.textContent = iputNam + ' гостей';
    visitorInput.value = inputNum + ' гостей';
  }

  if (inputNum >= 31) {
    //visitorInput.textContent = 'Слишком много!'
    visitorInput.value = 'Слишком много!';
  } //visitorInput.textContent

} //------------------всплытие и проверка кнопки очистить---------//


visitorBtnClear.addEventListener('click', function () {
  visitorInput.value = 'Сколько гостей';
  bigSelectResult.textContent = 0;
  childSelectResult.textContent = 0;
  babiSelectResult.textContent = 0;
  visitorHoverBig(Number.parseInt(bigSelectResult.textContent));
  visitorHoverChild(Number.parseInt(childSelectResult.textContent));
  visitorHoverBabi(Number.parseInt(babiSelectResult.textContent)); //visitorDrop.classList.toggle('drop-visitor_display');
  //visitorInput.classList.toggle('form-visitor-input_border');

  btnClearVisitor(0);
});

function btnClearVisitor(numClear) {
  var dropInputMenu = document.querySelector('.drop-input_props');

  if (numClear > 0) {
    visitorBtnClear.classList.add('drop-input-menu_clear-display');
    dropInputMenu.classList.add('drop-input_flex');
  }

  if (numClear <= 0) {
    visitorBtnClear.classList.remove('drop-input-menu_clear-display');
    dropInputMenu.classList.remove('drop-input_flex');
  }
} //------------------кнопка применить---------//


visitorBtnSave.addEventListener('click', function () {
  visitorDrop.classList.toggle('drop-visitor_display');
  visitorInput.classList.toggle('form-visitor-input_border');
});

/***/ }),

/***/ "./js/searchroom.js":
/*!**************************!*\
  !*** ./js/searchroom.js ***!
  \**************************/
/***/ (() => {

//получить данные с предыдущей страницы
//let dateSearch = localStorage.getItem(dateIn) + localStorage.getItem(dateOut);
//console.log(dateSearch);
//let formVisitor = document.querySelector('.form-visitor');
//console.log(formVisitor);
//let basikAmenitiesBtn = document.querySelector('.form-amenities-button');   //кнопка разворота основных удобств
//console.log(basikAmenitiesBtn);
//let basikAmenitiesInput = document.querySelector('.form-amenities-input');   //поле ввода количества удобств
//console.log(basikAmenitiesInput);
//let basikAmenitiesDrop = document.querySelector('.drop-amenities');   //поле ввода количества удобств
//console.log(basikAmenitiesDrop);
//formVisitor.style.width="266px";
//-------------------------------
//basikAmenitiesBtn.addEventListener('click', function () {
//let visitorDrop = document.querySelector('.drop-visitor');
//console.log('visitorDrop');
//console.log(visitorDrop);
//visitorDrop.style.display = 'display';
//visitorDrop.classList.add('drop-visitor_display');
//	visitorDrop.classList.toggle('drop-visitor_display');
//	visitorInput.classList.toggle('form-visitor-input_border');
//});
//formVisitor.removeAttribute('width');
//formVisitor.setAttribute('width', '266px');

/***/ }),

/***/ "./modules/checklist/checklist.js":
/*!****************************************!*\
  !*** ./modules/checklist/checklist.js ***!
  \****************************************/
/***/ (() => {



/***/ }),

/***/ "./modules/rangdate/rangdate.js":
/*!**************************************!*\
  !*** ./modules/rangdate/rangdate.js ***!
  \**************************************/
/***/ (() => {

//let coming = document.querySelector('.form-coming-button');
var dateLive = document.querySelector('.form-date-button'); //let startDate = document.querySelector('.form-coming_input');     //дата въезда

var rangeDate = document.querySelector('.form-date_input'); //дата въезда
//let departure = document.querySelector('.form-departure-button');
//let endDate = document.querySelector('.form-departure_input');  //дата выезда

var formVisitorInput = document.querySelector('.form-visitor-input');
var datepickerBlock = "<div class=\"datepicker-here\" data-position=\"right top\"></div>";
var insertCalendar = "<section class=\"calendar calendar_props\">\n\t\t\t\t\t\t\t\t\t\t\t\t".concat(datepickerBlock, "\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"calendar-bottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"button-clear calendar_button \">\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"button-apply calendar_button\">\u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</section>");
var insertVisitor = ""; //применить

var applySelect = document.querySelector('.batton-arrow_apply'); //кнопка подобрать
//console.log(coming);

console.log(dateLive); //выборка дат из календаря-----------------
//coming.addEventListener('click', function() {

dateLive.addEventListener('click', function () {
  console.log('нажата кнопка даты пребывания в отеле'); //let buttonCalendar = document.querySelector('.form-coming');

  var buttonCalendar = document.querySelector('.form-date');
  var btnForm = '.form-date_input';
  calendarOutput(buttonCalendar, btnForm); //вывод календаря

  btnCalendarResult(); //кнопки в календаре
}); //departure.addEventListener('click', function() {
//	console.log('нажата кнопка ВЫЕЗД');
//	let buttonCalendar = document.querySelector('.form-departure');
//	let btnForm = '.form-departure_input';
//	calendarOutput(buttonCalendar, btnForm);
//
//	btnCalendarResult();
//});
//функция вывода результатов выбора данных

function btnCalendarResult() {
  var btnCalendarClear = document.querySelector('.button-clear');
  var btnCalendarApply = document.querySelector('.button-apply');
  btnCalendarApply.addEventListener('click', function () {
    console.log('Нажата кнопка ПРИМЕНИТЬ');
    calendarDelete();
  });
  btnCalendarClear.addEventListener('click', function () {
    console.log('Нажата кнопка ОЧИСТИТЬ'); //сюда вписать диапазон дат

    rangeDate.value = 'ДД.МММ. - ДД.МММ.'; //startDate.value = 'ДД.ММ.ГГГГ';
    //endDate.value = 'ДД.ММ.ГГГГ';

    calendarDelete();
  });
} //функция формирования календаря


function calendarOutput(btnClick, btnInput) {
  console.log(btnClick);
  var blockCalendar = document.querySelector('.calendar');

  if (blockCalendar != null) {
    console.log('значение blockCalendar ' + blockCalendar);
    calendarDelete();
    datepickerCreate(btnInput);
    btnClick.insertAdjacentHTML('beforeEnd', insertCalendar);
  } else {
    datepickerCreate(btnInput);
    btnClick.insertAdjacentHTML('beforeEnd', insertCalendar);
  }
} //функция удаления календаря


function calendarDelete() {
  var blockCalendar = document.querySelector('.calendar'); //blockCalendar.style.display = 'none';

  blockCalendar.remove();
} //функция вызова датапикера


function datepickerCreate(btnForm) {
  //let btnForm = d
  console.log('btnForm - ' + btnForm);
  $(function () {
    $('.datepicker-here').datepicker({
      //altField: btnForm,                   //выгрузка в поле btnForm
      //altFieldDateFormat: 'dd.mm.yyyy',    //формат даты выгрузки
      range: true,
      // диапазон дат включен
      toggleSelected: false,
      // разрешить выбор 1й даты
      multipleDatesSeparator: ' - ',
      // разделитель диапазона дат
      minDate: new Date(),
      // запретить выбор ниже текущей даты
      onSelect: function onSelect(selectedDates) {
        //выборка диапазона
        console.log(selectedDates);

        if (selectedDates !== undefined && selectedDates != '' && selectedDates.indexOf('-') > -1) {
          mdyCalendar = selectedDates.split('- ');
          console.log('mdyCalendar - ' + mdyCalendar);
          console.log(mdyCalendar);
          var mdyStart = mdyCalendar[0];
          var mdyEnd = mdyCalendar[1];
          console.log(mdyStart);
          console.log(mdyEnd); //startDate.value = mdyStart;
          //endDate.value = mdyEnd;
          //rangeDate.value = 'ДД.МММ. - ДД.МММ.';

          rangeDate.value = mdyStart + ' - ' + mdyEnd;
        } //return mdyCalendar;

      }
    }); //$('.datepicker-here').data('datepicker');
  });
} //------------------------------
//-----------------кнопка подобрать номер--------//
//applySelect.addEventListener('click', function () {
//	//составим переменные запроса и запишим в локалсторадж
//	let applySelectData = startDate.value.trim() + ';' + endDate.value.trim() + ';' + formVisitorInput.value.trim();
//	console.log(applySelectData);
//	localStorage.removeItem('dateIn');
//	localStorage.removeItem('dateOut');
//	localStorage.removeItem('visitor');
//	localStorage.setItem('dateIn', startDate.value.trim());
//	localStorage.setItem('dateOut', endDate.value.trim());
//	localStorage.setItem('visitor', formVisitorInput.value.trim());
//	//window.open('searchroom.html');
//});
//-------------------------------
//---определяем родителя для вставки блока
//let elementClick = coming;
//elementClick.onclick = function(event){
//	let elementTarget = event.target;      //кнопка
//	console.log(elementTarget);
//	let parentElementTarget = elementTarget.parentElement;       //форма запроса
//	console.log(parentElementTarget);
//	let tableTargetParent = parentElementTarget.children;        // вся форма
//	console.log(tableTargetParent);
//	//textWrite.textContent = tableTargetParent[2].textContent;
//	console.log(tableTargetParent);
//};
//<section className="calendar">
//	<div className="datepicker-here" data-position="right top" data-range="true"
//			 data-multiple-dates-separator=" - "></div>
//	<div className="calendar-bottom">
//		<div className="button-clear calendar_button ">очистить</div>
//		<div className="button-apply calendar_button">применить</div>
//	</div>
//</section>

/***/ }),

/***/ "./modules/rangeslider/rangeslider.js":
/*!********************************************!*\
  !*** ./modules/rangeslider/rangeslider.js ***!
  \********************************************/
/***/ (() => {

var titleSummMin = document.querySelector(".range-title-summ_min");
console.log(titleSummMin);
var titleSummMax = document.querySelector(".range-title-summ_max");
console.log(titleSummMax);
var inputsRy = {
  sliderWidth: 266,
  minRange: 1000,
  maxRange: 20000,
  outputWidth: 30,
  // output width
  thumbWidth: 16,
  // thumb width
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
var thumbRealWidth = inputsRy.thumbWidth + 2 * inputsRy.thumbBorderWidth; // styles

var slider = document.querySelector(".slider");
console.log(slider); //полоска слайдера высота

slider.style.height = inputsRy.trackHeight + "px"; //полоска слайдера ширина

slider.style.width = inputsRy.sliderWidth + "px"; //полоска слайдера отступы

slider.style.paddingLeft = (inputsRy.theValue[0] - inputsRy.minRange) * rangeK + "px";
slider.style.paddingRight = inputsRy.sliderWidth - inputsRy.theValue[1] * rangeK + "px";
var track = document.querySelector(".track");
track.style.width = inputsRy.theValue[1] * rangeK - inputsRy.theValue[0] * rangeK + "px";
var thumbs = document.querySelectorAll(".thumb");
console.log(thumbs);

for (var i = 0; i < thumbs.length; i++) {
  //пипки слайдера ширена=высоте
  thumbs[i].style.width = thumbs[i].style.height = inputsRy.thumbWidth + "px";
  console.log(inputsRy.thumbWidth + "px"); //пипки слайдера бордюр

  thumbs[i].style.borderWidth = inputsRy.thumbBorderWidth + "px"; //пипки слайдера позиция сверху

  thumbs[i].style.top = -(inputsRy.thumbWidth / 2 + inputsRy.thumbBorderWidth - inputsRy.trackHeight / 2 - 1) + "px";
  console.log(thumbs[i].style.top); //пипки слайдера позиция слева

  thumbs[i].style.left = (inputsRy.theValue[i] - inputsRy.minRange) * rangeK - thumbRealWidth / 2 + "px";
}

var outputs = document.querySelectorAll(".output");

for (var _i = 0; _i < outputs.length; _i++) {
  console.log(thumbs[_i]);
  outputs[_i].style.width = outputs[_i].style.height = outputs[_i].style.lineHeight = outputs[_i].style.left = inputsRy.outputWidth + "px";
  outputs[_i].style.top = -(Math.sqrt(2 * inputsRy.outputWidth * inputsRy.outputWidth) + inputsRy.thumbWidth / 2 - inputsRy.trackHeight / 2) + "px";
  outputs[_i].style.left = (inputsRy.theValue[_i] - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
  outputs[_i].innerHTML = "<p>" + inputsRy.theValue[_i] + "</p>";

  if (_i == 0) {
    titleSummMin.textContent = inputsRy.theValue[0] + "₽";
    console.log(titleSummMin.textContent);
  }

  if (_i == 1) {
    titleSummMax.textContent = inputsRy.theValue[1] + "₽";
    console.log(titleSummMax.textContent);
  }
} //events


thumbs[0].addEventListener("mousedown", function (evt) {
  isDragging0 = true;
}, false);
thumbs[1].addEventListener("mousedown", function (evt) {
  isDragging1 = true;
}, false);
container.addEventListener("mouseup", function (evt) {
  isDragging0 = false;
  isDragging1 = false;
}, false);
container.addEventListener("mouseout", function (evt) {
  isDragging0 = false;
  isDragging1 = false;
}, false);
container.addEventListener("mousemove", function (evt) {
  var mousePos = oMousePos(this, evt);
  var theValue0 = isDragging0 ? Math.round(mousePos.x / rangeK) + inputsRy.minRange : inputsRy.theValue[0];
  console.log(theValue0);
  var theValue1 = isDragging1 ? Math.round(mousePos.x / rangeK) + inputsRy.minRange : inputsRy.theValue[1];

  if (isDragging0) {
    if (theValue0 < theValue1 - thumbRealWidth / 2 && theValue0 >= inputsRy.minRange) {
      inputsRy.theValue[0] = theValue0;
      thumbs[0].style.left = (theValue0 - inputsRy.minRange) * rangeK - thumbRealWidth / 2 + "px";
      outputs[0].style.left = (theValue0 - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
      outputs[0].innerHTML = "<p>" + theValue0 + "</p>";
      titleSummMin.textContent = theValue0 + "₽";
      slider.style.paddingLeft = (theValue0 - inputsRy.minRange) * rangeK + "px";
      track.style.width = (theValue1 - theValue0) * rangeK + "px";
    }
  } else if (isDragging1) {
    if (theValue1 > theValue0 + thumbRealWidth / 2 && theValue1 <= inputsRy.maxRange) {
      inputsRy.theValue[1] = theValue1;
      thumbs[1].style.left = (theValue1 - inputsRy.minRange) * rangeK - thumbRealWidth / 2 + "px";
      outputs[1].style.left = (theValue1 - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
      outputs[1].innerHTML = "<p>" + theValue1 + "</p>";
      titleSummMax.textContent = theValue1 + "₽";
      console.log(titleSummMax.textContent);
      slider.style.paddingRight = (inputsRy.maxRange - theValue1) * rangeK + "px";
      track.style.width = (theValue1 - theValue0) * rangeK + "px";
    }
  }
}, false); // helpers

function oMousePos(elmt, evt) {
  var ClientRect = elmt.getBoundingClientRect();
  return {
    //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  };
}

/***/ }),

/***/ "./modules/stars/stars.js":
/*!********************************!*\
  !*** ./modules/stars/stars.js ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./block/amenities/amenities.css":
/*!***************************************!*\
  !*** ./block/amenities/amenities.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/calendar/calendar.css":
/*!*************************************!*\
  !*** ./block/calendar/calendar.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/pagination/pagination.css":
/*!*****************************************!*\
  !*** ./block/pagination/pagination.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/searchresult/searchresult.css":
/*!*********************************************!*\
  !*** ./block/searchresult/searchresult.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/searchresult/serchresultbackgraund.css":
/*!******************************************************!*\
  !*** ./block/searchresult/serchresultbackgraund.css ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/visitor/visitor.css":
/*!***********************************!*\
  !*** ./block/visitor/visitor.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/searchroom.css":
/*!****************************!*\
  !*** ./css/searchroom.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/checkbutton/checkbutton.css":
/*!*********************************************!*\
  !*** ./modules/checkbutton/checkbutton.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/checklist/checklist.css":
/*!*****************************************!*\
  !*** ./modules/checklist/checklist.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/rangdate/rangdate.css":
/*!***************************************!*\
  !*** ./modules/rangdate/rangdate.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/rangeslider/rangeslider.css":
/*!*********************************************!*\
  !*** ./modules/rangeslider/rangeslider.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/stars/stars.css":
/*!*********************************!*\
  !*** ./modules/stars/stars.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************!*\
  !*** ./search.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_rangeslider_rangeslider_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/rangeslider/rangeslider.css */ "./modules/rangeslider/rangeslider.css");
/* harmony import */ var _modules_rangeslider_rangeslider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/rangeslider/rangeslider.js */ "./modules/rangeslider/rangeslider.js");
/* harmony import */ var _modules_rangeslider_rangeslider_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_rangeslider_rangeslider_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_rangdate_rangdate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/rangdate/rangdate.js */ "./modules/rangdate/rangdate.js");
/* harmony import */ var _modules_rangdate_rangdate_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_rangdate_rangdate_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_rangdate_rangdate_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/rangdate/rangdate.css */ "./modules/rangdate/rangdate.css");
/* harmony import */ var _block_calendar_calendar_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block/calendar/calendar.css */ "./block/calendar/calendar.css");
/* harmony import */ var _block_visitor_visitor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block/visitor/visitor.js */ "./block/visitor/visitor.js");
/* harmony import */ var _block_visitor_visitor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_block_visitor_visitor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _block_visitor_visitor_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./block/visitor/visitor.css */ "./block/visitor/visitor.css");
/* harmony import */ var _js_searchroom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/searchroom.js */ "./js/searchroom.js");
/* harmony import */ var _js_searchroom_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_searchroom_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _modules_checklist_checklist_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/checklist/checklist.js */ "./modules/checklist/checklist.js");
/* harmony import */ var _modules_checklist_checklist_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_modules_checklist_checklist_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _modules_checklist_checklist_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/checklist/checklist.css */ "./modules/checklist/checklist.css");
/* harmony import */ var _css_searchroom_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./css/searchroom.css */ "./css/searchroom.css");
/* harmony import */ var _modules_checkbutton_checkbutton_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/checkbutton/checkbutton.css */ "./modules/checkbutton/checkbutton.css");
/* harmony import */ var _block_amenities_amenities_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./block/amenities/amenities.css */ "./block/amenities/amenities.css");
/* harmony import */ var _block_amenities_amenities_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./block/amenities/amenities.js */ "./block/amenities/amenities.js");
/* harmony import */ var _block_amenities_amenities_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_block_amenities_amenities_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _block_addamenities_addamenities_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./block/addamenities/addamenities.js */ "./block/addamenities/addamenities.js");
/* harmony import */ var _block_addamenities_addamenities_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_block_addamenities_addamenities_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _block_pagination_pagination_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./block/pagination/pagination.js */ "./block/pagination/pagination.js");
/* harmony import */ var _block_pagination_pagination_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_block_pagination_pagination_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _block_pagination_pagination_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./block/pagination/pagination.css */ "./block/pagination/pagination.css");
/* harmony import */ var _modules_stars_stars_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/stars/stars.js */ "./modules/stars/stars.js");
/* harmony import */ var _modules_stars_stars_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_modules_stars_stars_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _modules_stars_stars_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/stars/stars.css */ "./modules/stars/stars.css");
/* harmony import */ var _block_searchresult_searchresult_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./block/searchresult/searchresult.js */ "./block/searchresult/searchresult.js");
/* harmony import */ var _block_searchresult_searchresult_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_block_searchresult_searchresult_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _block_searchresult_searchresult_css__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./block/searchresult/searchresult.css */ "./block/searchresult/searchresult.css");
/* harmony import */ var _block_searchresult_serchresultbackgraund_css__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./block/searchresult/serchresultbackgraund.css */ "./block/searchresult/serchresultbackgraund.css");
//подключаем слайдер
 //модуль слайдера

 //скрипт слайдера
//подключение скриптов



 //блок вывода календаря



 //скрипт результатов поиска


 //---------------------------//













})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYmxvY2svYWRkYW1lbml0aWVzL2FkZGFtZW5pdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9ibG9jay9hbWVuaXRpZXMvYW1lbml0aWVzLmpzIiwid2VicGFjazovLy8uL2Jsb2NrL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ibG9jay92aXNpdG9yL3Zpc2l0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc2VhcmNocm9vbS5qcyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3JhbmdkYXRlL3JhbmdkYXRlLmpzIiwid2VicGFjazovLy8uL21vZHVsZXMvcmFuZ2VzbGlkZXIvcmFuZ2VzbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svYW1lbml0aWVzL2FtZW5pdGllcy5jc3M/OGFkYiIsIndlYnBhY2s6Ly8vLi9ibG9jay9jYWxlbmRhci9jYWxlbmRhci5jc3M/NzAwMCIsIndlYnBhY2s6Ly8vLi9ibG9jay9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY3NzPzNiMTEiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svc2VhcmNocmVzdWx0L3NlYXJjaHJlc3VsdC5jc3M/NWMwOCIsIndlYnBhY2s6Ly8vLi9ibG9jay9zZWFyY2hyZXN1bHQvc2VyY2hyZXN1bHRiYWNrZ3JhdW5kLmNzcz81NTg4Iiwid2VicGFjazovLy8uL2Jsb2NrL3Zpc2l0b3IvdmlzaXRvci5jc3M/MDgyZSIsIndlYnBhY2s6Ly8vLi9jc3Mvc2VhcmNocm9vbS5jc3M/ZmY5MiIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2NoZWNrYnV0dG9uL2NoZWNrYnV0dG9uLmNzcz83NzY5Iiwid2VicGFjazovLy8uL21vZHVsZXMvY2hlY2tsaXN0L2NoZWNrbGlzdC5jc3M/YjA4ZSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3JhbmdkYXRlL3JhbmdkYXRlLmNzcyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3Jhbmdlc2xpZGVyL3Jhbmdlc2xpZGVyLmNzcz9hMjI1Iiwid2VicGFjazovLy8uL21vZHVsZXMvc3RhcnMvc3RhcnMuY3NzP2Q2NDMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYWRkQW1lbml0aWVzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1hbWVuaXRpZXMtYmxvY2stYnRuJyk7XHJcbmxldCBhZGRBbWVuaXRpZXNCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtYW1lbml0aWVzLWJsb2NrLWNoZWNrJyk7XHJcblxyXG5cclxuYWRkQW1lbml0aWVzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGFkZEFtZW5pdGllc0J0bi5jbGFzc0xpc3QudG9nZ2xlKCdjaGVjay1saXN0LWNsb3NlZF9idXR0b24nKTtcclxuXHRhZGRBbWVuaXRpZXNCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnY2hlY2stbGlzdC1vcGVuX2J1dHRvbicpO1xyXG5cdGFkZEFtZW5pdGllc0Jsb2NrLmNsYXNzTGlzdC50b2dnbGUoJ2FkZC1hbWVuaXRpZXMtYmxvY2stY2hlY2tfYmxvY2snKTtcclxufSk7IiwiXHJcbmxldCBhbWVuaXRpZXNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hbWVuaXRpZXMtYnV0dG9uJyk7ICAgLy/QutC90L7Qv9C60LAg0LIg0L/QvtC70LUg0LLRi9Cx0L7RgNCwINC00LvRjyDRgNCw0LfQstGA0L7RgtCwXHJcbmxldCBhbWVuaXRpZXNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWFtZW5pdGllcy1pbnB1dCcpOyAgLy/Qv9C+0LvQtSDQstGL0LLQvtC00LAg0LLQuNC00LAg0Lgg0LrQvtC7LdCy0LAg0YPQtNC+0LHRgdGC0LJcclxubGV0IGFtZW5pdGllc0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hbWVuaXRpZXMnKTsgICAgLy/QstGB0Y8g0YTQvtGA0LzQsFxyXG5sZXQgYW1lbml0aWVzRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWFtZW5pdGllcycpOyAgIC8v0LLRi9C/0LDQtNCw0Y7RidC10LUg0LzQtdC90Y5cclxubGV0IGFtZW5pdGllc0J0blNhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1pbnB1dC1tZW51X3NhdmUtYW1lbml0aWVzJyk7ICAgLy/QutC90L7Qv9C60LAg0YHQvtGF0YDQsNC90LjRgtGMLdC/0YDQuNC80LXQvdC40YLRjFxyXG5sZXQgYW1lbml0aWVzQnRuQ2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1pbnB1dC1tZW51X2NsZWFyLWFtZW5pdGllcycpOyAgIC8v0LrQvdC+0L/QutCwINC+0YfQuNGB0YLQuNGC0YxcclxuLy/QvtGC0LHQvtGAINC90LDRgdGC0YDQvtC10Log0LLRi9C/0LDQtNCw0Y7RidC10LPQviDQvNC10L3RjlxyXG4vL2xldCBiaWdTZWxlY3RNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iaWctc2VsZWN0LXNtYWxsJyk7XHJcbmxldCBiZWRyb29tU2VsZWN0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmVkcm9vbS1zZWxlY3Qtc21hbGwnKTsgICAvL9GD0LzQtdC90YzRiNC10L3QuNC1XHJcbmxldCBiZWRyb29tU2VsZWN0TWF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmVkcm9vbS1zZWxlY3QtbW9yZScpOyAgIC8v0LrQstC10LvQuNGH0LXQvdC40LVcclxubGV0IGJlZHJvb21TZWxlY3RSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iZWRyb29tLXNlbGVjdC1yZXN1bHQnKTsgICAvL9GA0LXQt9GD0LvRjNGC0LDRglxyXG4vL9C00LXRgtC4XHJcbi8vbGV0IGNoaWxkU2VsZWN0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtY2hpbGRyZW4tc2VsZWN0LXNtYWxsJyk7ICAvL9GB0LrQvtC70YzQutC+INC00LXRgtC10LlcclxubGV0IGJlZFNlbGVjdE1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJlZC1zZWxlY3Qtc21hbGwnKTtcclxubGV0IGJlZFNlbGVjdE1heCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJlZC1zZWxlY3QtbW9yZScpO1xyXG5sZXQgYmVkU2VsZWN0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmVkLXNlbGVjdC1yZXN1bHQnKTtcclxuLy/QvNC70LDQtNC10L3RhtGLXHJcbi8vbGV0IGJhYmlTZWxlY3RNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iYWJpZXMtc2VsZWN0LXNtYWxsJyk7ICAgLy/RgdC60L7Qu9GM0LrQviDQvNC70LDQtNC10L3RhtC10LJcclxubGV0IGJhdGhyb29tU2VsZWN0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmF0aHJvb20tc2VsZWN0LXNtYWxsJyk7XHJcbmxldCBiYXRocm9vbVNlbGVjdE1heCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJhdGhyb29tLXNlbGVjdC1tb3JlJyk7XHJcbmxldCBiYXRocm9vbVNlbGVjdFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJhdGhyb29tLXNlbGVjdC1yZXN1bHQnKTtcclxuXHJcbmFtZW5pdGllc0lucHV0LnZhbHVlID0gJ9Cj0LTQvtCx0YHRgtCy0LAnO1xyXG4vLy0tLS0tLS0tLS3QmtC90L7Qv9C60LgtLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG4vLy0tLS0t0YDQsNC30LLQsNGA0L7RgiDRgdC/0LjRgdC60LAg0LLRi9Cx0L7RgNC60LgtLS0tLS0vL1xyXG5hbWVuaXRpZXNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc29sZS5sb2coJ2FtZW5pdGllc0Ryb3AnKTtcclxuXHRjb25zb2xlLmxvZyhhbWVuaXRpZXNEcm9wKTtcclxuXHRhbWVuaXRpZXNEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3AtYW1lbml0aWVzX2Rpc3BsYXknKTtcclxuXHRhbWVuaXRpZXNJbnB1dC5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtLWFtZW5pdGllcy1pbnB1dF9ib3JkZXInKTtcclxufSk7XHJcblxyXG4vLy0tLS0t0LDQutGC0LjQstCw0YbQuNGPINC60L3QvtC/0L7QuiDQv9GA0Lgg0LfQvdCw0YfQtdC90LjQuCDQsdC+0LvQtdC1IDAtLS0tLS0tLy9cclxuLy9mdW5jdGlvbiB2aXNpdG9ySG92ZXJCaWcobmFtQmlnSG92ZXIpIHtcclxuZnVuY3Rpb24gYW1lbml0aWVzSG92ZXJCZWRyb29tKG5hbUJlZHJvb21Ib3Zlcikge1xyXG5cdGlmIChuYW1CZWRyb29tSG92ZXIgPj0gMSkge1xyXG5cdFx0YmVkcm9vbVNlbGVjdE1pbi5jbGFzc0xpc3QuYWRkKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdFx0Y29uc29sZS5sb2cobmFtQmVkcm9vbUhvdmVyKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YmVkcm9vbVNlbGVjdE1pbi5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdFx0Y29uc29sZS5sb2cobmFtQmVkcm9vbUhvdmVyKTtcclxuXHR9XHJcbn1cclxuLy9mdW5jdGlvbiB2aXNpdG9ySG92ZXJDaGlsZChuYW1DaGlsZEhvdmVyKSB7XHJcbmZ1bmN0aW9uIGFtZW5pdGllc0hvdmVyQmVkKG5hbUJlZEhvdmVyKSB7XHJcblx0aWYgKG5hbUJlZEhvdmVyID49IDEpIHtcclxuXHRcdGJlZFNlbGVjdE1pbi5jbGFzc0xpc3QuYWRkKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRiZWRTZWxlY3RNaW4uY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHR9XHJcbn1cclxuLy9mdW5jdGlvbiB2aXNpdG9ySG92ZXJCYWJpKG5hbUJhYmlIb3Zlcikge1xyXG5mdW5jdGlvbiBhbWVuaXRpZXNIb3ZlckJhdGhyb29tKG5hbUJhdGhyb29tSG92ZXIpIHtcclxuXHRpZiAobmFtQmF0aHJvb21Ib3ZlciA+PSAxKSB7XHJcblx0XHRiYXRocm9vbVNlbGVjdE1pbi5jbGFzc0xpc3QuYWRkKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRiYXRocm9vbVNlbGVjdE1pbi5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdH1cclxufVxyXG5cclxuLy8tLS0tLS0tLS3QstGL0LHQvtGA0LrQsCDQutC+0LvQuNGH0LXRgdGC0LIg0YPQtNC+0LHRgdGC0LItLS0tLS0vL1xyXG4vLy0tLS0t0YHQv9Cw0LvRjNC90LgtLS0tLy9cclxuYmVkcm9vbVNlbGVjdE1pbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoYmVkcm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA+PSAxKSB7XHJcblx0XHRiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJlZHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpIC0gMTtcclxuXHRcdGNvbnNvbGUubG9nKGJlZHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdFx0YW1lbml0aWVzSG92ZXJCZWRyb29tKE51bWJlci5wYXJzZUludChiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHRhbWVuaXRpZXNTdW1tVGV4dCgpO1xyXG5cdFx0Ly/QvdCwINGB0YPQvNC80YMgMSDQsNGA0LPRg9C80LXQvdGCLCDRgtCw0LrQttC1INGB0Y7QtNCwINCy0YHRgtCw0LLQu9GP0LXQvCDRhdC+0LLQtdGAXHJcblx0fVxyXG59KTtcclxuYmVkcm9vbVNlbGVjdE1heC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoYmVkcm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCAhPSAtMSkge1xyXG5cdFx0YmVkcm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSArIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdGFtZW5pdGllc0hvdmVyQmVkcm9vbShOdW1iZXIucGFyc2VJbnQoYmVkcm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0YW1lbml0aWVzU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG4vLy0tLS0t0LrRgNC+0LLQsNGC0LgtLS0tLy9cclxuYmVkU2VsZWN0TWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPj0gMSkge1xyXG5cdFx0YmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgLSAxO1xyXG5cdFx0Y29uc29sZS5sb2coYmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdGFtZW5pdGllc0hvdmVyQmVkKE51bWJlci5wYXJzZUludChiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdGFtZW5pdGllc1N1bW1UZXh0KCk7XHJcblx0fVxyXG59KTtcclxuYmVkU2VsZWN0TWF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgIT0gLTEpIHtcclxuXHRcdGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgMTtcclxuXHRcdGNvbnNvbGUubG9nKGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHRhbWVuaXRpZXNIb3ZlckJlZChOdW1iZXIucGFyc2VJbnQoYmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHRhbWVuaXRpZXNTdW1tVGV4dCgpO1xyXG5cdH1cclxufSk7XHJcbi8vLS0tLS3QstCw0L3QvdGL0LUg0LrQvtC80L3QsNGC0YstLS0tLy9cclxuYmF0aHJvb21TZWxlY3RNaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID49IDEpIHtcclxuXHRcdGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSAtIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHRhbWVuaXRpZXNIb3ZlckJhdGhyb29tKE51bWJlci5wYXJzZUludChiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0YW1lbml0aWVzU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG5iYXRocm9vbVNlbGVjdE1heC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoYmF0aHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgIT0gLTEpIHtcclxuXHRcdGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSArIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHRhbWVuaXRpZXNIb3ZlckJhdGhyb29tKE51bWJlci5wYXJzZUludChiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0YW1lbml0aWVzU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8vLS0tLdCk0YPQvdC60YbQuNGPINGH0LjRgdC70L7QstGL0YUg0YHQutC70L7QvdC10L3QuNC5INC60L7Qu9C40YfQtdGB0YLQstCwINCz0L7RgdGC0LXQuVxyXG5mdW5jdGlvbiBhbWVuaXRpZXNTdW1tVGV4dCgpIHtcclxuXHJcblx0bGV0IGlucHV0TnVtQmVkcm9vbSA9IE51bWJlci5wYXJzZUludChiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRsZXQgaW5wdXROdW1CZWQgPSBOdW1iZXIucGFyc2VJbnQoYmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRsZXQgaW5wdXROdW1CYXRocm9vbSA9IE51bWJlci5wYXJzZUludChiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0bGV0IGlucHV0TnVtID0gaW5wdXROdW1CZWRyb29tICsgaW5wdXROdW1CZWQgKyBpbnB1dE51bUJhdGhyb29tO1xyXG5cclxuXHRpZiAoaW5wdXROdW0gPT0gMCkge1xyXG5cdFx0Ly92aXNpdG9ySW5wdXQudGV4dENvbnRlbnQgPSAn0KHQutC+0LvRjNC60L4g0LPQvtGB0YLQtdC5JztcclxuXHRcdGFtZW5pdGllc0lucHV0LnZhbHVlID0gJ9Cj0LTQvtCx0YHRgtCy0LAnO1xyXG5cdH1cclxuXHRidG5DbGVhckFtZW5pdGllcyhpbnB1dE51bSk7XHJcblxyXG5cdGxldCBpbnB1dFRleHRCZWRyb29tID0gWydj0L/QsNC70YzQvdGPJywgJ2PQv9Cw0LvRjNC90LgnLCAnY9C/0LDQu9C10L0nXTtcclxuXHRsZXQgaW5wdXRUZXh0QmVkID0gWyfQutGA0L7QstCw0YLRjCcsICfQutGA0L7QstCw0YLQuCcsICfQutGA0L7QstCw0YLQtdC5J107XHJcblx0bGV0IGlucHV0VGV4dEJhdGhyb29tID0gWyfQstCw0L3QvdCw0Y8nLCAn0LLQsNC90L3Ri9C1JywgJ9Cy0LDQvdC9J107XHJcblxyXG5cdGxldCBhbWVuaXRpZXNCZWRyb29tQWxsID0gIDA7XHJcblx0bGV0IGFtZW5pdGllc0JlZEFsbCA9IDA7XHJcblx0bGV0IGFtZW5pdGllc0JhdGhyb29tQWxsID0gMDtcclxuXHJcblx0aWYgKGlucHV0TnVtQmVkcm9vbSA+PSAxKSB7XHJcblx0XHRhbWVuaXRpZXNCZWRyb29tQWxsID0gYCR7aW5wdXROdW1CZWRyb29tfSAke25hbWVOdW1iZXIoaW5wdXROdW1CZWRyb29tLCBpbnB1dFRleHRCZWRyb29tKX0sYDtcclxuXHRcdGNvbnNvbGUubG9nKGFtZW5pdGllc0JlZHJvb21BbGwpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhbWVuaXRpZXNCZWRyb29tQWxsID0gJyc7XHJcblx0XHRpbnB1dE51bUJlZHJvb20gPSAnJztcclxuXHRcdGNvbnNvbGUubG9nKGFtZW5pdGllc0JlZHJvb21BbGwpO1xyXG5cdH1cclxuXHRpZiAoaW5wdXROdW1CZWQgPj0gMSkge1xyXG5cdFx0Y29uc29sZS5sb2coaW5wdXROdW1CZWQsIGlucHV0VGV4dEJlZCk7XHJcblx0XHRhbWVuaXRpZXNCZWRBbGwgPSBgJHtpbnB1dE51bUJlZH0gJHtuYW1lTnVtYmVyKGlucHV0TnVtQmVkLCBpbnB1dFRleHRCZWQpfSxgO1xyXG5cdFx0Y29uc29sZS5sb2coYW1lbml0aWVzQmVkQWxsKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YW1lbml0aWVzQmVkQWxsID0gJyc7XHJcblx0XHRpbnB1dE51bUJlZCA9ICcnO1xyXG5cdFx0Y29uc29sZS5sb2coYW1lbml0aWVzQmVkQWxsKTtcclxuXHR9XHJcblx0aWYgKGlucHV0TnVtQmF0aHJvb20gPj0gMSkge1xyXG5cdFx0aWYgKChpbnB1dE51bUJhdGhyb29tID49IDEpICYmIChpbnB1dE51bUJlZHJvb20gPj0gMSkgJiYgKGlucHV0TnVtQmVkID49IDEpKSB7XHJcblx0XHRcdGFtZW5pdGllc0JhdGhyb29tQWxsID0gJy4uLic7XHJcblx0XHRcdGNvbnNvbGUubG9nKGFtZW5pdGllc0JhdGhyb29tQWxsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFtZW5pdGllc0JhdGhyb29tQWxsID0gYCR7aW5wdXROdW1CYXRocm9vbX0gJHtuYW1lTnVtYmVyKGlucHV0TnVtQmF0aHJvb20sIGlucHV0VGV4dEJhdGhyb29tKX1gO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhhbWVuaXRpZXNCYXRocm9vbUFsbCk7XHJcblx0XHR9XHJcblxyXG5cdH0gZWxzZSB7XHJcblx0XHRhbWVuaXRpZXNCYXRocm9vbUFsbCA9ICcnO1xyXG5cdFx0aW5wdXROdW1CYXRocm9vbSA9ICcnO1xyXG5cdFx0Y29uc29sZS5sb2coYW1lbml0aWVzQmF0aHJvb21BbGwpO1xyXG5cdH1cclxuXHJcblx0YW1lbml0aWVzSW5wdXQudmFsdWUgPSBgJHthbWVuaXRpZXNCZWRyb29tQWxsfSAke2FtZW5pdGllc0JlZEFsbH0gJHthbWVuaXRpZXNCYXRocm9vbUFsbH1gO1xyXG5cdFx0Y29uc29sZS5sb2coYW1lbml0aWVzSW5wdXQudmFsdWUpO1xyXG5cclxuXHRmdW5jdGlvbiBuYW1lTnVtYmVyKG51bWJlciwgdGV4dCkge1xyXG5cdFx0bGV0IGNhc2VzID0gWzIsIDAsIDEsIDEsIDEsIDJdO1xyXG5cdFx0cmV0dXJuIHRleHRbKG51bWJlciAlIDEwMCA+IDQgJiYgbnVtYmVyICUgMTAwIDwgMjApID8gMiA6IGNhc2VzWyhudW1iZXIgJSAxMCA8IDUpID8gbnVtYmVyICUgMTAgOiA1XV07XHJcblx0fVxyXG59XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG4vL2Z1bmN0aW9uIGFtZW5pdGllc1N1bW1UZXh0KCkge1xyXG4vL1x0Ly9pcHV0TmFtID0gTnVtYmVyLnBhcnNlSW50KGlwdXROYW0pO1xyXG4vL1x0bGV0IGlucHV0TnVtID0gTnVtYmVyLnBhcnNlSW50KGJlZHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgTnVtYmVyLnBhcnNlSW50KGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgKyBOdW1iZXIucGFyc2VJbnQoYmF0aHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG4vL1x0Y29uc29sZS5sb2coJ2lucHV0TnVtJyk7XHJcbi8vXHRjb25zb2xlLmxvZyhpbnB1dE51bSk7XHJcbi8vXHRidG5DbGVhckFtZW5pdGllcyhpbnB1dE51bSk7XHJcbi8vXHQvL2Z1bGxTdW1tID0gTnVtYmVyKGZ1bGxTdW1tKTtcclxuLy9cdGlmIChpbnB1dE51bSA9PSAwKSB7XHJcbi8vXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gJ9Ch0LrQvtC70YzQutC+INCz0L7RgdGC0LXQuSc7XHJcbi8vXHRcdGFtZW5pdGllc0lucHV0LnZhbHVlID0gJ9Cj0LTQvtCx0YHRgtCy0LAnO1xyXG4vL1x0fVxyXG4vL1x0aWYgKChpbnB1dE51bSA9PSAxKSB8fCAoaW5wdXROdW0gPT0gMjEpKSB7XHJcbi8vXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gaXB1dE5hbSArICcg0LPQvtGB0YLRjCc7XHJcbi8vXHRcdGFtZW5pdGllc0lucHV0LnZhbHVlID0gaW5wdXROdW0gKyAnINCz0L7RgdGC0YwnO1xyXG4vL1x0fVxyXG4vL1x0aWYgKChpbnB1dE51bSA+IDEgJiYgaW5wdXROdW0gPCA1KSB8fCAoaW5wdXROdW0gPiAyMSAmJiBpbnB1dE51bSA8IDI1KSkge1xyXG4vL1x0XHQvL3Zpc2l0b3JJbnB1dC50ZXh0Q29udGVudCA9IGlwdXROYW0gKyAnINCz0L7RgdGC0Y8nO1xyXG4vL1x0XHRhbWVuaXRpZXNJbnB1dC52YWx1ZSA9IGlucHV0TnVtICsgJyDQs9C+0YHRgtGPJztcclxuLy9cdH1cclxuLy9cdGlmICgoaW5wdXROdW0gPiA0ICYmIGlucHV0TnVtIDwgMjEpIHx8IChpbnB1dE51bSA+IDI0ICYmIGlucHV0TnVtIDwgMzEpKSB7XHJcbi8vXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gaXB1dE5hbSArICcg0LPQvtGB0YLQtdC5JztcclxuLy9cdFx0YW1lbml0aWVzSW5wdXQudmFsdWUgPSBpbnB1dE51bSArICcg0LPQvtGB0YLQtdC5JztcclxuLy9cdH1cclxuLy9cdGlmIChpbnB1dE51bSA+PSAzMSkge1xyXG4vL1x0XHQvL3Zpc2l0b3JJbnB1dC50ZXh0Q29udGVudCA9ICfQodC70LjRiNC60L7QvCDQvNC90L7Qs9C+ISdcclxuLy9cdFx0YW1lbml0aWVzSW5wdXQudmFsdWUgPSAn0KHQu9C40YjQutC+0Lwg0LzQvdC+0LPQviEnXHJcbi8vXHR9XHJcbi8vfVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS3QstGB0L/Qu9GL0YLQuNC1INC4INC/0YDQvtCy0LXRgNC60LAg0LrQvdC+0L/QutC4INC+0YfQuNGB0YLQuNGC0YwtLS0tLS0tLS0vL1xyXG5hbWVuaXRpZXNCdG5DbGVhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRhbWVuaXRpZXNJbnB1dC52YWx1ZSA9ICfQo9C00L7QsdGB0YLQstCwJztcclxuXHRiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gMDtcclxuXHRiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPSAwO1xyXG5cdGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gMDtcclxuXHQvL3Zpc2l0b3JIb3ZlckJpZyhOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0YW1lbml0aWVzSG92ZXJCZWRyb29tKE51bWJlci5wYXJzZUludChiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0Ly92aXNpdG9ySG92ZXJDaGlsZChOdW1iZXIucGFyc2VJbnQoYmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0YW1lbml0aWVzSG92ZXJCZWQoTnVtYmVyLnBhcnNlSW50KGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdC8vdmlzaXRvckhvdmVyQmFiaShOdW1iZXIucGFyc2VJbnQoYmF0aHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRhbWVuaXRpZXNIb3ZlckJhdGhyb29tKE51bWJlci5wYXJzZUludChiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cclxuXHRidG5DbGVhckFtZW5pdGllcygwKTtcclxufSk7XHJcbmZ1bmN0aW9uIGJ0bkNsZWFyQW1lbml0aWVzKG51bUNsZWFyKSB7XHJcblx0bGV0IGRyb3BJbnB1dE1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1pbnB1dF9wcm9wcy1hbWVuaXRpZXMnKTtcclxuXHRpZiAobnVtQ2xlYXIgPiAwKSB7XHJcblx0XHRhbWVuaXRpZXNCdG5DbGVhci5jbGFzc0xpc3QuYWRkKCdkcm9wLWlucHV0LW1lbnVfY2xlYXItZGlzcGxheScpO1xyXG5cdFx0ZHJvcElucHV0TWVudS5jbGFzc0xpc3QuYWRkKCdkcm9wLWlucHV0X2ZsZXgnKTtcclxuXHR9XHJcblx0aWYgKG51bUNsZWFyIDw9IDApIHtcclxuXHRcdGFtZW5pdGllc0J0bkNsZWFyLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtaW5wdXQtbWVudV9jbGVhci1kaXNwbGF5Jyk7XHJcblx0XHRkcm9wSW5wdXRNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtaW5wdXRfZmxleCcpO1xyXG5cdH1cclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS3QutC90L7Qv9C60LAg0L/RgNC40LzQtdC90LjRgtGMLS0tLS0tLS0tLy9cclxuYW1lbml0aWVzQnRuU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRhbWVuaXRpZXNEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3AtYW1lbml0aWVzX2Rpc3BsYXknKTtcclxuXHRhbWVuaXRpZXNJbnB1dC5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtLWFtZW5pdGllcy1pbnB1dF9ib3JkZXInKTtcclxufSk7IiwibGV0IGJsb2NrUGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uLWhyZWYnKTtcclxuY29uc29sZS5sb2coYmxvY2tQYWdpbmF0aW9uKTtcclxuXHJcbmJsb2NrUGFnaW5hdGlvbi5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0bGV0IHB1bmt0UGFnaW5hdGlvblRhcmdldCA9IGV2ZW50LnRhcmdldDsgIC8v0L3QsCDRh9C10Lwg0LHRi9C7INC/0YDQvtC40LfQstC10LTQtdC9INC60LvQuNC6XHJcblx0Y29uc29sZS5sb2coXCJwdW5rdFBhZ2luYXRpb25UYXJnZXRcIik7XHJcblx0Y29uc29sZS5sb2cocHVua3RQYWdpbmF0aW9uVGFyZ2V0KTtcclxuXHRsZXQgcGFyZW50UHVua3RUYXJnZXQgPSBwdW5rdFBhZ2luYXRpb25UYXJnZXQucGFyZW50RWxlbWVudDsgIC8v0YDQvtC00LjRgtC10LvRjCDRjdC70LXQvNC10L3RgtCwINC90LAg0LrQvtGC0L7RgNC+0Lwg0LrQu9C40LrQvdGD0LvQuFxyXG5cdGNvbnNvbGUubG9nKFwicGFyZW50UHVua3RUYXJnZXRcIik7XHJcblx0Y29uc29sZS5sb2cocGFyZW50UHVua3RUYXJnZXQpO1xyXG5cdGxldCBjaGlsZHJlblB1bmt0VGFyZ2V0ID0gcGFyZW50UHVua3RUYXJnZXQuY2hpbGRyZW47ICAgIC8v0LTQvtGH0LXRgNC90LjQtSDRjdC70LXQvNC10L3RgtGLINGA0L7QtNC40YLQtdC70Y8g0Y3Qu9C10LzQtdC90YLQsCDQvdCwINC60L7RgtC+0YDQvtC8INCx0YvQuyDQutC70LjQulxyXG5cdGNvbnNvbGUubG9nKFwiY2hpbGRyZW5QdW5rdFRhcmdldFwiKTtcclxuXHRjb25zb2xlLmxvZyhjaGlsZHJlblB1bmt0VGFyZ2V0KTtcclxuXHRsZXQgbGVuZ2h0Q2hpbGRyZW5QdW5rdFRhcmdldCA9IGNoaWxkcmVuUHVua3RUYXJnZXQubGVuZ3RoOyAgLy/QutC+0LvQuNGH0LXRgdGC0LLQviDRj9GH0LXQtdC6INCyINC80LDRgdGB0LjQstC1XHJcblx0Y29uc29sZS5sb2cobGVuZ2h0Q2hpbGRyZW5QdW5rdFRhcmdldCk7XHJcblx0Ly8g0L7QsdGA0LDQsdC+0YLQutCwINC80LDRgdGB0LjQstCwINGBINGD0LTQsNC70LXQvdC40LXQvCDRgdCy0L7QudGB0YLQslxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5QdW5rdFRhcmdldC5sZW5ndGg7IGkrKykge1xyXG5cdFx0bGV0IHB1bmt0Q2hpbGRyZW5QYWdpbmF0aW9uID0gY2hpbGRyZW5QdW5rdFRhcmdldFtpXTtcclxuXHRcdHB1bmt0Q2hpbGRyZW5QYWdpbmF0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ3BhZ2luYXRpb24taHJlZl9wdW5rdC1hY3RpdmUnKTsgIC8v0YPQtNCw0LvQtdC90LjQtSDRgdCy0L7QudGB0YLQsiDQsNC60YLQuNCy0L3QvtCz0L4g0LLQuNC00LBcclxuXHR9XHJcblx0cHVua3RQYWdpbmF0aW9uVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3BhZ2luYXRpb24taHJlZl9wdW5rdC1hY3RpdmUnKTsgLy/QtNC+0LHQsNCy0LvQtdC90LjQtSDRgdCy0L7QudGB0YLQsiDQsNC60YLQuNCy0L3QvtCz0L4g0LLQuNC00LBcclxufTtcclxuXHJcbiIsIlxyXG4vL9GC0LjQvyDQuCDQutC+0LvQu9C40YfQtdGB0YLQstC+INCz0L7RgdGC0LXQuVxyXG5sZXQgdmlzaXRvckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXZpc2l0b3ItYnV0dG9uJyk7XHJcbmxldCB2aXNpdG9ySW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS12aXNpdG9yLWlucHV0Jyk7ICAvL9C/0L7Qu9C1INCy0YvQstC+0LTQsCDQutC+0LvQu9C40YfQtdGB0YLQstCwINCz0L7RgdGC0LXQuVxyXG5sZXQgdmlzaXRvckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS12aXNpdG9yJyk7XHJcbmxldCB2aXNpdG9yRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLXZpc2l0b3InKTtcclxubGV0IHZpc2l0b3JCdG5TYXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtaW5wdXQtbWVudV9zYXZlJyk7XHJcbmxldCB2aXNpdG9yQnRuQ2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1pbnB1dC1tZW51X2NsZWFyJyk7XHJcbi8v0YDQsNGB0YfQtdGCINCz0L7RgdGC0LXQuVxyXG4vL9Cy0LfRgNC+0YHQu9GL0LVcclxubGV0IGJpZ1NlbGVjdE1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJpZy1zZWxlY3Qtc21hbGwnKTtcclxubGV0IGJpZ1NlbGVjdE1heCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJpZy1zZWxlY3QtbW9yZScpO1xyXG5sZXQgYmlnU2VsZWN0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmlnLXNlbGVjdC1yZXN1bHQnKTsgICAvL9GB0LrQvtC70YzQutC+INCy0LfRgNC+0YHQu9GL0YVcclxuLy/QtNC10YLQuFxyXG5sZXQgY2hpbGRTZWxlY3RNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1jaGlsZHJlbi1zZWxlY3Qtc21hbGwnKTtcclxubGV0IGNoaWxkU2VsZWN0TWF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtY2hpbGRyZW4tc2VsZWN0LW1vcmUnKTtcclxubGV0IGNoaWxkU2VsZWN0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtY2hpbGRyZW4tc2VsZWN0LXJlc3VsdCcpOyAgLy/RgdC60L7Qu9GM0LrQviDQtNC10YLQtdC5XHJcbi8v0LzQu9Cw0LTQtdC90YbRi1xyXG5sZXQgYmFiaVNlbGVjdE1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJhYmllcy1zZWxlY3Qtc21hbGwnKTtcclxubGV0IGJhYmlTZWxlY3RNYXggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iYWJpZXMtc2VsZWN0LW1vcmUnKTtcclxubGV0IGJhYmlTZWxlY3RSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iYWJpZXMtc2VsZWN0LXJlc3VsdCcpOyAgIC8v0YHQutC+0LvRjNC60L4g0LzQu9Cw0LTQtdC90YbQtdCyXHJcblxyXG5cclxuY29uc29sZS5sb2codmlzaXRvckJ0bik7XHJcbmNvbnNvbGUubG9nKHZpc2l0b3JJbnB1dCk7XHJcbmNvbnNvbGUubG9nKHZpc2l0b3JGb3JtKTtcclxuY29uc29sZS5sb2codmlzaXRvckRyb3ApO1xyXG5cclxuY29uc29sZS5sb2coYmlnU2VsZWN0TWluKTtcclxuY29uc29sZS5sb2coYmlnU2VsZWN0TWF4KTtcclxuY29uc29sZS5sb2coYmlnU2VsZWN0UmVzdWx0KTtcclxuY29uc29sZS5sb2coYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuY29uc29sZS5sb2coYmlnU2VsZWN0UmVzdWx0LnZhbHVlKTtcclxuXHJcbmNvbnNvbGUubG9nKGNoaWxkU2VsZWN0TWluKTtcclxuY29uc29sZS5sb2coY2hpbGRTZWxlY3RNYXgpO1xyXG5jb25zb2xlLmxvZyhjaGlsZFNlbGVjdFJlc3VsdCk7XHJcbmNvbnNvbGUubG9nKGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuY29uc29sZS5sb2coY2hpbGRTZWxlY3RSZXN1bHQudmFsdWUpO1xyXG5cclxuY29uc29sZS5sb2coYmFiaVNlbGVjdE1pbik7XHJcbmNvbnNvbGUubG9nKGJhYmlTZWxlY3RNYXgpO1xyXG5jb25zb2xlLmxvZyhiYWJpU2VsZWN0UmVzdWx0KTtcclxuY29uc29sZS5sb2coYmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcbmNvbnNvbGUubG9nKGJhYmlTZWxlY3RSZXN1bHQudmFsdWUpO1xyXG5cclxudmlzaXRvcklucHV0LnZhbHVlID0gJ9Ch0LrQvtC70YzQutC+INCz0L7RgdGC0LXQuSc7XHJcbi8vLS0tLdC/0YDQvtC/0LjRgdCw0YLRjCDQsNC60YLQuNCy0LDRhtC40Y4g0LrQvdC+0L/QvtC6INC/0YDQuCDQt9C90LDRh9C10L3QuNC4INCx0L7Qu9C10LUgMFxyXG5mdW5jdGlvbiB2aXNpdG9ySG92ZXJCaWcobmFtQmlnSG92ZXIpIHtcclxuXHRpZiAobmFtQmlnSG92ZXIgPj0gMSkge1xyXG5cdFx0YmlnU2VsZWN0TWluLmNsYXNzTGlzdC5hZGQoJ2Ryb3Atc2VsZWN0X3NtYWxsLWhvdmVyJyk7XHJcblx0XHRjb25zb2xlLmxvZyhuYW1CaWdIb3Zlcik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGJpZ1NlbGVjdE1pbi5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdFx0Y29uc29sZS5sb2cobmFtQmlnSG92ZXIpO1xyXG5cdH1cclxufVxyXG5mdW5jdGlvbiB2aXNpdG9ySG92ZXJDaGlsZChuYW1DaGlsZEhvdmVyKSB7XHJcblx0aWYgKG5hbUNoaWxkSG92ZXIgPj0gMSkge1xyXG5cdFx0Y2hpbGRTZWxlY3RNaW4uY2xhc3NMaXN0LmFkZCgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y2hpbGRTZWxlY3RNaW4uY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gdmlzaXRvckhvdmVyQmFiaShuYW1CYWJpSG92ZXIpIHtcclxuXHRpZiAobmFtQmFiaUhvdmVyID49IDEpIHtcclxuXHRcdGJhYmlTZWxlY3RNaW4uY2xhc3NMaXN0LmFkZCgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YmFiaVNlbGVjdE1pbi5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdH1cclxufVxyXG5cclxuLy8tLS0tLdGB0YPQvNC80LjRgNC+0LLQsNC90LjQtSDQs9C+0YHRgtC10Lkg0L3QtdGCINGB0LzRi9GB0LvQsC0tLS0tLS0tLS0tLy9cclxuLy9mdW5jdGlvbiB2aXNpdG9yU3VtbShiaWdOYW0sIGNoaWxkTmFtLCBiYWJpTmFtKSB7XHJcbi8vXHRjb25zb2xlLmxvZyhOdW1iZXIucGFyc2VJbnQoYmlnTmFtKSk7XHJcbi8vXHRjb25zb2xlLmxvZyhOdW1iZXIucGFyc2VJbnQoY2hpbGROYW0pKTtcclxuLy9cdGNvbnNvbGUubG9nKE51bWJlci5wYXJzZUludChiYWJpTmFtKSk7XHJcbi8vXHRsZXQgZnVsbFN1bW0gPSBiaWdOYW0gKyBjaGlsZE5hbSArIGJhYmlOYW07XHJcbi8vXHRjb25zb2xlLmxvZyhmdWxsU3VtbSk7XHJcbi8vXHR2aXNpdG9yU3VtbVRleHQoZnVsbFN1bW0pO1xyXG4vL1x0dmlzaXRvckhvdmVyKGJpZ05hbSwgY2hpbGROYW0sIGJhYmlOYW0pO1xyXG4vL31cclxuXHJcbi8vLS0tLS3RgNCw0LfQstCw0YDQvtGCINGB0L/QuNGB0LrQsCDQstGL0LHQvtGA0LrQuC0tLS0tLS8vXHJcbnZpc2l0b3JCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0Ly9sZXQgdmlzaXRvckRyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC12aXNpdG9yJyk7XHJcblx0Y29uc29sZS5sb2coJ3Zpc2l0b3JEcm9wJyk7XHJcblx0Y29uc29sZS5sb2codmlzaXRvckRyb3ApO1xyXG5cdC8vdmlzaXRvckRyb3Auc3R5bGUuZGlzcGxheSA9ICdkaXNwbGF5JztcclxuXHQvL3Zpc2l0b3JEcm9wLmNsYXNzTGlzdC5hZGQoJ2Ryb3AtdmlzaXRvcl9kaXNwbGF5Jyk7XHJcblx0dmlzaXRvckRyb3AuY2xhc3NMaXN0LnRvZ2dsZSgnZHJvcC12aXNpdG9yX2Rpc3BsYXknKTtcclxuXHR2aXNpdG9ySW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybS12aXNpdG9yLWlucHV0X2JvcmRlcicpO1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0t0LLRi9Cx0L7RgNC60LAg0LrQvtC70LjRh9C10YHRgtCyINCz0L7RgdGC0LXQuS0tLS0tLS8vXHJcbi8vLS0tLS3QstC30YDQvtGB0LvRi9C1LS0tLS8vXHJcbmJpZ1NlbGVjdE1pbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID49IDEpIHtcclxuXHRcdGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpIC0gMTtcclxuXHRcdGNvbnNvbGUubG9nKGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHQvL2J0bkNsZWFyVmlzaXRvcigpO1xyXG5cdFx0dmlzaXRvckhvdmVyQmlnKE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdC8vdmlzaXRvclN1bW0oTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCksIDAsIDApO1xyXG5cdFx0Ly92aXNpdG9yU3VtbVRleHQoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0dmlzaXRvclN1bW1UZXh0KCk7XHJcblx0XHQvL9C90LAg0YHRg9C80LzRgyAxINCw0YDQs9GD0LzQtdC90YIsINGC0LDQutC20LUg0YHRjtC00LAg0LLRgdGC0LDQstC70Y/QtdC8INGF0L7QstC10YBcclxuXHR9XHJcbn0pO1xyXG5iaWdTZWxlY3RNYXguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCAhPSAtMSkge1xyXG5cdFx0YmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgKyAxO1xyXG5cdFx0Y29uc29sZS5sb2coYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdC8vYnRuQ2xlYXJWaXNpdG9yKCk7XHJcblx0XHR2aXNpdG9ySG92ZXJCaWcoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0Ly92aXNpdG9yU3VtbShOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSwgMCwgMCk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tVGV4dChOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHR2aXNpdG9yU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG4vLy0tLS0t0LTQtdGC0LgtLS0tLy9cclxuY2hpbGRTZWxlY3RNaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID49IDEpIHtcclxuXHRcdGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSAtIDE7XHJcblx0XHRjb25zb2xlLmxvZyhjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHQvL2J0bkNsZWFyVmlzaXRvcigpO1xyXG5cdFx0dmlzaXRvckhvdmVyQ2hpbGQoTnVtYmVyLnBhcnNlSW50KGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tKDAsIE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCksIDApO1xyXG5cdFx0Ly92aXNpdG9yU3VtbVRleHQoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0dmlzaXRvclN1bW1UZXh0KCk7XHJcblx0fVxyXG59KTtcclxuY2hpbGRTZWxlY3RNYXguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ICE9IC0xKSB7XHJcblx0XHRjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgKyAxO1xyXG5cdFx0Y29uc29sZS5sb2coY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdFx0Ly9idG5DbGVhclZpc2l0b3IoKTtcclxuXHRcdHZpc2l0b3JIb3ZlckNoaWxkKE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0Ly92aXNpdG9yU3VtbSgwLCBOdW1iZXIucGFyc2VJbnQoY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpLCAwKTtcclxuXHRcdC8vdmlzaXRvclN1bW1UZXh0KE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdHZpc2l0b3JTdW1tVGV4dCgpO1xyXG5cdH1cclxufSk7XHJcbi8vLS0tLS3QvNC70LDQtNC10L3RhtGLLS0tLS8vXHJcbmJhYmlTZWxlY3RNaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPj0gMSkge1xyXG5cdFx0YmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSAtIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdC8vYnRuQ2xlYXJWaXNpdG9yKCk7XHJcblx0XHR2aXNpdG9ySG92ZXJCYWJpKE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tKDAsIDAsIE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tVGV4dChOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHR2aXNpdG9yU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG5iYWJpU2VsZWN0TWF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ICE9IC0xKSB7XHJcblx0XHRiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgMTtcclxuXHRcdGNvbnNvbGUubG9nKGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdFx0Ly9idG5DbGVhclZpc2l0b3IoKTtcclxuXHRcdHZpc2l0b3JIb3ZlckJhYmkoTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdC8vdmlzaXRvclN1bW0oMCwgMCwgTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdC8vdmlzaXRvclN1bW1UZXh0KE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdHZpc2l0b3JTdW1tVGV4dCgpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLy8tLS0t0KTRg9C90LrRhtC40Y8g0YfQuNGB0LvQvtCy0YvRhSDRgdC60LvQvtC90LXQvdC40Lkg0LrQvtC70LjRh9C10YHRgtCy0LAg0LPQvtGB0YLQtdC5XHJcbmZ1bmN0aW9uIHZpc2l0b3JTdW1tVGV4dCgpIHtcclxuXHQvL2lwdXROYW0gPSBOdW1iZXIucGFyc2VJbnQoaXB1dE5hbSk7XHJcblx0bGV0IGlucHV0TnVtID0gTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgKyBOdW1iZXIucGFyc2VJbnQoY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdGNvbnNvbGUubG9nKCdpbnB1dE51bScpO1xyXG5cdGNvbnNvbGUubG9nKGlucHV0TnVtKTtcclxuXHRidG5DbGVhclZpc2l0b3IoaW5wdXROdW0pO1xyXG5cdC8vZnVsbFN1bW0gPSBOdW1iZXIoZnVsbFN1bW0pO1xyXG5cdGlmIChpbnB1dE51bSA9PSAwKSB7XHJcblx0XHQvL3Zpc2l0b3JJbnB1dC50ZXh0Q29udGVudCA9ICfQodC60L7Qu9GM0LrQviDQs9C+0YHRgtC10LknO1xyXG5cdFx0dmlzaXRvcklucHV0LnZhbHVlID0gJ9Ch0LrQvtC70YzQutC+INCz0L7RgdGC0LXQuSc7XHJcblx0fVxyXG5cdGlmICgoaW5wdXROdW0gPT0gMSkgfHwgKGlucHV0TnVtID09IDIxKSkge1xyXG5cdFx0Ly92aXNpdG9ySW5wdXQudGV4dENvbnRlbnQgPSBpcHV0TmFtICsgJyDQs9C+0YHRgtGMJztcclxuXHRcdHZpc2l0b3JJbnB1dC52YWx1ZSA9IGlucHV0TnVtICsgJyDQs9C+0YHRgtGMJztcclxuXHR9XHJcblx0aWYgKChpbnB1dE51bSA+IDEgJiYgaW5wdXROdW0gPCA1KSB8fCAoaW5wdXROdW0gPiAyMSAmJiBpbnB1dE51bSA8IDI1KSkge1xyXG5cdFx0Ly92aXNpdG9ySW5wdXQudGV4dENvbnRlbnQgPSBpcHV0TmFtICsgJyDQs9C+0YHRgtGPJztcclxuXHRcdHZpc2l0b3JJbnB1dC52YWx1ZSA9IGlucHV0TnVtICsgJyDQs9C+0YHRgtGPJztcclxuXHR9XHJcblx0aWYgKChpbnB1dE51bSA+IDQgJiYgaW5wdXROdW0gPCAyMSkgfHwgKGlucHV0TnVtID4gMjQgJiYgaW5wdXROdW0gPCAzMSkpIHtcclxuXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gaXB1dE5hbSArICcg0LPQvtGB0YLQtdC5JztcclxuXHRcdHZpc2l0b3JJbnB1dC52YWx1ZSA9IGlucHV0TnVtICsgJyDQs9C+0YHRgtC10LknO1xyXG5cdH1cclxuXHRpZiAoaW5wdXROdW0gPj0gMzEpIHtcclxuXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gJ9Ch0LvQuNGI0LrQvtC8INC80L3QvtCz0L4hJ1xyXG5cdFx0dmlzaXRvcklucHV0LnZhbHVlID0gJ9Ch0LvQuNGI0LrQvtC8INC80L3QvtCz0L4hJ1xyXG5cdH1cclxuXHJcblx0Ly92aXNpdG9ySW5wdXQudGV4dENvbnRlbnRcclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLdCy0YHQv9C70YvRgtC40LUg0Lgg0L/RgNC+0LLQtdGA0LrQsCDQutC90L7Qv9C60Lgg0L7Rh9C40YHRgtC40YLRjC0tLS0tLS0tLS8vXHJcbnZpc2l0b3JCdG5DbGVhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHR2aXNpdG9ySW5wdXQudmFsdWUgPSAn0KHQutC+0LvRjNC60L4g0LPQvtGB0YLQtdC5JztcclxuXHRiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPSAwO1xyXG5cdGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gMDtcclxuXHRiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gMDtcclxuXHR2aXNpdG9ySG92ZXJCaWcoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdHZpc2l0b3JIb3ZlckNoaWxkKE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdHZpc2l0b3JIb3ZlckJhYmkoTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHQvL3Zpc2l0b3JEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3AtdmlzaXRvcl9kaXNwbGF5Jyk7XHJcblx0Ly92aXNpdG9ySW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybS12aXNpdG9yLWlucHV0X2JvcmRlcicpO1xyXG5cdGJ0bkNsZWFyVmlzaXRvcigwKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBidG5DbGVhclZpc2l0b3IobnVtQ2xlYXIpIHtcclxuXHRsZXQgZHJvcElucHV0TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWlucHV0X3Byb3BzJyk7XHJcblx0aWYgKG51bUNsZWFyID4gMCkge1xyXG5cdFx0dmlzaXRvckJ0bkNsZWFyLmNsYXNzTGlzdC5hZGQoJ2Ryb3AtaW5wdXQtbWVudV9jbGVhci1kaXNwbGF5Jyk7XHJcblx0XHRkcm9wSW5wdXRNZW51LmNsYXNzTGlzdC5hZGQoJ2Ryb3AtaW5wdXRfZmxleCcpO1xyXG5cdH1cclxuXHRpZiAobnVtQ2xlYXIgPD0gMCkge1xyXG5cdFx0dmlzaXRvckJ0bkNsZWFyLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtaW5wdXQtbWVudV9jbGVhci1kaXNwbGF5Jyk7XHJcblx0XHRkcm9wSW5wdXRNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtaW5wdXRfZmxleCcpO1xyXG5cdH1cclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLdC60L3QvtC/0LrQsCDQv9GA0LjQvNC10L3QuNGC0YwtLS0tLS0tLS0vL1xyXG52aXNpdG9yQnRuU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHR2aXNpdG9yRHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdkcm9wLXZpc2l0b3JfZGlzcGxheScpO1xyXG5cdHZpc2l0b3JJbnB1dC5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtLXZpc2l0b3ItaW5wdXRfYm9yZGVyJyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuIiwiXHJcbi8v0L/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LUg0YEg0L/RgNC10LTRi9C00YPRidC10Lkg0YHRgtGA0LDQvdC40YbRi1xyXG4vL2xldCBkYXRlU2VhcmNoID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oZGF0ZUluKSArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGRhdGVPdXQpO1xyXG5cclxuLy9jb25zb2xlLmxvZyhkYXRlU2VhcmNoKTtcclxuXHJcbi8vbGV0IGZvcm1WaXNpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tdmlzaXRvcicpO1xyXG4vL2NvbnNvbGUubG9nKGZvcm1WaXNpdG9yKTtcclxuLy9sZXQgYmFzaWtBbWVuaXRpZXNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hbWVuaXRpZXMtYnV0dG9uJyk7ICAgLy/QutC90L7Qv9C60LAg0YDQsNC30LLQvtGA0L7RgtCwINC+0YHQvdC+0LLQvdGL0YUg0YPQtNC+0LHRgdGC0LJcclxuLy9jb25zb2xlLmxvZyhiYXNpa0FtZW5pdGllc0J0bik7XHJcbi8vbGV0IGJhc2lrQW1lbml0aWVzSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hbWVuaXRpZXMtaW5wdXQnKTsgICAvL9C/0L7Qu9C1INCy0LLQvtC00LAg0LrQvtC70LjRh9C10YHRgtCy0LAg0YPQtNC+0LHRgdGC0LJcclxuLy9jb25zb2xlLmxvZyhiYXNpa0FtZW5pdGllc0lucHV0KTtcclxuLy9sZXQgYmFzaWtBbWVuaXRpZXNEcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYW1lbml0aWVzJyk7ICAgLy/Qv9C+0LvQtSDQstCy0L7QtNCwINC60L7Qu9C40YfQtdGB0YLQstCwINGD0LTQvtCx0YHRgtCyXHJcbi8vY29uc29sZS5sb2coYmFzaWtBbWVuaXRpZXNEcm9wKTtcclxuLy9mb3JtVmlzaXRvci5zdHlsZS53aWR0aD1cIjI2NnB4XCI7XHJcblxyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vL2Jhc2lrQW1lbml0aWVzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdC8vbGV0IHZpc2l0b3JEcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtdmlzaXRvcicpO1xyXG5cdC8vY29uc29sZS5sb2coJ3Zpc2l0b3JEcm9wJyk7XHJcblx0Ly9jb25zb2xlLmxvZyh2aXNpdG9yRHJvcCk7XHJcblx0Ly92aXNpdG9yRHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Rpc3BsYXknO1xyXG5cdC8vdmlzaXRvckRyb3AuY2xhc3NMaXN0LmFkZCgnZHJvcC12aXNpdG9yX2Rpc3BsYXknKTtcclxuLy9cdHZpc2l0b3JEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3AtdmlzaXRvcl9kaXNwbGF5Jyk7XHJcbi8vXHR2aXNpdG9ySW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybS12aXNpdG9yLWlucHV0X2JvcmRlcicpO1xyXG4vL30pO1xyXG5cclxuLy9mb3JtVmlzaXRvci5yZW1vdmVBdHRyaWJ1dGUoJ3dpZHRoJyk7XHJcbi8vZm9ybVZpc2l0b3Iuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcyNjZweCcpO1xyXG5cclxuIiwiLy9sZXQgY29taW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tY29taW5nLWJ1dHRvbicpO1xyXG5sZXQgZGF0ZUxpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1kYXRlLWJ1dHRvbicpO1xyXG4vL2xldCBzdGFydERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1jb21pbmdfaW5wdXQnKTsgICAgIC8v0LTQsNGC0LAg0LLRitC10LfQtNCwXHJcbmxldCByYW5nZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1kYXRlX2lucHV0Jyk7ICAgICAvL9C00LDRgtCwINCy0YrQtdC30LTQsFxyXG4vL2xldCBkZXBhcnR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1kZXBhcnR1cmUtYnV0dG9uJyk7XHJcbi8vbGV0IGVuZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1kZXBhcnR1cmVfaW5wdXQnKTsgIC8v0LTQsNGC0LAg0LLRi9C10LfQtNCwXHJcbmxldCBmb3JtVmlzaXRvcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tdmlzaXRvci1pbnB1dCcpO1xyXG5sZXQgZGF0ZXBpY2tlckJsb2NrID0gYDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWhlcmVcIiBkYXRhLXBvc2l0aW9uPVwicmlnaHQgdG9wXCI+PC9kaXY+YDtcclxubGV0IGluc2VydENhbGVuZGFyID0gYDxzZWN0aW9uIGNsYXNzPVwiY2FsZW5kYXIgY2FsZW5kYXJfcHJvcHNcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHtkYXRlcGlja2VyQmxvY2t9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYWxlbmRhci1ib3R0b21cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYnV0dG9uLWNsZWFyIGNhbGVuZGFyX2J1dHRvbiBcIj7QvtGH0LjRgdGC0LjRgtGMPC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJ1dHRvbi1hcHBseSBjYWxlbmRhcl9idXR0b25cIj7Qv9GA0LjQvNC10L3QuNGC0Yw8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+YDtcclxubGV0IGluc2VydFZpc2l0b3IgPSBgYDtcclxuLy/Qv9GA0LjQvNC10L3QuNGC0YxcclxubGV0IGFwcGx5U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRvbi1hcnJvd19hcHBseScpOyAgICAgLy/QutC90L7Qv9C60LAg0L/QvtC00L7QsdGA0LDRgtGMXHJcblxyXG4vL2NvbnNvbGUubG9nKGNvbWluZyk7XHJcbmNvbnNvbGUubG9nKGRhdGVMaXZlKTtcclxuXHJcblxyXG4vL9Cy0YvQsdC+0YDQutCwINC00LDRgiDQuNC3INC60LDQu9C10L3QtNCw0YDRjy0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vY29taW5nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbmRhdGVMaXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0Y29uc29sZS5sb2coJ9C90LDQttCw0YLQsCDQutC90L7Qv9C60LAg0LTQsNGC0Ysg0L/RgNC10LHRi9Cy0LDQvdC40Y8g0LIg0L7RgtC10LvQtScpO1xyXG5cdC8vbGV0IGJ1dHRvbkNhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tY29taW5nJyk7XHJcblx0bGV0IGJ1dHRvbkNhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tZGF0ZScpO1xyXG5cdGxldCBidG5Gb3JtID0gJy5mb3JtLWRhdGVfaW5wdXQnO1xyXG5cdGNhbGVuZGFyT3V0cHV0KGJ1dHRvbkNhbGVuZGFyLCBidG5Gb3JtKTsgICAgICAgICAgICAgICAgICAgLy/QstGL0LLQvtC0INC60LDQu9C10L3QtNCw0YDRj1xyXG5cclxuXHRidG5DYWxlbmRhclJlc3VsdCgpOyAgICAgICAgICAgICAgICAvL9C60L3QvtC/0LrQuCDQsiDQutCw0LvQtdC90LTQsNGA0LVcclxufSk7XHJcblxyXG4vL2RlcGFydHVyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4vL1x0Y29uc29sZS5sb2coJ9C90LDQttCw0YLQsCDQutC90L7Qv9C60LAg0JLQq9CV0JfQlCcpO1xyXG4vL1x0bGV0IGJ1dHRvbkNhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tZGVwYXJ0dXJlJyk7XHJcbi8vXHRsZXQgYnRuRm9ybSA9ICcuZm9ybS1kZXBhcnR1cmVfaW5wdXQnO1xyXG4vL1x0Y2FsZW5kYXJPdXRwdXQoYnV0dG9uQ2FsZW5kYXIsIGJ0bkZvcm0pO1xyXG4vL1xyXG4vL1x0YnRuQ2FsZW5kYXJSZXN1bHQoKTtcclxuLy99KTtcclxuXHJcbi8v0YTRg9C90LrRhtC40Y8g0LLRi9Cy0L7QtNCwINGA0LXQt9GD0LvRjNGC0LDRgtC+0LIg0LLRi9Cx0L7RgNCwINC00LDQvdC90YvRhVxyXG5mdW5jdGlvbiBidG5DYWxlbmRhclJlc3VsdCgpIHtcclxuXHRsZXQgYnRuQ2FsZW5kYXJDbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tY2xlYXInKTtcclxuXHRsZXQgYnRuQ2FsZW5kYXJBcHBseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tYXBwbHknKTtcclxuXHJcblx0YnRuQ2FsZW5kYXJBcHBseS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCfQndCw0LbQsNGC0LAg0LrQvdC+0L/QutCwINCf0KDQmNCc0JXQndCY0KLQrCcpO1xyXG5cdFx0Y2FsZW5kYXJEZWxldGUoKTtcclxuXHR9KTtcclxuXHRidG5DYWxlbmRhckNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ9Cd0LDQttCw0YLQsCDQutC90L7Qv9C60LAg0J7Qp9CY0KHQotCY0KLQrCcpO1xyXG5cdFx0Ly/RgdGO0LTQsCDQstC/0LjRgdCw0YLRjCDQtNC40LDQv9Cw0LfQvtC9INC00LDRglxyXG5cdFx0cmFuZ2VEYXRlLnZhbHVlID0gJ9CU0JQu0JzQnNCcLiAtINCU0JQu0JzQnNCcLic7XHJcblx0XHQvL3N0YXJ0RGF0ZS52YWx1ZSA9ICfQlNCULtCc0Jwu0JPQk9CT0JMnO1xyXG5cdFx0Ly9lbmREYXRlLnZhbHVlID0gJ9CU0JQu0JzQnC7Qk9CT0JPQkyc7XHJcblx0XHRjYWxlbmRhckRlbGV0ZSgpO1xyXG5cdH0pXHJcbn1cclxuLy/RhNGD0L3QutGG0LjRjyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40Y8g0LrQsNC70LXQvdC00LDRgNGPXHJcbmZ1bmN0aW9uIGNhbGVuZGFyT3V0cHV0KGJ0bkNsaWNrLCBidG5JbnB1dCkge1xyXG5cdGNvbnNvbGUubG9nKGJ0bkNsaWNrKTtcclxuXHRsZXQgYmxvY2tDYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcicpO1xyXG5cdGlmIChibG9ja0NhbGVuZGFyICE9IG51bGwpIHtcclxuXHRcdGNvbnNvbGUubG9nKCfQt9C90LDRh9C10L3QuNC1IGJsb2NrQ2FsZW5kYXIgJyArIGJsb2NrQ2FsZW5kYXIpO1xyXG5cdFx0Y2FsZW5kYXJEZWxldGUoKTtcclxuXHRcdGRhdGVwaWNrZXJDcmVhdGUoYnRuSW5wdXQpO1xyXG5cdFx0YnRuQ2xpY2suaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVFbmQnLCBpbnNlcnRDYWxlbmRhcik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGRhdGVwaWNrZXJDcmVhdGUoYnRuSW5wdXQpO1xyXG5cdFx0YnRuQ2xpY2suaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVFbmQnLCBpbnNlcnRDYWxlbmRhcik7XHJcblx0fVxyXG5cclxufVxyXG4vL9GE0YPQvdC60YbQuNGPINGD0LTQsNC70LXQvdC40Y8g0LrQsNC70LXQvdC00LDRgNGPXHJcbmZ1bmN0aW9uIGNhbGVuZGFyRGVsZXRlKCkge1xyXG5cdGxldCBibG9ja0NhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyJyk7XHJcblx0Ly9ibG9ja0NhbGVuZGFyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0YmxvY2tDYWxlbmRhci5yZW1vdmUoKTtcclxufVxyXG4vL9GE0YPQvdC60YbQuNGPINCy0YvQt9C+0LLQsCDQtNCw0YLQsNC/0LjQutC10YDQsFxyXG5mdW5jdGlvbiBkYXRlcGlja2VyQ3JlYXRlKGJ0bkZvcm0pIHtcclxuXHQvL2xldCBidG5Gb3JtID0gZFxyXG5cdGNvbnNvbGUubG9nKCdidG5Gb3JtIC0gJyArIGJ0bkZvcm0pO1xyXG5cclxuXHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJy5kYXRlcGlja2VyLWhlcmUnKS5kYXRlcGlja2VyKCB7XHJcblx0XHRcdC8vYWx0RmllbGQ6IGJ0bkZvcm0sICAgICAgICAgICAgICAgICAgIC8v0LLRi9Cz0YDRg9C30LrQsCDQsiDQv9C+0LvQtSBidG5Gb3JtXHJcblx0XHRcdC8vYWx0RmllbGREYXRlRm9ybWF0OiAnZGQubW0ueXl5eScsICAgIC8v0YTQvtGA0LzQsNGCINC00LDRgtGLINCy0YvQs9GA0YPQt9C60LhcclxuXHRcdFx0cmFuZ2U6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC00LjQsNC/0LDQt9C+0L0g0LTQsNGCINCy0LrQu9GO0YfQtdC9XHJcblx0XHRcdHRvZ2dsZVNlbGVjdGVkOiBmYWxzZSwgICAgICAgICAgICAgICAvLyDRgNCw0LfRgNC10YjQuNGC0Ywg0LLRi9Cx0L7RgCAx0Lkg0LTQsNGC0YtcclxuXHRcdFx0bXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJyAtICcsICAgICAgIC8vINGA0LDQt9C00LXQu9C40YLQtdC70Ywg0LTQuNCw0L/QsNC30L7QvdCwINC00LDRglxyXG5cdFx0XHRtaW5EYXRlOiBuZXcgRGF0ZSgpLCAgICAgICAgICAgICAgICAgIC8vINC30LDQv9GA0LXRgtC40YLRjCDQstGL0LHQvtGAINC90LjQttC1INGC0LXQutGD0YnQtdC5INC00LDRgtGLXHJcblx0XHRcdG9uU2VsZWN0OiBmdW5jdGlvbiBvblNlbGVjdChzZWxlY3RlZERhdGVzKSB7ICAgICAgICAgICAgIC8v0LLRi9Cx0L7RgNC60LAg0LTQuNCw0L/QsNC30L7QvdCwXHJcblx0XHRcdFx0Y29uc29sZS5sb2coc2VsZWN0ZWREYXRlcyk7XHJcblx0XHRcdFx0aWYoc2VsZWN0ZWREYXRlcyAhPT0gdW5kZWZpbmVkICYmIHNlbGVjdGVkRGF0ZXMgIT0gJycgJiYgc2VsZWN0ZWREYXRlcy5pbmRleE9mKCctJykgPiAtMSl7XHJcblx0XHRcdFx0XHRtZHlDYWxlbmRhciA9IHNlbGVjdGVkRGF0ZXMuc3BsaXQoJy0gJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnbWR5Q2FsZW5kYXIgLSAnICsgbWR5Q2FsZW5kYXIpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cobWR5Q2FsZW5kYXIpO1xyXG5cdFx0XHRcdFx0bGV0IG1keVN0YXJ0ID0gKG1keUNhbGVuZGFyWzBdKTtcclxuXHRcdFx0XHRcdGxldCBtZHlFbmQgPSAobWR5Q2FsZW5kYXJbMV0pO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cobWR5U3RhcnQpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cobWR5RW5kKTtcclxuXHRcdFx0XHRcdC8vc3RhcnREYXRlLnZhbHVlID0gbWR5U3RhcnQ7XHJcblx0XHRcdFx0XHQvL2VuZERhdGUudmFsdWUgPSBtZHlFbmQ7XHJcblx0XHRcdFx0XHQvL3JhbmdlRGF0ZS52YWx1ZSA9ICfQlNCULtCc0JzQnC4gLSDQlNCULtCc0JzQnC4nO1xyXG5cdFx0XHRcdFx0cmFuZ2VEYXRlLnZhbHVlID0gbWR5U3RhcnQgKyAnIC0gJyArIG1keUVuZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly9yZXR1cm4gbWR5Q2FsZW5kYXI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Ly8kKCcuZGF0ZXBpY2tlci1oZXJlJykuZGF0YSgnZGF0ZXBpY2tlcicpO1xyXG5cdH0pO1xyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS3QutC90L7Qv9C60LAg0L/QvtC00L7QsdGA0LDRgtGMINC90L7QvNC10YAtLS0tLS0tLS8vXHJcblxyXG4vL2FwcGx5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4vL1x0Ly/RgdC+0YHRgtCw0LLQuNC8INC/0LXRgNC10LzQtdC90L3Ri9C1INC30LDQv9GA0L7RgdCwINC4INC30LDQv9C40YjQuNC8INCyINC70L7QutCw0LvRgdGC0L7RgNCw0LTQtlxyXG4vL1x0bGV0IGFwcGx5U2VsZWN0RGF0YSA9IHN0YXJ0RGF0ZS52YWx1ZS50cmltKCkgKyAnOycgKyBlbmREYXRlLnZhbHVlLnRyaW0oKSArICc7JyArIGZvcm1WaXNpdG9ySW5wdXQudmFsdWUudHJpbSgpO1xyXG4vL1x0Y29uc29sZS5sb2coYXBwbHlTZWxlY3REYXRhKTtcclxuLy9cdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdkYXRlSW4nKTtcclxuLy9cdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdkYXRlT3V0Jyk7XHJcbi8vXHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmlzaXRvcicpO1xyXG4vL1x0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGVJbicsIHN0YXJ0RGF0ZS52YWx1ZS50cmltKCkpO1xyXG4vL1x0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGVPdXQnLCBlbmREYXRlLnZhbHVlLnRyaW0oKSk7XHJcbi8vXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndmlzaXRvcicsIGZvcm1WaXNpdG9ySW5wdXQudmFsdWUudHJpbSgpKTtcclxuLy9cdC8vd2luZG93Lm9wZW4oJ3NlYXJjaHJvb20uaHRtbCcpO1xyXG4vL30pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0t0L7Qv9GA0LXQtNC10LvRj9C10Lwg0YDQvtC00LjRgtC10LvRjyDQtNC70Y8g0LLRgdGC0LDQstC60Lgg0LHQu9C+0LrQsFxyXG4vL2xldCBlbGVtZW50Q2xpY2sgPSBjb21pbmc7XHJcblxyXG4vL2VsZW1lbnRDbGljay5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4vL1x0bGV0IGVsZW1lbnRUYXJnZXQgPSBldmVudC50YXJnZXQ7ICAgICAgLy/QutC90L7Qv9C60LBcclxuLy9cdGNvbnNvbGUubG9nKGVsZW1lbnRUYXJnZXQpO1xyXG4vL1x0bGV0IHBhcmVudEVsZW1lbnRUYXJnZXQgPSBlbGVtZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQ7ICAgICAgIC8v0YTQvtGA0LzQsCDQt9Cw0L/RgNC+0YHQsFxyXG4vL1x0Y29uc29sZS5sb2cocGFyZW50RWxlbWVudFRhcmdldCk7XHJcbi8vXHRsZXQgdGFibGVUYXJnZXRQYXJlbnQgPSBwYXJlbnRFbGVtZW50VGFyZ2V0LmNoaWxkcmVuOyAgICAgICAgLy8g0LLRgdGPINGE0L7RgNC80LBcclxuLy9cdGNvbnNvbGUubG9nKHRhYmxlVGFyZ2V0UGFyZW50KTtcclxuLy9cdC8vdGV4dFdyaXRlLnRleHRDb250ZW50ID0gdGFibGVUYXJnZXRQYXJlbnRbMl0udGV4dENvbnRlbnQ7XHJcbi8vXHRjb25zb2xlLmxvZyh0YWJsZVRhcmdldFBhcmVudCk7XHJcbi8vfTtcclxuXHJcblxyXG4vLzxzZWN0aW9uIGNsYXNzTmFtZT1cImNhbGVuZGFyXCI+XHJcbi8vXHQ8ZGl2IGNsYXNzTmFtZT1cImRhdGVwaWNrZXItaGVyZVwiIGRhdGEtcG9zaXRpb249XCJyaWdodCB0b3BcIiBkYXRhLXJhbmdlPVwidHJ1ZVwiXHJcbi8vXHRcdFx0IGRhdGEtbXVsdGlwbGUtZGF0ZXMtc2VwYXJhdG9yPVwiIC0gXCI+PC9kaXY+XHJcbi8vXHQ8ZGl2IGNsYXNzTmFtZT1cImNhbGVuZGFyLWJvdHRvbVwiPlxyXG4vL1x0XHQ8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jbGVhciBjYWxlbmRhcl9idXR0b24gXCI+0L7Rh9C40YHRgtC40YLRjDwvZGl2PlxyXG4vL1x0XHQ8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1hcHBseSBjYWxlbmRhcl9idXR0b25cIj7Qv9GA0LjQvNC10L3QuNGC0Yw8L2Rpdj5cclxuLy9cdDwvZGl2PlxyXG4vLzwvc2VjdGlvbj4iLCJsZXQgdGl0bGVTdW1tTWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYW5nZS10aXRsZS1zdW1tX21pblwiKTtcclxuY29uc29sZS5sb2codGl0bGVTdW1tTWluKTtcclxuXHJcbmxldCB0aXRsZVN1bW1NYXggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhbmdlLXRpdGxlLXN1bW1fbWF4XCIpO1xyXG5jb25zb2xlLmxvZyh0aXRsZVN1bW1NYXgpO1xyXG5sZXQgaW5wdXRzUnkgPSB7XHJcblx0c2xpZGVyV2lkdGg6IDI2NixcclxuXHRtaW5SYW5nZTogMTAwMCxcclxuXHRtYXhSYW5nZTogMjAwMDAsXHJcblx0b3V0cHV0V2lkdGg6MzAsIC8vIG91dHB1dCB3aWR0aFxyXG5cdHRodW1iV2lkdGg6IDE2LCAvLyB0aHVtYiB3aWR0aFxyXG5cdHRodW1iQm9yZGVyV2lkdGg6IDIsXHJcblx0dHJhY2tIZWlnaHQ6IDYsXHJcblx0dGhlVmFsdWU6IFs1MDAwLCAxMDAwMF0gLy8gdGhlVmFsdWVbMF0gPCB0aGVWYWx1ZVsxXVxyXG59O1xyXG5jb25zb2xlLmxvZyhpbnB1dHNSeSk7XHJcbmxldCBpc0RyYWdnaW5nMCA9IGZhbHNlO1xyXG5sZXQgaXNEcmFnZ2luZzEgPSBmYWxzZTtcclxuXHJcbmxldCByYW5nZSA9IGlucHV0c1J5Lm1heFJhbmdlIC0gaW5wdXRzUnkubWluUmFuZ2U7XHJcbmxldCByYW5nZUsgPSBpbnB1dHNSeS5zbGlkZXJXaWR0aCAvIHJhbmdlO1xyXG5sZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJcIik7XHJcbmxldCB0aHVtYlJlYWxXaWR0aCA9IGlucHV0c1J5LnRodW1iV2lkdGggKyAyICogaW5wdXRzUnkudGh1bWJCb3JkZXJXaWR0aDtcclxuXHJcbi8vIHN0eWxlc1xyXG5sZXQgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJcIik7XHJcbmNvbnNvbGUubG9nKHNsaWRlcik7XHJcbi8v0L/QvtC70L7RgdC60LAg0YHQu9Cw0LnQtNC10YDQsCDQstGL0YHQvtGC0LBcclxuc2xpZGVyLnN0eWxlLmhlaWdodCA9IGlucHV0c1J5LnRyYWNrSGVpZ2h0ICsgXCJweFwiO1xyXG4vL9C/0L7Qu9C+0YHQutCwINGB0LvQsNC50LTQtdGA0LAg0YjQuNGA0LjQvdCwXHJcbnNsaWRlci5zdHlsZS53aWR0aCA9IGlucHV0c1J5LnNsaWRlcldpZHRoICsgXCJweFwiO1xyXG4vL9C/0L7Qu9C+0YHQutCwINGB0LvQsNC50LTQtdGA0LAg0L7RgtGB0YLRg9C/0Ytcclxuc2xpZGVyLnN0eWxlLnBhZGRpbmdMZWZ0ID0gKGlucHV0c1J5LnRoZVZhbHVlWzBdIC0gaW5wdXRzUnkubWluUmFuZ2UpICogcmFuZ2VLICsgXCJweFwiO1xyXG5zbGlkZXIuc3R5bGUucGFkZGluZ1JpZ2h0ID0gaW5wdXRzUnkuc2xpZGVyV2lkdGggLSBpbnB1dHNSeS50aGVWYWx1ZVsxXSAqIHJhbmdlSyArIFwicHhcIjtcclxuXHJcbmxldCB0cmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudHJhY2tcIik7XHJcbnRyYWNrLnN0eWxlLndpZHRoID0gaW5wdXRzUnkudGhlVmFsdWVbMV0gKiByYW5nZUsgLSBpbnB1dHNSeS50aGVWYWx1ZVswXSAqIHJhbmdlSyArIFwicHhcIjtcclxuXHJcbmxldCB0aHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRodW1iXCIpO1xyXG5jb25zb2xlLmxvZyh0aHVtYnMpO1xyXG5mb3IgKGxldCBpID0gMDsgaSA8IHRodW1icy5sZW5ndGg7IGkrKykge1xyXG5cdC8v0L/QuNC/0LrQuCDRgdC70LDQudC00LXRgNCwINGI0LjRgNC10L3QsD3QstGL0YHQvtGC0LVcclxuXHR0aHVtYnNbaV0uc3R5bGUud2lkdGggPSB0aHVtYnNbaV0uc3R5bGUuaGVpZ2h0ID0gaW5wdXRzUnkudGh1bWJXaWR0aCArIFwicHhcIjtcclxuXHRjb25zb2xlLmxvZyhpbnB1dHNSeS50aHVtYldpZHRoICsgXCJweFwiKTtcclxuXHQvL9C/0LjQv9C60Lgg0YHQu9Cw0LnQtNC10YDQsCDQsdC+0YDQtNGO0YBcclxuXHR0aHVtYnNbaV0uc3R5bGUuYm9yZGVyV2lkdGggPSBpbnB1dHNSeS50aHVtYkJvcmRlcldpZHRoICsgXCJweFwiO1xyXG5cdC8v0L/QuNC/0LrQuCDRgdC70LDQudC00LXRgNCwINC/0L7Qt9C40YbQuNGPINGB0LLQtdGA0YXRg1xyXG5cdHRodW1ic1tpXS5zdHlsZS50b3AgPSAtKChpbnB1dHNSeS50aHVtYldpZHRoIC8gMiArIGlucHV0c1J5LnRodW1iQm9yZGVyV2lkdGggLSBpbnB1dHNSeS50cmFja0hlaWdodCAvIDIpIC0gMSkgKyBcInB4XCI7XHJcblx0Y29uc29sZS5sb2codGh1bWJzW2ldLnN0eWxlLnRvcCk7XHJcblx0Ly/Qv9C40L/QutC4INGB0LvQsNC50LTQtdGA0LAg0L/QvtC30LjRhtC40Y8g0YHQu9C10LLQsFxyXG5cdHRodW1ic1tpXS5zdHlsZS5sZWZ0ID0gKGlucHV0c1J5LnRoZVZhbHVlW2ldIC0gaW5wdXRzUnkubWluUmFuZ2UpICogcmFuZ2VLIC0gKHRodW1iUmVhbFdpZHRoIC8gMikgKyBcInB4XCI7XHJcblxyXG59XHJcbmxldCBvdXRwdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vdXRwdXRcIik7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0cy5sZW5ndGg7IGkrKykge1xyXG5cdGNvbnNvbGUubG9nKHRodW1ic1tpXSk7XHJcblx0b3V0cHV0c1tpXS5zdHlsZS53aWR0aCA9IG91dHB1dHNbaV0uc3R5bGUuaGVpZ2h0ID0gb3V0cHV0c1tpXS5zdHlsZS5saW5lSGVpZ2h0ID0gb3V0cHV0c1tpXS5zdHlsZS5sZWZ0ID0gaW5wdXRzUnkub3V0cHV0V2lkdGggKyBcInB4XCI7XHJcblx0b3V0cHV0c1tpXS5zdHlsZS50b3AgPSAtKE1hdGguc3FydCgyICogaW5wdXRzUnkub3V0cHV0V2lkdGggKiBpbnB1dHNSeS5vdXRwdXRXaWR0aCkgKyBpbnB1dHNSeS50aHVtYldpZHRoIC8gMiAtIGlucHV0c1J5LnRyYWNrSGVpZ2h0IC8gMikgKyBcInB4XCI7XHJcblx0b3V0cHV0c1tpXS5zdHlsZS5sZWZ0ID0gKGlucHV0c1J5LnRoZVZhbHVlW2ldIC0gaW5wdXRzUnkubWluUmFuZ2UpICogcmFuZ2VLIC0gaW5wdXRzUnkub3V0cHV0V2lkdGggLyAyICsgXCJweFwiO1xyXG5cdG91dHB1dHNbaV0uaW5uZXJIVE1MID0gXCI8cD5cIiArIGlucHV0c1J5LnRoZVZhbHVlW2ldICsgXCI8L3A+XCI7XHJcblx0aWYgKGkgPT0gMCkge1xyXG5cdFx0dGl0bGVTdW1tTWluLnRleHRDb250ZW50ID0gaW5wdXRzUnkudGhlVmFsdWVbMF0gKyBcIuKCvVwiO1xyXG5cdFx0Y29uc29sZS5sb2codGl0bGVTdW1tTWluLnRleHRDb250ZW50KTtcclxuXHR9XHJcblx0aWYgKGkgPT0gMSkge1xyXG5cdFx0dGl0bGVTdW1tTWF4LnRleHRDb250ZW50ID0gaW5wdXRzUnkudGhlVmFsdWVbMV0gKyBcIuKCvVwiO1xyXG5cdFx0Y29uc29sZS5sb2codGl0bGVTdW1tTWF4LnRleHRDb250ZW50KTtcclxuXHR9XHJcbn1cclxuXHJcbi8vZXZlbnRzXHJcblxyXG50aHVtYnNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihldnQpIHtcclxuXHRpc0RyYWdnaW5nMCA9IHRydWU7XHJcbn0sIGZhbHNlKTtcclxudGh1bWJzWzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oZXZ0KSB7XHJcblx0aXNEcmFnZ2luZzEgPSB0cnVlO1xyXG59LCBmYWxzZSk7XHJcbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBmdW5jdGlvbihldnQpIHtcclxuXHRpc0RyYWdnaW5nMCA9IGZhbHNlO1xyXG5cdGlzRHJhZ2dpbmcxID0gZmFsc2U7XHJcbn0sIGZhbHNlKTtcclxuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbihldnQpIHtcclxuXHRpc0RyYWdnaW5nMCA9IGZhbHNlO1xyXG5cdGlzRHJhZ2dpbmcxID0gZmFsc2U7XHJcbn0sIGZhbHNlKTtcclxuXHJcbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdGxldCBtb3VzZVBvcyA9IG9Nb3VzZVBvcyh0aGlzLCBldnQpO1xyXG5cdGxldCB0aGVWYWx1ZTAgPSAoaXNEcmFnZ2luZzApID8gTWF0aC5yb3VuZChtb3VzZVBvcy54IC8gcmFuZ2VLKSArIGlucHV0c1J5Lm1pblJhbmdlIDogaW5wdXRzUnkudGhlVmFsdWVbMF07XHJcblx0Y29uc29sZS5sb2codGhlVmFsdWUwKTtcclxuXHRsZXQgdGhlVmFsdWUxID0gKGlzRHJhZ2dpbmcxKSA/IE1hdGgucm91bmQobW91c2VQb3MueCAvIHJhbmdlSykgKyBpbnB1dHNSeS5taW5SYW5nZSA6IGlucHV0c1J5LnRoZVZhbHVlWzFdO1xyXG5cclxuXHRpZiAoaXNEcmFnZ2luZzApIHtcclxuXHJcblx0XHRpZiAodGhlVmFsdWUwIDwgdGhlVmFsdWUxIC0gKHRodW1iUmVhbFdpZHRoIC8gMikgJiZcdHRoZVZhbHVlMCA+PSBpbnB1dHNSeS5taW5SYW5nZSkge1xyXG5cdFx0XHRpbnB1dHNSeS50aGVWYWx1ZVswXSA9IHRoZVZhbHVlMDtcclxuXHRcdFx0dGh1bWJzWzBdLnN0eWxlLmxlZnQgPSAodGhlVmFsdWUwIC0gaW5wdXRzUnkubWluUmFuZ2UpICogcmFuZ2VLIC0gKHRodW1iUmVhbFdpZHRoIC8gMikgKyBcInB4XCI7XHJcblx0XHRcdG91dHB1dHNbMF0uc3R5bGUubGVmdCA9ICh0aGVWYWx1ZTAgLSBpbnB1dHNSeS5taW5SYW5nZSkgKiByYW5nZUsgLSBpbnB1dHNSeS5vdXRwdXRXaWR0aCAvIDIgKyBcInB4XCI7XHJcblx0XHRcdG91dHB1dHNbMF0uaW5uZXJIVE1MID0gXCI8cD5cIiArIHRoZVZhbHVlMCArIFwiPC9wPlwiO1xyXG5cdFx0XHR0aXRsZVN1bW1NaW4udGV4dENvbnRlbnQgPSB0aGVWYWx1ZTAgKyBcIuKCvVwiO1xyXG5cdFx0XHRzbGlkZXIuc3R5bGUucGFkZGluZ0xlZnQgPSAodGhlVmFsdWUwIC0gaW5wdXRzUnkubWluUmFuZ2UpICogcmFuZ2VLICsgXCJweFwiO1xyXG5cdFx0XHR0cmFjay5zdHlsZS53aWR0aCA9ICh0aGVWYWx1ZTEgLSB0aGVWYWx1ZTApICogcmFuZ2VLICsgXCJweFwiO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAoaXNEcmFnZ2luZzEpIHtcclxuXHJcblx0XHRpZiAodGhlVmFsdWUxID4gdGhlVmFsdWUwICsgKHRodW1iUmVhbFdpZHRoIC8gMikgJiZcdHRoZVZhbHVlMSA8PSBpbnB1dHNSeS5tYXhSYW5nZSkge1xyXG5cdFx0XHRpbnB1dHNSeS50aGVWYWx1ZVsxXSA9IHRoZVZhbHVlMTtcclxuXHRcdFx0dGh1bWJzWzFdLnN0eWxlLmxlZnQgPSAodGhlVmFsdWUxIC0gaW5wdXRzUnkubWluUmFuZ2UpICogcmFuZ2VLIC0gKHRodW1iUmVhbFdpZHRoIC8gMikgKyBcInB4XCI7XHJcblx0XHRcdG91dHB1dHNbMV0uc3R5bGUubGVmdCA9ICh0aGVWYWx1ZTEgLSBpbnB1dHNSeS5taW5SYW5nZSkgKiByYW5nZUsgLSBpbnB1dHNSeS5vdXRwdXRXaWR0aCAvIDIgKyBcInB4XCI7XHJcblx0XHRcdG91dHB1dHNbMV0uaW5uZXJIVE1MID0gXCI8cD5cIiArIHRoZVZhbHVlMSArIFwiPC9wPlwiO1xyXG5cdFx0XHR0aXRsZVN1bW1NYXgudGV4dENvbnRlbnQgPSB0aGVWYWx1ZTEgKyBcIuKCvVwiO1xyXG5cdFx0XHRjb25zb2xlLmxvZyh0aXRsZVN1bW1NYXgudGV4dENvbnRlbnQpO1xyXG5cdFx0XHRzbGlkZXIuc3R5bGUucGFkZGluZ1JpZ2h0ID0gKGlucHV0c1J5Lm1heFJhbmdlIC0gdGhlVmFsdWUxKSAqIHJhbmdlSyArIFwicHhcIjtcclxuXHRcdFx0dHJhY2suc3R5bGUud2lkdGggPSAodGhlVmFsdWUxIC0gdGhlVmFsdWUwKSAqIHJhbmdlSyArIFwicHhcIjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59LCBmYWxzZSk7XHJcblxyXG4vLyBoZWxwZXJzXHJcblxyXG5mdW5jdGlvbiBvTW91c2VQb3MoZWxtdCwgZXZ0KSB7XHJcblx0bGV0IENsaWVudFJlY3QgPSBlbG10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdHJldHVybiB7IC8vb2JqZXRvXHJcblx0XHR4OiBNYXRoLnJvdW5kKGV2dC5jbGllbnRYIC0gQ2xpZW50UmVjdC5sZWZ0KSxcclxuXHRcdHk6IE1hdGgucm91bmQoZXZ0LmNsaWVudFkgLSBDbGllbnRSZWN0LnRvcClcclxuXHR9XHJcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy/Qv9C+0LTQutC70Y7Rh9Cw0LXQvCDRgdC70LDQudC00LXRgFxyXG5pbXBvcnQgJy4vbW9kdWxlcy9yYW5nZXNsaWRlci9yYW5nZXNsaWRlci5jc3MnOyAgLy/QvNC+0LTRg9C70Ywg0YHQu9Cw0LnQtNC10YDQsFxyXG5pbXBvcnQgJy4vbW9kdWxlcy9yYW5nZXNsaWRlci9yYW5nZXNsaWRlci5qcyc7ICAgICAgICAvL9GB0LrRgNC40L/RgiDRgdC70LDQudC00LXRgNCwXHJcblxyXG4vL9C/0L7QtNC60LvRjtGH0LXQvdC40LUg0YHQutGA0LjQv9GC0L7QslxyXG5pbXBvcnQgJy4vbW9kdWxlcy9yYW5nZGF0ZS9yYW5nZGF0ZS5qcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL3JhbmdkYXRlL3JhbmdkYXRlLmNzcyc7XHJcbmltcG9ydCAnLi9ibG9jay9jYWxlbmRhci9jYWxlbmRhci5jc3MnOyAgICAgICAgICAgLy/QsdC70L7QuiDQstGL0LLQvtC00LAg0LrQsNC70LXQvdC00LDRgNGPXHJcbmltcG9ydCAnLi9ibG9jay92aXNpdG9yL3Zpc2l0b3IuanMnO1xyXG5pbXBvcnQgJy4vYmxvY2svdmlzaXRvci92aXNpdG9yLmNzcyc7XHJcbmltcG9ydCAnLi9qcy9zZWFyY2hyb29tLmpzJzsgICAgICAgICAgICAgIC8v0YHQutGA0LjQv9GCINGA0LXQt9GD0LvRjNGC0LDRgtC+0LIg0L/QvtC40YHQutCwXHJcbmltcG9ydCAnLi9tb2R1bGVzL2NoZWNrbGlzdC9jaGVja2xpc3QuanMnO1xyXG5pbXBvcnQgJy4vbW9kdWxlcy9jaGVja2xpc3QvY2hlY2tsaXN0LmNzcyc7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuaW1wb3J0ICcuL2Nzcy9zZWFyY2hyb29tLmNzcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL2NoZWNrYnV0dG9uL2NoZWNrYnV0dG9uLmNzcyc7XHJcbmltcG9ydCAnLi9ibG9jay9hbWVuaXRpZXMvYW1lbml0aWVzLmNzcyc7XHJcbmltcG9ydCAnLi9ibG9jay9hbWVuaXRpZXMvYW1lbml0aWVzLmpzJztcclxuaW1wb3J0ICcuL2Jsb2NrL2FkZGFtZW5pdGllcy9hZGRhbWVuaXRpZXMuanMnO1xyXG5pbXBvcnQgJy4vYmxvY2svcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmpzJztcclxuaW1wb3J0ICcuL2Jsb2NrL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jc3MnO1xyXG5pbXBvcnQgJy4vbW9kdWxlcy9zdGFycy9zdGFycy5qcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL3N0YXJzL3N0YXJzLmNzcyc7XHJcbmltcG9ydCAnLi9ibG9jay9zZWFyY2hyZXN1bHQvc2VhcmNocmVzdWx0LmpzJztcclxuaW1wb3J0ICcuL2Jsb2NrL3NlYXJjaHJlc3VsdC9zZWFyY2hyZXN1bHQuY3NzJztcclxuaW1wb3J0ICcuL2Jsb2NrL3NlYXJjaHJlc3VsdC9zZXJjaHJlc3VsdGJhY2tncmF1bmQuY3NzJztcclxuIl0sIm5hbWVzIjpbImFkZEFtZW5pdGllc0J0biIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEFtZW5pdGllc0Jsb2NrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImFtZW5pdGllc0J0biIsImFtZW5pdGllc0lucHV0IiwiYW1lbml0aWVzRm9ybSIsImFtZW5pdGllc0Ryb3AiLCJhbWVuaXRpZXNCdG5TYXZlIiwiYW1lbml0aWVzQnRuQ2xlYXIiLCJiZWRyb29tU2VsZWN0TWluIiwiYmVkcm9vbVNlbGVjdE1heCIsImJlZHJvb21TZWxlY3RSZXN1bHQiLCJiZWRTZWxlY3RNaW4iLCJiZWRTZWxlY3RNYXgiLCJiZWRTZWxlY3RSZXN1bHQiLCJiYXRocm9vbVNlbGVjdE1pbiIsImJhdGhyb29tU2VsZWN0TWF4IiwiYmF0aHJvb21TZWxlY3RSZXN1bHQiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJhbWVuaXRpZXNIb3ZlckJlZHJvb20iLCJuYW1CZWRyb29tSG92ZXIiLCJhZGQiLCJyZW1vdmUiLCJhbWVuaXRpZXNIb3ZlckJlZCIsIm5hbUJlZEhvdmVyIiwiYW1lbml0aWVzSG92ZXJCYXRocm9vbSIsIm5hbUJhdGhyb29tSG92ZXIiLCJ0ZXh0Q29udGVudCIsIk51bWJlciIsInBhcnNlSW50IiwiYW1lbml0aWVzU3VtbVRleHQiLCJpbnB1dE51bUJlZHJvb20iLCJpbnB1dE51bUJlZCIsImlucHV0TnVtQmF0aHJvb20iLCJpbnB1dE51bSIsImJ0bkNsZWFyQW1lbml0aWVzIiwiaW5wdXRUZXh0QmVkcm9vbSIsImlucHV0VGV4dEJlZCIsImlucHV0VGV4dEJhdGhyb29tIiwiYW1lbml0aWVzQmVkcm9vbUFsbCIsImFtZW5pdGllc0JlZEFsbCIsImFtZW5pdGllc0JhdGhyb29tQWxsIiwibmFtZU51bWJlciIsIm51bWJlciIsInRleHQiLCJjYXNlcyIsIm51bUNsZWFyIiwiZHJvcElucHV0TWVudSIsImJsb2NrUGFnaW5hdGlvbiIsIm9uY2xpY2siLCJldmVudCIsInB1bmt0UGFnaW5hdGlvblRhcmdldCIsInRhcmdldCIsInBhcmVudFB1bmt0VGFyZ2V0IiwicGFyZW50RWxlbWVudCIsImNoaWxkcmVuUHVua3RUYXJnZXQiLCJjaGlsZHJlbiIsImxlbmdodENoaWxkcmVuUHVua3RUYXJnZXQiLCJsZW5ndGgiLCJpIiwicHVua3RDaGlsZHJlblBhZ2luYXRpb24iLCJ2aXNpdG9yQnRuIiwidmlzaXRvcklucHV0IiwidmlzaXRvckZvcm0iLCJ2aXNpdG9yRHJvcCIsInZpc2l0b3JCdG5TYXZlIiwidmlzaXRvckJ0bkNsZWFyIiwiYmlnU2VsZWN0TWluIiwiYmlnU2VsZWN0TWF4IiwiYmlnU2VsZWN0UmVzdWx0IiwiY2hpbGRTZWxlY3RNaW4iLCJjaGlsZFNlbGVjdE1heCIsImNoaWxkU2VsZWN0UmVzdWx0IiwiYmFiaVNlbGVjdE1pbiIsImJhYmlTZWxlY3RNYXgiLCJiYWJpU2VsZWN0UmVzdWx0IiwidmlzaXRvckhvdmVyQmlnIiwibmFtQmlnSG92ZXIiLCJ2aXNpdG9ySG92ZXJDaGlsZCIsIm5hbUNoaWxkSG92ZXIiLCJ2aXNpdG9ySG92ZXJCYWJpIiwibmFtQmFiaUhvdmVyIiwidmlzaXRvclN1bW1UZXh0IiwiYnRuQ2xlYXJWaXNpdG9yIiwiZGF0ZUxpdmUiLCJyYW5nZURhdGUiLCJmb3JtVmlzaXRvcklucHV0IiwiZGF0ZXBpY2tlckJsb2NrIiwiaW5zZXJ0Q2FsZW5kYXIiLCJpbnNlcnRWaXNpdG9yIiwiYXBwbHlTZWxlY3QiLCJidXR0b25DYWxlbmRhciIsImJ0bkZvcm0iLCJjYWxlbmRhck91dHB1dCIsImJ0bkNhbGVuZGFyUmVzdWx0IiwiYnRuQ2FsZW5kYXJDbGVhciIsImJ0bkNhbGVuZGFyQXBwbHkiLCJjYWxlbmRhckRlbGV0ZSIsImJ0bkNsaWNrIiwiYnRuSW5wdXQiLCJibG9ja0NhbGVuZGFyIiwiZGF0ZXBpY2tlckNyZWF0ZSIsImluc2VydEFkamFjZW50SFRNTCIsIiQiLCJkYXRlcGlja2VyIiwicmFuZ2UiLCJ0b2dnbGVTZWxlY3RlZCIsIm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IiLCJtaW5EYXRlIiwiRGF0ZSIsIm9uU2VsZWN0Iiwic2VsZWN0ZWREYXRlcyIsInVuZGVmaW5lZCIsImluZGV4T2YiLCJtZHlDYWxlbmRhciIsInNwbGl0IiwibWR5U3RhcnQiLCJtZHlFbmQiLCJ0aXRsZVN1bW1NaW4iLCJ0aXRsZVN1bW1NYXgiLCJpbnB1dHNSeSIsInNsaWRlcldpZHRoIiwibWluUmFuZ2UiLCJtYXhSYW5nZSIsIm91dHB1dFdpZHRoIiwidGh1bWJXaWR0aCIsInRodW1iQm9yZGVyV2lkdGgiLCJ0cmFja0hlaWdodCIsInRoZVZhbHVlIiwiaXNEcmFnZ2luZzAiLCJpc0RyYWdnaW5nMSIsInJhbmdlSyIsImNvbnRhaW5lciIsInRodW1iUmVhbFdpZHRoIiwic2xpZGVyIiwic3R5bGUiLCJoZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwidHJhY2siLCJ0aHVtYnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYm9yZGVyV2lkdGgiLCJ0b3AiLCJsZWZ0Iiwib3V0cHV0cyIsImxpbmVIZWlnaHQiLCJNYXRoIiwic3FydCIsImlubmVySFRNTCIsImV2dCIsIm1vdXNlUG9zIiwib01vdXNlUG9zIiwidGhlVmFsdWUwIiwicm91bmQiLCJ4IiwidGhlVmFsdWUxIiwiZWxtdCIsIkNsaWVudFJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRYIiwieSIsImNsaWVudFkiXSwic291cmNlUm9vdCI6IiJ9