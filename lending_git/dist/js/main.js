/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./block/searchform/searchform.js":
/*!****************************************!*\
  !*** ./block/searchform/searchform.js ***!
  \****************************************/
/***/ (() => {

var coming = document.querySelector('.form-coming-button');
var dateLive = document.querySelector('.form-date-button');
var startDate = document.querySelector('.form-coming_input'); //дата въезда
//let rangeDate = document.querySelector('.form-date_input');     //дата въезда

var departure = document.querySelector('.form-departure-button');
var endDate = document.querySelector('.form-departure_input'); //дата выезда

var formVisitorInput = document.querySelector('.form-visitor-input');
var datepickerBlock = "<div class=\"datepicker-here\" data-position=\"right top\"></div>";
var insertCalendar = "<section class=\"calendar calendar_props\">\n\t\t\t\t\t\t\t\t\t\t\t\t".concat(datepickerBlock, "\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"calendar-bottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"button-clear calendar_button \">\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"button-apply calendar_button\">\u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</section>");
var insertVisitor = ""; //применить

var applySelect = document.querySelector('.batton-arrow_apply'); //кнопка подобрать

console.log(coming); //console.log(dateLive);
//выборка дат из календаря-----------------

coming.addEventListener('click', function () {
  //dateLive.addEventListener('click', function() {
  console.log('нажата кнопка даты пребывания в отеле');
  var buttonCalendar = document.querySelector('.form-coming'); //let buttonCalendar = document.querySelector('.form-date');

  var btnForm = '.form-date_input';
  calendarOutput(buttonCalendar, btnForm); //вывод календаря

  btnCalendarResult(); //кнопки в календаре
});
departure.addEventListener('click', function () {
  console.log('нажата кнопка ВЫЕЗД');
  var buttonCalendar = document.querySelector('.form-departure');
  var btnForm = '.form-departure_input';
  calendarOutput(buttonCalendar, btnForm);
  btnCalendarResult();
}); //функция вывода результатов выбора данных

function btnCalendarResult() {
  var btnCalendarClear = document.querySelector('.button-clear');
  var btnCalendarApply = document.querySelector('.button-apply');
  btnCalendarApply.addEventListener('click', function () {
    console.log('Нажата кнопка ПРИМЕНИТЬ');
    calendarDelete();
  });
  btnCalendarClear.addEventListener('click', function () {
    console.log('Нажата кнопка ОЧИСТИТЬ'); //сюда вписать диапазон дат
    //rangeDate.value = 'ДД.МММ. - ДД.МММ.';

    startDate.value = 'ДД.ММ.ГГГГ';
    endDate.value = 'ДД.ММ.ГГГГ';
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
          console.log(mdyEnd);
          startDate.value = mdyStart;
          endDate.value = mdyEnd; //rangeDate.value = 'ДД.МММ. - ДД.МММ.';
          //rangeDate.value = mdyStart + ' - ' + mdyEnd;
        } //return mdyCalendar;

      }
    }); //$('.datepicker-here').data('datepicker');
  });
} //------------------------------
//-----------------кнопка подобрать номер--------//


applySelect.addEventListener('click', function () {
  //составим переменные запроса и запишим в локалсторадж
  var applySelectData = startDate.value.trim() + ';' + endDate.value.trim() + ';' + formVisitorInput.value.trim();
  console.log(applySelectData);
  localStorage.removeItem('dateIn');
  localStorage.removeItem('dateOut');
  localStorage.removeItem('visitor');
  localStorage.setItem('dateIn', startDate.value.trim());
  localStorage.setItem('dateOut', endDate.value.trim());
  localStorage.setItem('visitor', formVisitorInput.value.trim()); //window.open('searchroom.html');
}); //-------------------------------
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

/***/ "./block/calendar/calendar.css":
/*!*************************************!*\
  !*** ./block/calendar/calendar.css ***!
  \*************************************/
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
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_calendar_calendar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block/calendar/calendar.css */ "./block/calendar/calendar.css");
/* harmony import */ var _block_visitor_visitor_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block/visitor/visitor.css */ "./block/visitor/visitor.css");
/* harmony import */ var _block_searchform_searchform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block/searchform/searchform.js */ "./block/searchform/searchform.js");
/* harmony import */ var _block_searchform_searchform_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_block_searchform_searchform_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _block_visitor_visitor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block/visitor/visitor.js */ "./block/visitor/visitor.js");
/* harmony import */ var _block_visitor_visitor_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_block_visitor_visitor_js__WEBPACK_IMPORTED_MODULE_3__);
//сюда подключаем только то что общее для всех страниц!!!!!!!!!!!!
//подключаем jQuery в сборку, но лучьше в html
//import $ from 'jquery';        //берем из nodemodules
//import * as $ from 'jquery';
//global.jQuery = $;
//global.$ = $;
//-----------------------------------------//
//-------подключение стилей----------------//
//-------общие стили-----------------------//
//import './css/font.css';                            //стили шрифтов
//-------стили модулей---------------------//
//import './modules/logo/logo.css';                   //стиль логотипа
//import './modules/cklikbutton/cklikbutton.css';     //стили синей кнопки
//import './modules/cklikbutton/cklikbuttonarrow.css';//стили синей кнопки с белой стрелкой
//import './modules/cklikbutton/cklikbuttonwite.css'; //стили белой кнопки
//import './modules/maintext/maintext.css';           //вывод текста описания
//import './modules/textfield/textfield.css';         //текстовые блоки
//import './modules/radiobutton/radiobutton.css';     //переключатель радиоботоны
//import './modules/maskedfield/maskedfield.css';     //маска ввода в поле
//import './modules/togglebutton/togglebutton.css';   //переключатель он/офф
//import './modules/datedrop/datedrop.css';           //поля ввода даты
//import './modules/dropdown/dropdown.css';           //выподающие списки
//import './modules/rangeslider/rangeslider.css';  //модуль слайдера
//------css основных блоков----------------//
//import './css/searchroom.css';                      //стиль страницы вывода поиска
//import './block/header/header-style.css';         //основной стиль хедера
//import './block/menutop/menutop.css';             //стили верхнего меню
//import './block/searchform/searchform.css';       //форма поиска номеров
//import './block/footer/footerstyle.css';          //общий стиль для футера
//import './block/footer/menu/footermenu.css';      //блок меню
//import './block/footer/subscribe/subscribe.css';  //блок рассылок
//import './block/footer/company/advert.css';       //реклама под лого
//import './block/footer/company/company.css';      //блок лого и рекламы
//import './block/footer/copyrite/copyrite.css';    //блок копирайта
//import './block/footer/social/social.css';        //блок соцсетей
//import './block/registration/registration.css';   //блок регистрации
 //блок вывода календаря

 //блок вывода колличества гостей
//---------------------------//
//подключение отдельных страниц
//import './formelement.html';
//import html from 'registration.html';
//---------------------------//
//---------------------------//
//подключение скриптов
//simport './block/calendar/calendar.js';


 //import './js/searchroom.js';              //скрипт результатов поиска
//import './modules/rangeslider/rangeslider.js';        //скрипт слайдера
//import btnCount from './button.js';
//import btnregisration from './modules/registration/registration.js';         //кнопка вывода формы регистрации
//---------------------------//
//подключение datepicker
//import './block/datepicker/datepicker.css';
//import './block/datepicker/datepicker.js';
//import './block/datepicker/datepicker.min.css';
//import './block/datepicker/datepicker.min.js';
//---------------------------------//
//import "./jquery-3.4.1.min.js";
//---------------------------//
//--------------Подключение картинок---------------
//import Icon from './icon.png';
//основной стиль страницы со стилями относящимеся только к странице
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0NBQ2tEOztDQUNBO0FBQ2xEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7Q0FFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQSxtRSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Jsb2NrL3NlYXJjaGZvcm0vc2VhcmNoZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ibG9jay92aXNpdG9yL3Zpc2l0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svY2FsZW5kYXIvY2FsZW5kYXIuY3NzPzcwMDAiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svdmlzaXRvci92aXNpdG9yLmNzcz8wODJlIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBjb21pbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1jb21pbmctYnV0dG9uJyk7XHJcbmxldCBkYXRlTGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRhdGUtYnV0dG9uJyk7XHJcbmxldCBzdGFydERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1jb21pbmdfaW5wdXQnKTsgICAgIC8v0LTQsNGC0LAg0LLRitC10LfQtNCwXHJcbi8vbGV0IHJhbmdlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRhdGVfaW5wdXQnKTsgICAgIC8v0LTQsNGC0LAg0LLRitC10LfQtNCwXHJcbmxldCBkZXBhcnR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1kZXBhcnR1cmUtYnV0dG9uJyk7XHJcbmxldCBlbmREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tZGVwYXJ0dXJlX2lucHV0Jyk7ICAvL9C00LDRgtCwINCy0YvQtdC30LTQsFxyXG5sZXQgZm9ybVZpc2l0b3JJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXZpc2l0b3ItaW5wdXQnKTtcclxubGV0IGRhdGVwaWNrZXJCbG9jayA9IGA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1oZXJlXCIgZGF0YS1wb3NpdGlvbj1cInJpZ2h0IHRvcFwiPjwvZGl2PmA7XHJcbmxldCBpbnNlcnRDYWxlbmRhciA9IGA8c2VjdGlvbiBjbGFzcz1cImNhbGVuZGFyIGNhbGVuZGFyX3Byb3BzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCR7ZGF0ZXBpY2tlckJsb2NrfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FsZW5kYXItYm90dG9tXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJ1dHRvbi1jbGVhciBjYWxlbmRhcl9idXR0b24gXCI+0L7Rh9C40YHRgtC40YLRjDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJidXR0b24tYXBwbHkgY2FsZW5kYXJfYnV0dG9uXCI+0L/RgNC40LzQtdC90LjRgtGMPC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zZWN0aW9uPmA7XHJcbmxldCBpbnNlcnRWaXNpdG9yID0gYGA7XHJcbi8v0L/RgNC40LzQtdC90LjRgtGMXHJcbmxldCBhcHBseVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0b24tYXJyb3dfYXBwbHknKTsgICAgIC8v0LrQvdC+0L/QutCwINC/0L7QtNC+0LHRgNCw0YLRjFxyXG5cclxuY29uc29sZS5sb2coY29taW5nKTtcclxuLy9jb25zb2xlLmxvZyhkYXRlTGl2ZSk7XHJcblxyXG5cclxuLy/QstGL0LHQvtGA0LrQsCDQtNCw0YIg0LjQtyDQutCw0LvQtdC90LTQsNGA0Y8tLS0tLS0tLS0tLS0tLS0tLVxyXG5jb21pbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuLy9kYXRlTGl2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdGNvbnNvbGUubG9nKCfQvdCw0LbQsNGC0LAg0LrQvdC+0L/QutCwINC00LDRgtGLINC/0YDQtdCx0YvQstCw0L3QuNGPINCyINC+0YLQtdC70LUnKTtcclxuXHRsZXQgYnV0dG9uQ2FsZW5kYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1jb21pbmcnKTtcclxuXHQvL2xldCBidXR0b25DYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRhdGUnKTtcclxuXHRsZXQgYnRuRm9ybSA9ICcuZm9ybS1kYXRlX2lucHV0JztcclxuXHRjYWxlbmRhck91dHB1dChidXR0b25DYWxlbmRhciwgYnRuRm9ybSk7ICAgICAgICAgICAgICAgICAgIC8v0LLRi9Cy0L7QtCDQutCw0LvQtdC90LTQsNGA0Y9cclxuXHJcblx0YnRuQ2FsZW5kYXJSZXN1bHQoKTsgICAgICAgICAgICAgICAgLy/QutC90L7Qv9C60Lgg0LIg0LrQsNC70LXQvdC00LDRgNC1XHJcbn0pO1xyXG5cclxuZGVwYXJ0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0Y29uc29sZS5sb2coJ9C90LDQttCw0YLQsCDQutC90L7Qv9C60LAg0JLQq9CV0JfQlCcpO1xyXG5cdGxldCBidXR0b25DYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRlcGFydHVyZScpO1xyXG5cdGxldCBidG5Gb3JtID0gJy5mb3JtLWRlcGFydHVyZV9pbnB1dCc7XHJcblx0Y2FsZW5kYXJPdXRwdXQoYnV0dG9uQ2FsZW5kYXIsIGJ0bkZvcm0pO1xyXG5cdGJ0bkNhbGVuZGFyUmVzdWx0KCk7XHJcbn0pO1xyXG5cclxuLy/RhNGD0L3QutGG0LjRjyDQstGL0LLQvtC00LAg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDQstGL0LHQvtGA0LAg0LTQsNC90L3Ri9GFXHJcbmZ1bmN0aW9uIGJ0bkNhbGVuZGFyUmVzdWx0KCkge1xyXG5cdGxldCBidG5DYWxlbmRhckNsZWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1jbGVhcicpO1xyXG5cdGxldCBidG5DYWxlbmRhckFwcGx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1hcHBseScpO1xyXG5cdFxyXG5cdGJ0bkNhbGVuZGFyQXBwbHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zb2xlLmxvZygn0J3QsNC20LDRgtCwINC60L3QvtC/0LrQsCDQn9Cg0JjQnNCV0J3QmNCi0KwnKTtcclxuXHRcdGNhbGVuZGFyRGVsZXRlKCk7XHJcblx0fSk7XHJcblx0YnRuQ2FsZW5kYXJDbGVhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCfQndCw0LbQsNGC0LAg0LrQvdC+0L/QutCwINCe0KfQmNCh0KLQmNCi0KwnKTtcclxuXHRcdC8v0YHRjtC00LAg0LLQv9C40YHQsNGC0Ywg0LTQuNCw0L/QsNC30L7QvSDQtNCw0YJcclxuXHRcdC8vcmFuZ2VEYXRlLnZhbHVlID0gJ9CU0JQu0JzQnNCcLiAtINCU0JQu0JzQnNCcLic7XHJcblx0XHRzdGFydERhdGUudmFsdWUgPSAn0JTQlC7QnNCcLtCT0JPQk9CTJztcclxuXHRcdGVuZERhdGUudmFsdWUgPSAn0JTQlC7QnNCcLtCT0JPQk9CTJztcclxuXHRcdGNhbGVuZGFyRGVsZXRlKCk7XHJcblx0fSlcclxufVxyXG4vL9GE0YPQvdC60YbQuNGPINGE0L7RgNC80LjRgNC+0LLQsNC90LjRjyDQutCw0LvQtdC90LTQsNGA0Y9cclxuZnVuY3Rpb24gY2FsZW5kYXJPdXRwdXQoYnRuQ2xpY2ssIGJ0bklucHV0KSB7XHJcblx0Y29uc29sZS5sb2coYnRuQ2xpY2spO1xyXG5cdGxldCBibG9ja0NhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyJyk7XHJcblx0aWYgKGJsb2NrQ2FsZW5kYXIgIT0gbnVsbCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ9C30L3QsNGH0LXQvdC40LUgYmxvY2tDYWxlbmRhciAnICsgYmxvY2tDYWxlbmRhcik7XHJcblx0XHRjYWxlbmRhckRlbGV0ZSgpO1xyXG5cdFx0ZGF0ZXBpY2tlckNyZWF0ZShidG5JbnB1dCk7XHJcblx0XHRidG5DbGljay5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZUVuZCcsIGluc2VydENhbGVuZGFyKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZGF0ZXBpY2tlckNyZWF0ZShidG5JbnB1dCk7XHJcblx0XHRidG5DbGljay5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZUVuZCcsIGluc2VydENhbGVuZGFyKTtcclxuXHR9XHJcblxyXG59XHJcbi8v0YTRg9C90LrRhtC40Y8g0YPQtNCw0LvQtdC90LjRjyDQutCw0LvQtdC90LTQsNGA0Y9cclxuZnVuY3Rpb24gY2FsZW5kYXJEZWxldGUoKSB7XHJcblx0bGV0IGJsb2NrQ2FsZW5kYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXInKTtcclxuXHQvL2Jsb2NrQ2FsZW5kYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRibG9ja0NhbGVuZGFyLnJlbW92ZSgpO1xyXG59XHJcbi8v0YTRg9C90LrRhtC40Y8g0LLRi9C30L7QstCwINC00LDRgtCw0L/QuNC60LXRgNCwXHJcbmZ1bmN0aW9uIGRhdGVwaWNrZXJDcmVhdGUoYnRuRm9ybSkge1xyXG5cdC8vbGV0IGJ0bkZvcm0gPSBkXHJcblx0Y29uc29sZS5sb2coJ2J0bkZvcm0gLSAnICsgYnRuRm9ybSk7XHJcblxyXG5cdCQoZnVuY3Rpb24gKCkge1xyXG5cdFx0JCgnLmRhdGVwaWNrZXItaGVyZScpLmRhdGVwaWNrZXIoIHtcclxuXHRcdFx0Ly9hbHRGaWVsZDogYnRuRm9ybSwgICAgICAgICAgICAgICAgICAgLy/QstGL0LPRgNGD0LfQutCwINCyINC/0L7Qu9C1IGJ0bkZvcm1cclxuXHRcdFx0Ly9hbHRGaWVsZERhdGVGb3JtYXQ6ICdkZC5tbS55eXl5JywgICAgLy/RhNC+0YDQvNCw0YIg0LTQsNGC0Ysg0LLRi9Cz0YDRg9C30LrQuFxyXG5cdFx0XHRyYW5nZTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LTQuNCw0L/QsNC30L7QvSDQtNCw0YIg0LLQutC70Y7Rh9C10L1cclxuXHRcdFx0dG9nZ2xlU2VsZWN0ZWQ6IGZhbHNlLCAgICAgICAgICAgICAgIC8vINGA0LDQt9GA0LXRiNC40YLRjCDQstGL0LHQvtGAIDHQuSDQtNCw0YLRi1xyXG5cdFx0XHRtdWx0aXBsZURhdGVzU2VwYXJhdG9yOiAnIC0gJywgICAgICAgLy8g0YDQsNC30LTQtdC70LjRgtC10LvRjCDQtNC40LDQv9Cw0LfQvtC90LAg0LTQsNGCXHJcblx0XHRcdG1pbkRhdGU6IG5ldyBEYXRlKCksICAgICAgICAgICAgICAgICAgLy8g0LfQsNC/0YDQtdGC0LjRgtGMINCy0YvQsdC+0YAg0L3QuNC20LUg0YLQtdC60YPRidC10Lkg0LTQsNGC0YtcclxuXHRcdFx0b25TZWxlY3Q6IGZ1bmN0aW9uIG9uU2VsZWN0KHNlbGVjdGVkRGF0ZXMpIHsgICAgICAgICAgICAgLy/QstGL0LHQvtGA0LrQsCDQtNC40LDQv9Cw0LfQvtC90LBcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhzZWxlY3RlZERhdGVzKTtcclxuXHRcdFx0XHRpZihzZWxlY3RlZERhdGVzICE9PSB1bmRlZmluZWQgJiYgc2VsZWN0ZWREYXRlcyAhPSAnJyAmJiBzZWxlY3RlZERhdGVzLmluZGV4T2YoJy0nKSA+IC0xKXtcclxuXHRcdFx0XHRcdG1keUNhbGVuZGFyID0gc2VsZWN0ZWREYXRlcy5zcGxpdCgnLSAnKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdtZHlDYWxlbmRhciAtICcgKyBtZHlDYWxlbmRhcik7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhtZHlDYWxlbmRhcik7XHJcblx0XHRcdFx0XHRsZXQgbWR5U3RhcnQgPSAobWR5Q2FsZW5kYXJbMF0pO1xyXG5cdFx0XHRcdFx0bGV0IG1keUVuZCA9IChtZHlDYWxlbmRhclsxXSk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhtZHlTdGFydCk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhtZHlFbmQpO1xyXG5cdFx0XHRcdFx0c3RhcnREYXRlLnZhbHVlID0gbWR5U3RhcnQ7XHJcblx0XHRcdFx0XHRlbmREYXRlLnZhbHVlID0gbWR5RW5kO1xyXG5cdFx0XHRcdFx0Ly9yYW5nZURhdGUudmFsdWUgPSAn0JTQlC7QnNCc0JwuIC0g0JTQlC7QnNCc0JwuJztcclxuXHRcdFx0XHRcdC8vcmFuZ2VEYXRlLnZhbHVlID0gbWR5U3RhcnQgKyAnIC0gJyArIG1keUVuZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly9yZXR1cm4gbWR5Q2FsZW5kYXI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Ly8kKCcuZGF0ZXBpY2tlci1oZXJlJykuZGF0YSgnZGF0ZXBpY2tlcicpO1xyXG5cdH0pO1xyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS3QutC90L7Qv9C60LAg0L/QvtC00L7QsdGA0LDRgtGMINC90L7QvNC10YAtLS0tLS0tLS8vXHJcblxyXG5hcHBseVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHQvL9GB0L7RgdGC0LDQstC40Lwg0L/QtdGA0LXQvNC10L3QvdGL0LUg0LfQsNC/0YDQvtGB0LAg0Lgg0LfQsNC/0LjRiNC40Lwg0LIg0LvQvtC60LDQu9GB0YLQvtGA0LDQtNC2XHJcblx0bGV0IGFwcGx5U2VsZWN0RGF0YSA9IHN0YXJ0RGF0ZS52YWx1ZS50cmltKCkgKyAnOycgKyBlbmREYXRlLnZhbHVlLnRyaW0oKSArICc7JyArIGZvcm1WaXNpdG9ySW5wdXQudmFsdWUudHJpbSgpO1xyXG5cdGNvbnNvbGUubG9nKGFwcGx5U2VsZWN0RGF0YSk7XHJcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RhdGVJbicpO1xyXG5cdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdkYXRlT3V0Jyk7XHJcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Zpc2l0b3InKTtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGF0ZUluJywgc3RhcnREYXRlLnZhbHVlLnRyaW0oKSk7XHJcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGVPdXQnLCBlbmREYXRlLnZhbHVlLnRyaW0oKSk7XHJcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Zpc2l0b3InLCBmb3JtVmlzaXRvcklucHV0LnZhbHVlLnRyaW0oKSk7XHJcblx0Ly93aW5kb3cub3Blbignc2VhcmNocm9vbS5odG1sJyk7XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0t0L7Qv9GA0LXQtNC10LvRj9C10Lwg0YDQvtC00LjRgtC10LvRjyDQtNC70Y8g0LLRgdGC0LDQstC60Lgg0LHQu9C+0LrQsFxyXG4vL2xldCBlbGVtZW50Q2xpY2sgPSBjb21pbmc7XHJcblxyXG4vL2VsZW1lbnRDbGljay5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4vL1x0bGV0IGVsZW1lbnRUYXJnZXQgPSBldmVudC50YXJnZXQ7ICAgICAgLy/QutC90L7Qv9C60LBcclxuLy9cdGNvbnNvbGUubG9nKGVsZW1lbnRUYXJnZXQpO1xyXG4vL1x0bGV0IHBhcmVudEVsZW1lbnRUYXJnZXQgPSBlbGVtZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQ7ICAgICAgIC8v0YTQvtGA0LzQsCDQt9Cw0L/RgNC+0YHQsFxyXG4vL1x0Y29uc29sZS5sb2cocGFyZW50RWxlbWVudFRhcmdldCk7XHJcbi8vXHRsZXQgdGFibGVUYXJnZXRQYXJlbnQgPSBwYXJlbnRFbGVtZW50VGFyZ2V0LmNoaWxkcmVuOyAgICAgICAgLy8g0LLRgdGPINGE0L7RgNC80LBcclxuLy9cdGNvbnNvbGUubG9nKHRhYmxlVGFyZ2V0UGFyZW50KTtcclxuLy9cdC8vdGV4dFdyaXRlLnRleHRDb250ZW50ID0gdGFibGVUYXJnZXRQYXJlbnRbMl0udGV4dENvbnRlbnQ7XHJcbi8vXHRjb25zb2xlLmxvZyh0YWJsZVRhcmdldFBhcmVudCk7XHJcbi8vfTtcclxuXHJcblxyXG4vLzxzZWN0aW9uIGNsYXNzTmFtZT1cImNhbGVuZGFyXCI+XHJcbi8vXHQ8ZGl2IGNsYXNzTmFtZT1cImRhdGVwaWNrZXItaGVyZVwiIGRhdGEtcG9zaXRpb249XCJyaWdodCB0b3BcIiBkYXRhLXJhbmdlPVwidHJ1ZVwiXHJcbi8vXHRcdFx0IGRhdGEtbXVsdGlwbGUtZGF0ZXMtc2VwYXJhdG9yPVwiIC0gXCI+PC9kaXY+XHJcbi8vXHQ8ZGl2IGNsYXNzTmFtZT1cImNhbGVuZGFyLWJvdHRvbVwiPlxyXG4vL1x0XHQ8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jbGVhciBjYWxlbmRhcl9idXR0b24gXCI+0L7Rh9C40YHRgtC40YLRjDwvZGl2PlxyXG4vL1x0XHQ8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1hcHBseSBjYWxlbmRhcl9idXR0b25cIj7Qv9GA0LjQvNC10L3QuNGC0Yw8L2Rpdj5cclxuLy9cdDwvZGl2PlxyXG4vLzwvc2VjdGlvbj4iLCJcclxuLy/RgtC40L8g0Lgg0LrQvtC70LvQuNGH0LXRgdGC0LLQviDQs9C+0YHRgtC10LlcclxubGV0IHZpc2l0b3JCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS12aXNpdG9yLWJ1dHRvbicpO1xyXG5sZXQgdmlzaXRvcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tdmlzaXRvci1pbnB1dCcpOyAgLy/Qv9C+0LvQtSDQstGL0LLQvtC00LAg0LrQvtC70LvQuNGH0LXRgdGC0LLQsCDQs9C+0YHRgtC10LlcclxubGV0IHZpc2l0b3JGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tdmlzaXRvcicpO1xyXG5sZXQgdmlzaXRvckRyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC12aXNpdG9yJyk7XHJcbmxldCB2aXNpdG9yQnRuU2F2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWlucHV0LW1lbnVfc2F2ZScpO1xyXG5sZXQgdmlzaXRvckJ0bkNsZWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtaW5wdXQtbWVudV9jbGVhcicpO1xyXG4vL9GA0LDRgdGH0LXRgiDQs9C+0YHRgtC10LlcclxuLy/QstC30YDQvtGB0LvRi9C1XHJcbmxldCBiaWdTZWxlY3RNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iaWctc2VsZWN0LXNtYWxsJyk7XHJcbmxldCBiaWdTZWxlY3RNYXggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iaWctc2VsZWN0LW1vcmUnKTtcclxubGV0IGJpZ1NlbGVjdFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWJpZy1zZWxlY3QtcmVzdWx0Jyk7ICAgLy/RgdC60L7Qu9GM0LrQviDQstC30YDQvtGB0LvRi9GFXHJcbi8v0LTQtdGC0LhcclxubGV0IGNoaWxkU2VsZWN0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtY2hpbGRyZW4tc2VsZWN0LXNtYWxsJyk7XHJcbmxldCBjaGlsZFNlbGVjdE1heCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWNoaWxkcmVuLXNlbGVjdC1tb3JlJyk7XHJcbmxldCBjaGlsZFNlbGVjdFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWNoaWxkcmVuLXNlbGVjdC1yZXN1bHQnKTsgIC8v0YHQutC+0LvRjNC60L4g0LTQtdGC0LXQuVxyXG4vL9C80LvQsNC00LXQvdGG0YtcclxubGV0IGJhYmlTZWxlY3RNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1iYWJpZXMtc2VsZWN0LXNtYWxsJyk7XHJcbmxldCBiYWJpU2VsZWN0TWF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmFiaWVzLXNlbGVjdC1tb3JlJyk7XHJcbmxldCBiYWJpU2VsZWN0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtYmFiaWVzLXNlbGVjdC1yZXN1bHQnKTsgICAvL9GB0LrQvtC70YzQutC+INC80LvQsNC00LXQvdGG0LXQslxyXG5cclxuXHJcbmNvbnNvbGUubG9nKHZpc2l0b3JCdG4pO1xyXG5jb25zb2xlLmxvZyh2aXNpdG9ySW5wdXQpO1xyXG5jb25zb2xlLmxvZyh2aXNpdG9yRm9ybSk7XHJcbmNvbnNvbGUubG9nKHZpc2l0b3JEcm9wKTtcclxuXHJcbmNvbnNvbGUubG9nKGJpZ1NlbGVjdE1pbik7XHJcbmNvbnNvbGUubG9nKGJpZ1NlbGVjdE1heCk7XHJcbmNvbnNvbGUubG9nKGJpZ1NlbGVjdFJlc3VsdCk7XHJcbmNvbnNvbGUubG9nKGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcbmNvbnNvbGUubG9nKGJpZ1NlbGVjdFJlc3VsdC52YWx1ZSk7XHJcblxyXG5jb25zb2xlLmxvZyhjaGlsZFNlbGVjdE1pbik7XHJcbmNvbnNvbGUubG9nKGNoaWxkU2VsZWN0TWF4KTtcclxuY29uc29sZS5sb2coY2hpbGRTZWxlY3RSZXN1bHQpO1xyXG5jb25zb2xlLmxvZyhjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcbmNvbnNvbGUubG9nKGNoaWxkU2VsZWN0UmVzdWx0LnZhbHVlKTtcclxuXHJcbmNvbnNvbGUubG9nKGJhYmlTZWxlY3RNaW4pO1xyXG5jb25zb2xlLmxvZyhiYWJpU2VsZWN0TWF4KTtcclxuY29uc29sZS5sb2coYmFiaVNlbGVjdFJlc3VsdCk7XHJcbmNvbnNvbGUubG9nKGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5jb25zb2xlLmxvZyhiYWJpU2VsZWN0UmVzdWx0LnZhbHVlKTtcclxuXHJcbnZpc2l0b3JJbnB1dC52YWx1ZSA9ICfQodC60L7Qu9GM0LrQviDQs9C+0YHRgtC10LknO1xyXG4vLy0tLS3Qv9GA0L7Qv9C40YHQsNGC0Ywg0LDQutGC0LjQstCw0YbQuNGOINC60L3QvtC/0L7QuiDQv9GA0Lgg0LfQvdCw0YfQtdC90LjQuCDQsdC+0LvQtdC1IDBcclxuZnVuY3Rpb24gdmlzaXRvckhvdmVyQmlnKG5hbUJpZ0hvdmVyKSB7XHJcblx0aWYgKG5hbUJpZ0hvdmVyID49IDEpIHtcclxuXHRcdGJpZ1NlbGVjdE1pbi5jbGFzc0xpc3QuYWRkKCdkcm9wLXNlbGVjdF9zbWFsbC1ob3ZlcicpO1xyXG5cdFx0Y29uc29sZS5sb2cobmFtQmlnSG92ZXIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRiaWdTZWxlY3RNaW4uY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHRcdGNvbnNvbGUubG9nKG5hbUJpZ0hvdmVyKTtcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gdmlzaXRvckhvdmVyQ2hpbGQobmFtQ2hpbGRIb3Zlcikge1xyXG5cdGlmIChuYW1DaGlsZEhvdmVyID49IDEpIHtcclxuXHRcdGNoaWxkU2VsZWN0TWluLmNsYXNzTGlzdC5hZGQoJ2Ryb3Atc2VsZWN0X3NtYWxsLWhvdmVyJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGNoaWxkU2VsZWN0TWluLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3Atc2VsZWN0X3NtYWxsLWhvdmVyJyk7XHJcblx0fVxyXG59XHJcbmZ1bmN0aW9uIHZpc2l0b3JIb3ZlckJhYmkobmFtQmFiaUhvdmVyKSB7XHJcblx0aWYgKG5hbUJhYmlIb3ZlciA+PSAxKSB7XHJcblx0XHRiYWJpU2VsZWN0TWluLmNsYXNzTGlzdC5hZGQoJ2Ryb3Atc2VsZWN0X3NtYWxsLWhvdmVyJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGJhYmlTZWxlY3RNaW4uY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC1zZWxlY3Rfc21hbGwtaG92ZXInKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vLS0tLS3RgdGD0LzQvNC40YDQvtCy0LDQvdC40LUg0LPQvtGB0YLQtdC5INC90LXRgiDRgdC80YvRgdC70LAtLS0tLS0tLS0tLS8vXHJcbi8vZnVuY3Rpb24gdmlzaXRvclN1bW0oYmlnTmFtLCBjaGlsZE5hbSwgYmFiaU5hbSkge1xyXG4vL1x0Y29uc29sZS5sb2coTnVtYmVyLnBhcnNlSW50KGJpZ05hbSkpO1xyXG4vL1x0Y29uc29sZS5sb2coTnVtYmVyLnBhcnNlSW50KGNoaWxkTmFtKSk7XHJcbi8vXHRjb25zb2xlLmxvZyhOdW1iZXIucGFyc2VJbnQoYmFiaU5hbSkpO1xyXG4vL1x0bGV0IGZ1bGxTdW1tID0gYmlnTmFtICsgY2hpbGROYW0gKyBiYWJpTmFtO1xyXG4vL1x0Y29uc29sZS5sb2coZnVsbFN1bW0pO1xyXG4vL1x0dmlzaXRvclN1bW1UZXh0KGZ1bGxTdW1tKTtcclxuLy9cdHZpc2l0b3JIb3ZlcihiaWdOYW0sIGNoaWxkTmFtLCBiYWJpTmFtKTtcclxuLy99XHJcblxyXG4vLy0tLS0t0YDQsNC30LLQsNGA0L7RgiDRgdC/0LjRgdC60LAg0LLRi9Cx0L7RgNC60LgtLS0tLS0vL1xyXG52aXNpdG9yQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdC8vbGV0IHZpc2l0b3JEcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AtdmlzaXRvcicpO1xyXG5cdGNvbnNvbGUubG9nKCd2aXNpdG9yRHJvcCcpO1xyXG5cdGNvbnNvbGUubG9nKHZpc2l0b3JEcm9wKTtcclxuXHQvL3Zpc2l0b3JEcm9wLnN0eWxlLmRpc3BsYXkgPSAnZGlzcGxheSc7XHJcblx0Ly92aXNpdG9yRHJvcC5jbGFzc0xpc3QuYWRkKCdkcm9wLXZpc2l0b3JfZGlzcGxheScpO1xyXG5cdHZpc2l0b3JEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3AtdmlzaXRvcl9kaXNwbGF5Jyk7XHJcblx0dmlzaXRvcklucHV0LmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm0tdmlzaXRvci1pbnB1dF9ib3JkZXInKTtcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLdCy0YvQsdC+0YDQutCwINC60L7Qu9C40YfQtdGB0YLQsiDQs9C+0YHRgtC10LktLS0tLS0vL1xyXG4vLy0tLS0t0LLQt9GA0L7RgdC70YvQtS0tLS0vL1xyXG5iaWdTZWxlY3RNaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA+PSAxKSB7XHJcblx0XHRiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPSBOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSAtIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdFx0Ly9idG5DbGVhclZpc2l0b3IoKTtcclxuXHRcdHZpc2l0b3JIb3ZlckJpZyhOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tKE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpLCAwLCAwKTtcclxuXHRcdC8vdmlzaXRvclN1bW1UZXh0KE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdHZpc2l0b3JTdW1tVGV4dCgpO1xyXG5cdFx0Ly/QvdCwINGB0YPQvNC80YMgMSDQsNGA0LPRg9C80LXQvdGCLCDRgtCw0LrQttC1INGB0Y7QtNCwINCy0YHRgtCw0LLQu9GP0LXQvCDRhdC+0LLQtdGAXHJcblx0fVxyXG59KTtcclxuYmlnU2VsZWN0TWF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgIT0gLTEpIHtcclxuXHRcdGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgMTtcclxuXHRcdGNvbnNvbGUubG9nKGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHQvL2J0bkNsZWFyVmlzaXRvcigpO1xyXG5cdFx0dmlzaXRvckhvdmVyQmlnKE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdC8vdmlzaXRvclN1bW0oTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCksIDAsIDApO1xyXG5cdFx0Ly92aXNpdG9yU3VtbVRleHQoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0dmlzaXRvclN1bW1UZXh0KCk7XHJcblx0fVxyXG59KTtcclxuLy8tLS0tLdC00LXRgtC4LS0tLS8vXHJcbmNoaWxkU2VsZWN0TWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA+PSAxKSB7XHJcblx0XHRjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgLSAxO1xyXG5cdFx0Y29uc29sZS5sb2coY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpO1xyXG5cdFx0Ly9idG5DbGVhclZpc2l0b3IoKTtcclxuXHRcdHZpc2l0b3JIb3ZlckNoaWxkKE51bWJlci5wYXJzZUludChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0Ly92aXNpdG9yU3VtbSgwLCBOdW1iZXIucGFyc2VJbnQoY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpLCAwKTtcclxuXHRcdC8vdmlzaXRvclN1bW1UZXh0KE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdHZpc2l0b3JTdW1tVGV4dCgpO1xyXG5cdH1cclxufSk7XHJcbmNoaWxkU2VsZWN0TWF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCAhPSAtMSkge1xyXG5cdFx0Y2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPSBOdW1iZXIucGFyc2VJbnQoY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgMTtcclxuXHRcdGNvbnNvbGUubG9nKGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdC8vYnRuQ2xlYXJWaXNpdG9yKCk7XHJcblx0XHR2aXNpdG9ySG92ZXJDaGlsZChOdW1iZXIucGFyc2VJbnQoY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHRcdC8vdmlzaXRvclN1bW0oMCwgTnVtYmVyLnBhcnNlSW50KGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSwgMCk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tVGV4dChOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHR2aXNpdG9yU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG4vLy0tLS0t0LzQu9Cw0LTQtdC90YbRiy0tLS0vL1xyXG5iYWJpU2VsZWN0TWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdGlmIChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID49IDEpIHtcclxuXHRcdGJhYmlTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQgPSBOdW1iZXIucGFyc2VJbnQoYmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkgLSAxO1xyXG5cdFx0Y29uc29sZS5sb2coYmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCk7XHJcblx0XHQvL2J0bkNsZWFyVmlzaXRvcigpO1xyXG5cdFx0dmlzaXRvckhvdmVyQmFiaShOdW1iZXIucGFyc2VJbnQoYmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0Ly92aXNpdG9yU3VtbSgwLCAwLCBOdW1iZXIucGFyc2VJbnQoYmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0Ly92aXNpdG9yU3VtbVRleHQoTnVtYmVyLnBhcnNlSW50KGJpZ1NlbGVjdFJlc3VsdC50ZXh0Q29udGVudCkpO1xyXG5cdFx0dmlzaXRvclN1bW1UZXh0KCk7XHJcblx0fVxyXG59KTtcclxuYmFiaVNlbGVjdE1heC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoYmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCAhPSAtMSkge1xyXG5cdFx0YmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSArIDE7XHJcblx0XHRjb25zb2xlLmxvZyhiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRcdC8vYnRuQ2xlYXJWaXNpdG9yKCk7XHJcblx0XHR2aXNpdG9ySG92ZXJCYWJpKE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tKDAsIDAsIE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHQvL3Zpc2l0b3JTdW1tVGV4dChOdW1iZXIucGFyc2VJbnQoYmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0XHR2aXNpdG9yU3VtbVRleHQoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8vLS0tLdCk0YPQvdC60YbQuNGPINGH0LjRgdC70L7QstGL0YUg0YHQutC70L7QvdC10L3QuNC5INC60L7Qu9C40YfQtdGB0YLQstCwINCz0L7RgdGC0LXQuVxyXG5mdW5jdGlvbiB2aXNpdG9yU3VtbVRleHQoKSB7XHJcblx0Ly9pcHV0TmFtID0gTnVtYmVyLnBhcnNlSW50KGlwdXROYW0pO1xyXG5cdGxldCBpbnB1dE51bSA9IE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpICsgTnVtYmVyLnBhcnNlSW50KGNoaWxkU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSArIE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KTtcclxuXHRjb25zb2xlLmxvZygnaW5wdXROdW0nKTtcclxuXHRjb25zb2xlLmxvZyhpbnB1dE51bSk7XHJcblx0YnRuQ2xlYXJWaXNpdG9yKGlucHV0TnVtKTtcclxuXHQvL2Z1bGxTdW1tID0gTnVtYmVyKGZ1bGxTdW1tKTtcclxuXHRpZiAoaW5wdXROdW0gPT0gMCkge1xyXG5cdFx0Ly92aXNpdG9ySW5wdXQudGV4dENvbnRlbnQgPSAn0KHQutC+0LvRjNC60L4g0LPQvtGB0YLQtdC5JztcclxuXHRcdHZpc2l0b3JJbnB1dC52YWx1ZSA9ICfQodC60L7Qu9GM0LrQviDQs9C+0YHRgtC10LknO1xyXG5cdH1cclxuXHRpZiAoKGlucHV0TnVtID09IDEpIHx8IChpbnB1dE51bSA9PSAyMSkpIHtcclxuXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gaXB1dE5hbSArICcg0LPQvtGB0YLRjCc7XHJcblx0XHR2aXNpdG9ySW5wdXQudmFsdWUgPSBpbnB1dE51bSArICcg0LPQvtGB0YLRjCc7XHJcblx0fVxyXG5cdGlmICgoaW5wdXROdW0gPiAxICYmIGlucHV0TnVtIDwgNSkgfHwgKGlucHV0TnVtID4gMjEgJiYgaW5wdXROdW0gPCAyNSkpIHtcclxuXHRcdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50ID0gaXB1dE5hbSArICcg0LPQvtGB0YLRjyc7XHJcblx0XHR2aXNpdG9ySW5wdXQudmFsdWUgPSBpbnB1dE51bSArICcg0LPQvtGB0YLRjyc7XHJcblx0fVxyXG5cdGlmICgoaW5wdXROdW0gPiA0ICYmIGlucHV0TnVtIDwgMjEpIHx8IChpbnB1dE51bSA+IDI0ICYmIGlucHV0TnVtIDwgMzEpKSB7XHJcblx0XHQvL3Zpc2l0b3JJbnB1dC50ZXh0Q29udGVudCA9IGlwdXROYW0gKyAnINCz0L7RgdGC0LXQuSc7XHJcblx0XHR2aXNpdG9ySW5wdXQudmFsdWUgPSBpbnB1dE51bSArICcg0LPQvtGB0YLQtdC5JztcclxuXHR9XHJcblx0aWYgKGlucHV0TnVtID49IDMxKSB7XHJcblx0XHQvL3Zpc2l0b3JJbnB1dC50ZXh0Q29udGVudCA9ICfQodC70LjRiNC60L7QvCDQvNC90L7Qs9C+ISdcclxuXHRcdHZpc2l0b3JJbnB1dC52YWx1ZSA9ICfQodC70LjRiNC60L7QvCDQvNC90L7Qs9C+ISdcclxuXHR9XHJcblxyXG5cdC8vdmlzaXRvcklucHV0LnRleHRDb250ZW50XHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS3QstGB0L/Qu9GL0YLQuNC1INC4INC/0YDQvtCy0LXRgNC60LAg0LrQvdC+0L/QutC4INC+0YfQuNGB0YLQuNGC0YwtLS0tLS0tLS0vL1xyXG52aXNpdG9yQnRuQ2xlYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0dmlzaXRvcklucHV0LnZhbHVlID0gJ9Ch0LrQvtC70YzQutC+INCz0L7RgdGC0LXQuSc7XHJcblx0YmlnU2VsZWN0UmVzdWx0LnRleHRDb250ZW50ID0gMDtcclxuXHRjaGlsZFNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IDA7XHJcblx0YmFiaVNlbGVjdFJlc3VsdC50ZXh0Q29udGVudCA9IDA7XHJcblx0dmlzaXRvckhvdmVyQmlnKE51bWJlci5wYXJzZUludChiaWdTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHR2aXNpdG9ySG92ZXJDaGlsZChOdW1iZXIucGFyc2VJbnQoY2hpbGRTZWxlY3RSZXN1bHQudGV4dENvbnRlbnQpKTtcclxuXHR2aXNpdG9ySG92ZXJCYWJpKE51bWJlci5wYXJzZUludChiYWJpU2VsZWN0UmVzdWx0LnRleHRDb250ZW50KSk7XHJcblx0Ly92aXNpdG9yRHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdkcm9wLXZpc2l0b3JfZGlzcGxheScpO1xyXG5cdC8vdmlzaXRvcklucHV0LmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm0tdmlzaXRvci1pbnB1dF9ib3JkZXInKTtcclxuXHRidG5DbGVhclZpc2l0b3IoMCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gYnRuQ2xlYXJWaXNpdG9yKG51bUNsZWFyKSB7XHJcblx0bGV0IGRyb3BJbnB1dE1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1pbnB1dF9wcm9wcycpO1xyXG5cdGlmIChudW1DbGVhciA+IDApIHtcclxuXHRcdHZpc2l0b3JCdG5DbGVhci5jbGFzc0xpc3QuYWRkKCdkcm9wLWlucHV0LW1lbnVfY2xlYXItZGlzcGxheScpO1xyXG5cdFx0ZHJvcElucHV0TWVudS5jbGFzc0xpc3QuYWRkKCdkcm9wLWlucHV0X2ZsZXgnKTtcclxuXHR9XHJcblx0aWYgKG51bUNsZWFyIDw9IDApIHtcclxuXHRcdHZpc2l0b3JCdG5DbGVhci5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLWlucHV0LW1lbnVfY2xlYXItZGlzcGxheScpO1xyXG5cdFx0ZHJvcElucHV0TWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLWlucHV0X2ZsZXgnKTtcclxuXHR9XHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS3QutC90L7Qv9C60LAg0L/RgNC40LzQtdC90LjRgtGMLS0tLS0tLS0tLy9cclxudmlzaXRvckJ0blNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0dmlzaXRvckRyb3AuY2xhc3NMaXN0LnRvZ2dsZSgnZHJvcC12aXNpdG9yX2Rpc3BsYXknKTtcclxuXHR2aXNpdG9ySW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybS12aXNpdG9yLWlucHV0X2JvcmRlcicpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL9GB0Y7QtNCwINC/0L7QtNC60LvRjtGH0LDQtdC8INGC0L7Qu9GM0LrQviDRgtC+INGH0YLQviDQvtCx0YnQtdC1INC00LvRjyDQstGB0LXRhSDRgdGC0YDQsNC90LjRhiEhISEhISEhISEhIVxyXG4vL9C/0L7QtNC60LvRjtGH0LDQtdC8IGpRdWVyeSDQsiDRgdCx0L7RgNC60YMsINC90L4g0LvRg9GH0YzRiNC1INCyIGh0bWxcclxuLy9pbXBvcnQgJCBmcm9tICdqcXVlcnknOyAgICAgICAgLy/QsdC10YDQtdC8INC40Lcgbm9kZW1vZHVsZXNcclxuLy9pbXBvcnQgKiBhcyAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG4vL2dsb2JhbC5qUXVlcnkgPSAkO1xyXG4vL2dsb2JhbC4kID0gJDtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbi8vLS0tLS0tLdC/0L7QtNC60LvRjtGH0LXQvdC40LUg0YHRgtC40LvQtdC5LS0tLS0tLS0tLS0tLS0tLS8vXHJcbi8vLS0tLS0tLdC+0LHRidC40LUg0YHRgtC40LvQuC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuLy9pbXBvcnQgJy4vY3NzL2ZvbnQuY3NzJzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/RgdGC0LjQu9C4INGI0YDQuNGE0YLQvtCyXHJcbi8vLS0tLS0tLdGB0YLQuNC70Lgg0LzQvtC00YPQu9C10LktLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG4vL2ltcG9ydCAnLi9tb2R1bGVzL2xvZ28vbG9nby5jc3MnOyAgICAgICAgICAgICAgICAgICAvL9GB0YLQuNC70Ywg0LvQvtCz0L7RgtC40L/QsFxyXG4vL2ltcG9ydCAnLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9uLmNzcyc7ICAgICAvL9GB0YLQuNC70Lgg0YHQuNC90LXQuSDQutC90L7Qv9C60LhcclxuLy9pbXBvcnQgJy4vbW9kdWxlcy9ja2xpa2J1dHRvbi9ja2xpa2J1dHRvbmFycm93LmNzcyc7Ly/RgdGC0LjQu9C4INGB0LjQvdC10Lkg0LrQvdC+0L/QutC4INGBINCx0LXQu9C+0Lkg0YHRgtGA0LXQu9C60L7QuVxyXG4vL2ltcG9ydCAnLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9ud2l0ZS5jc3MnOyAvL9GB0YLQuNC70Lgg0LHQtdC70L7QuSDQutC90L7Qv9C60LhcclxuLy9pbXBvcnQgJy4vbW9kdWxlcy9tYWludGV4dC9tYWludGV4dC5jc3MnOyAgICAgICAgICAgLy/QstGL0LLQvtC0INGC0LXQutGB0YLQsCDQvtC/0LjRgdCw0L3QuNGPXHJcbi8vaW1wb3J0ICcuL21vZHVsZXMvdGV4dGZpZWxkL3RleHRmaWVsZC5jc3MnOyAgICAgICAgIC8v0YLQtdC60YHRgtC+0LLRi9C1INCx0LvQvtC60LhcclxuLy9pbXBvcnQgJy4vbW9kdWxlcy9yYWRpb2J1dHRvbi9yYWRpb2J1dHRvbi5jc3MnOyAgICAgLy/Qv9C10YDQtdC60LvRjtGH0LDRgtC10LvRjCDRgNCw0LTQuNC+0LHQvtGC0L7QvdGLXHJcbi8vaW1wb3J0ICcuL21vZHVsZXMvbWFza2VkZmllbGQvbWFza2VkZmllbGQuY3NzJzsgICAgIC8v0LzQsNGB0LrQsCDQstCy0L7QtNCwINCyINC/0L7Qu9C1XHJcbi8vaW1wb3J0ICcuL21vZHVsZXMvdG9nZ2xlYnV0dG9uL3RvZ2dsZWJ1dHRvbi5jc3MnOyAgIC8v0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70Ywg0L7QvS/QvtGE0YRcclxuLy9pbXBvcnQgJy4vbW9kdWxlcy9kYXRlZHJvcC9kYXRlZHJvcC5jc3MnOyAgICAgICAgICAgLy/Qv9C+0LvRjyDQstCy0L7QtNCwINC00LDRgtGLXHJcbi8vaW1wb3J0ICcuL21vZHVsZXMvZHJvcGRvd24vZHJvcGRvd24uY3NzJzsgICAgICAgICAgIC8v0LLRi9C/0L7QtNCw0Y7RidC40LUg0YHQv9C40YHQutC4XHJcbi8vaW1wb3J0ICcuL21vZHVsZXMvcmFuZ2VzbGlkZXIvcmFuZ2VzbGlkZXIuY3NzJzsgIC8v0LzQvtC00YPQu9GMINGB0LvQsNC50LTQtdGA0LBcclxuXHJcbi8vLS0tLS0tY3NzINC+0YHQvdC+0LLQvdGL0YUg0LHQu9C+0LrQvtCyLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4vL2ltcG9ydCAnLi9jc3Mvc2VhcmNocm9vbS5jc3MnOyAgICAgICAgICAgICAgICAgICAgICAvL9GB0YLQuNC70Ywg0YHRgtGA0LDQvdC40YbRiyDQstGL0LLQvtC00LAg0L/QvtC40YHQutCwXHJcbi8vaW1wb3J0ICcuL2Jsb2NrL2hlYWRlci9oZWFkZXItc3R5bGUuY3NzJzsgICAgICAgICAvL9C+0YHQvdC+0LLQvdC+0Lkg0YHRgtC40LvRjCDRhdC10LTQtdGA0LBcclxuLy9pbXBvcnQgJy4vYmxvY2svbWVudXRvcC9tZW51dG9wLmNzcyc7ICAgICAgICAgICAgIC8v0YHRgtC40LvQuCDQstC10YDRhdC90LXQs9C+INC80LXQvdGOXHJcbi8vaW1wb3J0ICcuL2Jsb2NrL3NlYXJjaGZvcm0vc2VhcmNoZm9ybS5jc3MnOyAgICAgICAvL9GE0L7RgNC80LAg0L/QvtC40YHQutCwINC90L7QvNC10YDQvtCyXHJcbi8vaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9mb290ZXJzdHlsZS5jc3MnOyAgICAgICAgICAvL9C+0LHRidC40Lkg0YHRgtC40LvRjCDQtNC70Y8g0YTRg9GC0LXRgNCwXHJcbi8vaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9tZW51L2Zvb3Rlcm1lbnUuY3NzJzsgICAgICAvL9Cx0LvQvtC6INC80LXQvdGOXHJcbi8vaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9zdWJzY3JpYmUvc3Vic2NyaWJlLmNzcyc7ICAvL9Cx0LvQvtC6INGA0LDRgdGB0YvQu9C+0LpcclxuLy9pbXBvcnQgJy4vYmxvY2svZm9vdGVyL2NvbXBhbnkvYWR2ZXJ0LmNzcyc7ICAgICAgIC8v0YDQtdC60LvQsNC80LAg0L/QvtC0INC70L7Qs9C+XHJcbi8vaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9jb21wYW55L2NvbXBhbnkuY3NzJzsgICAgICAvL9Cx0LvQvtC6INC70L7Qs9C+INC4INGA0LXQutC70LDQvNGLXHJcbi8vaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9jb3B5cml0ZS9jb3B5cml0ZS5jc3MnOyAgICAvL9Cx0LvQvtC6INC60L7Qv9C40YDQsNC50YLQsFxyXG4vL2ltcG9ydCAnLi9ibG9jay9mb290ZXIvc29jaWFsL3NvY2lhbC5jc3MnOyAgICAgICAgLy/QsdC70L7QuiDRgdC+0YbRgdC10YLQtdC5XHJcbi8vaW1wb3J0ICcuL2Jsb2NrL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uY3NzJzsgICAvL9Cx0LvQvtC6INGA0LXQs9C40YHRgtGA0LDRhtC40LhcclxuaW1wb3J0ICcuL2Jsb2NrL2NhbGVuZGFyL2NhbGVuZGFyLmNzcyc7ICAgICAgICAgICAvL9Cx0LvQvtC6INCy0YvQstC+0LTQsCDQutCw0LvQtdC90LTQsNGA0Y9cclxuaW1wb3J0ICcuL2Jsb2NrL3Zpc2l0b3IvdmlzaXRvci5jc3MnOyAgICAgICAgICAgICAvL9Cx0LvQvtC6INCy0YvQstC+0LTQsCDQutC+0LvQu9C40YfQtdGB0YLQstCwINCz0L7RgdGC0LXQuVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4vL9C/0L7QtNC60LvRjtGH0LXQvdC40LUg0L7RgtC00LXQu9GM0L3Ri9GFINGB0YLRgNCw0L3QuNGGXHJcbi8vaW1wb3J0ICcuL2Zvcm1lbGVtZW50Lmh0bWwnO1xyXG4vL2ltcG9ydCBodG1sIGZyb20gJ3JlZ2lzdHJhdGlvbi5odG1sJztcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG4vL9C/0L7QtNC60LvRjtGH0LXQvdC40LUg0YHQutGA0LjQv9GC0L7QslxyXG4vL3NpbXBvcnQgJy4vYmxvY2svY2FsZW5kYXIvY2FsZW5kYXIuanMnO1xyXG5pbXBvcnQgJy4vYmxvY2svc2VhcmNoZm9ybS9zZWFyY2hmb3JtLmpzJztcclxuaW1wb3J0ICcuL2Jsb2NrL3Zpc2l0b3IvdmlzaXRvci5qcyc7XHJcbi8vaW1wb3J0ICcuL2pzL3NlYXJjaHJvb20uanMnOyAgICAgICAgICAgICAgLy/RgdC60YDQuNC/0YIg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDQv9C+0LjRgdC60LBcclxuLy9pbXBvcnQgJy4vbW9kdWxlcy9yYW5nZXNsaWRlci9yYW5nZXNsaWRlci5qcyc7ICAgICAgICAvL9GB0LrRgNC40L/RgiDRgdC70LDQudC00LXRgNCwXHJcbi8vaW1wb3J0IGJ0bkNvdW50IGZyb20gJy4vYnV0dG9uLmpzJztcclxuLy9pbXBvcnQgYnRucmVnaXNyYXRpb24gZnJvbSAnLi9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uanMnOyAgICAgICAgIC8v0LrQvdC+0L/QutCwINCy0YvQstC+0LTQsCDRhNC+0YDQvNGLINGA0LXQs9C40YHRgtGA0LDRhtC40LhcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5cclxuLy/Qv9C+0LTQutC70Y7Rh9C10L3QuNC1IGRhdGVwaWNrZXJcclxuLy9pbXBvcnQgJy4vYmxvY2svZGF0ZXBpY2tlci9kYXRlcGlja2VyLmNzcyc7XHJcbi8vaW1wb3J0ICcuL2Jsb2NrL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5qcyc7XHJcbi8vaW1wb3J0ICcuL2Jsb2NrL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5taW4uY3NzJztcclxuLy9pbXBvcnQgJy4vYmxvY2svZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1pbi5qcyc7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbi8vaW1wb3J0IFwiLi9qcXVlcnktMy40LjEubWluLmpzXCI7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0t0J/QvtC00LrQu9GO0YfQtdC90LjQtSDQutCw0YDRgtC40L3QvtC6LS0tLS0tLS0tLS0tLS0tXHJcbi8vaW1wb3J0IEljb24gZnJvbSAnLi9pY29uLnBuZyc7XHJcbi8v0L7RgdC90L7QstC90L7QuSDRgdGC0LjQu9GMINGB0YLRgNCw0L3QuNGG0Ysg0YHQviDRgdGC0LjQu9GP0LzQuCDQvtGC0L3QvtGB0Y/RidC40LzQtdGB0Y8g0YLQvtC70YzQutC+INC6INGB0YLRgNCw0L3QuNGG0LUiXSwibmFtZXMiOlsiY29taW5nIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGF0ZUxpdmUiLCJzdGFydERhdGUiLCJkZXBhcnR1cmUiLCJlbmREYXRlIiwiZm9ybVZpc2l0b3JJbnB1dCIsImRhdGVwaWNrZXJCbG9jayIsImluc2VydENhbGVuZGFyIiwiaW5zZXJ0VmlzaXRvciIsImFwcGx5U2VsZWN0IiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJidXR0b25DYWxlbmRhciIsImJ0bkZvcm0iLCJjYWxlbmRhck91dHB1dCIsImJ0bkNhbGVuZGFyUmVzdWx0IiwiYnRuQ2FsZW5kYXJDbGVhciIsImJ0bkNhbGVuZGFyQXBwbHkiLCJjYWxlbmRhckRlbGV0ZSIsInZhbHVlIiwiYnRuQ2xpY2siLCJidG5JbnB1dCIsImJsb2NrQ2FsZW5kYXIiLCJkYXRlcGlja2VyQ3JlYXRlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicmVtb3ZlIiwiJCIsImRhdGVwaWNrZXIiLCJyYW5nZSIsInRvZ2dsZVNlbGVjdGVkIiwibXVsdGlwbGVEYXRlc1NlcGFyYXRvciIsIm1pbkRhdGUiLCJEYXRlIiwib25TZWxlY3QiLCJzZWxlY3RlZERhdGVzIiwidW5kZWZpbmVkIiwiaW5kZXhPZiIsIm1keUNhbGVuZGFyIiwic3BsaXQiLCJtZHlTdGFydCIsIm1keUVuZCIsImFwcGx5U2VsZWN0RGF0YSIsInRyaW0iLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwic2V0SXRlbSIsInZpc2l0b3JCdG4iLCJ2aXNpdG9ySW5wdXQiLCJ2aXNpdG9yRm9ybSIsInZpc2l0b3JEcm9wIiwidmlzaXRvckJ0blNhdmUiLCJ2aXNpdG9yQnRuQ2xlYXIiLCJiaWdTZWxlY3RNaW4iLCJiaWdTZWxlY3RNYXgiLCJiaWdTZWxlY3RSZXN1bHQiLCJjaGlsZFNlbGVjdE1pbiIsImNoaWxkU2VsZWN0TWF4IiwiY2hpbGRTZWxlY3RSZXN1bHQiLCJiYWJpU2VsZWN0TWluIiwiYmFiaVNlbGVjdE1heCIsImJhYmlTZWxlY3RSZXN1bHQiLCJ0ZXh0Q29udGVudCIsInZpc2l0b3JIb3ZlckJpZyIsIm5hbUJpZ0hvdmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwidmlzaXRvckhvdmVyQ2hpbGQiLCJuYW1DaGlsZEhvdmVyIiwidmlzaXRvckhvdmVyQmFiaSIsIm5hbUJhYmlIb3ZlciIsInRvZ2dsZSIsIk51bWJlciIsInBhcnNlSW50IiwidmlzaXRvclN1bW1UZXh0IiwiaW5wdXROdW0iLCJidG5DbGVhclZpc2l0b3IiLCJudW1DbGVhciIsImRyb3BJbnB1dE1lbnUiXSwic291cmNlUm9vdCI6IiJ9