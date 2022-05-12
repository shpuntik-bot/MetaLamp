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

/***/ "./modules/photoslider/photoslider.js":
/*!********************************************!*\
  !*** ./modules/photoslider/photoslider.js ***!
  \********************************************/
/***/ (() => {

//это работает для всего блока найденного
var blockSearch = document.querySelector('.result-search');
console.log(blockSearch);
blockSearch.addEventListener('mouseenter', function () {
  console.log('попал в фокус');
  var blockSearchTarget = event.target; //на что навели

  console.log('на что навели');
  console.log(blockSearchTarget);
});
blockSearch.addEventListener('mouseover', function () {
  console.log('попал в фокус');
  var blockSearchTarget = event.target; //на что навели

  console.log('на что навели mouseover');
  console.log(blockSearchTarget);
  console.log('ТЭГ на что навели mouseover');
  console.log(blockSearchTarget.tagName);

  if (blockSearchTarget.tagName == 'IMG') {
    var blockSearchTargetParent = blockSearchTarget.parentElement;
    console.log('родитель mouseover');
    console.log(blockSearchTargetParent);
    var blockSearchTargetParentParent = blockSearchTargetParent.parentElement;
    console.log('родитель родителя mouseover');
    console.log(blockSearchTargetParentParent);
    var blockSearchTargetParentParentHref = blockSearchTargetParentParent.parentElement;
    console.log('родитель родителя ссылка mouseover');
    console.log(blockSearchTargetParentParentHref);
    var blockSearchTargetHrefParent = blockSearchTargetParentParentHref.parentElement;
    console.log('родитель родителя ссылка mouseover');
    console.log(blockSearchTargetHrefParent);
    var blockSearchTargetHrefChildren = blockSearchTargetHrefParent.children;
    console.log('дети ссылки mouseover');
    console.log(blockSearchTargetHrefChildren);
    blockSearchTargetHrefChildren[1].classList.add('result-mini-top_back-backgrond-display');
    blockSearchTargetHrefChildren[2].classList.add('result-mini-top_next-backgrond-display'); //сюда всунуть модуль на определение какой слайд выводиться на дисплей

    var blockSearchTargetChildren = blockSearchTargetParentParent.children; //дети слайдеры

    var numberSlideActive; // номер слайдера

    console.log('дети слайдера');
    console.log(blockSearchTargetChildren); //перебор массива

    for (i = 0; i < blockSearchTargetChildren.length; i++) {
      //условие поиска свойства
      console.log('blockSearchTargetChildren[i]');
      console.log(blockSearchTargetChildren[i]);
      console.log('blockSearchTargetChildren[i].className');
      console.log(blockSearchTargetChildren[i].className);

      if (blockSearchTargetChildren[i].className == 'result-slider-img result-slider-img_display') {
        numberSlideActive = i;
        console.log('номер слайда в массиве');
        console.log(numberSlideActive);
      }
    }

    runSlider(blockSearchTargetHrefChildren[1], blockSearchTargetHrefChildren[2], blockSearchTargetParentParent, blockSearchTargetHrefChildren[3], numberSlideActive);
  } else {
    console.log('ТЭГ не найден');
  }
});
blockSearch.addEventListener('mouseleave', function () {
  console.log('вышел из фокуса');
  var blockSearchTarget = event.target; //на что навели

  console.log('что покинули');
  console.log(blockSearchTarget);
});
blockSearch.addEventListener('mouseout', function () {
  console.log('попал в фокус');
  var blockSearchTarget = event.target; //на что навели

  console.log('на что навели mouseover');
  console.log(blockSearchTarget);
  console.log('ТЭГ на что навели mouseover');
  console.log(blockSearchTarget.tagName);

  if (blockSearchTarget.tagName == 'IMG') {
    var removeButton = function removeButton() {
      blockSearchTargetHrefChildren[1].classList.remove('result-mini-top_back-backgrond-display');
      blockSearchTargetHrefChildren[2].classList.remove('result-mini-top_next-backgrond-display');
      console.log('удаление боковых кнопок');
    };

    var blockSearchTargetParent = blockSearchTarget.parentElement;
    console.log('родитель mouseover');
    console.log(blockSearchTargetParent);
    var blockSearchTargetParentParent = blockSearchTargetParent.parentElement;
    console.log('родитель родителя mouseover');
    console.log(blockSearchTargetParentParent);
    var blockSearchTargetParentParentHref = blockSearchTargetParentParent.parentElement;
    console.log('родитель родителя ссылка mouseover');
    console.log(blockSearchTargetParentParentHref);
    var blockSearchTargetHrefParent = blockSearchTargetParentParentHref.parentElement;
    console.log('родитель родителя ссылка mouseover');
    console.log(blockSearchTargetHrefParent);
    var blockSearchTargetHrefChildren = blockSearchTargetHrefParent.children;
    console.log('дети ссылки mouseover');
    console.log(blockSearchTargetHrefChildren);
    setTimeout(removeButton, 1000);
  } else {
    console.log('ТЭГ не найден');
  }
}); //runSlider(blockSearchTargetHrefChildren[1], blockSearchTargetHrefChildren[2], blockSearchTargetParentParent, blockSearchTargetHrefChildren[3]);

function runSlider(back, next, slider, mark, nomSlide) {
  var slideIndex = nomSlide;
  console.log('nomSlide');
  console.log(nomSlide);
  showSlides(slideIndex); //кнопки перехода
  //назад
  //let buttonBack = document.querySelector('.result-mini-top_back-backgrond');

  var buttonBack = back;
  console.log('buttonBack');
  console.log(buttonBack); //вперед
  //let buttonNext = document.querySelector('.result-mini-top_next-backgrond');

  var buttonNext = next;
  console.log('buttonNext');
  console.log(buttonNext); //точки для перехода отключены, используются как маркеры
  //клики на кнопках

  buttonBack.addEventListener('click', function () {
    minusSlide();
  });
  buttonNext.addEventListener('click', function () {
    plusSlide();
  });
  /* Индекс слайда по умолчанию */

  /* Функция увеличивает индекс на 1, показывает следующй слайд*/

  function plusSlide() {
    slideIndex = showSlides(slideIndex += 1);
  }
  /* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/


  function minusSlide() {
    showSlides(slideIndex -= 1);
  }
  /* Устанавливает текущий слайд по круглой кнопке*/
  //function currentSlide(n) {
  //	showSlides(slideIndex = n);
  //}

  /* Основная функция слайдера */


  function showSlides(n) {
    console.log('n');
    console.log(n); //let i;
    //let slides = document.getElementsByClassName("result-slider-img");

    var slides = slider.children; //массив слайдеров

    console.log('slides');
    console.log(slides);
    console.log('slides.length');
    console.log(slides.length); //let dots = document.getElementsByClassName("slider-marck_item");

    var dots = mark.children; //массив точек

    console.log('dots');
    console.log(dots); //если увеличили выше последнего элемента массива

    if (n > slides.length - 1) {
      slideIndex = 0;
      console.log('slideIndex');
      console.log(slideIndex); //n = 0
    } //если уменьшили ниже 1го элемента массива


    if (n < 0) {
      slideIndex = slides.length - 1;
      console.log('slideIndex');
      console.log(slideIndex); //n = slides.length
    } //


    for (i = 0; i < slides.length; i++) {
      //slides[i].style.display = "none";
      slides[i].className = slides[i].className.replace(" result-slider-img_display", "");
    } //


    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" slider-marck_active", "");
    }

    console.log('slideIndex');
    console.log(slideIndex); //две нижние строки вызывают ошибку
    //slides[slideIndex - 1].style.display = "block";
    //slides[n].style.display = "block";
    //slides[n].className += " result-slider-img_display";

    slides[slideIndex].className += " result-slider-img_display"; //dots[slideIndex - 1].className += " slider-marck_active";
    //dots[n].className += " slider-marck_active";

    dots[slideIndex].className += " slider-marck_active";
  }
} //let blockResultSearch = document.querySelector('.result-search');
//console.log('blockResultSearch');
//console.log(blockResultSearch);
//let blockSlider = '';
//console.log('blockSlider');
//console.log(blockSlider);
//blockResultSearch.onmouseover = function(event) {
//	let blockTarget = event.target;  //
//	console.log('blockTarget = event.target');
//	console.log(blockTarget);
//	if (blockTarget.className = 'result-mini-top_fon') {
//		//let blockSlider = document.querySelector('.result-mini-slider');
//		let blockSlider = blockTarget.children;    //дочерние элементы родителя элемента на котором был клик
//		console.log("blockSlider");
//		console.log(blockSlider);
//		let blockSliderLength = blockSlider.length;  //количество ячеек в массиве
//		console.log(blockSliderLength);
//		console.log('add.result-mini-slider');
//		console.log(blockSlider);
//		blockSlider[0].classList.add('result-mini-slider_display');
//		console.log(blockSlider);
//	}
//};
//blockResultSearch.onmouseout = function(event) {
//	blockSlider = event.target;  //
//	console.log('blockSlider = event.target');
//	console.log(blockSlider);
//	if (event.target.className = 'result-mini-top_fon') {
//		let blockSlider = blockTarget.children;    //дочерние элементы родителя элемента на котором был клик
//		console.log("blockSlider");
//		console.log(blockSlider);
//		let blockSliderLength = blockSlider.length;  //количество ячеек в массиве
//		console.log(blockSliderLength);
//		console.log('add.result-mini-slider');
//		console.log(blockSlider);
//		blockSlider[0].classList.remove('result-mini-slider_display');
//		console.log(blockSlider);
//	}
//};
//let blockResultSearch = blockTarget;
//let blockResultSearch = document.querySelector('.result-search');
//let blockSlider = document.querySelector('.result-mini-top_fon');
//let blockResultSearch = document.querySelector('.result-mini-top_fon');
//console.log('blockResultSearch');
//console.log(blockResultSearch);
//blockResultSearch.onmouseover = blockResultSearch.onmouseout = hoverSlider;
//function hoverSlider(event) {
//	if (event.type == 'mouseover') {
//		console.log('event.target.className');
//		console.log(event.target.className);
//		if (event.target.className = 'result-mini-top_fon') {
//			let blockSlider = document.querySelector('.result-mini-slider');
//			console.log('add.result-mini-slider');
//			console.log(blockSlider);
//			blockSlider.classList.add('result-mini-slider_display');
//		}
//    //event.target.style.background = 'pink'
//	}
//	if (event.type == 'mouseout') {
//		console.log('event.target.className');
//		console.log(event.target.className);
//		if (event.target.className = 'result-mini-top_fon') {
//			let blockSlider = document.querySelector('.result-mini-slider');
//			console.log('remove.result-mini-slider');
//			console.log(blockSlider);
//			blockSlider.classList.remove('result-mini-slider_display');
//		}
//     //event.target.style.background = ''
//	}
//}
//container.onmouseover = container.onmouseout = handler;
//
// function handler(event) {
//
//   function str(el) {
//     if (!el) return "null"
//     return el.className || el.tagName;
//   }
//
//   log.value += event.type + ':  ' +
//     'target=' + str(event.target) +
//     ',  relatedTarget=' + str(event.relatedTarget) + "\n";
//   log.scrollTop = log.scrollHeight;
//
//   if (event.type == 'mouseover') {
//     event.target.style.background = 'pink'
//   }
//   if (event.type == 'mouseout') {
//     event.target.style.background = ''
//   }
// }
//blockResultSearch.mouseover = function (event) {
//	let sliderPerent = event.target;
//	console.log('sliderPerent');
//	console.log(sliderPerent);
//
//};
//function blockSliderMous(event) {
//	if (event.type == 'mouseover') {
//     event.target.style.background = 'pink'
//	}
//   if (event.type == 'mouseout') {
//    event.target.style.background = ''
//  }
//}
//function handler(event) {
//
//   function str(el) {
//     if (!el) return "null"
//     return el.className || el.tagName;
//   }
//
//   log.value += event.type + ':  ' +
//     'target=' + str(event.target) +
//     ',  relatedTarget=' + str(event.relatedTarget) + "\n";
//   log.scrollTop = log.scrollHeight;
//
//   if (event.type == 'mouseover') {
//     event.target.style.background = 'pink'
//   }
//   if (event.type == 'mouseout') {
//     event.target.style.background = ''
//   }
// }
//blockSlider.mouseout = function (event) {
// 	let sliderPerent = event.target;
// 	console.log('sliderPerent');
// 	console.log(sliderPerent);
//
// if (event.type == 'mouseover') {
//     event.target.style.background = 'pink'
//   }
//   if (event.type == 'mouseout') {
//     event.target.style.background = ''
//   }
// };mouseout

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

/***/ "./modules/photoslider/photoslider.css":
/*!*********************************************!*\
  !*** ./modules/photoslider/photoslider.css ***!
  \*********************************************/
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
/* harmony import */ var _modules_photoslider_photoslider_css__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./modules/photoslider/photoslider.css */ "./modules/photoslider/photoslider.css");
/* harmony import */ var _modules_photoslider_photoslider_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./modules/photoslider/photoslider.js */ "./modules/photoslider/photoslider.js");
/* harmony import */ var _modules_photoslider_photoslider_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_modules_photoslider_photoslider_js__WEBPACK_IMPORTED_MODULE_23__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ibG9jay9hZGRhbWVuaXRpZXMvYWRkYW1lbml0aWVzLmpzIiwid2VicGFjazovLy8uL2Jsb2NrL2FtZW5pdGllcy9hbWVuaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Jsb2NrL3Zpc2l0b3IvdmlzaXRvci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2hyb29tLmpzIiwid2VicGFjazovLy8uL21vZHVsZXMvcGhvdG9zbGlkZXIvcGhvdG9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9yYW5nZGF0ZS9yYW5nZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3Jhbmdlc2xpZGVyL3Jhbmdlc2xpZGVyLmpzIiwid2VicGFjazovLy8uL2Jsb2NrL2FtZW5pdGllcy9hbWVuaXRpZXMuY3NzPzhhZGIiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svY2FsZW5kYXIvY2FsZW5kYXIuY3NzPzcwMDAiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNzcz8zYjExIiwid2VicGFjazovLy8uL2Jsb2NrL3NlYXJjaHJlc3VsdC9zZWFyY2hyZXN1bHQuY3NzPzVjMDgiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svc2VhcmNocmVzdWx0L3NlcmNocmVzdWx0YmFja2dyYXVuZC5jc3M/NTU4OCIsIndlYnBhY2s6Ly8vLi9ibG9jay92aXNpdG9yL3Zpc2l0b3IuY3NzPzA4MmUiLCJ3ZWJwYWNrOi8vLy4vY3NzL3NlYXJjaHJvb20uY3NzP2ZmOTIiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9jaGVja2J1dHRvbi9jaGVja2J1dHRvbi5jc3M/Nzc2OSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2NoZWNrbGlzdC9jaGVja2xpc3QuY3NzP2IwOGUiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9waG90b3NsaWRlci9waG90b3NsaWRlci5jc3M/MjU2NSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3JhbmdkYXRlL3JhbmdkYXRlLmNzcyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3Jhbmdlc2xpZGVyL3Jhbmdlc2xpZGVyLmNzcz9hMjI1Iiwid2VicGFjazovLy8uL21vZHVsZXMvc3RhcnMvc3RhcnMuY3NzP2Q2NDMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYWRkQW1lbml0aWVzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1hbWVuaXRpZXMtYmxvY2stYnRuJyk7XHJcbmxldCBhZGRBbWVuaXRpZXNCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtYW1lbml0aWVzLWJsb2NrLWNoZWNrJyk7XHJcblxyXG5cclxuYWRkQW1lbml0aWVzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGFkZEFtZW5pdGllc0J0bi5jbGFzc0xpc3QudG9nZ2xlKCdjaGVjay1saXN0LWNsb3NlZF9idXR0b24nKTtcclxuXHRhZGRBbWVuaXRpZXNCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnY2hlY2stbGlzdC1vcGVuX2J1dHRvbicpO1xyXG5cdGFkZEFtZW5pdGllc0Jsb2NrLmNsYXNzTGlzdC50b2dnbGUoJ2FkZC1hbWVuaXRpZXMtYmxvY2stY2hlY2tfYmxvY2snKTtcclxufSk7IiwiXHJcbmxldCBhbWVuaXRpZXNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hbWVuaXRpZXMtYnV0dG9uJyk7ICAgLy/QutC90L7Qv9C60LAg0LIg0L/QvtC70LUg0LLRi9Cx0L7RgNCwINC00LvRjyDRgNCw0LfQstGA0L7RgtCwXHJcbmxldCBhbWVuaXRpZXNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWFtZW5pdGllcy1pbnB1dCcpOyAgLy/Qv9C+0LvQtSDQstGL0LLQvtC00LAg0LLQuNC00LAg0Lgg0LrQvtC7LdCy0LAg0YPQtNC+0LHRgdGC0LJcclxubGV0IGFtZW5pdGllc0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hbWVuaXRpZXMnKTsgICAgLy/QstGB0Y8g0YTQvtGA0LzQsFxyXG5sZXQgYW1lbml0aWVzRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWFtZW5pdGllcycpOyAgIC8v0LLRi9C/0LDQtNCw0Y7RidC10LUg0LzQtdC90Y5cclxubGV0IGFtZW5pdGllc0J0blNhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1pbnB1dC1tZW51X3NhdmUtYW1lbml0aWVzJyk7ICAgLy/QutC90L7Qv9C60LAg0YHQvtGF0YDQsNC90LjRgtGMLdC/0YDQuNC80LXQvdC40YLRjFxyXG5sZXQgYW1lbml0aWVzQnRuQ2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1pbnB1dC1tZW51X2NsZWFyLWFtZW5pdGllcycpOyAgIC8v0LrQvdC+0L/QutCwINC+0YfQuNGB0YLQuNGC0YxcclxuLy/QvtGC0LHQvtGAINC90LDRgdGC0YDQvtC10Log0LLRi9C/0LDQtNCw0Y7RidC10LPQviDQvNC10L3RjlxyXG4vL2xldCBiaWdTZWxlY3RNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iaWctc2VsZWN0LXNtYWxsJyk7XHJcbmxldCBiZWRyb29tU2VsZWN0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmVkcm9vbS1zZWxlY3Qtc21hbGwnKTsgICAvL9GD0LzQtdC90YzRiNC10L3QuNC1XHJcbmxldCBiZWRyb29tU2VsZWN0TWF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmVkcm9vbS1zZWxlY3QtbW9yZScpOyAgIC8v0LrQstC10LvQuNGH0LXQvdC40LVcclxubGV0IGJlZHJvb21TZWxlY3RSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iZWRyb29tLXNlbGVjdC1yZXN1bHQnKTsgICAvL9GA0LXQt9GD0LvRjNGC0LDRglxyXG4vL9C00LXRgtC4XHJcbi8vbGV0IGNoaWxkU2VsZWN0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtY2hpbGRyZW4tc2VsZWN0LXNtYWxsJyk7ICAvL9GB0LrQvtC70YzQutC+INC00LXRgtC10LlcclxubGV0IGJlZFNlbGVjdE1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJlZC1zZWxlY3Qtc21hbGwnKTtcclxubGV0IGJlZFNlbGVjdE1heCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJlZC1zZWxlY3QtbW9yZScpO1xyXG5sZXQgYmVkU2VsZWN0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmVkLXNlbGVjdC1yZXN1bHQnKTtcclxuLy/QvNC70LDQtNC10L3RhtGLXHJcbi8vbGV0IGJhYmlTZWxlY3RNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iYWJpZXMtc2VsZWN0LXNtYWxsJyk7ICAgLy/RgdC60L7Qu9GM0LrQviDQvNC70LDQtNC10L3RhtC10LJcclxubGV0IGJhdGhyb29tU2VsZWN0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmF0aHJvb20tc2VsZWN0LXNtYWxsJyk7XHJcbmxldCBiYXRocm9vbVNlbGVjdE1heCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJhdGhyb29tLXNlbGVjdC1tb3JlJyk7XHJcbmxldCBiYXRocm9vbVNlbGVjdFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJhdGhyb29tLXNlbGVjdC1yZXN1bHQnKTtcclxuXHJcbmFtZW5pdGllc0lucHV0LnZhbHVlID0gJ9Cj0LTQvtCx0YHRgtCy0LAnO1xyXG4vLy0tLS0tLS0tLS3QmtC90L7Qv9C60LgtLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG4vLy0tLS0t0YDQsNC30LLQsNGA0L7RgiDRgdC/0LjRgdC60LAg0LLRi9Cx0L7RgNC60LgtLS0tLS0vL1xyXG5hbWVuaXRpZXNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc29sZS5sb2coJ2FtZW5pdGllc0Ryb3AnKTtcclxuXHRjb25zb2xlLmxvZyhhbWVuaXRpZXNEcm9wKTtcclxuXHRhbWVuaXRpZXNEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3AtYW1lbml0aWVzX2Rpc3BsYXknKTtcclxuXHRhbWVuaXRpZXNJbnB1dC5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtLWFtZW5pdGllcy1pbnB1dF9ib3JkZXInKTtcclxufSk7XHJcblxyXG4vLy0tLS0t0LDQutGC0LjQstCw0YbQuNGPINC60L3QvtC/0L7QuiDQv9GA0Lgg0LfQvdCw0YfQtdC90LjQuCDQsdC+0LvQtdC1IDAtLS0tLS0tLy9cclxuLy9mdW5jdGlvbiB2aXNpdG9ySG92ZXJCaWcobmFtQmlnSG92ZXIpIHtcclxuZnVuY3Rpb24gYW1lbml0aWVzSG92ZXJCZWRyb29tKG5hbUJlZHJvb21Ib3Zlcikge1xyXG5cdGlmIChuYW1CZWRyb29tSG92ZXIgPj0gMSkge1xyXG5cdFx0YmVkcm9vbVNlbGVjdE1pbi5jbGFzc0xpc3QuYWRkKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdFx0Y29uc29sZS5sb2cobmFtQmVkcm9vbUhvdmVyKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YmVkcm9vbVNlbGVjdE1pbi5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdFx0Y29uc29sZS5sb2cobmFtQmVkcm9vbUhvdmVyKTtcclxuXHR9XHJcbn1cclxuLy9mdW5jdGlvbiB2aXNpdG9ySG92ZXJDaGlsZChuYW1DaGlsZEhvdmVyKSB7XHJcbmZ1bmN0aW9uIGFtZW5pdGllc0hvdmVyQmVkKG5hbUJlZEhvdmVyKSB7XHJcblx0aWYgKG5hbUJlZEhvdmVyID49IDEpIHtcclxuXHRcdGJlZFNlbGVjdE1pbi5jbGFzc0xpc3QuYWRkKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRiZWRTZWxlY3RNaW4uY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHR9XHJcbn1cclxuLy9mdW5jdGlvbiB2aXNpdG9ySG92ZXJCYWJpKG5hbUJhYmlIb3Zlcikge1xyXG5mdW5jdGlvbiBhbWVuaXRpZXNIb3ZlckJhdGhyb29tKG5hbUJhdGhyb29tSG92ZXIpIHtcclxuXHRpZiAobmFtQmF0aHJvb21Ib3ZlciA+PSAxKSB7XHJcblx0XHRiYXRocm9vbVNlbGVjdE1pbi5jbGFzc0xpc3QuYWRkKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRiYXRocm9vbVNlbGVjdE1pbi5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdH1cclxufVxyXG5cclxuLy8tLS0tLS0tLS3QstGL0LHQvtGA0LrQsCDQutC+0LvQuNGH0LXRgdGC0LIg0YPQtNC+0LHRgdGC0LItLS0tLS0vL1xyXG4vLy0tLS0t0YHQv9Cw0LvRjNC90LgtLS0tLy9cclxuYmVkcm9vbVNlbGVjdE1pbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoYmVkcm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA+PSAxKSB7XHJcblx0XHRiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJlZHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpIC0gMTtcclxuXHRcdGNvbnNvbGUubG9nKGJlZHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdFx0YW1lbml0aWVzSG92ZXJCZWRyb29tKE51bWJlci5wYXJzZUludChiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHRhbWVuaXRpZXNTdW1tVGV4dCgpO1xyXG5cdFx0Ly/QvdCwINGB0YPQvNC80YMgMSDQsNGA0LPRg9C80LXQvdGCLCDRgtCw0LrQttC1INGB0Y7QtNCwINCy0YHRgtCw0LLQu9GP0LXQvCDRhdC+0LLQtdGAXHJcblx0fVxyXG59KTtcclxuYmVkcm9vbVNlbGVjdE1heC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoYmVkcm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCAhPSAtMSkge1xyXG5cdFx0YmVkcm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSArIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdGFtZW5pdGllc0hvdmVyQmVkcm9vbShOdW1iZXIucGFyc2VJbnQoYmVkcm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0YW1lbml0aWVzU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG4vLy0tLS0t0LrRgNC+0LLQsNGC0LgtLS0tLy9cclxuYmVkU2VsZWN0TWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPj0gMSkge1xyXG5cdFx0YmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgLSAxO1xyXG5cdFx0Y29uc29sZS5sb2coYmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdGFtZW5pdGllc0hvdmVyQmVkKE51bWJlci5wYXJzZUludChiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdGFtZW5pdGllc1N1bW1UZXh0KCk7XHJcblx0fVxyXG59KTtcclxuYmVkU2VsZWN0TWF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgIT0gLTEpIHtcclxuXHRcdGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgMTtcclxuXHRcdGNvbnNvbGUubG9nKGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHRhbWVuaXRpZXNIb3ZlckJlZChOdW1iZXIucGFyc2VJbnQoYmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHRhbWVuaXRpZXNTdW1tVGV4dCgpO1xyXG5cdH1cclxufSk7XHJcbi8vLS0tLS3QstCw0L3QvdGL0LUg0LrQvtC80L3QsNGC0YstLS0tLy9cclxuYmF0aHJvb21TZWxlY3RNaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID49IDEpIHtcclxuXHRcdGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSAtIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHRhbWVuaXRpZXNIb3ZlckJhdGhyb29tKE51bWJlci5wYXJzZUludChiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0YW1lbml0aWVzU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG5iYXRocm9vbVNlbGVjdE1heC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoYmF0aHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgIT0gLTEpIHtcclxuXHRcdGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSArIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHRhbWVuaXRpZXNIb3ZlckJhdGhyb29tKE51bWJlci5wYXJzZUludChiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0YW1lbml0aWVzU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8vLS0tLdCk0YPQvdC60YbQuNGPINGH0LjRgdC70L7QstGL0YUg0YHQutC70L7QvdC10L3QuNC5INC60L7Qu9C40YfQtdGB0YLQstCwINCz0L7RgdGC0LXQuVxyXG5mdW5jdGlvbiBhbWVuaXRpZXNTdW1tVGV4dCgpIHtcclxuXHJcblx0bGV0IGlucHV0TnVtQmVkcm9vbSA9IE51bWJlci5wYXJzZUludChiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRsZXQgaW5wdXROdW1CZWQgPSBOdW1iZXIucGFyc2VJbnQoYmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRsZXQgaW5wdXROdW1CYXRocm9vbSA9IE51bWJlci5wYXJzZUludChiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0bGV0IGlucHV0TnVtID0gaW5wdXROdW1CZWRyb29tICsgaW5wdXROdW1CZWQgKyBpbnB1dE51bUJhdGhyb29tO1xyXG5cclxuXHRpZiAoaW5wdXROdW0gPT0gMCkge1xyXG5cdFx0Ly92aXNpdG9ySW5wdXQudGV4dENvbnRlbnQgPSAn0KHQutC+0LvRjNC60L4g0LPQvtGB0YLQtdC5JztcclxuXHRcdGFtZW5pdGllc0lucHV0LnZhbHVlID0gJ9Cj0LTQvtCx0YHRgtCy0LAnO1xyXG5cdH1cclxuXHRidG5DbGVhckFtZW5pdGllcyhpbnB1dE51bSk7XHJcblxyXG5cdGxldCBpbnB1dFRleHRCZWRyb29tID0gWydj0L/QsNC70YzQvdGPJywgJ2PQv9Cw0LvRjNC90LgnLCAnY9C/0LDQu9C10L0nXTtcclxuXHRsZXQgaW5wdXRUZXh0QmVkID0gWyfQutGA0L7QstCw0YLRjCcsICfQutGA0L7QstCw0YLQuCcsICfQutGA0L7QstCw0YLQtdC5J107XHJcblx0bGV0IGlucHV0VGV4dEJhdGhyb29tID0gWyfQstCw0L3QvdCw0Y8nLCAn0LLQsNC90L3Ri9C1JywgJ9Cy0LDQvdC9J107XHJcblxyXG5cdGxldCBhbWVuaXRpZXNCZWRyb29tQWxsID0gIDA7XHJcblx0bGV0IGFtZW5pdGllc0JlZEFsbCA9IDA7XHJcblx0bGV0IGFtZW5pdGllc0JhdGhyb29tQWxsID0gMDtcclxuXHJcblx0aWYgKGlucHV0TnVtQmVkcm9vbSA+PSAxKSB7XHJcblx0XHRhbWVuaXRpZXNCZWRyb29tQWxsID0gYCR7aW5wdXROdW1CZWRyb29tfSAke25hbWVOdW1iZXIoaW5wdXROdW1CZWRyb29tLCBpbnB1dFRleHRCZWRyb29tKX0sYDtcclxuXHRcdGNvbnNvbGUubG9nKGFtZW5pdGllc0JlZHJvb21BbGwpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhbWVuaXRpZXNCZWRyb29tQWxsID0gJyc7XHJcblx0XHRpbnB1dE51bUJlZHJvb20gPSAnJztcclxuXHRcdGNvbnNvbGUubG9nKGFtZW5pdGllc0JlZHJvb21BbGwpO1xyXG5cdH1cclxuXHRpZiAoaW5wdXROdW1CZWQgPj0gMSkge1xyXG5cdFx0Y29uc29sZS5sb2coaW5wdXROdW1CZWQsIGlucHV0VGV4dEJlZCk7XHJcblx0XHRhbWVuaXRpZXNCZWRBbGwgPSBgJHtpbnB1dE51bUJlZH0gJHtuYW1lTnVtYmVyKGlucHV0TnVtQmVkLCBpbnB1dFRleHRCZWQpfSxgO1xyXG5cdFx0Y29uc29sZS5sb2coYW1lbml0aWVzQmVkQWxsKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YW1lbml0aWVzQmVkQWxsID0gJyc7XHJcblx0XHRpbnB1dE51bUJlZCA9ICcnO1xyXG5cdFx0Y29uc29sZS5sb2coYW1lbml0aWVzQmVkQWxsKTtcclxuXHR9XHJcblx0aWYgKGlucHV0TnVtQmF0aHJvb20gPj0gMSkge1xyXG5cdFx0aWYgKChpbnB1dE51bUJhdGhyb29tID49IDEpICYmIChpbnB1dE51bUJlZHJvb20gPj0gMSkgJiYgKGlucHV0TnVtQmVkID49IDEpKSB7XHJcblx0XHRcdGFtZW5pdGllc0JhdGhyb29tQWxsID0gJy4uLic7XHJcblx0XHRcdGNvbnNvbGUubG9nKGFtZW5pdGllc0JhdGhyb29tQWxsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFtZW5pdGllc0JhdGhyb29tQWxsID0gYCR7aW5wdXROdW1CYXRocm9vbX0gJHtuYW1lTnVtYmVyKGlucHV0TnVtQmF0aHJvb20sIGlucHV0VGV4dEJhdGhyb29tKX1gO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhhbWVuaXRpZXNCYXRocm9vbUFsbCk7XHJcblx0XHR9XHJcblxyXG5cdH0gZWxzZSB7XHJcblx0XHRhbWVuaXRpZXNCYXRocm9vbUFsbCA9ICcnO1xyXG5cdFx0aW5wdXROdW1CYXRocm9vbSA9ICcnO1xyXG5cdFx0Y29uc29sZS5sb2coYW1lbml0aWVzQmF0aHJvb21BbGwpO1xyXG5cdH1cclxuXHJcblx0YW1lbml0aWVzSW5wdXQudmFsdWUgPSBgJHthbWVuaXRpZXNCZWRyb29tQWxsfSAke2FtZW5pdGllc0JlZEFsbH0gJHthbWVuaXRpZXNCYXRocm9vbUFsbH1gO1xyXG5cdFx0Y29uc29sZS5sb2coYW1lbml0aWVzSW5wdXQudmFsdWUpO1xyXG5cclxuXHRmdW5jdGlvbiBuYW1lTnVtYmVyKG51bWJlciwgdGV4dCkge1xyXG5cdFx0bGV0IGNhc2VzID0gWzIsIDAsIDEsIDEsIDEsIDJdO1xyXG5cdFx0cmV0dXJuIHRleHRbKG51bWJlciAlIDEwMCA+IDQgJiYgbnVtYmVyICUgMTAwIDwgMjApID8gMiA6IGNhc2VzWyhudW1iZXIgJSAxMCA8IDUpID8gbnVtYmVyICUgMTAgOiA1XV07XHJcblx0fVxyXG59XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG4vL2Z1bmN0aW9uIGFtZW5pdGllc1N1bW1UZXh0KCkge1xyXG4vL1x0Ly9pcHV0TmFtID0gTnVtYmVyLnBhcnNlSW50KGlwdXROYW0pO1xyXG4vL1x0bGV0IGlucHV0TnVtID0gTnVtYmVyLnBhcnNlSW50KGJlZHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgTnVtYmVyLnBhcnNlSW50KGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgKyBOdW1iZXIucGFyc2VJbnQoYmF0aHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG4vL1x0Y29uc29sZS5sb2coJ2lucHV0TnVtJyk7XHJcbi8vXHRjb25zb2xlLmxvZyhpbnB1dE51bSk7XHJcbi8vXHRidG5DbGVhckFtZW5pdGllcyhpbnB1dE51bSk7XHJcbi8vXHQvL2Z1bGxTdW1tID0gTnVtYmVyKGZ1bGxTdW1tKTtcclxuLy9cdGlmIChpbnB1dE51bSA9PSAwKSB7XHJcbi8vXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gJ9Ch0LrQvtC70YzQutC+INCz0L7RgdGC0LXQuSc7XHJcbi8vXHRcdGFtZW5pdGllc0lucHV0LnZhbHVlID0gJ9Cj0LTQvtCx0YHRgtCy0LAnO1xyXG4vL1x0fVxyXG4vL1x0aWYgKChpbnB1dE51bSA9PSAxKSB8fCAoaW5wdXROdW0gPT0gMjEpKSB7XHJcbi8vXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gaXB1dE5hbSArICcg0LPQvtGB0YLRjCc7XHJcbi8vXHRcdGFtZW5pdGllc0lucHV0LnZhbHVlID0gaW5wdXROdW0gKyAnINCz0L7RgdGC0YwnO1xyXG4vL1x0fVxyXG4vL1x0aWYgKChpbnB1dE51bSA+IDEgJiYgaW5wdXROdW0gPCA1KSB8fCAoaW5wdXROdW0gPiAyMSAmJiBpbnB1dE51bSA8IDI1KSkge1xyXG4vL1x0XHQvL3Zpc2l0b3JJbnB1dC50ZXh0Q29udGVudCA9IGlwdXROYW0gKyAnINCz0L7RgdGC0Y8nO1xyXG4vL1x0XHRhbWVuaXRpZXNJbnB1dC52YWx1ZSA9IGlucHV0TnVtICsgJyDQs9C+0YHRgtGPJztcclxuLy9cdH1cclxuLy9cdGlmICgoaW5wdXROdW0gPiA0ICYmIGlucHV0TnVtIDwgMjEpIHx8IChpbnB1dE51bSA+IDI0ICYmIGlucHV0TnVtIDwgMzEpKSB7XHJcbi8vXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gaXB1dE5hbSArICcg0LPQvtGB0YLQtdC5JztcclxuLy9cdFx0YW1lbml0aWVzSW5wdXQudmFsdWUgPSBpbnB1dE51bSArICcg0LPQvtGB0YLQtdC5JztcclxuLy9cdH1cclxuLy9cdGlmIChpbnB1dE51bSA+PSAzMSkge1xyXG4vL1x0XHQvL3Zpc2l0b3JJbnB1dC50ZXh0Q29udGVudCA9ICfQodC70LjRiNC60L7QvCDQvNC90L7Qs9C+ISdcclxuLy9cdFx0YW1lbml0aWVzSW5wdXQudmFsdWUgPSAn0KHQu9C40YjQutC+0Lwg0LzQvdC+0LPQviEnXHJcbi8vXHR9XHJcbi8vfVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS3QstGB0L/Qu9GL0YLQuNC1INC4INC/0YDQvtCy0LXRgNC60LAg0LrQvdC+0L/QutC4INC+0YfQuNGB0YLQuNGC0YwtLS0tLS0tLS0vL1xyXG5hbWVuaXRpZXNCdG5DbGVhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRhbWVuaXRpZXNJbnB1dC52YWx1ZSA9ICfQo9C00L7QsdGB0YLQstCwJztcclxuXHRiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gMDtcclxuXHRiZWRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPSAwO1xyXG5cdGJhdGhyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gMDtcclxuXHQvL3Zpc2l0b3JIb3ZlckJpZyhOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0YW1lbml0aWVzSG92ZXJCZWRyb29tKE51bWJlci5wYXJzZUludChiZWRyb29tU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0Ly92aXNpdG9ySG92ZXJDaGlsZChOdW1iZXIucGFyc2VJbnQoYmVkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0YW1lbml0aWVzSG92ZXJCZWQoTnVtYmVyLnBhcnNlSW50KGJlZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdC8vdmlzaXRvckhvdmVyQmFiaShOdW1iZXIucGFyc2VJbnQoYmF0aHJvb21TZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRhbWVuaXRpZXNIb3ZlckJhdGhyb29tKE51bWJlci5wYXJzZUludChiYXRocm9vbVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cclxuXHRidG5DbGVhckFtZW5pdGllcygwKTtcclxufSk7XHJcbmZ1bmN0aW9uIGJ0bkNsZWFyQW1lbml0aWVzKG51bUNsZWFyKSB7XHJcblx0bGV0IGRyb3BJbnB1dE1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1pbnB1dF9wcm9wcy1hbWVuaXRpZXMnKTtcclxuXHRpZiAobnVtQ2xlYXIgPiAwKSB7XHJcblx0XHRhbWVuaXRpZXNCdG5DbGVhci5jbGFzc0xpc3QuYWRkKCdkcm9wLWlucHV0LW1lbnVfY2xlYXItZGlzcGxheScpO1xyXG5cdFx0ZHJvcElucHV0TWVudS5jbGFzc0xpc3QuYWRkKCdkcm9wLWlucHV0X2ZsZXgnKTtcclxuXHR9XHJcblx0aWYgKG51bUNsZWFyIDw9IDApIHtcclxuXHRcdGFtZW5pdGllc0J0bkNsZWFyLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtaW5wdXQtbWVudV9jbGVhci1kaXNwbGF5Jyk7XHJcblx0XHRkcm9wSW5wdXRNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtaW5wdXRfZmxleCcpO1xyXG5cdH1cclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS3QutC90L7Qv9C60LAg0L/RgNC40LzQtdC90LjRgtGMLS0tLS0tLS0tLy9cclxuYW1lbml0aWVzQnRuU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRhbWVuaXRpZXNEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3AtYW1lbml0aWVzX2Rpc3BsYXknKTtcclxuXHRhbWVuaXRpZXNJbnB1dC5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtLWFtZW5pdGllcy1pbnB1dF9ib3JkZXInKTtcclxufSk7IiwibGV0IGJsb2NrUGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uLWhyZWYnKTtcclxuY29uc29sZS5sb2coYmxvY2tQYWdpbmF0aW9uKTtcclxuXHJcbmJsb2NrUGFnaW5hdGlvbi5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0bGV0IHB1bmt0UGFnaW5hdGlvblRhcmdldCA9IGV2ZW50LnRhcmdldDsgIC8v0L3QsCDRh9C10Lwg0LHRi9C7INC/0YDQvtC40LfQstC10LTQtdC9INC60LvQuNC6XHJcblx0Y29uc29sZS5sb2coXCJwdW5rdFBhZ2luYXRpb25UYXJnZXRcIik7XHJcblx0Y29uc29sZS5sb2cocHVua3RQYWdpbmF0aW9uVGFyZ2V0KTtcclxuXHRsZXQgcGFyZW50UHVua3RUYXJnZXQgPSBwdW5rdFBhZ2luYXRpb25UYXJnZXQucGFyZW50RWxlbWVudDsgIC8v0YDQvtC00LjRgtC10LvRjCDRjdC70LXQvNC10L3RgtCwINC90LAg0LrQvtGC0L7RgNC+0Lwg0LrQu9C40LrQvdGD0LvQuFxyXG5cdGNvbnNvbGUubG9nKFwicGFyZW50UHVua3RUYXJnZXRcIik7XHJcblx0Y29uc29sZS5sb2cocGFyZW50UHVua3RUYXJnZXQpO1xyXG5cdGxldCBjaGlsZHJlblB1bmt0VGFyZ2V0ID0gcGFyZW50UHVua3RUYXJnZXQuY2hpbGRyZW47ICAgIC8v0LTQvtGH0LXRgNC90LjQtSDRjdC70LXQvNC10L3RgtGLINGA0L7QtNC40YLQtdC70Y8g0Y3Qu9C10LzQtdC90YLQsCDQvdCwINC60L7RgtC+0YDQvtC8INCx0YvQuyDQutC70LjQulxyXG5cdGNvbnNvbGUubG9nKFwiY2hpbGRyZW5QdW5rdFRhcmdldFwiKTtcclxuXHRjb25zb2xlLmxvZyhjaGlsZHJlblB1bmt0VGFyZ2V0KTtcclxuXHRsZXQgbGVuZ2h0Q2hpbGRyZW5QdW5rdFRhcmdldCA9IGNoaWxkcmVuUHVua3RUYXJnZXQubGVuZ3RoOyAgLy/QutC+0LvQuNGH0LXRgdGC0LLQviDRj9GH0LXQtdC6INCyINC80LDRgdGB0LjQstC1XHJcblx0Y29uc29sZS5sb2cobGVuZ2h0Q2hpbGRyZW5QdW5rdFRhcmdldCk7XHJcblx0Ly8g0L7QsdGA0LDQsdC+0YLQutCwINC80LDRgdGB0LjQstCwINGBINGD0LTQsNC70LXQvdC40LXQvCDRgdCy0L7QudGB0YLQslxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5QdW5rdFRhcmdldC5sZW5ndGg7IGkrKykge1xyXG5cdFx0bGV0IHB1bmt0Q2hpbGRyZW5QYWdpbmF0aW9uID0gY2hpbGRyZW5QdW5rdFRhcmdldFtpXTtcclxuXHRcdHB1bmt0Q2hpbGRyZW5QYWdpbmF0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ3BhZ2luYXRpb24taHJlZl9wdW5rdC1hY3RpdmUnKTsgIC8v0YPQtNCw0LvQtdC90LjQtSDRgdCy0L7QudGB0YLQsiDQsNC60YLQuNCy0L3QvtCz0L4g0LLQuNC00LBcclxuXHR9XHJcblx0cHVua3RQYWdpbmF0aW9uVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3BhZ2luYXRpb24taHJlZl9wdW5rdC1hY3RpdmUnKTsgLy/QtNC+0LHQsNCy0LvQtdC90LjQtSDRgdCy0L7QudGB0YLQsiDQsNC60YLQuNCy0L3QvtCz0L4g0LLQuNC00LBcclxufTtcclxuXHJcbiIsIlxyXG4vL9GC0LjQvyDQuCDQutC+0LvQu9C40YfQtdGB0YLQstC+INCz0L7RgdGC0LXQuVxyXG5sZXQgdmlzaXRvckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXZpc2l0b3ItYnV0dG9uJyk7XHJcbmxldCB2aXNpdG9ySW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS12aXNpdG9yLWlucHV0Jyk7ICAvL9C/0L7Qu9C1INCy0YvQstC+0LTQsCDQutC+0LvQu9C40YfQtdGB0YLQstCwINCz0L7RgdGC0LXQuVxyXG5sZXQgdmlzaXRvckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS12aXNpdG9yJyk7XHJcbmxldCB2aXNpdG9yRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLXZpc2l0b3InKTtcclxubGV0IHZpc2l0b3JCdG5TYXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtaW5wdXQtbWVudV9zYXZlJyk7XHJcbmxldCB2aXNpdG9yQnRuQ2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1pbnB1dC1tZW51X2NsZWFyJyk7XHJcbi8v0YDQsNGB0YfQtdGCINCz0L7RgdGC0LXQuVxyXG4vL9Cy0LfRgNC+0YHQu9GL0LVcclxubGV0IGJpZ1NlbGVjdE1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJpZy1zZWxlY3Qtc21hbGwnKTtcclxubGV0IGJpZ1NlbGVjdE1heCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJpZy1zZWxlY3QtbW9yZScpO1xyXG5sZXQgYmlnU2VsZWN0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmlnLXNlbGVjdC1yZXN1bHQnKTsgICAvL9GB0LrQvtC70YzQutC+INCy0LfRgNC+0YHQu9GL0YVcclxuLy/QtNC10YLQuFxyXG5sZXQgY2hpbGRTZWxlY3RNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1jaGlsZHJlbi1zZWxlY3Qtc21hbGwnKTtcclxubGV0IGNoaWxkU2VsZWN0TWF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtY2hpbGRyZW4tc2VsZWN0LW1vcmUnKTtcclxubGV0IGNoaWxkU2VsZWN0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtY2hpbGRyZW4tc2VsZWN0LXJlc3VsdCcpOyAgLy/RgdC60L7Qu9GM0LrQviDQtNC10YLQtdC5XHJcbi8v0LzQu9Cw0LTQtdC90YbRi1xyXG5sZXQgYmFiaVNlbGVjdE1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJhYmllcy1zZWxlY3Qtc21hbGwnKTtcclxubGV0IGJhYmlTZWxlY3RNYXggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iYWJpZXMtc2VsZWN0LW1vcmUnKTtcclxubGV0IGJhYmlTZWxlY3RSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iYWJpZXMtc2VsZWN0LXJlc3VsdCcpOyAgIC8v0YHQutC+0LvRjNC60L4g0LzQu9Cw0LTQtdC90YbQtdCyXHJcblxyXG5cclxuY29uc29sZS5sb2codmlzaXRvckJ0bik7XHJcbmNvbnNvbGUubG9nKHZpc2l0b3JJbnB1dCk7XHJcbmNvbnNvbGUubG9nKHZpc2l0b3JGb3JtKTtcclxuY29uc29sZS5sb2codmlzaXRvckRyb3ApO1xyXG5cclxuY29uc29sZS5sb2coYmlnU2VsZWN0TWluKTtcclxuY29uc29sZS5sb2coYmlnU2VsZWN0TWF4KTtcclxuY29uc29sZS5sb2coYmlnU2VsZWN0UmVzdWx0KTtcclxuY29uc29sZS5sb2coYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuY29uc29sZS5sb2coYmlnU2VsZWN0UmVzdWx0LnZhbHVlKTtcclxuXHJcbmNvbnNvbGUubG9nKGNoaWxkU2VsZWN0TWluKTtcclxuY29uc29sZS5sb2coY2hpbGRTZWxlY3RNYXgpO1xyXG5jb25zb2xlLmxvZyhjaGlsZFNlbGVjdFJlc3VsdCk7XHJcbmNvbnNvbGUubG9nKGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuY29uc29sZS5sb2coY2hpbGRTZWxlY3RSZXN1bHQudmFsdWUpO1xyXG5cclxuY29uc29sZS5sb2coYmFiaVNlbGVjdE1pbik7XHJcbmNvbnNvbGUubG9nKGJhYmlTZWxlY3RNYXgpO1xyXG5jb25zb2xlLmxvZyhiYWJpU2VsZWN0UmVzdWx0KTtcclxuY29uc29sZS5sb2coYmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcbmNvbnNvbGUubG9nKGJhYmlTZWxlY3RSZXN1bHQudmFsdWUpO1xyXG5cclxudmlzaXRvcklucHV0LnZhbHVlID0gJ9Ch0LrQvtC70YzQutC+INCz0L7RgdGC0LXQuSc7XHJcbi8vLS0tLdC/0YDQvtC/0LjRgdCw0YLRjCDQsNC60YLQuNCy0LDRhtC40Y4g0LrQvdC+0L/QvtC6INC/0YDQuCDQt9C90LDRh9C10L3QuNC4INCx0L7Qu9C10LUgMFxyXG5mdW5jdGlvbiB2aXNpdG9ySG92ZXJCaWcobmFtQmlnSG92ZXIpIHtcclxuXHRpZiAobmFtQmlnSG92ZXIgPj0gMSkge1xyXG5cdFx0YmlnU2VsZWN0TWluLmNsYXNzTGlzdC5hZGQoJ2Ryb3Atc2VsZWN0X3NtYWxsLWhvdmVyJyk7XHJcblx0XHRjb25zb2xlLmxvZyhuYW1CaWdIb3Zlcik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGJpZ1NlbGVjdE1pbi5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdFx0Y29uc29sZS5sb2cobmFtQmlnSG92ZXIpO1xyXG5cdH1cclxufVxyXG5mdW5jdGlvbiB2aXNpdG9ySG92ZXJDaGlsZChuYW1DaGlsZEhvdmVyKSB7XHJcblx0aWYgKG5hbUNoaWxkSG92ZXIgPj0gMSkge1xyXG5cdFx0Y2hpbGRTZWxlY3RNaW4uY2xhc3NMaXN0LmFkZCgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y2hpbGRTZWxlY3RNaW4uY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gdmlzaXRvckhvdmVyQmFiaShuYW1CYWJpSG92ZXIpIHtcclxuXHRpZiAobmFtQmFiaUhvdmVyID49IDEpIHtcclxuXHRcdGJhYmlTZWxlY3RNaW4uY2xhc3NMaXN0LmFkZCgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YmFiaVNlbGVjdE1pbi5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdH1cclxufVxyXG5cclxuLy8tLS0tLdGB0YPQvNC80LjRgNC+0LLQsNC90LjQtSDQs9C+0YHRgtC10Lkg0L3QtdGCINGB0LzRi9GB0LvQsC0tLS0tLS0tLS0tLy9cclxuLy9mdW5jdGlvbiB2aXNpdG9yU3VtbShiaWdOYW0sIGNoaWxkTmFtLCBiYWJpTmFtKSB7XHJcbi8vXHRjb25zb2xlLmxvZyhOdW1iZXIucGFyc2VJbnQoYmlnTmFtKSk7XHJcbi8vXHRjb25zb2xlLmxvZyhOdW1iZXIucGFyc2VJbnQoY2hpbGROYW0pKTtcclxuLy9cdGNvbnNvbGUubG9nKE51bWJlci5wYXJzZUludChiYWJpTmFtKSk7XHJcbi8vXHRsZXQgZnVsbFN1bW0gPSBiaWdOYW0gKyBjaGlsZE5hbSArIGJhYmlOYW07XHJcbi8vXHRjb25zb2xlLmxvZyhmdWxsU3VtbSk7XHJcbi8vXHR2aXNpdG9yU3VtbVRleHQoZnVsbFN1bW0pO1xyXG4vL1x0dmlzaXRvckhvdmVyKGJpZ05hbSwgY2hpbGROYW0sIGJhYmlOYW0pO1xyXG4vL31cclxuXHJcbi8vLS0tLS3RgNCw0LfQstCw0YDQvtGCINGB0L/QuNGB0LrQsCDQstGL0LHQvtGA0LrQuC0tLS0tLS8vXHJcbnZpc2l0b3JCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0Ly9sZXQgdmlzaXRvckRyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC12aXNpdG9yJyk7XHJcblx0Y29uc29sZS5sb2coJ3Zpc2l0b3JEcm9wJyk7XHJcblx0Y29uc29sZS5sb2codmlzaXRvckRyb3ApO1xyXG5cdC8vdmlzaXRvckRyb3Auc3R5bGUuZGlzcGxheSA9ICdkaXNwbGF5JztcclxuXHQvL3Zpc2l0b3JEcm9wLmNsYXNzTGlzdC5hZGQoJ2Ryb3AtdmlzaXRvcl9kaXNwbGF5Jyk7XHJcblx0dmlzaXRvckRyb3AuY2xhc3NMaXN0LnRvZ2dsZSgnZHJvcC12aXNpdG9yX2Rpc3BsYXknKTtcclxuXHR2aXNpdG9ySW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybS12aXNpdG9yLWlucHV0X2JvcmRlcicpO1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0t0LLRi9Cx0L7RgNC60LAg0LrQvtC70LjRh9C10YHRgtCyINCz0L7RgdGC0LXQuS0tLS0tLS8vXHJcbi8vLS0tLS3QstC30YDQvtGB0LvRi9C1LS0tLS8vXHJcbmJpZ1NlbGVjdE1pbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID49IDEpIHtcclxuXHRcdGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpIC0gMTtcclxuXHRcdGNvbnNvbGUubG9nKGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHQvL2J0bkNsZWFyVmlzaXRvcigpO1xyXG5cdFx0dmlzaXRvckhvdmVyQmlnKE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdC8vdmlzaXRvclN1bW0oTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCksIDAsIDApO1xyXG5cdFx0Ly92aXNpdG9yU3VtbVRleHQoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0dmlzaXRvclN1bW1UZXh0KCk7XHJcblx0XHQvL9C90LAg0YHRg9C80LzRgyAxINCw0YDQs9GD0LzQtdC90YIsINGC0LDQutC20LUg0YHRjtC00LAg0LLRgdGC0LDQstC70Y/QtdC8INGF0L7QstC10YBcclxuXHR9XHJcbn0pO1xyXG5iaWdTZWxlY3RNYXguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCAhPSAtMSkge1xyXG5cdFx0YmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgKyAxO1xyXG5cdFx0Y29uc29sZS5sb2coYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdC8vYnRuQ2xlYXJWaXNpdG9yKCk7XHJcblx0XHR2aXNpdG9ySG92ZXJCaWcoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0Ly92aXNpdG9yU3VtbShOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSwgMCwgMCk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tVGV4dChOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHR2aXNpdG9yU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG4vLy0tLS0t0LTQtdGC0LgtLS0tLy9cclxuY2hpbGRTZWxlY3RNaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID49IDEpIHtcclxuXHRcdGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSAtIDE7XHJcblx0XHRjb25zb2xlLmxvZyhjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHQvL2J0bkNsZWFyVmlzaXRvcigpO1xyXG5cdFx0dmlzaXRvckhvdmVyQ2hpbGQoTnVtYmVyLnBhcnNlSW50KGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tKDAsIE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCksIDApO1xyXG5cdFx0Ly92aXNpdG9yU3VtbVRleHQoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0dmlzaXRvclN1bW1UZXh0KCk7XHJcblx0fVxyXG59KTtcclxuY2hpbGRTZWxlY3RNYXguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ICE9IC0xKSB7XHJcblx0XHRjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgKyAxO1xyXG5cdFx0Y29uc29sZS5sb2coY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdFx0Ly9idG5DbGVhclZpc2l0b3IoKTtcclxuXHRcdHZpc2l0b3JIb3ZlckNoaWxkKE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0Ly92aXNpdG9yU3VtbSgwLCBOdW1iZXIucGFyc2VJbnQoY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpLCAwKTtcclxuXHRcdC8vdmlzaXRvclN1bW1UZXh0KE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdHZpc2l0b3JTdW1tVGV4dCgpO1xyXG5cdH1cclxufSk7XHJcbi8vLS0tLS3QvNC70LDQtNC10L3RhtGLLS0tLS8vXHJcbmJhYmlTZWxlY3RNaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPj0gMSkge1xyXG5cdFx0YmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSAtIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdC8vYnRuQ2xlYXJWaXNpdG9yKCk7XHJcblx0XHR2aXNpdG9ySG92ZXJCYWJpKE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tKDAsIDAsIE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tVGV4dChOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHR2aXNpdG9yU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG5iYWJpU2VsZWN0TWF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ICE9IC0xKSB7XHJcblx0XHRiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgMTtcclxuXHRcdGNvbnNvbGUubG9nKGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdFx0Ly9idG5DbGVhclZpc2l0b3IoKTtcclxuXHRcdHZpc2l0b3JIb3ZlckJhYmkoTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdC8vdmlzaXRvclN1bW0oMCwgMCwgTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdC8vdmlzaXRvclN1bW1UZXh0KE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdHZpc2l0b3JTdW1tVGV4dCgpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLy8tLS0t0KTRg9C90LrRhtC40Y8g0YfQuNGB0LvQvtCy0YvRhSDRgdC60LvQvtC90LXQvdC40Lkg0LrQvtC70LjRh9C10YHRgtCy0LAg0LPQvtGB0YLQtdC5XHJcbmZ1bmN0aW9uIHZpc2l0b3JTdW1tVGV4dCgpIHtcclxuXHQvL2lwdXROYW0gPSBOdW1iZXIucGFyc2VJbnQoaXB1dE5hbSk7XHJcblx0bGV0IGlucHV0TnVtID0gTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgKyBOdW1iZXIucGFyc2VJbnQoY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdGNvbnNvbGUubG9nKCdpbnB1dE51bScpO1xyXG5cdGNvbnNvbGUubG9nKGlucHV0TnVtKTtcclxuXHRidG5DbGVhclZpc2l0b3IoaW5wdXROdW0pO1xyXG5cdC8vZnVsbFN1bW0gPSBOdW1iZXIoZnVsbFN1bW0pO1xyXG5cdGlmIChpbnB1dE51bSA9PSAwKSB7XHJcblx0XHQvL3Zpc2l0b3JJbnB1dC50ZXh0Q29udGVudCA9ICfQodC60L7Qu9GM0LrQviDQs9C+0YHRgtC10LknO1xyXG5cdFx0dmlzaXRvcklucHV0LnZhbHVlID0gJ9Ch0LrQvtC70YzQutC+INCz0L7RgdGC0LXQuSc7XHJcblx0fVxyXG5cdGlmICgoaW5wdXROdW0gPT0gMSkgfHwgKGlucHV0TnVtID09IDIxKSkge1xyXG5cdFx0Ly92aXNpdG9ySW5wdXQudGV4dENvbnRlbnQgPSBpcHV0TmFtICsgJyDQs9C+0YHRgtGMJztcclxuXHRcdHZpc2l0b3JJbnB1dC52YWx1ZSA9IGlucHV0TnVtICsgJyDQs9C+0YHRgtGMJztcclxuXHR9XHJcblx0aWYgKChpbnB1dE51bSA+IDEgJiYgaW5wdXROdW0gPCA1KSB8fCAoaW5wdXROdW0gPiAyMSAmJiBpbnB1dE51bSA8IDI1KSkge1xyXG5cdFx0Ly92aXNpdG9ySW5wdXQudGV4dENvbnRlbnQgPSBpcHV0TmFtICsgJyDQs9C+0YHRgtGPJztcclxuXHRcdHZpc2l0b3JJbnB1dC52YWx1ZSA9IGlucHV0TnVtICsgJyDQs9C+0YHRgtGPJztcclxuXHR9XHJcblx0aWYgKChpbnB1dE51bSA+IDQgJiYgaW5wdXROdW0gPCAyMSkgfHwgKGlucHV0TnVtID4gMjQgJiYgaW5wdXROdW0gPCAzMSkpIHtcclxuXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gaXB1dE5hbSArICcg0LPQvtGB0YLQtdC5JztcclxuXHRcdHZpc2l0b3JJbnB1dC52YWx1ZSA9IGlucHV0TnVtICsgJyDQs9C+0YHRgtC10LknO1xyXG5cdH1cclxuXHRpZiAoaW5wdXROdW0gPj0gMzEpIHtcclxuXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gJ9Ch0LvQuNGI0LrQvtC8INC80L3QvtCz0L4hJ1xyXG5cdFx0dmlzaXRvcklucHV0LnZhbHVlID0gJ9Ch0LvQuNGI0LrQvtC8INC80L3QvtCz0L4hJ1xyXG5cdH1cclxuXHJcblx0Ly92aXNpdG9ySW5wdXQudGV4dENvbnRlbnRcclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLdCy0YHQv9C70YvRgtC40LUg0Lgg0L/RgNC+0LLQtdGA0LrQsCDQutC90L7Qv9C60Lgg0L7Rh9C40YHRgtC40YLRjC0tLS0tLS0tLS8vXHJcbnZpc2l0b3JCdG5DbGVhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHR2aXNpdG9ySW5wdXQudmFsdWUgPSAn0KHQutC+0LvRjNC60L4g0LPQvtGB0YLQtdC5JztcclxuXHRiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPSAwO1xyXG5cdGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gMDtcclxuXHRiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gMDtcclxuXHR2aXNpdG9ySG92ZXJCaWcoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdHZpc2l0b3JIb3ZlckNoaWxkKE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdHZpc2l0b3JIb3ZlckJhYmkoTnVtYmVyLnBhcnNlSW50KGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHQvL3Zpc2l0b3JEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3AtdmlzaXRvcl9kaXNwbGF5Jyk7XHJcblx0Ly92aXNpdG9ySW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybS12aXNpdG9yLWlucHV0X2JvcmRlcicpO1xyXG5cdGJ0bkNsZWFyVmlzaXRvcigwKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBidG5DbGVhclZpc2l0b3IobnVtQ2xlYXIpIHtcclxuXHRsZXQgZHJvcElucHV0TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWlucHV0X3Byb3BzJyk7XHJcblx0aWYgKG51bUNsZWFyID4gMCkge1xyXG5cdFx0dmlzaXRvckJ0bkNsZWFyLmNsYXNzTGlzdC5hZGQoJ2Ryb3AtaW5wdXQtbWVudV9jbGVhci1kaXNwbGF5Jyk7XHJcblx0XHRkcm9wSW5wdXRNZW51LmNsYXNzTGlzdC5hZGQoJ2Ryb3AtaW5wdXRfZmxleCcpO1xyXG5cdH1cclxuXHRpZiAobnVtQ2xlYXIgPD0gMCkge1xyXG5cdFx0dmlzaXRvckJ0bkNsZWFyLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtaW5wdXQtbWVudV9jbGVhci1kaXNwbGF5Jyk7XHJcblx0XHRkcm9wSW5wdXRNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtaW5wdXRfZmxleCcpO1xyXG5cdH1cclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLdC60L3QvtC/0LrQsCDQv9GA0LjQvNC10L3QuNGC0YwtLS0tLS0tLS0vL1xyXG52aXNpdG9yQnRuU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHR2aXNpdG9yRHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdkcm9wLXZpc2l0b3JfZGlzcGxheScpO1xyXG5cdHZpc2l0b3JJbnB1dC5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtLXZpc2l0b3ItaW5wdXRfYm9yZGVyJyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuIiwiXHJcbi8v0L/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LUg0YEg0L/RgNC10LTRi9C00YPRidC10Lkg0YHRgtGA0LDQvdC40YbRi1xyXG4vL2xldCBkYXRlU2VhcmNoID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oZGF0ZUluKSArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGRhdGVPdXQpO1xyXG5cclxuLy9jb25zb2xlLmxvZyhkYXRlU2VhcmNoKTtcclxuXHJcbi8vbGV0IGZvcm1WaXNpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tdmlzaXRvcicpO1xyXG4vL2NvbnNvbGUubG9nKGZvcm1WaXNpdG9yKTtcclxuLy9sZXQgYmFzaWtBbWVuaXRpZXNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hbWVuaXRpZXMtYnV0dG9uJyk7ICAgLy/QutC90L7Qv9C60LAg0YDQsNC30LLQvtGA0L7RgtCwINC+0YHQvdC+0LLQvdGL0YUg0YPQtNC+0LHRgdGC0LJcclxuLy9jb25zb2xlLmxvZyhiYXNpa0FtZW5pdGllc0J0bik7XHJcbi8vbGV0IGJhc2lrQW1lbml0aWVzSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hbWVuaXRpZXMtaW5wdXQnKTsgICAvL9C/0L7Qu9C1INCy0LLQvtC00LAg0LrQvtC70LjRh9C10YHRgtCy0LAg0YPQtNC+0LHRgdGC0LJcclxuLy9jb25zb2xlLmxvZyhiYXNpa0FtZW5pdGllc0lucHV0KTtcclxuLy9sZXQgYmFzaWtBbWVuaXRpZXNEcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYW1lbml0aWVzJyk7ICAgLy/Qv9C+0LvQtSDQstCy0L7QtNCwINC60L7Qu9C40YfQtdGB0YLQstCwINGD0LTQvtCx0YHRgtCyXHJcbi8vY29uc29sZS5sb2coYmFzaWtBbWVuaXRpZXNEcm9wKTtcclxuLy9mb3JtVmlzaXRvci5zdHlsZS53aWR0aD1cIjI2NnB4XCI7XHJcblxyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vL2Jhc2lrQW1lbml0aWVzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdC8vbGV0IHZpc2l0b3JEcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtdmlzaXRvcicpO1xyXG5cdC8vY29uc29sZS5sb2coJ3Zpc2l0b3JEcm9wJyk7XHJcblx0Ly9jb25zb2xlLmxvZyh2aXNpdG9yRHJvcCk7XHJcblx0Ly92aXNpdG9yRHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Rpc3BsYXknO1xyXG5cdC8vdmlzaXRvckRyb3AuY2xhc3NMaXN0LmFkZCgnZHJvcC12aXNpdG9yX2Rpc3BsYXknKTtcclxuLy9cdHZpc2l0b3JEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3AtdmlzaXRvcl9kaXNwbGF5Jyk7XHJcbi8vXHR2aXNpdG9ySW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybS12aXNpdG9yLWlucHV0X2JvcmRlcicpO1xyXG4vL30pO1xyXG5cclxuLy9mb3JtVmlzaXRvci5yZW1vdmVBdHRyaWJ1dGUoJ3dpZHRoJyk7XHJcbi8vZm9ybVZpc2l0b3Iuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcyNjZweCcpO1xyXG5cclxuIiwiLy/RjdGC0L4g0YDQsNCx0L7RgtCw0LXRgiDQtNC70Y8g0LLRgdC10LPQviDQsdC70L7QutCwINC90LDQudC00LXQvdC90L7Qs9C+XHJcbmxldCBibG9ja1NlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHQtc2VhcmNoJyk7XHJcblxyXG5jb25zb2xlLmxvZyhibG9ja1NlYXJjaCk7XHJcblxyXG5ibG9ja1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG5cdGNvbnNvbGUubG9nKCfQv9C+0L/QsNC7INCyINGE0L7QutGD0YEnKTtcclxuXHRsZXQgYmxvY2tTZWFyY2hUYXJnZXQgPSBldmVudC50YXJnZXQ7ICAvL9C90LAg0YfRgtC+INC90LDQstC10LvQuFxyXG5cdGNvbnNvbGUubG9nKCfQvdCwINGH0YLQviDQvdCw0LLQtdC70LgnKTtcclxuXHRjb25zb2xlLmxvZyhibG9ja1NlYXJjaFRhcmdldCk7XHJcbn0pO1xyXG5ibG9ja1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc29sZS5sb2coJ9C/0L7Qv9Cw0Lsg0LIg0YTQvtC60YPRgScpO1xyXG5cclxuXHRsZXQgYmxvY2tTZWFyY2hUYXJnZXQgPSBldmVudC50YXJnZXQ7ICAvL9C90LAg0YfRgtC+INC90LDQstC10LvQuFxyXG5cdGNvbnNvbGUubG9nKCfQvdCwINGH0YLQviDQvdCw0LLQtdC70LggbW91c2VvdmVyJyk7XHJcblx0Y29uc29sZS5sb2coYmxvY2tTZWFyY2hUYXJnZXQpO1xyXG5cdGNvbnNvbGUubG9nKCfQotCt0JMg0L3QsCDRh9GC0L4g0L3QsNCy0LXQu9C4IG1vdXNlb3ZlcicpO1xyXG5cdGNvbnNvbGUubG9nKGJsb2NrU2VhcmNoVGFyZ2V0LnRhZ05hbWUpO1xyXG5cdGlmIChibG9ja1NlYXJjaFRhcmdldC50YWdOYW1lID09ICdJTUcnKSB7XHJcblx0XHRsZXQgYmxvY2tTZWFyY2hUYXJnZXRQYXJlbnQgPSBibG9ja1NlYXJjaFRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0Y29uc29sZS5sb2coJ9GA0L7QtNC40YLQtdC70YwgbW91c2VvdmVyJyk7XHJcblx0XHRjb25zb2xlLmxvZyhibG9ja1NlYXJjaFRhcmdldFBhcmVudCk7XHJcblx0XHRsZXQgYmxvY2tTZWFyY2hUYXJnZXRQYXJlbnRQYXJlbnQgPSBibG9ja1NlYXJjaFRhcmdldFBhcmVudC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0Y29uc29sZS5sb2coJ9GA0L7QtNC40YLQtdC70Ywg0YDQvtC00LjRgtC10LvRjyBtb3VzZW92ZXInKTtcclxuXHRcdGNvbnNvbGUubG9nKGJsb2NrU2VhcmNoVGFyZ2V0UGFyZW50UGFyZW50KTtcclxuXHRcdGxldCBibG9ja1NlYXJjaFRhcmdldFBhcmVudFBhcmVudEhyZWYgPSBibG9ja1NlYXJjaFRhcmdldFBhcmVudFBhcmVudC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0Y29uc29sZS5sb2coJ9GA0L7QtNC40YLQtdC70Ywg0YDQvtC00LjRgtC10LvRjyDRgdGB0YvQu9C60LAgbW91c2VvdmVyJyk7XHJcblx0XHRjb25zb2xlLmxvZyhibG9ja1NlYXJjaFRhcmdldFBhcmVudFBhcmVudEhyZWYpO1xyXG5cdFx0bGV0IGJsb2NrU2VhcmNoVGFyZ2V0SHJlZlBhcmVudCA9IGJsb2NrU2VhcmNoVGFyZ2V0UGFyZW50UGFyZW50SHJlZi5wYXJlbnRFbGVtZW50O1xyXG5cdFx0Y29uc29sZS5sb2coJ9GA0L7QtNC40YLQtdC70Ywg0YDQvtC00LjRgtC10LvRjyDRgdGB0YvQu9C60LAgbW91c2VvdmVyJyk7XHJcblx0XHRjb25zb2xlLmxvZyhibG9ja1NlYXJjaFRhcmdldEhyZWZQYXJlbnQpO1xyXG5cdFx0bGV0IGJsb2NrU2VhcmNoVGFyZ2V0SHJlZkNoaWxkcmVuID0gYmxvY2tTZWFyY2hUYXJnZXRIcmVmUGFyZW50LmNoaWxkcmVuO1xyXG5cdFx0Y29uc29sZS5sb2coJ9C00LXRgtC4INGB0YHRi9C70LrQuCBtb3VzZW92ZXInKTtcclxuXHRcdGNvbnNvbGUubG9nKGJsb2NrU2VhcmNoVGFyZ2V0SHJlZkNoaWxkcmVuKTtcclxuXHRcdGJsb2NrU2VhcmNoVGFyZ2V0SHJlZkNoaWxkcmVuWzFdLmNsYXNzTGlzdC5hZGQoJ3Jlc3VsdC1taW5pLXRvcF9iYWNrLWJhY2tncm9uZC1kaXNwbGF5Jyk7XHJcblx0XHRibG9ja1NlYXJjaFRhcmdldEhyZWZDaGlsZHJlblsyXS5jbGFzc0xpc3QuYWRkKCdyZXN1bHQtbWluaS10b3BfbmV4dC1iYWNrZ3JvbmQtZGlzcGxheScpO1xyXG4vL9GB0Y7QtNCwINCy0YHRg9C90YPRgtGMINC80L7QtNGD0LvRjCDQvdCwINC+0L/RgNC10LTQtdC70LXQvdC40LUg0LrQsNC60L7QuSDRgdC70LDQudC0INCy0YvQstC+0LTQuNGC0YzRgdGPINC90LAg0LTQuNGB0L/Qu9C10LlcclxuXHRcdGxldCBibG9ja1NlYXJjaFRhcmdldENoaWxkcmVuID0gYmxvY2tTZWFyY2hUYXJnZXRQYXJlbnRQYXJlbnQuY2hpbGRyZW47IC8v0LTQtdGC0Lgg0YHQu9Cw0LnQtNC10YDRi1xyXG5cdFx0bGV0IG51bWJlclNsaWRlQWN0aXZlOyAgIC8vINC90L7QvNC10YAg0YHQu9Cw0LnQtNC10YDQsFxyXG5cdFx0Y29uc29sZS5sb2coJ9C00LXRgtC4INGB0LvQsNC50LTQtdGA0LAnKTtcclxuXHRcdGNvbnNvbGUubG9nKGJsb2NrU2VhcmNoVGFyZ2V0Q2hpbGRyZW4pO1xyXG5cdFx0Ly/Qv9C10YDQtdCx0L7RgCDQvNCw0YHRgdC40LLQsFxyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBibG9ja1NlYXJjaFRhcmdldENoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdC8v0YPRgdC70L7QstC40LUg0L/QvtC40YHQutCwINGB0LLQvtC50YHRgtCy0LBcclxuXHRcdFx0Y29uc29sZS5sb2coJ2Jsb2NrU2VhcmNoVGFyZ2V0Q2hpbGRyZW5baV0nKTtcclxuXHRcdFx0Y29uc29sZS5sb2coYmxvY2tTZWFyY2hUYXJnZXRDaGlsZHJlbltpXSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdibG9ja1NlYXJjaFRhcmdldENoaWxkcmVuW2ldLmNsYXNzTmFtZScpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhibG9ja1NlYXJjaFRhcmdldENoaWxkcmVuW2ldLmNsYXNzTmFtZSk7XHJcblx0XHRcdGlmIChibG9ja1NlYXJjaFRhcmdldENoaWxkcmVuW2ldLmNsYXNzTmFtZSA9PSAncmVzdWx0LXNsaWRlci1pbWcgcmVzdWx0LXNsaWRlci1pbWdfZGlzcGxheScpIHtcclxuXHRcdFx0XHRudW1iZXJTbGlkZUFjdGl2ZSA9IGk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ9C90L7QvNC10YAg0YHQu9Cw0LnQtNCwINCyINC80LDRgdGB0LjQstC1Jyk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2cobnVtYmVyU2xpZGVBY3RpdmUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cnVuU2xpZGVyKGJsb2NrU2VhcmNoVGFyZ2V0SHJlZkNoaWxkcmVuWzFdLCBibG9ja1NlYXJjaFRhcmdldEhyZWZDaGlsZHJlblsyXSwgYmxvY2tTZWFyY2hUYXJnZXRQYXJlbnRQYXJlbnQsIGJsb2NrU2VhcmNoVGFyZ2V0SHJlZkNoaWxkcmVuWzNdLCBudW1iZXJTbGlkZUFjdGl2ZSlcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc29sZS5sb2coJ9Ci0K3QkyDQvdC1INC90LDQudC00LXQvScpO1xyXG5cdH1cclxufSk7XHJcblxyXG5ibG9ja1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG5cdGNvbnNvbGUubG9nKCfQstGL0YjQtdC7INC40Lcg0YTQvtC60YPRgdCwJyk7XHJcblx0bGV0IGJsb2NrU2VhcmNoVGFyZ2V0ID0gZXZlbnQudGFyZ2V0OyAgLy/QvdCwINGH0YLQviDQvdCw0LLQtdC70LhcclxuXHRjb25zb2xlLmxvZygn0YfRgtC+INC/0L7QutC40L3Rg9C70LgnKTtcclxuXHRjb25zb2xlLmxvZyhibG9ja1NlYXJjaFRhcmdldCk7XHJcbn0pO1xyXG5ibG9ja1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcclxuXHRjb25zb2xlLmxvZygn0L/QvtC/0LDQuyDQsiDRhNC+0LrRg9GBJyk7XHJcblxyXG5cdGxldCBibG9ja1NlYXJjaFRhcmdldCA9IGV2ZW50LnRhcmdldDsgIC8v0L3QsCDRh9GC0L4g0L3QsNCy0LXQu9C4XHJcblx0Y29uc29sZS5sb2coJ9C90LAg0YfRgtC+INC90LDQstC10LvQuCBtb3VzZW92ZXInKTtcclxuXHRjb25zb2xlLmxvZyhibG9ja1NlYXJjaFRhcmdldCk7XHJcblx0Y29uc29sZS5sb2coJ9Ci0K3QkyDQvdCwINGH0YLQviDQvdCw0LLQtdC70LggbW91c2VvdmVyJyk7XHJcblx0Y29uc29sZS5sb2coYmxvY2tTZWFyY2hUYXJnZXQudGFnTmFtZSk7XHJcblx0aWYgKGJsb2NrU2VhcmNoVGFyZ2V0LnRhZ05hbWUgPT0gJ0lNRycpIHtcclxuXHRcdGxldCBibG9ja1NlYXJjaFRhcmdldFBhcmVudCA9IGJsb2NrU2VhcmNoVGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcblx0XHRjb25zb2xlLmxvZygn0YDQvtC00LjRgtC10LvRjCBtb3VzZW92ZXInKTtcclxuXHRcdGNvbnNvbGUubG9nKGJsb2NrU2VhcmNoVGFyZ2V0UGFyZW50KTtcclxuXHRcdGxldCBibG9ja1NlYXJjaFRhcmdldFBhcmVudFBhcmVudCA9IGJsb2NrU2VhcmNoVGFyZ2V0UGFyZW50LnBhcmVudEVsZW1lbnQ7XHJcblx0XHRjb25zb2xlLmxvZygn0YDQvtC00LjRgtC10LvRjCDRgNC+0LTQuNGC0LXQu9GPIG1vdXNlb3ZlcicpO1xyXG5cdFx0Y29uc29sZS5sb2coYmxvY2tTZWFyY2hUYXJnZXRQYXJlbnRQYXJlbnQpO1xyXG5cdFx0bGV0IGJsb2NrU2VhcmNoVGFyZ2V0UGFyZW50UGFyZW50SHJlZiA9IGJsb2NrU2VhcmNoVGFyZ2V0UGFyZW50UGFyZW50LnBhcmVudEVsZW1lbnQ7XHJcblx0XHRjb25zb2xlLmxvZygn0YDQvtC00LjRgtC10LvRjCDRgNC+0LTQuNGC0LXQu9GPINGB0YHRi9C70LrQsCBtb3VzZW92ZXInKTtcclxuXHRcdGNvbnNvbGUubG9nKGJsb2NrU2VhcmNoVGFyZ2V0UGFyZW50UGFyZW50SHJlZik7XHJcblx0XHRsZXQgYmxvY2tTZWFyY2hUYXJnZXRIcmVmUGFyZW50ID0gYmxvY2tTZWFyY2hUYXJnZXRQYXJlbnRQYXJlbnRIcmVmLnBhcmVudEVsZW1lbnQ7XHJcblx0XHRjb25zb2xlLmxvZygn0YDQvtC00LjRgtC10LvRjCDRgNC+0LTQuNGC0LXQu9GPINGB0YHRi9C70LrQsCBtb3VzZW92ZXInKTtcclxuXHRcdGNvbnNvbGUubG9nKGJsb2NrU2VhcmNoVGFyZ2V0SHJlZlBhcmVudCk7XHJcblx0XHRsZXQgYmxvY2tTZWFyY2hUYXJnZXRIcmVmQ2hpbGRyZW4gPSBibG9ja1NlYXJjaFRhcmdldEhyZWZQYXJlbnQuY2hpbGRyZW47XHJcblx0XHRjb25zb2xlLmxvZygn0LTQtdGC0Lgg0YHRgdGL0LvQutC4IG1vdXNlb3ZlcicpO1xyXG5cdFx0Y29uc29sZS5sb2coYmxvY2tTZWFyY2hUYXJnZXRIcmVmQ2hpbGRyZW4pO1xyXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlQnV0dG9uKCkge1xyXG5cdFx0XHRibG9ja1NlYXJjaFRhcmdldEhyZWZDaGlsZHJlblsxXS5jbGFzc0xpc3QucmVtb3ZlKCdyZXN1bHQtbWluaS10b3BfYmFjay1iYWNrZ3JvbmQtZGlzcGxheScpO1xyXG5cdFx0XHRibG9ja1NlYXJjaFRhcmdldEhyZWZDaGlsZHJlblsyXS5jbGFzc0xpc3QucmVtb3ZlKCdyZXN1bHQtbWluaS10b3BfbmV4dC1iYWNrZ3JvbmQtZGlzcGxheScpO1xyXG5cdFx0XHRjb25zb2xlLmxvZygn0YPQtNCw0LvQtdC90LjQtSDQsdC+0LrQvtCy0YvRhSDQutC90L7Qv9C+0LonKTtcclxuXHRcdH1cclxuXHRcdHNldFRpbWVvdXQocmVtb3ZlQnV0dG9uLCAxMDAwKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc29sZS5sb2coJ9Ci0K3QkyDQvdC1INC90LDQudC00LXQvScpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vL3J1blNsaWRlcihibG9ja1NlYXJjaFRhcmdldEhyZWZDaGlsZHJlblsxXSwgYmxvY2tTZWFyY2hUYXJnZXRIcmVmQ2hpbGRyZW5bMl0sIGJsb2NrU2VhcmNoVGFyZ2V0UGFyZW50UGFyZW50LCBibG9ja1NlYXJjaFRhcmdldEhyZWZDaGlsZHJlblszXSk7XHJcblxyXG5mdW5jdGlvbiBydW5TbGlkZXIoYmFjaywgbmV4dCwgc2xpZGVyLCBtYXJrLCBub21TbGlkZSkge1xyXG5cdGxldCBzbGlkZUluZGV4ID0gbm9tU2xpZGU7XHJcblx0Y29uc29sZS5sb2coJ25vbVNsaWRlJyk7XHJcblx0Y29uc29sZS5sb2cobm9tU2xpZGUpO1xyXG5cclxuXHRzaG93U2xpZGVzKHNsaWRlSW5kZXgpO1xyXG5cdC8v0LrQvdC+0L/QutC4INC/0LXRgNC10YXQvtC00LBcclxuXHQvL9C90LDQt9Cw0LRcclxuXHQvL2xldCBidXR0b25CYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdC1taW5pLXRvcF9iYWNrLWJhY2tncm9uZCcpO1xyXG5cdGxldCBidXR0b25CYWNrID0gYmFjaztcclxuXHRjb25zb2xlLmxvZygnYnV0dG9uQmFjaycpO1xyXG5cdGNvbnNvbGUubG9nKGJ1dHRvbkJhY2spO1xyXG5cdC8v0LLQv9C10YDQtdC0XHJcblx0Ly9sZXQgYnV0dG9uTmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHQtbWluaS10b3BfbmV4dC1iYWNrZ3JvbmQnKTtcclxuXHRsZXQgYnV0dG9uTmV4dCA9IG5leHQ7XHJcblx0Y29uc29sZS5sb2coJ2J1dHRvbk5leHQnKTtcclxuXHRjb25zb2xlLmxvZyhidXR0b25OZXh0KTtcclxuXHJcbi8v0YLQvtGH0LrQuCDQtNC70Y8g0L/QtdGA0LXRhdC+0LTQsCDQvtGC0LrQu9GO0YfQtdC90YssINC40YHQv9C+0LvRjNC30YPRjtGC0YHRjyDQutCw0Log0LzQsNGA0LrQtdGA0YtcclxuXHJcbi8v0LrQu9C40LrQuCDQvdCwINC60L3QvtC/0LrQsNGFXHJcblx0YnV0dG9uQmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdG1pbnVzU2xpZGUoKTtcclxuXHR9KTtcclxuXHRidXR0b25OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0cGx1c1NsaWRlKCk7XHJcblx0fSk7XHJcblx0Lyog0JjQvdC00LXQutGBINGB0LvQsNC50LTQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiAqL1xyXG5cclxuXHJcblx0Lyog0KTRg9C90LrRhtC40Y8g0YPQstC10LvQuNGH0LjQstCw0LXRgiDQuNC90LTQtdC60YEg0L3QsCAxLCDQv9C+0LrQsNC30YvQstCw0LXRgiDRgdC70LXQtNGD0Y7RidC5INGB0LvQsNC50LQqL1xyXG5cdGZ1bmN0aW9uIHBsdXNTbGlkZSgpIHtcclxuXHRcdHNsaWRlSW5kZXggPVxyXG5cdFx0c2hvd1NsaWRlcyhzbGlkZUluZGV4ICs9IDEpO1xyXG5cdH1cclxuXHJcblx0Lyog0KTRg9C90LrRhtC40Y8g0YPQvNC10L3RjNGI0Y/QtdGCINC40L3QtNC10LrRgSDQvdCwIDEsINC/0L7QutCw0LfRi9Cy0LDQtdGCINC/0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LQqL1xyXG5cdGZ1bmN0aW9uIG1pbnVzU2xpZGUoKSB7XHJcblx0XHRzaG93U2xpZGVzKHNsaWRlSW5kZXggLT0gMSk7XHJcblx0fVxyXG5cclxuXHQvKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDRgtC10LrRg9GJ0LjQuSDRgdC70LDQudC0INC/0L4g0LrRgNGD0LPQu9C+0Lkg0LrQvdC+0L/QutC1Ki9cclxuXHQvL2Z1bmN0aW9uIGN1cnJlbnRTbGlkZShuKSB7XHJcblx0Ly9cdHNob3dTbGlkZXMoc2xpZGVJbmRleCA9IG4pO1xyXG5cdC8vfVxyXG5cclxuXHQvKiDQntGB0L3QvtCy0L3QsNGPINGE0YPQvdC60YbQuNGPINGB0LvQsNC50LTQtdGA0LAgKi9cclxuXHRmdW5jdGlvbiBzaG93U2xpZGVzKG4pIHtcclxuXHRcdGNvbnNvbGUubG9nKCduJyk7XHJcblx0XHRjb25zb2xlLmxvZyhuKTtcclxuXHRcdC8vbGV0IGk7XHJcblx0XHQvL2xldCBzbGlkZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmVzdWx0LXNsaWRlci1pbWdcIik7XHJcblx0XHRsZXQgc2xpZGVzID0gc2xpZGVyLmNoaWxkcmVuOyAgICAvL9C80LDRgdGB0LjQsiDRgdC70LDQudC00LXRgNC+0LJcclxuXHRcdGNvbnNvbGUubG9nKCdzbGlkZXMnKTtcclxuXHRcdGNvbnNvbGUubG9nKHNsaWRlcyk7XHJcblx0XHRjb25zb2xlLmxvZygnc2xpZGVzLmxlbmd0aCcpO1xyXG5cdFx0Y29uc29sZS5sb2coc2xpZGVzLmxlbmd0aCk7XHJcblx0XHQvL2xldCBkb3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlci1tYXJja19pdGVtXCIpO1xyXG5cdFx0bGV0IGRvdHMgPSBtYXJrLmNoaWxkcmVuOyAgICAgICAgLy/QvNCw0YHRgdC40LIg0YLQvtGH0LXQulxyXG5cdFx0Y29uc29sZS5sb2coJ2RvdHMnKTtcclxuXHRcdGNvbnNvbGUubG9nKGRvdHMpO1xyXG5cdFx0Ly/QtdGB0LvQuCDRg9Cy0LXQu9C40YfQuNC70Lgg0LLRi9GI0LUg0L/QvtGB0LvQtdC00L3QtdCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQvNCw0YHRgdC40LLQsFxyXG5cdFx0aWYgKG4gPiAoc2xpZGVzLmxlbmd0aCAtIDEpKSB7XHJcblx0XHRcdHNsaWRlSW5kZXggPSAwO1xyXG5cdFx0XHRjb25zb2xlLmxvZygnc2xpZGVJbmRleCcpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhzbGlkZUluZGV4KTtcclxuXHRcdFx0Ly9uID0gMFxyXG5cdFx0fVxyXG5cdFx0Ly/QtdGB0LvQuCDRg9C80LXQvdGM0YjQuNC70Lgg0L3QuNC20LUgMdCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQvNCw0YHRgdC40LLQsFxyXG5cdFx0aWYgKG4gPCAwKSB7XHJcblx0XHRcdHNsaWRlSW5kZXggPSBzbGlkZXMubGVuZ3RoIC0gMTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3NsaWRlSW5kZXgnKTtcclxuXHRcdFx0Y29uc29sZS5sb2coc2xpZGVJbmRleCk7XHJcblx0XHRcdC8vbiA9IHNsaWRlcy5sZW5ndGhcclxuXHRcdH1cclxuXHRcdC8vXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdC8vc2xpZGVzW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHRcdFx0c2xpZGVzW2ldLmNsYXNzTmFtZSA9IHNsaWRlc1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiByZXN1bHQtc2xpZGVyLWltZ19kaXNwbGF5XCIsIFwiXCIpO1xyXG5cdFx0fVxyXG5cdFx0Ly9cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBkb3RzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGRvdHNbaV0uY2xhc3NOYW1lID0gZG90c1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiBzbGlkZXItbWFyY2tfYWN0aXZlXCIsIFwiXCIpO1xyXG5cdFx0fVxyXG5cdFx0Y29uc29sZS5sb2coJ3NsaWRlSW5kZXgnKTtcclxuXHRcdGNvbnNvbGUubG9nKHNsaWRlSW5kZXgpO1xyXG5cdFx0Ly/QtNCy0LUg0L3QuNC20L3QuNC1INGB0YLRgNC+0LrQuCDQstGL0LfRi9Cy0LDRjtGCINC+0YjQuNCx0LrRg1xyXG5cdFx0Ly9zbGlkZXNbc2xpZGVJbmRleCAtIDFdLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblx0XHQvL3NsaWRlc1tuXS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG5cdFx0Ly9zbGlkZXNbbl0uY2xhc3NOYW1lICs9IFwiIHJlc3VsdC1zbGlkZXItaW1nX2Rpc3BsYXlcIjtcclxuXHRcdHNsaWRlc1tzbGlkZUluZGV4XS5jbGFzc05hbWUgKz0gXCIgcmVzdWx0LXNsaWRlci1pbWdfZGlzcGxheVwiO1xyXG5cdFx0Ly9kb3RzW3NsaWRlSW5kZXggLSAxXS5jbGFzc05hbWUgKz0gXCIgc2xpZGVyLW1hcmNrX2FjdGl2ZVwiO1xyXG5cdFx0Ly9kb3RzW25dLmNsYXNzTmFtZSArPSBcIiBzbGlkZXItbWFyY2tfYWN0aXZlXCI7XHJcblx0XHRkb3RzW3NsaWRlSW5kZXhdLmNsYXNzTmFtZSArPSBcIiBzbGlkZXItbWFyY2tfYWN0aXZlXCI7XHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcblxyXG4vL2xldCBibG9ja1Jlc3VsdFNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHQtc2VhcmNoJyk7XHJcbi8vY29uc29sZS5sb2coJ2Jsb2NrUmVzdWx0U2VhcmNoJyk7XHJcbi8vY29uc29sZS5sb2coYmxvY2tSZXN1bHRTZWFyY2gpO1xyXG4vL2xldCBibG9ja1NsaWRlciA9ICcnO1xyXG4vL2NvbnNvbGUubG9nKCdibG9ja1NsaWRlcicpO1xyXG4vL2NvbnNvbGUubG9nKGJsb2NrU2xpZGVyKTtcclxuXHJcbi8vYmxvY2tSZXN1bHRTZWFyY2gub25tb3VzZW92ZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG4vL1x0bGV0IGJsb2NrVGFyZ2V0ID0gZXZlbnQudGFyZ2V0OyAgLy9cclxuLy9cdGNvbnNvbGUubG9nKCdibG9ja1RhcmdldCA9IGV2ZW50LnRhcmdldCcpO1xyXG4vL1x0Y29uc29sZS5sb2coYmxvY2tUYXJnZXQpO1xyXG4vL1x0aWYgKGJsb2NrVGFyZ2V0LmNsYXNzTmFtZSA9ICdyZXN1bHQtbWluaS10b3BfZm9uJykge1xyXG4vL1x0XHQvL2xldCBibG9ja1NsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHQtbWluaS1zbGlkZXInKTtcclxuLy9cdFx0bGV0IGJsb2NrU2xpZGVyID0gYmxvY2tUYXJnZXQuY2hpbGRyZW47ICAgIC8v0LTQvtGH0LXRgNC90LjQtSDRjdC70LXQvNC10L3RgtGLINGA0L7QtNC40YLQtdC70Y8g0Y3Qu9C10LzQtdC90YLQsCDQvdCwINC60L7RgtC+0YDQvtC8INCx0YvQuyDQutC70LjQulxyXG4vL1x0XHRjb25zb2xlLmxvZyhcImJsb2NrU2xpZGVyXCIpO1xyXG4vL1x0XHRjb25zb2xlLmxvZyhibG9ja1NsaWRlcik7XHJcbi8vXHRcdGxldCBibG9ja1NsaWRlckxlbmd0aCA9IGJsb2NrU2xpZGVyLmxlbmd0aDsgIC8v0LrQvtC70LjRh9C10YHRgtCy0L4g0Y/Rh9C10LXQuiDQsiDQvNCw0YHRgdC40LLQtVxyXG4vL1x0XHRjb25zb2xlLmxvZyhibG9ja1NsaWRlckxlbmd0aCk7XHJcbi8vXHRcdGNvbnNvbGUubG9nKCdhZGQucmVzdWx0LW1pbmktc2xpZGVyJyk7XHJcbi8vXHRcdGNvbnNvbGUubG9nKGJsb2NrU2xpZGVyKTtcclxuLy9cdFx0YmxvY2tTbGlkZXJbMF0uY2xhc3NMaXN0LmFkZCgncmVzdWx0LW1pbmktc2xpZGVyX2Rpc3BsYXknKTtcclxuLy9cdFx0Y29uc29sZS5sb2coYmxvY2tTbGlkZXIpO1xyXG4vL1x0fVxyXG4vL307XHJcbi8vYmxvY2tSZXN1bHRTZWFyY2gub25tb3VzZW91dCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbi8vXHRibG9ja1NsaWRlciA9IGV2ZW50LnRhcmdldDsgIC8vXHJcbi8vXHRjb25zb2xlLmxvZygnYmxvY2tTbGlkZXIgPSBldmVudC50YXJnZXQnKTtcclxuLy9cdGNvbnNvbGUubG9nKGJsb2NrU2xpZGVyKTtcclxuLy9cdGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID0gJ3Jlc3VsdC1taW5pLXRvcF9mb24nKSB7XHJcbi8vXHRcdGxldCBibG9ja1NsaWRlciA9IGJsb2NrVGFyZ2V0LmNoaWxkcmVuOyAgICAvL9C00L7Rh9C10YDQvdC40LUg0Y3Qu9C10LzQtdC90YLRiyDRgNC+0LTQuNGC0LXQu9GPINGN0LvQtdC80LXQvdGC0LAg0L3QsCDQutC+0YLQvtGA0L7QvCDQsdGL0Lsg0LrQu9C40LpcclxuLy9cdFx0Y29uc29sZS5sb2coXCJibG9ja1NsaWRlclwiKTtcclxuLy9cdFx0Y29uc29sZS5sb2coYmxvY2tTbGlkZXIpO1xyXG4vL1x0XHRsZXQgYmxvY2tTbGlkZXJMZW5ndGggPSBibG9ja1NsaWRlci5sZW5ndGg7ICAvL9C60L7Qu9C40YfQtdGB0YLQstC+INGP0YfQtdC10Log0LIg0LzQsNGB0YHQuNCy0LVcclxuLy9cdFx0Y29uc29sZS5sb2coYmxvY2tTbGlkZXJMZW5ndGgpO1xyXG4vL1x0XHRjb25zb2xlLmxvZygnYWRkLnJlc3VsdC1taW5pLXNsaWRlcicpO1xyXG4vL1x0XHRjb25zb2xlLmxvZyhibG9ja1NsaWRlcik7XHJcbi8vXHRcdGJsb2NrU2xpZGVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc3VsdC1taW5pLXNsaWRlcl9kaXNwbGF5Jyk7XHJcbi8vXHRcdGNvbnNvbGUubG9nKGJsb2NrU2xpZGVyKTtcclxuLy9cdH1cclxuLy99O1xyXG5cclxuXHJcblxyXG5cclxuLy9sZXQgYmxvY2tSZXN1bHRTZWFyY2ggPSBibG9ja1RhcmdldDtcclxuLy9sZXQgYmxvY2tSZXN1bHRTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0LXNlYXJjaCcpO1xyXG4vL2xldCBibG9ja1NsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHQtbWluaS10b3BfZm9uJyk7XHJcbi8vbGV0IGJsb2NrUmVzdWx0U2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdC1taW5pLXRvcF9mb24nKTtcclxuLy9jb25zb2xlLmxvZygnYmxvY2tSZXN1bHRTZWFyY2gnKTtcclxuLy9jb25zb2xlLmxvZyhibG9ja1Jlc3VsdFNlYXJjaCk7XHJcblxyXG5cclxuXHJcbi8vYmxvY2tSZXN1bHRTZWFyY2gub25tb3VzZW92ZXIgPSBibG9ja1Jlc3VsdFNlYXJjaC5vbm1vdXNlb3V0ID0gaG92ZXJTbGlkZXI7XHJcblxyXG4vL2Z1bmN0aW9uIGhvdmVyU2xpZGVyKGV2ZW50KSB7XHJcbi8vXHRpZiAoZXZlbnQudHlwZSA9PSAnbW91c2VvdmVyJykge1xyXG4vL1x0XHRjb25zb2xlLmxvZygnZXZlbnQudGFyZ2V0LmNsYXNzTmFtZScpO1xyXG4vL1x0XHRjb25zb2xlLmxvZyhldmVudC50YXJnZXQuY2xhc3NOYW1lKTtcclxuLy9cdFx0aWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPSAncmVzdWx0LW1pbmktdG9wX2ZvbicpIHtcclxuLy9cdFx0XHRsZXQgYmxvY2tTbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0LW1pbmktc2xpZGVyJyk7XHJcbi8vXHRcdFx0Y29uc29sZS5sb2coJ2FkZC5yZXN1bHQtbWluaS1zbGlkZXInKTtcclxuLy9cdFx0XHRjb25zb2xlLmxvZyhibG9ja1NsaWRlcik7XHJcbi8vXHRcdFx0YmxvY2tTbGlkZXIuY2xhc3NMaXN0LmFkZCgncmVzdWx0LW1pbmktc2xpZGVyX2Rpc3BsYXknKTtcclxuLy9cdFx0fVxyXG4gLy8gICAgLy9ldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdwaW5rJ1xyXG4vL1x0fVxyXG4vL1x0aWYgKGV2ZW50LnR5cGUgPT0gJ21vdXNlb3V0Jykge1xyXG4vL1x0XHRjb25zb2xlLmxvZygnZXZlbnQudGFyZ2V0LmNsYXNzTmFtZScpO1xyXG4vL1x0XHRjb25zb2xlLmxvZyhldmVudC50YXJnZXQuY2xhc3NOYW1lKTtcclxuLy9cdFx0aWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPSAncmVzdWx0LW1pbmktdG9wX2ZvbicpIHtcclxuLy9cdFx0XHRsZXQgYmxvY2tTbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0LW1pbmktc2xpZGVyJyk7XHJcbi8vXHRcdFx0Y29uc29sZS5sb2coJ3JlbW92ZS5yZXN1bHQtbWluaS1zbGlkZXInKTtcclxuLy9cdFx0XHRjb25zb2xlLmxvZyhibG9ja1NsaWRlcik7XHJcbi8vXHRcdFx0YmxvY2tTbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgncmVzdWx0LW1pbmktc2xpZGVyX2Rpc3BsYXknKTtcclxuLy9cdFx0fVxyXG4vLyAgICAgLy9ldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICcnXHJcbi8vXHR9XHJcbi8vfVxyXG5cclxuLy9jb250YWluZXIub25tb3VzZW92ZXIgPSBjb250YWluZXIub25tb3VzZW91dCA9IGhhbmRsZXI7XHJcbi8vXHJcbi8vIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcclxuLy9cclxuLy8gICBmdW5jdGlvbiBzdHIoZWwpIHtcclxuLy8gICAgIGlmICghZWwpIHJldHVybiBcIm51bGxcIlxyXG4vLyAgICAgcmV0dXJuIGVsLmNsYXNzTmFtZSB8fCBlbC50YWdOYW1lO1xyXG4vLyAgIH1cclxuLy9cclxuLy8gICBsb2cudmFsdWUgKz0gZXZlbnQudHlwZSArICc6ICAnICtcclxuLy8gICAgICd0YXJnZXQ9JyArIHN0cihldmVudC50YXJnZXQpICtcclxuLy8gICAgICcsICByZWxhdGVkVGFyZ2V0PScgKyBzdHIoZXZlbnQucmVsYXRlZFRhcmdldCkgKyBcIlxcblwiO1xyXG4vLyAgIGxvZy5zY3JvbGxUb3AgPSBsb2cuc2Nyb2xsSGVpZ2h0O1xyXG4vL1xyXG4vLyAgIGlmIChldmVudC50eXBlID09ICdtb3VzZW92ZXInKSB7XHJcbi8vICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdwaW5rJ1xyXG4vLyAgIH1cclxuLy8gICBpZiAoZXZlbnQudHlwZSA9PSAnbW91c2VvdXQnKSB7XHJcbi8vICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICcnXHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG4vL2Jsb2NrUmVzdWx0U2VhcmNoLm1vdXNlb3ZlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4vL1x0bGV0IHNsaWRlclBlcmVudCA9IGV2ZW50LnRhcmdldDtcclxuLy9cdGNvbnNvbGUubG9nKCdzbGlkZXJQZXJlbnQnKTtcclxuLy9cdGNvbnNvbGUubG9nKHNsaWRlclBlcmVudCk7XHJcbi8vXHJcbi8vfTtcclxuXHJcbi8vZnVuY3Rpb24gYmxvY2tTbGlkZXJNb3VzKGV2ZW50KSB7XHJcbi8vXHRpZiAoZXZlbnQudHlwZSA9PSAnbW91c2VvdmVyJykge1xyXG4vLyAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAncGluaydcclxuLy9cdH1cclxuLy8gICBpZiAoZXZlbnQudHlwZSA9PSAnbW91c2VvdXQnKSB7XHJcbi8vICAgIGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJydcclxuLy8gIH1cclxuLy99XHJcblxyXG4vL2Z1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcclxuLy9cclxuLy8gICBmdW5jdGlvbiBzdHIoZWwpIHtcclxuLy8gICAgIGlmICghZWwpIHJldHVybiBcIm51bGxcIlxyXG4vLyAgICAgcmV0dXJuIGVsLmNsYXNzTmFtZSB8fCBlbC50YWdOYW1lO1xyXG4vLyAgIH1cclxuLy9cclxuLy8gICBsb2cudmFsdWUgKz0gZXZlbnQudHlwZSArICc6ICAnICtcclxuLy8gICAgICd0YXJnZXQ9JyArIHN0cihldmVudC50YXJnZXQpICtcclxuLy8gICAgICcsICByZWxhdGVkVGFyZ2V0PScgKyBzdHIoZXZlbnQucmVsYXRlZFRhcmdldCkgKyBcIlxcblwiO1xyXG4vLyAgIGxvZy5zY3JvbGxUb3AgPSBsb2cuc2Nyb2xsSGVpZ2h0O1xyXG4vL1xyXG4vLyAgIGlmIChldmVudC50eXBlID09ICdtb3VzZW92ZXInKSB7XHJcbi8vICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdwaW5rJ1xyXG4vLyAgIH1cclxuLy8gICBpZiAoZXZlbnQudHlwZSA9PSAnbW91c2VvdXQnKSB7XHJcbi8vICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICcnXHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG4vL2Jsb2NrU2xpZGVyLm1vdXNlb3V0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbi8vIFx0bGV0IHNsaWRlclBlcmVudCA9IGV2ZW50LnRhcmdldDtcclxuLy8gXHRjb25zb2xlLmxvZygnc2xpZGVyUGVyZW50Jyk7XHJcbi8vIFx0Y29uc29sZS5sb2coc2xpZGVyUGVyZW50KTtcclxuLy9cclxuLy8gaWYgKGV2ZW50LnR5cGUgPT0gJ21vdXNlb3ZlcicpIHtcclxuLy8gICAgIGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3BpbmsnXHJcbi8vICAgfVxyXG4vLyAgIGlmIChldmVudC50eXBlID09ICdtb3VzZW91dCcpIHtcclxuLy8gICAgIGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJydcclxuLy8gICB9XHJcbi8vIH07bW91c2VvdXQiLCIvL2xldCBjb21pbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1jb21pbmctYnV0dG9uJyk7XHJcbmxldCBkYXRlTGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRhdGUtYnV0dG9uJyk7XHJcbi8vbGV0IHN0YXJ0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbWluZ19pbnB1dCcpOyAgICAgLy/QtNCw0YLQsCDQstGK0LXQt9C00LBcclxubGV0IHJhbmdlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRhdGVfaW5wdXQnKTsgICAgIC8v0LTQsNGC0LAg0LLRitC10LfQtNCwXHJcbi8vbGV0IGRlcGFydHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRlcGFydHVyZS1idXR0b24nKTtcclxuLy9sZXQgZW5kRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRlcGFydHVyZV9pbnB1dCcpOyAgLy/QtNCw0YLQsCDQstGL0LXQt9C00LBcclxubGV0IGZvcm1WaXNpdG9ySW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS12aXNpdG9yLWlucHV0Jyk7XHJcbmxldCBkYXRlcGlja2VyQmxvY2sgPSBgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItaGVyZVwiIGRhdGEtcG9zaXRpb249XCJyaWdodCB0b3BcIj48L2Rpdj5gO1xyXG5sZXQgaW5zZXJ0Q2FsZW5kYXIgPSBgPHNlY3Rpb24gY2xhc3M9XCJjYWxlbmRhciBjYWxlbmRhcl9wcm9wc1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQke2RhdGVwaWNrZXJCbG9ja31cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhbGVuZGFyLWJvdHRvbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJidXR0b24tY2xlYXIgY2FsZW5kYXJfYnV0dG9uIFwiPtC+0YfQuNGB0YLQuNGC0Yw8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYnV0dG9uLWFwcGx5IGNhbGVuZGFyX2J1dHRvblwiPtC/0YDQuNC80LXQvdC40YLRjDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5gO1xyXG5sZXQgaW5zZXJ0VmlzaXRvciA9IGBgO1xyXG4vL9C/0YDQuNC80LXQvdC40YLRjFxyXG5sZXQgYXBwbHlTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmF0dG9uLWFycm93X2FwcGx5Jyk7ICAgICAvL9C60L3QvtC/0LrQsCDQv9C+0LTQvtCx0YDQsNGC0YxcclxuXHJcbi8vY29uc29sZS5sb2coY29taW5nKTtcclxuY29uc29sZS5sb2coZGF0ZUxpdmUpO1xyXG5cclxuXHJcbi8v0LLRi9Cx0L7RgNC60LAg0LTQsNGCINC40Lcg0LrQsNC70LXQvdC00LDRgNGPLS0tLS0tLS0tLS0tLS0tLS1cclxuLy9jb21pbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuZGF0ZUxpdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRjb25zb2xlLmxvZygn0L3QsNC20LDRgtCwINC60L3QvtC/0LrQsCDQtNCw0YLRiyDQv9GA0LXQsdGL0LLQsNC90LjRjyDQsiDQvtGC0LXQu9C1Jyk7XHJcblx0Ly9sZXQgYnV0dG9uQ2FsZW5kYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1jb21pbmcnKTtcclxuXHRsZXQgYnV0dG9uQ2FsZW5kYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1kYXRlJyk7XHJcblx0bGV0IGJ0bkZvcm0gPSAnLmZvcm0tZGF0ZV9pbnB1dCc7XHJcblx0Y2FsZW5kYXJPdXRwdXQoYnV0dG9uQ2FsZW5kYXIsIGJ0bkZvcm0pOyAgICAgICAgICAgICAgICAgICAvL9Cy0YvQstC+0LQg0LrQsNC70LXQvdC00LDRgNGPXHJcblxyXG5cdGJ0bkNhbGVuZGFyUmVzdWx0KCk7ICAgICAgICAgICAgICAgIC8v0LrQvdC+0L/QutC4INCyINC60LDQu9C10L3QtNCw0YDQtVxyXG59KTtcclxuXHJcbi8vZGVwYXJ0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbi8vXHRjb25zb2xlLmxvZygn0L3QsNC20LDRgtCwINC60L3QvtC/0LrQsCDQktCr0JXQl9CUJyk7XHJcbi8vXHRsZXQgYnV0dG9uQ2FsZW5kYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1kZXBhcnR1cmUnKTtcclxuLy9cdGxldCBidG5Gb3JtID0gJy5mb3JtLWRlcGFydHVyZV9pbnB1dCc7XHJcbi8vXHRjYWxlbmRhck91dHB1dChidXR0b25DYWxlbmRhciwgYnRuRm9ybSk7XHJcbi8vXHJcbi8vXHRidG5DYWxlbmRhclJlc3VsdCgpO1xyXG4vL30pO1xyXG5cclxuLy/RhNGD0L3QutGG0LjRjyDQstGL0LLQvtC00LAg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDQstGL0LHQvtGA0LAg0LTQsNC90L3Ri9GFXHJcbmZ1bmN0aW9uIGJ0bkNhbGVuZGFyUmVzdWx0KCkge1xyXG5cdGxldCBidG5DYWxlbmRhckNsZWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1jbGVhcicpO1xyXG5cdGxldCBidG5DYWxlbmRhckFwcGx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1hcHBseScpO1xyXG5cclxuXHRidG5DYWxlbmRhckFwcGx5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ9Cd0LDQttCw0YLQsCDQutC90L7Qv9C60LAg0J/QoNCY0JzQldCd0JjQotCsJyk7XHJcblx0XHRjYWxlbmRhckRlbGV0ZSgpO1xyXG5cdH0pO1xyXG5cdGJ0bkNhbGVuZGFyQ2xlYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zb2xlLmxvZygn0J3QsNC20LDRgtCwINC60L3QvtC/0LrQsCDQntCn0JjQodCi0JjQotCsJyk7XHJcblx0XHQvL9GB0Y7QtNCwINCy0L/QuNGB0LDRgtGMINC00LjQsNC/0LDQt9C+0L0g0LTQsNGCXHJcblx0XHRyYW5nZURhdGUudmFsdWUgPSAn0JTQlC7QnNCc0JwuIC0g0JTQlC7QnNCc0JwuJztcclxuXHRcdC8vc3RhcnREYXRlLnZhbHVlID0gJ9CU0JQu0JzQnC7Qk9CT0JPQkyc7XHJcblx0XHQvL2VuZERhdGUudmFsdWUgPSAn0JTQlC7QnNCcLtCT0JPQk9CTJztcclxuXHRcdGNhbGVuZGFyRGVsZXRlKCk7XHJcblx0fSlcclxufVxyXG4vL9GE0YPQvdC60YbQuNGPINGE0L7RgNC80LjRgNC+0LLQsNC90LjRjyDQutCw0LvQtdC90LTQsNGA0Y9cclxuZnVuY3Rpb24gY2FsZW5kYXJPdXRwdXQoYnRuQ2xpY2ssIGJ0bklucHV0KSB7XHJcblx0Y29uc29sZS5sb2coYnRuQ2xpY2spO1xyXG5cdGxldCBibG9ja0NhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyJyk7XHJcblx0aWYgKGJsb2NrQ2FsZW5kYXIgIT0gbnVsbCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ9C30L3QsNGH0LXQvdC40LUgYmxvY2tDYWxlbmRhciAnICsgYmxvY2tDYWxlbmRhcik7XHJcblx0XHRjYWxlbmRhckRlbGV0ZSgpO1xyXG5cdFx0ZGF0ZXBpY2tlckNyZWF0ZShidG5JbnB1dCk7XHJcblx0XHRidG5DbGljay5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZUVuZCcsIGluc2VydENhbGVuZGFyKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZGF0ZXBpY2tlckNyZWF0ZShidG5JbnB1dCk7XHJcblx0XHRidG5DbGljay5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZUVuZCcsIGluc2VydENhbGVuZGFyKTtcclxuXHR9XHJcblxyXG59XHJcbi8v0YTRg9C90LrRhtC40Y8g0YPQtNCw0LvQtdC90LjRjyDQutCw0LvQtdC90LTQsNGA0Y9cclxuZnVuY3Rpb24gY2FsZW5kYXJEZWxldGUoKSB7XHJcblx0bGV0IGJsb2NrQ2FsZW5kYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXInKTtcclxuXHQvL2Jsb2NrQ2FsZW5kYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRibG9ja0NhbGVuZGFyLnJlbW92ZSgpO1xyXG59XHJcbi8v0YTRg9C90LrRhtC40Y8g0LLRi9C30L7QstCwINC00LDRgtCw0L/QuNC60LXRgNCwXHJcbmZ1bmN0aW9uIGRhdGVwaWNrZXJDcmVhdGUoYnRuRm9ybSkge1xyXG5cdC8vbGV0IGJ0bkZvcm0gPSBkXHJcblx0Y29uc29sZS5sb2coJ2J0bkZvcm0gLSAnICsgYnRuRm9ybSk7XHJcblxyXG5cdCQoZnVuY3Rpb24gKCkge1xyXG5cdFx0JCgnLmRhdGVwaWNrZXItaGVyZScpLmRhdGVwaWNrZXIoIHtcclxuXHRcdFx0Ly9hbHRGaWVsZDogYnRuRm9ybSwgICAgICAgICAgICAgICAgICAgLy/QstGL0LPRgNGD0LfQutCwINCyINC/0L7Qu9C1IGJ0bkZvcm1cclxuXHRcdFx0Ly9hbHRGaWVsZERhdGVGb3JtYXQ6ICdkZC5tbS55eXl5JywgICAgLy/RhNC+0YDQvNCw0YIg0LTQsNGC0Ysg0LLRi9Cz0YDRg9C30LrQuFxyXG5cdFx0XHRyYW5nZTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LTQuNCw0L/QsNC30L7QvSDQtNCw0YIg0LLQutC70Y7Rh9C10L1cclxuXHRcdFx0dG9nZ2xlU2VsZWN0ZWQ6IGZhbHNlLCAgICAgICAgICAgICAgIC8vINGA0LDQt9GA0LXRiNC40YLRjCDQstGL0LHQvtGAIDHQuSDQtNCw0YLRi1xyXG5cdFx0XHRtdWx0aXBsZURhdGVzU2VwYXJhdG9yOiAnIC0gJywgICAgICAgLy8g0YDQsNC30LTQtdC70LjRgtC10LvRjCDQtNC40LDQv9Cw0LfQvtC90LAg0LTQsNGCXHJcblx0XHRcdG1pbkRhdGU6IG5ldyBEYXRlKCksICAgICAgICAgICAgICAgICAgLy8g0LfQsNC/0YDQtdGC0LjRgtGMINCy0YvQsdC+0YAg0L3QuNC20LUg0YLQtdC60YPRidC10Lkg0LTQsNGC0YtcclxuXHRcdFx0b25TZWxlY3Q6IGZ1bmN0aW9uIG9uU2VsZWN0KHNlbGVjdGVkRGF0ZXMpIHsgICAgICAgICAgICAgLy/QstGL0LHQvtGA0LrQsCDQtNC40LDQv9Cw0LfQvtC90LBcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhzZWxlY3RlZERhdGVzKTtcclxuXHRcdFx0XHRpZihzZWxlY3RlZERhdGVzICE9PSB1bmRlZmluZWQgJiYgc2VsZWN0ZWREYXRlcyAhPSAnJyAmJiBzZWxlY3RlZERhdGVzLmluZGV4T2YoJy0nKSA+IC0xKXtcclxuXHRcdFx0XHRcdG1keUNhbGVuZGFyID0gc2VsZWN0ZWREYXRlcy5zcGxpdCgnLSAnKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdtZHlDYWxlbmRhciAtICcgKyBtZHlDYWxlbmRhcik7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhtZHlDYWxlbmRhcik7XHJcblx0XHRcdFx0XHRsZXQgbWR5U3RhcnQgPSAobWR5Q2FsZW5kYXJbMF0pO1xyXG5cdFx0XHRcdFx0bGV0IG1keUVuZCA9IChtZHlDYWxlbmRhclsxXSk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhtZHlTdGFydCk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhtZHlFbmQpO1xyXG5cdFx0XHRcdFx0Ly9zdGFydERhdGUudmFsdWUgPSBtZHlTdGFydDtcclxuXHRcdFx0XHRcdC8vZW5kRGF0ZS52YWx1ZSA9IG1keUVuZDtcclxuXHRcdFx0XHRcdC8vcmFuZ2VEYXRlLnZhbHVlID0gJ9CU0JQu0JzQnNCcLiAtINCU0JQu0JzQnNCcLic7XHJcblx0XHRcdFx0XHRyYW5nZURhdGUudmFsdWUgPSBtZHlTdGFydCArICcgLSAnICsgbWR5RW5kO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvL3JldHVybiBtZHlDYWxlbmRhcjtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHQvLyQoJy5kYXRlcGlja2VyLWhlcmUnKS5kYXRhKCdkYXRlcGlja2VyJyk7XHJcblx0fSk7XHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLdC60L3QvtC/0LrQsCDQv9C+0LTQvtCx0YDQsNGC0Ywg0L3QvtC80LXRgC0tLS0tLS0tLy9cclxuXHJcbi8vYXBwbHlTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbi8vXHQvL9GB0L7RgdGC0LDQstC40Lwg0L/QtdGA0LXQvNC10L3QvdGL0LUg0LfQsNC/0YDQvtGB0LAg0Lgg0LfQsNC/0LjRiNC40Lwg0LIg0LvQvtC60LDQu9GB0YLQvtGA0LDQtNC2XHJcbi8vXHRsZXQgYXBwbHlTZWxlY3REYXRhID0gc3RhcnREYXRlLnZhbHVlLnRyaW0oKSArICc7JyArIGVuZERhdGUudmFsdWUudHJpbSgpICsgJzsnICsgZm9ybVZpc2l0b3JJbnB1dC52YWx1ZS50cmltKCk7XHJcbi8vXHRjb25zb2xlLmxvZyhhcHBseVNlbGVjdERhdGEpO1xyXG4vL1x0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RhdGVJbicpO1xyXG4vL1x0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RhdGVPdXQnKTtcclxuLy9cdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd2aXNpdG9yJyk7XHJcbi8vXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGF0ZUluJywgc3RhcnREYXRlLnZhbHVlLnRyaW0oKSk7XHJcbi8vXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGF0ZU91dCcsIGVuZERhdGUudmFsdWUudHJpbSgpKTtcclxuLy9cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd2aXNpdG9yJywgZm9ybVZpc2l0b3JJbnB1dC52YWx1ZS50cmltKCkpO1xyXG4vL1x0Ly93aW5kb3cub3Blbignc2VhcmNocm9vbS5odG1sJyk7XHJcbi8vfSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8tLS3QvtC/0YDQtdC00LXQu9GP0LXQvCDRgNC+0LTQuNGC0LXQu9GPINC00LvRjyDQstGB0YLQsNCy0LrQuCDQsdC70L7QutCwXHJcbi8vbGV0IGVsZW1lbnRDbGljayA9IGNvbWluZztcclxuXHJcbi8vZWxlbWVudENsaWNrLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCl7XHJcbi8vXHRsZXQgZWxlbWVudFRhcmdldCA9IGV2ZW50LnRhcmdldDsgICAgICAvL9C60L3QvtC/0LrQsFxyXG4vL1x0Y29uc29sZS5sb2coZWxlbWVudFRhcmdldCk7XHJcbi8vXHRsZXQgcGFyZW50RWxlbWVudFRhcmdldCA9IGVsZW1lbnRUYXJnZXQucGFyZW50RWxlbWVudDsgICAgICAgLy/RhNC+0YDQvNCwINC30LDQv9GA0L7RgdCwXHJcbi8vXHRjb25zb2xlLmxvZyhwYXJlbnRFbGVtZW50VGFyZ2V0KTtcclxuLy9cdGxldCB0YWJsZVRhcmdldFBhcmVudCA9IHBhcmVudEVsZW1lbnRUYXJnZXQuY2hpbGRyZW47ICAgICAgICAvLyDQstGB0Y8g0YTQvtGA0LzQsFxyXG4vL1x0Y29uc29sZS5sb2codGFibGVUYXJnZXRQYXJlbnQpO1xyXG4vL1x0Ly90ZXh0V3JpdGUudGV4dENvbnRlbnQgPSB0YWJsZVRhcmdldFBhcmVudFsyXS50ZXh0Q29udGVudDtcclxuLy9cdGNvbnNvbGUubG9nKHRhYmxlVGFyZ2V0UGFyZW50KTtcclxuLy99O1xyXG5cclxuXHJcbi8vPHNlY3Rpb24gY2xhc3NOYW1lPVwiY2FsZW5kYXJcIj5cclxuLy9cdDxkaXYgY2xhc3NOYW1lPVwiZGF0ZXBpY2tlci1oZXJlXCIgZGF0YS1wb3NpdGlvbj1cInJpZ2h0IHRvcFwiIGRhdGEtcmFuZ2U9XCJ0cnVlXCJcclxuLy9cdFx0XHQgZGF0YS1tdWx0aXBsZS1kYXRlcy1zZXBhcmF0b3I9XCIgLSBcIj48L2Rpdj5cclxuLy9cdDxkaXYgY2xhc3NOYW1lPVwiY2FsZW5kYXItYm90dG9tXCI+XHJcbi8vXHRcdDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWNsZWFyIGNhbGVuZGFyX2J1dHRvbiBcIj7QvtGH0LjRgdGC0LjRgtGMPC9kaXY+XHJcbi8vXHRcdDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWFwcGx5IGNhbGVuZGFyX2J1dHRvblwiPtC/0YDQuNC80LXQvdC40YLRjDwvZGl2PlxyXG4vL1x0PC9kaXY+XHJcbi8vPC9zZWN0aW9uPiIsImxldCB0aXRsZVN1bW1NaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhbmdlLXRpdGxlLXN1bW1fbWluXCIpO1xyXG5jb25zb2xlLmxvZyh0aXRsZVN1bW1NaW4pO1xyXG5cclxubGV0IHRpdGxlU3VtbU1heCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFuZ2UtdGl0bGUtc3VtbV9tYXhcIik7XHJcbmNvbnNvbGUubG9nKHRpdGxlU3VtbU1heCk7XHJcbmxldCBpbnB1dHNSeSA9IHtcclxuXHRzbGlkZXJXaWR0aDogMjY2LFxyXG5cdG1pblJhbmdlOiAxMDAwLFxyXG5cdG1heFJhbmdlOiAyMDAwMCxcclxuXHRvdXRwdXRXaWR0aDozMCwgLy8gb3V0cHV0IHdpZHRoXHJcblx0dGh1bWJXaWR0aDogMTYsIC8vIHRodW1iIHdpZHRoXHJcblx0dGh1bWJCb3JkZXJXaWR0aDogMixcclxuXHR0cmFja0hlaWdodDogNixcclxuXHR0aGVWYWx1ZTogWzUwMDAsIDEwMDAwXSAvLyB0aGVWYWx1ZVswXSA8IHRoZVZhbHVlWzFdXHJcbn07XHJcbmNvbnNvbGUubG9nKGlucHV0c1J5KTtcclxubGV0IGlzRHJhZ2dpbmcwID0gZmFsc2U7XHJcbmxldCBpc0RyYWdnaW5nMSA9IGZhbHNlO1xyXG5cclxubGV0IHJhbmdlID0gaW5wdXRzUnkubWF4UmFuZ2UgLSBpbnB1dHNSeS5taW5SYW5nZTtcclxubGV0IHJhbmdlSyA9IGlucHV0c1J5LnNsaWRlcldpZHRoIC8gcmFuZ2U7XHJcbmxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKTtcclxubGV0IHRodW1iUmVhbFdpZHRoID0gaW5wdXRzUnkudGh1bWJXaWR0aCArIDIgKiBpbnB1dHNSeS50aHVtYkJvcmRlcldpZHRoO1xyXG5cclxuLy8gc3R5bGVzXHJcbmxldCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlclwiKTtcclxuY29uc29sZS5sb2coc2xpZGVyKTtcclxuLy/Qv9C+0LvQvtGB0LrQsCDRgdC70LDQudC00LXRgNCwINCy0YvRgdC+0YLQsFxyXG5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gaW5wdXRzUnkudHJhY2tIZWlnaHQgKyBcInB4XCI7XHJcbi8v0L/QvtC70L7RgdC60LAg0YHQu9Cw0LnQtNC10YDQsCDRiNC40YDQuNC90LBcclxuc2xpZGVyLnN0eWxlLndpZHRoID0gaW5wdXRzUnkuc2xpZGVyV2lkdGggKyBcInB4XCI7XHJcbi8v0L/QvtC70L7RgdC60LAg0YHQu9Cw0LnQtNC10YDQsCDQvtGC0YHRgtGD0L/Ri1xyXG5zbGlkZXIuc3R5bGUucGFkZGluZ0xlZnQgPSAoaW5wdXRzUnkudGhlVmFsdWVbMF0gLSBpbnB1dHNSeS5taW5SYW5nZSkgKiByYW5nZUsgKyBcInB4XCI7XHJcbnNsaWRlci5zdHlsZS5wYWRkaW5nUmlnaHQgPSBpbnB1dHNSeS5zbGlkZXJXaWR0aCAtIGlucHV0c1J5LnRoZVZhbHVlWzFdICogcmFuZ2VLICsgXCJweFwiO1xyXG5cclxubGV0IHRyYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50cmFja1wiKTtcclxudHJhY2suc3R5bGUud2lkdGggPSBpbnB1dHNSeS50aGVWYWx1ZVsxXSAqIHJhbmdlSyAtIGlucHV0c1J5LnRoZVZhbHVlWzBdICogcmFuZ2VLICsgXCJweFwiO1xyXG5cclxubGV0IHRodW1icyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGh1bWJcIik7XHJcbmNvbnNvbGUubG9nKHRodW1icyk7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgdGh1bWJzLmxlbmd0aDsgaSsrKSB7XHJcblx0Ly/Qv9C40L/QutC4INGB0LvQsNC50LTQtdGA0LAg0YjQuNGA0LXQvdCwPdCy0YvRgdC+0YLQtVxyXG5cdHRodW1ic1tpXS5zdHlsZS53aWR0aCA9IHRodW1ic1tpXS5zdHlsZS5oZWlnaHQgPSBpbnB1dHNSeS50aHVtYldpZHRoICsgXCJweFwiO1xyXG5cdGNvbnNvbGUubG9nKGlucHV0c1J5LnRodW1iV2lkdGggKyBcInB4XCIpO1xyXG5cdC8v0L/QuNC/0LrQuCDRgdC70LDQudC00LXRgNCwINCx0L7RgNC00Y7RgFxyXG5cdHRodW1ic1tpXS5zdHlsZS5ib3JkZXJXaWR0aCA9IGlucHV0c1J5LnRodW1iQm9yZGVyV2lkdGggKyBcInB4XCI7XHJcblx0Ly/Qv9C40L/QutC4INGB0LvQsNC50LTQtdGA0LAg0L/QvtC30LjRhtC40Y8g0YHQstC10YDRhdGDXHJcblx0dGh1bWJzW2ldLnN0eWxlLnRvcCA9IC0oKGlucHV0c1J5LnRodW1iV2lkdGggLyAyICsgaW5wdXRzUnkudGh1bWJCb3JkZXJXaWR0aCAtIGlucHV0c1J5LnRyYWNrSGVpZ2h0IC8gMikgLSAxKSArIFwicHhcIjtcclxuXHRjb25zb2xlLmxvZyh0aHVtYnNbaV0uc3R5bGUudG9wKTtcclxuXHQvL9C/0LjQv9C60Lgg0YHQu9Cw0LnQtNC10YDQsCDQv9C+0LfQuNGG0LjRjyDRgdC70LXQstCwXHJcblx0dGh1bWJzW2ldLnN0eWxlLmxlZnQgPSAoaW5wdXRzUnkudGhlVmFsdWVbaV0gLSBpbnB1dHNSeS5taW5SYW5nZSkgKiByYW5nZUsgLSAodGh1bWJSZWFsV2lkdGggLyAyKSArIFwicHhcIjtcclxuXHJcbn1cclxubGV0IG91dHB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm91dHB1dFwiKTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRzLmxlbmd0aDsgaSsrKSB7XHJcblx0Y29uc29sZS5sb2codGh1bWJzW2ldKTtcclxuXHRvdXRwdXRzW2ldLnN0eWxlLndpZHRoID0gb3V0cHV0c1tpXS5zdHlsZS5oZWlnaHQgPSBvdXRwdXRzW2ldLnN0eWxlLmxpbmVIZWlnaHQgPSBvdXRwdXRzW2ldLnN0eWxlLmxlZnQgPSBpbnB1dHNSeS5vdXRwdXRXaWR0aCArIFwicHhcIjtcclxuXHRvdXRwdXRzW2ldLnN0eWxlLnRvcCA9IC0oTWF0aC5zcXJ0KDIgKiBpbnB1dHNSeS5vdXRwdXRXaWR0aCAqIGlucHV0c1J5Lm91dHB1dFdpZHRoKSArIGlucHV0c1J5LnRodW1iV2lkdGggLyAyIC0gaW5wdXRzUnkudHJhY2tIZWlnaHQgLyAyKSArIFwicHhcIjtcclxuXHRvdXRwdXRzW2ldLnN0eWxlLmxlZnQgPSAoaW5wdXRzUnkudGhlVmFsdWVbaV0gLSBpbnB1dHNSeS5taW5SYW5nZSkgKiByYW5nZUsgLSBpbnB1dHNSeS5vdXRwdXRXaWR0aCAvIDIgKyBcInB4XCI7XHJcblx0b3V0cHV0c1tpXS5pbm5lckhUTUwgPSBcIjxwPlwiICsgaW5wdXRzUnkudGhlVmFsdWVbaV0gKyBcIjwvcD5cIjtcclxuXHRpZiAoaSA9PSAwKSB7XHJcblx0XHR0aXRsZVN1bW1NaW4udGV4dENvbnRlbnQgPSBpbnB1dHNSeS50aGVWYWx1ZVswXSArIFwi4oK9XCI7XHJcblx0XHRjb25zb2xlLmxvZyh0aXRsZVN1bW1NaW4udGV4dENvbnRlbnQpO1xyXG5cdH1cclxuXHRpZiAoaSA9PSAxKSB7XHJcblx0XHR0aXRsZVN1bW1NYXgudGV4dENvbnRlbnQgPSBpbnB1dHNSeS50aGVWYWx1ZVsxXSArIFwi4oK9XCI7XHJcblx0XHRjb25zb2xlLmxvZyh0aXRsZVN1bW1NYXgudGV4dENvbnRlbnQpO1xyXG5cdH1cclxufVxyXG5cclxuLy9ldmVudHNcclxuXHJcbnRodW1ic1swXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdGlzRHJhZ2dpbmcwID0gdHJ1ZTtcclxufSwgZmFsc2UpO1xyXG50aHVtYnNbMV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihldnQpIHtcclxuXHRpc0RyYWdnaW5nMSA9IHRydWU7XHJcbn0sIGZhbHNlKTtcclxuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdGlzRHJhZ2dpbmcwID0gZmFsc2U7XHJcblx0aXNEcmFnZ2luZzEgPSBmYWxzZTtcclxufSwgZmFsc2UpO1xyXG5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdGlzRHJhZ2dpbmcwID0gZmFsc2U7XHJcblx0aXNEcmFnZ2luZzEgPSBmYWxzZTtcclxufSwgZmFsc2UpO1xyXG5cclxuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZXZ0KSB7XHJcblx0bGV0IG1vdXNlUG9zID0gb01vdXNlUG9zKHRoaXMsIGV2dCk7XHJcblx0bGV0IHRoZVZhbHVlMCA9IChpc0RyYWdnaW5nMCkgPyBNYXRoLnJvdW5kKG1vdXNlUG9zLnggLyByYW5nZUspICsgaW5wdXRzUnkubWluUmFuZ2UgOiBpbnB1dHNSeS50aGVWYWx1ZVswXTtcclxuXHRjb25zb2xlLmxvZyh0aGVWYWx1ZTApO1xyXG5cdGxldCB0aGVWYWx1ZTEgPSAoaXNEcmFnZ2luZzEpID8gTWF0aC5yb3VuZChtb3VzZVBvcy54IC8gcmFuZ2VLKSArIGlucHV0c1J5Lm1pblJhbmdlIDogaW5wdXRzUnkudGhlVmFsdWVbMV07XHJcblxyXG5cdGlmIChpc0RyYWdnaW5nMCkge1xyXG5cclxuXHRcdGlmICh0aGVWYWx1ZTAgPCB0aGVWYWx1ZTEgLSAodGh1bWJSZWFsV2lkdGggLyAyKSAmJlx0dGhlVmFsdWUwID49IGlucHV0c1J5Lm1pblJhbmdlKSB7XHJcblx0XHRcdGlucHV0c1J5LnRoZVZhbHVlWzBdID0gdGhlVmFsdWUwO1xyXG5cdFx0XHR0aHVtYnNbMF0uc3R5bGUubGVmdCA9ICh0aGVWYWx1ZTAgLSBpbnB1dHNSeS5taW5SYW5nZSkgKiByYW5nZUsgLSAodGh1bWJSZWFsV2lkdGggLyAyKSArIFwicHhcIjtcclxuXHRcdFx0b3V0cHV0c1swXS5zdHlsZS5sZWZ0ID0gKHRoZVZhbHVlMCAtIGlucHV0c1J5Lm1pblJhbmdlKSAqIHJhbmdlSyAtIGlucHV0c1J5Lm91dHB1dFdpZHRoIC8gMiArIFwicHhcIjtcclxuXHRcdFx0b3V0cHV0c1swXS5pbm5lckhUTUwgPSBcIjxwPlwiICsgdGhlVmFsdWUwICsgXCI8L3A+XCI7XHJcblx0XHRcdHRpdGxlU3VtbU1pbi50ZXh0Q29udGVudCA9IHRoZVZhbHVlMCArIFwi4oK9XCI7XHJcblx0XHRcdHNsaWRlci5zdHlsZS5wYWRkaW5nTGVmdCA9ICh0aGVWYWx1ZTAgLSBpbnB1dHNSeS5taW5SYW5nZSkgKiByYW5nZUsgKyBcInB4XCI7XHJcblx0XHRcdHRyYWNrLnN0eWxlLndpZHRoID0gKHRoZVZhbHVlMSAtIHRoZVZhbHVlMCkgKiByYW5nZUsgKyBcInB4XCI7XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmIChpc0RyYWdnaW5nMSkge1xyXG5cclxuXHRcdGlmICh0aGVWYWx1ZTEgPiB0aGVWYWx1ZTAgKyAodGh1bWJSZWFsV2lkdGggLyAyKSAmJlx0dGhlVmFsdWUxIDw9IGlucHV0c1J5Lm1heFJhbmdlKSB7XHJcblx0XHRcdGlucHV0c1J5LnRoZVZhbHVlWzFdID0gdGhlVmFsdWUxO1xyXG5cdFx0XHR0aHVtYnNbMV0uc3R5bGUubGVmdCA9ICh0aGVWYWx1ZTEgLSBpbnB1dHNSeS5taW5SYW5nZSkgKiByYW5nZUsgLSAodGh1bWJSZWFsV2lkdGggLyAyKSArIFwicHhcIjtcclxuXHRcdFx0b3V0cHV0c1sxXS5zdHlsZS5sZWZ0ID0gKHRoZVZhbHVlMSAtIGlucHV0c1J5Lm1pblJhbmdlKSAqIHJhbmdlSyAtIGlucHV0c1J5Lm91dHB1dFdpZHRoIC8gMiArIFwicHhcIjtcclxuXHRcdFx0b3V0cHV0c1sxXS5pbm5lckhUTUwgPSBcIjxwPlwiICsgdGhlVmFsdWUxICsgXCI8L3A+XCI7XHJcblx0XHRcdHRpdGxlU3VtbU1heC50ZXh0Q29udGVudCA9IHRoZVZhbHVlMSArIFwi4oK9XCI7XHJcblx0XHRcdGNvbnNvbGUubG9nKHRpdGxlU3VtbU1heC50ZXh0Q29udGVudCk7XHJcblx0XHRcdHNsaWRlci5zdHlsZS5wYWRkaW5nUmlnaHQgPSAoaW5wdXRzUnkubWF4UmFuZ2UgLSB0aGVWYWx1ZTEpICogcmFuZ2VLICsgXCJweFwiO1xyXG5cdFx0XHR0cmFjay5zdHlsZS53aWR0aCA9ICh0aGVWYWx1ZTEgLSB0aGVWYWx1ZTApICogcmFuZ2VLICsgXCJweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0sIGZhbHNlKTtcclxuXHJcbi8vIGhlbHBlcnNcclxuXHJcbmZ1bmN0aW9uIG9Nb3VzZVBvcyhlbG10LCBldnQpIHtcclxuXHRsZXQgQ2xpZW50UmVjdCA9IGVsbXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0cmV0dXJuIHsgLy9vYmpldG9cclxuXHRcdHg6IE1hdGgucm91bmQoZXZ0LmNsaWVudFggLSBDbGllbnRSZWN0LmxlZnQpLFxyXG5cdFx0eTogTWF0aC5yb3VuZChldnQuY2xpZW50WSAtIENsaWVudFJlY3QudG9wKVxyXG5cdH1cclxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL9C/0L7QtNC60LvRjtGH0LDQtdC8INGB0LvQsNC50LTQtdGAXHJcbmltcG9ydCAnLi9tb2R1bGVzL3Jhbmdlc2xpZGVyL3Jhbmdlc2xpZGVyLmNzcyc7ICAvL9C80L7QtNGD0LvRjCDRgdC70LDQudC00LXRgNCwXHJcbmltcG9ydCAnLi9tb2R1bGVzL3Jhbmdlc2xpZGVyL3Jhbmdlc2xpZGVyLmpzJzsgICAgICAgIC8v0YHQutGA0LjQv9GCINGB0LvQsNC50LTQtdGA0LBcclxuXHJcbi8v0L/QvtC00LrQu9GO0YfQtdC90LjQtSDRgdC60YDQuNC/0YLQvtCyXHJcbmltcG9ydCAnLi9tb2R1bGVzL3JhbmdkYXRlL3JhbmdkYXRlLmpzJztcclxuaW1wb3J0ICcuL21vZHVsZXMvcmFuZ2RhdGUvcmFuZ2RhdGUuY3NzJztcclxuaW1wb3J0ICcuL2Jsb2NrL2NhbGVuZGFyL2NhbGVuZGFyLmNzcyc7ICAgICAgICAgICAvL9Cx0LvQvtC6INCy0YvQstC+0LTQsCDQutCw0LvQtdC90LTQsNGA0Y9cclxuaW1wb3J0ICcuL2Jsb2NrL3Zpc2l0b3IvdmlzaXRvci5qcyc7XHJcbmltcG9ydCAnLi9ibG9jay92aXNpdG9yL3Zpc2l0b3IuY3NzJztcclxuaW1wb3J0ICcuL2pzL3NlYXJjaHJvb20uanMnOyAgICAgICAgICAgICAgLy/RgdC60YDQuNC/0YIg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDQv9C+0LjRgdC60LBcclxuaW1wb3J0ICcuL21vZHVsZXMvY2hlY2tsaXN0L2NoZWNrbGlzdC5qcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL2NoZWNrbGlzdC9jaGVja2xpc3QuY3NzJztcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5pbXBvcnQgJy4vY3NzL3NlYXJjaHJvb20uY3NzJztcclxuaW1wb3J0ICcuL21vZHVsZXMvY2hlY2tidXR0b24vY2hlY2tidXR0b24uY3NzJztcclxuaW1wb3J0ICcuL2Jsb2NrL2FtZW5pdGllcy9hbWVuaXRpZXMuY3NzJztcclxuaW1wb3J0ICcuL2Jsb2NrL2FtZW5pdGllcy9hbWVuaXRpZXMuanMnO1xyXG5pbXBvcnQgJy4vYmxvY2svYWRkYW1lbml0aWVzL2FkZGFtZW5pdGllcy5qcyc7XHJcbmltcG9ydCAnLi9ibG9jay9wYWdpbmF0aW9uL3BhZ2luYXRpb24uanMnO1xyXG5pbXBvcnQgJy4vYmxvY2svcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNzcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL3N0YXJzL3N0YXJzLmpzJztcclxuaW1wb3J0ICcuL21vZHVsZXMvc3RhcnMvc3RhcnMuY3NzJztcclxuaW1wb3J0ICcuL2Jsb2NrL3NlYXJjaHJlc3VsdC9zZWFyY2hyZXN1bHQuanMnO1xyXG5pbXBvcnQgJy4vYmxvY2svc2VhcmNocmVzdWx0L3NlYXJjaHJlc3VsdC5jc3MnO1xyXG5pbXBvcnQgJy4vYmxvY2svc2VhcmNocmVzdWx0L3NlcmNocmVzdWx0YmFja2dyYXVuZC5jc3MnO1xyXG5cclxuaW1wb3J0ICcuL21vZHVsZXMvcGhvdG9zbGlkZXIvcGhvdG9zbGlkZXIuY3NzJztcclxuaW1wb3J0ICcuL21vZHVsZXMvcGhvdG9zbGlkZXIvcGhvdG9zbGlkZXIuanMnOyJdLCJuYW1lcyI6WyJhZGRBbWVuaXRpZXNCdG4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRBbWVuaXRpZXNCbG9jayIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJhbWVuaXRpZXNCdG4iLCJhbWVuaXRpZXNJbnB1dCIsImFtZW5pdGllc0Zvcm0iLCJhbWVuaXRpZXNEcm9wIiwiYW1lbml0aWVzQnRuU2F2ZSIsImFtZW5pdGllc0J0bkNsZWFyIiwiYmVkcm9vbVNlbGVjdE1pbiIsImJlZHJvb21TZWxlY3RNYXgiLCJiZWRyb29tU2VsZWN0UmVzdWx0IiwiYmVkU2VsZWN0TWluIiwiYmVkU2VsZWN0TWF4IiwiYmVkU2VsZWN0UmVzdWx0IiwiYmF0aHJvb21TZWxlY3RNaW4iLCJiYXRocm9vbVNlbGVjdE1heCIsImJhdGhyb29tU2VsZWN0UmVzdWx0IiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiYW1lbml0aWVzSG92ZXJCZWRyb29tIiwibmFtQmVkcm9vbUhvdmVyIiwiYWRkIiwicmVtb3ZlIiwiYW1lbml0aWVzSG92ZXJCZWQiLCJuYW1CZWRIb3ZlciIsImFtZW5pdGllc0hvdmVyQmF0aHJvb20iLCJuYW1CYXRocm9vbUhvdmVyIiwidGV4dENvbnRlbnQiLCJOdW1iZXIiLCJwYXJzZUludCIsImFtZW5pdGllc1N1bW1UZXh0IiwiaW5wdXROdW1CZWRyb29tIiwiaW5wdXROdW1CZWQiLCJpbnB1dE51bUJhdGhyb29tIiwiaW5wdXROdW0iLCJidG5DbGVhckFtZW5pdGllcyIsImlucHV0VGV4dEJlZHJvb20iLCJpbnB1dFRleHRCZWQiLCJpbnB1dFRleHRCYXRocm9vbSIsImFtZW5pdGllc0JlZHJvb21BbGwiLCJhbWVuaXRpZXNCZWRBbGwiLCJhbWVuaXRpZXNCYXRocm9vbUFsbCIsIm5hbWVOdW1iZXIiLCJudW1iZXIiLCJ0ZXh0IiwiY2FzZXMiLCJudW1DbGVhciIsImRyb3BJbnB1dE1lbnUiLCJibG9ja1BhZ2luYXRpb24iLCJvbmNsaWNrIiwiZXZlbnQiLCJwdW5rdFBhZ2luYXRpb25UYXJnZXQiLCJ0YXJnZXQiLCJwYXJlbnRQdW5rdFRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJjaGlsZHJlblB1bmt0VGFyZ2V0IiwiY2hpbGRyZW4iLCJsZW5naHRDaGlsZHJlblB1bmt0VGFyZ2V0IiwibGVuZ3RoIiwiaSIsInB1bmt0Q2hpbGRyZW5QYWdpbmF0aW9uIiwidmlzaXRvckJ0biIsInZpc2l0b3JJbnB1dCIsInZpc2l0b3JGb3JtIiwidmlzaXRvckRyb3AiLCJ2aXNpdG9yQnRuU2F2ZSIsInZpc2l0b3JCdG5DbGVhciIsImJpZ1NlbGVjdE1pbiIsImJpZ1NlbGVjdE1heCIsImJpZ1NlbGVjdFJlc3VsdCIsImNoaWxkU2VsZWN0TWluIiwiY2hpbGRTZWxlY3RNYXgiLCJjaGlsZFNlbGVjdFJlc3VsdCIsImJhYmlTZWxlY3RNaW4iLCJiYWJpU2VsZWN0TWF4IiwiYmFiaVNlbGVjdFJlc3VsdCIsInZpc2l0b3JIb3ZlckJpZyIsIm5hbUJpZ0hvdmVyIiwidmlzaXRvckhvdmVyQ2hpbGQiLCJuYW1DaGlsZEhvdmVyIiwidmlzaXRvckhvdmVyQmFiaSIsIm5hbUJhYmlIb3ZlciIsInZpc2l0b3JTdW1tVGV4dCIsImJ0bkNsZWFyVmlzaXRvciIsImJsb2NrU2VhcmNoIiwiYmxvY2tTZWFyY2hUYXJnZXQiLCJ0YWdOYW1lIiwiYmxvY2tTZWFyY2hUYXJnZXRQYXJlbnQiLCJibG9ja1NlYXJjaFRhcmdldFBhcmVudFBhcmVudCIsImJsb2NrU2VhcmNoVGFyZ2V0UGFyZW50UGFyZW50SHJlZiIsImJsb2NrU2VhcmNoVGFyZ2V0SHJlZlBhcmVudCIsImJsb2NrU2VhcmNoVGFyZ2V0SHJlZkNoaWxkcmVuIiwiYmxvY2tTZWFyY2hUYXJnZXRDaGlsZHJlbiIsIm51bWJlclNsaWRlQWN0aXZlIiwiY2xhc3NOYW1lIiwicnVuU2xpZGVyIiwicmVtb3ZlQnV0dG9uIiwic2V0VGltZW91dCIsImJhY2siLCJuZXh0Iiwic2xpZGVyIiwibWFyayIsIm5vbVNsaWRlIiwic2xpZGVJbmRleCIsInNob3dTbGlkZXMiLCJidXR0b25CYWNrIiwiYnV0dG9uTmV4dCIsIm1pbnVzU2xpZGUiLCJwbHVzU2xpZGUiLCJuIiwic2xpZGVzIiwiZG90cyIsInJlcGxhY2UiLCJkYXRlTGl2ZSIsInJhbmdlRGF0ZSIsImZvcm1WaXNpdG9ySW5wdXQiLCJkYXRlcGlja2VyQmxvY2siLCJpbnNlcnRDYWxlbmRhciIsImluc2VydFZpc2l0b3IiLCJhcHBseVNlbGVjdCIsImJ1dHRvbkNhbGVuZGFyIiwiYnRuRm9ybSIsImNhbGVuZGFyT3V0cHV0IiwiYnRuQ2FsZW5kYXJSZXN1bHQiLCJidG5DYWxlbmRhckNsZWFyIiwiYnRuQ2FsZW5kYXJBcHBseSIsImNhbGVuZGFyRGVsZXRlIiwiYnRuQ2xpY2siLCJidG5JbnB1dCIsImJsb2NrQ2FsZW5kYXIiLCJkYXRlcGlja2VyQ3JlYXRlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiJCIsImRhdGVwaWNrZXIiLCJyYW5nZSIsInRvZ2dsZVNlbGVjdGVkIiwibXVsdGlwbGVEYXRlc1NlcGFyYXRvciIsIm1pbkRhdGUiLCJEYXRlIiwib25TZWxlY3QiLCJzZWxlY3RlZERhdGVzIiwidW5kZWZpbmVkIiwiaW5kZXhPZiIsIm1keUNhbGVuZGFyIiwic3BsaXQiLCJtZHlTdGFydCIsIm1keUVuZCIsInRpdGxlU3VtbU1pbiIsInRpdGxlU3VtbU1heCIsImlucHV0c1J5Iiwic2xpZGVyV2lkdGgiLCJtaW5SYW5nZSIsIm1heFJhbmdlIiwib3V0cHV0V2lkdGgiLCJ0aHVtYldpZHRoIiwidGh1bWJCb3JkZXJXaWR0aCIsInRyYWNrSGVpZ2h0IiwidGhlVmFsdWUiLCJpc0RyYWdnaW5nMCIsImlzRHJhZ2dpbmcxIiwicmFuZ2VLIiwiY29udGFpbmVyIiwidGh1bWJSZWFsV2lkdGgiLCJzdHlsZSIsImhlaWdodCIsIndpZHRoIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJ0cmFjayIsInRodW1icyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJib3JkZXJXaWR0aCIsInRvcCIsImxlZnQiLCJvdXRwdXRzIiwibGluZUhlaWdodCIsIk1hdGgiLCJzcXJ0IiwiaW5uZXJIVE1MIiwiZXZ0IiwibW91c2VQb3MiLCJvTW91c2VQb3MiLCJ0aGVWYWx1ZTAiLCJyb3VuZCIsIngiLCJ0aGVWYWx1ZTEiLCJlbG10IiwiQ2xpZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFgiLCJ5IiwiY2xpZW50WSJdLCJzb3VyY2VSb290IjoiIn0=