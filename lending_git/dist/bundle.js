/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/datepicker/datepicker.js":
/*!******************************************!*\
  !*** ./modules/datepicker/datepicker.js ***!
  \******************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function (window, $, undefined) {
  ;

  (function () {
    var VERSION = '2.2.3',
        pluginName = 'datepicker',
        autoInitSelector = '.datepicker-here',
        $body,
        $datepickersContainer,
        containerBuilt = false,
        baseTemplate = '' + '<div class="datepicker">' + '<i class="datepicker--pointer"></i>' + '<nav class="datepicker--nav"></nav>' + '<div class="datepicker--content"></div>' + '</div>',
        defaults = {
      classes: '',
      inline: false,
      language: 'ru',
      startDate: new Date(),
      firstDay: '',
      weekends: [6, 0],
      dateFormat: '',
      altField: '',
      altFieldDateFormat: '@',
      toggleSelected: true,
      keyboardNav: true,
      position: 'bottom left',
      offset: 12,
      view: 'days',
      minView: 'days',
      showOtherMonths: true,
      selectOtherMonths: true,
      moveToOtherMonthsOnSelect: true,
      showOtherYears: true,
      selectOtherYears: true,
      moveToOtherYearsOnSelect: true,
      minDate: '',
      maxDate: '',
      disableNavWhenOutOfRange: true,
      multipleDates: false,
      // Boolean or Number
      multipleDatesSeparator: ',',
      range: false,
      todayButton: false,
      clearButton: false,
      showEvent: 'focus',
      autoClose: false,
      // navigation
      monthsField: 'monthsShort',
      prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
      nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
      navTitles: {
        days: 'MM, <i>yyyy</i>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
      },
      // timepicker
      timepicker: false,
      onlyTimepicker: false,
      dateTimeSeparator: ' ',
      timeFormat: '',
      minHours: 0,
      maxHours: 24,
      minMinutes: 0,
      maxMinutes: 59,
      hoursStep: 1,
      minutesStep: 1,
      // events
      onSelect: '',
      onShow: '',
      onHide: '',
      onChangeMonth: '',
      onChangeYear: '',
      onChangeDecade: '',
      onChangeView: '',
      onRenderCell: ''
    },
        hotKeys = {
      'ctrlRight': [17, 39],
      'ctrlUp': [17, 38],
      'ctrlLeft': [17, 37],
      'ctrlDown': [17, 40],
      'shiftRight': [16, 39],
      'shiftUp': [16, 38],
      'shiftLeft': [16, 37],
      'shiftDown': [16, 40],
      'altUp': [18, 38],
      'altRight': [18, 39],
      'altLeft': [18, 37],
      'altDown': [18, 40],
      'ctrlShiftUp': [16, 17, 38]
    },
        datepicker;

    var Datepicker = function Datepicker(el, options) {
      this.el = el;
      this.$el = $(el);
      this.opts = $.extend(true, {}, defaults, options, this.$el.data());

      if ($body == undefined) {
        $body = $('body');
      }

      if (!this.opts.startDate) {
        this.opts.startDate = new Date();
      }

      if (this.el.nodeName == 'INPUT') {
        this.elIsInput = true;
      }

      if (this.opts.altField) {
        this.$altField = typeof this.opts.altField == 'string' ? $(this.opts.altField) : this.opts.altField;
      }

      this.inited = false;
      this.visible = false;
      this.silent = false; // Need to prevent unnecessary rendering

      this.currentDate = this.opts.startDate;
      this.currentView = this.opts.view;

      this._createShortCuts();

      this.selectedDates = [];
      this.views = {};
      this.keys = [];
      this.minRange = '';
      this.maxRange = '';
      this._prevOnSelectValue = '';
      this.init();
    };

    datepicker = Datepicker;
    datepicker.prototype = {
      VERSION: VERSION,
      viewIndexes: ['days', 'months', 'years'],
      init: function init() {
        if (!containerBuilt && !this.opts.inline && this.elIsInput) {
          this._buildDatepickersContainer();
        }

        this._buildBaseHtml();

        this._defineLocale(this.opts.language);

        this._syncWithMinMaxDates();

        if (this.elIsInput) {
          if (!this.opts.inline) {
            // Set extra classes for proper transitions
            this._setPositionClasses(this.opts.position);

            this._bindEvents();
          }

          if (this.opts.keyboardNav && !this.opts.onlyTimepicker) {
            this._bindKeyboardEvents();
          }

          this.$datepicker.on('mousedown', this._onMouseDownDatepicker.bind(this));
          this.$datepicker.on('mouseup', this._onMouseUpDatepicker.bind(this));
        }

        if (this.opts.classes) {
          this.$datepicker.addClass(this.opts.classes);
        }

        if (this.opts.timepicker) {
          this.timepicker = new $.fn.datepicker.Timepicker(this, this.opts);

          this._bindTimepickerEvents();
        }

        if (this.opts.onlyTimepicker) {
          this.$datepicker.addClass('-only-timepicker-');
        }

        this.views[this.currentView] = new $.fn.datepicker.Body(this, this.currentView, this.opts);
        this.views[this.currentView].show();
        this.nav = new $.fn.datepicker.Navigation(this, this.opts);
        this.view = this.currentView;
        this.$el.on('clickCell.adp', this._onClickCell.bind(this));
        this.$datepicker.on('mouseenter', '.datepicker--cell', this._onMouseEnterCell.bind(this));
        this.$datepicker.on('mouseleave', '.datepicker--cell', this._onMouseLeaveCell.bind(this));
        this.inited = true;
      },
      _createShortCuts: function _createShortCuts() {
        this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-8639999913600000);
        this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(8639999913600000);
      },
      _bindEvents: function _bindEvents() {
        this.$el.on(this.opts.showEvent + '.adp', this._onShowEvent.bind(this));
        this.$el.on('mouseup.adp', this._onMouseUpEl.bind(this));
        this.$el.on('blur.adp', this._onBlur.bind(this));
        this.$el.on('keyup.adp', this._onKeyUpGeneral.bind(this));
        $(window).on('resize.adp', this._onResize.bind(this));
        $('body').on('mouseup.adp', this._onMouseUpBody.bind(this));
      },
      _bindKeyboardEvents: function _bindKeyboardEvents() {
        this.$el.on('keydown.adp', this._onKeyDown.bind(this));
        this.$el.on('keyup.adp', this._onKeyUp.bind(this));
        this.$el.on('hotKey.adp', this._onHotKey.bind(this));
      },
      _bindTimepickerEvents: function _bindTimepickerEvents() {
        this.$el.on('timeChange.adp', this._onTimeChange.bind(this));
      },
      isWeekend: function isWeekend(day) {
        return this.opts.weekends.indexOf(day) !== -1;
      },
      _defineLocale: function _defineLocale(lang) {
        if (typeof lang == 'string') {
          this.loc = $.fn.datepicker.language[lang];

          if (!this.loc) {
            console.warn('Can\'t find language "' + lang + '" in Datepicker.language, will use "ru" instead');
            this.loc = $.extend(true, {}, $.fn.datepicker.language.ru);
          }

          this.loc = $.extend(true, {}, $.fn.datepicker.language.ru, $.fn.datepicker.language[lang]);
        } else {
          this.loc = $.extend(true, {}, $.fn.datepicker.language.ru, lang);
        }

        if (this.opts.dateFormat) {
          this.loc.dateFormat = this.opts.dateFormat;
        }

        if (this.opts.timeFormat) {
          this.loc.timeFormat = this.opts.timeFormat;
        }

        if (this.opts.firstDay !== '') {
          this.loc.firstDay = this.opts.firstDay;
        }

        if (this.opts.timepicker) {
          this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator);
        }

        if (this.opts.onlyTimepicker) {
          this.loc.dateFormat = this.loc.timeFormat;
        }

        var boundary = this._getWordBoundaryRegExp;

        if (this.loc.timeFormat.match(boundary('aa')) || this.loc.timeFormat.match(boundary('AA'))) {
          this.ampm = true;
        }
      },
      _buildDatepickersContainer: function _buildDatepickersContainer() {
        containerBuilt = true;
        $body.append('<div class="datepickers-container" id="datepickers-container"></div>');
        $datepickersContainer = $('#datepickers-container');
      },
      _buildBaseHtml: function _buildBaseHtml() {
        var $appendTarget,
            $inline = $('<div class="datepicker-inline">');

        if (this.el.nodeName == 'INPUT') {
          if (!this.opts.inline) {
            $appendTarget = $datepickersContainer;
          } else {
            $appendTarget = $inline.insertAfter(this.$el);
          }
        } else {
          $appendTarget = $inline.appendTo(this.$el);
        }

        this.$datepicker = $(baseTemplate).appendTo($appendTarget);
        this.$content = $('.datepicker--content', this.$datepicker);
        this.$nav = $('.datepicker--nav', this.$datepicker);
      },
      _triggerOnChange: function _triggerOnChange() {
        if (!this.selectedDates.length) {
          // Prevent from triggering multiple onSelect callback with same argument (empty string) in IE10-11
          if (this._prevOnSelectValue === '') return;
          this._prevOnSelectValue = '';
          return this.opts.onSelect('', '', this);
        }

        var selectedDates = this.selectedDates,
            parsedSelected = datepicker.getParsedDate(selectedDates[0]),
            formattedDates,
            _this = this,
            dates = new Date(parsedSelected.year, parsedSelected.month, parsedSelected.date, parsedSelected.hours, parsedSelected.minutes);

        formattedDates = selectedDates.map(function (date) {
          return _this.formatDate(_this.loc.dateFormat, date);
        }).join(this.opts.multipleDatesSeparator); // Create new dates array, to separate it from original selectedDates

        if (this.opts.multipleDates || this.opts.range) {
          dates = selectedDates.map(function (date) {
            var parsedDate = datepicker.getParsedDate(date);
            return new Date(parsedDate.year, parsedDate.month, parsedDate.date, parsedDate.hours, parsedDate.minutes);
          });
        }

        this._prevOnSelectValue = formattedDates;
        this.opts.onSelect(formattedDates, dates, this);
      },
      next: function next() {
        var d = this.parsedDate,
            o = this.opts;

        switch (this.view) {
          case 'days':
            this.date = new Date(d.year, d.month + 1, 1);
            if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
            break;

          case 'months':
            this.date = new Date(d.year + 1, d.month, 1);
            if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
            break;

          case 'years':
            this.date = new Date(d.year + 10, 0, 1);
            if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
            break;
        }
      },
      prev: function prev() {
        var d = this.parsedDate,
            o = this.opts;

        switch (this.view) {
          case 'days':
            this.date = new Date(d.year, d.month - 1, 1);
            if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
            break;

          case 'months':
            this.date = new Date(d.year - 1, d.month, 1);
            if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
            break;

          case 'years':
            this.date = new Date(d.year - 10, 0, 1);
            if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
            break;
        }
      },
      formatDate: function formatDate(string, date) {
        date = date || this.date;
        var result = string,
            boundary = this._getWordBoundaryRegExp,
            locale = this.loc,
            leadingZero = datepicker.getLeadingZeroNum,
            decade = datepicker.getDecade(date),
            d = datepicker.getParsedDate(date),
            fullHours = d.fullHours,
            hours = d.hours,
            ampm = string.match(boundary('aa')) || string.match(boundary('AA')),
            dayPeriod = 'am',
            replacer = this._replacer,
            validHours;

        if (this.opts.timepicker && this.timepicker && ampm) {
          validHours = this.timepicker._getValidHoursFromDate(date, ampm);
          fullHours = leadingZero(validHours.hours);
          hours = validHours.hours;
          dayPeriod = validHours.dayPeriod;
        }

        switch (true) {
          case /@/.test(result):
            result = result.replace(/@/, date.getTime());

          case /aa/.test(result):
            result = replacer(result, boundary('aa'), dayPeriod);

          case /AA/.test(result):
            result = replacer(result, boundary('AA'), dayPeriod.toUpperCase());

          case /dd/.test(result):
            result = replacer(result, boundary('dd'), d.fullDate);

          case /d/.test(result):
            result = replacer(result, boundary('d'), d.date);

          case /DD/.test(result):
            result = replacer(result, boundary('DD'), locale.days[d.day]);

          case /D/.test(result):
            result = replacer(result, boundary('D'), locale.daysShort[d.day]);

          case /mm/.test(result):
            result = replacer(result, boundary('mm'), d.fullMonth);

          case /m/.test(result):
            result = replacer(result, boundary('m'), d.month + 1);

          case /MM/.test(result):
            result = replacer(result, boundary('MM'), this.loc.months[d.month]);

          case /M/.test(result):
            result = replacer(result, boundary('M'), locale.monthsShort[d.month]);

          case /ii/.test(result):
            result = replacer(result, boundary('ii'), d.fullMinutes);

          case /i/.test(result):
            result = replacer(result, boundary('i'), d.minutes);

          case /hh/.test(result):
            result = replacer(result, boundary('hh'), fullHours);

          case /h/.test(result):
            result = replacer(result, boundary('h'), hours);

          case /yyyy/.test(result):
            result = replacer(result, boundary('yyyy'), d.year);

          case /yyyy1/.test(result):
            result = replacer(result, boundary('yyyy1'), decade[0]);

          case /yyyy2/.test(result):
            result = replacer(result, boundary('yyyy2'), decade[1]);

          case /yy/.test(result):
            result = replacer(result, boundary('yy'), d.year.toString().slice(-2));
        }

        return result;
      },
      _replacer: function _replacer(str, reg, data) {
        return str.replace(reg, function (match, p1, p2, p3) {
          return p1 + data + p3;
        });
      },
      _getWordBoundaryRegExp: function _getWordBoundaryRegExp(sign) {
        var symbols = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';
        return new RegExp('(^|>|' + symbols + ')(' + sign + ')($|<|' + symbols + ')', 'g');
      },
      selectDate: function selectDate(date) {
        var _this = this,
            opts = _this.opts,
            d = _this.parsedDate,
            selectedDates = _this.selectedDates,
            len = selectedDates.length,
            newDate = '';

        if (Array.isArray(date)) {
          date.forEach(function (d) {
            _this.selectDate(d);
          });
          return;
        }

        if (!(date instanceof Date)) return;
        this.lastSelectedDate = date; // Set new time values from Date

        if (this.timepicker) {
          this.timepicker._setTime(date);
        } // On this step timepicker will set valid values in it's instance


        _this._trigger('selectDate', date); // Set correct time values after timepicker's validation
        // Prevent from setting hours or minutes which values are lesser then `min` value or
        // greater then `max` value


        if (this.timepicker) {
          date.setHours(this.timepicker.hours);
          date.setMinutes(this.timepicker.minutes);
        }

        if (_this.view == 'days') {
          if (date.getMonth() != d.month && opts.moveToOtherMonthsOnSelect) {
            newDate = new Date(date.getFullYear(), date.getMonth(), 1);
          }
        }

        if (_this.view == 'years') {
          if (date.getFullYear() != d.year && opts.moveToOtherYearsOnSelect) {
            newDate = new Date(date.getFullYear(), 0, 1);
          }
        }

        if (newDate) {
          _this.silent = true;
          _this.date = newDate;
          _this.silent = false;

          _this.nav._render();
        }

        if (opts.multipleDates && !opts.range) {
          // Set priority to range functionality
          if (len === opts.multipleDates) return;

          if (!_this._isSelected(date)) {
            _this.selectedDates.push(date);
          }
        } else if (opts.range) {
          if (len == 2) {
            _this.selectedDates = [date];
            _this.minRange = date;
            _this.maxRange = '';
          } else if (len == 1) {
            _this.selectedDates.push(date);

            if (!_this.maxRange) {
              _this.maxRange = date;
            } else {
              _this.minRange = date;
            } // Swap dates if they were selected via dp.selectDate() and second date was smaller then first


            if (datepicker.bigger(_this.maxRange, _this.minRange)) {
              _this.maxRange = _this.minRange;
              _this.minRange = date;
            }

            _this.selectedDates = [_this.minRange, _this.maxRange];
          } else {
            _this.selectedDates = [date];
            _this.minRange = date;
          }
        } else {
          _this.selectedDates = [date];
        }

        _this._setInputValue();

        if (opts.onSelect) {
          _this._triggerOnChange();
        }

        if (opts.autoClose && !this.timepickerIsActive) {
          if (!opts.multipleDates && !opts.range) {
            _this.hide();
          } else if (opts.range && _this.selectedDates.length == 2) {
            _this.hide();
          }
        }

        _this.views[this.currentView]._render();
      },
      removeDate: function removeDate(date) {
        var selected = this.selectedDates,
            _this = this;

        if (!(date instanceof Date)) return;
        return selected.some(function (curDate, i) {
          if (datepicker.isSame(curDate, date)) {
            selected.splice(i, 1);

            if (!_this.selectedDates.length) {
              _this.minRange = '';
              _this.maxRange = '';
              _this.lastSelectedDate = '';
            } else {
              _this.lastSelectedDate = _this.selectedDates[_this.selectedDates.length - 1];
            }

            _this.views[_this.currentView]._render();

            _this._setInputValue();

            if (_this.opts.onSelect) {
              _this._triggerOnChange();
            }

            return true;
          }
        });
      },
      today: function today() {
        this.silent = true;
        this.view = this.opts.minView;
        this.silent = false;
        this.date = new Date();

        if (this.opts.todayButton instanceof Date) {
          this.selectDate(this.opts.todayButton);
        }
      },
      clear: function clear() {
        this.selectedDates = [];
        this.minRange = '';
        this.maxRange = '';

        this.views[this.currentView]._render();

        this._setInputValue();

        if (this.opts.onSelect) {
          this._triggerOnChange();
        }
      },

      /**
       * Updates datepicker options
       * @param {String|Object} param - parameter's name to update. If object then it will extend current options
       * @param {String|Number|Object} [value] - new param value
       */
      update: function update(param, value) {
        var len = arguments.length,
            lastSelectedDate = this.lastSelectedDate;

        if (len == 2) {
          this.opts[param] = value;
        } else if (len == 1 && _typeof(param) == 'object') {
          this.opts = $.extend(true, this.opts, param);
        }

        this._createShortCuts();

        this._syncWithMinMaxDates();

        this._defineLocale(this.opts.language);

        this.nav._addButtonsIfNeed();

        if (!this.opts.onlyTimepicker) this.nav._render();

        this.views[this.currentView]._render();

        if (this.elIsInput && !this.opts.inline) {
          this._setPositionClasses(this.opts.position);

          if (this.visible) {
            this.setPosition(this.opts.position);
          }
        }

        if (this.opts.classes) {
          this.$datepicker.addClass(this.opts.classes);
        }

        if (this.opts.onlyTimepicker) {
          this.$datepicker.addClass('-only-timepicker-');
        }

        if (this.opts.timepicker) {
          if (lastSelectedDate) this.timepicker._handleDate(lastSelectedDate);

          this.timepicker._updateRanges();

          this.timepicker._updateCurrentTime(); // Change hours and minutes if it's values have been changed through min/max hours/minutes


          if (lastSelectedDate) {
            lastSelectedDate.setHours(this.timepicker.hours);
            lastSelectedDate.setMinutes(this.timepicker.minutes);
          }
        }

        this._setInputValue();

        return this;
      },
      _syncWithMinMaxDates: function _syncWithMinMaxDates() {
        var curTime = this.date.getTime();
        this.silent = true;

        if (this.minTime > curTime) {
          this.date = this.minDate;
        }

        if (this.maxTime < curTime) {
          this.date = this.maxDate;
        }

        this.silent = false;
      },
      _isSelected: function _isSelected(checkDate, cellType) {
        var res = false;
        this.selectedDates.some(function (date) {
          if (datepicker.isSame(date, checkDate, cellType)) {
            res = date;
            return true;
          }
        });
        return res;
      },
      _setInputValue: function _setInputValue() {
        var _this = this,
            opts = _this.opts,
            format = _this.loc.dateFormat,
            altFormat = opts.altFieldDateFormat,
            value = _this.selectedDates.map(function (date) {
          return _this.formatDate(format, date);
        }),
            altValues;

        if (opts.altField && _this.$altField.length) {
          altValues = this.selectedDates.map(function (date) {
            return _this.formatDate(altFormat, date);
          });
          altValues = altValues.join(this.opts.multipleDatesSeparator);
          this.$altField.val(altValues);
        }

        value = value.join(this.opts.multipleDatesSeparator);
        this.$el.val(value);
      },

      /**
       * Check if date is between minDate and maxDate
       * @param date {object} - date object
       * @param type {string} - cell type
       * @returns {boolean}
       * @private
       */
      _isInRange: function _isInRange(date, type) {
        var time = date.getTime(),
            d = datepicker.getParsedDate(date),
            min = datepicker.getParsedDate(this.minDate),
            max = datepicker.getParsedDate(this.maxDate),
            dMinTime = new Date(d.year, d.month, min.date).getTime(),
            dMaxTime = new Date(d.year, d.month, max.date).getTime(),
            types = {
          day: time >= this.minTime && time <= this.maxTime,
          month: dMinTime >= this.minTime && dMaxTime <= this.maxTime,
          year: d.year >= min.year && d.year <= max.year
        };
        return type ? types[type] : types.day;
      },
      _getDimensions: function _getDimensions($el) {
        var offset = $el.offset();
        return {
          width: $el.outerWidth(),
          height: $el.outerHeight(),
          left: offset.left,
          top: offset.top
        };
      },
      _getDateFromCell: function _getDateFromCell(cell) {
        var curDate = this.parsedDate,
            year = cell.data('year') || curDate.year,
            month = cell.data('month') == undefined ? curDate.month : cell.data('month'),
            date = cell.data('date') || 1;
        return new Date(year, month, date);
      },
      _setPositionClasses: function _setPositionClasses(pos) {
        pos = pos.split(' ');
        var main = pos[0],
            sec = pos[1],
            classes = 'datepicker -' + main + '-' + sec + '- -from-' + main + '-';
        if (this.visible) classes += ' active';
        this.$datepicker.removeAttr('class').addClass(classes);
      },
      setPosition: function setPosition(position) {
        position = position || this.opts.position;

        var dims = this._getDimensions(this.$el),
            selfDims = this._getDimensions(this.$datepicker),
            pos = position.split(' '),
            top,
            left,
            offset = this.opts.offset,
            main = pos[0],
            secondary = pos[1];

        switch (main) {
          case 'top':
            top = dims.top - selfDims.height - offset;
            break;

          case 'right':
            left = dims.left + dims.width + offset;
            break;

          case 'bottom':
            top = dims.top + dims.height + offset;
            break;

          case 'left':
            left = dims.left - selfDims.width - offset;
            break;
        }

        switch (secondary) {
          case 'top':
            top = dims.top;
            break;

          case 'right':
            left = dims.left + dims.width - selfDims.width;
            break;

          case 'bottom':
            top = dims.top + dims.height - selfDims.height;
            break;

          case 'left':
            left = dims.left;
            break;

          case 'center':
            if (/left|right/.test(main)) {
              top = dims.top + dims.height / 2 - selfDims.height / 2;
            } else {
              left = dims.left + dims.width / 2 - selfDims.width / 2;
            }

        }

        this.$datepicker.css({
          left: left,
          top: top
        });
      },
      show: function show() {
        var onShow = this.opts.onShow;
        this.setPosition(this.opts.position);
        this.$datepicker.addClass('active');
        this.visible = true;

        if (onShow) {
          this._bindVisionEvents(onShow);
        }
      },
      hide: function hide() {
        var onHide = this.opts.onHide;
        this.$datepicker.removeClass('active').css({
          left: '-100000px'
        });
        this.focused = '';
        this.keys = [];
        this.inFocus = false;
        this.visible = false;
        this.$el.blur();

        if (onHide) {
          this._bindVisionEvents(onHide);
        }
      },
      down: function down(date) {
        this._changeView(date, 'down');
      },
      up: function up(date) {
        this._changeView(date, 'up');
      },
      _bindVisionEvents: function _bindVisionEvents(event) {
        this.$datepicker.off('transitionend.dp');
        event(this, false);
        this.$datepicker.one('transitionend.dp', event.bind(this, this, true));
      },
      _changeView: function _changeView(date, dir) {
        date = date || this.focused || this.date;
        var nextView = dir == 'up' ? this.viewIndex + 1 : this.viewIndex - 1;
        if (nextView > 2) nextView = 2;
        if (nextView < 0) nextView = 0;
        this.silent = true;
        this.date = new Date(date.getFullYear(), date.getMonth(), 1);
        this.silent = false;
        this.view = this.viewIndexes[nextView];
      },
      _handleHotKey: function _handleHotKey(key) {
        var date = datepicker.getParsedDate(this._getFocusedDate()),
            focusedParsed,
            o = this.opts,
            newDate,
            totalDaysInNextMonth,
            monthChanged = false,
            yearChanged = false,
            decadeChanged = false,
            y = date.year,
            m = date.month,
            d = date.date;

        switch (key) {
          case 'ctrlRight':
          case 'ctrlUp':
            m += 1;
            monthChanged = true;
            break;

          case 'ctrlLeft':
          case 'ctrlDown':
            m -= 1;
            monthChanged = true;
            break;

          case 'shiftRight':
          case 'shiftUp':
            yearChanged = true;
            y += 1;
            break;

          case 'shiftLeft':
          case 'shiftDown':
            yearChanged = true;
            y -= 1;
            break;

          case 'altRight':
          case 'altUp':
            decadeChanged = true;
            y += 10;
            break;

          case 'altLeft':
          case 'altDown':
            decadeChanged = true;
            y -= 10;
            break;

          case 'ctrlShiftUp':
            this.up();
            break;
        }

        totalDaysInNextMonth = datepicker.getDaysCount(new Date(y, m));
        newDate = new Date(y, m, d); // If next month has less days than current, set date to total days in that month

        if (totalDaysInNextMonth < d) d = totalDaysInNextMonth; // Check if newDate is in valid range

        if (newDate.getTime() < this.minTime) {
          newDate = this.minDate;
        } else if (newDate.getTime() > this.maxTime) {
          newDate = this.maxDate;
        }

        this.focused = newDate;
        focusedParsed = datepicker.getParsedDate(newDate);

        if (monthChanged && o.onChangeMonth) {
          o.onChangeMonth(focusedParsed.month, focusedParsed.year);
        }

        if (yearChanged && o.onChangeYear) {
          o.onChangeYear(focusedParsed.year);
        }

        if (decadeChanged && o.onChangeDecade) {
          o.onChangeDecade(this.curDecade);
        }
      },
      _registerKey: function _registerKey(key) {
        var exists = this.keys.some(function (curKey) {
          return curKey == key;
        });

        if (!exists) {
          this.keys.push(key);
        }
      },
      _unRegisterKey: function _unRegisterKey(key) {
        var index = this.keys.indexOf(key);
        this.keys.splice(index, 1);
      },
      _isHotKeyPressed: function _isHotKeyPressed() {
        var currentHotKey,
            found = false,
            _this = this,
            pressedKeys = this.keys.sort();

        for (var hotKey in hotKeys) {
          currentHotKey = hotKeys[hotKey];
          if (pressedKeys.length != currentHotKey.length) continue;

          if (currentHotKey.every(function (key, i) {
            return key == pressedKeys[i];
          })) {
            _this._trigger('hotKey', hotKey);

            found = true;
          }
        }

        return found;
      },
      _trigger: function _trigger(event, args) {
        this.$el.trigger(event, args);
      },
      _focusNextCell: function _focusNextCell(keyCode, type) {
        type = type || this.cellType;
        var date = datepicker.getParsedDate(this._getFocusedDate()),
            y = date.year,
            m = date.month,
            d = date.date;

        if (this._isHotKeyPressed()) {
          return;
        }

        switch (keyCode) {
          case 37:
            // left
            type == 'day' ? d -= 1 : '';
            type == 'month' ? m -= 1 : '';
            type == 'year' ? y -= 1 : '';
            break;

          case 38:
            // up
            type == 'day' ? d -= 7 : '';
            type == 'month' ? m -= 3 : '';
            type == 'year' ? y -= 4 : '';
            break;

          case 39:
            // right
            type == 'day' ? d += 1 : '';
            type == 'month' ? m += 1 : '';
            type == 'year' ? y += 1 : '';
            break;

          case 40:
            // down
            type == 'day' ? d += 7 : '';
            type == 'month' ? m += 3 : '';
            type == 'year' ? y += 4 : '';
            break;
        }

        var nd = new Date(y, m, d);

        if (nd.getTime() < this.minTime) {
          nd = this.minDate;
        } else if (nd.getTime() > this.maxTime) {
          nd = this.maxDate;
        }

        this.focused = nd;
      },
      _getFocusedDate: function _getFocusedDate() {
        var focused = this.focused || this.selectedDates[this.selectedDates.length - 1],
            d = this.parsedDate;

        if (!focused) {
          switch (this.view) {
            case 'days':
              focused = new Date(d.year, d.month, new Date().getDate());
              break;

            case 'months':
              focused = new Date(d.year, d.month, 1);
              break;

            case 'years':
              focused = new Date(d.year, 0, 1);
              break;
          }
        }

        return focused;
      },
      _getCell: function _getCell(date, type) {
        type = type || this.cellType;
        var d = datepicker.getParsedDate(date),
            selector = '.datepicker--cell[data-year="' + d.year + '"]',
            $cell;

        switch (type) {
          case 'month':
            selector = '[data-month="' + d.month + '"]';
            break;

          case 'day':
            selector += '[data-month="' + d.month + '"][data-date="' + d.date + '"]';
            break;
        }

        $cell = this.views[this.currentView].$el.find(selector);
        return $cell.length ? $cell : $('');
      },
      destroy: function destroy() {
        var _this = this;

        _this.$el.off('.adp').data('datepicker', '');

        _this.selectedDates = [];
        _this.focused = '';
        _this.views = {};
        _this.keys = [];
        _this.minRange = '';
        _this.maxRange = '';

        if (_this.opts.inline || !_this.elIsInput) {
          _this.$datepicker.closest('.datepicker-inline').remove();
        } else {
          _this.$datepicker.remove();
        }
      },
      _handleAlreadySelectedDates: function _handleAlreadySelectedDates(alreadySelected, selectedDate) {
        if (this.opts.range) {
          if (!this.opts.toggleSelected) {
            // Add possibility to select same date when range is true
            if (this.selectedDates.length != 2) {
              this._trigger('clickCell', selectedDate);
            }
          } else {
            this.removeDate(selectedDate);
          }
        } else if (this.opts.toggleSelected) {
          this.removeDate(selectedDate);
        } // Change last selected date to be able to change time when clicking on this cell


        if (!this.opts.toggleSelected) {
          this.lastSelectedDate = alreadySelected;

          if (this.opts.timepicker) {
            this.timepicker._setTime(alreadySelected);

            this.timepicker.update();
          }
        }
      },
      _onShowEvent: function _onShowEvent(e) {
        if (!this.visible) {
          this.show();
        }
      },
      _onBlur: function _onBlur() {
        if (!this.inFocus && this.visible) {
          this.hide();
        }
      },
      _onMouseDownDatepicker: function _onMouseDownDatepicker(e) {
        this.inFocus = true;
      },
      _onMouseUpDatepicker: function _onMouseUpDatepicker(e) {
        this.inFocus = false;
        e.originalEvent.inFocus = true;
        if (!e.originalEvent.timepickerFocus) this.$el.focus();
      },
      _onKeyUpGeneral: function _onKeyUpGeneral(e) {
        var val = this.$el.val();

        if (!val) {
          this.clear();
        }
      },
      _onResize: function _onResize() {
        if (this.visible) {
          this.setPosition();
        }
      },
      _onMouseUpBody: function _onMouseUpBody(e) {
        if (e.originalEvent.inFocus) return;

        if (this.visible && !this.inFocus) {
          this.hide();
        }
      },
      _onMouseUpEl: function _onMouseUpEl(e) {
        e.originalEvent.inFocus = true;
        setTimeout(this._onKeyUpGeneral.bind(this), 4);
      },
      _onKeyDown: function _onKeyDown(e) {
        var code = e.which;

        this._registerKey(code); // Arrows


        if (code >= 37 && code <= 40) {
          e.preventDefault();

          this._focusNextCell(code);
        } // Enter


        if (code == 13) {
          if (this.focused) {
            if (this._getCell(this.focused).hasClass('-disabled-')) return;

            if (this.view != this.opts.minView) {
              this.down();
            } else {
              var alreadySelected = this._isSelected(this.focused, this.cellType);

              if (!alreadySelected) {
                if (this.timepicker) {
                  this.focused.setHours(this.timepicker.hours);
                  this.focused.setMinutes(this.timepicker.minutes);
                }

                this.selectDate(this.focused);
                return;
              }

              this._handleAlreadySelectedDates(alreadySelected, this.focused);
            }
          }
        } // Esc


        if (code == 27) {
          this.hide();
        }
      },
      _onKeyUp: function _onKeyUp(e) {
        var code = e.which;

        this._unRegisterKey(code);
      },
      _onHotKey: function _onHotKey(e, hotKey) {
        this._handleHotKey(hotKey);
      },
      _onMouseEnterCell: function _onMouseEnterCell(e) {
        var $cell = $(e.target).closest('.datepicker--cell'),
            date = this._getDateFromCell($cell); // Prevent from unnecessary rendering and setting new currentDate


        this.silent = true;

        if (this.focused) {
          this.focused = '';
        }

        $cell.addClass('-focus-');
        this.focused = date;
        this.silent = false;

        if (this.opts.range && this.selectedDates.length == 1) {
          this.minRange = this.selectedDates[0];
          this.maxRange = '';

          if (datepicker.less(this.minRange, this.focused)) {
            this.maxRange = this.minRange;
            this.minRange = '';
          }

          this.views[this.currentView]._update();
        }
      },
      _onMouseLeaveCell: function _onMouseLeaveCell(e) {
        var $cell = $(e.target).closest('.datepicker--cell');
        $cell.removeClass('-focus-');
        this.silent = true;
        this.focused = '';
        this.silent = false;
      },
      _onTimeChange: function _onTimeChange(e, h, m) {
        var date = new Date(),
            selectedDates = this.selectedDates,
            selected = false;

        if (selectedDates.length) {
          selected = true;
          date = this.lastSelectedDate;
        }

        date.setHours(h);
        date.setMinutes(m);

        if (!selected && !this._getCell(date).hasClass('-disabled-')) {
          this.selectDate(date);
        } else {
          this._setInputValue();

          if (this.opts.onSelect) {
            this._triggerOnChange();
          }
        }
      },
      _onClickCell: function _onClickCell(e, date) {
        if (this.timepicker) {
          date.setHours(this.timepicker.hours);
          date.setMinutes(this.timepicker.minutes);
        }

        this.selectDate(date);
      },

      set focused(val) {
        if (!val && this.focused) {
          var $cell = this._getCell(this.focused);

          if ($cell.length) {
            $cell.removeClass('-focus-');
          }
        }

        this._focused = val;

        if (this.opts.range && this.selectedDates.length == 1) {
          this.minRange = this.selectedDates[0];
          this.maxRange = '';

          if (datepicker.less(this.minRange, this._focused)) {
            this.maxRange = this.minRange;
            this.minRange = '';
          }
        }

        if (this.silent) return;
        this.date = val;
      },

      get focused() {
        return this._focused;
      },

      get parsedDate() {
        return datepicker.getParsedDate(this.date);
      },

      set date(val) {
        if (!(val instanceof Date)) return;
        this.currentDate = val;

        if (this.inited && !this.silent) {
          this.views[this.view]._render();

          this.nav._render();

          if (this.visible && this.elIsInput) {
            this.setPosition();
          }
        }

        return val;
      },

      get date() {
        return this.currentDate;
      },

      set view(val) {
        this.viewIndex = this.viewIndexes.indexOf(val);

        if (this.viewIndex < 0) {
          return;
        }

        this.prevView = this.currentView;
        this.currentView = val;

        if (this.inited) {
          if (!this.views[val]) {
            this.views[val] = new $.fn.datepicker.Body(this, val, this.opts);
          } else {
            this.views[val]._render();
          }

          this.views[this.prevView].hide();
          this.views[val].show();

          this.nav._render();

          if (this.opts.onChangeView) {
            this.opts.onChangeView(val);
          }

          if (this.elIsInput && this.visible) this.setPosition();
        }

        return val;
      },

      get view() {
        return this.currentView;
      },

      get cellType() {
        return this.view.substring(0, this.view.length - 1);
      },

      get minTime() {
        var min = datepicker.getParsedDate(this.minDate);
        return new Date(min.year, min.month, min.date).getTime();
      },

      get maxTime() {
        var max = datepicker.getParsedDate(this.maxDate);
        return new Date(max.year, max.month, max.date).getTime();
      },

      get curDecade() {
        return datepicker.getDecade(this.date);
      }

    }; //  Utils
    // -------------------------------------------------

    datepicker.getDaysCount = function (date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    datepicker.getParsedDate = function (date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        fullMonth: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
        // One based
        date: date.getDate(),
        fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        day: date.getDay(),
        hours: date.getHours(),
        fullHours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes: date.getMinutes(),
        fullMinutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      };
    };

    datepicker.getDecade = function (date) {
      var firstYear = Math.floor(date.getFullYear() / 10) * 10;
      return [firstYear, firstYear + 9];
    };

    datepicker.template = function (str, data) {
      return str.replace(/#\{([\w]+)\}/g, function (source, match) {
        if (data[match] || data[match] === 0) {
          return data[match];
        }
      });
    };

    datepicker.isSame = function (date1, date2, type) {
      if (!date1 || !date2) return false;

      var d1 = datepicker.getParsedDate(date1),
          d2 = datepicker.getParsedDate(date2),
          _type = type ? type : 'day',
          conditions = {
        day: d1.date == d2.date && d1.month == d2.month && d1.year == d2.year,
        month: d1.month == d2.month && d1.year == d2.year,
        year: d1.year == d2.year
      };

      return conditions[_type];
    };

    datepicker.less = function (dateCompareTo, date, type) {
      if (!dateCompareTo || !date) return false;
      return date.getTime() < dateCompareTo.getTime();
    };

    datepicker.bigger = function (dateCompareTo, date, type) {
      if (!dateCompareTo || !date) return false;
      return date.getTime() > dateCompareTo.getTime();
    };

    datepicker.getLeadingZeroNum = function (num) {
      return parseInt(num) < 10 ? '0' + num : num;
    };
    /**
     * Returns copy of date with hours and minutes equals to 0
     * @param date {Date}
     */


    datepicker.resetTime = function (date) {
      if (_typeof(date) != 'object') return;
      date = datepicker.getParsedDate(date);
      return new Date(date.year, date.month, date.date);
    };

    $.fn.datepicker = function (options) {
      return this.each(function () {
        if (!$.data(this, pluginName)) {
          $.data(this, pluginName, new Datepicker(this, options));
        } else {
          var _this = $.data(this, pluginName);

          _this.opts = $.extend(true, _this.opts, options);

          _this.update();
        }
      });
    };

    $.fn.datepicker.Constructor = Datepicker;
    $.fn.datepicker.language = {
      ru: {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
        daysMin: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        today: 'Сегодня',
        clear: 'Очистить',
        dateFormat: 'dd.mm.yyyy',
        timeFormat: 'hh:ii',
        firstDay: 1
      }
    }; // $.fn.datepicker.language['ru'] =  {
    //     days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    //    daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
    //     daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    //     months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    //     monthsShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    //     today: 'Сегодня',
    //      clear: 'Очистить',
    //       dateFormat: 'dd.mm.yyyy',
    //       timeFormat: 'hh:ii',
    //       firstDay: 1
    //   };

    $(function () {
      $(autoInitSelector).datepicker();
    });
  })();

  ;

  (function () {
    var templates = {
      days: '' + '<div class="datepicker--days datepicker--body">' + '<div class="datepicker--days-names"></div>' + '<div class="datepicker--cells datepicker--cells-days"></div>' + '</div>',
      months: '' + '<div class="datepicker--months datepicker--body">' + '<div class="datepicker--cells datepicker--cells-months"></div>' + '</div>',
      years: '' + '<div class="datepicker--years datepicker--body">' + '<div class="datepicker--cells datepicker--cells-years"></div>' + '</div>'
    },
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;

    datepicker.Body = function (d, type, opts) {
      this.d = d;
      this.type = type;
      this.opts = opts;
      this.$el = $('');
      if (this.opts.onlyTimepicker) return;
      this.init();
    };

    datepicker.Body.prototype = {
      init: function init() {
        this._buildBaseHtml();

        this._render();

        this._bindEvents();
      },
      _bindEvents: function _bindEvents() {
        this.$el.on('click', '.datepicker--cell', $.proxy(this._onClickCell, this));
      },
      _buildBaseHtml: function _buildBaseHtml() {
        this.$el = $(templates[this.type]).appendTo(this.d.$content);
        this.$names = $('.datepicker--days-names', this.$el);
        this.$cells = $('.datepicker--cells', this.$el);
      },
      _getDayNamesHtml: function _getDayNamesHtml(firstDay, curDay, html, i) {
        curDay = curDay != undefined ? curDay : firstDay;
        html = html ? html : '';
        i = i != undefined ? i : 0;
        if (i > 7) return html;
        if (curDay == 7) return this._getDayNamesHtml(firstDay, 0, html, ++i);
        html += '<div class="datepicker--day-name' + (this.d.isWeekend(curDay) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[curDay] + '</div>';
        return this._getDayNamesHtml(firstDay, ++curDay, html, ++i);
      },
      _getCellContents: function _getCellContents(date, type) {
        var classes = "datepicker--cell datepicker--cell-" + type,
            currentDate = new Date(),
            parent = this.d,
            minRange = dp.resetTime(parent.minRange),
            maxRange = dp.resetTime(parent.maxRange),
            opts = parent.opts,
            d = dp.getParsedDate(date),
            render = {},
            html = d.date;

        switch (type) {
          case 'day':
            if (parent.isWeekend(d.day)) classes += " -weekend-";

            if (d.month != this.d.parsedDate.month) {
              classes += " -other-month-";

              if (!opts.selectOtherMonths) {
                classes += " -disabled-";
              }

              if (!opts.showOtherMonths) html = '';
            }

            break;

          case 'month':
            html = parent.loc[parent.opts.monthsField][d.month];
            break;

          case 'year':
            var decade = parent.curDecade;
            html = d.year;

            if (d.year < decade[0] || d.year > decade[1]) {
              classes += ' -other-decade-';

              if (!opts.selectOtherYears) {
                classes += " -disabled-";
              }

              if (!opts.showOtherYears) html = '';
            }

            break;
        }

        if (opts.onRenderCell) {
          render = opts.onRenderCell(date, type) || {};
          html = render.html ? render.html : html;
          classes += render.classes ? ' ' + render.classes : '';
        }

        if (opts.range) {
          if (dp.isSame(minRange, date, type)) classes += ' -range-from-';
          if (dp.isSame(maxRange, date, type)) classes += ' -range-to-';

          if (parent.selectedDates.length == 1 && parent.focused) {
            if (dp.bigger(minRange, date) && dp.less(parent.focused, date) || dp.less(maxRange, date) && dp.bigger(parent.focused, date)) {
              classes += ' -in-range-';
            }

            if (dp.less(maxRange, date) && dp.isSame(parent.focused, date)) {
              classes += ' -range-from-';
            }

            if (dp.bigger(minRange, date) && dp.isSame(parent.focused, date)) {
              classes += ' -range-to-';
            }
          } else if (parent.selectedDates.length == 2) {
            if (dp.bigger(minRange, date) && dp.less(maxRange, date)) {
              classes += ' -in-range-';
            }
          }
        }

        if (dp.isSame(currentDate, date, type)) classes += ' -current-';
        if (parent.focused && dp.isSame(date, parent.focused, type)) classes += ' -focus-';
        if (parent._isSelected(date, type)) classes += ' -selected-';
        if (!parent._isInRange(date, type) || render.disabled) classes += ' -disabled-';
        return {
          html: html,
          classes: classes
        };
      },

      /**
       * Calculates days number to render. Generates days html and returns it.
       * @param {object} date - Date object
       * @returns {string}
       * @private
       */
      _getDaysHtml: function _getDaysHtml(date) {
        var totalMonthDays = dp.getDaysCount(date),
            firstMonthDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
            lastMonthDay = new Date(date.getFullYear(), date.getMonth(), totalMonthDays).getDay(),
            daysFromPevMonth = firstMonthDay - this.d.loc.firstDay,
            daysFromNextMonth = 6 - lastMonthDay + this.d.loc.firstDay;
        daysFromPevMonth = daysFromPevMonth < 0 ? daysFromPevMonth + 7 : daysFromPevMonth;
        daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;
        var startDayIndex = -daysFromPevMonth + 1,
            m,
            y,
            html = '';

        for (var i = startDayIndex, max = totalMonthDays + daysFromNextMonth; i <= max; i++) {
          y = date.getFullYear();
          m = date.getMonth();
          html += this._getDayHtml(new Date(y, m, i));
        }

        return html;
      },
      _getDayHtml: function _getDayHtml(date) {
        var content = this._getCellContents(date, 'day');

        return '<div class="' + content.classes + '" ' + 'data-date="' + date.getDate() + '" ' + 'data-month="' + date.getMonth() + '" ' + 'data-year="' + date.getFullYear() + '">' + content.html + '</div>';
      },

      /**
       * Generates months html
       * @param {object} date - date instance
       * @returns {string}
       * @private
       */
      _getMonthsHtml: function _getMonthsHtml(date) {
        var html = '',
            d = dp.getParsedDate(date),
            i = 0;

        while (i < 12) {
          html += this._getMonthHtml(new Date(d.year, i));
          i++;
        }

        return html;
      },
      _getMonthHtml: function _getMonthHtml(date) {
        var content = this._getCellContents(date, 'month');

        return '<div class="' + content.classes + '" data-month="' + date.getMonth() + '">' + content.html + '</div>';
      },
      _getYearsHtml: function _getYearsHtml(date) {
        var d = dp.getParsedDate(date),
            decade = dp.getDecade(date),
            firstYear = decade[0] - 1,
            html = '',
            i = firstYear;

        for (i; i <= decade[1] + 1; i++) {
          html += this._getYearHtml(new Date(i, 0));
        }

        return html;
      },
      _getYearHtml: function _getYearHtml(date) {
        var content = this._getCellContents(date, 'year');

        return '<div class="' + content.classes + '" data-year="' + date.getFullYear() + '">' + content.html + '</div>';
      },
      _renderTypes: {
        days: function days() {
          var dayNames = this._getDayNamesHtml(this.d.loc.firstDay),
              days = this._getDaysHtml(this.d.currentDate);

          this.$cells.html(days);
          this.$names.html(dayNames);
        },
        months: function months() {
          var html = this._getMonthsHtml(this.d.currentDate);

          this.$cells.html(html);
        },
        years: function years() {
          var html = this._getYearsHtml(this.d.currentDate);

          this.$cells.html(html);
        }
      },
      _render: function _render() {
        if (this.opts.onlyTimepicker) return;

        this._renderTypes[this.type].bind(this)();
      },
      _update: function _update() {
        var $cells = $('.datepicker--cell', this.$cells),
            _this = this,
            classes,
            $cell,
            date;

        $cells.each(function (cell, i) {
          $cell = $(this);
          date = _this.d._getDateFromCell($(this));
          classes = _this._getCellContents(date, _this.d.cellType);
          $cell.attr('class', classes.classes);
        });
      },
      show: function show() {
        if (this.opts.onlyTimepicker) return;
        this.$el.addClass('active');
        this.acitve = true;
      },
      hide: function hide() {
        this.$el.removeClass('active');
        this.active = false;
      },
      //  Events
      // -------------------------------------------------
      _handleClick: function _handleClick(el) {
        var date = el.data('date') || 1,
            month = el.data('month') || 0,
            year = el.data('year') || this.d.parsedDate.year,
            dp = this.d; // Change view if min view does not reach yet

        if (dp.view != this.opts.minView) {
          dp.down(new Date(year, month, date));
          return;
        } // Select date if min view is reached


        var selectedDate = new Date(year, month, date),
            alreadySelected = this.d._isSelected(selectedDate, this.d.cellType);

        if (!alreadySelected) {
          dp._trigger('clickCell', selectedDate);

          return;
        }

        dp._handleAlreadySelectedDates.bind(dp, alreadySelected, selectedDate)();
      },
      _onClickCell: function _onClickCell(e) {
        var $el = $(e.target).closest('.datepicker--cell');
        if ($el.hasClass('-disabled-')) return;

        this._handleClick.bind(this)($el);
      }
    };
  })();

  ;

  (function () {
    var template = '' + '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div>' + '<div class="datepicker--nav-title">#{title}</div>' + '<div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',
        buttonsContainerTemplate = '<div class="datepicker--buttons"></div>',
        button = '<span class="datepicker--button" data-action="#{action}">#{label}</span>',
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;

    datepicker.Navigation = function (d, opts) {
      this.d = d;
      this.opts = opts;
      this.$buttonsContainer = '';
      this.init();
    };

    datepicker.Navigation.prototype = {
      init: function init() {
        this._buildBaseHtml();

        this._bindEvents();
      },
      _bindEvents: function _bindEvents() {
        this.d.$nav.on('click', '.datepicker--nav-action', $.proxy(this._onClickNavButton, this));
        this.d.$nav.on('click', '.datepicker--nav-title', $.proxy(this._onClickNavTitle, this));
        this.d.$datepicker.on('click', '.datepicker--button', $.proxy(this._onClickNavButton, this));
      },
      _buildBaseHtml: function _buildBaseHtml() {
        if (!this.opts.onlyTimepicker) {
          this._render();
        }

        this._addButtonsIfNeed();
      },
      _addButtonsIfNeed: function _addButtonsIfNeed() {
        if (this.opts.todayButton) {
          this._addButton('today');
        }

        if (this.opts.clearButton) {
          this._addButton('clear');
        }
      },
      _render: function _render() {
        var title = this._getTitle(this.d.currentDate),
            html = dp.template(template, $.extend({
          title: title
        }, this.opts));

        this.d.$nav.html(html);

        if (this.d.view == 'years') {
          $('.datepicker--nav-title', this.d.$nav).addClass('-disabled-');
        }

        this.setNavStatus();
      },
      _getTitle: function _getTitle(date) {
        return this.d.formatDate(this.opts.navTitles[this.d.view], date);
      },
      _addButton: function _addButton(type) {
        if (!this.$buttonsContainer.length) {
          this._addButtonsContainer();
        }

        var data = {
          action: type,
          label: this.d.loc[type]
        },
            html = dp.template(button, data);
        if ($('[data-action=' + type + ']', this.$buttonsContainer).length) return;
        this.$buttonsContainer.append(html);
      },
      _addButtonsContainer: function _addButtonsContainer() {
        this.d.$datepicker.append(buttonsContainerTemplate);
        this.$buttonsContainer = $('.datepicker--buttons', this.d.$datepicker);
      },
      setNavStatus: function setNavStatus() {
        if (!(this.opts.minDate || this.opts.maxDate) || !this.opts.disableNavWhenOutOfRange) return;
        var date = this.d.parsedDate,
            m = date.month,
            y = date.year,
            d = date.date;

        switch (this.d.view) {
          case 'days':
            if (!this.d._isInRange(new Date(y, m - 1, 1), 'month')) {
              this._disableNav('prev');
            }

            if (!this.d._isInRange(new Date(y, m + 1, 1), 'month')) {
              this._disableNav('next');
            }

            break;

          case 'months':
            if (!this.d._isInRange(new Date(y - 1, m, d), 'year')) {
              this._disableNav('prev');
            }

            if (!this.d._isInRange(new Date(y + 1, m, d), 'year')) {
              this._disableNav('next');
            }

            break;

          case 'years':
            var decade = dp.getDecade(this.d.date);

            if (!this.d._isInRange(new Date(decade[0] - 1, 0, 1), 'year')) {
              this._disableNav('prev');
            }

            if (!this.d._isInRange(new Date(decade[1] + 1, 0, 1), 'year')) {
              this._disableNav('next');
            }

            break;
        }
      },
      _disableNav: function _disableNav(nav) {
        $('[data-action="' + nav + '"]', this.d.$nav).addClass('-disabled-');
      },
      _activateNav: function _activateNav(nav) {
        $('[data-action="' + nav + '"]', this.d.$nav).removeClass('-disabled-');
      },
      _onClickNavButton: function _onClickNavButton(e) {
        var $el = $(e.target).closest('[data-action]'),
            action = $el.data('action');
        this.d[action]();
      },
      _onClickNavTitle: function _onClickNavTitle(e) {
        if ($(e.target).hasClass('-disabled-')) return;

        if (this.d.view == 'days') {
          return this.d.view = 'months';
        }

        this.d.view = 'years';
      }
    };
  })();

  ;

  (function () {
    var template = '<div class="datepicker--time">' + '<div class="datepicker--time-current">' + '   <span class="datepicker--time-current-hours">#{hourVisible}</span>' + '   <span class="datepicker--time-current-colon">:</span>' + '   <span class="datepicker--time-current-minutes">#{minValue}</span>' + '</div>' + '<div class="datepicker--time-sliders">' + '   <div class="datepicker--time-row">' + '      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>' + '   </div>' + '   <div class="datepicker--time-row">' + '      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>' + '   </div>' + '</div>' + '</div>',
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;

    datepicker.Timepicker = function (inst, opts) {
      this.d = inst;
      this.opts = opts;
      this.init();
    };

    datepicker.Timepicker.prototype = {
      init: function init() {
        var input = 'input';

        this._setTime(this.d.date);

        this._buildHTML();

        if (navigator.userAgent.match(/trident/gi)) {
          input = 'change';
        }

        this.d.$el.on('selectDate', this._onSelectDate.bind(this));
        this.$ranges.on(input, this._onChangeRange.bind(this));
        this.$ranges.on('mouseup', this._onMouseUpRange.bind(this));
        this.$ranges.on('mousemove focus ', this._onMouseEnterRange.bind(this));
        this.$ranges.on('mouseout blur', this._onMouseOutRange.bind(this));
      },
      _setTime: function _setTime(date) {
        var _date = dp.getParsedDate(date);

        this._handleDate(date);

        this.hours = _date.hours < this.minHours ? this.minHours : _date.hours;
        this.minutes = _date.minutes < this.minMinutes ? this.minMinutes : _date.minutes;
      },

      /**
       * Sets minHours and minMinutes from date (usually it's a minDate)
       * Also changes minMinutes if current hours are bigger then @date hours
       * @param date {Date}
       * @private
       */
      _setMinTimeFromDate: function _setMinTimeFromDate(date) {
        this.minHours = date.getHours();
        this.minMinutes = date.getMinutes(); // If, for example, min hours are 10, and current hours are 12,
        // update minMinutes to default value, to be able to choose whole range of values

        if (this.d.lastSelectedDate) {
          if (this.d.lastSelectedDate.getHours() > date.getHours()) {
            this.minMinutes = this.opts.minMinutes;
          }
        }
      },
      _setMaxTimeFromDate: function _setMaxTimeFromDate(date) {
        this.maxHours = date.getHours();
        this.maxMinutes = date.getMinutes();

        if (this.d.lastSelectedDate) {
          if (this.d.lastSelectedDate.getHours() < date.getHours()) {
            this.maxMinutes = this.opts.maxMinutes;
          }
        }
      },
      _setDefaultMinMaxTime: function _setDefaultMinMaxTime() {
        var maxHours = 23,
            maxMinutes = 59,
            opts = this.opts;
        this.minHours = opts.minHours < 0 || opts.minHours > maxHours ? 0 : opts.minHours;
        this.minMinutes = opts.minMinutes < 0 || opts.minMinutes > maxMinutes ? 0 : opts.minMinutes;
        this.maxHours = opts.maxHours < 0 || opts.maxHours > maxHours ? maxHours : opts.maxHours;
        this.maxMinutes = opts.maxMinutes < 0 || opts.maxMinutes > maxMinutes ? maxMinutes : opts.maxMinutes;
      },

      /**
       * Looks for min/max hours/minutes and if current values
       * are out of range sets valid values.
       * @private
       */
      _validateHoursMinutes: function _validateHoursMinutes(date) {
        if (this.hours < this.minHours) {
          this.hours = this.minHours;
        } else if (this.hours > this.maxHours) {
          this.hours = this.maxHours;
        }

        if (this.minutes < this.minMinutes) {
          this.minutes = this.minMinutes;
        } else if (this.minutes > this.maxMinutes) {
          this.minutes = this.maxMinutes;
        }
      },
      _buildHTML: function _buildHTML() {
        var lz = dp.getLeadingZeroNum,
            data = {
          hourMin: this.minHours,
          hourMax: lz(this.maxHours),
          hourStep: this.opts.hoursStep,
          hourValue: this.hours,
          hourVisible: lz(this.displayHours),
          minMin: this.minMinutes,
          minMax: lz(this.maxMinutes),
          minStep: this.opts.minutesStep,
          minValue: lz(this.minutes)
        },
            _template = dp.template(template, data);

        this.$timepicker = $(_template).appendTo(this.d.$datepicker);
        this.$ranges = $('[type="range"]', this.$timepicker);
        this.$hours = $('[name="hours"]', this.$timepicker);
        this.$minutes = $('[name="minutes"]', this.$timepicker);
        this.$hoursText = $('.datepicker--time-current-hours', this.$timepicker);
        this.$minutesText = $('.datepicker--time-current-minutes', this.$timepicker);

        if (this.d.ampm) {
          this.$ampm = $('<span class="datepicker--time-current-ampm">').appendTo($('.datepicker--time-current', this.$timepicker)).html(this.dayPeriod);
          this.$timepicker.addClass('-am-pm-');
        }
      },
      _updateCurrentTime: function _updateCurrentTime() {
        var h = dp.getLeadingZeroNum(this.displayHours),
            m = dp.getLeadingZeroNum(this.minutes);
        this.$hoursText.html(h);
        this.$minutesText.html(m);

        if (this.d.ampm) {
          this.$ampm.html(this.dayPeriod);
        }
      },
      _updateRanges: function _updateRanges() {
        this.$hours.attr({
          min: this.minHours,
          max: this.maxHours
        }).val(this.hours);
        this.$minutes.attr({
          min: this.minMinutes,
          max: this.maxMinutes
        }).val(this.minutes);
      },

      /**
       * Sets minHours, minMinutes etc. from date. If date is not passed, than sets
       * values from options
       * @param [date] {object} - Date object, to get values from
       * @private
       */
      _handleDate: function _handleDate(date) {
        this._setDefaultMinMaxTime();

        if (date) {
          if (dp.isSame(date, this.d.opts.minDate)) {
            this._setMinTimeFromDate(this.d.opts.minDate);
          } else if (dp.isSame(date, this.d.opts.maxDate)) {
            this._setMaxTimeFromDate(this.d.opts.maxDate);
          }
        }

        this._validateHoursMinutes(date);
      },
      update: function update() {
        this._updateRanges();

        this._updateCurrentTime();
      },

      /**
       * Calculates valid hour value to display in text input and datepicker's body.
       * @param date {Date|Number} - date or hours
       * @param [ampm] {Boolean} - 12 hours mode
       * @returns {{hours: *, dayPeriod: string}}
       * @private
       */
      _getValidHoursFromDate: function _getValidHoursFromDate(date, ampm) {
        var d = date,
            hours = date;

        if (date instanceof Date) {
          d = dp.getParsedDate(date);
          hours = d.hours;
        }

        var _ampm = ampm || this.d.ampm,
            dayPeriod = 'am';

        if (_ampm) {
          switch (true) {
            case hours == 0:
              hours = 12;
              break;

            case hours == 12:
              dayPeriod = 'pm';
              break;

            case hours > 11:
              hours = hours - 12;
              dayPeriod = 'pm';
              break;

            default:
              break;
          }
        }

        return {
          hours: hours,
          dayPeriod: dayPeriod
        };
      },

      set hours(val) {
        this._hours = val;

        var displayHours = this._getValidHoursFromDate(val);

        this.displayHours = displayHours.hours;
        this.dayPeriod = displayHours.dayPeriod;
      },

      get hours() {
        return this._hours;
      },

      //  Events
      // -------------------------------------------------
      _onChangeRange: function _onChangeRange(e) {
        var $target = $(e.target),
            name = $target.attr('name');
        this.d.timepickerIsActive = true;
        this[name] = $target.val();

        this._updateCurrentTime();

        this.d._trigger('timeChange', [this.hours, this.minutes]);

        this._handleDate(this.d.lastSelectedDate);

        this.update();
      },
      _onSelectDate: function _onSelectDate(e, data) {
        this._handleDate(data);

        this.update();
      },
      _onMouseEnterRange: function _onMouseEnterRange(e) {
        var name = $(e.target).attr('name');
        $('.datepicker--time-current-' + name, this.$timepicker).addClass('-focus-');
      },
      _onMouseOutRange: function _onMouseOutRange(e) {
        var name = $(e.target).attr('name');
        if (this.d.inFocus) return; // Prevent removing focus when mouse out of range slider

        $('.datepicker--time-current-' + name, this.$timepicker).removeClass('-focus-');
      },
      _onMouseUpRange: function _onMouseUpRange(e) {
        this.d.timepickerIsActive = false;
      }
    };
  })();
})(window, jQuery);

/***/ }),

/***/ "./modules/datepicker/datepicker.min.js":
/*!**********************************************!*\
  !*** ./modules/datepicker/datepicker.min.js ***!
  \**********************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, e, i) {
  !function () {
    var s,
        a,
        n,
        h = "2.2.3",
        o = "datepicker",
        r = ".datepicker-here",
        c = !1,
        d = '<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>',
        l = {
      classes: "",
      inline: !1,
      language: "ru",
      startDate: new Date(),
      firstDay: "",
      weekends: [6, 0],
      dateFormat: "",
      altField: "",
      altFieldDateFormat: "@",
      toggleSelected: !0,
      keyboardNav: !0,
      position: "bottom left",
      offset: 12,
      view: "days",
      minView: "days",
      showOtherMonths: !0,
      selectOtherMonths: !0,
      moveToOtherMonthsOnSelect: !0,
      showOtherYears: !0,
      selectOtherYears: !0,
      moveToOtherYearsOnSelect: !0,
      minDate: "",
      maxDate: "",
      disableNavWhenOutOfRange: !0,
      multipleDates: !1,
      multipleDatesSeparator: ",",
      range: !1,
      todayButton: !1,
      clearButton: !1,
      showEvent: "focus",
      autoClose: !1,
      monthsField: "monthsShort",
      prevHtml: '<svg class="svg-back"></svg>',
      nextHtml: '<svg class="svg-next"></svg>',
      navTitles: {
        days: "MM <i>yyyy</i>",
        months: "yyyy",
        years: "yyyy1 - yyyy2"
      },
      timepicker: !1,
      onlyTimepicker: !1,
      dateTimeSeparator: " ",
      timeFormat: "",
      minHours: 0,
      maxHours: 24,
      minMinutes: 0,
      maxMinutes: 59,
      hoursStep: 1,
      minutesStep: 1,
      onSelect: "",
      onShow: "",
      onHide: "",
      onChangeMonth: "",
      onChangeYear: "",
      onChangeDecade: "",
      onChangeView: "",
      onRenderCell: ""
    },
        u = {
      ctrlRight: [17, 39],
      ctrlUp: [17, 38],
      ctrlLeft: [17, 37],
      ctrlDown: [17, 40],
      shiftRight: [16, 39],
      shiftUp: [16, 38],
      shiftLeft: [16, 37],
      shiftDown: [16, 40],
      altUp: [18, 38],
      altRight: [18, 39],
      altLeft: [18, 37],
      altDown: [18, 40],
      ctrlShiftUp: [16, 17, 38]
    },
        m = function m(t, a) {
      this.el = t, this.$el = e(t), this.opts = e.extend(!0, {}, l, a, this.$el.data()), s == i && (s = e("body")), this.opts.startDate || (this.opts.startDate = new Date()), "INPUT" == this.el.nodeName && (this.elIsInput = !0), this.opts.altField && (this.$altField = "string" == typeof this.opts.altField ? e(this.opts.altField) : this.opts.altField), this.inited = !1, this.visible = !1, this.silent = !1, this.currentDate = this.opts.startDate, this.currentView = this.opts.view, this._createShortCuts(), this.selectedDates = [], this.views = {}, this.keys = [], this.minRange = "", this.maxRange = "", this._prevOnSelectValue = "", this.init();
    };

    n = m, n.prototype = {
      VERSION: h,
      viewIndexes: ["days", "months", "years"],
      init: function init() {
        c || this.opts.inline || !this.elIsInput || this._buildDatepickersContainer(), this._buildBaseHtml(), this._defineLocale(this.opts.language), this._syncWithMinMaxDates(), this.elIsInput && (this.opts.inline || (this._setPositionClasses(this.opts.position), this._bindEvents()), this.opts.keyboardNav && !this.opts.onlyTimepicker && this._bindKeyboardEvents(), this.$datepicker.on("mousedown", this._onMouseDownDatepicker.bind(this)), this.$datepicker.on("mouseup", this._onMouseUpDatepicker.bind(this))), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.timepicker && (this.timepicker = new e.fn.datepicker.Timepicker(this, this.opts), this._bindTimepickerEvents()), this.opts.onlyTimepicker && this.$datepicker.addClass("-only-timepicker-"), this.views[this.currentView] = new e.fn.datepicker.Body(this, this.currentView, this.opts), this.views[this.currentView].show(), this.nav = new e.fn.datepicker.Navigation(this, this.opts), this.view = this.currentView, this.$el.on("clickCell.adp", this._onClickCell.bind(this)), this.$datepicker.on("mouseenter", ".datepicker--cell", this._onMouseEnterCell.bind(this)), this.$datepicker.on("mouseleave", ".datepicker--cell", this._onMouseLeaveCell.bind(this)), this.inited = !0;
      },
      _createShortCuts: function _createShortCuts() {
        this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-86399999136e5), this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(86399999136e5);
      },
      _bindEvents: function _bindEvents() {
        this.$el.on(this.opts.showEvent + ".adp", this._onShowEvent.bind(this)), this.$el.on("mouseup.adp", this._onMouseUpEl.bind(this)), this.$el.on("blur.adp", this._onBlur.bind(this)), this.$el.on("keyup.adp", this._onKeyUpGeneral.bind(this)), e(t).on("resize.adp", this._onResize.bind(this)), e("body").on("mouseup.adp", this._onMouseUpBody.bind(this));
      },
      _bindKeyboardEvents: function _bindKeyboardEvents() {
        this.$el.on("keydown.adp", this._onKeyDown.bind(this)), this.$el.on("keyup.adp", this._onKeyUp.bind(this)), this.$el.on("hotKey.adp", this._onHotKey.bind(this));
      },
      _bindTimepickerEvents: function _bindTimepickerEvents() {
        this.$el.on("timeChange.adp", this._onTimeChange.bind(this));
      },
      isWeekend: function isWeekend(t) {
        return -1 !== this.opts.weekends.indexOf(t);
      },
      _defineLocale: function _defineLocale(t) {
        "string" == typeof t ? (this.loc = e.fn.datepicker.language[t], this.loc || (console.warn("Can't find language \"" + t + '" in Datepicker.language, will use "ru" instead'), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru)), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, e.fn.datepicker.language[t])) : this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, t), this.opts.dateFormat && (this.loc.dateFormat = this.opts.dateFormat), this.opts.timeFormat && (this.loc.timeFormat = this.opts.timeFormat), "" !== this.opts.firstDay && (this.loc.firstDay = this.opts.firstDay), this.opts.timepicker && (this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator)), this.opts.onlyTimepicker && (this.loc.dateFormat = this.loc.timeFormat);
        var i = this._getWordBoundaryRegExp;
        (this.loc.timeFormat.match(i("aa")) || this.loc.timeFormat.match(i("AA"))) && (this.ampm = !0);
      },
      _buildDatepickersContainer: function _buildDatepickersContainer() {
        c = !0, s.append('<div class="datepickers-container" id="datepickers-container"></div>'), a = e("#datepickers-container");
      },
      _buildBaseHtml: function _buildBaseHtml() {
        var t,
            i = e('<div class="datepicker-inline">');
        t = "INPUT" == this.el.nodeName ? this.opts.inline ? i.insertAfter(this.$el) : a : i.appendTo(this.$el), this.$datepicker = e(d).appendTo(t), this.$content = e(".datepicker--content", this.$datepicker), this.$nav = e(".datepicker--nav", this.$datepicker);
      },
      _triggerOnChange: function _triggerOnChange() {
        if (!this.selectedDates.length) {
          if ("" === this._prevOnSelectValue) return;
          return this._prevOnSelectValue = "", this.opts.onSelect("", "", this);
        }

        var t,
            e = this.selectedDates,
            i = n.getParsedDate(e[0]),
            s = this,
            a = new Date(i.year, i.month, i.date, i.hours, i.minutes);
        t = e.map(function (t) {
          return s.formatDate(s.loc.dateFormat, t);
        }).join(this.opts.multipleDatesSeparator), (this.opts.multipleDates || this.opts.range) && (a = e.map(function (t) {
          var e = n.getParsedDate(t);
          return new Date(e.year, e.month, e.date, e.hours, e.minutes);
        })), this._prevOnSelectValue = t, this.opts.onSelect(t, a, this);
      },
      next: function next() {
        var t = this.parsedDate,
            e = this.opts;

        switch (this.view) {
          case "days":
            this.date = new Date(t.year, t.month + 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
            break;

          case "months":
            this.date = new Date(t.year + 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);
            break;

          case "years":
            this.date = new Date(t.year + 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade);
        }
      },
      prev: function prev() {
        var t = this.parsedDate,
            e = this.opts;

        switch (this.view) {
          case "days":
            this.date = new Date(t.year, t.month - 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
            break;

          case "months":
            this.date = new Date(t.year - 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);
            break;

          case "years":
            this.date = new Date(t.year - 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade);
        }
      },
      formatDate: function formatDate(t, e) {
        e = e || this.date;
        var i,
            s = t,
            a = this._getWordBoundaryRegExp,
            h = this.loc,
            o = n.getLeadingZeroNum,
            r = n.getDecade(e),
            c = n.getParsedDate(e),
            d = c.fullHours,
            l = c.hours,
            u = t.match(a("aa")) || t.match(a("AA")),
            m = "am",
            p = this._replacer;

        switch (this.opts.timepicker && this.timepicker && u && (i = this.timepicker._getValidHoursFromDate(e, u), d = o(i.hours), l = i.hours, m = i.dayPeriod), !0) {
          case /@/.test(s):
            s = s.replace(/@/, e.getTime());

          case /aa/.test(s):
            s = p(s, a("aa"), m);

          case /AA/.test(s):
            s = p(s, a("AA"), m.toUpperCase());

          case /dd/.test(s):
            s = p(s, a("dd"), c.fullDate);

          case /d/.test(s):
            s = p(s, a("d"), c.date);

          case /DD/.test(s):
            s = p(s, a("DD"), h.days[c.day]);

          case /D/.test(s):
            s = p(s, a("D"), h.daysShort[c.day]);

          case /mm/.test(s):
            s = p(s, a("mm"), c.fullMonth);

          case /m/.test(s):
            s = p(s, a("m"), c.month + 1);

          case /MM/.test(s):
            s = p(s, a("MM"), this.loc.months[c.month]);

          case /M/.test(s):
            s = p(s, a("M"), h.monthsShort[c.month]);

          case /ii/.test(s):
            s = p(s, a("ii"), c.fullMinutes);

          case /i/.test(s):
            s = p(s, a("i"), c.minutes);

          case /hh/.test(s):
            s = p(s, a("hh"), d);

          case /h/.test(s):
            s = p(s, a("h"), l);

          case /yyyy/.test(s):
            s = p(s, a("yyyy"), c.year);

          case /yyyy1/.test(s):
            s = p(s, a("yyyy1"), r[0]);

          case /yyyy2/.test(s):
            s = p(s, a("yyyy2"), r[1]);

          case /yy/.test(s):
            s = p(s, a("yy"), c.year.toString().slice(-2));
        }

        return s;
      },
      _replacer: function _replacer(t, e, i) {
        return t.replace(e, function (t, e, s, a) {
          return e + i + a;
        });
      },
      _getWordBoundaryRegExp: function _getWordBoundaryRegExp(t) {
        var e = "\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";
        return new RegExp("(^|>|" + e + ")(" + t + ")($|<|" + e + ")", "g");
      },
      selectDate: function selectDate(t) {
        var e = this,
            i = e.opts,
            s = e.parsedDate,
            a = e.selectedDates,
            h = a.length,
            o = "";
        if (Array.isArray(t)) return void t.forEach(function (t) {
          e.selectDate(t);
        });

        if (t instanceof Date) {
          if (this.lastSelectedDate = t, this.timepicker && this.timepicker._setTime(t), e._trigger("selectDate", t), this.timepicker && (t.setHours(this.timepicker.hours), t.setMinutes(this.timepicker.minutes)), "days" == e.view && t.getMonth() != s.month && i.moveToOtherMonthsOnSelect && (o = new Date(t.getFullYear(), t.getMonth(), 1)), "years" == e.view && t.getFullYear() != s.year && i.moveToOtherYearsOnSelect && (o = new Date(t.getFullYear(), 0, 1)), o && (e.silent = !0, e.date = o, e.silent = !1, e.nav._render()), i.multipleDates && !i.range) {
            if (h === i.multipleDates) return;
            e._isSelected(t) || e.selectedDates.push(t);
          } else i.range ? 2 == h ? (e.selectedDates = [t], e.minRange = t, e.maxRange = "") : 1 == h ? (e.selectedDates.push(t), e.maxRange ? e.minRange = t : e.maxRange = t, n.bigger(e.maxRange, e.minRange) && (e.maxRange = e.minRange, e.minRange = t), e.selectedDates = [e.minRange, e.maxRange]) : (e.selectedDates = [t], e.minRange = t) : e.selectedDates = [t];

          e._setInputValue(), i.onSelect && e._triggerOnChange(), i.autoClose && !this.timepickerIsActive && (i.multipleDates || i.range ? i.range && 2 == e.selectedDates.length && e.hide() : e.hide()), e.views[this.currentView]._render();
        }
      },
      removeDate: function removeDate(t) {
        var e = this.selectedDates,
            i = this;
        if (t instanceof Date) return e.some(function (s, a) {
          return n.isSame(s, t) ? (e.splice(a, 1), i.selectedDates.length ? i.lastSelectedDate = i.selectedDates[i.selectedDates.length - 1] : (i.minRange = "", i.maxRange = "", i.lastSelectedDate = ""), i.views[i.currentView]._render(), i._setInputValue(), i.opts.onSelect && i._triggerOnChange(), !0) : void 0;
        });
      },
      today: function today() {
        this.silent = !0, this.view = this.opts.minView, this.silent = !1, this.date = new Date(), this.opts.todayButton instanceof Date && this.selectDate(this.opts.todayButton);
      },
      clear: function clear() {
        this.selectedDates = [], this.minRange = "", this.maxRange = "", this.views[this.currentView]._render(), this._setInputValue(), this.opts.onSelect && this._triggerOnChange();
      },
      update: function update(t, i) {
        var s = arguments.length,
            a = this.lastSelectedDate;
        return 2 == s ? this.opts[t] = i : 1 == s && "object" == _typeof(t) && (this.opts = e.extend(!0, this.opts, t)), this._createShortCuts(), this._syncWithMinMaxDates(), this._defineLocale(this.opts.language), this.nav._addButtonsIfNeed(), this.opts.onlyTimepicker || this.nav._render(), this.views[this.currentView]._render(), this.elIsInput && !this.opts.inline && (this._setPositionClasses(this.opts.position), this.visible && this.setPosition(this.opts.position)), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.onlyTimepicker && this.$datepicker.addClass("-only-timepicker-"), this.opts.timepicker && (a && this.timepicker._handleDate(a), this.timepicker._updateRanges(), this.timepicker._updateCurrentTime(), a && (a.setHours(this.timepicker.hours), a.setMinutes(this.timepicker.minutes))), this._setInputValue(), this;
      },
      _syncWithMinMaxDates: function _syncWithMinMaxDates() {
        var t = this.date.getTime();
        this.silent = !0, this.minTime > t && (this.date = this.minDate), this.maxTime < t && (this.date = this.maxDate), this.silent = !1;
      },
      _isSelected: function _isSelected(t, e) {
        var i = !1;
        return this.selectedDates.some(function (s) {
          return n.isSame(s, t, e) ? (i = s, !0) : void 0;
        }), i;
      },
      _setInputValue: function _setInputValue() {
        var t,
            e = this,
            i = e.opts,
            s = e.loc.dateFormat,
            a = i.altFieldDateFormat,
            n = e.selectedDates.map(function (t) {
          return e.formatDate(s, t);
        });
        i.altField && e.$altField.length && (t = this.selectedDates.map(function (t) {
          return e.formatDate(a, t);
        }), t = t.join(this.opts.multipleDatesSeparator), this.$altField.val(t)), n = n.join(this.opts.multipleDatesSeparator), this.$el.val(n);
      },
      _isInRange: function _isInRange(t, e) {
        var i = t.getTime(),
            s = n.getParsedDate(t),
            a = n.getParsedDate(this.minDate),
            h = n.getParsedDate(this.maxDate),
            o = new Date(s.year, s.month, a.date).getTime(),
            r = new Date(s.year, s.month, h.date).getTime(),
            c = {
          day: i >= this.minTime && i <= this.maxTime,
          month: o >= this.minTime && r <= this.maxTime,
          year: s.year >= a.year && s.year <= h.year
        };
        return e ? c[e] : c.day;
      },
      _getDimensions: function _getDimensions(t) {
        var e = t.offset();
        return {
          width: t.outerWidth(),
          height: t.outerHeight(),
          left: e.left,
          top: e.top
        };
      },
      _getDateFromCell: function _getDateFromCell(t) {
        var e = this.parsedDate,
            s = t.data("year") || e.year,
            a = t.data("month") == i ? e.month : t.data("month"),
            n = t.data("date") || 1;
        return new Date(s, a, n);
      },
      _setPositionClasses: function _setPositionClasses(t) {
        t = t.split(" ");
        var e = t[0],
            i = t[1],
            s = "datepicker -" + e + "-" + i + "- -from-" + e + "-";
        this.visible && (s += " active"), this.$datepicker.removeAttr("class").addClass(s);
      },
      setPosition: function setPosition(t) {
        t = t || this.opts.position;

        var e,
            i,
            s = this._getDimensions(this.$el),
            a = this._getDimensions(this.$datepicker),
            n = t.split(" "),
            h = this.opts.offset,
            o = n[0],
            r = n[1];

        switch (o) {
          case "top":
            e = s.top - a.height - h;
            break;

          case "right":
            i = s.left + s.width + h;
            break;

          case "bottom":
            e = s.top + s.height + h;
            break;

          case "left":
            i = s.left - a.width - h;
        }

        switch (r) {
          case "top":
            e = s.top;
            break;

          case "right":
            i = s.left + s.width - a.width;
            break;

          case "bottom":
            e = s.top + s.height - a.height;
            break;

          case "left":
            i = s.left;
            break;

          case "center":
            /left|right/.test(o) ? e = s.top + s.height / 2 - a.height / 2 : i = s.left + s.width / 2 - a.width / 2;
        }

        this.$datepicker.css({
          left: i,
          top: e
        });
      },
      show: function show() {
        var t = this.opts.onShow;
        this.setPosition(this.opts.position), this.$datepicker.addClass("active"), this.visible = !0, t && this._bindVisionEvents(t);
      },
      hide: function hide() {
        var t = this.opts.onHide;
        this.$datepicker.removeClass("active").css({
          left: "-100000px"
        }), this.focused = "", this.keys = [], this.inFocus = !1, this.visible = !1, this.$el.blur(), t && this._bindVisionEvents(t);
      },
      down: function down(t) {
        this._changeView(t, "down");
      },
      up: function up(t) {
        this._changeView(t, "up");
      },
      _bindVisionEvents: function _bindVisionEvents(t) {
        this.$datepicker.off("transitionend.dp"), t(this, !1), this.$datepicker.one("transitionend.dp", t.bind(this, this, !0));
      },
      _changeView: function _changeView(t, e) {
        t = t || this.focused || this.date;
        var i = "up" == e ? this.viewIndex + 1 : this.viewIndex - 1;
        i > 2 && (i = 2), 0 > i && (i = 0), this.silent = !0, this.date = new Date(t.getFullYear(), t.getMonth(), 1), this.silent = !1, this.view = this.viewIndexes[i];
      },
      _handleHotKey: function _handleHotKey(t) {
        var e,
            i,
            s,
            a = n.getParsedDate(this._getFocusedDate()),
            h = this.opts,
            o = !1,
            r = !1,
            c = !1,
            d = a.year,
            l = a.month,
            u = a.date;

        switch (t) {
          case "ctrlRight":
          case "ctrlUp":
            l += 1, o = !0;
            break;

          case "ctrlLeft":
          case "ctrlDown":
            l -= 1, o = !0;
            break;

          case "shiftRight":
          case "shiftUp":
            r = !0, d += 1;
            break;

          case "shiftLeft":
          case "shiftDown":
            r = !0, d -= 1;
            break;

          case "altRight":
          case "altUp":
            c = !0, d += 10;
            break;

          case "altLeft":
          case "altDown":
            c = !0, d -= 10;
            break;

          case "ctrlShiftUp":
            this.up();
        }

        s = n.getDaysCount(new Date(d, l)), i = new Date(d, l, u), u > s && (u = s), i.getTime() < this.minTime ? i = this.minDate : i.getTime() > this.maxTime && (i = this.maxDate), this.focused = i, e = n.getParsedDate(i), o && h.onChangeMonth && h.onChangeMonth(e.month, e.year), r && h.onChangeYear && h.onChangeYear(e.year), c && h.onChangeDecade && h.onChangeDecade(this.curDecade);
      },
      _registerKey: function _registerKey(t) {
        var e = this.keys.some(function (e) {
          return e == t;
        });
        e || this.keys.push(t);
      },
      _unRegisterKey: function _unRegisterKey(t) {
        var e = this.keys.indexOf(t);
        this.keys.splice(e, 1);
      },
      _isHotKeyPressed: function _isHotKeyPressed() {
        var t,
            e = !1,
            i = this,
            s = this.keys.sort();

        for (var a in u) {
          t = u[a], s.length == t.length && t.every(function (t, e) {
            return t == s[e];
          }) && (i._trigger("hotKey", a), e = !0);
        }

        return e;
      },
      _trigger: function _trigger(t, e) {
        this.$el.trigger(t, e);
      },
      _focusNextCell: function _focusNextCell(t, e) {
        e = e || this.cellType;
        var i = n.getParsedDate(this._getFocusedDate()),
            s = i.year,
            a = i.month,
            h = i.date;

        if (!this._isHotKeyPressed()) {
          switch (t) {
            case 37:
              "day" == e ? h -= 1 : "", "month" == e ? a -= 1 : "", "year" == e ? s -= 1 : "";
              break;

            case 38:
              "day" == e ? h -= 7 : "", "month" == e ? a -= 3 : "", "year" == e ? s -= 4 : "";
              break;

            case 39:
              "day" == e ? h += 1 : "", "month" == e ? a += 1 : "", "year" == e ? s += 1 : "";
              break;

            case 40:
              "day" == e ? h += 7 : "", "month" == e ? a += 3 : "", "year" == e ? s += 4 : "";
          }

          var o = new Date(s, a, h);
          o.getTime() < this.minTime ? o = this.minDate : o.getTime() > this.maxTime && (o = this.maxDate), this.focused = o;
        }
      },
      _getFocusedDate: function _getFocusedDate() {
        var t = this.focused || this.selectedDates[this.selectedDates.length - 1],
            e = this.parsedDate;
        if (!t) switch (this.view) {
          case "days":
            t = new Date(e.year, e.month, new Date().getDate());
            break;

          case "months":
            t = new Date(e.year, e.month, 1);
            break;

          case "years":
            t = new Date(e.year, 0, 1);
        }
        return t;
      },
      _getCell: function _getCell(t, i) {
        i = i || this.cellType;
        var s,
            a = n.getParsedDate(t),
            h = '.datepicker--cell[data-year="' + a.year + '"]';

        switch (i) {
          case "month":
            h = '[data-month="' + a.month + '"]';
            break;

          case "day":
            h += '[data-month="' + a.month + '"][data-date="' + a.date + '"]';
        }

        return s = this.views[this.currentView].$el.find(h), s.length ? s : e("");
      },
      destroy: function destroy() {
        var t = this;
        t.$el.off(".adp").data("datepicker", ""), t.selectedDates = [], t.focused = "", t.views = {}, t.keys = [], t.minRange = "", t.maxRange = "", t.opts.inline || !t.elIsInput ? t.$datepicker.closest(".datepicker-inline").remove() : t.$datepicker.remove();
      },
      _handleAlreadySelectedDates: function _handleAlreadySelectedDates(t, e) {
        this.opts.range ? this.opts.toggleSelected ? this.removeDate(e) : 2 != this.selectedDates.length && this._trigger("clickCell", e) : this.opts.toggleSelected && this.removeDate(e), this.opts.toggleSelected || (this.lastSelectedDate = t, this.opts.timepicker && (this.timepicker._setTime(t), this.timepicker.update()));
      },
      _onShowEvent: function _onShowEvent(t) {
        this.visible || this.show();
      },
      _onBlur: function _onBlur() {
        !this.inFocus && this.visible && this.hide();
      },
      _onMouseDownDatepicker: function _onMouseDownDatepicker(t) {
        this.inFocus = !0;
      },
      _onMouseUpDatepicker: function _onMouseUpDatepicker(t) {
        this.inFocus = !1, t.originalEvent.inFocus = !0, t.originalEvent.timepickerFocus || this.$el.focus();
      },
      _onKeyUpGeneral: function _onKeyUpGeneral(t) {
        var e = this.$el.val();
        e || this.clear();
      },
      _onResize: function _onResize() {
        this.visible && this.setPosition();
      },
      _onMouseUpBody: function _onMouseUpBody(t) {
        t.originalEvent.inFocus || this.visible && !this.inFocus && this.hide();
      },
      _onMouseUpEl: function _onMouseUpEl(t) {
        t.originalEvent.inFocus = !0, setTimeout(this._onKeyUpGeneral.bind(this), 4);
      },
      _onKeyDown: function _onKeyDown(t) {
        var e = t.which;

        if (this._registerKey(e), e >= 37 && 40 >= e && (t.preventDefault(), this._focusNextCell(e)), 13 == e && this.focused) {
          if (this._getCell(this.focused).hasClass("-disabled-")) return;
          if (this.view != this.opts.minView) this.down();else {
            var i = this._isSelected(this.focused, this.cellType);

            if (!i) return this.timepicker && (this.focused.setHours(this.timepicker.hours), this.focused.setMinutes(this.timepicker.minutes)), void this.selectDate(this.focused);

            this._handleAlreadySelectedDates(i, this.focused);
          }
        }

        27 == e && this.hide();
      },
      _onKeyUp: function _onKeyUp(t) {
        var e = t.which;

        this._unRegisterKey(e);
      },
      _onHotKey: function _onHotKey(t, e) {
        this._handleHotKey(e);
      },
      _onMouseEnterCell: function _onMouseEnterCell(t) {
        var i = e(t.target).closest(".datepicker--cell"),
            s = this._getDateFromCell(i);

        this.silent = !0, this.focused && (this.focused = ""), i.addClass("-focus-"), this.focused = s, this.silent = !1, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", n.less(this.minRange, this.focused) && (this.maxRange = this.minRange, this.minRange = ""), this.views[this.currentView]._update());
      },
      _onMouseLeaveCell: function _onMouseLeaveCell(t) {
        var i = e(t.target).closest(".datepicker--cell");
        i.removeClass("-focus-"), this.silent = !0, this.focused = "", this.silent = !1;
      },
      _onTimeChange: function _onTimeChange(t, e, i) {
        var s = new Date(),
            a = this.selectedDates,
            n = !1;
        a.length && (n = !0, s = this.lastSelectedDate), s.setHours(e), s.setMinutes(i), n || this._getCell(s).hasClass("-disabled-") ? (this._setInputValue(), this.opts.onSelect && this._triggerOnChange()) : this.selectDate(s);
      },
      _onClickCell: function _onClickCell(t, e) {
        this.timepicker && (e.setHours(this.timepicker.hours), e.setMinutes(this.timepicker.minutes)), this.selectDate(e);
      },

      set focused(t) {
        if (!t && this.focused) {
          var e = this._getCell(this.focused);

          e.length && e.removeClass("-focus-");
        }

        this._focused = t, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", n.less(this.minRange, this._focused) && (this.maxRange = this.minRange, this.minRange = "")), this.silent || (this.date = t);
      },

      get focused() {
        return this._focused;
      },

      get parsedDate() {
        return n.getParsedDate(this.date);
      },

      set date(t) {
        return t instanceof Date ? (this.currentDate = t, this.inited && !this.silent && (this.views[this.view]._render(), this.nav._render(), this.visible && this.elIsInput && this.setPosition()), t) : void 0;
      },

      get date() {
        return this.currentDate;
      },

      set view(t) {
        return this.viewIndex = this.viewIndexes.indexOf(t), this.viewIndex < 0 ? void 0 : (this.prevView = this.currentView, this.currentView = t, this.inited && (this.views[t] ? this.views[t]._render() : this.views[t] = new e.fn.datepicker.Body(this, t, this.opts), this.views[this.prevView].hide(), this.views[t].show(), this.nav._render(), this.opts.onChangeView && this.opts.onChangeView(t), this.elIsInput && this.visible && this.setPosition()), t);
      },

      get view() {
        return this.currentView;
      },

      get cellType() {
        return this.view.substring(0, this.view.length - 1);
      },

      get minTime() {
        var t = n.getParsedDate(this.minDate);
        return new Date(t.year, t.month, t.date).getTime();
      },

      get maxTime() {
        var t = n.getParsedDate(this.maxDate);
        return new Date(t.year, t.month, t.date).getTime();
      },

      get curDecade() {
        return n.getDecade(this.date);
      }

    }, n.getDaysCount = function (t) {
      return new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
    }, n.getParsedDate = function (t) {
      return {
        year: t.getFullYear(),
        month: t.getMonth(),
        fullMonth: t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1,
        date: t.getDate(),
        fullDate: t.getDate() < 10 ? "0" + t.getDate() : t.getDate(),
        day: t.getDay(),
        hours: t.getHours(),
        fullHours: t.getHours() < 10 ? "0" + t.getHours() : t.getHours(),
        minutes: t.getMinutes(),
        fullMinutes: t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()
      };
    }, n.getDecade = function (t) {
      var e = 10 * Math.floor(t.getFullYear() / 10);
      return [e, e + 9];
    }, n.template = function (t, e) {
      return t.replace(/#\{([\w]+)\}/g, function (t, i) {
        return e[i] || 0 === e[i] ? e[i] : void 0;
      });
    }, n.isSame = function (t, e, i) {
      if (!t || !e) return !1;
      var s = n.getParsedDate(t),
          a = n.getParsedDate(e),
          h = i ? i : "day",
          o = {
        day: s.date == a.date && s.month == a.month && s.year == a.year,
        month: s.month == a.month && s.year == a.year,
        year: s.year == a.year
      };
      return o[h];
    }, n.less = function (t, e, i) {
      return t && e ? e.getTime() < t.getTime() : !1;
    }, n.bigger = function (t, e, i) {
      return t && e ? e.getTime() > t.getTime() : !1;
    }, n.getLeadingZeroNum = function (t) {
      return parseInt(t) < 10 ? "0" + t : t;
    }, n.resetTime = function (t) {
      return "object" == _typeof(t) ? (t = n.getParsedDate(t), new Date(t.year, t.month, t.date)) : void 0;
    }, e.fn.datepicker = function (t) {
      return this.each(function () {
        if (e.data(this, o)) {
          var i = e.data(this, o);
          i.opts = e.extend(!0, i.opts, t), i.update();
        } else e.data(this, o, new m(this, t));
      });
    }, e.fn.datepicker.Constructor = m, e.fn.datepicker.language = {
      ru: {
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        daysShort: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
        daysMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        today: "Сегодня",
        clear: "Очистить",
        dateFormat: "dd.mm.yyyy",
        timeFormat: "hh:ii",
        firstDay: 1
      }
    }, e(function () {
      e(r).datepicker();
    });
  }(), function () {
    var t = {
      days: '<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>',
      months: '<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>',
      years: '<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>'
    },
        s = e.fn.datepicker,
        a = s.Constructor;
    s.Body = function (t, i, s) {
      this.d = t, this.type = i, this.opts = s, this.$el = e(""), this.opts.onlyTimepicker || this.init();
    }, s.Body.prototype = {
      init: function init() {
        this._buildBaseHtml(), this._render(), this._bindEvents();
      },
      _bindEvents: function _bindEvents() {
        this.$el.on("click", ".datepicker--cell", e.proxy(this._onClickCell, this));
      },
      _buildBaseHtml: function _buildBaseHtml() {
        this.$el = e(t[this.type]).appendTo(this.d.$content), this.$names = e(".datepicker--days-names", this.$el), this.$cells = e(".datepicker--cells", this.$el);
      },
      _getDayNamesHtml: function _getDayNamesHtml(t, e, s, a) {
        return e = e != i ? e : t, s = s ? s : "", a = a != i ? a : 0, a > 7 ? s : 7 == e ? this._getDayNamesHtml(t, 0, s, ++a) : (s += '<div class="datepicker--day-name' + (this.d.isWeekend(e) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[e] + "</div>", this._getDayNamesHtml(t, ++e, s, ++a));
      },
      _getCellContents: function _getCellContents(t, e) {
        var i = "datepicker--cell datepicker--cell-" + e,
            s = new Date(),
            n = this.d,
            h = a.resetTime(n.minRange),
            o = a.resetTime(n.maxRange),
            r = n.opts,
            c = a.getParsedDate(t),
            d = {},
            l = c.date;

        switch (e) {
          case "day":
            n.isWeekend(c.day) && (i += " -weekend-"), c.month != this.d.parsedDate.month && (i += " -other-month-", r.selectOtherMonths || (i += " -disabled-"), r.showOtherMonths || (l = ""));
            break;

          case "month":
            l = n.loc[n.opts.monthsField][c.month];
            break;

          case "year":
            var u = n.curDecade;
            l = c.year, (c.year < u[0] || c.year > u[1]) && (i += " -other-decade-", r.selectOtherYears || (i += " -disabled-"), r.showOtherYears || (l = ""));
        }

        return r.onRenderCell && (d = r.onRenderCell(t, e) || {}, l = d.html ? d.html : l, i += d.classes ? " " + d.classes : ""), r.range && (a.isSame(h, t, e) && (i += " -range-from-"), a.isSame(o, t, e) && (i += " -range-to-"), 1 == n.selectedDates.length && n.focused ? ((a.bigger(h, t) && a.less(n.focused, t) || a.less(o, t) && a.bigger(n.focused, t)) && (i += " -in-range-"), a.less(o, t) && a.isSame(n.focused, t) && (i += " -range-from-"), a.bigger(h, t) && a.isSame(n.focused, t) && (i += " -range-to-")) : 2 == n.selectedDates.length && a.bigger(h, t) && a.less(o, t) && (i += " -in-range-")), a.isSame(s, t, e) && (i += " -current-"), n.focused && a.isSame(t, n.focused, e) && (i += " -focus-"), n._isSelected(t, e) && (i += " -selected-"), (!n._isInRange(t, e) || d.disabled) && (i += " -disabled-"), {
          html: l,
          classes: i
        };
      },
      _getDaysHtml: function _getDaysHtml(t) {
        var e = a.getDaysCount(t),
            i = new Date(t.getFullYear(), t.getMonth(), 1).getDay(),
            s = new Date(t.getFullYear(), t.getMonth(), e).getDay(),
            n = i - this.d.loc.firstDay,
            h = 6 - s + this.d.loc.firstDay;
        n = 0 > n ? n + 7 : n, h = h > 6 ? h - 7 : h;

        for (var o, r, c = -n + 1, d = "", l = c, u = e + h; u >= l; l++) {
          r = t.getFullYear(), o = t.getMonth(), d += this._getDayHtml(new Date(r, o, l));
        }

        return d;
      },
      _getDayHtml: function _getDayHtml(t) {
        var e = this._getCellContents(t, "day");

        return '<div class="' + e.classes + '" data-date="' + t.getDate() + '" data-month="' + t.getMonth() + '" data-year="' + t.getFullYear() + '">' + e.html + "</div>";
      },
      _getMonthsHtml: function _getMonthsHtml(t) {
        for (var e = "", i = a.getParsedDate(t), s = 0; 12 > s;) {
          e += this._getMonthHtml(new Date(i.year, s)), s++;
        }

        return e;
      },
      _getMonthHtml: function _getMonthHtml(t) {
        var e = this._getCellContents(t, "month");

        return '<div class="' + e.classes + '" data-month="' + t.getMonth() + '">' + e.html + "</div>";
      },
      _getYearsHtml: function _getYearsHtml(t) {
        var e = (a.getParsedDate(t), a.getDecade(t)),
            i = e[0] - 1,
            s = "",
            n = i;

        for (n; n <= e[1] + 1; n++) {
          s += this._getYearHtml(new Date(n, 0));
        }

        return s;
      },
      _getYearHtml: function _getYearHtml(t) {
        var e = this._getCellContents(t, "year");

        return '<div class="' + e.classes + '" data-year="' + t.getFullYear() + '">' + e.html + "</div>";
      },
      _renderTypes: {
        days: function days() {
          var t = this._getDayNamesHtml(this.d.loc.firstDay),
              e = this._getDaysHtml(this.d.currentDate);

          this.$cells.html(e), this.$names.html(t);
        },
        months: function months() {
          var t = this._getMonthsHtml(this.d.currentDate);

          this.$cells.html(t);
        },
        years: function years() {
          var t = this._getYearsHtml(this.d.currentDate);

          this.$cells.html(t);
        }
      },
      _render: function _render() {
        this.opts.onlyTimepicker || this._renderTypes[this.type].bind(this)();
      },
      _update: function _update() {
        var t,
            i,
            s,
            a = e(".datepicker--cell", this.$cells),
            n = this;
        a.each(function (a, h) {
          i = e(this), s = n.d._getDateFromCell(e(this)), t = n._getCellContents(s, n.d.cellType), i.attr("class", t.classes);
        });
      },
      show: function show() {
        this.opts.onlyTimepicker || (this.$el.addClass("active"), this.acitve = !0);
      },
      hide: function hide() {
        this.$el.removeClass("active"), this.active = !1;
      },
      _handleClick: function _handleClick(t) {
        var e = t.data("date") || 1,
            i = t.data("month") || 0,
            s = t.data("year") || this.d.parsedDate.year,
            a = this.d;
        if (a.view != this.opts.minView) return void a.down(new Date(s, i, e));

        var n = new Date(s, i, e),
            h = this.d._isSelected(n, this.d.cellType);

        return h ? void a._handleAlreadySelectedDates.bind(a, h, n)() : void a._trigger("clickCell", n);
      },
      _onClickCell: function _onClickCell(t) {
        var i = e(t.target).closest(".datepicker--cell");
        i.hasClass("-disabled-") || this._handleClick.bind(this)(i);
      }
    };
  }(), function () {
    var t = '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',
        i = '<div class="datepicker--buttons"></div>',
        s = '<span class="datepicker--button" data-action="#{action}">#{label}</span>',
        a = e.fn.datepicker,
        n = a.Constructor;
    a.Navigation = function (t, e) {
      this.d = t, this.opts = e, this.$buttonsContainer = "", this.init();
    }, a.Navigation.prototype = {
      init: function init() {
        this._buildBaseHtml(), this._bindEvents();
      },
      _bindEvents: function _bindEvents() {
        this.d.$nav.on("click", ".datepicker--nav-action", e.proxy(this._onClickNavButton, this)), this.d.$nav.on("click", ".datepicker--nav-title", e.proxy(this._onClickNavTitle, this)), this.d.$datepicker.on("click", ".datepicker--button", e.proxy(this._onClickNavButton, this));
      },
      _buildBaseHtml: function _buildBaseHtml() {
        this.opts.onlyTimepicker || this._render(), this._addButtonsIfNeed();
      },
      _addButtonsIfNeed: function _addButtonsIfNeed() {
        this.opts.todayButton && this._addButton("today"), this.opts.clearButton && this._addButton("clear");
      },
      _render: function _render() {
        var i = this._getTitle(this.d.currentDate),
            s = n.template(t, e.extend({
          title: i
        }, this.opts));

        this.d.$nav.html(s), "years" == this.d.view && e(".datepicker--nav-title", this.d.$nav).addClass("-disabled-"), this.setNavStatus();
      },
      _getTitle: function _getTitle(t) {
        return this.d.formatDate(this.opts.navTitles[this.d.view], t);
      },
      _addButton: function _addButton(t) {
        this.$buttonsContainer.length || this._addButtonsContainer();
        var i = {
          action: t,
          label: this.d.loc[t]
        },
            a = n.template(s, i);
        e("[data-action=" + t + "]", this.$buttonsContainer).length || this.$buttonsContainer.append(a);
      },
      _addButtonsContainer: function _addButtonsContainer() {
        this.d.$datepicker.append(i), this.$buttonsContainer = e(".datepicker--buttons", this.d.$datepicker);
      },
      setNavStatus: function setNavStatus() {
        if ((this.opts.minDate || this.opts.maxDate) && this.opts.disableNavWhenOutOfRange) {
          var t = this.d.parsedDate,
              e = t.month,
              i = t.year,
              s = t.date;

          switch (this.d.view) {
            case "days":
              this.d._isInRange(new Date(i, e - 1, 1), "month") || this._disableNav("prev"), this.d._isInRange(new Date(i, e + 1, 1), "month") || this._disableNav("next");
              break;

            case "months":
              this.d._isInRange(new Date(i - 1, e, s), "year") || this._disableNav("prev"), this.d._isInRange(new Date(i + 1, e, s), "year") || this._disableNav("next");
              break;

            case "years":
              var a = n.getDecade(this.d.date);
              this.d._isInRange(new Date(a[0] - 1, 0, 1), "year") || this._disableNav("prev"), this.d._isInRange(new Date(a[1] + 1, 0, 1), "year") || this._disableNav("next");
          }
        }
      },
      _disableNav: function _disableNav(t) {
        e('[data-action="' + t + '"]', this.d.$nav).addClass("-disabled-");
      },
      _activateNav: function _activateNav(t) {
        e('[data-action="' + t + '"]', this.d.$nav).removeClass("-disabled-");
      },
      _onClickNavButton: function _onClickNavButton(t) {
        var i = e(t.target).closest("[data-action]"),
            s = i.data("action");
        this.d[s]();
      },
      _onClickNavTitle: function _onClickNavTitle(t) {
        return e(t.target).hasClass("-disabled-") ? void 0 : "days" == this.d.view ? this.d.view = "months" : void (this.d.view = "years");
      }
    };
  }(), function () {
    var t = '<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourVisible}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>',
        i = e.fn.datepicker,
        s = i.Constructor;
    i.Timepicker = function (t, e) {
      this.d = t, this.opts = e, this.init();
    }, i.Timepicker.prototype = {
      init: function init() {
        var t = "input";
        this._setTime(this.d.date), this._buildHTML(), navigator.userAgent.match(/trident/gi) && (t = "change"), this.d.$el.on("selectDate", this._onSelectDate.bind(this)), this.$ranges.on(t, this._onChangeRange.bind(this)), this.$ranges.on("mouseup", this._onMouseUpRange.bind(this)), this.$ranges.on("mousemove focus ", this._onMouseEnterRange.bind(this)), this.$ranges.on("mouseout blur", this._onMouseOutRange.bind(this));
      },
      _setTime: function _setTime(t) {
        var e = s.getParsedDate(t);
        this._handleDate(t), this.hours = e.hours < this.minHours ? this.minHours : e.hours, this.minutes = e.minutes < this.minMinutes ? this.minMinutes : e.minutes;
      },
      _setMinTimeFromDate: function _setMinTimeFromDate(t) {
        this.minHours = t.getHours(), this.minMinutes = t.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() > t.getHours() && (this.minMinutes = this.opts.minMinutes);
      },
      _setMaxTimeFromDate: function _setMaxTimeFromDate(t) {
        this.maxHours = t.getHours(), this.maxMinutes = t.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() < t.getHours() && (this.maxMinutes = this.opts.maxMinutes);
      },
      _setDefaultMinMaxTime: function _setDefaultMinMaxTime() {
        var t = 23,
            e = 59,
            i = this.opts;
        this.minHours = i.minHours < 0 || i.minHours > t ? 0 : i.minHours, this.minMinutes = i.minMinutes < 0 || i.minMinutes > e ? 0 : i.minMinutes, this.maxHours = i.maxHours < 0 || i.maxHours > t ? t : i.maxHours, this.maxMinutes = i.maxMinutes < 0 || i.maxMinutes > e ? e : i.maxMinutes;
      },
      _validateHoursMinutes: function _validateHoursMinutes(t) {
        this.hours < this.minHours ? this.hours = this.minHours : this.hours > this.maxHours && (this.hours = this.maxHours), this.minutes < this.minMinutes ? this.minutes = this.minMinutes : this.minutes > this.maxMinutes && (this.minutes = this.maxMinutes);
      },
      _buildHTML: function _buildHTML() {
        var i = s.getLeadingZeroNum,
            a = {
          hourMin: this.minHours,
          hourMax: i(this.maxHours),
          hourStep: this.opts.hoursStep,
          hourValue: this.hours,
          hourVisible: i(this.displayHours),
          minMin: this.minMinutes,
          minMax: i(this.maxMinutes),
          minStep: this.opts.minutesStep,
          minValue: i(this.minutes)
        },
            n = s.template(t, a);
        this.$timepicker = e(n).appendTo(this.d.$datepicker), this.$ranges = e('[type="range"]', this.$timepicker), this.$hours = e('[name="hours"]', this.$timepicker), this.$minutes = e('[name="minutes"]', this.$timepicker), this.$hoursText = e(".datepicker--time-current-hours", this.$timepicker), this.$minutesText = e(".datepicker--time-current-minutes", this.$timepicker), this.d.ampm && (this.$ampm = e('<span class="datepicker--time-current-ampm">').appendTo(e(".datepicker--time-current", this.$timepicker)).html(this.dayPeriod), this.$timepicker.addClass("-am-pm-"));
      },
      _updateCurrentTime: function _updateCurrentTime() {
        var t = s.getLeadingZeroNum(this.displayHours),
            e = s.getLeadingZeroNum(this.minutes);
        this.$hoursText.html(t), this.$minutesText.html(e), this.d.ampm && this.$ampm.html(this.dayPeriod);
      },
      _updateRanges: function _updateRanges() {
        this.$hours.attr({
          min: this.minHours,
          max: this.maxHours
        }).val(this.hours), this.$minutes.attr({
          min: this.minMinutes,
          max: this.maxMinutes
        }).val(this.minutes);
      },
      _handleDate: function _handleDate(t) {
        this._setDefaultMinMaxTime(), t && (s.isSame(t, this.d.opts.minDate) ? this._setMinTimeFromDate(this.d.opts.minDate) : s.isSame(t, this.d.opts.maxDate) && this._setMaxTimeFromDate(this.d.opts.maxDate)), this._validateHoursMinutes(t);
      },
      update: function update() {
        this._updateRanges(), this._updateCurrentTime();
      },
      _getValidHoursFromDate: function _getValidHoursFromDate(t, e) {
        var i = t,
            a = t;
        t instanceof Date && (i = s.getParsedDate(t), a = i.hours);
        var n = e || this.d.ampm,
            h = "am";
        if (n) switch (!0) {
          case 0 == a:
            a = 12;
            break;

          case 12 == a:
            h = "pm";
            break;

          case a > 11:
            a -= 12, h = "pm";
        }
        return {
          hours: a,
          dayPeriod: h
        };
      },

      set hours(t) {
        this._hours = t;

        var e = this._getValidHoursFromDate(t);

        this.displayHours = e.hours, this.dayPeriod = e.dayPeriod;
      },

      get hours() {
        return this._hours;
      },

      _onChangeRange: function _onChangeRange(t) {
        var i = e(t.target),
            s = i.attr("name");
        this.d.timepickerIsActive = !0, this[s] = i.val(), this._updateCurrentTime(), this.d._trigger("timeChange", [this.hours, this.minutes]), this._handleDate(this.d.lastSelectedDate), this.update();
      },
      _onSelectDate: function _onSelectDate(t, e) {
        this._handleDate(e), this.update();
      },
      _onMouseEnterRange: function _onMouseEnterRange(t) {
        var i = e(t.target).attr("name");
        e(".datepicker--time-current-" + i, this.$timepicker).addClass("-focus-");
      },
      _onMouseOutRange: function _onMouseOutRange(t) {
        var i = e(t.target).attr("name");
        this.d.inFocus || e(".datepicker--time-current-" + i, this.$timepicker).removeClass("-focus-");
      },
      _onMouseUpRange: function _onMouseUpRange(t) {
        this.d.timepickerIsActive = !1;
      }
    };
  }();
}(window, jQuery);

/***/ }),

/***/ "./modules/registration/registration.js":
/*!**********************************************!*\
  !*** ./modules/registration/registration.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function btnregisration() {
  var registr_button = document.querySelector('.menu-top__button-register');
  var center_wrap = document.querySelector('.main_blok');
  console.log(registr_button);
  console.log(center_wrap);
  registr_button.addEventListener('click', function () {
    var main_search = document.querySelector('.main-search-form');
    center_wrap.classList.add("main_background");
    center_wrap.style.padding = '19px 140px';
    console.log(main_search);
    main_search.style.display = 'none';
    center_wrap.innerHTML = '\t<section class="registration registration_form">\n' + '\t\t<h1>Регистрация аккаунта</h1>\n' + '\t\t<div class="registration-first-name">\n' + '\t\t\t<input class="registration-first-name_input text-field_sample" name="visitor_input" placeholder="Имя" type="text">\n' + '\t\t</div>\n' + '\t\t<div class="registration-last-name">\n' + '\t\t\t<input class="registration-last-name_input text-field_sample" name="visitor_input" placeholder="Фамилия" type="text">\n' + '\t\t</div>\n' + '\t\t<div class="registration-sex">\n' + '\t\t\t<div class="registration-sex_man">\n' + '\t\t\t\t<input class="registration-sex_radio" type="radio" id="radio_man" name="sex" value="man" checked>\n' + '\t\t\t\t<label for="radio_man" class="registration-sex_text">Мужчина</label>\n' + '\t\t\t</div>\n' + '\t\t\t<div class="registration-sex_woman">\n' + '\t\t\t\t<input class="registration-sex_radio" type="radio" id="radio_woman" name="sex" value="woman">\n' + '\t\t\t\t<label for="radio_woman" class="registration-sex_text">Женщина</label>\n' + '\t\t\t</div>\n' + '\t\t</div>\n' + '\t\t<div class="birthday">\n' + '\t\t\t<p class="birthday-text">Дата рождения</p>\n' + '\t\t\t<div class="form-birthday">\n' + '\t\t\t\t<input class="form-birthday_input text-field_sample masked-field_sample" name="birthday_input" placeholder="ДД.ММ.ГГГГ" type="text">\n' + '\t\t\t</div>\n' + '\t\t</div>\n' + '\t\t<div class="logins">\n' + '\t\t\t<p class="logins-text">Данные для входа в сервис</p>\n' + '\t\t\t<div class="form-logins">\n' + '\t\t\t\t<input class="form-logins_login text-field_sample" name="login_input" placeholder="Email" type="email">\n' + '\t\t\t\t<input class="form-logins_pasword text-field_sample" name="pasword_input" placeholder="Пароль" type="password">\n' + '\t\t\t</div>\n' + '\t\t</div>\n' + '\t\t<div class="mailing">\n' + '\t\t\t<label class="mailing-check">\n' + '\t\t\t\t<input class="mailing-check_input" name="mailing_input" placeholder="Получать спецпредложения" type="checkbox">\n' + '\t\t\t\t<span class="mailing-text">Получать спецпредложения</span>\n' + '\t\t\t</label>\n' + '\n' + '\t\t</div>\n' + '\t\t<div class="payment-button button-arrow">\n' + '\t\t\t<p class="payment-button_result button-arrow_cklik">зарегистрироваться<span class="payment-button_result_icon button-arrow_icon"></span></p>\n' + '\t\t</div>\n' + '\t\t<div class="entry">\n' + '\t\t\t<p class="entry-text">Уже есть аккаунт на Toxin</p>\n' + '\t\t\t<div class="entryt-button cklik-button" value="ВОЙТИ"><div class="entryt-button_result cklik-button_wite">ВОЙТИ</div></div>\n' + '\t\t</div>\n' + '\t</section>'; //сюда прописать смену бэкграунда main_blok и скрыть section class="main-search-form"  и отобразить секцию регистрации

    var reg_button_form = document.querySelector('.payment-button');
    console.log(reg_button_form);

    if (reg_button_form != null) {
      reg_button_form.addEventListener('click', function () {
        //let main_search = document.querySelector('.main-search-form');
        center_wrap.classList.remove("main_background");
        center_wrap.style.padding = '70px 140px';
        console.log(main_search);
        main_search.style.display = 'display';
        var main_register = document.querySelector('.registration');
        main_register.style.display = 'none';
      });
    }
  }); //let reg_button_form = document.querySelector('.payment-button');
  //console.log(reg_button_form);
}

;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (btnregisration()); //innerHTML

/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/cklikbutton/cklikbutton.css":
/*!*********************************************!*\
  !*** ./modules/cklikbutton/cklikbutton.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/cklikbutton/cklikbuttonarrow.css":
/*!**************************************************!*\
  !*** ./modules/cklikbutton/cklikbuttonarrow.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/cklikbutton/cklikbuttonwite.css":
/*!*************************************************!*\
  !*** ./modules/cklikbutton/cklikbuttonwite.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/datepicker/datepicker.css":
/*!*******************************************!*\
  !*** ./modules/datepicker/datepicker.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/datepicker/datepicker.min.css":
/*!***********************************************!*\
  !*** ./modules/datepicker/datepicker.min.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/footer/company/advert.css":
/*!*******************************************!*\
  !*** ./modules/footer/company/advert.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/footer/company/company.css":
/*!********************************************!*\
  !*** ./modules/footer/company/company.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/footer/copyrite/copyrite.css":
/*!**********************************************!*\
  !*** ./modules/footer/copyrite/copyrite.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/footer/footerstyle.css":
/*!****************************************!*\
  !*** ./modules/footer/footerstyle.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/footer/menu/footermenu.css":
/*!********************************************!*\
  !*** ./modules/footer/menu/footermenu.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/footer/social/social.css":
/*!******************************************!*\
  !*** ./modules/footer/social/social.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/footer/subscribe/subscribe.css":
/*!************************************************!*\
  !*** ./modules/footer/subscribe/subscribe.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/header/header-style.css":
/*!*****************************************!*\
  !*** ./modules/header/header-style.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/logo/logo.css":
/*!*******************************!*\
  !*** ./modules/logo/logo.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/maintext/maintext.css":
/*!***************************************!*\
  !*** ./modules/maintext/maintext.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/maskedfield/maskedfield.css":
/*!*********************************************!*\
  !*** ./modules/maskedfield/maskedfield.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/menutop/menutop.css":
/*!*************************************!*\
  !*** ./modules/menutop/menutop.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/radiobutton/radiobutton.css":
/*!*********************************************!*\
  !*** ./modules/radiobutton/radiobutton.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/registration/registration.css":
/*!***********************************************!*\
  !*** ./modules/registration/registration.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/searchform/searchform.css":
/*!*******************************************!*\
  !*** ./modules/searchform/searchform.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/textfield/textfield.css":
/*!*****************************************!*\
  !*** ./modules/textfield/textfield.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/togglebutton/togglebutton.css":
/*!***********************************************!*\
  !*** ./modules/togglebutton/togglebutton.css ***!
  \***********************************************/
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
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_logo_logo_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/logo/logo.css */ "./modules/logo/logo.css");
/* harmony import */ var _modules_cklikbutton_cklikbutton_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbutton.css */ "./modules/cklikbutton/cklikbutton.css");
/* harmony import */ var _modules_cklikbutton_cklikbuttonarrow_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbuttonarrow.css */ "./modules/cklikbutton/cklikbuttonarrow.css");
/* harmony import */ var _modules_cklikbutton_cklikbuttonwite_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbuttonwite.css */ "./modules/cklikbutton/cklikbuttonwite.css");
/* harmony import */ var _modules_maintext_maintext_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/maintext/maintext.css */ "./modules/maintext/maintext.css");
/* harmony import */ var _modules_footer_company_advert_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/footer/company/advert.css */ "./modules/footer/company/advert.css");
/* harmony import */ var _modules_footer_company_company_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/footer/company/company.css */ "./modules/footer/company/company.css");
/* harmony import */ var _modules_footer_copyrite_copyrite_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/footer/copyrite/copyrite.css */ "./modules/footer/copyrite/copyrite.css");
/* harmony import */ var _modules_footer_social_social_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/footer/social/social.css */ "./modules/footer/social/social.css");
/* harmony import */ var _modules_textfield_textfield_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/textfield/textfield.css */ "./modules/textfield/textfield.css");
/* harmony import */ var _modules_radiobutton_radiobutton_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/radiobutton/radiobutton.css */ "./modules/radiobutton/radiobutton.css");
/* harmony import */ var _modules_maskedfield_maskedfield_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/maskedfield/maskedfield.css */ "./modules/maskedfield/maskedfield.css");
/* harmony import */ var _modules_togglebutton_togglebutton_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/togglebutton/togglebutton.css */ "./modules/togglebutton/togglebutton.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./css/style.css */ "./css/style.css");
/* harmony import */ var _modules_header_header_style_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/header/header-style.css */ "./modules/header/header-style.css");
/* harmony import */ var _modules_menutop_menutop_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/menutop/menutop.css */ "./modules/menutop/menutop.css");
/* harmony import */ var _modules_searchform_searchform_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/searchform/searchform.css */ "./modules/searchform/searchform.css");
/* harmony import */ var _modules_footer_footerstyle_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/footer/footerstyle.css */ "./modules/footer/footerstyle.css");
/* harmony import */ var _modules_footer_menu_footermenu_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/footer/menu/footermenu.css */ "./modules/footer/menu/footermenu.css");
/* harmony import */ var _modules_footer_subscribe_subscribe_css__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/footer/subscribe/subscribe.css */ "./modules/footer/subscribe/subscribe.css");
/* harmony import */ var _modules_registration_registration_css__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./modules/registration/registration.css */ "./modules/registration/registration.css");
/* harmony import */ var _modules_datepicker_datepicker_css__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./modules/datepicker/datepicker.css */ "./modules/datepicker/datepicker.css");
/* harmony import */ var _modules_datepicker_datepicker_min_css__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./modules/datepicker/datepicker.min.css */ "./modules/datepicker/datepicker.min.css");
/* harmony import */ var _modules_datepicker_datepicker_min_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./modules/datepicker/datepicker.min.js */ "./modules/datepicker/datepicker.min.js");
/* harmony import */ var _modules_datepicker_datepicker_min_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_modules_datepicker_datepicker_min_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _modules_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./modules/datepicker/datepicker.js */ "./modules/datepicker/datepicker.js");
/* harmony import */ var _modules_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_modules_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _modules_registration_registration_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./modules/registration/registration.js */ "./modules/registration/registration.js");
//���������� jQuery � ������, �� ������ � html
//import 'jquery-3.4.1.min.js';
//-----------------------------------------//
//-------����������� ������----------------//
//-------����� �������---------------------//
 //����� ��������

 //����� ����� ������

 //����� ����� ������ � ����� ��������

 //����� ����� ������

 //����� ������ ��������

 //������� ��� ����

 //���� ���� � �������

 //���� ���������

 //���� ��������

 //��������� �����

 //������������� �����������

 //����� ����� � ����

 //������������� ��/���
//------css �������� ������----------------//

 //�������� ����� �������� �� ������� ������������ ������ � ��������

 //�������� ����� ������

 //����� �������� ����

 //����� ������ �������

 //����� ����� ��� ������

 //���� ����

 //���� ��������

 //���� �����������
//---------------------------//
//����������� ��������� �������
//import './formelement.html';
//import html from "./formelement.html";
//---------------------------//
//����������� datepicker




 //---------------------------------//
//����������� ��������
//import btnCount from './button.js';

 //������ ������ ����� �����������
//import "./jquery-3.4.1.min.js";
//---------------------------//
// ����������� ��������
//import Icon from './icon.png';
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Q0FDb0Q7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7QUFDcEQ7O0NBQ29EOztDQUNBOztDQUNBOztDQUNBOztDQUNBOztDQUNBOztDQUNBOztDQUNBO0FBQ3BEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7Q0FFQTtBQUNBO0FBQ0E7O0NBQzZFO0FBQzdFO0FBRUE7QUFFQTtBQUNBLGdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIubWluLmpzIiwid2VicGFjazovLy8uL21vZHVsZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9jc3Mvc3R5bGUuY3NzPzkzMDYiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9ja2xpa2J1dHRvbi9ja2xpa2J1dHRvbi5jc3M/MDA0MSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9uYXJyb3cuY3NzP2NhZmIiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9ja2xpa2J1dHRvbi9ja2xpa2J1dHRvbndpdGUuY3NzP2Y0MzEiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuY3NzPzg1N2MiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIubWluLmNzcz9lZGQxIiwid2VicGFjazovLy8uL21vZHVsZXMvZm9vdGVyL2NvbXBhbnkvYWR2ZXJ0LmNzcz82ZjNkIiwid2VicGFjazovLy8uL21vZHVsZXMvZm9vdGVyL2NvbXBhbnkvY29tcGFueS5jc3M/Y2JiOSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2Zvb3Rlci9jb3B5cml0ZS9jb3B5cml0ZS5jc3M/NDdmNCIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2Zvb3Rlci9mb290ZXJzdHlsZS5jc3M/M2IxZiIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2Zvb3Rlci9tZW51L2Zvb3Rlcm1lbnUuY3NzPzc1MmYiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9mb290ZXIvc29jaWFsL3NvY2lhbC5jc3M/MmI5NyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2Zvb3Rlci9zdWJzY3JpYmUvc3Vic2NyaWJlLmNzcyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2hlYWRlci9oZWFkZXItc3R5bGUuY3NzPzQ1MjQiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9sb2dvL2xvZ28uY3NzP2M4YTgiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9tYWludGV4dC9tYWludGV4dC5jc3M/NTdjNCIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL21hc2tlZGZpZWxkL21hc2tlZGZpZWxkLmNzcz83ZGQwIiwid2VicGFjazovLy8uL21vZHVsZXMvbWVudXRvcC9tZW51dG9wLmNzcz9lNTdhIiwid2VicGFjazovLy8uL21vZHVsZXMvcmFkaW9idXR0b24vcmFkaW9idXR0b24uY3NzPzliN2UiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmNzcz80NGJhIiwid2VicGFjazovLy8uL21vZHVsZXMvc2VhcmNoZm9ybS9zZWFyY2hmb3JtLmNzcz81MzljIiwid2VicGFjazovLy8uL21vZHVsZXMvdGV4dGZpZWxkL3RleHRmaWVsZC5jc3M/MWU4MSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3RvZ2dsZWJ1dHRvbi90b2dnbGVidXR0b24uY3NzP2JiNjMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24gKHdpbmRvdywgJCwgdW5kZWZpbmVkKSB7IDsoZnVuY3Rpb24gKCkge1xuICAgIHZhciBWRVJTSU9OID0gJzIuMi4zJyxcbiAgICAgICAgcGx1Z2luTmFtZSA9ICdkYXRlcGlja2VyJyxcbiAgICAgICAgYXV0b0luaXRTZWxlY3RvciA9ICcuZGF0ZXBpY2tlci1oZXJlJyxcbiAgICAgICAgJGJvZHksICRkYXRlcGlja2Vyc0NvbnRhaW5lcixcbiAgICAgICAgY29udGFpbmVyQnVpbHQgPSBmYWxzZSxcbiAgICAgICAgYmFzZVRlbXBsYXRlID0gJycgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJkYXRlcGlja2VyLS1wb2ludGVyXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxuYXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXZcIj48L25hdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY29udGVudFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgY2xhc3NlczogJycsXG4gICAgICAgICAgICBpbmxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6ICdydScsXG4gICAgICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBmaXJzdERheTogJycsXG4gICAgICAgICAgICB3ZWVrZW5kczogWzYsIDBdLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJycsXG4gICAgICAgICAgICBhbHRGaWVsZDogJycsXG4gICAgICAgICAgICBhbHRGaWVsZERhdGVGb3JtYXQ6ICdAJyxcbiAgICAgICAgICAgIHRvZ2dsZVNlbGVjdGVkOiB0cnVlLFxuICAgICAgICAgICAga2V5Ym9hcmROYXY6IHRydWUsXG5cbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYm90dG9tIGxlZnQnLFxuICAgICAgICAgICAgb2Zmc2V0OiAxMixcblxuICAgICAgICAgICAgdmlldzogJ2RheXMnLFxuICAgICAgICAgICAgbWluVmlldzogJ2RheXMnLFxuXG4gICAgICAgICAgICBzaG93T3RoZXJNb250aHM6IHRydWUsXG4gICAgICAgICAgICBzZWxlY3RPdGhlck1vbnRoczogdHJ1ZSxcbiAgICAgICAgICAgIG1vdmVUb090aGVyTW9udGhzT25TZWxlY3Q6IHRydWUsXG5cbiAgICAgICAgICAgIHNob3dPdGhlclllYXJzOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0T3RoZXJZZWFyczogdHJ1ZSxcbiAgICAgICAgICAgIG1vdmVUb090aGVyWWVhcnNPblNlbGVjdDogdHJ1ZSxcblxuICAgICAgICAgICAgbWluRGF0ZTogJycsXG4gICAgICAgICAgICBtYXhEYXRlOiAnJyxcbiAgICAgICAgICAgIGRpc2FibGVOYXZXaGVuT3V0T2ZSYW5nZTogdHJ1ZSxcblxuICAgICAgICAgICAgbXVsdGlwbGVEYXRlczogZmFsc2UsIC8vIEJvb2xlYW4gb3IgTnVtYmVyXG4gICAgICAgICAgICBtdWx0aXBsZURhdGVzU2VwYXJhdG9yOiAnLCcsXG4gICAgICAgICAgICByYW5nZTogZmFsc2UsXG5cbiAgICAgICAgICAgIHRvZGF5QnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIGNsZWFyQnV0dG9uOiBmYWxzZSxcblxuICAgICAgICAgICAgc2hvd0V2ZW50OiAnZm9jdXMnLFxuICAgICAgICAgICAgYXV0b0Nsb3NlOiBmYWxzZSxcblxuICAgICAgICAgICAgLy8gbmF2aWdhdGlvblxuICAgICAgICAgICAgbW9udGhzRmllbGQ6ICdtb250aHNTaG9ydCcsXG4gICAgICAgICAgICBwcmV2SHRtbDogJzxzdmc+PHBhdGggZD1cIk0gMTcsMTIgbCAtNSw1IGwgNSw1XCI+PC9wYXRoPjwvc3ZnPicsXG4gICAgICAgICAgICBuZXh0SHRtbDogJzxzdmc+PHBhdGggZD1cIk0gMTQsMTIgbCA1LDUgbCAtNSw1XCI+PC9wYXRoPjwvc3ZnPicsXG4gICAgICAgICAgICBuYXZUaXRsZXM6IHtcbiAgICAgICAgICAgICAgICBkYXlzOiAnTU0sIDxpPnl5eXk8L2k+JyxcbiAgICAgICAgICAgICAgICBtb250aHM6ICd5eXl5JyxcbiAgICAgICAgICAgICAgICB5ZWFyczogJ3l5eXkxIC0geXl5eTInXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyB0aW1lcGlja2VyXG4gICAgICAgICAgICB0aW1lcGlja2VyOiBmYWxzZSxcbiAgICAgICAgICAgIG9ubHlUaW1lcGlja2VyOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGVUaW1lU2VwYXJhdG9yOiAnICcsXG4gICAgICAgICAgICB0aW1lRm9ybWF0OiAnJyxcbiAgICAgICAgICAgIG1pbkhvdXJzOiAwLFxuICAgICAgICAgICAgbWF4SG91cnM6IDI0LFxuICAgICAgICAgICAgbWluTWludXRlczogMCxcbiAgICAgICAgICAgIG1heE1pbnV0ZXM6IDU5LFxuICAgICAgICAgICAgaG91cnNTdGVwOiAxLFxuICAgICAgICAgICAgbWludXRlc1N0ZXA6IDEsXG5cbiAgICAgICAgICAgIC8vIGV2ZW50c1xuICAgICAgICAgICAgb25TZWxlY3Q6ICcnLFxuICAgICAgICAgICAgb25TaG93OiAnJyxcbiAgICAgICAgICAgIG9uSGlkZTogJycsXG4gICAgICAgICAgICBvbkNoYW5nZU1vbnRoOiAnJyxcbiAgICAgICAgICAgIG9uQ2hhbmdlWWVhcjogJycsXG4gICAgICAgICAgICBvbkNoYW5nZURlY2FkZTogJycsXG4gICAgICAgICAgICBvbkNoYW5nZVZpZXc6ICcnLFxuICAgICAgICAgICAgb25SZW5kZXJDZWxsOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBob3RLZXlzID0ge1xuICAgICAgICAgICAgJ2N0cmxSaWdodCc6IFsxNywgMzldLFxuICAgICAgICAgICAgJ2N0cmxVcCc6IFsxNywgMzhdLFxuICAgICAgICAgICAgJ2N0cmxMZWZ0JzogWzE3LCAzN10sXG4gICAgICAgICAgICAnY3RybERvd24nOiBbMTcsIDQwXSxcbiAgICAgICAgICAgICdzaGlmdFJpZ2h0JzogWzE2LCAzOV0sXG4gICAgICAgICAgICAnc2hpZnRVcCc6IFsxNiwgMzhdLFxuICAgICAgICAgICAgJ3NoaWZ0TGVmdCc6IFsxNiwgMzddLFxuICAgICAgICAgICAgJ3NoaWZ0RG93bic6IFsxNiwgNDBdLFxuICAgICAgICAgICAgJ2FsdFVwJzogWzE4LCAzOF0sXG4gICAgICAgICAgICAnYWx0UmlnaHQnOiBbMTgsIDM5XSxcbiAgICAgICAgICAgICdhbHRMZWZ0JzogWzE4LCAzN10sXG4gICAgICAgICAgICAnYWx0RG93bic6IFsxOCwgNDBdLFxuICAgICAgICAgICAgJ2N0cmxTaGlmdFVwJzogWzE2LCAxNywgMzhdXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGVwaWNrZXI7XG5cbiAgICB2YXIgRGF0ZXBpY2tlciAgPSBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICB0aGlzLiRlbCA9ICQoZWwpO1xuXG4gICAgICAgIHRoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgb3B0aW9ucywgdGhpcy4kZWwuZGF0YSgpKTtcblxuICAgICAgICBpZiAoJGJvZHkgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5vcHRzLnN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRzLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lbC5ub2RlTmFtZSA9PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICB0aGlzLmVsSXNJbnB1dCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRzLmFsdEZpZWxkKSB7XG4gICAgICAgICAgICB0aGlzLiRhbHRGaWVsZCA9IHR5cGVvZiB0aGlzLm9wdHMuYWx0RmllbGQgPT0gJ3N0cmluZycgPyAkKHRoaXMub3B0cy5hbHRGaWVsZCkgOiB0aGlzLm9wdHMuYWx0RmllbGQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTsgLy8gTmVlZCB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IHJlbmRlcmluZ1xuXG4gICAgICAgIHRoaXMuY3VycmVudERhdGUgPSB0aGlzLm9wdHMuc3RhcnREYXRlO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdGhpcy5vcHRzLnZpZXc7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVNob3J0Q3V0cygpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy52aWV3cyA9IHt9O1xuICAgICAgICB0aGlzLmtleXMgPSBbXTtcbiAgICAgICAgdGhpcy5taW5SYW5nZSA9ICcnO1xuICAgICAgICB0aGlzLm1heFJhbmdlID0gJyc7XG4gICAgICAgIHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlID0gJyc7XG5cbiAgICAgICAgdGhpcy5pbml0KClcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlciA9IERhdGVwaWNrZXI7XG5cbiAgICBkYXRlcGlja2VyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgVkVSU0lPTjogVkVSU0lPTixcbiAgICAgICAgdmlld0luZGV4ZXM6IFsnZGF5cycsICdtb250aHMnLCAneWVhcnMnXSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lckJ1aWx0ICYmICF0aGlzLm9wdHMuaW5saW5lICYmIHRoaXMuZWxJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVpbGREYXRlcGlja2Vyc0NvbnRhaW5lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYnVpbGRCYXNlSHRtbCgpO1xuICAgICAgICAgICAgdGhpcy5fZGVmaW5lTG9jYWxlKHRoaXMub3B0cy5sYW5ndWFnZSk7XG4gICAgICAgICAgICB0aGlzLl9zeW5jV2l0aE1pbk1heERhdGVzKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVsSXNJbnB1dCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZXh0cmEgY2xhc3NlcyBmb3IgcHJvcGVyIHRyYW5zaXRpb25zXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFBvc2l0aW9uQ2xhc3Nlcyh0aGlzLm9wdHMucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iaW5kRXZlbnRzKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5rZXlib2FyZE5hdiAmJiAhdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRLZXlib2FyZEV2ZW50cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93bkRhdGVwaWNrZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5vbignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcERhdGVwaWNrZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3ModGhpcy5vcHRzLmNsYXNzZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlciA9IG5ldyAkLmZuLmRhdGVwaWNrZXIuVGltZXBpY2tlcih0aGlzLCB0aGlzLm9wdHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRUaW1lcGlja2VyRXZlbnRzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKCctb25seS10aW1lcGlja2VyLScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddID0gbmV3ICQuZm4uZGF0ZXBpY2tlci5Cb2R5KHRoaXMsIHRoaXMuY3VycmVudFZpZXcsIHRoaXMub3B0cyk7XG4gICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMubmF2ID0gbmV3ICQuZm4uZGF0ZXBpY2tlci5OYXZpZ2F0aW9uKHRoaXMsIHRoaXMub3B0cyk7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLmN1cnJlbnRWaWV3O1xuXG4gICAgICAgICAgICB0aGlzLiRlbC5vbignY2xpY2tDZWxsLmFkcCcsIHRoaXMuX29uQ2xpY2tDZWxsLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5vbignbW91c2VlbnRlcicsICcuZGF0ZXBpY2tlci0tY2VsbCcsIHRoaXMuX29uTW91c2VFbnRlckNlbGwuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uKCdtb3VzZWxlYXZlJywgJy5kYXRlcGlja2VyLS1jZWxsJywgdGhpcy5fb25Nb3VzZUxlYXZlQ2VsbC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9jcmVhdGVTaG9ydEN1dHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubWluRGF0ZSA9IHRoaXMub3B0cy5taW5EYXRlID8gdGhpcy5vcHRzLm1pbkRhdGUgOiBuZXcgRGF0ZSgtODYzOTk5OTkxMzYwMDAwMCk7XG4gICAgICAgICAgICB0aGlzLm1heERhdGUgPSB0aGlzLm9wdHMubWF4RGF0ZSA/IHRoaXMub3B0cy5tYXhEYXRlIDogbmV3IERhdGUoODYzOTk5OTkxMzYwMDAwMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2JpbmRFdmVudHMgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbih0aGlzLm9wdHMuc2hvd0V2ZW50ICsgJy5hZHAnLCB0aGlzLl9vblNob3dFdmVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdtb3VzZXVwLmFkcCcsIHRoaXMuX29uTW91c2VVcEVsLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2JsdXIuYWRwJywgdGhpcy5fb25CbHVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2tleXVwLmFkcCcsIHRoaXMuX29uS2V5VXBHZW5lcmFsLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuYWRwJywgdGhpcy5fb25SZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ21vdXNldXAuYWRwJywgdGhpcy5fb25Nb3VzZVVwQm9keS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZEtleWJvYXJkRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbigna2V5ZG93bi5hZHAnLCB0aGlzLl9vbktleURvd24uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbigna2V5dXAuYWRwJywgdGhpcy5fb25LZXlVcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdob3RLZXkuYWRwJywgdGhpcy5fb25Ib3RLZXkuYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2JpbmRUaW1lcGlja2VyRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbigndGltZUNoYW5nZS5hZHAnLCB0aGlzLl9vblRpbWVDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNXZWVrZW5kOiBmdW5jdGlvbiAoZGF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRzLndlZWtlbmRzLmluZGV4T2YoZGF5KSAhPT0gLTE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2RlZmluZUxvY2FsZTogZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGFuZyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jID0gJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlW2xhbmddO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGZpbmQgbGFuZ3VhZ2UgXCInICsgbGFuZyArICdcIiBpbiBEYXRlcGlja2VyLmxhbmd1YWdlLCB3aWxsIHVzZSBcInJ1XCIgaW5zdGVhZCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlLnJ1LCAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbbGFuZ10pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jID0gJC5leHRlbmQodHJ1ZSwge30sICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSwgbGFuZylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5kYXRlRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MuZGF0ZUZvcm1hdCA9IHRoaXMub3B0cy5kYXRlRm9ybWF0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jLnRpbWVGb3JtYXQgPSB0aGlzLm9wdHMudGltZUZvcm1hdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmZpcnN0RGF5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jLmZpcnN0RGF5ID0gdGhpcy5vcHRzLmZpcnN0RGF5XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jLmRhdGVGb3JtYXQgPSBbdGhpcy5sb2MuZGF0ZUZvcm1hdCwgdGhpcy5sb2MudGltZUZvcm1hdF0uam9pbih0aGlzLm9wdHMuZGF0ZVRpbWVTZXBhcmF0b3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MuZGF0ZUZvcm1hdCA9IHRoaXMubG9jLnRpbWVGb3JtYXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBib3VuZGFyeSA9IHRoaXMuX2dldFdvcmRCb3VuZGFyeVJlZ0V4cDtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvYy50aW1lRm9ybWF0Lm1hdGNoKGJvdW5kYXJ5KCdhYScpKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMubG9jLnRpbWVGb3JtYXQubWF0Y2goYm91bmRhcnkoJ0FBJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgIHRoaXMuYW1wbSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkRGF0ZXBpY2tlcnNDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lckJ1aWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICRib2R5LmFwcGVuZCgnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJzLWNvbnRhaW5lclwiIGlkPVwiZGF0ZXBpY2tlcnMtY29udGFpbmVyXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAkZGF0ZXBpY2tlcnNDb250YWluZXIgPSAkKCcjZGF0ZXBpY2tlcnMtY29udGFpbmVyJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkQmFzZUh0bWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkYXBwZW5kVGFyZ2V0LFxuICAgICAgICAgICAgICAgICRpbmxpbmUgPSAkKCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1pbmxpbmVcIj4nKTtcblxuICAgICAgICAgICAgaWYodGhpcy5lbC5ub2RlTmFtZSA9PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICRhcHBlbmRUYXJnZXQgPSAkZGF0ZXBpY2tlcnNDb250YWluZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGFwcGVuZFRhcmdldCA9ICRpbmxpbmUuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXBwZW5kVGFyZ2V0ID0gJGlubGluZS5hcHBlbmRUbyh0aGlzLiRlbClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlciA9ICQoYmFzZVRlbXBsYXRlKS5hcHBlbmRUbygkYXBwZW5kVGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMuJGNvbnRlbnQgPSAkKCcuZGF0ZXBpY2tlci0tY29udGVudCcsIHRoaXMuJGRhdGVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kbmF2ID0gJCgnLmRhdGVwaWNrZXItLW5hdicsIHRoaXMuJGRhdGVwaWNrZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF90cmlnZ2VyT25DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZnJvbSB0cmlnZ2VyaW5nIG11bHRpcGxlIG9uU2VsZWN0IGNhbGxiYWNrIHdpdGggc2FtZSBhcmd1bWVudCAoZW1wdHkgc3RyaW5nKSBpbiBJRTEwLTExXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlID09PSAnJykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0cy5vblNlbGVjdCgnJywgJycsIHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWREYXRlcyA9IHRoaXMuc2VsZWN0ZWREYXRlcyxcbiAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShzZWxlY3RlZERhdGVzWzBdKSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWREYXRlcyxcbiAgICAgICAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZGF0ZXMgPSBuZXcgRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQueWVhcixcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQubW9udGgsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkLmRhdGUsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkLmhvdXJzLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZC5taW51dGVzXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZERhdGVzID0gc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmZvcm1hdERhdGUoX3RoaXMubG9jLmRhdGVGb3JtYXQsIGRhdGUpXG4gICAgICAgICAgICAgICAgfSkuam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvcik7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgZGF0ZXMgYXJyYXksIHRvIHNlcGFyYXRlIGl0IGZyb20gb3JpZ2luYWwgc2VsZWN0ZWREYXRlc1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzIHx8IHRoaXMub3B0cy5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGRhdGVzID0gc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyc2VkRGF0ZSA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0ZS5tb250aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZERhdGUuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZERhdGUuaG91cnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWREYXRlLm1pbnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZSA9IGZvcm1hdHRlZERhdGVzO1xuICAgICAgICAgICAgdGhpcy5vcHRzLm9uU2VsZWN0KGZvcm1hdHRlZERhdGVzLCBkYXRlcywgdGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGQgPSB0aGlzLnBhcnNlZERhdGUsXG4gICAgICAgICAgICAgICAgbyA9IHRoaXMub3B0cztcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciwgZC5tb250aCArIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZU1vbnRoKSBvLm9uQ2hhbmdlTW9udGgodGhpcy5wYXJzZWREYXRlLm1vbnRoLCB0aGlzLnBhcnNlZERhdGUueWVhcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciArIDEsIGQubW9udGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZVllYXIpIG8ub25DaGFuZ2VZZWFyKHRoaXMucGFyc2VkRGF0ZS55ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkLnllYXIgKyAxMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlRGVjYWRlKSBvLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJldjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGQgPSB0aGlzLnBhcnNlZERhdGUsXG4gICAgICAgICAgICAgICAgbyA9IHRoaXMub3B0cztcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciwgZC5tb250aCAtIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZU1vbnRoKSBvLm9uQ2hhbmdlTW9udGgodGhpcy5wYXJzZWREYXRlLm1vbnRoLCB0aGlzLnBhcnNlZERhdGUueWVhcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciAtIDEsIGQubW9udGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZVllYXIpIG8ub25DaGFuZ2VZZWFyKHRoaXMucGFyc2VkRGF0ZS55ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkLnllYXIgLSAxMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlRGVjYWRlKSBvLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZm9ybWF0RGF0ZTogZnVuY3Rpb24gKHN0cmluZywgZGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IGRhdGUgfHwgdGhpcy5kYXRlO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHN0cmluZyxcbiAgICAgICAgICAgICAgICBib3VuZGFyeSA9IHRoaXMuX2dldFdvcmRCb3VuZGFyeVJlZ0V4cCxcbiAgICAgICAgICAgICAgICBsb2NhbGUgPSB0aGlzLmxvYyxcbiAgICAgICAgICAgICAgICBsZWFkaW5nWmVybyA9IGRhdGVwaWNrZXIuZ2V0TGVhZGluZ1plcm9OdW0sXG4gICAgICAgICAgICAgICAgZGVjYWRlID0gZGF0ZXBpY2tlci5nZXREZWNhZGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgZCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICBmdWxsSG91cnMgPSBkLmZ1bGxIb3VycyxcbiAgICAgICAgICAgICAgICBob3VycyA9IGQuaG91cnMsXG4gICAgICAgICAgICAgICAgYW1wbSA9IHN0cmluZy5tYXRjaChib3VuZGFyeSgnYWEnKSkgfHwgc3RyaW5nLm1hdGNoKGJvdW5kYXJ5KCdBQScpKSxcbiAgICAgICAgICAgICAgICBkYXlQZXJpb2QgPSAnYW0nLFxuICAgICAgICAgICAgICAgIHJlcGxhY2VyID0gdGhpcy5fcmVwbGFjZXIsXG4gICAgICAgICAgICAgICAgdmFsaWRIb3VycztcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lcGlja2VyICYmIHRoaXMudGltZXBpY2tlciAmJiBhbXBtKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRIb3VycyA9IHRoaXMudGltZXBpY2tlci5fZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlKGRhdGUsIGFtcG0pO1xuICAgICAgICAgICAgICAgIGZ1bGxIb3VycyA9IGxlYWRpbmdaZXJvKHZhbGlkSG91cnMuaG91cnMpO1xuICAgICAgICAgICAgICAgIGhvdXJzID0gdmFsaWRIb3Vycy5ob3VycztcbiAgICAgICAgICAgICAgICBkYXlQZXJpb2QgPSB2YWxpZEhvdXJzLmRheVBlcmlvZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAvQC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvQC8sIGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9hYS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdhYScpLCBkYXlQZXJpb2QpO1xuICAgICAgICAgICAgICAgIGNhc2UgL0FBLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ0FBJyksIGRheVBlcmlvZC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9kZC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdkZCcpLCBkLmZ1bGxEYXRlKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9kLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2QnKSwgZC5kYXRlKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9ERC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdERCcpLCBsb2NhbGUuZGF5c1tkLmRheV0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL0QvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnRCcpLCBsb2NhbGUuZGF5c1Nob3J0W2QuZGF5XSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvbW0vLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnbW0nKSwgZC5mdWxsTW9udGgpO1xuICAgICAgICAgICAgICAgIGNhc2UgL20vLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnbScpLCBkLm1vbnRoICsgMSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvTU0vLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnTU0nKSwgdGhpcy5sb2MubW9udGhzW2QubW9udGhdKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9NLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ00nKSwgbG9jYWxlLm1vbnRoc1Nob3J0W2QubW9udGhdKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9paS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdpaScpLCBkLmZ1bGxNaW51dGVzKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9pLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2knKSwgZC5taW51dGVzKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9oaC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdoaCcpLCBmdWxsSG91cnMpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2gvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnaCcpLCBob3Vycyk7XG4gICAgICAgICAgICAgICAgY2FzZSAveXl5eS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCd5eXl5JyksIGQueWVhcik7XG4gICAgICAgICAgICAgICAgY2FzZSAveXl5eTEvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgneXl5eTEnKSwgZGVjYWRlWzBdKTtcbiAgICAgICAgICAgICAgICBjYXNlIC95eXl5Mi8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCd5eXl5MicpLCBkZWNhZGVbMV0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL3l5Ly50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ3l5JyksIGQueWVhci50b1N0cmluZygpLnNsaWNlKC0yKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlcGxhY2VyOiBmdW5jdGlvbiAoc3RyLCByZWcsIGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZShyZWcsIGZ1bmN0aW9uIChtYXRjaCwgcDEscDIscDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgKyBkYXRhICsgcDM7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRXb3JkQm91bmRhcnlSZWdFeHA6IGZ1bmN0aW9uIChzaWduKSB7XG4gICAgICAgICAgICB2YXIgc3ltYm9scyA9ICdcXFxcc3xcXFxcLnwtfC98XFxcXFxcXFx8LHxcXFxcJHxcXFxcIXxcXFxcP3w6fDsnO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58PnwnICsgc3ltYm9scyArICcpKCcgKyBzaWduICsgJykoJHw8fCcgKyBzeW1ib2xzICsgJyknLCAnZycpO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgc2VsZWN0RGF0ZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0cyA9IF90aGlzLm9wdHMsXG4gICAgICAgICAgICAgICAgZCA9IF90aGlzLnBhcnNlZERhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRlcyA9IF90aGlzLnNlbGVjdGVkRGF0ZXMsXG4gICAgICAgICAgICAgICAgbGVuID0gc2VsZWN0ZWREYXRlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgbmV3RGF0ZSA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRlKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3REYXRlKGQpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWREYXRlID0gZGF0ZTtcblxuICAgICAgICAgICAgLy8gU2V0IG5ldyB0aW1lIHZhbHVlcyBmcm9tIERhdGVcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIuX3NldFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE9uIHRoaXMgc3RlcCB0aW1lcGlja2VyIHdpbGwgc2V0IHZhbGlkIHZhbHVlcyBpbiBpdCdzIGluc3RhbmNlXG4gICAgICAgICAgICBfdGhpcy5fdHJpZ2dlcignc2VsZWN0RGF0ZScsIGRhdGUpO1xuXG4gICAgICAgICAgICAvLyBTZXQgY29ycmVjdCB0aW1lIHZhbHVlcyBhZnRlciB0aW1lcGlja2VyJ3MgdmFsaWRhdGlvblxuICAgICAgICAgICAgLy8gUHJldmVudCBmcm9tIHNldHRpbmcgaG91cnMgb3IgbWludXRlcyB3aGljaCB2YWx1ZXMgYXJlIGxlc3NlciB0aGVuIGBtaW5gIHZhbHVlIG9yXG4gICAgICAgICAgICAvLyBncmVhdGVyIHRoZW4gYG1heGAgdmFsdWVcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3Vycyk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX3RoaXMudmlldyA9PSAnZGF5cycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5nZXRNb250aCgpICE9IGQubW9udGggJiYgb3B0cy5tb3ZlVG9PdGhlck1vbnRoc09uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX3RoaXMudmlldyA9PSAneWVhcnMnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuZ2V0RnVsbFllYXIoKSAhPSBkLnllYXIgJiYgb3B0cy5tb3ZlVG9PdGhlclllYXJzT25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3RGF0ZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNpbGVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMuZGF0ZSA9IG5ld0RhdGU7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgX3RoaXMubmF2Ll9yZW5kZXIoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5tdWx0aXBsZURhdGVzICYmICFvcHRzLnJhbmdlKSB7IC8vIFNldCBwcmlvcml0eSB0byByYW5nZSBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA9PT0gb3B0cy5tdWx0aXBsZURhdGVzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5faXNTZWxlY3RlZChkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzLnB1c2goZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMgPSBbZGF0ZV07XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMucHVzaChkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5tYXhSYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5taW5SYW5nZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gU3dhcCBkYXRlcyBpZiB0aGV5IHdlcmUgc2VsZWN0ZWQgdmlhIGRwLnNlbGVjdERhdGUoKSBhbmQgc2Vjb25kIGRhdGUgd2FzIHNtYWxsZXIgdGhlbiBmaXJzdFxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZXBpY2tlci5iaWdnZXIoX3RoaXMubWF4UmFuZ2UsIF90aGlzLm1pblJhbmdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWF4UmFuZ2UgPSBfdGhpcy5taW5SYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzID0gW190aGlzLm1pblJhbmdlLCBfdGhpcy5tYXhSYW5nZV1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMgPSBbZGF0ZV07XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMgPSBbZGF0ZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzLl9zZXRJbnB1dFZhbHVlKCk7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJPbkNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5hdXRvQ2xvc2UgJiYgIXRoaXMudGltZXBpY2tlcklzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRzLm11bHRpcGxlRGF0ZXMgJiYgIW9wdHMucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5yYW5nZSAmJiBfdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZURhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkRGF0ZXMsXG4gICAgICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHJldHVybjtcblxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkLnNvbWUoZnVuY3Rpb24gKGN1ckRhdGUsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZXBpY2tlci5pc1NhbWUoY3VyRGF0ZSwgZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubGFzdFNlbGVjdGVkRGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubGFzdFNlbGVjdGVkRGF0ZSA9IF90aGlzLnNlbGVjdGVkRGF0ZXNbX3RoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnZpZXdzW190aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZXRJbnB1dFZhbHVlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLm9wdHMub25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyT25DaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICB0b2RheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gdGhpcy5vcHRzLm1pblZpZXc7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50b2RheUJ1dHRvbiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUodGhpcy5vcHRzLnRvZGF5QnV0dG9uKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy5fc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vblNlbGVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJPbkNoYW5nZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZXMgZGF0ZXBpY2tlciBvcHRpb25zXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gcGFyYW0gLSBwYXJhbWV0ZXIncyBuYW1lIHRvIHVwZGF0ZS4gSWYgb2JqZWN0IHRoZW4gaXQgd2lsbCBleHRlbmQgY3VycmVudCBvcHRpb25zXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxPYmplY3R9IFt2YWx1ZV0gLSBuZXcgcGFyYW0gdmFsdWVcbiAgICAgICAgICovXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHBhcmFtLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkRGF0ZSA9IHRoaXMubGFzdFNlbGVjdGVkRGF0ZTtcblxuICAgICAgICAgICAgaWYgKGxlbiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzW3BhcmFtXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsZW4gPT0gMSAmJiB0eXBlb2YgcGFyYW0gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCB0aGlzLm9wdHMsIHBhcmFtKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVTaG9ydEN1dHMoKTtcbiAgICAgICAgICAgIHRoaXMuX3N5bmNXaXRoTWluTWF4RGF0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuX2RlZmluZUxvY2FsZSh0aGlzLm9wdHMubGFuZ3VhZ2UpO1xuICAgICAgICAgICAgdGhpcy5uYXYuX2FkZEJ1dHRvbnNJZk5lZWQoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB0aGlzLm5hdi5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxJc0lucHV0ICYmICF0aGlzLm9wdHMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UG9zaXRpb25DbGFzc2VzKHRoaXMub3B0cy5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMub3B0cy5wb3NpdGlvbilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3ModGhpcy5vcHRzLmNsYXNzZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKCctb25seS10aW1lcGlja2VyLScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlbGVjdGVkRGF0ZSkgdGhpcy50aW1lcGlja2VyLl9oYW5kbGVEYXRlKGxhc3RTZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlci5fdXBkYXRlUmFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyLl91cGRhdGVDdXJyZW50VGltZSgpO1xuICAgICAgICAgICAgICAgIC8vIENoYW5nZSBob3VycyBhbmQgbWludXRlcyBpZiBpdCdzIHZhbHVlcyBoYXZlIGJlZW4gY2hhbmdlZCB0aHJvdWdoIG1pbi9tYXggaG91cnMvbWludXRlc1xuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWxlY3RlZERhdGUuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkRGF0ZS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3NldElucHV0VmFsdWUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3N5bmNXaXRoTWluTWF4RGF0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXJUaW1lID0gdGhpcy5kYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblRpbWUgPiBjdXJUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5taW5EYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tYXhUaW1lIDwgY3VyVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2lzU2VsZWN0ZWQ6IGZ1bmN0aW9uIChjaGVja0RhdGUsIGNlbGxUeXBlKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXMuc29tZShmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmlzU2FtZShkYXRlLCBjaGVja0RhdGUsIGNlbGxUeXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldElucHV0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0cyA9IF90aGlzLm9wdHMsXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gX3RoaXMubG9jLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICAgICAgYWx0Rm9ybWF0ID0gb3B0cy5hbHRGaWVsZERhdGVGb3JtYXQsXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBfdGhpcy5zZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZm9ybWF0RGF0ZShmb3JtYXQsIGRhdGUpXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgYWx0VmFsdWVzO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5hbHRGaWVsZCAmJiBfdGhpcy4kYWx0RmllbGQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYWx0VmFsdWVzID0gdGhpcy5zZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZm9ybWF0RGF0ZShhbHRGb3JtYXQsIGRhdGUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYWx0VmFsdWVzID0gYWx0VmFsdWVzLmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFsdEZpZWxkLnZhbChhbHRWYWx1ZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpO1xuXG4gICAgICAgICAgICB0aGlzLiRlbC52YWwodmFsdWUpXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGRhdGUgaXMgYmV0d2VlbiBtaW5EYXRlIGFuZCBtYXhEYXRlXG4gICAgICAgICAqIEBwYXJhbSBkYXRlIHtvYmplY3R9IC0gZGF0ZSBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHR5cGUge3N0cmluZ30gLSBjZWxsIHR5cGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfaXNJblJhbmdlOiBmdW5jdGlvbiAoZGF0ZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIHRpbWUgPSBkYXRlLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIG1pbiA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLm1pbkRhdGUpLFxuICAgICAgICAgICAgICAgIG1heCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLm1heERhdGUpLFxuICAgICAgICAgICAgICAgIGRNaW5UaW1lID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoLCBtaW4uZGF0ZSkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgIGRNYXhUaW1lID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoLCBtYXguZGF0ZSkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgIHR5cGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXk6IHRpbWUgPj0gdGhpcy5taW5UaW1lICYmIHRpbWUgPD0gdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgICAgICBtb250aDogZE1pblRpbWUgPj0gdGhpcy5taW5UaW1lICYmIGRNYXhUaW1lIDw9IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogZC55ZWFyID49IG1pbi55ZWFyICYmIGQueWVhciA8PSBtYXgueWVhclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gdHlwZSA/IHR5cGVzW3R5cGVdIDogdHlwZXMuZGF5XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldERpbWVuc2lvbnM6IGZ1bmN0aW9uICgkZWwpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkZWwub2Zmc2V0KCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICRlbC5vdXRlcldpZHRoKCksXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAkZWwub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgICAgICAgICBsZWZ0OiBvZmZzZXQubGVmdCxcbiAgICAgICAgICAgICAgICB0b3A6IG9mZnNldC50b3BcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RGF0ZUZyb21DZWxsOiBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgICAgdmFyIGN1ckRhdGUgPSB0aGlzLnBhcnNlZERhdGUsXG4gICAgICAgICAgICAgICAgeWVhciA9IGNlbGwuZGF0YSgneWVhcicpIHx8IGN1ckRhdGUueWVhcixcbiAgICAgICAgICAgICAgICBtb250aCA9IGNlbGwuZGF0YSgnbW9udGgnKSA9PSB1bmRlZmluZWQgPyBjdXJEYXRlLm1vbnRoIDogY2VsbC5kYXRhKCdtb250aCcpLFxuICAgICAgICAgICAgICAgIGRhdGUgPSBjZWxsLmRhdGEoJ2RhdGUnKSB8fCAxO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9zZXRQb3NpdGlvbkNsYXNzZXM6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgICAgIHBvcyA9IHBvcy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgdmFyIG1haW4gPSBwb3NbMF0sXG4gICAgICAgICAgICAgICAgc2VjID0gcG9zWzFdLFxuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSAnZGF0ZXBpY2tlciAtJyArIG1haW4gKyAnLScgKyBzZWMgKyAnLSAtZnJvbS0nICsgbWFpbiArICctJztcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkgY2xhc3NlcyArPSAnIGFjdGl2ZSc7XG5cbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2xhc3MnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhjbGFzc2VzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRQb3NpdGlvbjogZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IHRoaXMub3B0cy5wb3NpdGlvbjtcblxuICAgICAgICAgICAgdmFyIGRpbXMgPSB0aGlzLl9nZXREaW1lbnNpb25zKHRoaXMuJGVsKSxcbiAgICAgICAgICAgICAgICBzZWxmRGltcyA9IHRoaXMuX2dldERpbWVuc2lvbnModGhpcy4kZGF0ZXBpY2tlciksXG4gICAgICAgICAgICAgICAgcG9zID0gcG9zaXRpb24uc3BsaXQoJyAnKSxcbiAgICAgICAgICAgICAgICB0b3AsIGxlZnQsXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5vcHRzLm9mZnNldCxcbiAgICAgICAgICAgICAgICBtYWluID0gcG9zWzBdLFxuICAgICAgICAgICAgICAgIHNlY29uZGFyeSA9IHBvc1sxXTtcblxuICAgICAgICAgICAgc3dpdGNoIChtYWluKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3AgLSBzZWxmRGltcy5oZWlnaHQgLSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRpbXMubGVmdCArIGRpbXMud2lkdGggKyBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IGRpbXMudG9wICsgZGltcy5oZWlnaHQgKyBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGltcy5sZWZ0IC0gc2VsZkRpbXMud2lkdGggLSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2goc2Vjb25kYXJ5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3A7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRpbXMubGVmdCArIGRpbXMud2lkdGggLSBzZWxmRGltcy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3AgKyBkaW1zLmhlaWdodCAtIHNlbGZEaW1zLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkaW1zLmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgIGlmICgvbGVmdHxyaWdodC8udGVzdChtYWluKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3AgKyBkaW1zLmhlaWdodC8yIC0gc2VsZkRpbXMuaGVpZ2h0LzI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGltcy5sZWZ0ICsgZGltcy53aWR0aC8yIC0gc2VsZkRpbXMud2lkdGgvMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdG9wXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb25TaG93ID0gdGhpcy5vcHRzLm9uU2hvdztcblxuICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLm9wdHMucG9zaXRpb24pO1xuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAob25TaG93KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmluZFZpc2lvbkV2ZW50cyhvblNob3cpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9uSGlkZSA9IHRoaXMub3B0cy5vbkhpZGU7XG5cbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICctMTAwMDAwcHgnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5rZXlzID0gW107XG5cbiAgICAgICAgICAgIHRoaXMuaW5Gb2N1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRlbC5ibHVyKCk7XG5cbiAgICAgICAgICAgIGlmIChvbkhpZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iaW5kVmlzaW9uRXZlbnRzKG9uSGlkZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkb3duOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlVmlldyhkYXRlLCAnZG93bicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlVmlldyhkYXRlLCAndXAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZFZpc2lvbkV2ZW50czogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9mZigndHJhbnNpdGlvbmVuZC5kcCcpO1xuICAgICAgICAgICAgZXZlbnQodGhpcywgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5vbmUoJ3RyYW5zaXRpb25lbmQuZHAnLCBldmVudC5iaW5kKHRoaXMsIHRoaXMsIHRydWUpKVxuICAgICAgICB9LFxuXG4gICAgICAgIF9jaGFuZ2VWaWV3OiBmdW5jdGlvbiAoZGF0ZSwgZGlyKSB7XG4gICAgICAgICAgICBkYXRlID0gZGF0ZSB8fCB0aGlzLmZvY3VzZWQgfHwgdGhpcy5kYXRlO1xuXG4gICAgICAgICAgICB2YXIgbmV4dFZpZXcgPSBkaXIgPT0gJ3VwJyA/IHRoaXMudmlld0luZGV4ICsgMSA6IHRoaXMudmlld0luZGV4IC0gMTtcbiAgICAgICAgICAgIGlmIChuZXh0VmlldyA+IDIpIG5leHRWaWV3ID0gMjtcbiAgICAgICAgICAgIGlmIChuZXh0VmlldyA8IDApIG5leHRWaWV3ID0gMDtcblxuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpO1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IHRoaXMudmlld0luZGV4ZXNbbmV4dFZpZXddO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2hhbmRsZUhvdEtleTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5fZ2V0Rm9jdXNlZERhdGUoKSksXG4gICAgICAgICAgICAgICAgZm9jdXNlZFBhcnNlZCxcbiAgICAgICAgICAgICAgICBvID0gdGhpcy5vcHRzLFxuICAgICAgICAgICAgICAgIG5ld0RhdGUsXG4gICAgICAgICAgICAgICAgdG90YWxEYXlzSW5OZXh0TW9udGgsXG4gICAgICAgICAgICAgICAgbW9udGhDaGFuZ2VkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgeWVhckNoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWNhZGVDaGFuZ2VkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgeSA9IGRhdGUueWVhcixcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5tb250aCxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZS5kYXRlO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2N0cmxSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnY3RybFVwJzpcbiAgICAgICAgICAgICAgICAgICAgbSArPSAxO1xuICAgICAgICAgICAgICAgICAgICBtb250aENoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjdHJsTGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnY3RybERvd24nOlxuICAgICAgICAgICAgICAgICAgICBtIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NoaWZ0UmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NoaWZ0VXAnOlxuICAgICAgICAgICAgICAgICAgICB5ZWFyQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2hpZnRMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdzaGlmdERvd24nOlxuICAgICAgICAgICAgICAgICAgICB5ZWFyQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx0UmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2FsdFVwJzpcbiAgICAgICAgICAgICAgICAgICAgZGVjYWRlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FsdExlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2FsdERvd24nOlxuICAgICAgICAgICAgICAgICAgICBkZWNhZGVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3RybFNoaWZ0VXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbERheXNJbk5leHRNb250aCA9IGRhdGVwaWNrZXIuZ2V0RGF5c0NvdW50KG5ldyBEYXRlKHksbSkpO1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKHksbSxkKTtcblxuICAgICAgICAgICAgLy8gSWYgbmV4dCBtb250aCBoYXMgbGVzcyBkYXlzIHRoYW4gY3VycmVudCwgc2V0IGRhdGUgdG8gdG90YWwgZGF5cyBpbiB0aGF0IG1vbnRoXG4gICAgICAgICAgICBpZiAodG90YWxEYXlzSW5OZXh0TW9udGggPCBkKSBkID0gdG90YWxEYXlzSW5OZXh0TW9udGg7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG5ld0RhdGUgaXMgaW4gdmFsaWQgcmFuZ2VcbiAgICAgICAgICAgIGlmIChuZXdEYXRlLmdldFRpbWUoKSA8IHRoaXMubWluVGltZSkge1xuICAgICAgICAgICAgICAgIG5ld0RhdGUgPSB0aGlzLm1pbkRhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0RhdGUuZ2V0VGltZSgpID4gdGhpcy5tYXhUaW1lKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gbmV3RGF0ZTtcblxuICAgICAgICAgICAgZm9jdXNlZFBhcnNlZCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShuZXdEYXRlKTtcbiAgICAgICAgICAgIGlmIChtb250aENoYW5nZWQgJiYgby5vbkNoYW5nZU1vbnRoKSB7XG4gICAgICAgICAgICAgICAgby5vbkNoYW5nZU1vbnRoKGZvY3VzZWRQYXJzZWQubW9udGgsIGZvY3VzZWRQYXJzZWQueWVhcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh5ZWFyQ2hhbmdlZCAmJiBvLm9uQ2hhbmdlWWVhcikge1xuICAgICAgICAgICAgICAgIG8ub25DaGFuZ2VZZWFyKGZvY3VzZWRQYXJzZWQueWVhcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWNhZGVDaGFuZ2VkICYmIG8ub25DaGFuZ2VEZWNhZGUpIHtcbiAgICAgICAgICAgICAgICBvLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZWdpc3RlcktleTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIGV4aXN0cyA9IHRoaXMua2V5cy5zb21lKGZ1bmN0aW9uIChjdXJLZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VyS2V5ID09IGtleTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWV4aXN0cykge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5cy5wdXNoKGtleSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdW5SZWdpc3RlcktleTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5rZXlzLmluZGV4T2Yoa2V5KTtcblxuICAgICAgICAgICAgdGhpcy5rZXlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2lzSG90S2V5UHJlc3NlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRIb3RLZXksXG4gICAgICAgICAgICAgICAgZm91bmQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgcHJlc3NlZEtleXMgPSB0aGlzLmtleXMuc29ydCgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBob3RLZXkgaW4gaG90S2V5cykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRIb3RLZXkgPSBob3RLZXlzW2hvdEtleV07XG4gICAgICAgICAgICAgICAgaWYgKHByZXNzZWRLZXlzLmxlbmd0aCAhPSBjdXJyZW50SG90S2V5Lmxlbmd0aCkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEhvdEtleS5ldmVyeShmdW5jdGlvbiAoa2V5LCBpKSB7IHJldHVybiBrZXkgPT0gcHJlc3NlZEtleXNbaV19KSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlcignaG90S2V5JywgaG90S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9LFxuXG4gICAgICAgIF90cmlnZ2VyOiBmdW5jdGlvbiAoZXZlbnQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLnRyaWdnZXIoZXZlbnQsIGFyZ3MpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2ZvY3VzTmV4dENlbGw6IGZ1bmN0aW9uIChrZXlDb2RlLCB0eXBlKSB7XG4gICAgICAgICAgICB0eXBlID0gdHlwZSB8fCB0aGlzLmNlbGxUeXBlO1xuXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLl9nZXRGb2N1c2VkRGF0ZSgpKSxcbiAgICAgICAgICAgICAgICB5ID0gZGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLm1vbnRoLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmRhdGU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0hvdEtleVByZXNzZWQoKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2goa2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMzc6IC8vIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnZGF5JyA/IChkIC09IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ21vbnRoJyA/IChtIC09IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ3llYXInID8gKHkgLT0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzODogLy8gdXBcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnZGF5JyA/IChkIC09IDcpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ21vbnRoJyA/IChtIC09IDMpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ3llYXInID8gKHkgLT0gNCkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOTogLy8gcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnZGF5JyA/IChkICs9IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ21vbnRoJyA/IChtICs9IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ3llYXInID8gKHkgKz0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDogLy8gZG93blxuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdkYXknID8gKGQgKz0gNykgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnbW9udGgnID8gKG0gKz0gMykgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAneWVhcicgPyAoeSArPSA0KSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5kID0gbmV3IERhdGUoeSxtLGQpO1xuICAgICAgICAgICAgaWYgKG5kLmdldFRpbWUoKSA8IHRoaXMubWluVGltZSkge1xuICAgICAgICAgICAgICAgIG5kID0gdGhpcy5taW5EYXRlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZC5nZXRUaW1lKCkgPiB0aGlzLm1heFRpbWUpIHtcbiAgICAgICAgICAgICAgICBuZCA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gbmQ7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Rm9jdXNlZERhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBmb2N1c2VkICA9IHRoaXMuZm9jdXNlZCB8fCB0aGlzLnNlbGVjdGVkRGF0ZXNbdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCAtIDFdLFxuICAgICAgICAgICAgICAgIGQgPSB0aGlzLnBhcnNlZERhdGU7XG5cbiAgICAgICAgICAgIGlmICghZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNlZCA9IG5ldyBEYXRlKGQueWVhciwgZC5tb250aCwgbmV3IERhdGUoKS5nZXREYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2VkID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2VkID0gbmV3IERhdGUoZC55ZWFyLCAwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZvY3VzZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldENlbGw6IGZ1bmN0aW9uIChkYXRlLCB0eXBlKSB7XG4gICAgICAgICAgICB0eXBlID0gdHlwZSB8fCB0aGlzLmNlbGxUeXBlO1xuXG4gICAgICAgICAgICB2YXIgZCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICcuZGF0ZXBpY2tlci0tY2VsbFtkYXRhLXllYXI9XCInICsgZC55ZWFyICsgJ1wiXScsXG4gICAgICAgICAgICAgICAgJGNlbGw7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnW2RhdGEtbW9udGg9XCInICsgZC5tb250aCArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciArPSAnW2RhdGEtbW9udGg9XCInICsgZC5tb250aCArICdcIl1bZGF0YS1kYXRlPVwiJyArIGQuZGF0ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRjZWxsID0gdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS4kZWwuZmluZChzZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIHJldHVybiAkY2VsbC5sZW5ndGggPyAkY2VsbCA6ICQoJycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBfdGhpcy4kZWxcbiAgICAgICAgICAgICAgICAub2ZmKCcuYWRwJylcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicsICcnKTtcblxuICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcyA9IFtdO1xuICAgICAgICAgICAgX3RoaXMuZm9jdXNlZCA9ICcnO1xuICAgICAgICAgICAgX3RoaXMudmlld3MgPSB7fTtcbiAgICAgICAgICAgIF90aGlzLmtleXMgPSBbXTtcbiAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0cy5pbmxpbmUgfHwgIV90aGlzLmVsSXNJbnB1dCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiRkYXRlcGlja2VyLmNsb3Nlc3QoJy5kYXRlcGlja2VyLWlubGluZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZGF0ZXBpY2tlci5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfaGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXM6IGZ1bmN0aW9uIChhbHJlYWR5U2VsZWN0ZWQsIHNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBwb3NzaWJpbGl0eSB0byBzZWxlY3Qgc2FtZSBkYXRlIHdoZW4gcmFuZ2UgaXMgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCAhPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdjbGlja0NlbGwnLCBzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEYXRlKHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGF0ZShzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDaGFuZ2UgbGFzdCBzZWxlY3RlZCBkYXRlIHRvIGJlIGFibGUgdG8gY2hhbmdlIHRpbWUgd2hlbiBjbGlja2luZyBvbiB0aGlzIGNlbGxcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWREYXRlID0gYWxyZWFkeVNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIuX3NldFRpbWUoYWxyZWFkeVNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25TaG93RXZlbnQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkJsdXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbkZvY3VzICYmIHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlRG93bkRhdGVwaWNrZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLmluRm9jdXMgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlVXBEYXRlcGlja2VyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdGhpcy5pbkZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICBlLm9yaWdpbmFsRXZlbnQuaW5Gb2N1cyA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIWUub3JpZ2luYWxFdmVudC50aW1lcGlja2VyRm9jdXMpIHRoaXMuJGVsLmZvY3VzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uS2V5VXBHZW5lcmFsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXMuJGVsLnZhbCgpO1xuXG4gICAgICAgICAgICBpZiAoIXZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25SZXNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VVcEJvZHk6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50LmluRm9jdXMpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSAmJiAhdGhpcy5pbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VVcEVsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5vcmlnaW5hbEV2ZW50LmluRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLl9vbktleVVwR2VuZXJhbC5iaW5kKHRoaXMpLDQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbktleURvd246IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgY29kZSA9IGUud2hpY2g7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcktleShjb2RlKTtcblxuICAgICAgICAgICAgLy8gQXJyb3dzXG4gICAgICAgICAgICBpZiAoY29kZSA+PSAzNyAmJiBjb2RlIDw9IDQwKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZvY3VzTmV4dENlbGwoY29kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVudGVyXG4gICAgICAgICAgICBpZiAoY29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dldENlbGwodGhpcy5mb2N1c2VkKS5oYXNDbGFzcygnLWRpc2FibGVkLScpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZXcgIT0gdGhpcy5vcHRzLm1pblZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bigpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5faXNTZWxlY3RlZCh0aGlzLmZvY3VzZWQsIHRoaXMuY2VsbFR5cGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3Vycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZC5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKHRoaXMuZm9jdXNlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXMoYWxyZWFkeVNlbGVjdGVkLCB0aGlzLmZvY3VzZWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVzY1xuICAgICAgICAgICAgaWYgKGNvZGUgPT0gMjcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25LZXlVcDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDtcbiAgICAgICAgICAgIHRoaXMuX3VuUmVnaXN0ZXJLZXkoY29kZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uSG90S2V5OiBmdW5jdGlvbiAoZSwgaG90S2V5KSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVIb3RLZXkoaG90S2V5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZUVudGVyQ2VsbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciAkY2VsbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5kYXRlcGlja2VyLS1jZWxsJyksXG4gICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMuX2dldERhdGVGcm9tQ2VsbCgkY2VsbCk7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZnJvbSB1bm5lY2Vzc2FyeSByZW5kZXJpbmcgYW5kIHNldHRpbmcgbmV3IGN1cnJlbnREYXRlXG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSAnJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkY2VsbC5hZGRDbGFzcygnLWZvY3VzLScpO1xuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBkYXRlO1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5yYW5nZSAmJiB0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pblJhbmdlID0gdGhpcy5zZWxlY3RlZERhdGVzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZXBpY2tlci5sZXNzKHRoaXMubWluUmFuZ2UsIHRoaXMuZm9jdXNlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9IHRoaXMubWluUmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fdXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VMZWF2ZUNlbGw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJGNlbGwgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZGF0ZXBpY2tlci0tY2VsbCcpO1xuXG4gICAgICAgICAgICAkY2VsbC5yZW1vdmVDbGFzcygnLWZvY3VzLScpO1xuXG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uVGltZUNoYW5nZTogZnVuY3Rpb24gKGUsIGgsIG0pIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGVzID0gdGhpcy5zZWxlY3RlZERhdGVzLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZERhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5sYXN0U2VsZWN0ZWREYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlLnNldEhvdXJzKGgpO1xuICAgICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKG0pO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkICYmICF0aGlzLl9nZXRDZWxsKGRhdGUpLmhhc0NsYXNzKCctZGlzYWJsZWQtJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJPbkNoYW5nZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25DbGlja0NlbGw6IGZ1bmN0aW9uIChlLCBkYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoZGF0ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGZvY3VzZWQodmFsKSB7XG4gICAgICAgICAgICBpZiAoIXZhbCAmJiB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGNlbGwgPSB0aGlzLl9nZXRDZWxsKHRoaXMuZm9jdXNlZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJGNlbGwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICRjZWxsLnJlbW92ZUNsYXNzKCctZm9jdXMtJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2VkID0gdmFsO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5yYW5nZSAmJiB0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pblJhbmdlID0gdGhpcy5zZWxlY3RlZERhdGVzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZXBpY2tlci5sZXNzKHRoaXMubWluUmFuZ2UsIHRoaXMuX2ZvY3VzZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSB0aGlzLm1pblJhbmdlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2lsZW50KSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSB2YWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGZvY3VzZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNlZDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgcGFyc2VkRGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5kYXRlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgZGF0ZSAodmFsKSB7XG4gICAgICAgICAgICBpZiAoISh2YWwgaW5zdGFuY2VvZiBEYXRlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gdmFsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0ZWQgJiYgIXRoaXMuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLnZpZXddLl9yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdi5fcmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSAmJiB0aGlzLmVsSXNJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgZGF0ZSAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50RGF0ZVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldCB2aWV3ICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0luZGV4ID0gdGhpcy52aWV3SW5kZXhlcy5pbmRleE9mKHZhbCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJldlZpZXcgPSB0aGlzLmN1cnJlbnRWaWV3O1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHZhbDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZpZXdzW3ZhbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3c1t2YWxdID0gbmV3ICAkLmZuLmRhdGVwaWNrZXIuQm9keSh0aGlzLCB2YWwsIHRoaXMub3B0cylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3ZhbF0uX3JlbmRlcigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5wcmV2Vmlld10uaGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld3NbdmFsXS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXYuX3JlbmRlcigpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbkNoYW5nZVZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLm9uQ2hhbmdlVmlldyh2YWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVsSXNJbnB1dCAmJiB0aGlzLnZpc2libGUpIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICB9LFxuXG4gICAgICAgIGdldCB2aWV3KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFZpZXc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGNlbGxUeXBlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlldy5zdWJzdHJpbmcoMCwgdGhpcy52aWV3Lmxlbmd0aCAtIDEpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IG1pblRpbWUoKSB7XG4gICAgICAgICAgICB2YXIgbWluID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMubWluRGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUobWluLnllYXIsIG1pbi5tb250aCwgbWluLmRhdGUpLmdldFRpbWUoKVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBtYXhUaW1lKCkge1xuICAgICAgICAgICAgdmFyIG1heCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLm1heERhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG1heC55ZWFyLCBtYXgubW9udGgsIG1heC5kYXRlKS5nZXRUaW1lKClcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgY3VyRGVjYWRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVwaWNrZXIuZ2V0RGVjYWRlKHRoaXMuZGF0ZSlcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyAgVXRpbHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBkYXRlcGlja2VyLmdldERheXNDb3VudCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBmdWxsTW9udGg6IChkYXRlLmdldE1vbnRoKCkgKyAxKSA8IDEwID8gJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMSwgLy8gT25lIGJhc2VkXG4gICAgICAgICAgICBkYXRlOiBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgIGZ1bGxEYXRlOiBkYXRlLmdldERhdGUoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgIGRheTogZGF0ZS5nZXREYXkoKSxcbiAgICAgICAgICAgIGhvdXJzOiBkYXRlLmdldEhvdXJzKCksXG4gICAgICAgICAgICBmdWxsSG91cnM6ICBkYXRlLmdldEhvdXJzKCkgPCAxMCA/ICcwJyArIGRhdGUuZ2V0SG91cnMoKSA6ICBkYXRlLmdldEhvdXJzKCkgLFxuICAgICAgICAgICAgbWludXRlczogZGF0ZS5nZXRNaW51dGVzKCksXG4gICAgICAgICAgICBmdWxsTWludXRlczogIGRhdGUuZ2V0TWludXRlcygpIDwgMTAgPyAnMCcgKyBkYXRlLmdldE1pbnV0ZXMoKSA6ICBkYXRlLmdldE1pbnV0ZXMoKVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuZ2V0RGVjYWRlID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgdmFyIGZpcnN0WWVhciA9IE1hdGguZmxvb3IoZGF0ZS5nZXRGdWxsWWVhcigpIC8gMTApICogMTA7XG5cbiAgICAgICAgcmV0dXJuIFtmaXJzdFllYXIsIGZpcnN0WWVhciArIDldO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLnRlbXBsYXRlID0gZnVuY3Rpb24gKHN0ciwgZGF0YSkge1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyNcXHsoW1xcd10rKVxcfS9nLCBmdW5jdGlvbiAoc291cmNlLCBtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGRhdGFbbWF0Y2hdIHx8IGRhdGFbbWF0Y2hdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbbWF0Y2hdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmlzU2FtZSA9IGZ1bmN0aW9uIChkYXRlMSwgZGF0ZTIsIHR5cGUpIHtcbiAgICAgICAgaWYgKCFkYXRlMSB8fCAhZGF0ZTIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGQxID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUxKSxcbiAgICAgICAgICAgIGQyID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUyKSxcbiAgICAgICAgICAgIF90eXBlID0gdHlwZSA/IHR5cGUgOiAnZGF5JyxcblxuICAgICAgICAgICAgY29uZGl0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBkYXk6IGQxLmRhdGUgPT0gZDIuZGF0ZSAmJiBkMS5tb250aCA9PSBkMi5tb250aCAmJiBkMS55ZWFyID09IGQyLnllYXIsXG4gICAgICAgICAgICAgICAgbW9udGg6IGQxLm1vbnRoID09IGQyLm1vbnRoICYmIGQxLnllYXIgPT0gZDIueWVhcixcbiAgICAgICAgICAgICAgICB5ZWFyOiBkMS55ZWFyID09IGQyLnllYXJcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbnNbX3R5cGVdO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmxlc3MgPSBmdW5jdGlvbiAoZGF0ZUNvbXBhcmVUbywgZGF0ZSwgdHlwZSkge1xuICAgICAgICBpZiAoIWRhdGVDb21wYXJlVG8gfHwgIWRhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIDwgZGF0ZUNvbXBhcmVUby5nZXRUaW1lKCk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuYmlnZ2VyID0gZnVuY3Rpb24gKGRhdGVDb21wYXJlVG8sIGRhdGUsIHR5cGUpIHtcbiAgICAgICAgaWYgKCFkYXRlQ29tcGFyZVRvIHx8ICFkYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKSA+IGRhdGVDb21wYXJlVG8uZ2V0VGltZSgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmdldExlYWRpbmdaZXJvTnVtID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQobnVtKSA8IDEwID8gJzAnICsgbnVtIDogbnVtO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNvcHkgb2YgZGF0ZSB3aXRoIGhvdXJzIGFuZCBtaW51dGVzIGVxdWFscyB0byAwXG4gICAgICogQHBhcmFtIGRhdGUge0RhdGV9XG4gICAgICovXG4gICAgZGF0ZXBpY2tlci5yZXNldFRpbWUgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGUgIT0gJ29iamVjdCcpIHJldHVybjtcbiAgICAgICAgZGF0ZSA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXRlKVxuICAgIH07XG5cbiAgICAkLmZuLmRhdGVwaWNrZXIgPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEkLmRhdGEodGhpcywgcGx1Z2luTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAkLmRhdGEodGhpcywgIHBsdWdpbk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlcGlja2VyKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSAkLmRhdGEodGhpcywgcGx1Z2luTmFtZSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwgX3RoaXMub3B0cywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkLmZuLmRhdGVwaWNrZXIuQ29uc3RydWN0b3IgPSBEYXRlcGlja2VyO1xuXG4gICAgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlID0ge1xuICAgICAgICBydToge1xuICAgICAgICAgICAgZGF5czogWyfQktC+0YHQutGA0LXRgdC10L3RjNC1Jywn0J/QvtC90LXQtNC10LvRjNC90LjQuicsJ9CS0YLQvtGA0L3QuNC6Jywn0KHRgNC10LTQsCcsJ9Cn0LXRgtCy0LXRgNCzJywn0J/Rj9GC0L3QuNGG0LAnLCfQodGD0LHQsdC+0YLQsCddLFxuICAgICAgICAgICAgZGF5c1Nob3J0OiBbJ9CS0L7RgScsJ9Cf0L7QvScsJ9CS0YLQvicsJ9Ch0YDQtScsJ9Cn0LXRgicsJ9Cf0Y/RgicsJ9Ch0YPQsSddLFxuICAgICAgICAgICAgZGF5c01pbjogWyfQktC+0YEnLCfQn9C+0L0nLCfQktGC0L4nLCfQodGA0LUnLCfQp9C10YInLCfQn9GP0YInLCfQodGD0LEnXSxcbiAgICAgICAgICAgIG1vbnRoczogWyfQr9C90LLQsNGA0YwnLCfQpNC10LLRgNCw0LvRjCcsJ9Cc0LDRgNGCJywn0JDQv9GA0LXQu9GMJywn0JzQsNC5Jywn0JjRjtC90YwnLCfQmNGO0LvRjCcsJ9CQ0LLQs9GD0YHRgicsJ9Ch0LXQvdGC0Y/QsdGA0YwnLCfQntC60YLRj9Cx0YDRjCcsJ9Cd0L7Rj9Cx0YDRjCcsJ9CU0LXQutCw0LHRgNGMJ10sXG4gICAgICAgICAgICBtb250aHNTaG9ydDogWyfQr9C90LInLCfQpNC10LInLCfQnNCw0YAnLCfQkNC/0YAnLCfQnNCw0LknLCfQmNGO0L0nLCfQmNGO0LsnLCfQkNCy0LMnLCfQodC10L0nLCfQntC60YInLCfQndC+0Y8nLCfQlNC10LonXSxcbiAgICAgICAgICAgIHRvZGF5OiAn0KHQtdCz0L7QtNC90Y8nLFxuICAgICAgICAgICAgY2xlYXI6ICfQntGH0LjRgdGC0LjRgtGMJyxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eXl5JyxcbiAgICAgICAgICAgIHRpbWVGb3JtYXQ6ICdoaDppaScsXG4gICAgICAgICAgICBmaXJzdERheTogMVxuICAgICAgICB9XG4gICAgfTtcbiAgIC8vICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVsncnUnXSA9ICB7XG4gICAvLyAgICAgZGF5czogWyfQktC+0YHQutGA0LXRgdC10L3RjNC1Jywn0J/QvtC90LXQtNC10LvRjNC90LjQuicsJ9CS0YLQvtGA0L3QuNC6Jywn0KHRgNC10LTQsCcsJ9Cn0LXRgtCy0LXRgNCzJywn0J/Rj9GC0L3QuNGG0LAnLCfQodGD0LHQsdC+0YLQsCddLFxuICAgIC8vICAgIGRheXNTaG9ydDogWyfQktC+0YEnLCfQn9C+0L0nLCfQktGC0L4nLCfQodGA0LUnLCfQp9C10YInLCfQn9GP0YInLCfQodGD0LEnXSxcbiAgIC8vICAgICBkYXlzTWluOiBbJ9CS0YEnLCfQn9C9Jywn0JLRgicsJ9Ch0YAnLCfQp9GCJywn0J/RgicsJ9Ch0LEnXSxcbiAgIC8vICAgICBtb250aHM6IFsn0K/QvdCy0LDRgNGMJywn0KTQtdCy0YDQsNC70YwnLCfQnNCw0YDRgicsJ9CQ0L/RgNC10LvRjCcsJ9Cc0LDQuScsJ9CY0Y7QvdGMJywn0JjRjtC70YwnLCfQkNCy0LPRg9GB0YInLCfQodC10L3RgtGP0LHRgNGMJywn0J7QutGC0Y/QsdGA0YwnLCfQndC+0Y/QsdGA0YwnLCfQlNC10LrQsNCx0YDRjCddLFxuICAgLy8gICAgIG1vbnRoc1Nob3J0OiBbJ9Cv0L3QsicsJ9Ck0LXQsicsJ9Cc0LDRgCcsJ9CQ0L/RgCcsJ9Cc0LDQuScsJ9CY0Y7QvScsJ9CY0Y7QuycsJ9CQ0LLQsycsJ9Ch0LXQvScsJ9Ce0LrRgicsJ9Cd0L7RjycsJ9CU0LXQuiddLFxuICAgLy8gICAgIHRvZGF5OiAn0KHQtdCz0L7QtNC90Y8nLFxuICAvLyAgICAgIGNsZWFyOiAn0J7Rh9C40YHRgtC40YLRjCcsXG4gLy8gICAgICAgZGF0ZUZvcm1hdDogJ2RkLm1tLnl5eXknLFxuIC8vICAgICAgIHRpbWVGb3JtYXQ6ICdoaDppaScsXG4gLy8gICAgICAgZmlyc3REYXk6IDFcbiAvLyAgIH07XG5cblxuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKGF1dG9Jbml0U2VsZWN0b3IpLmRhdGVwaWNrZXIoKTtcbiAgICB9KVxuXG59KSgpO1xuXG47KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGVtcGxhdGVzID0ge1xuICAgICAgICBkYXlzOicnICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXlzIGRhdGVwaWNrZXItLWJvZHlcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXlzLW5hbWVzXCI+PC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY2VsbHMgZGF0ZXBpY2tlci0tY2VsbHMtZGF5c1wiPjwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgbW9udGhzOiAnJyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbW9udGhzIGRhdGVwaWNrZXItLWJvZHlcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy1tb250aHNcIj48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgIHllYXJzOiAnJyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0teWVhcnMgZGF0ZXBpY2tlci0tYm9keVwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLXllYXJzXCI+PC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGVwaWNrZXIgPSAkLmZuLmRhdGVwaWNrZXIsXG4gICAgICAgIGRwID0gZGF0ZXBpY2tlci5Db25zdHJ1Y3RvcjtcblxuICAgIGRhdGVwaWNrZXIuQm9keSA9IGZ1bmN0aW9uIChkLCB0eXBlLCBvcHRzKSB7XG4gICAgICAgIHRoaXMuZCA9IGQ7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMuJGVsID0gJCgnJyk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5Cb2R5LnByb3RvdHlwZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRCYXNlSHRtbCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2NsaWNrJywgJy5kYXRlcGlja2VyLS1jZWxsJywgJC5wcm94eSh0aGlzLl9vbkNsaWNrQ2VsbCwgdGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9idWlsZEJhc2VIdG1sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQodGVtcGxhdGVzW3RoaXMudHlwZV0pLmFwcGVuZFRvKHRoaXMuZC4kY29udGVudCk7XG4gICAgICAgICAgICB0aGlzLiRuYW1lcyA9ICQoJy5kYXRlcGlja2VyLS1kYXlzLW5hbWVzJywgdGhpcy4kZWwpO1xuICAgICAgICAgICAgdGhpcy4kY2VsbHMgPSAkKCcuZGF0ZXBpY2tlci0tY2VsbHMnLCB0aGlzLiRlbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldERheU5hbWVzSHRtbDogZnVuY3Rpb24gKGZpcnN0RGF5LCBjdXJEYXksIGh0bWwsIGkpIHtcbiAgICAgICAgICAgIGN1ckRheSA9IGN1ckRheSAhPSB1bmRlZmluZWQgPyBjdXJEYXkgOiBmaXJzdERheTtcbiAgICAgICAgICAgIGh0bWwgPSBodG1sID8gaHRtbCA6ICcnO1xuICAgICAgICAgICAgaSA9IGkgIT0gdW5kZWZpbmVkID8gaSA6IDA7XG5cbiAgICAgICAgICAgIGlmIChpID4gNykgcmV0dXJuIGh0bWw7XG4gICAgICAgICAgICBpZiAoY3VyRGF5ID09IDcpIHJldHVybiB0aGlzLl9nZXREYXlOYW1lc0h0bWwoZmlyc3REYXksIDAsIGh0bWwsICsraSk7XG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXktbmFtZScgKyAodGhpcy5kLmlzV2Vla2VuZChjdXJEYXkpID8gXCIgLXdlZWtlbmQtXCIgOiBcIlwiKSArICdcIj4nICsgdGhpcy5kLmxvYy5kYXlzTWluW2N1ckRheV0gKyAnPC9kaXY+JztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldERheU5hbWVzSHRtbChmaXJzdERheSwgKytjdXJEYXksIGh0bWwsICsraSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldENlbGxDb250ZW50czogZnVuY3Rpb24gKGRhdGUsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gXCJkYXRlcGlja2VyLS1jZWxsIGRhdGVwaWNrZXItLWNlbGwtXCIgKyB0eXBlLFxuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSB0aGlzLmQsXG4gICAgICAgICAgICAgICAgbWluUmFuZ2UgPSBkcC5yZXNldFRpbWUocGFyZW50Lm1pblJhbmdlKSxcbiAgICAgICAgICAgICAgICBtYXhSYW5nZSA9IGRwLnJlc2V0VGltZShwYXJlbnQubWF4UmFuZ2UpLFxuICAgICAgICAgICAgICAgIG9wdHMgPSBwYXJlbnQub3B0cyxcbiAgICAgICAgICAgICAgICBkID0gZHAuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICByZW5kZXIgPSB7fSxcbiAgICAgICAgICAgICAgICBodG1sID0gZC5kYXRlO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50LmlzV2Vla2VuZChkLmRheSkpIGNsYXNzZXMgKz0gXCIgLXdlZWtlbmQtXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLm1vbnRoICE9IHRoaXMuZC5wYXJzZWREYXRlLm1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9IFwiIC1vdGhlci1tb250aC1cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0cy5zZWxlY3RPdGhlck1vbnRocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gXCIgLWRpc2FibGVkLVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNob3dPdGhlck1vbnRocykgaHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IHBhcmVudC5sb2NbcGFyZW50Lm9wdHMubW9udGhzRmllbGRdW2QubW9udGhdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY2FkZSA9IHBhcmVudC5jdXJEZWNhZGU7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBkLnllYXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLnllYXIgPCBkZWNhZGVbMF0gfHwgZC55ZWFyID4gZGVjYWRlWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9ICcgLW90aGVyLWRlY2FkZS0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNlbGVjdE90aGVyWWVhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9IFwiIC1kaXNhYmxlZC1cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0cy5zaG93T3RoZXJZZWFycykgaHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5vblJlbmRlckNlbGwpIHtcbiAgICAgICAgICAgICAgICByZW5kZXIgPSBvcHRzLm9uUmVuZGVyQ2VsbChkYXRlLCB0eXBlKSB8fCB7fTtcbiAgICAgICAgICAgICAgICBodG1sID0gcmVuZGVyLmh0bWwgPyByZW5kZXIuaHRtbCA6IGh0bWw7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyArPSByZW5kZXIuY2xhc3NlcyA/ICcgJyArIHJlbmRlci5jbGFzc2VzIDogJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRwLmlzU2FtZShtaW5SYW5nZSwgZGF0ZSwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtcmFuZ2UtZnJvbS0nO1xuICAgICAgICAgICAgICAgIGlmIChkcC5pc1NhbWUobWF4UmFuZ2UsIGRhdGUsIHR5cGUpKSBjbGFzc2VzICs9ICcgLXJhbmdlLXRvLSc7XG5cbiAgICAgICAgICAgICAgICBpZiAocGFyZW50LnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDEgJiYgcGFyZW50LmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGRwLmJpZ2dlcihtaW5SYW5nZSwgZGF0ZSkgJiYgZHAubGVzcyhwYXJlbnQuZm9jdXNlZCwgZGF0ZSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoZHAubGVzcyhtYXhSYW5nZSwgZGF0ZSkgJiYgZHAuYmlnZ2VyKHBhcmVudC5mb2N1c2VkLCBkYXRlKSkpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gJyAtaW4tcmFuZ2UtJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRwLmxlc3MobWF4UmFuZ2UsIGRhdGUpICYmIGRwLmlzU2FtZShwYXJlbnQuZm9jdXNlZCwgZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gJyAtcmFuZ2UtZnJvbS0nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRwLmJpZ2dlcihtaW5SYW5nZSwgZGF0ZSkgJiYgZHAuaXNTYW1lKHBhcmVudC5mb2N1c2VkLCBkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIC1yYW5nZS10by0nXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50LnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRwLmJpZ2dlcihtaW5SYW5nZSwgZGF0ZSkgJiYgZHAubGVzcyhtYXhSYW5nZSwgZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gJyAtaW4tcmFuZ2UtJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChkcC5pc1NhbWUoY3VycmVudERhdGUsIGRhdGUsIHR5cGUpKSBjbGFzc2VzICs9ICcgLWN1cnJlbnQtJztcbiAgICAgICAgICAgIGlmIChwYXJlbnQuZm9jdXNlZCAmJiBkcC5pc1NhbWUoZGF0ZSwgcGFyZW50LmZvY3VzZWQsIHR5cGUpKSBjbGFzc2VzICs9ICcgLWZvY3VzLSc7XG4gICAgICAgICAgICBpZiAocGFyZW50Ll9pc1NlbGVjdGVkKGRhdGUsIHR5cGUpKSBjbGFzc2VzICs9ICcgLXNlbGVjdGVkLSc7XG4gICAgICAgICAgICBpZiAoIXBhcmVudC5faXNJblJhbmdlKGRhdGUsIHR5cGUpIHx8IHJlbmRlci5kaXNhYmxlZCkgY2xhc3NlcyArPSAnIC1kaXNhYmxlZC0nO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWw6IGh0bWwsXG4gICAgICAgICAgICAgICAgY2xhc3NlczogY2xhc3Nlc1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWxjdWxhdGVzIGRheXMgbnVtYmVyIHRvIHJlbmRlci4gR2VuZXJhdGVzIGRheXMgaHRtbCBhbmQgcmV0dXJucyBpdC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGUgLSBEYXRlIG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2dldERheXNIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIHRvdGFsTW9udGhEYXlzID0gZHAuZ2V0RGF5c0NvdW50KGRhdGUpLFxuICAgICAgICAgICAgICAgIGZpcnN0TW9udGhEYXkgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMSkuZ2V0RGF5KCksXG4gICAgICAgICAgICAgICAgbGFzdE1vbnRoRGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIHRvdGFsTW9udGhEYXlzKS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBkYXlzRnJvbVBldk1vbnRoID0gZmlyc3RNb250aERheSAtIHRoaXMuZC5sb2MuZmlyc3REYXksXG4gICAgICAgICAgICAgICAgZGF5c0Zyb21OZXh0TW9udGggPSA2IC0gbGFzdE1vbnRoRGF5ICsgdGhpcy5kLmxvYy5maXJzdERheTtcblxuICAgICAgICAgICAgZGF5c0Zyb21QZXZNb250aCA9IGRheXNGcm9tUGV2TW9udGggPCAwID8gZGF5c0Zyb21QZXZNb250aCArIDcgOiBkYXlzRnJvbVBldk1vbnRoO1xuICAgICAgICAgICAgZGF5c0Zyb21OZXh0TW9udGggPSBkYXlzRnJvbU5leHRNb250aCA+IDYgPyBkYXlzRnJvbU5leHRNb250aCAtIDcgOiBkYXlzRnJvbU5leHRNb250aDtcblxuICAgICAgICAgICAgdmFyIHN0YXJ0RGF5SW5kZXggPSAtZGF5c0Zyb21QZXZNb250aCArIDEsXG4gICAgICAgICAgICAgICAgbSwgeSxcbiAgICAgICAgICAgICAgICBodG1sID0gJyc7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydERheUluZGV4LCBtYXggPSB0b3RhbE1vbnRoRGF5cyArIGRheXNGcm9tTmV4dE1vbnRoOyBpIDw9IG1heDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5nZXRNb250aCgpO1xuXG4gICAgICAgICAgICAgICAgaHRtbCArPSB0aGlzLl9nZXREYXlIdG1sKG5ldyBEYXRlKHksIG0sIGkpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RGF5SHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9nZXRDZWxsQ29udGVudHMoZGF0ZSwgJ2RheScpO1xuXG4gICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCInICsgY29udGVudC5jbGFzc2VzICsgJ1wiICcgK1xuICAgICAgICAgICAgICAgICdkYXRhLWRhdGU9XCInICsgZGF0ZS5nZXREYXRlKCkgKyAnXCIgJyArXG4gICAgICAgICAgICAgICAgJ2RhdGEtbW9udGg9XCInICsgZGF0ZS5nZXRNb250aCgpICsgJ1wiICcgK1xuICAgICAgICAgICAgICAgICdkYXRhLXllYXI9XCInICsgZGF0ZS5nZXRGdWxsWWVhcigpICsgJ1wiPicgKyBjb250ZW50Lmh0bWwgKyAnPC9kaXY+JztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2VuZXJhdGVzIG1vbnRocyBodG1sXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRlIC0gZGF0ZSBpbnN0YW5jZVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2dldE1vbnRoc0h0bWw6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9ICcnLFxuICAgICAgICAgICAgICAgIGQgPSBkcC5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICB3aGlsZShpIDwgMTIpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IHRoaXMuX2dldE1vbnRoSHRtbChuZXcgRGF0ZShkLnllYXIsIGkpKTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldE1vbnRoSHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5fZ2V0Q2VsbENvbnRlbnRzKGRhdGUsICdtb250aCcpO1xuXG4gICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCInICsgY29udGVudC5jbGFzc2VzICsgJ1wiIGRhdGEtbW9udGg9XCInICsgZGF0ZS5nZXRNb250aCgpICsgJ1wiPicgKyBjb250ZW50Lmh0bWwgKyAnPC9kaXY+J1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRZZWFyc0h0bWw6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGRwLmdldFBhcnNlZERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgZGVjYWRlID0gZHAuZ2V0RGVjYWRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIGZpcnN0WWVhciA9IGRlY2FkZVswXSAtIDEsXG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnLFxuICAgICAgICAgICAgICAgIGkgPSBmaXJzdFllYXI7XG5cbiAgICAgICAgICAgIGZvciAoaTsgaSA8PSBkZWNhZGVbMV0gKyAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IHRoaXMuX2dldFllYXJIdG1sKG5ldyBEYXRlKGkgLCAwKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRZZWFySHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5fZ2V0Q2VsbENvbnRlbnRzKGRhdGUsICd5ZWFyJyk7XG5cbiAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyBjb250ZW50LmNsYXNzZXMgKyAnXCIgZGF0YS15ZWFyPVwiJyArIGRhdGUuZ2V0RnVsbFllYXIoKSArICdcIj4nICsgY29udGVudC5odG1sICsgJzwvZGl2PidcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyVHlwZXM6IHtcbiAgICAgICAgICAgIGRheXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF5TmFtZXMgPSB0aGlzLl9nZXREYXlOYW1lc0h0bWwodGhpcy5kLmxvYy5maXJzdERheSksXG4gICAgICAgICAgICAgICAgICAgIGRheXMgPSB0aGlzLl9nZXREYXlzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kY2VsbHMuaHRtbChkYXlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRuYW1lcy5odG1sKGRheU5hbWVzKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vbnRoczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBodG1sID0gdGhpcy5fZ2V0TW9udGhzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kY2VsbHMuaHRtbChodG1sKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHllYXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGh0bWwgPSB0aGlzLl9nZXRZZWFyc0h0bWwodGhpcy5kLmN1cnJlbnREYXRlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJGNlbGxzLmh0bWwoaHRtbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJUeXBlc1t0aGlzLnR5cGVdLmJpbmQodGhpcykoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJGNlbGxzID0gJCgnLmRhdGVwaWNrZXItLWNlbGwnLCB0aGlzLiRjZWxscyksXG4gICAgICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgJGNlbGwsXG4gICAgICAgICAgICAgICAgZGF0ZTtcbiAgICAgICAgICAgICRjZWxscy5lYWNoKGZ1bmN0aW9uIChjZWxsLCBpKSB7XG4gICAgICAgICAgICAgICAgJGNlbGwgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSBfdGhpcy5kLl9nZXREYXRlRnJvbUNlbGwoJCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IF90aGlzLl9nZXRDZWxsQ29udGVudHMoZGF0ZSwgX3RoaXMuZC5jZWxsVHlwZSk7XG4gICAgICAgICAgICAgICAgJGNlbGwuYXR0cignY2xhc3MnLGNsYXNzZXMuY2xhc3NlcylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMuYWNpdHZlID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vICBFdmVudHNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIF9oYW5kbGVDbGljazogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGVsLmRhdGEoJ2RhdGUnKSB8fCAxLFxuICAgICAgICAgICAgICAgIG1vbnRoID0gZWwuZGF0YSgnbW9udGgnKSB8fCAwLFxuICAgICAgICAgICAgICAgIHllYXIgPSBlbC5kYXRhKCd5ZWFyJykgfHwgdGhpcy5kLnBhcnNlZERhdGUueWVhcixcbiAgICAgICAgICAgICAgICBkcCA9IHRoaXMuZDtcbiAgICAgICAgICAgIC8vIENoYW5nZSB2aWV3IGlmIG1pbiB2aWV3IGRvZXMgbm90IHJlYWNoIHlldFxuICAgICAgICAgICAgaWYgKGRwLnZpZXcgIT0gdGhpcy5vcHRzLm1pblZpZXcpIHtcbiAgICAgICAgICAgICAgICBkcC5kb3duKG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2VsZWN0IGRhdGUgaWYgbWluIHZpZXcgaXMgcmVhY2hlZFxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKSxcbiAgICAgICAgICAgICAgICBhbHJlYWR5U2VsZWN0ZWQgPSB0aGlzLmQuX2lzU2VsZWN0ZWQoc2VsZWN0ZWREYXRlLCB0aGlzLmQuY2VsbFR5cGUpO1xuXG4gICAgICAgICAgICBpZiAoIWFscmVhZHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGRwLl90cmlnZ2VyKCdjbGlja0NlbGwnLCBzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZHAuX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzLmJpbmQoZHAsIGFscmVhZHlTZWxlY3RlZCwgc2VsZWN0ZWREYXRlKSgpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQ2xpY2tDZWxsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyICRlbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5kYXRlcGlja2VyLS1jZWxsJyk7XG5cbiAgICAgICAgICAgIGlmICgkZWwuaGFzQ2xhc3MoJy1kaXNhYmxlZC0nKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMpKCRlbCk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcblxuOyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gJycgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi1hY3Rpb25cIiBkYXRhLWFjdGlvbj1cInByZXZcIj4je3ByZXZIdG1sfTwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi10aXRsZVwiPiN7dGl0bGV9PC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LWFjdGlvblwiIGRhdGEtYWN0aW9uPVwibmV4dFwiPiN7bmV4dEh0bWx9PC9kaXY+JyxcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lclRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1idXR0b25zXCI+PC9kaXY+JyxcbiAgICAgICAgYnV0dG9uID0gJzxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tYnV0dG9uXCIgZGF0YS1hY3Rpb249XCIje2FjdGlvbn1cIj4je2xhYmVsfTwvc3Bhbj4nLFxuICAgICAgICBkYXRlcGlja2VyID0gJC5mbi5kYXRlcGlja2VyLFxuICAgICAgICBkcCA9IGRhdGVwaWNrZXIuQ29uc3RydWN0b3I7XG5cbiAgICBkYXRlcGlja2VyLk5hdmlnYXRpb24gPSBmdW5jdGlvbiAoZCwgb3B0cykge1xuICAgICAgICB0aGlzLmQgPSBkO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuXG4gICAgICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIgPSAnJztcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5OYXZpZ2F0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRCYXNlSHRtbCgpO1xuICAgICAgICAgICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmQuJG5hdi5vbignY2xpY2snLCAnLmRhdGVwaWNrZXItLW5hdi1hY3Rpb24nLCAkLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZCdXR0b24sIHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZC4kbmF2Lm9uKCdjbGljaycsICcuZGF0ZXBpY2tlci0tbmF2LXRpdGxlJywgJC5wcm94eSh0aGlzLl9vbkNsaWNrTmF2VGl0bGUsIHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZC4kZGF0ZXBpY2tlci5vbignY2xpY2snLCAnLmRhdGVwaWNrZXItLWJ1dHRvbicsICQucHJveHkodGhpcy5fb25DbGlja05hdkJ1dHRvbiwgdGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9idWlsZEJhc2VIdG1sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYWRkQnV0dG9uc0lmTmVlZCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9hZGRCdXR0b25zSWZOZWVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRvZGF5QnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQnV0dG9uKCd0b2RheScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsZWFyQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQnV0dG9uKCdjbGVhcicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5fZ2V0VGl0bGUodGhpcy5kLmN1cnJlbnREYXRlKSxcbiAgICAgICAgICAgICAgICBodG1sID0gZHAudGVtcGxhdGUodGVtcGxhdGUsICQuZXh0ZW5kKHt0aXRsZTogdGl0bGV9LCB0aGlzLm9wdHMpKTtcbiAgICAgICAgICAgIHRoaXMuZC4kbmF2Lmh0bWwoaHRtbCk7XG4gICAgICAgICAgICBpZiAodGhpcy5kLnZpZXcgPT0gJ3llYXJzJykge1xuICAgICAgICAgICAgICAgICQoJy5kYXRlcGlja2VyLS1uYXYtdGl0bGUnLCB0aGlzLmQuJG5hdikuYWRkQ2xhc3MoJy1kaXNhYmxlZC0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0TmF2U3RhdHVzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFRpdGxlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZC5mb3JtYXREYXRlKHRoaXMub3B0cy5uYXZUaXRsZXNbdGhpcy5kLnZpZXddLCBkYXRlKVxuICAgICAgICB9LFxuXG4gICAgICAgIF9hZGRCdXR0b246IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuJGJ1dHRvbnNDb250YWluZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQnV0dG9uc0NvbnRhaW5lcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5kLmxvY1t0eXBlXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaHRtbCA9IGRwLnRlbXBsYXRlKGJ1dHRvbiwgZGF0YSk7XG5cbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1hY3Rpb249JyArIHR5cGUgKyAnXScsIHRoaXMuJGJ1dHRvbnNDb250YWluZXIpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQoaHRtbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FkZEJ1dHRvbnNDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZC4kZGF0ZXBpY2tlci5hcHBlbmQoYnV0dG9uc0NvbnRhaW5lclRlbXBsYXRlKTtcbiAgICAgICAgICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIgPSAkKCcuZGF0ZXBpY2tlci0tYnV0dG9ucycsIHRoaXMuZC4kZGF0ZXBpY2tlcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0TmF2U3RhdHVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLm9wdHMubWluRGF0ZSB8fCB0aGlzLm9wdHMubWF4RGF0ZSkgfHwgIXRoaXMub3B0cy5kaXNhYmxlTmF2V2hlbk91dE9mUmFuZ2UpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGRhdGUgPSB0aGlzLmQucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5tb250aCxcbiAgICAgICAgICAgICAgICB5ID0gZGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmRhdGU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5kLnZpZXcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZSh5LCBtLTEsIDEpLCAnbW9udGgnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdigncHJldicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZSh5LCBtKzEsIDEpLCAnbW9udGgnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdignbmV4dCcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZSh5LTEsIG0sIGQpLCAneWVhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlTmF2KCdwcmV2JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKHkrMSwgbSwgZCksICd5ZWFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ25leHQnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY2FkZSA9IGRwLmdldERlY2FkZSh0aGlzLmQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoZGVjYWRlWzBdIC0gMSwgMCwgMSksICd5ZWFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ3ByZXYnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoZGVjYWRlWzFdICsgMSwgMCwgMSksICd5ZWFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ25leHQnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9kaXNhYmxlTmF2OiBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgICAgICAkKCdbZGF0YS1hY3Rpb249XCInICsgbmF2ICsgJ1wiXScsIHRoaXMuZC4kbmF2KS5hZGRDbGFzcygnLWRpc2FibGVkLScpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FjdGl2YXRlTmF2OiBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgICAgICAkKCdbZGF0YS1hY3Rpb249XCInICsgbmF2ICsgJ1wiXScsIHRoaXMuZC4kbmF2KS5yZW1vdmVDbGFzcygnLWRpc2FibGVkLScpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQ2xpY2tOYXZCdXR0b246IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJGVsID0gJChlLnRhcmdldCkuY2xvc2VzdCgnW2RhdGEtYWN0aW9uXScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbiA9ICRlbC5kYXRhKCdhY3Rpb24nKTtcblxuICAgICAgICAgICAgdGhpcy5kW2FjdGlvbl0oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25DbGlja05hdlRpdGxlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKCctZGlzYWJsZWQtJykpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZC52aWV3ID09ICdkYXlzJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmQudmlldyA9ICdtb250aHMnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZC52aWV3ID0gJ3llYXJzJztcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcblxuOyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50XCI+JyArXG4gICAgICAgICcgICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1ob3Vyc1wiPiN7aG91clZpc2libGV9PC9zcGFuPicgK1xuICAgICAgICAnICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtY29sb25cIj46PC9zcGFuPicgK1xuICAgICAgICAnICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtbWludXRlc1wiPiN7bWluVmFsdWV9PC9zcGFuPicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1zbGlkZXJzXCI+JyArXG4gICAgICAgICcgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1yb3dcIj4nICtcbiAgICAgICAgJyAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBuYW1lPVwiaG91cnNcIiB2YWx1ZT1cIiN7aG91clZhbHVlfVwiIG1pbj1cIiN7aG91ck1pbn1cIiBtYXg9XCIje2hvdXJNYXh9XCIgc3RlcD1cIiN7aG91clN0ZXB9XCIvPicgK1xuICAgICAgICAnICAgPC9kaXY+JyArXG4gICAgICAgICcgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1yb3dcIj4nICtcbiAgICAgICAgJyAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBuYW1lPVwibWludXRlc1wiIHZhbHVlPVwiI3ttaW5WYWx1ZX1cIiBtaW49XCIje21pbk1pbn1cIiBtYXg9XCIje21pbk1heH1cIiBzdGVwPVwiI3ttaW5TdGVwfVwiLz4nICtcbiAgICAgICAgJyAgIDwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICBkYXRlcGlja2VyID0gJC5mbi5kYXRlcGlja2VyLFxuICAgICAgICBkcCA9IGRhdGVwaWNrZXIuQ29uc3RydWN0b3I7XG5cbiAgICBkYXRlcGlja2VyLlRpbWVwaWNrZXIgPSBmdW5jdGlvbiAoaW5zdCwgb3B0cykge1xuICAgICAgICB0aGlzLmQgPSBpbnN0O1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLlRpbWVwaWNrZXIucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAnaW5wdXQnO1xuICAgICAgICAgICAgdGhpcy5fc2V0VGltZSh0aGlzLmQuZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLl9idWlsZEhUTUwoKTtcblxuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3RyaWRlbnQvZ2kpKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSAnY2hhbmdlJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kLiRlbC5vbignc2VsZWN0RGF0ZScsIHRoaXMuX29uU2VsZWN0RGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJHJhbmdlcy5vbihpbnB1dCwgdGhpcy5fb25DaGFuZ2VSYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJHJhbmdlcy5vbignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcFJhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2VzLm9uKCdtb3VzZW1vdmUgZm9jdXMgJywgdGhpcy5fb25Nb3VzZUVudGVyUmFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRyYW5nZXMub24oJ21vdXNlb3V0IGJsdXInLCB0aGlzLl9vbk1vdXNlT3V0UmFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldFRpbWU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgX2RhdGUgPSBkcC5nZXRQYXJzZWREYXRlKGRhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEYXRlKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5ob3VycyA9IF9kYXRlLmhvdXJzIDwgdGhpcy5taW5Ib3VycyA/IHRoaXMubWluSG91cnMgOiBfZGF0ZS5ob3VycztcbiAgICAgICAgICAgIHRoaXMubWludXRlcyA9IF9kYXRlLm1pbnV0ZXMgPCB0aGlzLm1pbk1pbnV0ZXMgPyB0aGlzLm1pbk1pbnV0ZXMgOiBfZGF0ZS5taW51dGVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIG1pbkhvdXJzIGFuZCBtaW5NaW51dGVzIGZyb20gZGF0ZSAodXN1YWxseSBpdCdzIGEgbWluRGF0ZSlcbiAgICAgICAgICogQWxzbyBjaGFuZ2VzIG1pbk1pbnV0ZXMgaWYgY3VycmVudCBob3VycyBhcmUgYmlnZ2VyIHRoZW4gQGRhdGUgaG91cnNcbiAgICAgICAgICogQHBhcmFtIGRhdGUge0RhdGV9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfc2V0TWluVGltZUZyb21EYXRlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5taW5Ib3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgIHRoaXMubWluTWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuXG4gICAgICAgICAgICAvLyBJZiwgZm9yIGV4YW1wbGUsIG1pbiBob3VycyBhcmUgMTAsIGFuZCBjdXJyZW50IGhvdXJzIGFyZSAxMixcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBtaW5NaW51dGVzIHRvIGRlZmF1bHQgdmFsdWUsIHRvIGJlIGFibGUgdG8gY2hvb3NlIHdob2xlIHJhbmdlIG9mIHZhbHVlc1xuICAgICAgICAgICAgaWYgKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlLmdldEhvdXJzKCkgPiBkYXRlLmdldEhvdXJzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5NaW51dGVzID0gdGhpcy5vcHRzLm1pbk1pbnV0ZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9zZXRNYXhUaW1lRnJvbURhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1heEhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICAgICAgdGhpcy5tYXhNaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZS5nZXRIb3VycygpIDwgZGF0ZS5nZXRIb3VycygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF4TWludXRlcyA9IHRoaXMub3B0cy5tYXhNaW51dGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfc2V0RGVmYXVsdE1pbk1heFRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtYXhIb3VycyA9IDIzLFxuICAgICAgICAgICAgICAgIG1heE1pbnV0ZXMgPSA1OSxcbiAgICAgICAgICAgICAgICBvcHRzID0gdGhpcy5vcHRzO1xuXG4gICAgICAgICAgICB0aGlzLm1pbkhvdXJzID0gb3B0cy5taW5Ib3VycyA8IDAgfHwgb3B0cy5taW5Ib3VycyA+IG1heEhvdXJzID8gMCA6IG9wdHMubWluSG91cnM7XG4gICAgICAgICAgICB0aGlzLm1pbk1pbnV0ZXMgPSBvcHRzLm1pbk1pbnV0ZXMgPCAwIHx8IG9wdHMubWluTWludXRlcyA+IG1heE1pbnV0ZXMgPyAwIDogb3B0cy5taW5NaW51dGVzO1xuICAgICAgICAgICAgdGhpcy5tYXhIb3VycyA9IG9wdHMubWF4SG91cnMgPCAwIHx8IG9wdHMubWF4SG91cnMgPiBtYXhIb3VycyA/IG1heEhvdXJzIDogb3B0cy5tYXhIb3VycztcbiAgICAgICAgICAgIHRoaXMubWF4TWludXRlcyA9IG9wdHMubWF4TWludXRlcyA8IDAgfHwgb3B0cy5tYXhNaW51dGVzID4gbWF4TWludXRlcyA/IG1heE1pbnV0ZXMgOiBvcHRzLm1heE1pbnV0ZXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvb2tzIGZvciBtaW4vbWF4IGhvdXJzL21pbnV0ZXMgYW5kIGlmIGN1cnJlbnQgdmFsdWVzXG4gICAgICAgICAqIGFyZSBvdXQgb2YgcmFuZ2Ugc2V0cyB2YWxpZCB2YWx1ZXMuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfdmFsaWRhdGVIb3Vyc01pbnV0ZXM6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3VycyA8IHRoaXMubWluSG91cnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXJzID0gdGhpcy5taW5Ib3VycztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ob3VycyA+IHRoaXMubWF4SG91cnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXJzID0gdGhpcy5tYXhIb3VycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWludXRlcyA8IHRoaXMubWluTWludXRlcykge1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMubWluTWludXRlcztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5taW51dGVzID4gdGhpcy5tYXhNaW51dGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5tYXhNaW51dGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9idWlsZEhUTUw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBseiA9IGRwLmdldExlYWRpbmdaZXJvTnVtLFxuICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXJNaW46IHRoaXMubWluSG91cnMsXG4gICAgICAgICAgICAgICAgICAgIGhvdXJNYXg6IGx6KHRoaXMubWF4SG91cnMpLFxuICAgICAgICAgICAgICAgICAgICBob3VyU3RlcDogdGhpcy5vcHRzLmhvdXJzU3RlcCxcbiAgICAgICAgICAgICAgICAgICAgaG91clZhbHVlOiB0aGlzLmhvdXJzLFxuICAgICAgICAgICAgICAgICAgICBob3VyVmlzaWJsZTogbHoodGhpcy5kaXNwbGF5SG91cnMpLFxuICAgICAgICAgICAgICAgICAgICBtaW5NaW46IHRoaXMubWluTWludXRlcyxcbiAgICAgICAgICAgICAgICAgICAgbWluTWF4OiBseih0aGlzLm1heE1pbnV0ZXMpLFxuICAgICAgICAgICAgICAgICAgICBtaW5TdGVwOiB0aGlzLm9wdHMubWludXRlc1N0ZXAsXG4gICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiBseih0aGlzLm1pbnV0ZXMpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfdGVtcGxhdGUgPSBkcC50ZW1wbGF0ZSh0ZW1wbGF0ZSwgZGF0YSk7XG5cbiAgICAgICAgICAgIHRoaXMuJHRpbWVwaWNrZXIgPSAkKF90ZW1wbGF0ZSkuYXBwZW5kVG8odGhpcy5kLiRkYXRlcGlja2VyKTtcbiAgICAgICAgICAgIHRoaXMuJHJhbmdlcyA9ICQoJ1t0eXBlPVwicmFuZ2VcIl0nLCB0aGlzLiR0aW1lcGlja2VyKTtcbiAgICAgICAgICAgIHRoaXMuJGhvdXJzID0gJCgnW25hbWU9XCJob3Vyc1wiXScsIHRoaXMuJHRpbWVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kbWludXRlcyA9ICQoJ1tuYW1lPVwibWludXRlc1wiXScsIHRoaXMuJHRpbWVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kaG91cnNUZXh0ID0gJCgnLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1ob3VycycsIHRoaXMuJHRpbWVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kbWludXRlc1RleHQgPSAkKCcuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LW1pbnV0ZXMnLCB0aGlzLiR0aW1lcGlja2VyKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZC5hbXBtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYW1wbSA9ICQoJzxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWFtcG1cIj4nKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJCgnLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudCcsIHRoaXMuJHRpbWVwaWNrZXIpKVxuICAgICAgICAgICAgICAgICAgICAuaHRtbCh0aGlzLmRheVBlcmlvZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lcGlja2VyLmFkZENsYXNzKCctYW0tcG0tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3VwZGF0ZUN1cnJlbnRUaW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaCA9ICBkcC5nZXRMZWFkaW5nWmVyb051bSh0aGlzLmRpc3BsYXlIb3VycyksXG4gICAgICAgICAgICAgICAgbSA9IGRwLmdldExlYWRpbmdaZXJvTnVtKHRoaXMubWludXRlcyk7XG5cbiAgICAgICAgICAgIHRoaXMuJGhvdXJzVGV4dC5odG1sKGgpO1xuICAgICAgICAgICAgdGhpcy4kbWludXRlc1RleHQuaHRtbChtKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZC5hbXBtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYW1wbS5odG1sKHRoaXMuZGF5UGVyaW9kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdXBkYXRlUmFuZ2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRob3Vycy5hdHRyKHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluSG91cnMsXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heEhvdXJzXG4gICAgICAgICAgICB9KS52YWwodGhpcy5ob3Vycyk7XG5cbiAgICAgICAgICAgIHRoaXMuJG1pbnV0ZXMuYXR0cih7XG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pbk1pbnV0ZXMsXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heE1pbnV0ZXNcbiAgICAgICAgICAgIH0pLnZhbCh0aGlzLm1pbnV0ZXMpXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgbWluSG91cnMsIG1pbk1pbnV0ZXMgZXRjLiBmcm9tIGRhdGUuIElmIGRhdGUgaXMgbm90IHBhc3NlZCwgdGhhbiBzZXRzXG4gICAgICAgICAqIHZhbHVlcyBmcm9tIG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIFtkYXRlXSB7b2JqZWN0fSAtIERhdGUgb2JqZWN0LCB0byBnZXQgdmFsdWVzIGZyb21cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9oYW5kbGVEYXRlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0RGVmYXVsdE1pbk1heFRpbWUoKTtcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRwLmlzU2FtZShkYXRlLCB0aGlzLmQub3B0cy5taW5EYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRNaW5UaW1lRnJvbURhdGUodGhpcy5kLm9wdHMubWluRGF0ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkcC5pc1NhbWUoZGF0ZSwgdGhpcy5kLm9wdHMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0TWF4VGltZUZyb21EYXRlKHRoaXMuZC5vcHRzLm1heERhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVIb3Vyc01pbnV0ZXMoZGF0ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVSYW5nZXMoKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUN1cnJlbnRUaW1lKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbGN1bGF0ZXMgdmFsaWQgaG91ciB2YWx1ZSB0byBkaXNwbGF5IGluIHRleHQgaW5wdXQgYW5kIGRhdGVwaWNrZXIncyBib2R5LlxuICAgICAgICAgKiBAcGFyYW0gZGF0ZSB7RGF0ZXxOdW1iZXJ9IC0gZGF0ZSBvciBob3Vyc1xuICAgICAgICAgKiBAcGFyYW0gW2FtcG1dIHtCb29sZWFufSAtIDEyIGhvdXJzIG1vZGVcbiAgICAgICAgICogQHJldHVybnMge3tob3VyczogKiwgZGF5UGVyaW9kOiBzdHJpbmd9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2dldFZhbGlkSG91cnNGcm9tRGF0ZTogZnVuY3Rpb24gKGRhdGUsIGFtcG0pIHtcbiAgICAgICAgICAgIHZhciBkID0gZGF0ZSxcbiAgICAgICAgICAgICAgICBob3VycyA9IGRhdGU7XG5cbiAgICAgICAgICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIGQgPSBkcC5nZXRQYXJzZWREYXRlKGRhdGUpO1xuICAgICAgICAgICAgICAgIGhvdXJzID0gZC5ob3VycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9hbXBtID0gYW1wbSB8fCB0aGlzLmQuYW1wbSxcbiAgICAgICAgICAgICAgICBkYXlQZXJpb2QgPSAnYW0nO1xuXG4gICAgICAgICAgICBpZiAoX2FtcG0pIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2godHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGhvdXJzID09IDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBob3VycyA9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgaG91cnMgPT0gMTI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlQZXJpb2QgPSAncG0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgaG91cnMgPiAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9ICdwbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBob3VyczogaG91cnMsXG4gICAgICAgICAgICAgICAgZGF5UGVyaW9kOiBkYXlQZXJpb2RcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgaG91cnMgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5faG91cnMgPSB2YWw7XG5cbiAgICAgICAgICAgIHZhciBkaXNwbGF5SG91cnMgPSB0aGlzLl9nZXRWYWxpZEhvdXJzRnJvbURhdGUodmFsKTtcblxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SG91cnMgPSBkaXNwbGF5SG91cnMuaG91cnM7XG4gICAgICAgICAgICB0aGlzLmRheVBlcmlvZCA9IGRpc3BsYXlIb3Vycy5kYXlQZXJpb2Q7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGhvdXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hvdXJzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vICBFdmVudHNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIF9vbkNoYW5nZVJhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGUudGFyZ2V0KSxcbiAgICAgICAgICAgICAgICBuYW1lID0gJHRhcmdldC5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZC50aW1lcGlja2VySXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzW25hbWVdID0gJHRhcmdldC52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUN1cnJlbnRUaW1lKCk7XG4gICAgICAgICAgICB0aGlzLmQuX3RyaWdnZXIoJ3RpbWVDaGFuZ2UnLCBbdGhpcy5ob3VycywgdGhpcy5taW51dGVzXSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZURhdGUodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vblNlbGVjdERhdGU6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEYXRlKGRhdGEpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZUVudGVyUmFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICQoZS50YXJnZXQpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICQoJy5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtJyArIG5hbWUsIHRoaXMuJHRpbWVwaWNrZXIpLmFkZENsYXNzKCctZm9jdXMtJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VPdXRSYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJChlLnRhcmdldCkuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZC5pbkZvY3VzKSByZXR1cm47IC8vIFByZXZlbnQgcmVtb3ZpbmcgZm9jdXMgd2hlbiBtb3VzZSBvdXQgb2YgcmFuZ2Ugc2xpZGVyXG4gICAgICAgICAgICAkKCcuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LScgKyBuYW1lLCB0aGlzLiR0aW1lcGlja2VyKS5yZW1vdmVDbGFzcygnLWZvY3VzLScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlVXBSYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZC50aW1lcGlja2VySXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuIH0pKHdpbmRvdywgalF1ZXJ5KTsiLCIhZnVuY3Rpb24odCxlLGkpeyFmdW5jdGlvbigpe3ZhciBzLGEsbixoPVwiMi4yLjNcIixvPVwiZGF0ZXBpY2tlclwiLHI9XCIuZGF0ZXBpY2tlci1oZXJlXCIsYz0hMSxkPSc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlclwiPjxpIGNsYXNzPVwiZGF0ZXBpY2tlci0tcG9pbnRlclwiPjwvaT48bmF2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2XCI+PC9uYXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nLGw9e2NsYXNzZXM6XCJcIixpbmxpbmU6ITEsbGFuZ3VhZ2U6XCJydVwiLHN0YXJ0RGF0ZTpuZXcgRGF0ZSxmaXJzdERheTpcIlwiLHdlZWtlbmRzOls2LDBdLGRhdGVGb3JtYXQ6XCJcIixhbHRGaWVsZDpcIlwiLGFsdEZpZWxkRGF0ZUZvcm1hdDpcIkBcIix0b2dnbGVTZWxlY3RlZDohMCxrZXlib2FyZE5hdjohMCxwb3NpdGlvbjpcImJvdHRvbSBsZWZ0XCIsb2Zmc2V0OjEyLHZpZXc6XCJkYXlzXCIsbWluVmlldzpcImRheXNcIixzaG93T3RoZXJNb250aHM6ITAsc2VsZWN0T3RoZXJNb250aHM6ITAsbW92ZVRvT3RoZXJNb250aHNPblNlbGVjdDohMCxzaG93T3RoZXJZZWFyczohMCxzZWxlY3RPdGhlclllYXJzOiEwLG1vdmVUb090aGVyWWVhcnNPblNlbGVjdDohMCxtaW5EYXRlOlwiXCIsbWF4RGF0ZTpcIlwiLGRpc2FibGVOYXZXaGVuT3V0T2ZSYW5nZTohMCxtdWx0aXBsZURhdGVzOiExLG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6XCIsXCIscmFuZ2U6ITEsdG9kYXlCdXR0b246ITEsY2xlYXJCdXR0b246ITEsc2hvd0V2ZW50OlwiZm9jdXNcIixhdXRvQ2xvc2U6ITEsbW9udGhzRmllbGQ6XCJtb250aHNTaG9ydFwiLHByZXZIdG1sOic8c3ZnIGNsYXNzPVwic3ZnLWJhY2tcIj48L3N2Zz4nLG5leHRIdG1sOic8c3ZnIGNsYXNzPVwic3ZnLW5leHRcIj48L3N2Zz4nLG5hdlRpdGxlczp7ZGF5czpcIk1NIDxpPnl5eXk8L2k+XCIsbW9udGhzOlwieXl5eVwiLHllYXJzOlwieXl5eTEgLSB5eXl5MlwifSx0aW1lcGlja2VyOiExLG9ubHlUaW1lcGlja2VyOiExLGRhdGVUaW1lU2VwYXJhdG9yOlwiIFwiLHRpbWVGb3JtYXQ6XCJcIixtaW5Ib3VyczowLG1heEhvdXJzOjI0LG1pbk1pbnV0ZXM6MCxtYXhNaW51dGVzOjU5LGhvdXJzU3RlcDoxLG1pbnV0ZXNTdGVwOjEsb25TZWxlY3Q6XCJcIixvblNob3c6XCJcIixvbkhpZGU6XCJcIixvbkNoYW5nZU1vbnRoOlwiXCIsb25DaGFuZ2VZZWFyOlwiXCIsb25DaGFuZ2VEZWNhZGU6XCJcIixvbkNoYW5nZVZpZXc6XCJcIixvblJlbmRlckNlbGw6XCJcIn0sdT17Y3RybFJpZ2h0OlsxNywzOV0sY3RybFVwOlsxNywzOF0sY3RybExlZnQ6WzE3LDM3XSxjdHJsRG93bjpbMTcsNDBdLHNoaWZ0UmlnaHQ6WzE2LDM5XSxzaGlmdFVwOlsxNiwzOF0sc2hpZnRMZWZ0OlsxNiwzN10sc2hpZnREb3duOlsxNiw0MF0sYWx0VXA6WzE4LDM4XSxhbHRSaWdodDpbMTgsMzldLGFsdExlZnQ6WzE4LDM3XSxhbHREb3duOlsxOCw0MF0sY3RybFNoaWZ0VXA6WzE2LDE3LDM4XX0sbT1mdW5jdGlvbih0LGEpe3RoaXMuZWw9dCx0aGlzLiRlbD1lKHQpLHRoaXMub3B0cz1lLmV4dGVuZCghMCx7fSxsLGEsdGhpcy4kZWwuZGF0YSgpKSxzPT1pJiYocz1lKFwiYm9keVwiKSksdGhpcy5vcHRzLnN0YXJ0RGF0ZXx8KHRoaXMub3B0cy5zdGFydERhdGU9bmV3IERhdGUpLFwiSU5QVVRcIj09dGhpcy5lbC5ub2RlTmFtZSYmKHRoaXMuZWxJc0lucHV0PSEwKSx0aGlzLm9wdHMuYWx0RmllbGQmJih0aGlzLiRhbHRGaWVsZD1cInN0cmluZ1wiPT10eXBlb2YgdGhpcy5vcHRzLmFsdEZpZWxkP2UodGhpcy5vcHRzLmFsdEZpZWxkKTp0aGlzLm9wdHMuYWx0RmllbGQpLHRoaXMuaW5pdGVkPSExLHRoaXMudmlzaWJsZT0hMSx0aGlzLnNpbGVudD0hMSx0aGlzLmN1cnJlbnREYXRlPXRoaXMub3B0cy5zdGFydERhdGUsdGhpcy5jdXJyZW50Vmlldz10aGlzLm9wdHMudmlldyx0aGlzLl9jcmVhdGVTaG9ydEN1dHMoKSx0aGlzLnNlbGVjdGVkRGF0ZXM9W10sdGhpcy52aWV3cz17fSx0aGlzLmtleXM9W10sdGhpcy5taW5SYW5nZT1cIlwiLHRoaXMubWF4UmFuZ2U9XCJcIix0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZT1cIlwiLHRoaXMuaW5pdCgpfTtuPW0sbi5wcm90b3R5cGU9e1ZFUlNJT046aCx2aWV3SW5kZXhlczpbXCJkYXlzXCIsXCJtb250aHNcIixcInllYXJzXCJdLGluaXQ6ZnVuY3Rpb24oKXtjfHx0aGlzLm9wdHMuaW5saW5lfHwhdGhpcy5lbElzSW5wdXR8fHRoaXMuX2J1aWxkRGF0ZXBpY2tlcnNDb250YWluZXIoKSx0aGlzLl9idWlsZEJhc2VIdG1sKCksdGhpcy5fZGVmaW5lTG9jYWxlKHRoaXMub3B0cy5sYW5ndWFnZSksdGhpcy5fc3luY1dpdGhNaW5NYXhEYXRlcygpLHRoaXMuZWxJc0lucHV0JiYodGhpcy5vcHRzLmlubGluZXx8KHRoaXMuX3NldFBvc2l0aW9uQ2xhc3Nlcyh0aGlzLm9wdHMucG9zaXRpb24pLHRoaXMuX2JpbmRFdmVudHMoKSksdGhpcy5vcHRzLmtleWJvYXJkTmF2JiYhdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyJiZ0aGlzLl9iaW5kS2V5Ym9hcmRFdmVudHMoKSx0aGlzLiRkYXRlcGlja2VyLm9uKFwibW91c2Vkb3duXCIsdGhpcy5fb25Nb3VzZURvd25EYXRlcGlja2VyLmJpbmQodGhpcykpLHRoaXMuJGRhdGVwaWNrZXIub24oXCJtb3VzZXVwXCIsdGhpcy5fb25Nb3VzZVVwRGF0ZXBpY2tlci5iaW5kKHRoaXMpKSksdGhpcy5vcHRzLmNsYXNzZXMmJnRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3ModGhpcy5vcHRzLmNsYXNzZXMpLHRoaXMub3B0cy50aW1lcGlja2VyJiYodGhpcy50aW1lcGlja2VyPW5ldyBlLmZuLmRhdGVwaWNrZXIuVGltZXBpY2tlcih0aGlzLHRoaXMub3B0cyksdGhpcy5fYmluZFRpbWVwaWNrZXJFdmVudHMoKSksdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyJiZ0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKFwiLW9ubHktdGltZXBpY2tlci1cIiksdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XT1uZXcgZS5mbi5kYXRlcGlja2VyLkJvZHkodGhpcyx0aGlzLmN1cnJlbnRWaWV3LHRoaXMub3B0cyksdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5zaG93KCksdGhpcy5uYXY9bmV3IGUuZm4uZGF0ZXBpY2tlci5OYXZpZ2F0aW9uKHRoaXMsdGhpcy5vcHRzKSx0aGlzLnZpZXc9dGhpcy5jdXJyZW50Vmlldyx0aGlzLiRlbC5vbihcImNsaWNrQ2VsbC5hZHBcIix0aGlzLl9vbkNsaWNrQ2VsbC5iaW5kKHRoaXMpKSx0aGlzLiRkYXRlcGlja2VyLm9uKFwibW91c2VlbnRlclwiLFwiLmRhdGVwaWNrZXItLWNlbGxcIix0aGlzLl9vbk1vdXNlRW50ZXJDZWxsLmJpbmQodGhpcykpLHRoaXMuJGRhdGVwaWNrZXIub24oXCJtb3VzZWxlYXZlXCIsXCIuZGF0ZXBpY2tlci0tY2VsbFwiLHRoaXMuX29uTW91c2VMZWF2ZUNlbGwuYmluZCh0aGlzKSksdGhpcy5pbml0ZWQ9ITB9LF9jcmVhdGVTaG9ydEN1dHM6ZnVuY3Rpb24oKXt0aGlzLm1pbkRhdGU9dGhpcy5vcHRzLm1pbkRhdGU/dGhpcy5vcHRzLm1pbkRhdGU6bmV3IERhdGUoLTg2Mzk5OTk5MTM2ZTUpLHRoaXMubWF4RGF0ZT10aGlzLm9wdHMubWF4RGF0ZT90aGlzLm9wdHMubWF4RGF0ZTpuZXcgRGF0ZSg4NjM5OTk5OTEzNmU1KX0sX2JpbmRFdmVudHM6ZnVuY3Rpb24oKXt0aGlzLiRlbC5vbih0aGlzLm9wdHMuc2hvd0V2ZW50K1wiLmFkcFwiLHRoaXMuX29uU2hvd0V2ZW50LmJpbmQodGhpcykpLHRoaXMuJGVsLm9uKFwibW91c2V1cC5hZHBcIix0aGlzLl9vbk1vdXNlVXBFbC5iaW5kKHRoaXMpKSx0aGlzLiRlbC5vbihcImJsdXIuYWRwXCIsdGhpcy5fb25CbHVyLmJpbmQodGhpcykpLHRoaXMuJGVsLm9uKFwia2V5dXAuYWRwXCIsdGhpcy5fb25LZXlVcEdlbmVyYWwuYmluZCh0aGlzKSksZSh0KS5vbihcInJlc2l6ZS5hZHBcIix0aGlzLl9vblJlc2l6ZS5iaW5kKHRoaXMpKSxlKFwiYm9keVwiKS5vbihcIm1vdXNldXAuYWRwXCIsdGhpcy5fb25Nb3VzZVVwQm9keS5iaW5kKHRoaXMpKX0sX2JpbmRLZXlib2FyZEV2ZW50czpmdW5jdGlvbigpe3RoaXMuJGVsLm9uKFwia2V5ZG93bi5hZHBcIix0aGlzLl9vbktleURvd24uYmluZCh0aGlzKSksdGhpcy4kZWwub24oXCJrZXl1cC5hZHBcIix0aGlzLl9vbktleVVwLmJpbmQodGhpcykpLHRoaXMuJGVsLm9uKFwiaG90S2V5LmFkcFwiLHRoaXMuX29uSG90S2V5LmJpbmQodGhpcykpfSxfYmluZFRpbWVwaWNrZXJFdmVudHM6ZnVuY3Rpb24oKXt0aGlzLiRlbC5vbihcInRpbWVDaGFuZ2UuYWRwXCIsdGhpcy5fb25UaW1lQ2hhbmdlLmJpbmQodGhpcykpfSxpc1dlZWtlbmQ6ZnVuY3Rpb24odCl7cmV0dXJuLTEhPT10aGlzLm9wdHMud2Vla2VuZHMuaW5kZXhPZih0KX0sX2RlZmluZUxvY2FsZTpmdW5jdGlvbih0KXtcInN0cmluZ1wiPT10eXBlb2YgdD8odGhpcy5sb2M9ZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlW3RdLHRoaXMubG9jfHwoY29uc29sZS53YXJuKFwiQ2FuJ3QgZmluZCBsYW5ndWFnZSBcXFwiXCIrdCsnXCIgaW4gRGF0ZXBpY2tlci5sYW5ndWFnZSwgd2lsbCB1c2UgXCJydVwiIGluc3RlYWQnKSx0aGlzLmxvYz1lLmV4dGVuZCghMCx7fSxlLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUpKSx0aGlzLmxvYz1lLmV4dGVuZCghMCx7fSxlLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUsZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlW3RdKSk6dGhpcy5sb2M9ZS5leHRlbmQoITAse30sZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlLnJ1LHQpLHRoaXMub3B0cy5kYXRlRm9ybWF0JiYodGhpcy5sb2MuZGF0ZUZvcm1hdD10aGlzLm9wdHMuZGF0ZUZvcm1hdCksdGhpcy5vcHRzLnRpbWVGb3JtYXQmJih0aGlzLmxvYy50aW1lRm9ybWF0PXRoaXMub3B0cy50aW1lRm9ybWF0KSxcIlwiIT09dGhpcy5vcHRzLmZpcnN0RGF5JiYodGhpcy5sb2MuZmlyc3REYXk9dGhpcy5vcHRzLmZpcnN0RGF5KSx0aGlzLm9wdHMudGltZXBpY2tlciYmKHRoaXMubG9jLmRhdGVGb3JtYXQ9W3RoaXMubG9jLmRhdGVGb3JtYXQsdGhpcy5sb2MudGltZUZvcm1hdF0uam9pbih0aGlzLm9wdHMuZGF0ZVRpbWVTZXBhcmF0b3IpKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXImJih0aGlzLmxvYy5kYXRlRm9ybWF0PXRoaXMubG9jLnRpbWVGb3JtYXQpO3ZhciBpPXRoaXMuX2dldFdvcmRCb3VuZGFyeVJlZ0V4cDsodGhpcy5sb2MudGltZUZvcm1hdC5tYXRjaChpKFwiYWFcIikpfHx0aGlzLmxvYy50aW1lRm9ybWF0Lm1hdGNoKGkoXCJBQVwiKSkpJiYodGhpcy5hbXBtPSEwKX0sX2J1aWxkRGF0ZXBpY2tlcnNDb250YWluZXI6ZnVuY3Rpb24oKXtjPSEwLHMuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlcnMtY29udGFpbmVyXCIgaWQ9XCJkYXRlcGlja2Vycy1jb250YWluZXJcIj48L2Rpdj4nKSxhPWUoXCIjZGF0ZXBpY2tlcnMtY29udGFpbmVyXCIpfSxfYnVpbGRCYXNlSHRtbDpmdW5jdGlvbigpe3ZhciB0LGk9ZSgnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItaW5saW5lXCI+Jyk7dD1cIklOUFVUXCI9PXRoaXMuZWwubm9kZU5hbWU/dGhpcy5vcHRzLmlubGluZT9pLmluc2VydEFmdGVyKHRoaXMuJGVsKTphOmkuYXBwZW5kVG8odGhpcy4kZWwpLHRoaXMuJGRhdGVwaWNrZXI9ZShkKS5hcHBlbmRUbyh0KSx0aGlzLiRjb250ZW50PWUoXCIuZGF0ZXBpY2tlci0tY29udGVudFwiLHRoaXMuJGRhdGVwaWNrZXIpLHRoaXMuJG5hdj1lKFwiLmRhdGVwaWNrZXItLW5hdlwiLHRoaXMuJGRhdGVwaWNrZXIpfSxfdHJpZ2dlck9uQ2hhbmdlOmZ1bmN0aW9uKCl7aWYoIXRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgpe2lmKFwiXCI9PT10aGlzLl9wcmV2T25TZWxlY3RWYWx1ZSlyZXR1cm47cmV0dXJuIHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlPVwiXCIsdGhpcy5vcHRzLm9uU2VsZWN0KFwiXCIsXCJcIix0aGlzKX12YXIgdCxlPXRoaXMuc2VsZWN0ZWREYXRlcyxpPW4uZ2V0UGFyc2VkRGF0ZShlWzBdKSxzPXRoaXMsYT1uZXcgRGF0ZShpLnllYXIsaS5tb250aCxpLmRhdGUsaS5ob3VycyxpLm1pbnV0ZXMpO3Q9ZS5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIHMuZm9ybWF0RGF0ZShzLmxvYy5kYXRlRm9ybWF0LHQpfSkuam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvciksKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzfHx0aGlzLm9wdHMucmFuZ2UpJiYoYT1lLm1hcChmdW5jdGlvbih0KXt2YXIgZT1uLmdldFBhcnNlZERhdGUodCk7cmV0dXJuIG5ldyBEYXRlKGUueWVhcixlLm1vbnRoLGUuZGF0ZSxlLmhvdXJzLGUubWludXRlcyl9KSksdGhpcy5fcHJldk9uU2VsZWN0VmFsdWU9dCx0aGlzLm9wdHMub25TZWxlY3QodCxhLHRoaXMpfSxuZXh0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5wYXJzZWREYXRlLGU9dGhpcy5vcHRzO3N3aXRjaCh0aGlzLnZpZXcpe2Nhc2VcImRheXNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyLHQubW9udGgrMSwxKSxlLm9uQ2hhbmdlTW9udGgmJmUub25DaGFuZ2VNb250aCh0aGlzLnBhcnNlZERhdGUubW9udGgsdGhpcy5wYXJzZWREYXRlLnllYXIpO2JyZWFrO2Nhc2VcIm1vbnRoc1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXIrMSx0Lm1vbnRoLDEpLGUub25DaGFuZ2VZZWFyJiZlLm9uQ2hhbmdlWWVhcih0aGlzLnBhcnNlZERhdGUueWVhcik7YnJlYWs7Y2FzZVwieWVhcnNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyKzEwLDAsMSksZS5vbkNoYW5nZURlY2FkZSYmZS5vbkNoYW5nZURlY2FkZSh0aGlzLmN1ckRlY2FkZSl9fSxwcmV2OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5wYXJzZWREYXRlLGU9dGhpcy5vcHRzO3N3aXRjaCh0aGlzLnZpZXcpe2Nhc2VcImRheXNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyLHQubW9udGgtMSwxKSxlLm9uQ2hhbmdlTW9udGgmJmUub25DaGFuZ2VNb250aCh0aGlzLnBhcnNlZERhdGUubW9udGgsdGhpcy5wYXJzZWREYXRlLnllYXIpO2JyZWFrO2Nhc2VcIm1vbnRoc1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXItMSx0Lm1vbnRoLDEpLGUub25DaGFuZ2VZZWFyJiZlLm9uQ2hhbmdlWWVhcih0aGlzLnBhcnNlZERhdGUueWVhcik7YnJlYWs7Y2FzZVwieWVhcnNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyLTEwLDAsMSksZS5vbkNoYW5nZURlY2FkZSYmZS5vbkNoYW5nZURlY2FkZSh0aGlzLmN1ckRlY2FkZSl9fSxmb3JtYXREYXRlOmZ1bmN0aW9uKHQsZSl7ZT1lfHx0aGlzLmRhdGU7dmFyIGkscz10LGE9dGhpcy5fZ2V0V29yZEJvdW5kYXJ5UmVnRXhwLGg9dGhpcy5sb2Msbz1uLmdldExlYWRpbmdaZXJvTnVtLHI9bi5nZXREZWNhZGUoZSksYz1uLmdldFBhcnNlZERhdGUoZSksZD1jLmZ1bGxIb3VycyxsPWMuaG91cnMsdT10Lm1hdGNoKGEoXCJhYVwiKSl8fHQubWF0Y2goYShcIkFBXCIpKSxtPVwiYW1cIixwPXRoaXMuX3JlcGxhY2VyO3N3aXRjaCh0aGlzLm9wdHMudGltZXBpY2tlciYmdGhpcy50aW1lcGlja2VyJiZ1JiYoaT10aGlzLnRpbWVwaWNrZXIuX2dldFZhbGlkSG91cnNGcm9tRGF0ZShlLHUpLGQ9byhpLmhvdXJzKSxsPWkuaG91cnMsbT1pLmRheVBlcmlvZCksITApe2Nhc2UvQC8udGVzdChzKTpzPXMucmVwbGFjZSgvQC8sZS5nZXRUaW1lKCkpO2Nhc2UvYWEvLnRlc3Qocyk6cz1wKHMsYShcImFhXCIpLG0pO2Nhc2UvQUEvLnRlc3Qocyk6cz1wKHMsYShcIkFBXCIpLG0udG9VcHBlckNhc2UoKSk7Y2FzZS9kZC8udGVzdChzKTpzPXAocyxhKFwiZGRcIiksYy5mdWxsRGF0ZSk7Y2FzZS9kLy50ZXN0KHMpOnM9cChzLGEoXCJkXCIpLGMuZGF0ZSk7Y2FzZS9ERC8udGVzdChzKTpzPXAocyxhKFwiRERcIiksaC5kYXlzW2MuZGF5XSk7Y2FzZS9ELy50ZXN0KHMpOnM9cChzLGEoXCJEXCIpLGguZGF5c1Nob3J0W2MuZGF5XSk7Y2FzZS9tbS8udGVzdChzKTpzPXAocyxhKFwibW1cIiksYy5mdWxsTW9udGgpO2Nhc2UvbS8udGVzdChzKTpzPXAocyxhKFwibVwiKSxjLm1vbnRoKzEpO2Nhc2UvTU0vLnRlc3Qocyk6cz1wKHMsYShcIk1NXCIpLHRoaXMubG9jLm1vbnRoc1tjLm1vbnRoXSk7Y2FzZS9NLy50ZXN0KHMpOnM9cChzLGEoXCJNXCIpLGgubW9udGhzU2hvcnRbYy5tb250aF0pO2Nhc2UvaWkvLnRlc3Qocyk6cz1wKHMsYShcImlpXCIpLGMuZnVsbE1pbnV0ZXMpO2Nhc2UvaS8udGVzdChzKTpzPXAocyxhKFwiaVwiKSxjLm1pbnV0ZXMpO2Nhc2UvaGgvLnRlc3Qocyk6cz1wKHMsYShcImhoXCIpLGQpO2Nhc2UvaC8udGVzdChzKTpzPXAocyxhKFwiaFwiKSxsKTtjYXNlL3l5eXkvLnRlc3Qocyk6cz1wKHMsYShcInl5eXlcIiksYy55ZWFyKTtjYXNlL3l5eXkxLy50ZXN0KHMpOnM9cChzLGEoXCJ5eXl5MVwiKSxyWzBdKTtjYXNlL3l5eXkyLy50ZXN0KHMpOnM9cChzLGEoXCJ5eXl5MlwiKSxyWzFdKTtjYXNlL3l5Ly50ZXN0KHMpOnM9cChzLGEoXCJ5eVwiKSxjLnllYXIudG9TdHJpbmcoKS5zbGljZSgtMikpfXJldHVybiBzfSxfcmVwbGFjZXI6ZnVuY3Rpb24odCxlLGkpe3JldHVybiB0LnJlcGxhY2UoZSxmdW5jdGlvbih0LGUscyxhKXtyZXR1cm4gZStpK2F9KX0sX2dldFdvcmRCb3VuZGFyeVJlZ0V4cDpmdW5jdGlvbih0KXt2YXIgZT1cIlxcXFxzfFxcXFwufC18L3xcXFxcXFxcXHwsfFxcXFwkfFxcXFwhfFxcXFw/fDp8O1wiO3JldHVybiBuZXcgUmVnRXhwKFwiKF58PnxcIitlK1wiKShcIit0K1wiKSgkfDx8XCIrZStcIilcIixcImdcIil9LHNlbGVjdERhdGU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcyxpPWUub3B0cyxzPWUucGFyc2VkRGF0ZSxhPWUuc2VsZWN0ZWREYXRlcyxoPWEubGVuZ3RoLG89XCJcIjtpZihBcnJheS5pc0FycmF5KHQpKXJldHVybiB2b2lkIHQuZm9yRWFjaChmdW5jdGlvbih0KXtlLnNlbGVjdERhdGUodCl9KTtpZih0IGluc3RhbmNlb2YgRGF0ZSl7aWYodGhpcy5sYXN0U2VsZWN0ZWREYXRlPXQsdGhpcy50aW1lcGlja2VyJiZ0aGlzLnRpbWVwaWNrZXIuX3NldFRpbWUodCksZS5fdHJpZ2dlcihcInNlbGVjdERhdGVcIix0KSx0aGlzLnRpbWVwaWNrZXImJih0LnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3VycyksdC5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKSksXCJkYXlzXCI9PWUudmlldyYmdC5nZXRNb250aCgpIT1zLm1vbnRoJiZpLm1vdmVUb090aGVyTW9udGhzT25TZWxlY3QmJihvPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkpLFwieWVhcnNcIj09ZS52aWV3JiZ0LmdldEZ1bGxZZWFyKCkhPXMueWVhciYmaS5tb3ZlVG9PdGhlclllYXJzT25TZWxlY3QmJihvPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSwwLDEpKSxvJiYoZS5zaWxlbnQ9ITAsZS5kYXRlPW8sZS5zaWxlbnQ9ITEsZS5uYXYuX3JlbmRlcigpKSxpLm11bHRpcGxlRGF0ZXMmJiFpLnJhbmdlKXtpZihoPT09aS5tdWx0aXBsZURhdGVzKXJldHVybjtlLl9pc1NlbGVjdGVkKHQpfHxlLnNlbGVjdGVkRGF0ZXMucHVzaCh0KX1lbHNlIGkucmFuZ2U/Mj09aD8oZS5zZWxlY3RlZERhdGVzPVt0XSxlLm1pblJhbmdlPXQsZS5tYXhSYW5nZT1cIlwiKToxPT1oPyhlLnNlbGVjdGVkRGF0ZXMucHVzaCh0KSxlLm1heFJhbmdlP2UubWluUmFuZ2U9dDplLm1heFJhbmdlPXQsbi5iaWdnZXIoZS5tYXhSYW5nZSxlLm1pblJhbmdlKSYmKGUubWF4UmFuZ2U9ZS5taW5SYW5nZSxlLm1pblJhbmdlPXQpLGUuc2VsZWN0ZWREYXRlcz1bZS5taW5SYW5nZSxlLm1heFJhbmdlXSk6KGUuc2VsZWN0ZWREYXRlcz1bdF0sZS5taW5SYW5nZT10KTplLnNlbGVjdGVkRGF0ZXM9W3RdO2UuX3NldElucHV0VmFsdWUoKSxpLm9uU2VsZWN0JiZlLl90cmlnZ2VyT25DaGFuZ2UoKSxpLmF1dG9DbG9zZSYmIXRoaXMudGltZXBpY2tlcklzQWN0aXZlJiYoaS5tdWx0aXBsZURhdGVzfHxpLnJhbmdlP2kucmFuZ2UmJjI9PWUuc2VsZWN0ZWREYXRlcy5sZW5ndGgmJmUuaGlkZSgpOmUuaGlkZSgpKSxlLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKX19LHJlbW92ZURhdGU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5zZWxlY3RlZERhdGVzLGk9dGhpcztpZih0IGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gZS5zb21lKGZ1bmN0aW9uKHMsYSl7cmV0dXJuIG4uaXNTYW1lKHMsdCk/KGUuc3BsaWNlKGEsMSksaS5zZWxlY3RlZERhdGVzLmxlbmd0aD9pLmxhc3RTZWxlY3RlZERhdGU9aS5zZWxlY3RlZERhdGVzW2kuc2VsZWN0ZWREYXRlcy5sZW5ndGgtMV06KGkubWluUmFuZ2U9XCJcIixpLm1heFJhbmdlPVwiXCIsaS5sYXN0U2VsZWN0ZWREYXRlPVwiXCIpLGkudmlld3NbaS5jdXJyZW50Vmlld10uX3JlbmRlcigpLGkuX3NldElucHV0VmFsdWUoKSxpLm9wdHMub25TZWxlY3QmJmkuX3RyaWdnZXJPbkNoYW5nZSgpLCEwKTp2b2lkIDB9KX0sdG9kYXk6ZnVuY3Rpb24oKXt0aGlzLnNpbGVudD0hMCx0aGlzLnZpZXc9dGhpcy5vcHRzLm1pblZpZXcsdGhpcy5zaWxlbnQ9ITEsdGhpcy5kYXRlPW5ldyBEYXRlLHRoaXMub3B0cy50b2RheUJ1dHRvbiBpbnN0YW5jZW9mIERhdGUmJnRoaXMuc2VsZWN0RGF0ZSh0aGlzLm9wdHMudG9kYXlCdXR0b24pfSxjbGVhcjpmdW5jdGlvbigpe3RoaXMuc2VsZWN0ZWREYXRlcz1bXSx0aGlzLm1pblJhbmdlPVwiXCIsdGhpcy5tYXhSYW5nZT1cIlwiLHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpLHRoaXMuX3NldElucHV0VmFsdWUoKSx0aGlzLm9wdHMub25TZWxlY3QmJnRoaXMuX3RyaWdnZXJPbkNoYW5nZSgpfSx1cGRhdGU6ZnVuY3Rpb24odCxpKXt2YXIgcz1hcmd1bWVudHMubGVuZ3RoLGE9dGhpcy5sYXN0U2VsZWN0ZWREYXRlO3JldHVybiAyPT1zP3RoaXMub3B0c1t0XT1pOjE9PXMmJlwib2JqZWN0XCI9PXR5cGVvZiB0JiYodGhpcy5vcHRzPWUuZXh0ZW5kKCEwLHRoaXMub3B0cyx0KSksdGhpcy5fY3JlYXRlU2hvcnRDdXRzKCksdGhpcy5fc3luY1dpdGhNaW5NYXhEYXRlcygpLHRoaXMuX2RlZmluZUxvY2FsZSh0aGlzLm9wdHMubGFuZ3VhZ2UpLHRoaXMubmF2Ll9hZGRCdXR0b25zSWZOZWVkKCksdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyfHx0aGlzLm5hdi5fcmVuZGVyKCksdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCksdGhpcy5lbElzSW5wdXQmJiF0aGlzLm9wdHMuaW5saW5lJiYodGhpcy5fc2V0UG9zaXRpb25DbGFzc2VzKHRoaXMub3B0cy5wb3NpdGlvbiksdGhpcy52aXNpYmxlJiZ0aGlzLnNldFBvc2l0aW9uKHRoaXMub3B0cy5wb3NpdGlvbikpLHRoaXMub3B0cy5jbGFzc2VzJiZ0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKHRoaXMub3B0cy5jbGFzc2VzKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXImJnRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoXCItb25seS10aW1lcGlja2VyLVwiKSx0aGlzLm9wdHMudGltZXBpY2tlciYmKGEmJnRoaXMudGltZXBpY2tlci5faGFuZGxlRGF0ZShhKSx0aGlzLnRpbWVwaWNrZXIuX3VwZGF0ZVJhbmdlcygpLHRoaXMudGltZXBpY2tlci5fdXBkYXRlQ3VycmVudFRpbWUoKSxhJiYoYS5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpLGEuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcykpKSx0aGlzLl9zZXRJbnB1dFZhbHVlKCksdGhpc30sX3N5bmNXaXRoTWluTWF4RGF0ZXM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmRhdGUuZ2V0VGltZSgpO3RoaXMuc2lsZW50PSEwLHRoaXMubWluVGltZT50JiYodGhpcy5kYXRlPXRoaXMubWluRGF0ZSksdGhpcy5tYXhUaW1lPHQmJih0aGlzLmRhdGU9dGhpcy5tYXhEYXRlKSx0aGlzLnNpbGVudD0hMX0sX2lzU2VsZWN0ZWQ6ZnVuY3Rpb24odCxlKXt2YXIgaT0hMTtyZXR1cm4gdGhpcy5zZWxlY3RlZERhdGVzLnNvbWUoZnVuY3Rpb24ocyl7cmV0dXJuIG4uaXNTYW1lKHMsdCxlKT8oaT1zLCEwKTp2b2lkIDB9KSxpfSxfc2V0SW5wdXRWYWx1ZTpmdW5jdGlvbigpe3ZhciB0LGU9dGhpcyxpPWUub3B0cyxzPWUubG9jLmRhdGVGb3JtYXQsYT1pLmFsdEZpZWxkRGF0ZUZvcm1hdCxuPWUuc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIGUuZm9ybWF0RGF0ZShzLHQpfSk7aS5hbHRGaWVsZCYmZS4kYWx0RmllbGQubGVuZ3RoJiYodD10aGlzLnNlbGVjdGVkRGF0ZXMubWFwKGZ1bmN0aW9uKHQpe3JldHVybiBlLmZvcm1hdERhdGUoYSx0KX0pLHQ9dC5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKSx0aGlzLiRhbHRGaWVsZC52YWwodCkpLG49bi5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKSx0aGlzLiRlbC52YWwobil9LF9pc0luUmFuZ2U6ZnVuY3Rpb24odCxlKXt2YXIgaT10LmdldFRpbWUoKSxzPW4uZ2V0UGFyc2VkRGF0ZSh0KSxhPW4uZ2V0UGFyc2VkRGF0ZSh0aGlzLm1pbkRhdGUpLGg9bi5nZXRQYXJzZWREYXRlKHRoaXMubWF4RGF0ZSksbz1uZXcgRGF0ZShzLnllYXIscy5tb250aCxhLmRhdGUpLmdldFRpbWUoKSxyPW5ldyBEYXRlKHMueWVhcixzLm1vbnRoLGguZGF0ZSkuZ2V0VGltZSgpLGM9e2RheTppPj10aGlzLm1pblRpbWUmJmk8PXRoaXMubWF4VGltZSxtb250aDpvPj10aGlzLm1pblRpbWUmJnI8PXRoaXMubWF4VGltZSx5ZWFyOnMueWVhcj49YS55ZWFyJiZzLnllYXI8PWgueWVhcn07cmV0dXJuIGU/Y1tlXTpjLmRheX0sX2dldERpbWVuc2lvbnM6ZnVuY3Rpb24odCl7dmFyIGU9dC5vZmZzZXQoKTtyZXR1cm57d2lkdGg6dC5vdXRlcldpZHRoKCksaGVpZ2h0OnQub3V0ZXJIZWlnaHQoKSxsZWZ0OmUubGVmdCx0b3A6ZS50b3B9fSxfZ2V0RGF0ZUZyb21DZWxsOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMucGFyc2VkRGF0ZSxzPXQuZGF0YShcInllYXJcIil8fGUueWVhcixhPXQuZGF0YShcIm1vbnRoXCIpPT1pP2UubW9udGg6dC5kYXRhKFwibW9udGhcIiksbj10LmRhdGEoXCJkYXRlXCIpfHwxO3JldHVybiBuZXcgRGF0ZShzLGEsbil9LF9zZXRQb3NpdGlvbkNsYXNzZXM6ZnVuY3Rpb24odCl7dD10LnNwbGl0KFwiIFwiKTt2YXIgZT10WzBdLGk9dFsxXSxzPVwiZGF0ZXBpY2tlciAtXCIrZStcIi1cIitpK1wiLSAtZnJvbS1cIitlK1wiLVwiO3RoaXMudmlzaWJsZSYmKHMrPVwiIGFjdGl2ZVwiKSx0aGlzLiRkYXRlcGlja2VyLnJlbW92ZUF0dHIoXCJjbGFzc1wiKS5hZGRDbGFzcyhzKX0sc2V0UG9zaXRpb246ZnVuY3Rpb24odCl7dD10fHx0aGlzLm9wdHMucG9zaXRpb247dmFyIGUsaSxzPXRoaXMuX2dldERpbWVuc2lvbnModGhpcy4kZWwpLGE9dGhpcy5fZ2V0RGltZW5zaW9ucyh0aGlzLiRkYXRlcGlja2VyKSxuPXQuc3BsaXQoXCIgXCIpLGg9dGhpcy5vcHRzLm9mZnNldCxvPW5bMF0scj1uWzFdO3N3aXRjaChvKXtjYXNlXCJ0b3BcIjplPXMudG9wLWEuaGVpZ2h0LWg7YnJlYWs7Y2FzZVwicmlnaHRcIjppPXMubGVmdCtzLndpZHRoK2g7YnJlYWs7Y2FzZVwiYm90dG9tXCI6ZT1zLnRvcCtzLmhlaWdodCtoO2JyZWFrO2Nhc2VcImxlZnRcIjppPXMubGVmdC1hLndpZHRoLWh9c3dpdGNoKHIpe2Nhc2VcInRvcFwiOmU9cy50b3A7YnJlYWs7Y2FzZVwicmlnaHRcIjppPXMubGVmdCtzLndpZHRoLWEud2lkdGg7YnJlYWs7Y2FzZVwiYm90dG9tXCI6ZT1zLnRvcCtzLmhlaWdodC1hLmhlaWdodDticmVhaztjYXNlXCJsZWZ0XCI6aT1zLmxlZnQ7YnJlYWs7Y2FzZVwiY2VudGVyXCI6L2xlZnR8cmlnaHQvLnRlc3Qobyk/ZT1zLnRvcCtzLmhlaWdodC8yLWEuaGVpZ2h0LzI6aT1zLmxlZnQrcy53aWR0aC8yLWEud2lkdGgvMn10aGlzLiRkYXRlcGlja2VyLmNzcyh7bGVmdDppLHRvcDplfSl9LHNob3c6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLm9wdHMub25TaG93O3RoaXMuc2V0UG9zaXRpb24odGhpcy5vcHRzLnBvc2l0aW9uKSx0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKFwiYWN0aXZlXCIpLHRoaXMudmlzaWJsZT0hMCx0JiZ0aGlzLl9iaW5kVmlzaW9uRXZlbnRzKHQpfSxoaWRlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5vcHRzLm9uSGlkZTt0aGlzLiRkYXRlcGlja2VyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLmNzcyh7bGVmdDpcIi0xMDAwMDBweFwifSksdGhpcy5mb2N1c2VkPVwiXCIsdGhpcy5rZXlzPVtdLHRoaXMuaW5Gb2N1cz0hMSx0aGlzLnZpc2libGU9ITEsdGhpcy4kZWwuYmx1cigpLHQmJnRoaXMuX2JpbmRWaXNpb25FdmVudHModCl9LGRvd246ZnVuY3Rpb24odCl7dGhpcy5fY2hhbmdlVmlldyh0LFwiZG93blwiKX0sdXA6ZnVuY3Rpb24odCl7dGhpcy5fY2hhbmdlVmlldyh0LFwidXBcIil9LF9iaW5kVmlzaW9uRXZlbnRzOmZ1bmN0aW9uKHQpe3RoaXMuJGRhdGVwaWNrZXIub2ZmKFwidHJhbnNpdGlvbmVuZC5kcFwiKSx0KHRoaXMsITEpLHRoaXMuJGRhdGVwaWNrZXIub25lKFwidHJhbnNpdGlvbmVuZC5kcFwiLHQuYmluZCh0aGlzLHRoaXMsITApKX0sX2NoYW5nZVZpZXc6ZnVuY3Rpb24odCxlKXt0PXR8fHRoaXMuZm9jdXNlZHx8dGhpcy5kYXRlO3ZhciBpPVwidXBcIj09ZT90aGlzLnZpZXdJbmRleCsxOnRoaXMudmlld0luZGV4LTE7aT4yJiYoaT0yKSwwPmkmJihpPTApLHRoaXMuc2lsZW50PSEwLHRoaXMuZGF0ZT1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpLHRoaXMuc2lsZW50PSExLHRoaXMudmlldz10aGlzLnZpZXdJbmRleGVzW2ldfSxfaGFuZGxlSG90S2V5OmZ1bmN0aW9uKHQpe3ZhciBlLGkscyxhPW4uZ2V0UGFyc2VkRGF0ZSh0aGlzLl9nZXRGb2N1c2VkRGF0ZSgpKSxoPXRoaXMub3B0cyxvPSExLHI9ITEsYz0hMSxkPWEueWVhcixsPWEubW9udGgsdT1hLmRhdGU7c3dpdGNoKHQpe2Nhc2VcImN0cmxSaWdodFwiOmNhc2VcImN0cmxVcFwiOmwrPTEsbz0hMDticmVhaztjYXNlXCJjdHJsTGVmdFwiOmNhc2VcImN0cmxEb3duXCI6bC09MSxvPSEwO2JyZWFrO2Nhc2VcInNoaWZ0UmlnaHRcIjpjYXNlXCJzaGlmdFVwXCI6cj0hMCxkKz0xO2JyZWFrO2Nhc2VcInNoaWZ0TGVmdFwiOmNhc2VcInNoaWZ0RG93blwiOnI9ITAsZC09MTticmVhaztjYXNlXCJhbHRSaWdodFwiOmNhc2VcImFsdFVwXCI6Yz0hMCxkKz0xMDticmVhaztjYXNlXCJhbHRMZWZ0XCI6Y2FzZVwiYWx0RG93blwiOmM9ITAsZC09MTA7YnJlYWs7Y2FzZVwiY3RybFNoaWZ0VXBcIjp0aGlzLnVwKCl9cz1uLmdldERheXNDb3VudChuZXcgRGF0ZShkLGwpKSxpPW5ldyBEYXRlKGQsbCx1KSx1PnMmJih1PXMpLGkuZ2V0VGltZSgpPHRoaXMubWluVGltZT9pPXRoaXMubWluRGF0ZTppLmdldFRpbWUoKT50aGlzLm1heFRpbWUmJihpPXRoaXMubWF4RGF0ZSksdGhpcy5mb2N1c2VkPWksZT1uLmdldFBhcnNlZERhdGUoaSksbyYmaC5vbkNoYW5nZU1vbnRoJiZoLm9uQ2hhbmdlTW9udGgoZS5tb250aCxlLnllYXIpLHImJmgub25DaGFuZ2VZZWFyJiZoLm9uQ2hhbmdlWWVhcihlLnllYXIpLGMmJmgub25DaGFuZ2VEZWNhZGUmJmgub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpfSxfcmVnaXN0ZXJLZXk6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5rZXlzLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuIGU9PXR9KTtlfHx0aGlzLmtleXMucHVzaCh0KX0sX3VuUmVnaXN0ZXJLZXk6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5rZXlzLmluZGV4T2YodCk7dGhpcy5rZXlzLnNwbGljZShlLDEpfSxfaXNIb3RLZXlQcmVzc2VkOmZ1bmN0aW9uKCl7dmFyIHQsZT0hMSxpPXRoaXMscz10aGlzLmtleXMuc29ydCgpO2Zvcih2YXIgYSBpbiB1KXQ9dVthXSxzLmxlbmd0aD09dC5sZW5ndGgmJnQuZXZlcnkoZnVuY3Rpb24odCxlKXtyZXR1cm4gdD09c1tlXX0pJiYoaS5fdHJpZ2dlcihcImhvdEtleVwiLGEpLGU9ITApO3JldHVybiBlfSxfdHJpZ2dlcjpmdW5jdGlvbih0LGUpe3RoaXMuJGVsLnRyaWdnZXIodCxlKX0sX2ZvY3VzTmV4dENlbGw6ZnVuY3Rpb24odCxlKXtlPWV8fHRoaXMuY2VsbFR5cGU7dmFyIGk9bi5nZXRQYXJzZWREYXRlKHRoaXMuX2dldEZvY3VzZWREYXRlKCkpLHM9aS55ZWFyLGE9aS5tb250aCxoPWkuZGF0ZTtpZighdGhpcy5faXNIb3RLZXlQcmVzc2VkKCkpe3N3aXRjaCh0KXtjYXNlIDM3OlwiZGF5XCI9PWU/aC09MTpcIlwiLFwibW9udGhcIj09ZT9hLT0xOlwiXCIsXCJ5ZWFyXCI9PWU/cy09MTpcIlwiO2JyZWFrO2Nhc2UgMzg6XCJkYXlcIj09ZT9oLT03OlwiXCIsXCJtb250aFwiPT1lP2EtPTM6XCJcIixcInllYXJcIj09ZT9zLT00OlwiXCI7YnJlYWs7Y2FzZSAzOTpcImRheVwiPT1lP2grPTE6XCJcIixcIm1vbnRoXCI9PWU/YSs9MTpcIlwiLFwieWVhclwiPT1lP3MrPTE6XCJcIjticmVhaztjYXNlIDQwOlwiZGF5XCI9PWU/aCs9NzpcIlwiLFwibW9udGhcIj09ZT9hKz0zOlwiXCIsXCJ5ZWFyXCI9PWU/cys9NDpcIlwifXZhciBvPW5ldyBEYXRlKHMsYSxoKTtvLmdldFRpbWUoKTx0aGlzLm1pblRpbWU/bz10aGlzLm1pbkRhdGU6by5nZXRUaW1lKCk+dGhpcy5tYXhUaW1lJiYobz10aGlzLm1heERhdGUpLHRoaXMuZm9jdXNlZD1vfX0sX2dldEZvY3VzZWREYXRlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5mb2N1c2VkfHx0aGlzLnNlbGVjdGVkRGF0ZXNbdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aC0xXSxlPXRoaXMucGFyc2VkRGF0ZTtpZighdClzd2l0Y2godGhpcy52aWV3KXtjYXNlXCJkYXlzXCI6dD1uZXcgRGF0ZShlLnllYXIsZS5tb250aCwobmV3IERhdGUpLmdldERhdGUoKSk7YnJlYWs7Y2FzZVwibW9udGhzXCI6dD1uZXcgRGF0ZShlLnllYXIsZS5tb250aCwxKTticmVhaztjYXNlXCJ5ZWFyc1wiOnQ9bmV3IERhdGUoZS55ZWFyLDAsMSl9cmV0dXJuIHR9LF9nZXRDZWxsOmZ1bmN0aW9uKHQsaSl7aT1pfHx0aGlzLmNlbGxUeXBlO3ZhciBzLGE9bi5nZXRQYXJzZWREYXRlKHQpLGg9Jy5kYXRlcGlja2VyLS1jZWxsW2RhdGEteWVhcj1cIicrYS55ZWFyKydcIl0nO3N3aXRjaChpKXtjYXNlXCJtb250aFwiOmg9J1tkYXRhLW1vbnRoPVwiJythLm1vbnRoKydcIl0nO2JyZWFrO2Nhc2VcImRheVwiOmgrPSdbZGF0YS1tb250aD1cIicrYS5tb250aCsnXCJdW2RhdGEtZGF0ZT1cIicrYS5kYXRlKydcIl0nfXJldHVybiBzPXRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uJGVsLmZpbmQoaCkscy5sZW5ndGg/czplKFwiXCIpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0LiRlbC5vZmYoXCIuYWRwXCIpLmRhdGEoXCJkYXRlcGlja2VyXCIsXCJcIiksdC5zZWxlY3RlZERhdGVzPVtdLHQuZm9jdXNlZD1cIlwiLHQudmlld3M9e30sdC5rZXlzPVtdLHQubWluUmFuZ2U9XCJcIix0Lm1heFJhbmdlPVwiXCIsdC5vcHRzLmlubGluZXx8IXQuZWxJc0lucHV0P3QuJGRhdGVwaWNrZXIuY2xvc2VzdChcIi5kYXRlcGlja2VyLWlubGluZVwiKS5yZW1vdmUoKTp0LiRkYXRlcGlja2VyLnJlbW92ZSgpfSxfaGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXM6ZnVuY3Rpb24odCxlKXt0aGlzLm9wdHMucmFuZ2U/dGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkP3RoaXMucmVtb3ZlRGF0ZShlKToyIT10aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiZ0aGlzLl90cmlnZ2VyKFwiY2xpY2tDZWxsXCIsZSk6dGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkJiZ0aGlzLnJlbW92ZURhdGUoZSksdGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkfHwodGhpcy5sYXN0U2VsZWN0ZWREYXRlPXQsdGhpcy5vcHRzLnRpbWVwaWNrZXImJih0aGlzLnRpbWVwaWNrZXIuX3NldFRpbWUodCksdGhpcy50aW1lcGlja2VyLnVwZGF0ZSgpKSl9LF9vblNob3dFdmVudDpmdW5jdGlvbih0KXt0aGlzLnZpc2libGV8fHRoaXMuc2hvdygpfSxfb25CbHVyOmZ1bmN0aW9uKCl7IXRoaXMuaW5Gb2N1cyYmdGhpcy52aXNpYmxlJiZ0aGlzLmhpZGUoKX0sX29uTW91c2VEb3duRGF0ZXBpY2tlcjpmdW5jdGlvbih0KXt0aGlzLmluRm9jdXM9ITB9LF9vbk1vdXNlVXBEYXRlcGlja2VyOmZ1bmN0aW9uKHQpe3RoaXMuaW5Gb2N1cz0hMSx0Lm9yaWdpbmFsRXZlbnQuaW5Gb2N1cz0hMCx0Lm9yaWdpbmFsRXZlbnQudGltZXBpY2tlckZvY3VzfHx0aGlzLiRlbC5mb2N1cygpfSxfb25LZXlVcEdlbmVyYWw6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy4kZWwudmFsKCk7ZXx8dGhpcy5jbGVhcigpfSxfb25SZXNpemU6ZnVuY3Rpb24oKXt0aGlzLnZpc2libGUmJnRoaXMuc2V0UG9zaXRpb24oKX0sX29uTW91c2VVcEJvZHk6ZnVuY3Rpb24odCl7dC5vcmlnaW5hbEV2ZW50LmluRm9jdXN8fHRoaXMudmlzaWJsZSYmIXRoaXMuaW5Gb2N1cyYmdGhpcy5oaWRlKCl9LF9vbk1vdXNlVXBFbDpmdW5jdGlvbih0KXt0Lm9yaWdpbmFsRXZlbnQuaW5Gb2N1cz0hMCxzZXRUaW1lb3V0KHRoaXMuX29uS2V5VXBHZW5lcmFsLmJpbmQodGhpcyksNCl9LF9vbktleURvd246ZnVuY3Rpb24odCl7dmFyIGU9dC53aGljaDtpZih0aGlzLl9yZWdpc3RlcktleShlKSxlPj0zNyYmNDA+PWUmJih0LnByZXZlbnREZWZhdWx0KCksdGhpcy5fZm9jdXNOZXh0Q2VsbChlKSksMTM9PWUmJnRoaXMuZm9jdXNlZCl7aWYodGhpcy5fZ2V0Q2VsbCh0aGlzLmZvY3VzZWQpLmhhc0NsYXNzKFwiLWRpc2FibGVkLVwiKSlyZXR1cm47aWYodGhpcy52aWV3IT10aGlzLm9wdHMubWluVmlldyl0aGlzLmRvd24oKTtlbHNle3ZhciBpPXRoaXMuX2lzU2VsZWN0ZWQodGhpcy5mb2N1c2VkLHRoaXMuY2VsbFR5cGUpO2lmKCFpKXJldHVybiB0aGlzLnRpbWVwaWNrZXImJih0aGlzLmZvY3VzZWQuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKSx0aGlzLmZvY3VzZWQuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcykpLHZvaWQgdGhpcy5zZWxlY3REYXRlKHRoaXMuZm9jdXNlZCk7dGhpcy5faGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXMoaSx0aGlzLmZvY3VzZWQpfX0yNz09ZSYmdGhpcy5oaWRlKCl9LF9vbktleVVwOmZ1bmN0aW9uKHQpe3ZhciBlPXQud2hpY2g7dGhpcy5fdW5SZWdpc3RlcktleShlKX0sX29uSG90S2V5OmZ1bmN0aW9uKHQsZSl7dGhpcy5faGFuZGxlSG90S2V5KGUpfSxfb25Nb3VzZUVudGVyQ2VsbDpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5jbG9zZXN0KFwiLmRhdGVwaWNrZXItLWNlbGxcIikscz10aGlzLl9nZXREYXRlRnJvbUNlbGwoaSk7dGhpcy5zaWxlbnQ9ITAsdGhpcy5mb2N1c2VkJiYodGhpcy5mb2N1c2VkPVwiXCIpLGkuYWRkQ2xhc3MoXCItZm9jdXMtXCIpLHRoaXMuZm9jdXNlZD1zLHRoaXMuc2lsZW50PSExLHRoaXMub3B0cy5yYW5nZSYmMT09dGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCYmKHRoaXMubWluUmFuZ2U9dGhpcy5zZWxlY3RlZERhdGVzWzBdLHRoaXMubWF4UmFuZ2U9XCJcIixuLmxlc3ModGhpcy5taW5SYW5nZSx0aGlzLmZvY3VzZWQpJiYodGhpcy5tYXhSYW5nZT10aGlzLm1pblJhbmdlLHRoaXMubWluUmFuZ2U9XCJcIiksdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fdXBkYXRlKCkpfSxfb25Nb3VzZUxlYXZlQ2VsbDpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5jbG9zZXN0KFwiLmRhdGVwaWNrZXItLWNlbGxcIik7aS5yZW1vdmVDbGFzcyhcIi1mb2N1cy1cIiksdGhpcy5zaWxlbnQ9ITAsdGhpcy5mb2N1c2VkPVwiXCIsdGhpcy5zaWxlbnQ9ITF9LF9vblRpbWVDaGFuZ2U6ZnVuY3Rpb24odCxlLGkpe3ZhciBzPW5ldyBEYXRlLGE9dGhpcy5zZWxlY3RlZERhdGVzLG49ITE7YS5sZW5ndGgmJihuPSEwLHM9dGhpcy5sYXN0U2VsZWN0ZWREYXRlKSxzLnNldEhvdXJzKGUpLHMuc2V0TWludXRlcyhpKSxufHx0aGlzLl9nZXRDZWxsKHMpLmhhc0NsYXNzKFwiLWRpc2FibGVkLVwiKT8odGhpcy5fc2V0SW5wdXRWYWx1ZSgpLHRoaXMub3B0cy5vblNlbGVjdCYmdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKCkpOnRoaXMuc2VsZWN0RGF0ZShzKX0sX29uQ2xpY2tDZWxsOmZ1bmN0aW9uKHQsZSl7dGhpcy50aW1lcGlja2VyJiYoZS5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpLGUuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcykpLHRoaXMuc2VsZWN0RGF0ZShlKX0sc2V0IGZvY3VzZWQodCl7aWYoIXQmJnRoaXMuZm9jdXNlZCl7dmFyIGU9dGhpcy5fZ2V0Q2VsbCh0aGlzLmZvY3VzZWQpO2UubGVuZ3RoJiZlLnJlbW92ZUNsYXNzKFwiLWZvY3VzLVwiKX10aGlzLl9mb2N1c2VkPXQsdGhpcy5vcHRzLnJhbmdlJiYxPT10aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiYodGhpcy5taW5SYW5nZT10aGlzLnNlbGVjdGVkRGF0ZXNbMF0sdGhpcy5tYXhSYW5nZT1cIlwiLG4ubGVzcyh0aGlzLm1pblJhbmdlLHRoaXMuX2ZvY3VzZWQpJiYodGhpcy5tYXhSYW5nZT10aGlzLm1pblJhbmdlLHRoaXMubWluUmFuZ2U9XCJcIikpLHRoaXMuc2lsZW50fHwodGhpcy5kYXRlPXQpfSxnZXQgZm9jdXNlZCgpe3JldHVybiB0aGlzLl9mb2N1c2VkfSxnZXQgcGFyc2VkRGF0ZSgpe3JldHVybiBuLmdldFBhcnNlZERhdGUodGhpcy5kYXRlKX0sc2V0IGRhdGUodCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBEYXRlPyh0aGlzLmN1cnJlbnREYXRlPXQsdGhpcy5pbml0ZWQmJiF0aGlzLnNpbGVudCYmKHRoaXMudmlld3NbdGhpcy52aWV3XS5fcmVuZGVyKCksdGhpcy5uYXYuX3JlbmRlcigpLHRoaXMudmlzaWJsZSYmdGhpcy5lbElzSW5wdXQmJnRoaXMuc2V0UG9zaXRpb24oKSksdCk6dm9pZCAwfSxnZXQgZGF0ZSgpe3JldHVybiB0aGlzLmN1cnJlbnREYXRlfSxzZXQgdmlldyh0KXtyZXR1cm4gdGhpcy52aWV3SW5kZXg9dGhpcy52aWV3SW5kZXhlcy5pbmRleE9mKHQpLHRoaXMudmlld0luZGV4PDA/dm9pZCAwOih0aGlzLnByZXZWaWV3PXRoaXMuY3VycmVudFZpZXcsdGhpcy5jdXJyZW50Vmlldz10LHRoaXMuaW5pdGVkJiYodGhpcy52aWV3c1t0XT90aGlzLnZpZXdzW3RdLl9yZW5kZXIoKTp0aGlzLnZpZXdzW3RdPW5ldyBlLmZuLmRhdGVwaWNrZXIuQm9keSh0aGlzLHQsdGhpcy5vcHRzKSx0aGlzLnZpZXdzW3RoaXMucHJldlZpZXddLmhpZGUoKSx0aGlzLnZpZXdzW3RdLnNob3coKSx0aGlzLm5hdi5fcmVuZGVyKCksdGhpcy5vcHRzLm9uQ2hhbmdlVmlldyYmdGhpcy5vcHRzLm9uQ2hhbmdlVmlldyh0KSx0aGlzLmVsSXNJbnB1dCYmdGhpcy52aXNpYmxlJiZ0aGlzLnNldFBvc2l0aW9uKCkpLHQpfSxnZXQgdmlldygpe3JldHVybiB0aGlzLmN1cnJlbnRWaWV3fSxnZXQgY2VsbFR5cGUoKXtyZXR1cm4gdGhpcy52aWV3LnN1YnN0cmluZygwLHRoaXMudmlldy5sZW5ndGgtMSl9LGdldCBtaW5UaW1lKCl7dmFyIHQ9bi5nZXRQYXJzZWREYXRlKHRoaXMubWluRGF0ZSk7cmV0dXJuIG5ldyBEYXRlKHQueWVhcix0Lm1vbnRoLHQuZGF0ZSkuZ2V0VGltZSgpfSxnZXQgbWF4VGltZSgpe3ZhciB0PW4uZ2V0UGFyc2VkRGF0ZSh0aGlzLm1heERhdGUpO3JldHVybiBuZXcgRGF0ZSh0LnllYXIsdC5tb250aCx0LmRhdGUpLmdldFRpbWUoKX0sZ2V0IGN1ckRlY2FkZSgpe3JldHVybiBuLmdldERlY2FkZSh0aGlzLmRhdGUpfX0sbi5nZXREYXlzQ291bnQ9ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCkrMSwwKS5nZXREYXRlKCl9LG4uZ2V0UGFyc2VkRGF0ZT1mdW5jdGlvbih0KXtyZXR1cm57eWVhcjp0LmdldEZ1bGxZZWFyKCksbW9udGg6dC5nZXRNb250aCgpLGZ1bGxNb250aDp0LmdldE1vbnRoKCkrMTwxMD9cIjBcIisodC5nZXRNb250aCgpKzEpOnQuZ2V0TW9udGgoKSsxLGRhdGU6dC5nZXREYXRlKCksZnVsbERhdGU6dC5nZXREYXRlKCk8MTA/XCIwXCIrdC5nZXREYXRlKCk6dC5nZXREYXRlKCksZGF5OnQuZ2V0RGF5KCksaG91cnM6dC5nZXRIb3VycygpLGZ1bGxIb3Vyczp0LmdldEhvdXJzKCk8MTA/XCIwXCIrdC5nZXRIb3VycygpOnQuZ2V0SG91cnMoKSxtaW51dGVzOnQuZ2V0TWludXRlcygpLGZ1bGxNaW51dGVzOnQuZ2V0TWludXRlcygpPDEwP1wiMFwiK3QuZ2V0TWludXRlcygpOnQuZ2V0TWludXRlcygpfX0sbi5nZXREZWNhZGU9ZnVuY3Rpb24odCl7dmFyIGU9MTAqTWF0aC5mbG9vcih0LmdldEZ1bGxZZWFyKCkvMTApO3JldHVybltlLGUrOV19LG4udGVtcGxhdGU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5yZXBsYWNlKC8jXFx7KFtcXHddKylcXH0vZyxmdW5jdGlvbih0LGkpe3JldHVybiBlW2ldfHwwPT09ZVtpXT9lW2ldOnZvaWQgMH0pfSxuLmlzU2FtZT1mdW5jdGlvbih0LGUsaSl7aWYoIXR8fCFlKXJldHVybiExO3ZhciBzPW4uZ2V0UGFyc2VkRGF0ZSh0KSxhPW4uZ2V0UGFyc2VkRGF0ZShlKSxoPWk/aTpcImRheVwiLG89e2RheTpzLmRhdGU9PWEuZGF0ZSYmcy5tb250aD09YS5tb250aCYmcy55ZWFyPT1hLnllYXIsbW9udGg6cy5tb250aD09YS5tb250aCYmcy55ZWFyPT1hLnllYXIseWVhcjpzLnllYXI9PWEueWVhcn07cmV0dXJuIG9baF19LG4ubGVzcz1mdW5jdGlvbih0LGUsaSl7cmV0dXJuIHQmJmU/ZS5nZXRUaW1lKCk8dC5nZXRUaW1lKCk6ITF9LG4uYmlnZ2VyPWZ1bmN0aW9uKHQsZSxpKXtyZXR1cm4gdCYmZT9lLmdldFRpbWUoKT50LmdldFRpbWUoKTohMX0sbi5nZXRMZWFkaW5nWmVyb051bT1mdW5jdGlvbih0KXtyZXR1cm4gcGFyc2VJbnQodCk8MTA/XCIwXCIrdDp0fSxuLnJlc2V0VGltZT1mdW5jdGlvbih0KXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgdD8odD1uLmdldFBhcnNlZERhdGUodCksbmV3IERhdGUodC55ZWFyLHQubW9udGgsdC5kYXRlKSk6dm9pZCAwfSxlLmZuLmRhdGVwaWNrZXI9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe2lmKGUuZGF0YSh0aGlzLG8pKXt2YXIgaT1lLmRhdGEodGhpcyxvKTtpLm9wdHM9ZS5leHRlbmQoITAsaS5vcHRzLHQpLGkudXBkYXRlKCl9ZWxzZSBlLmRhdGEodGhpcyxvLG5ldyBtKHRoaXMsdCkpfSl9LGUuZm4uZGF0ZXBpY2tlci5Db25zdHJ1Y3Rvcj1tLGUuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZT17cnU6e2RheXM6W1wi0JLQvtGB0LrRgNC10YHQtdC90YzQtVwiLFwi0J/QvtC90LXQtNC10LvRjNC90LjQulwiLFwi0JLRgtC+0YDQvdC40LpcIixcItCh0YDQtdC00LBcIixcItCn0LXRgtCy0LXRgNCzXCIsXCLQn9GP0YLQvdC40YbQsFwiLFwi0KHRg9Cx0LHQvtGC0LBcIl0sZGF5c1Nob3J0OltcItCS0L7RgVwiLFwi0J/QvtC9XCIsXCLQktGC0L5cIixcItCh0YDQtVwiLFwi0KfQtdGCXCIsXCLQn9GP0YJcIixcItCh0YPQsVwiXSxkYXlzTWluOltcItCf0L1cIixcItCS0YJcIixcItCh0YBcIixcItCn0YJcIixcItCf0YJcIixcItCh0LFcIixcItCS0YFcIl0sbW9udGhzOltcItCv0L3QstCw0YDRjFwiLFwi0KTQtdCy0YDQsNC70YxcIixcItCc0LDRgNGCXCIsXCLQkNC/0YDQtdC70YxcIixcItCc0LDQuVwiLFwi0JjRjtC90YxcIixcItCY0Y7Qu9GMXCIsXCLQkNCy0LPRg9GB0YJcIixcItCh0LXQvdGC0Y/QsdGA0YxcIixcItCe0LrRgtGP0LHRgNGMXCIsXCLQndC+0Y/QsdGA0YxcIixcItCU0LXQutCw0LHRgNGMXCJdLG1vbnRoc1Nob3J0OltcItCv0L3QslwiLFwi0KTQtdCyXCIsXCLQnNCw0YBcIixcItCQ0L/RgFwiLFwi0JzQsNC5XCIsXCLQmNGO0L1cIixcItCY0Y7Qu1wiLFwi0JDQstCzXCIsXCLQodC10L1cIixcItCe0LrRglwiLFwi0J3QvtGPXCIsXCLQlNC10LpcIl0sdG9kYXk6XCLQodC10LPQvtC00L3Rj1wiLGNsZWFyOlwi0J7Rh9C40YHRgtC40YLRjFwiLGRhdGVGb3JtYXQ6XCJkZC5tbS55eXl5XCIsdGltZUZvcm1hdDpcImhoOmlpXCIsZmlyc3REYXk6MX19LGUoZnVuY3Rpb24oKXtlKHIpLmRhdGVwaWNrZXIoKX0pfSgpLGZ1bmN0aW9uKCl7dmFyIHQ9e2RheXM6JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXlzIGRhdGVwaWNrZXItLWJvZHlcIj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tZGF5cy1uYW1lc1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy1kYXlzXCI+PC9kaXY+PC9kaXY+Jyxtb250aHM6JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1tb250aHMgZGF0ZXBpY2tlci0tYm9keVwiPjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy1tb250aHNcIj48L2Rpdj48L2Rpdj4nLHllYXJzOic8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0teWVhcnMgZGF0ZXBpY2tlci0tYm9keVwiPjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy15ZWFyc1wiPjwvZGl2PjwvZGl2Pid9LHM9ZS5mbi5kYXRlcGlja2VyLGE9cy5Db25zdHJ1Y3RvcjtzLkJvZHk9ZnVuY3Rpb24odCxpLHMpe3RoaXMuZD10LHRoaXMudHlwZT1pLHRoaXMub3B0cz1zLHRoaXMuJGVsPWUoXCJcIiksdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyfHx0aGlzLmluaXQoKX0scy5Cb2R5LnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbigpe3RoaXMuX2J1aWxkQmFzZUh0bWwoKSx0aGlzLl9yZW5kZXIoKSx0aGlzLl9iaW5kRXZlbnRzKCl9LF9iaW5kRXZlbnRzOmZ1bmN0aW9uKCl7dGhpcy4kZWwub24oXCJjbGlja1wiLFwiLmRhdGVwaWNrZXItLWNlbGxcIixlLnByb3h5KHRoaXMuX29uQ2xpY2tDZWxsLHRoaXMpKX0sX2J1aWxkQmFzZUh0bWw6ZnVuY3Rpb24oKXt0aGlzLiRlbD1lKHRbdGhpcy50eXBlXSkuYXBwZW5kVG8odGhpcy5kLiRjb250ZW50KSx0aGlzLiRuYW1lcz1lKFwiLmRhdGVwaWNrZXItLWRheXMtbmFtZXNcIix0aGlzLiRlbCksdGhpcy4kY2VsbHM9ZShcIi5kYXRlcGlja2VyLS1jZWxsc1wiLHRoaXMuJGVsKX0sX2dldERheU5hbWVzSHRtbDpmdW5jdGlvbih0LGUscyxhKXtyZXR1cm4gZT1lIT1pP2U6dCxzPXM/czpcIlwiLGE9YSE9aT9hOjAsYT43P3M6Nz09ZT90aGlzLl9nZXREYXlOYW1lc0h0bWwodCwwLHMsKythKToocys9JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXktbmFtZScrKHRoaXMuZC5pc1dlZWtlbmQoZSk/XCIgLXdlZWtlbmQtXCI6XCJcIikrJ1wiPicrdGhpcy5kLmxvYy5kYXlzTWluW2VdK1wiPC9kaXY+XCIsdGhpcy5fZ2V0RGF5TmFtZXNIdG1sKHQsKytlLHMsKythKSl9LF9nZXRDZWxsQ29udGVudHM6ZnVuY3Rpb24odCxlKXt2YXIgaT1cImRhdGVwaWNrZXItLWNlbGwgZGF0ZXBpY2tlci0tY2VsbC1cIitlLHM9bmV3IERhdGUsbj10aGlzLmQsaD1hLnJlc2V0VGltZShuLm1pblJhbmdlKSxvPWEucmVzZXRUaW1lKG4ubWF4UmFuZ2UpLHI9bi5vcHRzLGM9YS5nZXRQYXJzZWREYXRlKHQpLGQ9e30sbD1jLmRhdGU7c3dpdGNoKGUpe2Nhc2VcImRheVwiOm4uaXNXZWVrZW5kKGMuZGF5KSYmKGkrPVwiIC13ZWVrZW5kLVwiKSxjLm1vbnRoIT10aGlzLmQucGFyc2VkRGF0ZS5tb250aCYmKGkrPVwiIC1vdGhlci1tb250aC1cIixyLnNlbGVjdE90aGVyTW9udGhzfHwoaSs9XCIgLWRpc2FibGVkLVwiKSxyLnNob3dPdGhlck1vbnRoc3x8KGw9XCJcIikpO2JyZWFrO2Nhc2VcIm1vbnRoXCI6bD1uLmxvY1tuLm9wdHMubW9udGhzRmllbGRdW2MubW9udGhdO2JyZWFrO2Nhc2VcInllYXJcIjp2YXIgdT1uLmN1ckRlY2FkZTtsPWMueWVhciwoYy55ZWFyPHVbMF18fGMueWVhcj51WzFdKSYmKGkrPVwiIC1vdGhlci1kZWNhZGUtXCIsci5zZWxlY3RPdGhlclllYXJzfHwoaSs9XCIgLWRpc2FibGVkLVwiKSxyLnNob3dPdGhlclllYXJzfHwobD1cIlwiKSl9cmV0dXJuIHIub25SZW5kZXJDZWxsJiYoZD1yLm9uUmVuZGVyQ2VsbCh0LGUpfHx7fSxsPWQuaHRtbD9kLmh0bWw6bCxpKz1kLmNsYXNzZXM/XCIgXCIrZC5jbGFzc2VzOlwiXCIpLHIucmFuZ2UmJihhLmlzU2FtZShoLHQsZSkmJihpKz1cIiAtcmFuZ2UtZnJvbS1cIiksYS5pc1NhbWUobyx0LGUpJiYoaSs9XCIgLXJhbmdlLXRvLVwiKSwxPT1uLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiZuLmZvY3VzZWQ/KChhLmJpZ2dlcihoLHQpJiZhLmxlc3Mobi5mb2N1c2VkLHQpfHxhLmxlc3Mobyx0KSYmYS5iaWdnZXIobi5mb2N1c2VkLHQpKSYmKGkrPVwiIC1pbi1yYW5nZS1cIiksYS5sZXNzKG8sdCkmJmEuaXNTYW1lKG4uZm9jdXNlZCx0KSYmKGkrPVwiIC1yYW5nZS1mcm9tLVwiKSxhLmJpZ2dlcihoLHQpJiZhLmlzU2FtZShuLmZvY3VzZWQsdCkmJihpKz1cIiAtcmFuZ2UtdG8tXCIpKToyPT1uLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiZhLmJpZ2dlcihoLHQpJiZhLmxlc3Mobyx0KSYmKGkrPVwiIC1pbi1yYW5nZS1cIikpLGEuaXNTYW1lKHMsdCxlKSYmKGkrPVwiIC1jdXJyZW50LVwiKSxuLmZvY3VzZWQmJmEuaXNTYW1lKHQsbi5mb2N1c2VkLGUpJiYoaSs9XCIgLWZvY3VzLVwiKSxuLl9pc1NlbGVjdGVkKHQsZSkmJihpKz1cIiAtc2VsZWN0ZWQtXCIpLCghbi5faXNJblJhbmdlKHQsZSl8fGQuZGlzYWJsZWQpJiYoaSs9XCIgLWRpc2FibGVkLVwiKSx7aHRtbDpsLGNsYXNzZXM6aX19LF9nZXREYXlzSHRtbDpmdW5jdGlvbih0KXt2YXIgZT1hLmdldERheXNDb3VudCh0KSxpPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0RGF5KCkscz1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLGUpLmdldERheSgpLG49aS10aGlzLmQubG9jLmZpcnN0RGF5LGg9Ni1zK3RoaXMuZC5sb2MuZmlyc3REYXk7bj0wPm4/bis3Om4saD1oPjY/aC03Omg7Zm9yKHZhciBvLHIsYz0tbisxLGQ9XCJcIixsPWMsdT1lK2g7dT49bDtsKyspcj10LmdldEZ1bGxZZWFyKCksbz10LmdldE1vbnRoKCksZCs9dGhpcy5fZ2V0RGF5SHRtbChuZXcgRGF0ZShyLG8sbCkpO3JldHVybiBkfSxfZ2V0RGF5SHRtbDpmdW5jdGlvbih0KXt2YXIgZT10aGlzLl9nZXRDZWxsQ29udGVudHModCxcImRheVwiKTtyZXR1cm4nPGRpdiBjbGFzcz1cIicrZS5jbGFzc2VzKydcIiBkYXRhLWRhdGU9XCInK3QuZ2V0RGF0ZSgpKydcIiBkYXRhLW1vbnRoPVwiJyt0LmdldE1vbnRoKCkrJ1wiIGRhdGEteWVhcj1cIicrdC5nZXRGdWxsWWVhcigpKydcIj4nK2UuaHRtbCtcIjwvZGl2PlwifSxfZ2V0TW9udGhzSHRtbDpmdW5jdGlvbih0KXtmb3IodmFyIGU9XCJcIixpPWEuZ2V0UGFyc2VkRGF0ZSh0KSxzPTA7MTI+czspZSs9dGhpcy5fZ2V0TW9udGhIdG1sKG5ldyBEYXRlKGkueWVhcixzKSkscysrO3JldHVybiBlfSxfZ2V0TW9udGhIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2dldENlbGxDb250ZW50cyh0LFwibW9udGhcIik7cmV0dXJuJzxkaXYgY2xhc3M9XCInK2UuY2xhc3NlcysnXCIgZGF0YS1tb250aD1cIicrdC5nZXRNb250aCgpKydcIj4nK2UuaHRtbCtcIjwvZGl2PlwifSxfZ2V0WWVhcnNIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPShhLmdldFBhcnNlZERhdGUodCksYS5nZXREZWNhZGUodCkpLGk9ZVswXS0xLHM9XCJcIixuPWk7Zm9yKG47bjw9ZVsxXSsxO24rKylzKz10aGlzLl9nZXRZZWFySHRtbChuZXcgRGF0ZShuLDApKTtyZXR1cm4gc30sX2dldFllYXJIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2dldENlbGxDb250ZW50cyh0LFwieWVhclwiKTtyZXR1cm4nPGRpdiBjbGFzcz1cIicrZS5jbGFzc2VzKydcIiBkYXRhLXllYXI9XCInK3QuZ2V0RnVsbFllYXIoKSsnXCI+JytlLmh0bWwrXCI8L2Rpdj5cIn0sX3JlbmRlclR5cGVzOntkYXlzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0RGF5TmFtZXNIdG1sKHRoaXMuZC5sb2MuZmlyc3REYXkpLGU9dGhpcy5fZ2V0RGF5c0h0bWwodGhpcy5kLmN1cnJlbnREYXRlKTt0aGlzLiRjZWxscy5odG1sKGUpLHRoaXMuJG5hbWVzLmh0bWwodCl9LG1vbnRoczpmdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE1vbnRoc0h0bWwodGhpcy5kLmN1cnJlbnREYXRlKTt0aGlzLiRjZWxscy5odG1sKHQpfSx5ZWFyczpmdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldFllYXJzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO3RoaXMuJGNlbGxzLmh0bWwodCl9fSxfcmVuZGVyOmZ1bmN0aW9uKCl7dGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyfHx0aGlzLl9yZW5kZXJUeXBlc1t0aGlzLnR5cGVdLmJpbmQodGhpcykoKX0sX3VwZGF0ZTpmdW5jdGlvbigpe3ZhciB0LGkscyxhPWUoXCIuZGF0ZXBpY2tlci0tY2VsbFwiLHRoaXMuJGNlbGxzKSxuPXRoaXM7YS5lYWNoKGZ1bmN0aW9uKGEsaCl7aT1lKHRoaXMpLHM9bi5kLl9nZXREYXRlRnJvbUNlbGwoZSh0aGlzKSksdD1uLl9nZXRDZWxsQ29udGVudHMocyxuLmQuY2VsbFR5cGUpLGkuYXR0cihcImNsYXNzXCIsdC5jbGFzc2VzKX0pfSxzaG93OmZ1bmN0aW9uKCl7dGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyfHwodGhpcy4kZWwuYWRkQ2xhc3MoXCJhY3RpdmVcIiksdGhpcy5hY2l0dmU9ITApfSxoaWRlOmZ1bmN0aW9uKCl7dGhpcy4kZWwucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIiksdGhpcy5hY3RpdmU9ITF9LF9oYW5kbGVDbGljazpmdW5jdGlvbih0KXt2YXIgZT10LmRhdGEoXCJkYXRlXCIpfHwxLGk9dC5kYXRhKFwibW9udGhcIil8fDAscz10LmRhdGEoXCJ5ZWFyXCIpfHx0aGlzLmQucGFyc2VkRGF0ZS55ZWFyLGE9dGhpcy5kO2lmKGEudmlldyE9dGhpcy5vcHRzLm1pblZpZXcpcmV0dXJuIHZvaWQgYS5kb3duKG5ldyBEYXRlKHMsaSxlKSk7dmFyIG49bmV3IERhdGUocyxpLGUpLGg9dGhpcy5kLl9pc1NlbGVjdGVkKG4sdGhpcy5kLmNlbGxUeXBlKTtyZXR1cm4gaD92b2lkIGEuX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzLmJpbmQoYSxoLG4pKCk6dm9pZCBhLl90cmlnZ2VyKFwiY2xpY2tDZWxsXCIsbil9LF9vbkNsaWNrQ2VsbDpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5jbG9zZXN0KFwiLmRhdGVwaWNrZXItLWNlbGxcIik7aS5oYXNDbGFzcyhcIi1kaXNhYmxlZC1cIil8fHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcykoaSl9fX0oKSxmdW5jdGlvbigpe3ZhciB0PSc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LWFjdGlvblwiIGRhdGEtYWN0aW9uPVwicHJldlwiPiN7cHJldkh0bWx9PC9kaXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi10aXRsZVwiPiN7dGl0bGV9PC9kaXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi1hY3Rpb25cIiBkYXRhLWFjdGlvbj1cIm5leHRcIj4je25leHRIdG1sfTwvZGl2PicsaT0nPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWJ1dHRvbnNcIj48L2Rpdj4nLHM9JzxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tYnV0dG9uXCIgZGF0YS1hY3Rpb249XCIje2FjdGlvbn1cIj4je2xhYmVsfTwvc3Bhbj4nLGE9ZS5mbi5kYXRlcGlja2VyLG49YS5Db25zdHJ1Y3RvcjthLk5hdmlnYXRpb249ZnVuY3Rpb24odCxlKXt0aGlzLmQ9dCx0aGlzLm9wdHM9ZSx0aGlzLiRidXR0b25zQ29udGFpbmVyPVwiXCIsdGhpcy5pbml0KCl9LGEuTmF2aWdhdGlvbi5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oKXt0aGlzLl9idWlsZEJhc2VIdG1sKCksdGhpcy5fYmluZEV2ZW50cygpfSxfYmluZEV2ZW50czpmdW5jdGlvbigpe3RoaXMuZC4kbmF2Lm9uKFwiY2xpY2tcIixcIi5kYXRlcGlja2VyLS1uYXYtYWN0aW9uXCIsZS5wcm94eSh0aGlzLl9vbkNsaWNrTmF2QnV0dG9uLHRoaXMpKSx0aGlzLmQuJG5hdi5vbihcImNsaWNrXCIsXCIuZGF0ZXBpY2tlci0tbmF2LXRpdGxlXCIsZS5wcm94eSh0aGlzLl9vbkNsaWNrTmF2VGl0bGUsdGhpcykpLHRoaXMuZC4kZGF0ZXBpY2tlci5vbihcImNsaWNrXCIsXCIuZGF0ZXBpY2tlci0tYnV0dG9uXCIsZS5wcm94eSh0aGlzLl9vbkNsaWNrTmF2QnV0dG9uLHRoaXMpKX0sX2J1aWxkQmFzZUh0bWw6ZnVuY3Rpb24oKXt0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fHRoaXMuX3JlbmRlcigpLHRoaXMuX2FkZEJ1dHRvbnNJZk5lZWQoKX0sX2FkZEJ1dHRvbnNJZk5lZWQ6ZnVuY3Rpb24oKXt0aGlzLm9wdHMudG9kYXlCdXR0b24mJnRoaXMuX2FkZEJ1dHRvbihcInRvZGF5XCIpLHRoaXMub3B0cy5jbGVhckJ1dHRvbiYmdGhpcy5fYWRkQnV0dG9uKFwiY2xlYXJcIil9LF9yZW5kZXI6ZnVuY3Rpb24oKXt2YXIgaT10aGlzLl9nZXRUaXRsZSh0aGlzLmQuY3VycmVudERhdGUpLHM9bi50ZW1wbGF0ZSh0LGUuZXh0ZW5kKHt0aXRsZTppfSx0aGlzLm9wdHMpKTt0aGlzLmQuJG5hdi5odG1sKHMpLFwieWVhcnNcIj09dGhpcy5kLnZpZXcmJmUoXCIuZGF0ZXBpY2tlci0tbmF2LXRpdGxlXCIsdGhpcy5kLiRuYXYpLmFkZENsYXNzKFwiLWRpc2FibGVkLVwiKSx0aGlzLnNldE5hdlN0YXR1cygpfSxfZ2V0VGl0bGU6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZC5mb3JtYXREYXRlKHRoaXMub3B0cy5uYXZUaXRsZXNbdGhpcy5kLnZpZXddLHQpfSxfYWRkQnV0dG9uOmZ1bmN0aW9uKHQpe3RoaXMuJGJ1dHRvbnNDb250YWluZXIubGVuZ3RofHx0aGlzLl9hZGRCdXR0b25zQ29udGFpbmVyKCk7dmFyIGk9e2FjdGlvbjp0LGxhYmVsOnRoaXMuZC5sb2NbdF19LGE9bi50ZW1wbGF0ZShzLGkpO2UoXCJbZGF0YS1hY3Rpb249XCIrdCtcIl1cIix0aGlzLiRidXR0b25zQ29udGFpbmVyKS5sZW5ndGh8fHRoaXMuJGJ1dHRvbnNDb250YWluZXIuYXBwZW5kKGEpfSxfYWRkQnV0dG9uc0NvbnRhaW5lcjpmdW5jdGlvbigpe3RoaXMuZC4kZGF0ZXBpY2tlci5hcHBlbmQoaSksdGhpcy4kYnV0dG9uc0NvbnRhaW5lcj1lKFwiLmRhdGVwaWNrZXItLWJ1dHRvbnNcIix0aGlzLmQuJGRhdGVwaWNrZXIpfSxzZXROYXZTdGF0dXM6ZnVuY3Rpb24oKXtpZigodGhpcy5vcHRzLm1pbkRhdGV8fHRoaXMub3B0cy5tYXhEYXRlKSYmdGhpcy5vcHRzLmRpc2FibGVOYXZXaGVuT3V0T2ZSYW5nZSl7dmFyIHQ9dGhpcy5kLnBhcnNlZERhdGUsZT10Lm1vbnRoLGk9dC55ZWFyLHM9dC5kYXRlO3N3aXRjaCh0aGlzLmQudmlldyl7Y2FzZVwiZGF5c1wiOnRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGksZS0xLDEpLFwibW9udGhcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJwcmV2XCIpLHRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGksZSsxLDEpLFwibW9udGhcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJuZXh0XCIpO2JyZWFrO2Nhc2VcIm1vbnRoc1wiOnRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGktMSxlLHMpLFwieWVhclwiKXx8dGhpcy5fZGlzYWJsZU5hdihcInByZXZcIiksdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoaSsxLGUscyksXCJ5ZWFyXCIpfHx0aGlzLl9kaXNhYmxlTmF2KFwibmV4dFwiKTticmVhaztjYXNlXCJ5ZWFyc1wiOnZhciBhPW4uZ2V0RGVjYWRlKHRoaXMuZC5kYXRlKTt0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShhWzBdLTEsMCwxKSxcInllYXJcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJwcmV2XCIpLHRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGFbMV0rMSwwLDEpLFwieWVhclwiKXx8dGhpcy5fZGlzYWJsZU5hdihcIm5leHRcIil9fX0sX2Rpc2FibGVOYXY6ZnVuY3Rpb24odCl7ZSgnW2RhdGEtYWN0aW9uPVwiJyt0KydcIl0nLHRoaXMuZC4kbmF2KS5hZGRDbGFzcyhcIi1kaXNhYmxlZC1cIil9LF9hY3RpdmF0ZU5hdjpmdW5jdGlvbih0KXtlKCdbZGF0YS1hY3Rpb249XCInK3QrJ1wiXScsdGhpcy5kLiRuYXYpLnJlbW92ZUNsYXNzKFwiLWRpc2FibGVkLVwiKX0sX29uQ2xpY2tOYXZCdXR0b246ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkuY2xvc2VzdChcIltkYXRhLWFjdGlvbl1cIikscz1pLmRhdGEoXCJhY3Rpb25cIik7dGhpcy5kW3NdKCl9LF9vbkNsaWNrTmF2VGl0bGU6ZnVuY3Rpb24odCl7cmV0dXJuIGUodC50YXJnZXQpLmhhc0NsYXNzKFwiLWRpc2FibGVkLVwiKT92b2lkIDA6XCJkYXlzXCI9PXRoaXMuZC52aWV3P3RoaXMuZC52aWV3PVwibW9udGhzXCI6dm9pZCh0aGlzLmQudmlldz1cInllYXJzXCIpfX19KCksZnVuY3Rpb24oKXt2YXIgdD0nPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWVcIj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50XCI+ICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtaG91cnNcIj4je2hvdXJWaXNpYmxlfTwvc3Bhbj4gICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1jb2xvblwiPjo8L3NwYW4+ICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtbWludXRlc1wiPiN7bWluVmFsdWV9PC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXNsaWRlcnNcIj4gICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1yb3dcIj4gICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbmFtZT1cImhvdXJzXCIgdmFsdWU9XCIje2hvdXJWYWx1ZX1cIiBtaW49XCIje2hvdXJNaW59XCIgbWF4PVwiI3tob3VyTWF4fVwiIHN0ZXA9XCIje2hvdXJTdGVwfVwiLz4gICA8L2Rpdj4gICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1yb3dcIj4gICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbmFtZT1cIm1pbnV0ZXNcIiB2YWx1ZT1cIiN7bWluVmFsdWV9XCIgbWluPVwiI3ttaW5NaW59XCIgbWF4PVwiI3ttaW5NYXh9XCIgc3RlcD1cIiN7bWluU3RlcH1cIi8+ICAgPC9kaXY+PC9kaXY+PC9kaXY+JyxpPWUuZm4uZGF0ZXBpY2tlcixzPWkuQ29uc3RydWN0b3I7aS5UaW1lcGlja2VyPWZ1bmN0aW9uKHQsZSl7dGhpcy5kPXQsdGhpcy5vcHRzPWUsdGhpcy5pbml0KCl9LGkuVGltZXBpY2tlci5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oKXt2YXIgdD1cImlucHV0XCI7dGhpcy5fc2V0VGltZSh0aGlzLmQuZGF0ZSksdGhpcy5fYnVpbGRIVE1MKCksbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC9naSkmJih0PVwiY2hhbmdlXCIpLHRoaXMuZC4kZWwub24oXCJzZWxlY3REYXRlXCIsdGhpcy5fb25TZWxlY3REYXRlLmJpbmQodGhpcykpLHRoaXMuJHJhbmdlcy5vbih0LHRoaXMuX29uQ2hhbmdlUmFuZ2UuYmluZCh0aGlzKSksdGhpcy4kcmFuZ2VzLm9uKFwibW91c2V1cFwiLHRoaXMuX29uTW91c2VVcFJhbmdlLmJpbmQodGhpcykpLHRoaXMuJHJhbmdlcy5vbihcIm1vdXNlbW92ZSBmb2N1cyBcIix0aGlzLl9vbk1vdXNlRW50ZXJSYW5nZS5iaW5kKHRoaXMpKSx0aGlzLiRyYW5nZXMub24oXCJtb3VzZW91dCBibHVyXCIsdGhpcy5fb25Nb3VzZU91dFJhbmdlLmJpbmQodGhpcykpfSxfc2V0VGltZTpmdW5jdGlvbih0KXt2YXIgZT1zLmdldFBhcnNlZERhdGUodCk7dGhpcy5faGFuZGxlRGF0ZSh0KSx0aGlzLmhvdXJzPWUuaG91cnM8dGhpcy5taW5Ib3Vycz90aGlzLm1pbkhvdXJzOmUuaG91cnMsdGhpcy5taW51dGVzPWUubWludXRlczx0aGlzLm1pbk1pbnV0ZXM/dGhpcy5taW5NaW51dGVzOmUubWludXRlc30sX3NldE1pblRpbWVGcm9tRGF0ZTpmdW5jdGlvbih0KXt0aGlzLm1pbkhvdXJzPXQuZ2V0SG91cnMoKSx0aGlzLm1pbk1pbnV0ZXM9dC5nZXRNaW51dGVzKCksdGhpcy5kLmxhc3RTZWxlY3RlZERhdGUmJnRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlLmdldEhvdXJzKCk+dC5nZXRIb3VycygpJiYodGhpcy5taW5NaW51dGVzPXRoaXMub3B0cy5taW5NaW51dGVzKX0sX3NldE1heFRpbWVGcm9tRGF0ZTpmdW5jdGlvbih0KXtcbnRoaXMubWF4SG91cnM9dC5nZXRIb3VycygpLHRoaXMubWF4TWludXRlcz10LmdldE1pbnV0ZXMoKSx0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSYmdGhpcy5kLmxhc3RTZWxlY3RlZERhdGUuZ2V0SG91cnMoKTx0LmdldEhvdXJzKCkmJih0aGlzLm1heE1pbnV0ZXM9dGhpcy5vcHRzLm1heE1pbnV0ZXMpfSxfc2V0RGVmYXVsdE1pbk1heFRpbWU6ZnVuY3Rpb24oKXt2YXIgdD0yMyxlPTU5LGk9dGhpcy5vcHRzO3RoaXMubWluSG91cnM9aS5taW5Ib3VyczwwfHxpLm1pbkhvdXJzPnQ/MDppLm1pbkhvdXJzLHRoaXMubWluTWludXRlcz1pLm1pbk1pbnV0ZXM8MHx8aS5taW5NaW51dGVzPmU/MDppLm1pbk1pbnV0ZXMsdGhpcy5tYXhIb3Vycz1pLm1heEhvdXJzPDB8fGkubWF4SG91cnM+dD90OmkubWF4SG91cnMsdGhpcy5tYXhNaW51dGVzPWkubWF4TWludXRlczwwfHxpLm1heE1pbnV0ZXM+ZT9lOmkubWF4TWludXRlc30sX3ZhbGlkYXRlSG91cnNNaW51dGVzOmZ1bmN0aW9uKHQpe3RoaXMuaG91cnM8dGhpcy5taW5Ib3Vycz90aGlzLmhvdXJzPXRoaXMubWluSG91cnM6dGhpcy5ob3Vycz50aGlzLm1heEhvdXJzJiYodGhpcy5ob3Vycz10aGlzLm1heEhvdXJzKSx0aGlzLm1pbnV0ZXM8dGhpcy5taW5NaW51dGVzP3RoaXMubWludXRlcz10aGlzLm1pbk1pbnV0ZXM6dGhpcy5taW51dGVzPnRoaXMubWF4TWludXRlcyYmKHRoaXMubWludXRlcz10aGlzLm1heE1pbnV0ZXMpfSxfYnVpbGRIVE1MOmZ1bmN0aW9uKCl7dmFyIGk9cy5nZXRMZWFkaW5nWmVyb051bSxhPXtob3VyTWluOnRoaXMubWluSG91cnMsaG91ck1heDppKHRoaXMubWF4SG91cnMpLGhvdXJTdGVwOnRoaXMub3B0cy5ob3Vyc1N0ZXAsaG91clZhbHVlOnRoaXMuaG91cnMsaG91clZpc2libGU6aSh0aGlzLmRpc3BsYXlIb3VycyksbWluTWluOnRoaXMubWluTWludXRlcyxtaW5NYXg6aSh0aGlzLm1heE1pbnV0ZXMpLG1pblN0ZXA6dGhpcy5vcHRzLm1pbnV0ZXNTdGVwLG1pblZhbHVlOmkodGhpcy5taW51dGVzKX0sbj1zLnRlbXBsYXRlKHQsYSk7dGhpcy4kdGltZXBpY2tlcj1lKG4pLmFwcGVuZFRvKHRoaXMuZC4kZGF0ZXBpY2tlciksdGhpcy4kcmFuZ2VzPWUoJ1t0eXBlPVwicmFuZ2VcIl0nLHRoaXMuJHRpbWVwaWNrZXIpLHRoaXMuJGhvdXJzPWUoJ1tuYW1lPVwiaG91cnNcIl0nLHRoaXMuJHRpbWVwaWNrZXIpLHRoaXMuJG1pbnV0ZXM9ZSgnW25hbWU9XCJtaW51dGVzXCJdJyx0aGlzLiR0aW1lcGlja2VyKSx0aGlzLiRob3Vyc1RleHQ9ZShcIi5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtaG91cnNcIix0aGlzLiR0aW1lcGlja2VyKSx0aGlzLiRtaW51dGVzVGV4dD1lKFwiLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1taW51dGVzXCIsdGhpcy4kdGltZXBpY2tlciksdGhpcy5kLmFtcG0mJih0aGlzLiRhbXBtPWUoJzxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWFtcG1cIj4nKS5hcHBlbmRUbyhlKFwiLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudFwiLHRoaXMuJHRpbWVwaWNrZXIpKS5odG1sKHRoaXMuZGF5UGVyaW9kKSx0aGlzLiR0aW1lcGlja2VyLmFkZENsYXNzKFwiLWFtLXBtLVwiKSl9LF91cGRhdGVDdXJyZW50VGltZTpmdW5jdGlvbigpe3ZhciB0PXMuZ2V0TGVhZGluZ1plcm9OdW0odGhpcy5kaXNwbGF5SG91cnMpLGU9cy5nZXRMZWFkaW5nWmVyb051bSh0aGlzLm1pbnV0ZXMpO3RoaXMuJGhvdXJzVGV4dC5odG1sKHQpLHRoaXMuJG1pbnV0ZXNUZXh0Lmh0bWwoZSksdGhpcy5kLmFtcG0mJnRoaXMuJGFtcG0uaHRtbCh0aGlzLmRheVBlcmlvZCl9LF91cGRhdGVSYW5nZXM6ZnVuY3Rpb24oKXt0aGlzLiRob3Vycy5hdHRyKHttaW46dGhpcy5taW5Ib3VycyxtYXg6dGhpcy5tYXhIb3Vyc30pLnZhbCh0aGlzLmhvdXJzKSx0aGlzLiRtaW51dGVzLmF0dHIoe21pbjp0aGlzLm1pbk1pbnV0ZXMsbWF4OnRoaXMubWF4TWludXRlc30pLnZhbCh0aGlzLm1pbnV0ZXMpfSxfaGFuZGxlRGF0ZTpmdW5jdGlvbih0KXt0aGlzLl9zZXREZWZhdWx0TWluTWF4VGltZSgpLHQmJihzLmlzU2FtZSh0LHRoaXMuZC5vcHRzLm1pbkRhdGUpP3RoaXMuX3NldE1pblRpbWVGcm9tRGF0ZSh0aGlzLmQub3B0cy5taW5EYXRlKTpzLmlzU2FtZSh0LHRoaXMuZC5vcHRzLm1heERhdGUpJiZ0aGlzLl9zZXRNYXhUaW1lRnJvbURhdGUodGhpcy5kLm9wdHMubWF4RGF0ZSkpLHRoaXMuX3ZhbGlkYXRlSG91cnNNaW51dGVzKHQpfSx1cGRhdGU6ZnVuY3Rpb24oKXt0aGlzLl91cGRhdGVSYW5nZXMoKSx0aGlzLl91cGRhdGVDdXJyZW50VGltZSgpfSxfZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlOmZ1bmN0aW9uKHQsZSl7dmFyIGk9dCxhPXQ7dCBpbnN0YW5jZW9mIERhdGUmJihpPXMuZ2V0UGFyc2VkRGF0ZSh0KSxhPWkuaG91cnMpO3ZhciBuPWV8fHRoaXMuZC5hbXBtLGg9XCJhbVwiO2lmKG4pc3dpdGNoKCEwKXtjYXNlIDA9PWE6YT0xMjticmVhaztjYXNlIDEyPT1hOmg9XCJwbVwiO2JyZWFrO2Nhc2UgYT4xMTphLT0xMixoPVwicG1cIn1yZXR1cm57aG91cnM6YSxkYXlQZXJpb2Q6aH19LHNldCBob3Vycyh0KXt0aGlzLl9ob3Vycz10O3ZhciBlPXRoaXMuX2dldFZhbGlkSG91cnNGcm9tRGF0ZSh0KTt0aGlzLmRpc3BsYXlIb3Vycz1lLmhvdXJzLHRoaXMuZGF5UGVyaW9kPWUuZGF5UGVyaW9kfSxnZXQgaG91cnMoKXtyZXR1cm4gdGhpcy5faG91cnN9LF9vbkNoYW5nZVJhbmdlOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLHM9aS5hdHRyKFwibmFtZVwiKTt0aGlzLmQudGltZXBpY2tlcklzQWN0aXZlPSEwLHRoaXNbc109aS52YWwoKSx0aGlzLl91cGRhdGVDdXJyZW50VGltZSgpLHRoaXMuZC5fdHJpZ2dlcihcInRpbWVDaGFuZ2VcIixbdGhpcy5ob3Vycyx0aGlzLm1pbnV0ZXNdKSx0aGlzLl9oYW5kbGVEYXRlKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlKSx0aGlzLnVwZGF0ZSgpfSxfb25TZWxlY3REYXRlOmZ1bmN0aW9uKHQsZSl7dGhpcy5faGFuZGxlRGF0ZShlKSx0aGlzLnVwZGF0ZSgpfSxfb25Nb3VzZUVudGVyUmFuZ2U6ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkuYXR0cihcIm5hbWVcIik7ZShcIi5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtXCIraSx0aGlzLiR0aW1lcGlja2VyKS5hZGRDbGFzcyhcIi1mb2N1cy1cIil9LF9vbk1vdXNlT3V0UmFuZ2U6ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkuYXR0cihcIm5hbWVcIik7dGhpcy5kLmluRm9jdXN8fGUoXCIuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LVwiK2ksdGhpcy4kdGltZXBpY2tlcikucmVtb3ZlQ2xhc3MoXCItZm9jdXMtXCIpfSxfb25Nb3VzZVVwUmFuZ2U6ZnVuY3Rpb24odCl7dGhpcy5kLnRpbWVwaWNrZXJJc0FjdGl2ZT0hMX19fSgpfSh3aW5kb3csalF1ZXJ5KTsiLCJmdW5jdGlvbiBidG5yZWdpc3JhdGlvbigpIHtcclxuXHRsZXQgcmVnaXN0cl9idXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS10b3BfX2J1dHRvbi1yZWdpc3RlcicpO1xyXG5cdGxldCBjZW50ZXJfd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX2Jsb2snKTtcclxuXHRjb25zb2xlLmxvZyhyZWdpc3RyX2J1dHRvbik7XHJcblx0Y29uc29sZS5sb2coY2VudGVyX3dyYXApO1xyXG5cclxuXHRyZWdpc3RyX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGxldCBtYWluX3NlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXNlYXJjaC1mb3JtJyk7XHJcblx0XHRjZW50ZXJfd3JhcC5jbGFzc0xpc3QuYWRkKFwibWFpbl9iYWNrZ3JvdW5kXCIpO1xyXG5cdFx0Y2VudGVyX3dyYXAuc3R5bGUucGFkZGluZyA9ICcxOXB4IDE0MHB4JztcclxuXHRcdGNvbnNvbGUubG9nKG1haW5fc2VhcmNoKTtcclxuXHRcdG1haW5fc2VhcmNoLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5cdFx0Y2VudGVyX3dyYXAuaW5uZXJIVE1MID0gJ1xcdDxzZWN0aW9uIGNsYXNzPVwicmVnaXN0cmF0aW9uIHJlZ2lzdHJhdGlvbl9mb3JtXCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHQ8aDE+0KDQtdCz0LjRgdGC0YDQsNGG0LjRjyDQsNC60LrQsNGD0L3RgtCwPC9oMT5cXG4nICtcclxuXHRcdFx0J1xcdFxcdDxkaXYgY2xhc3M9XCJyZWdpc3RyYXRpb24tZmlyc3QtbmFtZVwiPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0PGlucHV0IGNsYXNzPVwicmVnaXN0cmF0aW9uLWZpcnN0LW5hbWVfaW5wdXQgdGV4dC1maWVsZF9zYW1wbGVcIiBuYW1lPVwidmlzaXRvcl9pbnB1dFwiIHBsYWNlaG9sZGVyPVwi0JjQvNGPXCIgdHlwZT1cInRleHRcIj5cXG4nICtcclxuXHRcdFx0J1xcdFxcdDwvZGl2PlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0PGRpdiBjbGFzcz1cInJlZ2lzdHJhdGlvbi1sYXN0LW5hbWVcIj5cXG4nICtcclxuXHRcdFx0J1xcdFxcdFxcdDxpbnB1dCBjbGFzcz1cInJlZ2lzdHJhdGlvbi1sYXN0LW5hbWVfaW5wdXQgdGV4dC1maWVsZF9zYW1wbGVcIiBuYW1lPVwidmlzaXRvcl9pbnB1dFwiIHBsYWNlaG9sZGVyPVwi0KTQsNC80LjQu9C40Y9cIiB0eXBlPVwidGV4dFwiPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0PC9kaXY+XFxuJyArXHJcblx0XHRcdCdcXHRcXHQ8ZGl2IGNsYXNzPVwicmVnaXN0cmF0aW9uLXNleFwiPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0PGRpdiBjbGFzcz1cInJlZ2lzdHJhdGlvbi1zZXhfbWFuXCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHRcXHQ8aW5wdXQgY2xhc3M9XCJyZWdpc3RyYXRpb24tc2V4X3JhZGlvXCIgdHlwZT1cInJhZGlvXCIgaWQ9XCJyYWRpb19tYW5cIiBuYW1lPVwic2V4XCIgdmFsdWU9XCJtYW5cIiBjaGVja2VkPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0XFx0PGxhYmVsIGZvcj1cInJhZGlvX21hblwiIGNsYXNzPVwicmVnaXN0cmF0aW9uLXNleF90ZXh0XCI+0JzRg9C20YfQuNC90LA8L2xhYmVsPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0PC9kaXY+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicmVnaXN0cmF0aW9uLXNleF93b21hblwiPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0XFx0PGlucHV0IGNsYXNzPVwicmVnaXN0cmF0aW9uLXNleF9yYWRpb1wiIHR5cGU9XCJyYWRpb1wiIGlkPVwicmFkaW9fd29tYW5cIiBuYW1lPVwic2V4XCIgdmFsdWU9XCJ3b21hblwiPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0XFx0PGxhYmVsIGZvcj1cInJhZGlvX3dvbWFuXCIgY2xhc3M9XCJyZWdpc3RyYXRpb24tc2V4X3RleHRcIj7QltC10L3RidC40L3QsDwvbGFiZWw+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcclxuXHRcdFx0J1xcdFxcdDwvZGl2PlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0PGRpdiBjbGFzcz1cImJpcnRoZGF5XCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHQ8cCBjbGFzcz1cImJpcnRoZGF5LXRleHRcIj7QlNCw0YLQsCDRgNC+0LbQtNC10L3QuNGPPC9wPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0PGRpdiBjbGFzcz1cImZvcm0tYmlydGhkYXlcIj5cXG4nICtcclxuXHRcdFx0J1xcdFxcdFxcdFxcdDxpbnB1dCBjbGFzcz1cImZvcm0tYmlydGhkYXlfaW5wdXQgdGV4dC1maWVsZF9zYW1wbGUgbWFza2VkLWZpZWxkX3NhbXBsZVwiIG5hbWU9XCJiaXJ0aGRheV9pbnB1dFwiIHBsYWNlaG9sZGVyPVwi0JTQlC7QnNCcLtCT0JPQk9CTXCIgdHlwZT1cInRleHRcIj5cXG4nICtcclxuXHRcdFx0J1xcdFxcdFxcdDwvZGl2PlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0PC9kaXY+XFxuJyArXHJcblx0XHRcdCdcXHRcXHQ8ZGl2IGNsYXNzPVwibG9naW5zXCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHQ8cCBjbGFzcz1cImxvZ2lucy10ZXh0XCI+0JTQsNC90L3Ri9C1INC00LvRjyDQstGF0L7QtNCwINCyINGB0LXRgNCy0LjRgTwvcD5cXG4nICtcclxuXHRcdFx0J1xcdFxcdFxcdDxkaXYgY2xhc3M9XCJmb3JtLWxvZ2luc1wiPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0XFx0PGlucHV0IGNsYXNzPVwiZm9ybS1sb2dpbnNfbG9naW4gdGV4dC1maWVsZF9zYW1wbGVcIiBuYW1lPVwibG9naW5faW5wdXRcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdHlwZT1cImVtYWlsXCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHRcXHQ8aW5wdXQgY2xhc3M9XCJmb3JtLWxvZ2luc19wYXN3b3JkIHRleHQtZmllbGRfc2FtcGxlXCIgbmFtZT1cInBhc3dvcmRfaW5wdXRcIiBwbGFjZWhvbGRlcj1cItCf0LDRgNC+0LvRjFwiIHR5cGU9XCJwYXNzd29yZFwiPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0PC9kaXY+XFxuJyArXHJcblx0XHRcdCdcXHRcXHQ8L2Rpdj5cXG4nICtcclxuXHRcdFx0J1xcdFxcdDxkaXYgY2xhc3M9XCJtYWlsaW5nXCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHQ8bGFiZWwgY2xhc3M9XCJtYWlsaW5nLWNoZWNrXCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHRcXHQ8aW5wdXQgY2xhc3M9XCJtYWlsaW5nLWNoZWNrX2lucHV0XCIgbmFtZT1cIm1haWxpbmdfaW5wdXRcIiBwbGFjZWhvbGRlcj1cItCf0L7Qu9GD0YfQsNGC0Ywg0YHQv9C10YbQv9GA0LXQtNC70L7QttC10L3QuNGPXCIgdHlwZT1cImNoZWNrYm94XCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHRcXHQ8c3BhbiBjbGFzcz1cIm1haWxpbmctdGV4dFwiPtCf0L7Qu9GD0YfQsNGC0Ywg0YHQv9C10YbQv9GA0LXQtNC70L7QttC10L3QuNGPPC9zcGFuPlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0XFx0PC9sYWJlbD5cXG4nICtcclxuXHRcdFx0J1xcbicgK1xyXG5cdFx0XHQnXFx0XFx0PC9kaXY+XFxuJyArXHJcblx0XHRcdCdcXHRcXHQ8ZGl2IGNsYXNzPVwicGF5bWVudC1idXR0b24gYnV0dG9uLWFycm93XCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHQ8cCBjbGFzcz1cInBheW1lbnQtYnV0dG9uX3Jlc3VsdCBidXR0b24tYXJyb3dfY2tsaWtcIj7Qt9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y88c3BhbiBjbGFzcz1cInBheW1lbnQtYnV0dG9uX3Jlc3VsdF9pY29uIGJ1dHRvbi1hcnJvd19pY29uXCI+PC9zcGFuPjwvcD5cXG4nICtcclxuXHRcdFx0J1xcdFxcdDwvZGl2PlxcbicgK1xyXG5cdFx0XHQnXFx0XFx0PGRpdiBjbGFzcz1cImVudHJ5XCI+XFxuJyArXHJcblx0XHRcdCdcXHRcXHRcXHQ8cCBjbGFzcz1cImVudHJ5LXRleHRcIj7Qo9C20LUg0LXRgdGC0Ywg0LDQutC60LDRg9C90YIg0L3QsCBUb3hpbjwvcD5cXG4nICtcclxuXHRcdFx0J1xcdFxcdFxcdDxkaXYgY2xhc3M9XCJlbnRyeXQtYnV0dG9uIGNrbGlrLWJ1dHRvblwiIHZhbHVlPVwi0JLQntCZ0KLQmFwiPjxkaXYgY2xhc3M9XCJlbnRyeXQtYnV0dG9uX3Jlc3VsdCBja2xpay1idXR0b25fd2l0ZVwiPtCS0J7QmdCi0Jg8L2Rpdj48L2Rpdj5cXG4nICtcclxuXHRcdFx0J1xcdFxcdDwvZGl2PlxcbicgK1xyXG5cdFx0XHQnXFx0PC9zZWN0aW9uPic7XHJcblx0XHQvL9GB0Y7QtNCwINC/0YDQvtC/0LjRgdCw0YLRjCDRgdC80LXQvdGDINCx0Y3QutCz0YDQsNGD0L3QtNCwIG1haW5fYmxvayDQuCDRgdC60YDRi9GC0Ywgc2VjdGlvbiBjbGFzcz1cIm1haW4tc2VhcmNoLWZvcm1cIiAg0Lgg0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0YHQtdC60YbQuNGOINGA0LXQs9C40YHRgtGA0LDRhtC40LhcclxuXHJcblx0XHRsZXQgcmVnX2J1dHRvbl9mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBheW1lbnQtYnV0dG9uJyk7XHJcblx0XHRjb25zb2xlLmxvZyhyZWdfYnV0dG9uX2Zvcm0pO1xyXG5cdFx0aWYgKHJlZ19idXR0b25fZm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdHJlZ19idXR0b25fZm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQvL2xldCBtYWluX3NlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXNlYXJjaC1mb3JtJyk7XHJcblx0XHRcdFx0Y2VudGVyX3dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIm1haW5fYmFja2dyb3VuZFwiKTtcclxuXHRcdFx0XHRjZW50ZXJfd3JhcC5zdHlsZS5wYWRkaW5nID0gJzcwcHggMTQwcHgnO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKG1haW5fc2VhcmNoKTtcclxuXHRcdFx0XHRtYWluX3NlYXJjaC5zdHlsZS5kaXNwbGF5ID0gJ2Rpc3BsYXknO1xyXG5cdFx0XHRcdGxldCBtYWluX3JlZ2lzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlZ2lzdHJhdGlvbicpO1xyXG5cdFx0XHRcdG1haW5fcmVnaXN0ZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly9sZXQgcmVnX2J1dHRvbl9mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBheW1lbnQtYnV0dG9uJyk7XHJcblx0Ly9jb25zb2xlLmxvZyhyZWdfYnV0dG9uX2Zvcm0pO1xyXG5cclxuXHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnRucmVnaXNyYXRpb24oKTtcclxuXHJcbi8vaW5uZXJIVE1MIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8v77+977+977+977+977+977+977+977+977+977+9IGpRdWVyeSDvv70g77+977+977+977+977+977+9LCDvv73vv70g77+977+977+977+977+977+9IO+/vSBodG1sXHJcbi8vaW1wb3J0ICdqcXVlcnktMy40LjEubWluLmpzJztcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbi8vLS0tLS0tLe+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70tLS0tLS0tLS0tLS0tLS0tLy9cclxuLy8tLS0tLS0t77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/vS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbmltcG9ydCAnLi9tb2R1bGVzL2xvZ28vbG9nby5jc3MnOyAgICAgICAgICAgICAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b24uY3NzJzsgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b25hcnJvdy5jc3MnOy8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b253aXRlLmNzcyc7IC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvbWFpbnRleHQvbWFpbnRleHQuY3NzJzsgICAgICAgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvZm9vdGVyL2NvbXBhbnkvYWR2ZXJ0LmNzcyc7ICAgICAgIC8v77+977+977+977+977+977+977+9IO+/ve+/ve+/vSDvv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvZm9vdGVyL2NvbXBhbnkvY29tcGFueS5jc3MnOyAgICAgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/vSDvv70g77+977+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL2Zvb3Rlci9jb3B5cml0ZS9jb3B5cml0ZS5jc3MnOyAgICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvZm9vdGVyL3NvY2lhbC9zb2NpYWwuY3NzJzsgICAgICAgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy90ZXh0ZmllbGQvdGV4dGZpZWxkLmNzcyc7ICAgICAgICAgLy/vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL3JhZGlvYnV0dG9uL3JhZGlvYnV0dG9uLmNzcyc7ICAgICAvL++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvbWFza2VkZmllbGQvbWFza2VkZmllbGQuY3NzJzsgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv70g77+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL3RvZ2dsZWJ1dHRvbi90b2dnbGVidXR0b24uY3NzJzsgICAvL++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv70v77+977+977+9XHJcbi8vLS0tLS0tY3NzIO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70tLS0tLS0tLS0tLS0tLS0tLy9cclxuaW1wb3J0ICcuL2Nzcy9zdHlsZS5jc3MnOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v77+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv70g77+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9IO+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvaGVhZGVyL2hlYWRlci1zdHlsZS5jc3MnOyAgICAgICAgIC8v77+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvbWVudXRvcC9tZW51dG9wLmNzcyc7ICAgICAgICAgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvc2VhcmNoZm9ybS9zZWFyY2hmb3JtLmNzcyc7ICAgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvZm9vdGVyL2Zvb3RlcnN0eWxlLmNzcyc7ICAgICAgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv70g77+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL2Zvb3Rlci9tZW51L2Zvb3Rlcm1lbnUuY3NzJzsgICAgICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvZm9vdGVyL3N1YnNjcmliZS9zdWJzY3JpYmUuY3NzJzsgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmNzcyc7ICAgLy/vv73vv73vv73vv70g77+977+977+977+977+977+977+977+977+977+977+9XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbi8v77+977+977+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv71cclxuLy9pbXBvcnQgJy4vZm9ybWVsZW1lbnQuaHRtbCc7XHJcbi8vaW1wb3J0IGh0bWwgZnJvbSBcIi4vZm9ybWVsZW1lbnQuaHRtbFwiO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4vL++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSBkYXRlcGlja2VyXHJcbmltcG9ydCAnLi9tb2R1bGVzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5jc3MnO1xyXG5pbXBvcnQgJy4vbW9kdWxlcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIubWluLmNzcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5taW4uanMnO1xyXG5pbXBvcnQgJy4vbW9kdWxlcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuanMnO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbi8v77+977+977+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG4vL2ltcG9ydCBidG5Db3VudCBmcm9tICcuL2J1dHRvbi5qcyc7XHJcbmltcG9ydCBidG5yZWdpc3JhdGlvbiBmcm9tICcuL21vZHVsZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5qcyc7ICAgICAgICAgLy/vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv71cclxuLy9pbXBvcnQgXCIuL2pxdWVyeS0zLjQuMS5taW4uanNcIjtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbi8vIO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuLy9pbXBvcnQgSWNvbiBmcm9tICcuL2ljb24ucG5nJztcclxuIl0sIm5hbWVzIjpbIndpbmRvdyIsIiQiLCJ1bmRlZmluZWQiLCJWRVJTSU9OIiwicGx1Z2luTmFtZSIsImF1dG9Jbml0U2VsZWN0b3IiLCIkYm9keSIsIiRkYXRlcGlja2Vyc0NvbnRhaW5lciIsImNvbnRhaW5lckJ1aWx0IiwiYmFzZVRlbXBsYXRlIiwiZGVmYXVsdHMiLCJjbGFzc2VzIiwiaW5saW5lIiwibGFuZ3VhZ2UiLCJzdGFydERhdGUiLCJEYXRlIiwiZmlyc3REYXkiLCJ3ZWVrZW5kcyIsImRhdGVGb3JtYXQiLCJhbHRGaWVsZCIsImFsdEZpZWxkRGF0ZUZvcm1hdCIsInRvZ2dsZVNlbGVjdGVkIiwia2V5Ym9hcmROYXYiLCJwb3NpdGlvbiIsIm9mZnNldCIsInZpZXciLCJtaW5WaWV3Iiwic2hvd090aGVyTW9udGhzIiwic2VsZWN0T3RoZXJNb250aHMiLCJtb3ZlVG9PdGhlck1vbnRoc09uU2VsZWN0Iiwic2hvd090aGVyWWVhcnMiLCJzZWxlY3RPdGhlclllYXJzIiwibW92ZVRvT3RoZXJZZWFyc09uU2VsZWN0IiwibWluRGF0ZSIsIm1heERhdGUiLCJkaXNhYmxlTmF2V2hlbk91dE9mUmFuZ2UiLCJtdWx0aXBsZURhdGVzIiwibXVsdGlwbGVEYXRlc1NlcGFyYXRvciIsInJhbmdlIiwidG9kYXlCdXR0b24iLCJjbGVhckJ1dHRvbiIsInNob3dFdmVudCIsImF1dG9DbG9zZSIsIm1vbnRoc0ZpZWxkIiwicHJldkh0bWwiLCJuZXh0SHRtbCIsIm5hdlRpdGxlcyIsImRheXMiLCJtb250aHMiLCJ5ZWFycyIsInRpbWVwaWNrZXIiLCJvbmx5VGltZXBpY2tlciIsImRhdGVUaW1lU2VwYXJhdG9yIiwidGltZUZvcm1hdCIsIm1pbkhvdXJzIiwibWF4SG91cnMiLCJtaW5NaW51dGVzIiwibWF4TWludXRlcyIsImhvdXJzU3RlcCIsIm1pbnV0ZXNTdGVwIiwib25TZWxlY3QiLCJvblNob3ciLCJvbkhpZGUiLCJvbkNoYW5nZU1vbnRoIiwib25DaGFuZ2VZZWFyIiwib25DaGFuZ2VEZWNhZGUiLCJvbkNoYW5nZVZpZXciLCJvblJlbmRlckNlbGwiLCJob3RLZXlzIiwiZGF0ZXBpY2tlciIsIkRhdGVwaWNrZXIiLCJlbCIsIm9wdGlvbnMiLCIkZWwiLCJvcHRzIiwiZXh0ZW5kIiwiZGF0YSIsIm5vZGVOYW1lIiwiZWxJc0lucHV0IiwiJGFsdEZpZWxkIiwiaW5pdGVkIiwidmlzaWJsZSIsInNpbGVudCIsImN1cnJlbnREYXRlIiwiY3VycmVudFZpZXciLCJfY3JlYXRlU2hvcnRDdXRzIiwic2VsZWN0ZWREYXRlcyIsInZpZXdzIiwia2V5cyIsIm1pblJhbmdlIiwibWF4UmFuZ2UiLCJfcHJldk9uU2VsZWN0VmFsdWUiLCJpbml0IiwicHJvdG90eXBlIiwidmlld0luZGV4ZXMiLCJfYnVpbGREYXRlcGlja2Vyc0NvbnRhaW5lciIsIl9idWlsZEJhc2VIdG1sIiwiX2RlZmluZUxvY2FsZSIsIl9zeW5jV2l0aE1pbk1heERhdGVzIiwiX3NldFBvc2l0aW9uQ2xhc3NlcyIsIl9iaW5kRXZlbnRzIiwiX2JpbmRLZXlib2FyZEV2ZW50cyIsIiRkYXRlcGlja2VyIiwib24iLCJfb25Nb3VzZURvd25EYXRlcGlja2VyIiwiYmluZCIsIl9vbk1vdXNlVXBEYXRlcGlja2VyIiwiYWRkQ2xhc3MiLCJmbiIsIlRpbWVwaWNrZXIiLCJfYmluZFRpbWVwaWNrZXJFdmVudHMiLCJCb2R5Iiwic2hvdyIsIm5hdiIsIk5hdmlnYXRpb24iLCJfb25DbGlja0NlbGwiLCJfb25Nb3VzZUVudGVyQ2VsbCIsIl9vbk1vdXNlTGVhdmVDZWxsIiwiX29uU2hvd0V2ZW50IiwiX29uTW91c2VVcEVsIiwiX29uQmx1ciIsIl9vbktleVVwR2VuZXJhbCIsIl9vblJlc2l6ZSIsIl9vbk1vdXNlVXBCb2R5IiwiX29uS2V5RG93biIsIl9vbktleVVwIiwiX29uSG90S2V5IiwiX29uVGltZUNoYW5nZSIsImlzV2Vla2VuZCIsImRheSIsImluZGV4T2YiLCJsYW5nIiwibG9jIiwiY29uc29sZSIsIndhcm4iLCJydSIsImpvaW4iLCJib3VuZGFyeSIsIl9nZXRXb3JkQm91bmRhcnlSZWdFeHAiLCJtYXRjaCIsImFtcG0iLCJhcHBlbmQiLCIkYXBwZW5kVGFyZ2V0IiwiJGlubGluZSIsImluc2VydEFmdGVyIiwiYXBwZW5kVG8iLCIkY29udGVudCIsIiRuYXYiLCJfdHJpZ2dlck9uQ2hhbmdlIiwibGVuZ3RoIiwicGFyc2VkU2VsZWN0ZWQiLCJnZXRQYXJzZWREYXRlIiwiZm9ybWF0dGVkRGF0ZXMiLCJfdGhpcyIsImRhdGVzIiwieWVhciIsIm1vbnRoIiwiZGF0ZSIsImhvdXJzIiwibWludXRlcyIsIm1hcCIsImZvcm1hdERhdGUiLCJwYXJzZWREYXRlIiwibmV4dCIsImQiLCJvIiwiY3VyRGVjYWRlIiwicHJldiIsInN0cmluZyIsInJlc3VsdCIsImxvY2FsZSIsImxlYWRpbmdaZXJvIiwiZ2V0TGVhZGluZ1plcm9OdW0iLCJkZWNhZGUiLCJnZXREZWNhZGUiLCJmdWxsSG91cnMiLCJkYXlQZXJpb2QiLCJyZXBsYWNlciIsIl9yZXBsYWNlciIsInZhbGlkSG91cnMiLCJfZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlIiwidGVzdCIsInJlcGxhY2UiLCJnZXRUaW1lIiwidG9VcHBlckNhc2UiLCJmdWxsRGF0ZSIsImRheXNTaG9ydCIsImZ1bGxNb250aCIsIm1vbnRoc1Nob3J0IiwiZnVsbE1pbnV0ZXMiLCJ0b1N0cmluZyIsInNsaWNlIiwic3RyIiwicmVnIiwicDEiLCJwMiIsInAzIiwic2lnbiIsInN5bWJvbHMiLCJSZWdFeHAiLCJzZWxlY3REYXRlIiwibGVuIiwibmV3RGF0ZSIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJsYXN0U2VsZWN0ZWREYXRlIiwiX3NldFRpbWUiLCJfdHJpZ2dlciIsInNldEhvdXJzIiwic2V0TWludXRlcyIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJfcmVuZGVyIiwiX2lzU2VsZWN0ZWQiLCJwdXNoIiwiYmlnZ2VyIiwiX3NldElucHV0VmFsdWUiLCJ0aW1lcGlja2VySXNBY3RpdmUiLCJoaWRlIiwicmVtb3ZlRGF0ZSIsInNlbGVjdGVkIiwic29tZSIsImN1ckRhdGUiLCJpIiwiaXNTYW1lIiwic3BsaWNlIiwidG9kYXkiLCJjbGVhciIsInVwZGF0ZSIsInBhcmFtIiwidmFsdWUiLCJhcmd1bWVudHMiLCJfYWRkQnV0dG9uc0lmTmVlZCIsInNldFBvc2l0aW9uIiwiX2hhbmRsZURhdGUiLCJfdXBkYXRlUmFuZ2VzIiwiX3VwZGF0ZUN1cnJlbnRUaW1lIiwiY3VyVGltZSIsIm1pblRpbWUiLCJtYXhUaW1lIiwiY2hlY2tEYXRlIiwiY2VsbFR5cGUiLCJyZXMiLCJmb3JtYXQiLCJhbHRGb3JtYXQiLCJhbHRWYWx1ZXMiLCJ2YWwiLCJfaXNJblJhbmdlIiwidHlwZSIsInRpbWUiLCJtaW4iLCJtYXgiLCJkTWluVGltZSIsImRNYXhUaW1lIiwidHlwZXMiLCJfZ2V0RGltZW5zaW9ucyIsIndpZHRoIiwib3V0ZXJXaWR0aCIsImhlaWdodCIsIm91dGVySGVpZ2h0IiwibGVmdCIsInRvcCIsIl9nZXREYXRlRnJvbUNlbGwiLCJjZWxsIiwicG9zIiwic3BsaXQiLCJtYWluIiwic2VjIiwicmVtb3ZlQXR0ciIsImRpbXMiLCJzZWxmRGltcyIsInNlY29uZGFyeSIsImNzcyIsIl9iaW5kVmlzaW9uRXZlbnRzIiwicmVtb3ZlQ2xhc3MiLCJmb2N1c2VkIiwiaW5Gb2N1cyIsImJsdXIiLCJkb3duIiwiX2NoYW5nZVZpZXciLCJ1cCIsImV2ZW50Iiwib2ZmIiwib25lIiwiZGlyIiwibmV4dFZpZXciLCJ2aWV3SW5kZXgiLCJfaGFuZGxlSG90S2V5Iiwia2V5IiwiX2dldEZvY3VzZWREYXRlIiwiZm9jdXNlZFBhcnNlZCIsInRvdGFsRGF5c0luTmV4dE1vbnRoIiwibW9udGhDaGFuZ2VkIiwieWVhckNoYW5nZWQiLCJkZWNhZGVDaGFuZ2VkIiwieSIsIm0iLCJnZXREYXlzQ291bnQiLCJfcmVnaXN0ZXJLZXkiLCJleGlzdHMiLCJjdXJLZXkiLCJfdW5SZWdpc3RlcktleSIsImluZGV4IiwiX2lzSG90S2V5UHJlc3NlZCIsImN1cnJlbnRIb3RLZXkiLCJmb3VuZCIsInByZXNzZWRLZXlzIiwic29ydCIsImhvdEtleSIsImV2ZXJ5IiwiYXJncyIsInRyaWdnZXIiLCJfZm9jdXNOZXh0Q2VsbCIsImtleUNvZGUiLCJuZCIsImdldERhdGUiLCJfZ2V0Q2VsbCIsInNlbGVjdG9yIiwiJGNlbGwiLCJmaW5kIiwiZGVzdHJveSIsImNsb3Nlc3QiLCJyZW1vdmUiLCJfaGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXMiLCJhbHJlYWR5U2VsZWN0ZWQiLCJzZWxlY3RlZERhdGUiLCJlIiwib3JpZ2luYWxFdmVudCIsInRpbWVwaWNrZXJGb2N1cyIsImZvY3VzIiwic2V0VGltZW91dCIsImNvZGUiLCJ3aGljaCIsInByZXZlbnREZWZhdWx0IiwiaGFzQ2xhc3MiLCJ0YXJnZXQiLCJsZXNzIiwiX3VwZGF0ZSIsImgiLCJfZm9jdXNlZCIsInByZXZWaWV3Iiwic3Vic3RyaW5nIiwiZ2V0RGF5IiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZmlyc3RZZWFyIiwiTWF0aCIsImZsb29yIiwidGVtcGxhdGUiLCJzb3VyY2UiLCJkYXRlMSIsImRhdGUyIiwiZDEiLCJkMiIsIl90eXBlIiwiY29uZGl0aW9ucyIsImRhdGVDb21wYXJlVG8iLCJudW0iLCJwYXJzZUludCIsInJlc2V0VGltZSIsImVhY2giLCJDb25zdHJ1Y3RvciIsImRheXNNaW4iLCJ0ZW1wbGF0ZXMiLCJkcCIsInByb3h5IiwiJG5hbWVzIiwiJGNlbGxzIiwiX2dldERheU5hbWVzSHRtbCIsImN1ckRheSIsImh0bWwiLCJfZ2V0Q2VsbENvbnRlbnRzIiwicGFyZW50IiwicmVuZGVyIiwiZGlzYWJsZWQiLCJfZ2V0RGF5c0h0bWwiLCJ0b3RhbE1vbnRoRGF5cyIsImZpcnN0TW9udGhEYXkiLCJsYXN0TW9udGhEYXkiLCJkYXlzRnJvbVBldk1vbnRoIiwiZGF5c0Zyb21OZXh0TW9udGgiLCJzdGFydERheUluZGV4IiwiX2dldERheUh0bWwiLCJjb250ZW50IiwiX2dldE1vbnRoc0h0bWwiLCJfZ2V0TW9udGhIdG1sIiwiX2dldFllYXJzSHRtbCIsIl9nZXRZZWFySHRtbCIsIl9yZW5kZXJUeXBlcyIsImRheU5hbWVzIiwiYXR0ciIsImFjaXR2ZSIsImFjdGl2ZSIsIl9oYW5kbGVDbGljayIsImJ1dHRvbnNDb250YWluZXJUZW1wbGF0ZSIsImJ1dHRvbiIsIiRidXR0b25zQ29udGFpbmVyIiwiX29uQ2xpY2tOYXZCdXR0b24iLCJfb25DbGlja05hdlRpdGxlIiwiX2FkZEJ1dHRvbiIsInRpdGxlIiwiX2dldFRpdGxlIiwic2V0TmF2U3RhdHVzIiwiX2FkZEJ1dHRvbnNDb250YWluZXIiLCJhY3Rpb24iLCJsYWJlbCIsIl9kaXNhYmxlTmF2IiwiX2FjdGl2YXRlTmF2IiwiaW5zdCIsImlucHV0IiwiX2J1aWxkSFRNTCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIl9vblNlbGVjdERhdGUiLCIkcmFuZ2VzIiwiX29uQ2hhbmdlUmFuZ2UiLCJfb25Nb3VzZVVwUmFuZ2UiLCJfb25Nb3VzZUVudGVyUmFuZ2UiLCJfb25Nb3VzZU91dFJhbmdlIiwiX2RhdGUiLCJfc2V0TWluVGltZUZyb21EYXRlIiwiX3NldE1heFRpbWVGcm9tRGF0ZSIsIl9zZXREZWZhdWx0TWluTWF4VGltZSIsIl92YWxpZGF0ZUhvdXJzTWludXRlcyIsImx6IiwiaG91ck1pbiIsImhvdXJNYXgiLCJob3VyU3RlcCIsImhvdXJWYWx1ZSIsImhvdXJWaXNpYmxlIiwiZGlzcGxheUhvdXJzIiwibWluTWluIiwibWluTWF4IiwibWluU3RlcCIsIm1pblZhbHVlIiwiX3RlbXBsYXRlIiwiJHRpbWVwaWNrZXIiLCIkaG91cnMiLCIkbWludXRlcyIsIiRob3Vyc1RleHQiLCIkbWludXRlc1RleHQiLCIkYW1wbSIsIl9hbXBtIiwiX2hvdXJzIiwiJHRhcmdldCIsIm5hbWUiLCJqUXVlcnkiLCJ0IiwicyIsImEiLCJuIiwiciIsImMiLCJsIiwidSIsImN0cmxSaWdodCIsImN0cmxVcCIsImN0cmxMZWZ0IiwiY3RybERvd24iLCJzaGlmdFJpZ2h0Iiwic2hpZnRVcCIsInNoaWZ0TGVmdCIsInNoaWZ0RG93biIsImFsdFVwIiwiYWx0UmlnaHQiLCJhbHRMZWZ0IiwiYWx0RG93biIsImN0cmxTaGlmdFVwIiwicCIsImJ0bnJlZ2lzcmF0aW9uIiwicmVnaXN0cl9idXR0b24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjZW50ZXJfd3JhcCIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJtYWluX3NlYXJjaCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwicGFkZGluZyIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJyZWdfYnV0dG9uX2Zvcm0iLCJtYWluX3JlZ2lzdGVyIl0sInNvdXJjZVJvb3QiOiIifQ==