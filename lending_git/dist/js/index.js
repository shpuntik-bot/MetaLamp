/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./block/datepicker/datepicker.js":
/*!****************************************!*\
  !*** ./block/datepicker/datepicker.js ***!
  \****************************************/
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
      prevHtml: '<svg class="svg-back"></svg>',
      nextHtml: '<svg class="svg-next"></svg>',
      navTitles: {
        days: 'MM <i>yyyy</i>',
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
        daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
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

/***/ "./block/datepicker/datepicker.css":
/*!*****************************************!*\
  !*** ./block/datepicker/datepicker.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/footer/company/advert.css":
/*!*****************************************!*\
  !*** ./block/footer/company/advert.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/footer/company/company.css":
/*!******************************************!*\
  !*** ./block/footer/company/company.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/footer/copyrite/copyrite.css":
/*!********************************************!*\
  !*** ./block/footer/copyrite/copyrite.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/footer/footerstyle.css":
/*!**************************************!*\
  !*** ./block/footer/footerstyle.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/footer/menu/footermenu.css":
/*!******************************************!*\
  !*** ./block/footer/menu/footermenu.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/footer/social/social.css":
/*!****************************************!*\
  !*** ./block/footer/social/social.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/footer/subscribe/subscribe.css":
/*!**********************************************!*\
  !*** ./block/footer/subscribe/subscribe.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/header/header-style.css":
/*!***************************************!*\
  !*** ./block/header/header-style.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/menutop/menutop.css":
/*!***********************************!*\
  !*** ./block/menutop/menutop.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/registration/registration.css":
/*!*********************************************!*\
  !*** ./block/registration/registration.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./block/searchform/searchform.css":
/*!*****************************************!*\
  !*** ./block/searchform/searchform.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/font.css":
/*!**********************!*\
  !*** ./css/font.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "./modules/datedrop/datedrop.css":
/*!***************************************!*\
  !*** ./modules/datedrop/datedrop.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/dropdown/dropdown.css":
/*!***************************************!*\
  !*** ./modules/dropdown/dropdown.css ***!
  \***************************************/
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

/***/ "./modules/radiobutton/radiobutton.css":
/*!*********************************************!*\
  !*** ./modules/radiobutton/radiobutton.css ***!
  \*********************************************/
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
/* harmony import */ var _css_font_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/font.css */ "./css/font.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/style.css */ "./css/style.css");
/* harmony import */ var _modules_logo_logo_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/logo/logo.css */ "./modules/logo/logo.css");
/* harmony import */ var _modules_cklikbutton_cklikbutton_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbutton.css */ "./modules/cklikbutton/cklikbutton.css");
/* harmony import */ var _modules_cklikbutton_cklikbuttonarrow_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbuttonarrow.css */ "./modules/cklikbutton/cklikbuttonarrow.css");
/* harmony import */ var _modules_cklikbutton_cklikbuttonwite_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbuttonwite.css */ "./modules/cklikbutton/cklikbuttonwite.css");
/* harmony import */ var _modules_maintext_maintext_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/maintext/maintext.css */ "./modules/maintext/maintext.css");
/* harmony import */ var _modules_textfield_textfield_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/textfield/textfield.css */ "./modules/textfield/textfield.css");
/* harmony import */ var _modules_radiobutton_radiobutton_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/radiobutton/radiobutton.css */ "./modules/radiobutton/radiobutton.css");
/* harmony import */ var _modules_maskedfield_maskedfield_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/maskedfield/maskedfield.css */ "./modules/maskedfield/maskedfield.css");
/* harmony import */ var _modules_togglebutton_togglebutton_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/togglebutton/togglebutton.css */ "./modules/togglebutton/togglebutton.css");
/* harmony import */ var _modules_datedrop_datedrop_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/datedrop/datedrop.css */ "./modules/datedrop/datedrop.css");
/* harmony import */ var _modules_dropdown_dropdown_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/dropdown/dropdown.css */ "./modules/dropdown/dropdown.css");
/* harmony import */ var _block_header_header_style_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./block/header/header-style.css */ "./block/header/header-style.css");
/* harmony import */ var _block_menutop_menutop_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./block/menutop/menutop.css */ "./block/menutop/menutop.css");
/* harmony import */ var _block_searchform_searchform_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./block/searchform/searchform.css */ "./block/searchform/searchform.css");
/* harmony import */ var _block_footer_footerstyle_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./block/footer/footerstyle.css */ "./block/footer/footerstyle.css");
/* harmony import */ var _block_footer_menu_footermenu_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./block/footer/menu/footermenu.css */ "./block/footer/menu/footermenu.css");
/* harmony import */ var _block_footer_subscribe_subscribe_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./block/footer/subscribe/subscribe.css */ "./block/footer/subscribe/subscribe.css");
/* harmony import */ var _block_footer_company_advert_css__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./block/footer/company/advert.css */ "./block/footer/company/advert.css");
/* harmony import */ var _block_footer_company_company_css__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./block/footer/company/company.css */ "./block/footer/company/company.css");
/* harmony import */ var _block_footer_copyrite_copyrite_css__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./block/footer/copyrite/copyrite.css */ "./block/footer/copyrite/copyrite.css");
/* harmony import */ var _block_footer_social_social_css__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./block/footer/social/social.css */ "./block/footer/social/social.css");
/* harmony import */ var _block_registration_registration_css__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./block/registration/registration.css */ "./block/registration/registration.css");
/* harmony import */ var _block_datepicker_datepicker_css__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./block/datepicker/datepicker.css */ "./block/datepicker/datepicker.css");
/* harmony import */ var _block_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./block/datepicker/datepicker.js */ "./block/datepicker/datepicker.js");
/* harmony import */ var _block_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_block_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_25__);
//���� ���������� ������ �� ��� ����� ��� ���� �������!!!!!!!!!!!!
//���������� jQuery � ������, �� ������ � html
//import $ from 'jquery';        //����� �� nodemodules
//import * as $ from 'jquery';
//global.jQuery = $;
//global.$ = $;
//-----------------------------------------//
//-------����������� ������----------------//
//-------����� �����-----------------------//
 //����� �������

 //�������� ����� �������� �� ������� ������������ ������ � ��������

 //����� ��������
//-------����� �������---------------------//

 //����� ����� ������

 //����� ����� ������ � ����� ��������

 //����� ����� ������

 //����� ������ ��������

 //��������� �����

 //������������� �����������

 //����� ����� � ����

 //������������� ��/���

 //���� ����� ����

 //���������� ������
//import './modules/rangeslider/rangeslider.css';  //������ ��������
//------css �������� ������----------------//
//import './css/searchroom.css';                      //����� �������� ������ ������

 //�������� ����� ������

 //����� �������� ����

 //����� ������ �������

 //����� ����� ��� ������

 //���� ����

 //���� ��������

 //������� ��� ����

 //���� ���� � �������

 //���� ���������

 //���� ��������

 //���� �����������
//import './block/calendar/calendar.css';           //���� ������ ���������
//import './block/visitor/visitor.css';             //���� ������ ����������� ������
//---------------------------//
//����������� ��������� �������
//import './formelement.html';
//import html from 'registration.html';
//---------------------------//
//---------------------------//
//����������� ��������
//simport './block/calendar/calendar.js';
//import './block/searchform/searchform.js';
//import './block/visitor/visitor.js';
//import './js/searchroom.js';              //������ ����������� ������
//import './modules/rangeslider/rangeslider.js';        //������ ��������
//import btnCount from './button.js';
//import btnregisration from './modules/registration/registration.js';         //������ ������ ����� �����������
//---------------------------//
//����������� datepicker
//import './block/datepicker/datepicker.css';
//import './block/datepicker/datepicker.js';
//import './block/datepicker/datepicker.min.css';
//import './block/datepicker/datepicker.min.js';


 //---------------------------------//
//import "./jquery-3.4.1.min.js";
//---------------------------//
//--------------����������� ��������---------------
//import Icon from './icon.png';
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Q0FDb0Q7O0NBQ0E7O0NBQ0E7QUFDcEQ7O0NBRW9EOztDQUNBOztDQUNBOztDQUNBOztDQUNBOztDQUNBOztDQUNBOztDQUNBOztDQUNBOztDQUNBO0FBQ3BEO0FBRUE7QUFFQTs7Q0FDa0Q7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7QUFDbEQ7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7Q0FFQTtBQUVBO0FBRUE7QUFFQTtBQUNBLGdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYmxvY2svZGF0ZXBpY2tlci9kYXRlcGlja2VyLmpzIiwid2VicGFjazovLy8uL2Jsb2NrL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5jc3M/NjAyNiIsIndlYnBhY2s6Ly8vLi9ibG9jay9mb290ZXIvY29tcGFueS9hZHZlcnQuY3NzP2MyYTkiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svZm9vdGVyL2NvbXBhbnkvY29tcGFueS5jc3M/MjE2NiIsIndlYnBhY2s6Ly8vLi9ibG9jay9mb290ZXIvY29weXJpdGUvY29weXJpdGUuY3NzP2I4N2QiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svZm9vdGVyL2Zvb3RlcnN0eWxlLmNzcz9hNDNmIiwid2VicGFjazovLy8uL2Jsb2NrL2Zvb3Rlci9tZW51L2Zvb3Rlcm1lbnUuY3NzPzI1Y2EiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svZm9vdGVyL3NvY2lhbC9zb2NpYWwuY3NzPzU5OTEiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svZm9vdGVyL3N1YnNjcmliZS9zdWJzY3JpYmUuY3NzIiwid2VicGFjazovLy8uL2Jsb2NrL2hlYWRlci9oZWFkZXItc3R5bGUuY3NzP2ViNWYiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svbWVudXRvcC9tZW51dG9wLmNzcz8yODgwIiwid2VicGFjazovLy8uL2Jsb2NrL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uY3NzPzE1ODciLCJ3ZWJwYWNrOi8vLy4vYmxvY2svc2VhcmNoZm9ybS9zZWFyY2hmb3JtLmNzcz9iNDczIiwid2VicGFjazovLy8uL2Nzcy9mb250LmNzcz9jMDc3Iiwid2VicGFjazovLy8uL2Nzcy9zdHlsZS5jc3M/OTMwNiIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9uLmNzcz8wMDQxIiwid2VicGFjazovLy8uL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b25hcnJvdy5jc3M/Y2FmYiIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9ud2l0ZS5jc3M/ZjQzMSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2RhdGVkcm9wL2RhdGVkcm9wLmNzcz84NDBlIiwid2VicGFjazovLy8uL21vZHVsZXMvZHJvcGRvd24vZHJvcGRvd24uY3NzP2RlNTUiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9sb2dvL2xvZ28uY3NzP2M4YTgiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9tYWludGV4dC9tYWludGV4dC5jc3M/NTdjNCIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL21hc2tlZGZpZWxkL21hc2tlZGZpZWxkLmNzcz83ZGQwIiwid2VicGFjazovLy8uL21vZHVsZXMvcmFkaW9idXR0b24vcmFkaW9idXR0b24uY3NzPzliN2UiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy90ZXh0ZmllbGQvdGV4dGZpZWxkLmNzcz8xZTgxIiwid2VicGFjazovLy8uL21vZHVsZXMvdG9nZ2xlYnV0dG9uL3RvZ2dsZWJ1dHRvbi5jc3M/YmI2MyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiOyhmdW5jdGlvbiAod2luZG93LCAkLCB1bmRlZmluZWQpIHsgOyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIFZFUlNJT04gPSAnMi4yLjMnLFxuICAgICAgICBwbHVnaW5OYW1lID0gJ2RhdGVwaWNrZXInLFxuICAgICAgICBhdXRvSW5pdFNlbGVjdG9yID0gJy5kYXRlcGlja2VyLWhlcmUnLFxuICAgICAgICAkYm9keSwgJGRhdGVwaWNrZXJzQ29udGFpbmVyLFxuICAgICAgICBjb250YWluZXJCdWlsdCA9IGZhbHNlLFxuICAgICAgICBiYXNlVGVtcGxhdGUgPSAnJyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cImRhdGVwaWNrZXItLXBvaW50ZXJcIj48L2k+JyArXG4gICAgICAgICAgICAnPG5hdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdlwiPjwvbmF2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jb250ZW50XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBjbGFzc2VzOiAnJyxcbiAgICAgICAgICAgIGlubGluZTogZmFsc2UsXG4gICAgICAgICAgICBsYW5ndWFnZTogJ3J1JyxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAnJyxcbiAgICAgICAgICAgIHdlZWtlbmRzOiBbNiwgMF0sXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnJyxcbiAgICAgICAgICAgIGFsdEZpZWxkOiAnJyxcbiAgICAgICAgICAgIGFsdEZpZWxkRGF0ZUZvcm1hdDogJ0AnLFxuICAgICAgICAgICAgdG9nZ2xlU2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgICAgICBrZXlib2FyZE5hdjogdHJ1ZSxcblxuICAgICAgICAgICAgcG9zaXRpb246ICdib3R0b20gbGVmdCcsXG4gICAgICAgICAgICBvZmZzZXQ6IDEyLFxuXG4gICAgICAgICAgICB2aWV3OiAnZGF5cycsXG4gICAgICAgICAgICBtaW5WaWV3OiAnZGF5cycsXG5cbiAgICAgICAgICAgIHNob3dPdGhlck1vbnRoczogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdE90aGVyTW9udGhzOiB0cnVlLFxuICAgICAgICAgICAgbW92ZVRvT3RoZXJNb250aHNPblNlbGVjdDogdHJ1ZSxcblxuICAgICAgICAgICAgc2hvd090aGVyWWVhcnM6IHRydWUsXG4gICAgICAgICAgICBzZWxlY3RPdGhlclllYXJzOiB0cnVlLFxuICAgICAgICAgICAgbW92ZVRvT3RoZXJZZWFyc09uU2VsZWN0OiB0cnVlLFxuXG4gICAgICAgICAgICBtaW5EYXRlOiAnJyxcbiAgICAgICAgICAgIG1heERhdGU6ICcnLFxuICAgICAgICAgICAgZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlOiB0cnVlLFxuXG4gICAgICAgICAgICBtdWx0aXBsZURhdGVzOiBmYWxzZSwgLy8gQm9vbGVhbiBvciBOdW1iZXJcbiAgICAgICAgICAgIG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6ICcsJyxcbiAgICAgICAgICAgIHJhbmdlOiBmYWxzZSxcblxuICAgICAgICAgICAgdG9kYXlCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgY2xlYXJCdXR0b246IGZhbHNlLFxuXG4gICAgICAgICAgICBzaG93RXZlbnQ6ICdmb2N1cycsXG4gICAgICAgICAgICBhdXRvQ2xvc2U6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyBuYXZpZ2F0aW9uXG4gICAgICAgICAgICBtb250aHNGaWVsZDogJ21vbnRoc1Nob3J0JyxcbiAgICAgICAgICAgIHByZXZIdG1sOiAnPHN2ZyBjbGFzcz1cInN2Zy1iYWNrXCI+PC9zdmc+JyxcbiAgICAgICAgICAgIG5leHRIdG1sOiAnPHN2ZyBjbGFzcz1cInN2Zy1uZXh0XCI+PC9zdmc+JyxcbiAgICAgICAgICAgIG5hdlRpdGxlczoge1xuICAgICAgICAgICAgICAgIGRheXM6ICdNTSA8aT55eXl5PC9pPicsXG4gICAgICAgICAgICAgICAgbW9udGhzOiAneXl5eScsXG4gICAgICAgICAgICAgICAgeWVhcnM6ICd5eXl5MSAtIHl5eXkyJ1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gdGltZXBpY2tlclxuICAgICAgICAgICAgdGltZXBpY2tlcjogZmFsc2UsXG4gICAgICAgICAgICBvbmx5VGltZXBpY2tlcjogZmFsc2UsXG4gICAgICAgICAgICBkYXRlVGltZVNlcGFyYXRvcjogJyAnLFxuICAgICAgICAgICAgdGltZUZvcm1hdDogJycsXG4gICAgICAgICAgICBtaW5Ib3VyczogMCxcbiAgICAgICAgICAgIG1heEhvdXJzOiAyNCxcbiAgICAgICAgICAgIG1pbk1pbnV0ZXM6IDAsXG4gICAgICAgICAgICBtYXhNaW51dGVzOiA1OSxcbiAgICAgICAgICAgIGhvdXJzU3RlcDogMSxcbiAgICAgICAgICAgIG1pbnV0ZXNTdGVwOiAxLFxuXG4gICAgICAgICAgICAvLyBldmVudHNcbiAgICAgICAgICAgIG9uU2VsZWN0OiAnJyxcbiAgICAgICAgICAgIG9uU2hvdzogJycsXG4gICAgICAgICAgICBvbkhpZGU6ICcnLFxuICAgICAgICAgICAgb25DaGFuZ2VNb250aDogJycsXG4gICAgICAgICAgICBvbkNoYW5nZVllYXI6ICcnLFxuICAgICAgICAgICAgb25DaGFuZ2VEZWNhZGU6ICcnLFxuICAgICAgICAgICAgb25DaGFuZ2VWaWV3OiAnJyxcbiAgICAgICAgICAgIG9uUmVuZGVyQ2VsbDogJydcbiAgICAgICAgfSxcbiAgICAgICAgaG90S2V5cyA9IHtcbiAgICAgICAgICAgICdjdHJsUmlnaHQnOiBbMTcsIDM5XSxcbiAgICAgICAgICAgICdjdHJsVXAnOiBbMTcsIDM4XSxcbiAgICAgICAgICAgICdjdHJsTGVmdCc6IFsxNywgMzddLFxuICAgICAgICAgICAgJ2N0cmxEb3duJzogWzE3LCA0MF0sXG4gICAgICAgICAgICAnc2hpZnRSaWdodCc6IFsxNiwgMzldLFxuICAgICAgICAgICAgJ3NoaWZ0VXAnOiBbMTYsIDM4XSxcbiAgICAgICAgICAgICdzaGlmdExlZnQnOiBbMTYsIDM3XSxcbiAgICAgICAgICAgICdzaGlmdERvd24nOiBbMTYsIDQwXSxcbiAgICAgICAgICAgICdhbHRVcCc6IFsxOCwgMzhdLFxuICAgICAgICAgICAgJ2FsdFJpZ2h0JzogWzE4LCAzOV0sXG4gICAgICAgICAgICAnYWx0TGVmdCc6IFsxOCwgMzddLFxuICAgICAgICAgICAgJ2FsdERvd24nOiBbMTgsIDQwXSxcbiAgICAgICAgICAgICdjdHJsU2hpZnRVcCc6IFsxNiwgMTcsIDM4XVxuICAgICAgICB9LFxuICAgICAgICBkYXRlcGlja2VyO1xuXG4gICAgdmFyIERhdGVwaWNrZXIgID0gZnVuY3Rpb24gKGVsLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZWwgPSBlbDtcbiAgICAgICAgdGhpcy4kZWwgPSAkKGVsKTtcblxuICAgICAgICB0aGlzLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMsIHRoaXMuJGVsLmRhdGEoKSk7XG5cbiAgICAgICAgaWYgKCRib2R5ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMub3B0cy5zdGFydERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5zdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZWwubm9kZU5hbWUgPT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgdGhpcy5lbElzSW5wdXQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0cy5hbHRGaWVsZCkge1xuICAgICAgICAgICAgdGhpcy4kYWx0RmllbGQgPSB0eXBlb2YgdGhpcy5vcHRzLmFsdEZpZWxkID09ICdzdHJpbmcnID8gJCh0aGlzLm9wdHMuYWx0RmllbGQpIDogdGhpcy5vcHRzLmFsdEZpZWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2lsZW50ID0gZmFsc2U7IC8vIE5lZWQgdG8gcHJldmVudCB1bm5lY2Vzc2FyeSByZW5kZXJpbmdcblxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gdGhpcy5vcHRzLnN0YXJ0RGF0ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHRoaXMub3B0cy52aWV3O1xuICAgICAgICB0aGlzLl9jcmVhdGVTaG9ydEN1dHMoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzID0gW107XG4gICAgICAgIHRoaXMudmlld3MgPSB7fTtcbiAgICAgICAgdGhpcy5rZXlzID0gW107XG4gICAgICAgIHRoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICB0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZSA9ICcnO1xuXG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIgPSBEYXRlcGlja2VyO1xuXG4gICAgZGF0ZXBpY2tlci5wcm90b3R5cGUgPSB7XG4gICAgICAgIFZFUlNJT046IFZFUlNJT04sXG4gICAgICAgIHZpZXdJbmRleGVzOiBbJ2RheXMnLCAnbW9udGhzJywgJ3llYXJzJ10sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXJCdWlsdCAmJiAhdGhpcy5vcHRzLmlubGluZSAmJiB0aGlzLmVsSXNJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkRGF0ZXBpY2tlcnNDb250YWluZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2J1aWxkQmFzZUh0bWwoKTtcbiAgICAgICAgICAgIHRoaXMuX2RlZmluZUxvY2FsZSh0aGlzLm9wdHMubGFuZ3VhZ2UpO1xuICAgICAgICAgICAgdGhpcy5fc3luY1dpdGhNaW5NYXhEYXRlcygpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5lbElzSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGV4dHJhIGNsYXNzZXMgZm9yIHByb3BlciB0cmFuc2l0aW9uc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRQb3NpdGlvbkNsYXNzZXModGhpcy5vcHRzLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmluZEV2ZW50cygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMua2V5Ym9hcmROYXYgJiYgIXRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iaW5kS2V5Ym9hcmRFdmVudHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5vbignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd25EYXRlcGlja2VyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIub24oJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXBEYXRlcGlja2VyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKHRoaXMub3B0cy5jbGFzc2VzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIgPSBuZXcgJC5mbi5kYXRlcGlja2VyLlRpbWVwaWNrZXIodGhpcywgdGhpcy5vcHRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9iaW5kVGltZXBpY2tlckV2ZW50cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcygnLW9ubHktdGltZXBpY2tlci0nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XSA9IG5ldyAkLmZuLmRhdGVwaWNrZXIuQm9keSh0aGlzLCB0aGlzLmN1cnJlbnRWaWV3LCB0aGlzLm9wdHMpO1xuICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLm5hdiA9IG5ldyAkLmZuLmRhdGVwaWNrZXIuTmF2aWdhdGlvbih0aGlzLCB0aGlzLm9wdHMpO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gdGhpcy5jdXJyZW50VmlldztcblxuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2NsaWNrQ2VsbC5hZHAnLCB0aGlzLl9vbkNsaWNrQ2VsbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIub24oJ21vdXNlZW50ZXInLCAnLmRhdGVwaWNrZXItLWNlbGwnLCB0aGlzLl9vbk1vdXNlRW50ZXJDZWxsLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5vbignbW91c2VsZWF2ZScsICcuZGF0ZXBpY2tlci0tY2VsbCcsIHRoaXMuX29uTW91c2VMZWF2ZUNlbGwuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfY3JlYXRlU2hvcnRDdXRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm1pbkRhdGUgPSB0aGlzLm9wdHMubWluRGF0ZSA/IHRoaXMub3B0cy5taW5EYXRlIDogbmV3IERhdGUoLTg2Mzk5OTk5MTM2MDAwMDApO1xuICAgICAgICAgICAgdGhpcy5tYXhEYXRlID0gdGhpcy5vcHRzLm1heERhdGUgPyB0aGlzLm9wdHMubWF4RGF0ZSA6IG5ldyBEYXRlKDg2Mzk5OTk5MTM2MDAwMDApO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kRXZlbnRzIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZWwub24odGhpcy5vcHRzLnNob3dFdmVudCArICcuYWRwJywgdGhpcy5fb25TaG93RXZlbnQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbignbW91c2V1cC5hZHAnLCB0aGlzLl9vbk1vdXNlVXBFbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdibHVyLmFkcCcsIHRoaXMuX29uQmx1ci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdrZXl1cC5hZHAnLCB0aGlzLl9vbktleVVwR2VuZXJhbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplLmFkcCcsIHRoaXMuX29uUmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCgnYm9keScpLm9uKCdtb3VzZXVwLmFkcCcsIHRoaXMuX29uTW91c2VVcEJvZHkuYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2JpbmRLZXlib2FyZEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2tleWRvd24uYWRwJywgdGhpcy5fb25LZXlEb3duLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2tleXVwLmFkcCcsIHRoaXMuX29uS2V5VXAuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbignaG90S2V5LmFkcCcsIHRoaXMuX29uSG90S2V5LmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kVGltZXBpY2tlckV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ3RpbWVDaGFuZ2UuYWRwJywgdGhpcy5fb25UaW1lQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzV2Vla2VuZDogZnVuY3Rpb24gKGRheSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0cy53ZWVrZW5kcy5pbmRleE9mKGRheSkgIT09IC0xO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9kZWZpbmVMb2NhbGU6IGZ1bmN0aW9uIChsYW5nKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxhbmcgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYyA9ICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVtsYW5nXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubG9jKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBmaW5kIGxhbmd1YWdlIFwiJyArIGxhbmcgKyAnXCIgaW4gRGF0ZXBpY2tlci5sYW5ndWFnZSwgd2lsbCB1c2UgXCJydVwiIGluc3RlYWQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlLnJ1KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubG9jID0gJC5leHRlbmQodHJ1ZSwge30sICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSwgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlW2xhbmddKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUsIGxhbmcpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jLmRhdGVGb3JtYXQgPSB0aGlzLm9wdHMuZGF0ZUZvcm1hdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYy50aW1lRm9ybWF0ID0gdGhpcy5vcHRzLnRpbWVGb3JtYXRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5maXJzdERheSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYy5maXJzdERheSA9IHRoaXMub3B0cy5maXJzdERheVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYy5kYXRlRm9ybWF0ID0gW3RoaXMubG9jLmRhdGVGb3JtYXQsIHRoaXMubG9jLnRpbWVGb3JtYXRdLmpvaW4odGhpcy5vcHRzLmRhdGVUaW1lU2VwYXJhdG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jLmRhdGVGb3JtYXQgPSB0aGlzLmxvYy50aW1lRm9ybWF0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYm91bmRhcnkgPSB0aGlzLl9nZXRXb3JkQm91bmRhcnlSZWdFeHA7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2MudGltZUZvcm1hdC5tYXRjaChib3VuZGFyeSgnYWEnKSkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmxvYy50aW1lRm9ybWF0Lm1hdGNoKGJvdW5kYXJ5KCdBQScpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICB0aGlzLmFtcG0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9idWlsZERhdGVwaWNrZXJzQ29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb250YWluZXJCdWlsdCA9IHRydWU7XG4gICAgICAgICAgICAkYm9keS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJkYXRlcGlja2Vycy1jb250YWluZXJcIiBpZD1cImRhdGVwaWNrZXJzLWNvbnRhaW5lclwiPjwvZGl2PicpO1xuICAgICAgICAgICAgJGRhdGVwaWNrZXJzQ29udGFpbmVyID0gJCgnI2RhdGVwaWNrZXJzLWNvbnRhaW5lcicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9idWlsZEJhc2VIdG1sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJGFwcGVuZFRhcmdldCxcbiAgICAgICAgICAgICAgICAkaW5saW5lID0gJCgnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItaW5saW5lXCI+Jyk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZWwubm9kZU5hbWUgPT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICAkYXBwZW5kVGFyZ2V0ID0gJGRhdGVwaWNrZXJzQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRhcHBlbmRUYXJnZXQgPSAkaW5saW5lLmluc2VydEFmdGVyKHRoaXMuJGVsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGFwcGVuZFRhcmdldCA9ICRpbmxpbmUuYXBwZW5kVG8odGhpcy4kZWwpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIgPSAkKGJhc2VUZW1wbGF0ZSkuYXBwZW5kVG8oJGFwcGVuZFRhcmdldCk7XG4gICAgICAgICAgICB0aGlzLiRjb250ZW50ID0gJCgnLmRhdGVwaWNrZXItLWNvbnRlbnQnLCB0aGlzLiRkYXRlcGlja2VyKTtcbiAgICAgICAgICAgIHRoaXMuJG5hdiA9ICQoJy5kYXRlcGlja2VyLS1uYXYnLCB0aGlzLiRkYXRlcGlja2VyKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfdHJpZ2dlck9uQ2hhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGZyb20gdHJpZ2dlcmluZyBtdWx0aXBsZSBvblNlbGVjdCBjYWxsYmFjayB3aXRoIHNhbWUgYXJndW1lbnQgKGVtcHR5IHN0cmluZykgaW4gSUUxMC0xMVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZSA9PT0gJycpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdHMub25TZWxlY3QoJycsICcnLCB0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkRGF0ZXMgPSB0aGlzLnNlbGVjdGVkRGF0ZXMsXG4gICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoc2VsZWN0ZWREYXRlc1swXSksXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkRGF0ZXMsXG4gICAgICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGRhdGVzID0gbmV3IERhdGUoXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkLnllYXIsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkLm1vbnRoLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZC5kYXRlLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZC5ob3VycyxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQubWludXRlc1xuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWREYXRlcyA9IHNlbGVjdGVkRGF0ZXMubWFwKGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5mb3JtYXREYXRlKF90aGlzLmxvYy5kYXRlRm9ybWF0LCBkYXRlKVxuICAgICAgICAgICAgICAgIH0pLmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgbmV3IGRhdGVzIGFycmF5LCB0byBzZXBhcmF0ZSBpdCBmcm9tIG9yaWdpbmFsIHNlbGVjdGVkRGF0ZXNcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMubXVsdGlwbGVEYXRlcyB8fCB0aGlzLm9wdHMucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBkYXRlcyA9IHNlbGVjdGVkRGF0ZXMubWFwKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnNlZERhdGUgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZERhdGUueWVhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZERhdGUubW9udGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWREYXRlLmRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWREYXRlLmhvdXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0ZS5taW51dGVzXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fcHJldk9uU2VsZWN0VmFsdWUgPSBmb3JtYXR0ZWREYXRlcztcbiAgICAgICAgICAgIHRoaXMub3B0cy5vblNlbGVjdChmb3JtYXR0ZWREYXRlcywgZGF0ZXMsIHRoaXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkID0gdGhpcy5wYXJzZWREYXRlLFxuICAgICAgICAgICAgICAgIG8gPSB0aGlzLm9wdHM7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkLnllYXIsIGQubW9udGggKyAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25DaGFuZ2VNb250aCkgby5vbkNoYW5nZU1vbnRoKHRoaXMucGFyc2VkRGF0ZS5tb250aCwgdGhpcy5wYXJzZWREYXRlLnllYXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkLnllYXIgKyAxLCBkLm1vbnRoLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25DaGFuZ2VZZWFyKSBvLm9uQ2hhbmdlWWVhcih0aGlzLnBhcnNlZERhdGUueWVhcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyICsgMTAsIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZURlY2FkZSkgby5vbkNoYW5nZURlY2FkZSh0aGlzLmN1ckRlY2FkZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByZXY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkID0gdGhpcy5wYXJzZWREYXRlLFxuICAgICAgICAgICAgICAgIG8gPSB0aGlzLm9wdHM7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkLnllYXIsIGQubW9udGggLSAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25DaGFuZ2VNb250aCkgby5vbkNoYW5nZU1vbnRoKHRoaXMucGFyc2VkRGF0ZS5tb250aCwgdGhpcy5wYXJzZWREYXRlLnllYXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkLnllYXIgLSAxLCBkLm1vbnRoLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25DaGFuZ2VZZWFyKSBvLm9uQ2hhbmdlWWVhcih0aGlzLnBhcnNlZERhdGUueWVhcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyIC0gMTAsIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5vbkNoYW5nZURlY2FkZSkgby5vbkNoYW5nZURlY2FkZSh0aGlzLmN1ckRlY2FkZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZvcm1hdERhdGU6IGZ1bmN0aW9uIChzdHJpbmcsIGRhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlIHx8IHRoaXMuZGF0ZTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzdHJpbmcsXG4gICAgICAgICAgICAgICAgYm91bmRhcnkgPSB0aGlzLl9nZXRXb3JkQm91bmRhcnlSZWdFeHAsXG4gICAgICAgICAgICAgICAgbG9jYWxlID0gdGhpcy5sb2MsXG4gICAgICAgICAgICAgICAgbGVhZGluZ1plcm8gPSBkYXRlcGlja2VyLmdldExlYWRpbmdaZXJvTnVtLFxuICAgICAgICAgICAgICAgIGRlY2FkZSA9IGRhdGVwaWNrZXIuZ2V0RGVjYWRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgZnVsbEhvdXJzID0gZC5mdWxsSG91cnMsXG4gICAgICAgICAgICAgICAgaG91cnMgPSBkLmhvdXJzLFxuICAgICAgICAgICAgICAgIGFtcG0gPSBzdHJpbmcubWF0Y2goYm91bmRhcnkoJ2FhJykpIHx8IHN0cmluZy5tYXRjaChib3VuZGFyeSgnQUEnKSksXG4gICAgICAgICAgICAgICAgZGF5UGVyaW9kID0gJ2FtJyxcbiAgICAgICAgICAgICAgICByZXBsYWNlciA9IHRoaXMuX3JlcGxhY2VyLFxuICAgICAgICAgICAgICAgIHZhbGlkSG91cnM7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZXBpY2tlciAmJiB0aGlzLnRpbWVwaWNrZXIgJiYgYW1wbSkge1xuICAgICAgICAgICAgICAgIHZhbGlkSG91cnMgPSB0aGlzLnRpbWVwaWNrZXIuX2dldFZhbGlkSG91cnNGcm9tRGF0ZShkYXRlLCBhbXBtKTtcbiAgICAgICAgICAgICAgICBmdWxsSG91cnMgPSBsZWFkaW5nWmVybyh2YWxpZEhvdXJzLmhvdXJzKTtcbiAgICAgICAgICAgICAgICBob3VycyA9IHZhbGlkSG91cnMuaG91cnM7XG4gICAgICAgICAgICAgICAgZGF5UGVyaW9kID0gdmFsaWRIb3Vycy5kYXlQZXJpb2Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgL0AvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL0AvLCBkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvYWEvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnYWEnKSwgZGF5UGVyaW9kKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9BQS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdBQScpLCBkYXlQZXJpb2QudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvZGQvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnZGQnKSwgZC5mdWxsRGF0ZSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvZC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdkJyksIGQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvREQvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnREQnKSwgbG9jYWxlLmRheXNbZC5kYXldKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9ELy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ0QnKSwgbG9jYWxlLmRheXNTaG9ydFtkLmRheV0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL21tLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ21tJyksIGQuZnVsbE1vbnRoKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9tLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ20nKSwgZC5tb250aCArIDEpO1xuICAgICAgICAgICAgICAgIGNhc2UgL01NLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ01NJyksIHRoaXMubG9jLm1vbnRoc1tkLm1vbnRoXSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvTS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdNJyksIGxvY2FsZS5tb250aHNTaG9ydFtkLm1vbnRoXSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvaWkvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnaWknKSwgZC5mdWxsTWludXRlcyk7XG4gICAgICAgICAgICAgICAgY2FzZSAvaS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdpJyksIGQubWludXRlcyk7XG4gICAgICAgICAgICAgICAgY2FzZSAvaGgvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnaGgnKSwgZnVsbEhvdXJzKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9oLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2gnKSwgaG91cnMpO1xuICAgICAgICAgICAgICAgIGNhc2UgL3l5eXkvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgneXl5eScpLCBkLnllYXIpO1xuICAgICAgICAgICAgICAgIGNhc2UgL3l5eXkxLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ3l5eXkxJyksIGRlY2FkZVswXSk7XG4gICAgICAgICAgICAgICAgY2FzZSAveXl5eTIvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgneXl5eTInKSwgZGVjYWRlWzFdKTtcbiAgICAgICAgICAgICAgICBjYXNlIC95eS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCd5eScpLCBkLnllYXIudG9TdHJpbmcoKS5zbGljZSgtMikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZXBsYWNlcjogZnVuY3Rpb24gKHN0ciwgcmVnLCBkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnLCBmdW5jdGlvbiAobWF0Y2gsIHAxLHAyLHAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxICsgZGF0YSArIHAzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0V29yZEJvdW5kYXJ5UmVnRXhwOiBmdW5jdGlvbiAoc2lnbikge1xuICAgICAgICAgICAgdmFyIHN5bWJvbHMgPSAnXFxcXHN8XFxcXC58LXwvfFxcXFxcXFxcfCx8XFxcXCR8XFxcXCF8XFxcXD98Onw7JztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefD58JyArIHN5bWJvbHMgKyAnKSgnICsgc2lnbiArICcpKCR8PHwnICsgc3ltYm9scyArICcpJywgJ2cnKTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIHNlbGVjdERhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgICAgIG9wdHMgPSBfdGhpcy5vcHRzLFxuICAgICAgICAgICAgICAgIGQgPSBfdGhpcy5wYXJzZWREYXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXMgPSBfdGhpcy5zZWxlY3RlZERhdGVzLFxuICAgICAgICAgICAgICAgIGxlbiA9IHNlbGVjdGVkRGF0ZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIG5ld0RhdGUgPSAnJztcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBkYXRlLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0RGF0ZShkKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMubGFzdFNlbGVjdGVkRGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgICAgIC8vIFNldCBuZXcgdGltZSB2YWx1ZXMgZnJvbSBEYXRlXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyLl9zZXRUaW1lKGRhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPbiB0aGlzIHN0ZXAgdGltZXBpY2tlciB3aWxsIHNldCB2YWxpZCB2YWx1ZXMgaW4gaXQncyBpbnN0YW5jZVxuICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXIoJ3NlbGVjdERhdGUnLCBkYXRlKTtcblxuICAgICAgICAgICAgLy8gU2V0IGNvcnJlY3QgdGltZSB2YWx1ZXMgYWZ0ZXIgdGltZXBpY2tlcidzIHZhbGlkYXRpb25cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZnJvbSBzZXR0aW5nIGhvdXJzIG9yIG1pbnV0ZXMgd2hpY2ggdmFsdWVzIGFyZSBsZXNzZXIgdGhlbiBgbWluYCB2YWx1ZSBvclxuICAgICAgICAgICAgLy8gZ3JlYXRlciB0aGVuIGBtYXhgIHZhbHVlXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF90aGlzLnZpZXcgPT0gJ2RheXMnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuZ2V0TW9udGgoKSAhPSBkLm1vbnRoICYmIG9wdHMubW92ZVRvT3RoZXJNb250aHNPblNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF90aGlzLnZpZXcgPT0gJ3llYXJzJykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlLmdldEZ1bGxZZWFyKCkgIT0gZC55ZWFyICYmIG9wdHMubW92ZVRvT3RoZXJZZWFyc09uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIDAsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0RhdGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zaWxlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIF90aGlzLmRhdGUgPSBuZXdEYXRlO1xuICAgICAgICAgICAgICAgIF90aGlzLnNpbGVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF90aGlzLm5hdi5fcmVuZGVyKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMubXVsdGlwbGVEYXRlcyAmJiAhb3B0cy5yYW5nZSkgeyAvLyBTZXQgcHJpb3JpdHkgdG8gcmFuZ2UgZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICAgIGlmIChsZW4gPT09IG9wdHMubXVsdGlwbGVEYXRlcykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX2lzU2VsZWN0ZWQoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcy5wdXNoKGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzID0gW2RhdGVdO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5taW5SYW5nZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1heFJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsZW4gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzLnB1c2goZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMubWF4UmFuZ2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWF4UmFuZ2UgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFN3YXAgZGF0ZXMgaWYgdGhleSB3ZXJlIHNlbGVjdGVkIHZpYSBkcC5zZWxlY3REYXRlKCkgYW5kIHNlY29uZCBkYXRlIHdhcyBzbWFsbGVyIHRoZW4gZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGVwaWNrZXIuYmlnZ2VyKF90aGlzLm1heFJhbmdlLCBfdGhpcy5taW5SYW5nZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1heFJhbmdlID0gX3RoaXMubWluUmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5taW5SYW5nZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcyA9IFtfdGhpcy5taW5SYW5nZSwgX3RoaXMubWF4UmFuZ2VdXG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzID0gW2RhdGVdO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5taW5SYW5nZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzID0gW2RhdGVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfdGhpcy5fc2V0SW5wdXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5vblNlbGVjdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyT25DaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMuYXV0b0Nsb3NlICYmICF0aGlzLnRpbWVwaWNrZXJJc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGlmICghb3B0cy5tdWx0aXBsZURhdGVzICYmICFvcHRzLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMucmFuZ2UgJiYgX3RoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKClcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVEYXRlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZERhdGVzLFxuICAgICAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZC5zb21lKGZ1bmN0aW9uIChjdXJEYXRlLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVwaWNrZXIuaXNTYW1lKGN1ckRhdGUsIGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5taW5SYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxhc3RTZWxlY3RlZERhdGUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxhc3RTZWxlY3RlZERhdGUgPSBfdGhpcy5zZWxlY3RlZERhdGVzW190aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBfdGhpcy52aWV3c1tfdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2V0SW5wdXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vcHRzLm9uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9kYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IHRoaXMub3B0cy5taW5WaWV3O1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudG9kYXlCdXR0b24gaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKHRoaXMub3B0cy50b2RheUJ1dHRvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzID0gW107XG4gICAgICAgICAgICB0aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgICAgICB0aGlzLm1heFJhbmdlID0gJyc7XG4gICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyT25DaGFuZ2UoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGVzIGRhdGVwaWNrZXIgb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHBhcmFtIC0gcGFyYW1ldGVyJ3MgbmFtZSB0byB1cGRhdGUuIElmIG9iamVjdCB0aGVuIGl0IHdpbGwgZXh0ZW5kIGN1cnJlbnQgb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ8T2JqZWN0fSBbdmFsdWVdIC0gbmV3IHBhcmFtIHZhbHVlXG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChwYXJhbSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGxhc3RTZWxlY3RlZERhdGUgPSB0aGlzLmxhc3RTZWxlY3RlZERhdGU7XG5cbiAgICAgICAgICAgIGlmIChsZW4gPT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0c1twYXJhbV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGVuID09IDEgJiYgdHlwZW9mIHBhcmFtID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwgdGhpcy5vcHRzLCBwYXJhbSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlU2hvcnRDdXRzKCk7XG4gICAgICAgICAgICB0aGlzLl9zeW5jV2l0aE1pbk1heERhdGVzKCk7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVMb2NhbGUodGhpcy5vcHRzLmxhbmd1YWdlKTtcbiAgICAgICAgICAgIHRoaXMubmF2Ll9hZGRCdXR0b25zSWZOZWVkKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikgdGhpcy5uYXYuX3JlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVsSXNJbnB1dCAmJiAhdGhpcy5vcHRzLmlubGluZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFBvc2l0aW9uQ2xhc3Nlcyh0aGlzLm9wdHMucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLm9wdHMucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKHRoaXMub3B0cy5jbGFzc2VzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcygnLW9ubHktdGltZXBpY2tlci0nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWxlY3RlZERhdGUpIHRoaXMudGltZXBpY2tlci5faGFuZGxlRGF0ZShsYXN0U2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIuX3VwZGF0ZVJhbmdlcygpO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlci5fdXBkYXRlQ3VycmVudFRpbWUoKTtcbiAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgaG91cnMgYW5kIG1pbnV0ZXMgaWYgaXQncyB2YWx1ZXMgaGF2ZSBiZWVuIGNoYW5nZWQgdGhyb3VnaCBtaW4vbWF4IGhvdXJzL21pbnV0ZXNcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VsZWN0ZWREYXRlLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3Vycyk7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWxlY3RlZERhdGUuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9zZXRJbnB1dFZhbHVlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9zeW5jV2l0aE1pbk1heERhdGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VyVGltZSA9IHRoaXMuZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5taW5UaW1lID4gY3VyVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMubWluRGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWF4VGltZSA8IGN1clRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLm1heERhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9pc1NlbGVjdGVkOiBmdW5jdGlvbiAoY2hlY2tEYXRlLCBjZWxsVHlwZSkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzLnNvbWUoZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZXBpY2tlci5pc1NhbWUoZGF0ZSwgY2hlY2tEYXRlLCBjZWxsVHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9zZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgICAgIG9wdHMgPSBfdGhpcy5vcHRzLFxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IF90aGlzLmxvYy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgICAgIGFsdEZvcm1hdCA9IG9wdHMuYWx0RmllbGREYXRlRm9ybWF0LFxuICAgICAgICAgICAgICAgIHZhbHVlID0gX3RoaXMuc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmZvcm1hdERhdGUoZm9ybWF0LCBkYXRlKVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGFsdFZhbHVlcztcblxuICAgICAgICAgICAgaWYgKG9wdHMuYWx0RmllbGQgJiYgX3RoaXMuJGFsdEZpZWxkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFsdFZhbHVlcyA9IHRoaXMuc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmZvcm1hdERhdGUoYWx0Rm9ybWF0LCBkYXRlKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFsdFZhbHVlcyA9IGFsdFZhbHVlcy5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhbHRGaWVsZC52YWwoYWx0VmFsdWVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKTtcblxuICAgICAgICAgICAgdGhpcy4kZWwudmFsKHZhbHVlKVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBkYXRlIGlzIGJldHdlZW4gbWluRGF0ZSBhbmQgbWF4RGF0ZVxuICAgICAgICAgKiBAcGFyYW0gZGF0ZSB7b2JqZWN0fSAtIGRhdGUgb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9IC0gY2VsbCB0eXBlXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2lzSW5SYW5nZTogZnVuY3Rpb24gKGRhdGUsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciB0aW1lID0gZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgZCA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICBtaW4gPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5taW5EYXRlKSxcbiAgICAgICAgICAgICAgICBtYXggPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5tYXhEYXRlKSxcbiAgICAgICAgICAgICAgICBkTWluVGltZSA9IG5ldyBEYXRlKGQueWVhciwgZC5tb250aCwgbWluLmRhdGUpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICBkTWF4VGltZSA9IG5ldyBEYXRlKGQueWVhciwgZC5tb250aCwgbWF4LmRhdGUpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICB0eXBlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF5OiB0aW1lID49IHRoaXMubWluVGltZSAmJiB0aW1lIDw9IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRNaW5UaW1lID49IHRoaXMubWluVGltZSAmJiBkTWF4VGltZSA8PSB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IGQueWVhciA+PSBtaW4ueWVhciAmJiBkLnllYXIgPD0gbWF4LnllYXJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPyB0eXBlc1t0eXBlXSA6IHR5cGVzLmRheVxuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXREaW1lbnNpb25zOiBmdW5jdGlvbiAoJGVsKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJGVsLm9mZnNldCgpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAkZWwub3V0ZXJXaWR0aCgpLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJGVsLm91dGVySGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgbGVmdDogb2Zmc2V0LmxlZnQsXG4gICAgICAgICAgICAgICAgdG9wOiBvZmZzZXQudG9wXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldERhdGVGcm9tQ2VsbDogZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICAgIHZhciBjdXJEYXRlID0gdGhpcy5wYXJzZWREYXRlLFxuICAgICAgICAgICAgICAgIHllYXIgPSBjZWxsLmRhdGEoJ3llYXInKSB8fCBjdXJEYXRlLnllYXIsXG4gICAgICAgICAgICAgICAgbW9udGggPSBjZWxsLmRhdGEoJ21vbnRoJykgPT0gdW5kZWZpbmVkID8gY3VyRGF0ZS5tb250aCA6IGNlbGwuZGF0YSgnbW9udGgnKSxcbiAgICAgICAgICAgICAgICBkYXRlID0gY2VsbC5kYXRhKCdkYXRlJykgfHwgMTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfc2V0UG9zaXRpb25DbGFzc2VzOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgICAgICBwb3MgPSBwb3Muc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIHZhciBtYWluID0gcG9zWzBdLFxuICAgICAgICAgICAgICAgIHNlYyA9IHBvc1sxXSxcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gJ2RhdGVwaWNrZXIgLScgKyBtYWluICsgJy0nICsgc2VjICsgJy0gLWZyb20tJyArIG1haW4gKyAnLSc7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUpIGNsYXNzZXMgKz0gJyBhY3RpdmUnO1xuXG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2NsYXNzJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoY2xhc3Nlcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0UG9zaXRpb246IGZ1bmN0aW9uIChwb3NpdGlvbikge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCB0aGlzLm9wdHMucG9zaXRpb247XG5cbiAgICAgICAgICAgIHZhciBkaW1zID0gdGhpcy5fZ2V0RGltZW5zaW9ucyh0aGlzLiRlbCksXG4gICAgICAgICAgICAgICAgc2VsZkRpbXMgPSB0aGlzLl9nZXREaW1lbnNpb25zKHRoaXMuJGRhdGVwaWNrZXIpLFxuICAgICAgICAgICAgICAgIHBvcyA9IHBvc2l0aW9uLnNwbGl0KCcgJyksXG4gICAgICAgICAgICAgICAgdG9wLCBsZWZ0LFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHRoaXMub3B0cy5vZmZzZXQsXG4gICAgICAgICAgICAgICAgbWFpbiA9IHBvc1swXSxcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnkgPSBwb3NbMV07XG5cbiAgICAgICAgICAgIHN3aXRjaCAobWFpbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IGRpbXMudG9wIC0gc2VsZkRpbXMuaGVpZ2h0IC0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkaW1zLmxlZnQgKyBkaW1zLndpZHRoICsgb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBkaW1zLnRvcCArIGRpbXMuaGVpZ2h0ICsgb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRpbXMubGVmdCAtIHNlbGZEaW1zLndpZHRoIC0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoKHNlY29uZGFyeSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IGRpbXMudG9wO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkaW1zLmxlZnQgKyBkaW1zLndpZHRoIC0gc2VsZkRpbXMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IGRpbXMudG9wICsgZGltcy5oZWlnaHQgLSBzZWxmRGltcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGltcy5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgICAgICAgICAgICBpZiAoL2xlZnR8cmlnaHQvLnRlc3QobWFpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IGRpbXMudG9wICsgZGltcy5oZWlnaHQvMiAtIHNlbGZEaW1zLmhlaWdodC8yO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRpbXMubGVmdCArIGRpbXMud2lkdGgvMiAtIHNlbGZEaW1zLndpZHRoLzI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlclxuICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9uU2hvdyA9IHRoaXMub3B0cy5vblNob3c7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5vcHRzLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKG9uU2hvdykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRWaXNpb25FdmVudHMob25TaG93KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvbkhpZGUgPSB0aGlzLm9wdHMub25IaWRlO1xuXG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnLTEwMDAwMHB4J1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSAnJztcbiAgICAgICAgICAgIHRoaXMua2V5cyA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLmluRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZWwuYmx1cigpO1xuXG4gICAgICAgICAgICBpZiAob25IaWRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmluZFZpc2lvbkV2ZW50cyhvbkhpZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZG93bjogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZVZpZXcoZGF0ZSwgJ2Rvd24nKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZVZpZXcoZGF0ZSwgJ3VwJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2JpbmRWaXNpb25FdmVudHM6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5vZmYoJ3RyYW5zaXRpb25lbmQuZHAnKTtcbiAgICAgICAgICAgIGV2ZW50KHRoaXMsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIub25lKCd0cmFuc2l0aW9uZW5kLmRwJywgZXZlbnQuYmluZCh0aGlzLCB0aGlzLCB0cnVlKSlcbiAgICAgICAgfSxcblxuICAgICAgICBfY2hhbmdlVmlldzogZnVuY3Rpb24gKGRhdGUsIGRpcikge1xuICAgICAgICAgICAgZGF0ZSA9IGRhdGUgfHwgdGhpcy5mb2N1c2VkIHx8IHRoaXMuZGF0ZTtcblxuICAgICAgICAgICAgdmFyIG5leHRWaWV3ID0gZGlyID09ICd1cCcgPyB0aGlzLnZpZXdJbmRleCArIDEgOiB0aGlzLnZpZXdJbmRleCAtIDE7XG4gICAgICAgICAgICBpZiAobmV4dFZpZXcgPiAyKSBuZXh0VmlldyA9IDI7XG4gICAgICAgICAgICBpZiAobmV4dFZpZXcgPCAwKSBuZXh0VmlldyA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLnZpZXdJbmRleGVzW25leHRWaWV3XTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIF9oYW5kbGVIb3RLZXk6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMuX2dldEZvY3VzZWREYXRlKCkpLFxuICAgICAgICAgICAgICAgIGZvY3VzZWRQYXJzZWQsXG4gICAgICAgICAgICAgICAgbyA9IHRoaXMub3B0cyxcbiAgICAgICAgICAgICAgICBuZXdEYXRlLFxuICAgICAgICAgICAgICAgIHRvdGFsRGF5c0luTmV4dE1vbnRoLFxuICAgICAgICAgICAgICAgIG1vbnRoQ2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHllYXJDaGFuZ2VkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVjYWRlQ2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHkgPSBkYXRlLnllYXIsXG4gICAgICAgICAgICAgICAgbSA9IGRhdGUubW9udGgsXG4gICAgICAgICAgICAgICAgZCA9IGRhdGUuZGF0ZTtcblxuICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjdHJsUmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2N0cmxVcCc6XG4gICAgICAgICAgICAgICAgICAgIG0gKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgbW9udGhDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3RybExlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2N0cmxEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgbSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICBtb250aENoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzaGlmdFJpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdzaGlmdFVwJzpcbiAgICAgICAgICAgICAgICAgICAgeWVhckNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB5ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NoaWZ0TGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc2hpZnREb3duJzpcbiAgICAgICAgICAgICAgICAgICAgeWVhckNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB5IC09IDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FsdFJpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdhbHRVcCc6XG4gICAgICAgICAgICAgICAgICAgIGRlY2FkZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB5ICs9IDEwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhbHRMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdhbHREb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZGVjYWRlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2N0cmxTaGlmdFVwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG90YWxEYXlzSW5OZXh0TW9udGggPSBkYXRlcGlja2VyLmdldERheXNDb3VudChuZXcgRGF0ZSh5LG0pKTtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZSh5LG0sZCk7XG5cbiAgICAgICAgICAgIC8vIElmIG5leHQgbW9udGggaGFzIGxlc3MgZGF5cyB0aGFuIGN1cnJlbnQsIHNldCBkYXRlIHRvIHRvdGFsIGRheXMgaW4gdGhhdCBtb250aFxuICAgICAgICAgICAgaWYgKHRvdGFsRGF5c0luTmV4dE1vbnRoIDwgZCkgZCA9IHRvdGFsRGF5c0luTmV4dE1vbnRoO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBuZXdEYXRlIGlzIGluIHZhbGlkIHJhbmdlXG4gICAgICAgICAgICBpZiAobmV3RGF0ZS5nZXRUaW1lKCkgPCB0aGlzLm1pblRpbWUpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRlID0gdGhpcy5taW5EYXRlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdEYXRlLmdldFRpbWUoKSA+IHRoaXMubWF4VGltZSkge1xuICAgICAgICAgICAgICAgIG5ld0RhdGUgPSB0aGlzLm1heERhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IG5ld0RhdGU7XG5cbiAgICAgICAgICAgIGZvY3VzZWRQYXJzZWQgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUobmV3RGF0ZSk7XG4gICAgICAgICAgICBpZiAobW9udGhDaGFuZ2VkICYmIG8ub25DaGFuZ2VNb250aCkge1xuICAgICAgICAgICAgICAgIG8ub25DaGFuZ2VNb250aChmb2N1c2VkUGFyc2VkLm1vbnRoLCBmb2N1c2VkUGFyc2VkLnllYXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeWVhckNoYW5nZWQgJiYgby5vbkNoYW5nZVllYXIpIHtcbiAgICAgICAgICAgICAgICBvLm9uQ2hhbmdlWWVhcihmb2N1c2VkUGFyc2VkLnllYXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVjYWRlQ2hhbmdlZCAmJiBvLm9uQ2hhbmdlRGVjYWRlKSB7XG4gICAgICAgICAgICAgICAgby5vbkNoYW5nZURlY2FkZSh0aGlzLmN1ckRlY2FkZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfcmVnaXN0ZXJLZXk6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBleGlzdHMgPSB0aGlzLmtleXMuc29tZShmdW5jdGlvbiAoY3VyS2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cktleSA9PSBrZXk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleXMucHVzaChrZXkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3VuUmVnaXN0ZXJLZXk6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMua2V5cy5pbmRleE9mKGtleSk7XG5cbiAgICAgICAgICAgIHRoaXMua2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9pc0hvdEtleVByZXNzZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SG90S2V5LFxuICAgICAgICAgICAgICAgIGZvdW5kID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHByZXNzZWRLZXlzID0gdGhpcy5rZXlzLnNvcnQoKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaG90S2V5IGluIGhvdEtleXMpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50SG90S2V5ID0gaG90S2V5c1tob3RLZXldO1xuICAgICAgICAgICAgICAgIGlmIChwcmVzc2VkS2V5cy5sZW5ndGggIT0gY3VycmVudEhvdEtleS5sZW5ndGgpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRIb3RLZXkuZXZlcnkoZnVuY3Rpb24gKGtleSwgaSkgeyByZXR1cm4ga2V5ID09IHByZXNzZWRLZXlzW2ldfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXIoJ2hvdEtleScsIGhvdEtleSk7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgfSxcblxuICAgICAgICBfdHJpZ2dlcjogZnVuY3Rpb24gKGV2ZW50LCBhcmdzKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC50cmlnZ2VyKGV2ZW50LCBhcmdzKVxuICAgICAgICB9LFxuXG4gICAgICAgIF9mb2N1c05leHRDZWxsOiBmdW5jdGlvbiAoa2V5Q29kZSwgdHlwZSkge1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUgfHwgdGhpcy5jZWxsVHlwZTtcblxuICAgICAgICAgICAgdmFyIGRhdGUgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5fZ2V0Rm9jdXNlZERhdGUoKSksXG4gICAgICAgICAgICAgICAgeSA9IGRhdGUueWVhcixcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5tb250aCxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZS5kYXRlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5faXNIb3RLZXlQcmVzc2VkKCkpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoKGtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDM3OiAvLyBsZWZ0XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ2RheScgPyAoZCAtPSAxKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdtb250aCcgPyAobSAtPSAxKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICd5ZWFyJyA/ICh5IC09IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzg6IC8vIHVwXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ2RheScgPyAoZCAtPSA3KSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdtb250aCcgPyAobSAtPSAzKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICd5ZWFyJyA/ICh5IC09IDQpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzk6IC8vIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ2RheScgPyAoZCArPSAxKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdtb250aCcgPyAobSArPSAxKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICd5ZWFyJyA/ICh5ICs9IDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDA6IC8vIGRvd25cbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnZGF5JyA/IChkICs9IDcpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ21vbnRoJyA/IChtICs9IDMpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ3llYXInID8gKHkgKz0gNCkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuZCA9IG5ldyBEYXRlKHksbSxkKTtcbiAgICAgICAgICAgIGlmIChuZC5nZXRUaW1lKCkgPCB0aGlzLm1pblRpbWUpIHtcbiAgICAgICAgICAgICAgICBuZCA9IHRoaXMubWluRGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmQuZ2V0VGltZSgpID4gdGhpcy5tYXhUaW1lKSB7XG4gICAgICAgICAgICAgICAgbmQgPSB0aGlzLm1heERhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IG5kO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldEZvY3VzZWREYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZm9jdXNlZCAgPSB0aGlzLmZvY3VzZWQgfHwgdGhpcy5zZWxlY3RlZERhdGVzW3RoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGggLSAxXSxcbiAgICAgICAgICAgICAgICBkID0gdGhpcy5wYXJzZWREYXRlO1xuXG4gICAgICAgICAgICBpZiAoIWZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzZWQgPSBuZXcgRGF0ZShkLnllYXIsIGQubW9udGgsIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNlZCA9IG5ldyBEYXRlKGQueWVhciwgZC5tb250aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNlZCA9IG5ldyBEYXRlKGQueWVhciwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmb2N1c2VkO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRDZWxsOiBmdW5jdGlvbiAoZGF0ZSwgdHlwZSkge1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUgfHwgdGhpcy5jZWxsVHlwZTtcblxuICAgICAgICAgICAgdmFyIGQgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnLmRhdGVwaWNrZXItLWNlbGxbZGF0YS15ZWFyPVwiJyArIGQueWVhciArICdcIl0nLFxuICAgICAgICAgICAgICAgICRjZWxsO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJ1tkYXRhLW1vbnRoPVwiJyArIGQubW9udGggKyAnXCJdJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgKz0gJ1tkYXRhLW1vbnRoPVwiJyArIGQubW9udGggKyAnXCJdW2RhdGEtZGF0ZT1cIicgKyBkLmRhdGUgKyAnXCJdJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkY2VsbCA9IHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uJGVsLmZpbmQoc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICByZXR1cm4gJGNlbGwubGVuZ3RoID8gJGNlbGwgOiAkKCcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgX3RoaXMuJGVsXG4gICAgICAgICAgICAgICAgLm9mZignLmFkcCcpXG4gICAgICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInLCAnJyk7XG5cbiAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIF90aGlzLmZvY3VzZWQgPSAnJztcbiAgICAgICAgICAgIF90aGlzLnZpZXdzID0ge307XG4gICAgICAgICAgICBfdGhpcy5rZXlzID0gW107XG4gICAgICAgICAgICBfdGhpcy5taW5SYW5nZSA9ICcnO1xuICAgICAgICAgICAgX3RoaXMubWF4UmFuZ2UgPSAnJztcblxuICAgICAgICAgICAgaWYgKF90aGlzLm9wdHMuaW5saW5lIHx8ICFfdGhpcy5lbElzSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZGF0ZXBpY2tlci5jbG9zZXN0KCcuZGF0ZXBpY2tlci1pbmxpbmUnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGRhdGVwaWNrZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzOiBmdW5jdGlvbiAoYWxyZWFkeVNlbGVjdGVkLCBzZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0cy50b2dnbGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgcG9zc2liaWxpdHkgdG8gc2VsZWN0IHNhbWUgZGF0ZSB3aGVuIHJhbmdlIGlzIHRydWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGggIT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcignY2xpY2tDZWxsJywgc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGF0ZShzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURhdGUoc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2hhbmdlIGxhc3Qgc2VsZWN0ZWQgZGF0ZSB0byBiZSBhYmxlIHRvIGNoYW5nZSB0aW1lIHdoZW4gY2xpY2tpbmcgb24gdGhpcyBjZWxsXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0cy50b2dnbGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFNlbGVjdGVkRGF0ZSA9IGFscmVhZHlTZWxlY3RlZDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyLl9zZXRUaW1lKGFscmVhZHlTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlci51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uU2hvd0V2ZW50OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25CbHVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5Gb2N1cyAmJiB0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZURvd25EYXRlcGlja2VyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdGhpcy5pbkZvY3VzID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZVVwRGF0ZXBpY2tlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5Gb2N1cyA9IGZhbHNlO1xuICAgICAgICAgICAgZS5vcmlnaW5hbEV2ZW50LmluRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFlLm9yaWdpbmFsRXZlbnQudGltZXBpY2tlckZvY3VzKSB0aGlzLiRlbC5mb2N1cygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbktleVVwR2VuZXJhbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSB0aGlzLiRlbC52YWwoKTtcblxuICAgICAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uUmVzaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlVXBCb2R5OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC5pbkZvY3VzKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUgJiYgIXRoaXMuaW5Gb2N1cykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlVXBFbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUub3JpZ2luYWxFdmVudC5pbkZvY3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5fb25LZXlVcEdlbmVyYWwuYmluZCh0aGlzKSw0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25LZXlEb3duOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBlLndoaWNoO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJLZXkoY29kZSk7XG5cbiAgICAgICAgICAgIC8vIEFycm93c1xuICAgICAgICAgICAgaWYgKGNvZGUgPj0gMzcgJiYgY29kZSA8PSA0MCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb2N1c05leHRDZWxsKGNvZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFbnRlclxuICAgICAgICAgICAgaWYgKGNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9nZXRDZWxsKHRoaXMuZm9jdXNlZCkuaGFzQ2xhc3MoJy1kaXNhYmxlZC0nKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aWV3ICE9IHRoaXMub3B0cy5taW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd24oKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFscmVhZHlTZWxlY3RlZCA9IHRoaXMuX2lzU2VsZWN0ZWQodGhpcy5mb2N1c2VkLCB0aGlzLmNlbGxUeXBlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZC5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWQuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZSh0aGlzLmZvY3VzZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzKGFscmVhZHlTZWxlY3RlZCwgdGhpcy5mb2N1c2VkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFc2NcbiAgICAgICAgICAgIGlmIChjb2RlID09IDI3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uS2V5VXA6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgY29kZSA9IGUud2hpY2g7XG4gICAgICAgICAgICB0aGlzLl91blJlZ2lzdGVyS2V5KGNvZGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkhvdEtleTogZnVuY3Rpb24gKGUsIGhvdEtleSkge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlSG90S2V5KGhvdEtleSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VFbnRlckNlbGw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJGNlbGwgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZGF0ZXBpY2tlci0tY2VsbCcpLFxuICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLl9nZXREYXRlRnJvbUNlbGwoJGNlbGwpO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGZyb20gdW5uZWNlc3NhcnkgcmVuZGVyaW5nIGFuZCBzZXR0aW5nIG5ldyBjdXJyZW50RGF0ZVxuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gJydcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGNlbGwuYWRkQ2xhc3MoJy1mb2N1cy0nKTtcblxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZGF0ZTtcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucmFuZ2UgJiYgdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5taW5SYW5nZSA9IHRoaXMuc2VsZWN0ZWREYXRlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1heFJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVwaWNrZXIubGVzcyh0aGlzLm1pblJhbmdlLCB0aGlzLmZvY3VzZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSB0aGlzLm1pblJhbmdlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3VwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlTGVhdmVDZWxsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyICRjZWxsID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmRhdGVwaWNrZXItLWNlbGwnKTtcblxuICAgICAgICAgICAgJGNlbGwucmVtb3ZlQ2xhc3MoJy1mb2N1cy0nKTtcblxuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gJyc7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vblRpbWVDaGFuZ2U6IGZ1bmN0aW9uIChlLCBoLCBtKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRlcyA9IHRoaXMuc2VsZWN0ZWREYXRlcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMubGFzdFNlbGVjdGVkRGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0ZS5zZXRIb3VycyhoKTtcbiAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyhtKTtcblxuICAgICAgICAgICAgaWYgKCFzZWxlY3RlZCAmJiAhdGhpcy5fZ2V0Q2VsbChkYXRlKS5oYXNDbGFzcygnLWRpc2FibGVkLScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKGRhdGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vblNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyT25DaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQ2xpY2tDZWxsOiBmdW5jdGlvbiAoZSwgZGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKGRhdGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBmb2N1c2VkKHZhbCkge1xuICAgICAgICAgICAgaWYgKCF2YWwgJiYgdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgdmFyICRjZWxsID0gdGhpcy5fZ2V0Q2VsbCh0aGlzLmZvY3VzZWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRjZWxsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAkY2VsbC5yZW1vdmVDbGFzcygnLWZvY3VzLScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHZhbDtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucmFuZ2UgJiYgdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5taW5SYW5nZSA9IHRoaXMuc2VsZWN0ZWREYXRlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1heFJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVwaWNrZXIubGVzcyh0aGlzLm1pblJhbmdlLCB0aGlzLl9mb2N1c2VkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1heFJhbmdlID0gdGhpcy5taW5SYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5SYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNpbGVudCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gdmFsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBmb2N1c2VkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IHBhcnNlZERhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMuZGF0ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGRhdGUgKHZhbCkge1xuICAgICAgICAgICAgaWYgKCEodmFsIGluc3RhbmNlb2YgRGF0ZSkpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHZhbDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGVkICYmICF0aGlzLnNpbGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy52aWV3XS5fcmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXYuX3JlbmRlcigpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUgJiYgdGhpcy5lbElzSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGRhdGUgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudERhdGVcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgdmlldyAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdJbmRleCA9IHRoaXMudmlld0luZGV4ZXMuaW5kZXhPZih2YWwpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52aWV3SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByZXZWaWV3ID0gdGhpcy5jdXJyZW50VmlldztcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB2YWw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRlZCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy52aWV3c1t2YWxdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld3NbdmFsXSA9IG5ldyAgJC5mbi5kYXRlcGlja2VyLkJvZHkodGhpcywgdmFsLCB0aGlzLm9wdHMpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3c1t2YWxdLl9yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMucHJldlZpZXddLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3ZhbF0uc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMubmF2Ll9yZW5kZXIoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25DaGFuZ2VWaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5vbkNoYW5nZVZpZXcodmFsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbElzSW5wdXQgJiYgdGhpcy52aXNpYmxlKSB0aGlzLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWxcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgdmlldygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBjZWxsVHlwZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXcuc3Vic3RyaW5nKDAsIHRoaXMudmlldy5sZW5ndGggLSAxKVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBtaW5UaW1lKCkge1xuICAgICAgICAgICAgdmFyIG1pbiA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLm1pbkRhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG1pbi55ZWFyLCBtaW4ubW9udGgsIG1pbi5kYXRlKS5nZXRUaW1lKClcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgbWF4VGltZSgpIHtcbiAgICAgICAgICAgIHZhciBtYXggPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5tYXhEYXRlKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShtYXgueWVhciwgbWF4Lm1vbnRoLCBtYXguZGF0ZSkuZ2V0VGltZSgpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGN1ckRlY2FkZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlcGlja2VyLmdldERlY2FkZSh0aGlzLmRhdGUpXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gIFV0aWxzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZGF0ZXBpY2tlci5nZXREYXlzQ291bnQgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAwKS5nZXREYXRlKCk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgZnVsbE1vbnRoOiAoZGF0ZS5nZXRNb250aCgpICsgMSkgPCAxMCA/ICcwJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSA6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8vIE9uZSBiYXNlZFxuICAgICAgICAgICAgZGF0ZTogZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICBmdWxsRGF0ZTogZGF0ZS5nZXREYXRlKCkgPCAxMCA/ICcwJyArIGRhdGUuZ2V0RGF0ZSgpIDogZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICBkYXk6IGRhdGUuZ2V0RGF5KCksXG4gICAgICAgICAgICBob3VyczogZGF0ZS5nZXRIb3VycygpLFxuICAgICAgICAgICAgZnVsbEhvdXJzOiAgZGF0ZS5nZXRIb3VycygpIDwgMTAgPyAnMCcgKyBkYXRlLmdldEhvdXJzKCkgOiAgZGF0ZS5nZXRIb3VycygpICxcbiAgICAgICAgICAgIG1pbnV0ZXM6IGRhdGUuZ2V0TWludXRlcygpLFxuICAgICAgICAgICAgZnVsbE1pbnV0ZXM6ICBkYXRlLmdldE1pbnV0ZXMoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkgOiAgZGF0ZS5nZXRNaW51dGVzKClcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmdldERlY2FkZSA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIHZhciBmaXJzdFllYXIgPSBNYXRoLmZsb29yKGRhdGUuZ2V0RnVsbFllYXIoKSAvIDEwKSAqIDEwO1xuXG4gICAgICAgIHJldHVybiBbZmlyc3RZZWFyLCBmaXJzdFllYXIgKyA5XTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci50ZW1wbGF0ZSA9IGZ1bmN0aW9uIChzdHIsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8jXFx7KFtcXHddKylcXH0vZywgZnVuY3Rpb24gKHNvdXJjZSwgbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChkYXRhW21hdGNoXSB8fCBkYXRhW21hdGNoXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW21hdGNoXVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5pc1NhbWUgPSBmdW5jdGlvbiAoZGF0ZTEsIGRhdGUyLCB0eXBlKSB7XG4gICAgICAgIGlmICghZGF0ZTEgfHwgIWRhdGUyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBkMSA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlMSksXG4gICAgICAgICAgICBkMiA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZShkYXRlMiksXG4gICAgICAgICAgICBfdHlwZSA9IHR5cGUgPyB0eXBlIDogJ2RheScsXG5cbiAgICAgICAgICAgIGNvbmRpdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZGF5OiBkMS5kYXRlID09IGQyLmRhdGUgJiYgZDEubW9udGggPT0gZDIubW9udGggJiYgZDEueWVhciA9PSBkMi55ZWFyLFxuICAgICAgICAgICAgICAgIG1vbnRoOiBkMS5tb250aCA9PSBkMi5tb250aCAmJiBkMS55ZWFyID09IGQyLnllYXIsXG4gICAgICAgICAgICAgICAgeWVhcjogZDEueWVhciA9PSBkMi55ZWFyXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBjb25kaXRpb25zW190eXBlXTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5sZXNzID0gZnVuY3Rpb24gKGRhdGVDb21wYXJlVG8sIGRhdGUsIHR5cGUpIHtcbiAgICAgICAgaWYgKCFkYXRlQ29tcGFyZVRvIHx8ICFkYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKSA8IGRhdGVDb21wYXJlVG8uZ2V0VGltZSgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmJpZ2dlciA9IGZ1bmN0aW9uIChkYXRlQ29tcGFyZVRvLCBkYXRlLCB0eXBlKSB7XG4gICAgICAgIGlmICghZGF0ZUNvbXBhcmVUbyB8fCAhZGF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKCkgPiBkYXRlQ29tcGFyZVRvLmdldFRpbWUoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5nZXRMZWFkaW5nWmVyb051bSA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KG51bSkgPCAxMCA/ICcwJyArIG51bSA6IG51bTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjb3B5IG9mIGRhdGUgd2l0aCBob3VycyBhbmQgbWludXRlcyBlcXVhbHMgdG8gMFxuICAgICAqIEBwYXJhbSBkYXRlIHtEYXRlfVxuICAgICAqL1xuICAgIGRhdGVwaWNrZXIucmVzZXRUaW1lID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRlICE9ICdvYmplY3QnKSByZXR1cm47XG4gICAgICAgIGRhdGUgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF0ZSlcbiAgICB9O1xuXG4gICAgJC5mbi5kYXRlcGlja2VyID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghJC5kYXRhKHRoaXMsIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICAgICAgICAgJC5kYXRhKHRoaXMsICBwbHVnaW5OYW1lLFxuICAgICAgICAgICAgICAgICAgICBuZXcgRGF0ZXBpY2tlciggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gJC5kYXRhKHRoaXMsIHBsdWdpbk5hbWUpO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIF90aGlzLm9wdHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJC5mbi5kYXRlcGlja2VyLkNvbnN0cnVjdG9yID0gRGF0ZXBpY2tlcjtcblxuICAgICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZSA9IHtcbiAgICAgICAgcnU6IHtcbiAgICAgICAgICAgIGRheXM6IFsn0JLQvtGB0LrRgNC10YHQtdC90YzQtScsJ9Cf0L7QvdC10LTQtdC70YzQvdC40LonLCfQktGC0L7RgNC90LjQuicsJ9Ch0YDQtdC00LAnLCfQp9C10YLQstC10YDQsycsJ9Cf0Y/RgtC90LjRhtCwJywn0KHRg9Cx0LHQvtGC0LAnXSxcbiAgICAgICAgICAgIGRheXNTaG9ydDogWyfQktGBJywn0J/QvScsJ9CS0YInLCfQodGAJywn0KfRgicsJ9Cf0YInLCfQodCxJ10sXG4gICAgICAgICAgICBkYXlzTWluOiBbJ9CS0YEnLCfQn9C9Jywn0JLRgicsJ9Ch0YAnLCfQp9GCJywn0J/RgicsJ9Ch0LEnXSxcbiAgICAgICAgICAgIG1vbnRoczogWyfQr9C90LLQsNGA0YwnLCfQpNC10LLRgNCw0LvRjCcsJ9Cc0LDRgNGCJywn0JDQv9GA0LXQu9GMJywn0JzQsNC5Jywn0JjRjtC90YwnLCfQmNGO0LvRjCcsJ9CQ0LLQs9GD0YHRgicsJ9Ch0LXQvdGC0Y/QsdGA0YwnLCfQntC60YLRj9Cx0YDRjCcsJ9Cd0L7Rj9Cx0YDRjCcsJ9CU0LXQutCw0LHRgNGMJ10sXG4gICAgICAgICAgICBtb250aHNTaG9ydDogWyfQr9C90LInLCfQpNC10LInLCfQnNCw0YAnLCfQkNC/0YAnLCfQnNCw0LknLCfQmNGO0L0nLCfQmNGO0LsnLCfQkNCy0LMnLCfQodC10L0nLCfQntC60YInLCfQndC+0Y8nLCfQlNC10LonXSxcbiAgICAgICAgICAgIHRvZGF5OiAn0KHQtdCz0L7QtNC90Y8nLFxuICAgICAgICAgICAgY2xlYXI6ICfQntGH0LjRgdGC0LjRgtGMJyxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eXl5JyxcbiAgICAgICAgICAgIHRpbWVGb3JtYXQ6ICdoaDppaScsXG4gICAgICAgICAgICBmaXJzdERheTogMVxuICAgICAgICB9XG4gICAgfTtcbiAgIC8vICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVsncnUnXSA9ICB7XG4gICAvLyAgICAgZGF5czogWyfQktC+0YHQutGA0LXRgdC10L3RjNC1Jywn0J/QvtC90LXQtNC10LvRjNC90LjQuicsJ9CS0YLQvtGA0L3QuNC6Jywn0KHRgNC10LTQsCcsJ9Cn0LXRgtCy0LXRgNCzJywn0J/Rj9GC0L3QuNGG0LAnLCfQodGD0LHQsdC+0YLQsCddLFxuICAgIC8vICAgIGRheXNTaG9ydDogWyfQktC+0YEnLCfQn9C+0L0nLCfQktGC0L4nLCfQodGA0LUnLCfQp9C10YInLCfQn9GP0YInLCfQodGD0LEnXSxcbiAgIC8vICAgICBkYXlzTWluOiBbJ9CS0YEnLCfQn9C9Jywn0JLRgicsJ9Ch0YAnLCfQp9GCJywn0J/RgicsJ9Ch0LEnXSxcbiAgIC8vICAgICBtb250aHM6IFsn0K/QvdCy0LDRgNGMJywn0KTQtdCy0YDQsNC70YwnLCfQnNCw0YDRgicsJ9CQ0L/RgNC10LvRjCcsJ9Cc0LDQuScsJ9CY0Y7QvdGMJywn0JjRjtC70YwnLCfQkNCy0LPRg9GB0YInLCfQodC10L3RgtGP0LHRgNGMJywn0J7QutGC0Y/QsdGA0YwnLCfQndC+0Y/QsdGA0YwnLCfQlNC10LrQsNCx0YDRjCddLFxuICAgLy8gICAgIG1vbnRoc1Nob3J0OiBbJ9Cv0L3QsicsJ9Ck0LXQsicsJ9Cc0LDRgCcsJ9CQ0L/RgCcsJ9Cc0LDQuScsJ9CY0Y7QvScsJ9CY0Y7QuycsJ9CQ0LLQsycsJ9Ch0LXQvScsJ9Ce0LrRgicsJ9Cd0L7RjycsJ9CU0LXQuiddLFxuICAgLy8gICAgIHRvZGF5OiAn0KHQtdCz0L7QtNC90Y8nLFxuICAvLyAgICAgIGNsZWFyOiAn0J7Rh9C40YHRgtC40YLRjCcsXG4gLy8gICAgICAgZGF0ZUZvcm1hdDogJ2RkLm1tLnl5eXknLFxuIC8vICAgICAgIHRpbWVGb3JtYXQ6ICdoaDppaScsXG4gLy8gICAgICAgZmlyc3REYXk6IDFcbiAvLyAgIH07XG5cblxuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKGF1dG9Jbml0U2VsZWN0b3IpLmRhdGVwaWNrZXIoKTtcbiAgICB9KVxuXG59KSgpO1xuXG47KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGVtcGxhdGVzID0ge1xuICAgICAgICBkYXlzOicnICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXlzIGRhdGVwaWNrZXItLWJvZHlcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXlzLW5hbWVzXCI+PC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY2VsbHMgZGF0ZXBpY2tlci0tY2VsbHMtZGF5c1wiPjwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgbW9udGhzOiAnJyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbW9udGhzIGRhdGVwaWNrZXItLWJvZHlcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy1tb250aHNcIj48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgIHllYXJzOiAnJyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0teWVhcnMgZGF0ZXBpY2tlci0tYm9keVwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLXllYXJzXCI+PC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGVwaWNrZXIgPSAkLmZuLmRhdGVwaWNrZXIsXG4gICAgICAgIGRwID0gZGF0ZXBpY2tlci5Db25zdHJ1Y3RvcjtcblxuICAgIGRhdGVwaWNrZXIuQm9keSA9IGZ1bmN0aW9uIChkLCB0eXBlLCBvcHRzKSB7XG4gICAgICAgIHRoaXMuZCA9IGQ7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMuJGVsID0gJCgnJyk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5Cb2R5LnByb3RvdHlwZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRCYXNlSHRtbCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2NsaWNrJywgJy5kYXRlcGlja2VyLS1jZWxsJywgJC5wcm94eSh0aGlzLl9vbkNsaWNrQ2VsbCwgdGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9idWlsZEJhc2VIdG1sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQodGVtcGxhdGVzW3RoaXMudHlwZV0pLmFwcGVuZFRvKHRoaXMuZC4kY29udGVudCk7XG4gICAgICAgICAgICB0aGlzLiRuYW1lcyA9ICQoJy5kYXRlcGlja2VyLS1kYXlzLW5hbWVzJywgdGhpcy4kZWwpO1xuICAgICAgICAgICAgdGhpcy4kY2VsbHMgPSAkKCcuZGF0ZXBpY2tlci0tY2VsbHMnLCB0aGlzLiRlbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldERheU5hbWVzSHRtbDogZnVuY3Rpb24gKGZpcnN0RGF5LCBjdXJEYXksIGh0bWwsIGkpIHtcbiAgICAgICAgICAgIGN1ckRheSA9IGN1ckRheSAhPSB1bmRlZmluZWQgPyBjdXJEYXkgOiBmaXJzdERheTtcbiAgICAgICAgICAgIGh0bWwgPSBodG1sID8gaHRtbCA6ICcnO1xuICAgICAgICAgICAgaSA9IGkgIT0gdW5kZWZpbmVkID8gaSA6IDA7XG5cbiAgICAgICAgICAgIGlmIChpID4gNykgcmV0dXJuIGh0bWw7XG4gICAgICAgICAgICBpZiAoY3VyRGF5ID09IDcpIHJldHVybiB0aGlzLl9nZXREYXlOYW1lc0h0bWwoZmlyc3REYXksIDAsIGh0bWwsICsraSk7XG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXktbmFtZScgKyAodGhpcy5kLmlzV2Vla2VuZChjdXJEYXkpID8gXCIgLXdlZWtlbmQtXCIgOiBcIlwiKSArICdcIj4nICsgdGhpcy5kLmxvYy5kYXlzTWluW2N1ckRheV0gKyAnPC9kaXY+JztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldERheU5hbWVzSHRtbChmaXJzdERheSwgKytjdXJEYXksIGh0bWwsICsraSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldENlbGxDb250ZW50czogZnVuY3Rpb24gKGRhdGUsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gXCJkYXRlcGlja2VyLS1jZWxsIGRhdGVwaWNrZXItLWNlbGwtXCIgKyB0eXBlLFxuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSB0aGlzLmQsXG4gICAgICAgICAgICAgICAgbWluUmFuZ2UgPSBkcC5yZXNldFRpbWUocGFyZW50Lm1pblJhbmdlKSxcbiAgICAgICAgICAgICAgICBtYXhSYW5nZSA9IGRwLnJlc2V0VGltZShwYXJlbnQubWF4UmFuZ2UpLFxuICAgICAgICAgICAgICAgIG9wdHMgPSBwYXJlbnQub3B0cyxcbiAgICAgICAgICAgICAgICBkID0gZHAuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICByZW5kZXIgPSB7fSxcbiAgICAgICAgICAgICAgICBodG1sID0gZC5kYXRlO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50LmlzV2Vla2VuZChkLmRheSkpIGNsYXNzZXMgKz0gXCIgLXdlZWtlbmQtXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLm1vbnRoICE9IHRoaXMuZC5wYXJzZWREYXRlLm1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9IFwiIC1vdGhlci1tb250aC1cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0cy5zZWxlY3RPdGhlck1vbnRocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gXCIgLWRpc2FibGVkLVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNob3dPdGhlck1vbnRocykgaHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IHBhcmVudC5sb2NbcGFyZW50Lm9wdHMubW9udGhzRmllbGRdW2QubW9udGhdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY2FkZSA9IHBhcmVudC5jdXJEZWNhZGU7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBkLnllYXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLnllYXIgPCBkZWNhZGVbMF0gfHwgZC55ZWFyID4gZGVjYWRlWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9ICcgLW90aGVyLWRlY2FkZS0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNlbGVjdE90aGVyWWVhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9IFwiIC1kaXNhYmxlZC1cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0cy5zaG93T3RoZXJZZWFycykgaHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5vblJlbmRlckNlbGwpIHtcbiAgICAgICAgICAgICAgICByZW5kZXIgPSBvcHRzLm9uUmVuZGVyQ2VsbChkYXRlLCB0eXBlKSB8fCB7fTtcbiAgICAgICAgICAgICAgICBodG1sID0gcmVuZGVyLmh0bWwgPyByZW5kZXIuaHRtbCA6IGh0bWw7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyArPSByZW5kZXIuY2xhc3NlcyA/ICcgJyArIHJlbmRlci5jbGFzc2VzIDogJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRwLmlzU2FtZShtaW5SYW5nZSwgZGF0ZSwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtcmFuZ2UtZnJvbS0nO1xuICAgICAgICAgICAgICAgIGlmIChkcC5pc1NhbWUobWF4UmFuZ2UsIGRhdGUsIHR5cGUpKSBjbGFzc2VzICs9ICcgLXJhbmdlLXRvLSc7XG5cbiAgICAgICAgICAgICAgICBpZiAocGFyZW50LnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDEgJiYgcGFyZW50LmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGRwLmJpZ2dlcihtaW5SYW5nZSwgZGF0ZSkgJiYgZHAubGVzcyhwYXJlbnQuZm9jdXNlZCwgZGF0ZSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoZHAubGVzcyhtYXhSYW5nZSwgZGF0ZSkgJiYgZHAuYmlnZ2VyKHBhcmVudC5mb2N1c2VkLCBkYXRlKSkpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gJyAtaW4tcmFuZ2UtJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRwLmxlc3MobWF4UmFuZ2UsIGRhdGUpICYmIGRwLmlzU2FtZShwYXJlbnQuZm9jdXNlZCwgZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gJyAtcmFuZ2UtZnJvbS0nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRwLmJpZ2dlcihtaW5SYW5nZSwgZGF0ZSkgJiYgZHAuaXNTYW1lKHBhcmVudC5mb2N1c2VkLCBkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIC1yYW5nZS10by0nXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50LnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRwLmJpZ2dlcihtaW5SYW5nZSwgZGF0ZSkgJiYgZHAubGVzcyhtYXhSYW5nZSwgZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gJyAtaW4tcmFuZ2UtJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChkcC5pc1NhbWUoY3VycmVudERhdGUsIGRhdGUsIHR5cGUpKSBjbGFzc2VzICs9ICcgLWN1cnJlbnQtJztcbiAgICAgICAgICAgIGlmIChwYXJlbnQuZm9jdXNlZCAmJiBkcC5pc1NhbWUoZGF0ZSwgcGFyZW50LmZvY3VzZWQsIHR5cGUpKSBjbGFzc2VzICs9ICcgLWZvY3VzLSc7XG4gICAgICAgICAgICBpZiAocGFyZW50Ll9pc1NlbGVjdGVkKGRhdGUsIHR5cGUpKSBjbGFzc2VzICs9ICcgLXNlbGVjdGVkLSc7XG4gICAgICAgICAgICBpZiAoIXBhcmVudC5faXNJblJhbmdlKGRhdGUsIHR5cGUpIHx8IHJlbmRlci5kaXNhYmxlZCkgY2xhc3NlcyArPSAnIC1kaXNhYmxlZC0nO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWw6IGh0bWwsXG4gICAgICAgICAgICAgICAgY2xhc3NlczogY2xhc3Nlc1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWxjdWxhdGVzIGRheXMgbnVtYmVyIHRvIHJlbmRlci4gR2VuZXJhdGVzIGRheXMgaHRtbCBhbmQgcmV0dXJucyBpdC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGUgLSBEYXRlIG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2dldERheXNIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIHRvdGFsTW9udGhEYXlzID0gZHAuZ2V0RGF5c0NvdW50KGRhdGUpLFxuICAgICAgICAgICAgICAgIGZpcnN0TW9udGhEYXkgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMSkuZ2V0RGF5KCksXG4gICAgICAgICAgICAgICAgbGFzdE1vbnRoRGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIHRvdGFsTW9udGhEYXlzKS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBkYXlzRnJvbVBldk1vbnRoID0gZmlyc3RNb250aERheSAtIHRoaXMuZC5sb2MuZmlyc3REYXksXG4gICAgICAgICAgICAgICAgZGF5c0Zyb21OZXh0TW9udGggPSA2IC0gbGFzdE1vbnRoRGF5ICsgdGhpcy5kLmxvYy5maXJzdERheTtcblxuICAgICAgICAgICAgZGF5c0Zyb21QZXZNb250aCA9IGRheXNGcm9tUGV2TW9udGggPCAwID8gZGF5c0Zyb21QZXZNb250aCArIDcgOiBkYXlzRnJvbVBldk1vbnRoO1xuICAgICAgICAgICAgZGF5c0Zyb21OZXh0TW9udGggPSBkYXlzRnJvbU5leHRNb250aCA+IDYgPyBkYXlzRnJvbU5leHRNb250aCAtIDcgOiBkYXlzRnJvbU5leHRNb250aDtcblxuICAgICAgICAgICAgdmFyIHN0YXJ0RGF5SW5kZXggPSAtZGF5c0Zyb21QZXZNb250aCArIDEsXG4gICAgICAgICAgICAgICAgbSwgeSxcbiAgICAgICAgICAgICAgICBodG1sID0gJyc7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydERheUluZGV4LCBtYXggPSB0b3RhbE1vbnRoRGF5cyArIGRheXNGcm9tTmV4dE1vbnRoOyBpIDw9IG1heDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5nZXRNb250aCgpO1xuXG4gICAgICAgICAgICAgICAgaHRtbCArPSB0aGlzLl9nZXREYXlIdG1sKG5ldyBEYXRlKHksIG0sIGkpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RGF5SHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9nZXRDZWxsQ29udGVudHMoZGF0ZSwgJ2RheScpO1xuXG4gICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCInICsgY29udGVudC5jbGFzc2VzICsgJ1wiICcgK1xuICAgICAgICAgICAgICAgICdkYXRhLWRhdGU9XCInICsgZGF0ZS5nZXREYXRlKCkgKyAnXCIgJyArXG4gICAgICAgICAgICAgICAgJ2RhdGEtbW9udGg9XCInICsgZGF0ZS5nZXRNb250aCgpICsgJ1wiICcgK1xuICAgICAgICAgICAgICAgICdkYXRhLXllYXI9XCInICsgZGF0ZS5nZXRGdWxsWWVhcigpICsgJ1wiPicgKyBjb250ZW50Lmh0bWwgKyAnPC9kaXY+JztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2VuZXJhdGVzIG1vbnRocyBodG1sXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRlIC0gZGF0ZSBpbnN0YW5jZVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2dldE1vbnRoc0h0bWw6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9ICcnLFxuICAgICAgICAgICAgICAgIGQgPSBkcC5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICB3aGlsZShpIDwgMTIpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IHRoaXMuX2dldE1vbnRoSHRtbChuZXcgRGF0ZShkLnllYXIsIGkpKTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldE1vbnRoSHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5fZ2V0Q2VsbENvbnRlbnRzKGRhdGUsICdtb250aCcpO1xuXG4gICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCInICsgY29udGVudC5jbGFzc2VzICsgJ1wiIGRhdGEtbW9udGg9XCInICsgZGF0ZS5nZXRNb250aCgpICsgJ1wiPicgKyBjb250ZW50Lmh0bWwgKyAnPC9kaXY+J1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRZZWFyc0h0bWw6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGRwLmdldFBhcnNlZERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgZGVjYWRlID0gZHAuZ2V0RGVjYWRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIGZpcnN0WWVhciA9IGRlY2FkZVswXSAtIDEsXG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnLFxuICAgICAgICAgICAgICAgIGkgPSBmaXJzdFllYXI7XG5cbiAgICAgICAgICAgIGZvciAoaTsgaSA8PSBkZWNhZGVbMV0gKyAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IHRoaXMuX2dldFllYXJIdG1sKG5ldyBEYXRlKGkgLCAwKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRZZWFySHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5fZ2V0Q2VsbENvbnRlbnRzKGRhdGUsICd5ZWFyJyk7XG5cbiAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyBjb250ZW50LmNsYXNzZXMgKyAnXCIgZGF0YS15ZWFyPVwiJyArIGRhdGUuZ2V0RnVsbFllYXIoKSArICdcIj4nICsgY29udGVudC5odG1sICsgJzwvZGl2PidcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyVHlwZXM6IHtcbiAgICAgICAgICAgIGRheXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF5TmFtZXMgPSB0aGlzLl9nZXREYXlOYW1lc0h0bWwodGhpcy5kLmxvYy5maXJzdERheSksXG4gICAgICAgICAgICAgICAgICAgIGRheXMgPSB0aGlzLl9nZXREYXlzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kY2VsbHMuaHRtbChkYXlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRuYW1lcy5odG1sKGRheU5hbWVzKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vbnRoczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBodG1sID0gdGhpcy5fZ2V0TW9udGhzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kY2VsbHMuaHRtbChodG1sKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHllYXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGh0bWwgPSB0aGlzLl9nZXRZZWFyc0h0bWwodGhpcy5kLmN1cnJlbnREYXRlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJGNlbGxzLmh0bWwoaHRtbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJUeXBlc1t0aGlzLnR5cGVdLmJpbmQodGhpcykoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJGNlbGxzID0gJCgnLmRhdGVwaWNrZXItLWNlbGwnLCB0aGlzLiRjZWxscyksXG4gICAgICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgJGNlbGwsXG4gICAgICAgICAgICAgICAgZGF0ZTtcbiAgICAgICAgICAgICRjZWxscy5lYWNoKGZ1bmN0aW9uIChjZWxsLCBpKSB7XG4gICAgICAgICAgICAgICAgJGNlbGwgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSBfdGhpcy5kLl9nZXREYXRlRnJvbUNlbGwoJCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IF90aGlzLl9nZXRDZWxsQ29udGVudHMoZGF0ZSwgX3RoaXMuZC5jZWxsVHlwZSk7XG4gICAgICAgICAgICAgICAgJGNlbGwuYXR0cignY2xhc3MnLGNsYXNzZXMuY2xhc3NlcylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMuYWNpdHZlID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vICBFdmVudHNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIF9oYW5kbGVDbGljazogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGVsLmRhdGEoJ2RhdGUnKSB8fCAxLFxuICAgICAgICAgICAgICAgIG1vbnRoID0gZWwuZGF0YSgnbW9udGgnKSB8fCAwLFxuICAgICAgICAgICAgICAgIHllYXIgPSBlbC5kYXRhKCd5ZWFyJykgfHwgdGhpcy5kLnBhcnNlZERhdGUueWVhcixcbiAgICAgICAgICAgICAgICBkcCA9IHRoaXMuZDtcbiAgICAgICAgICAgIC8vIENoYW5nZSB2aWV3IGlmIG1pbiB2aWV3IGRvZXMgbm90IHJlYWNoIHlldFxuICAgICAgICAgICAgaWYgKGRwLnZpZXcgIT0gdGhpcy5vcHRzLm1pblZpZXcpIHtcbiAgICAgICAgICAgICAgICBkcC5kb3duKG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2VsZWN0IGRhdGUgaWYgbWluIHZpZXcgaXMgcmVhY2hlZFxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKSxcbiAgICAgICAgICAgICAgICBhbHJlYWR5U2VsZWN0ZWQgPSB0aGlzLmQuX2lzU2VsZWN0ZWQoc2VsZWN0ZWREYXRlLCB0aGlzLmQuY2VsbFR5cGUpO1xuXG4gICAgICAgICAgICBpZiAoIWFscmVhZHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGRwLl90cmlnZ2VyKCdjbGlja0NlbGwnLCBzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZHAuX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzLmJpbmQoZHAsIGFscmVhZHlTZWxlY3RlZCwgc2VsZWN0ZWREYXRlKSgpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQ2xpY2tDZWxsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyICRlbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5kYXRlcGlja2VyLS1jZWxsJyk7XG5cbiAgICAgICAgICAgIGlmICgkZWwuaGFzQ2xhc3MoJy1kaXNhYmxlZC0nKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMpKCRlbCk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcblxuOyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gJycgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi1hY3Rpb25cIiBkYXRhLWFjdGlvbj1cInByZXZcIj4je3ByZXZIdG1sfTwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi10aXRsZVwiPiN7dGl0bGV9PC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LWFjdGlvblwiIGRhdGEtYWN0aW9uPVwibmV4dFwiPiN7bmV4dEh0bWx9PC9kaXY+JyxcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lclRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1idXR0b25zXCI+PC9kaXY+JyxcbiAgICAgICAgYnV0dG9uID0gJzxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tYnV0dG9uXCIgZGF0YS1hY3Rpb249XCIje2FjdGlvbn1cIj4je2xhYmVsfTwvc3Bhbj4nLFxuICAgICAgICBkYXRlcGlja2VyID0gJC5mbi5kYXRlcGlja2VyLFxuICAgICAgICBkcCA9IGRhdGVwaWNrZXIuQ29uc3RydWN0b3I7XG5cbiAgICBkYXRlcGlja2VyLk5hdmlnYXRpb24gPSBmdW5jdGlvbiAoZCwgb3B0cykge1xuICAgICAgICB0aGlzLmQgPSBkO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuXG4gICAgICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIgPSAnJztcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5OYXZpZ2F0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRCYXNlSHRtbCgpO1xuICAgICAgICAgICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmQuJG5hdi5vbignY2xpY2snLCAnLmRhdGVwaWNrZXItLW5hdi1hY3Rpb24nLCAkLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZCdXR0b24sIHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZC4kbmF2Lm9uKCdjbGljaycsICcuZGF0ZXBpY2tlci0tbmF2LXRpdGxlJywgJC5wcm94eSh0aGlzLl9vbkNsaWNrTmF2VGl0bGUsIHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZC4kZGF0ZXBpY2tlci5vbignY2xpY2snLCAnLmRhdGVwaWNrZXItLWJ1dHRvbicsICQucHJveHkodGhpcy5fb25DbGlja05hdkJ1dHRvbiwgdGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9idWlsZEJhc2VIdG1sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYWRkQnV0dG9uc0lmTmVlZCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9hZGRCdXR0b25zSWZOZWVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRvZGF5QnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQnV0dG9uKCd0b2RheScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsZWFyQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQnV0dG9uKCdjbGVhcicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5fZ2V0VGl0bGUodGhpcy5kLmN1cnJlbnREYXRlKSxcbiAgICAgICAgICAgICAgICBodG1sID0gZHAudGVtcGxhdGUodGVtcGxhdGUsICQuZXh0ZW5kKHt0aXRsZTogdGl0bGV9LCB0aGlzLm9wdHMpKTtcbiAgICAgICAgICAgIHRoaXMuZC4kbmF2Lmh0bWwoaHRtbCk7XG4gICAgICAgICAgICBpZiAodGhpcy5kLnZpZXcgPT0gJ3llYXJzJykge1xuICAgICAgICAgICAgICAgICQoJy5kYXRlcGlja2VyLS1uYXYtdGl0bGUnLCB0aGlzLmQuJG5hdikuYWRkQ2xhc3MoJy1kaXNhYmxlZC0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0TmF2U3RhdHVzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFRpdGxlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZC5mb3JtYXREYXRlKHRoaXMub3B0cy5uYXZUaXRsZXNbdGhpcy5kLnZpZXddLCBkYXRlKVxuICAgICAgICB9LFxuXG4gICAgICAgIF9hZGRCdXR0b246IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuJGJ1dHRvbnNDb250YWluZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQnV0dG9uc0NvbnRhaW5lcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5kLmxvY1t0eXBlXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaHRtbCA9IGRwLnRlbXBsYXRlKGJ1dHRvbiwgZGF0YSk7XG5cbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1hY3Rpb249JyArIHR5cGUgKyAnXScsIHRoaXMuJGJ1dHRvbnNDb250YWluZXIpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQoaHRtbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FkZEJ1dHRvbnNDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZC4kZGF0ZXBpY2tlci5hcHBlbmQoYnV0dG9uc0NvbnRhaW5lclRlbXBsYXRlKTtcbiAgICAgICAgICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIgPSAkKCcuZGF0ZXBpY2tlci0tYnV0dG9ucycsIHRoaXMuZC4kZGF0ZXBpY2tlcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0TmF2U3RhdHVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLm9wdHMubWluRGF0ZSB8fCB0aGlzLm9wdHMubWF4RGF0ZSkgfHwgIXRoaXMub3B0cy5kaXNhYmxlTmF2V2hlbk91dE9mUmFuZ2UpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGRhdGUgPSB0aGlzLmQucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5tb250aCxcbiAgICAgICAgICAgICAgICB5ID0gZGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmRhdGU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5kLnZpZXcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZSh5LCBtLTEsIDEpLCAnbW9udGgnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdigncHJldicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZSh5LCBtKzEsIDEpLCAnbW9udGgnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdignbmV4dCcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZSh5LTEsIG0sIGQpLCAneWVhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlTmF2KCdwcmV2JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKHkrMSwgbSwgZCksICd5ZWFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ25leHQnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY2FkZSA9IGRwLmdldERlY2FkZSh0aGlzLmQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoZGVjYWRlWzBdIC0gMSwgMCwgMSksICd5ZWFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ3ByZXYnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoZGVjYWRlWzFdICsgMSwgMCwgMSksICd5ZWFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ25leHQnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9kaXNhYmxlTmF2OiBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgICAgICAkKCdbZGF0YS1hY3Rpb249XCInICsgbmF2ICsgJ1wiXScsIHRoaXMuZC4kbmF2KS5hZGRDbGFzcygnLWRpc2FibGVkLScpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FjdGl2YXRlTmF2OiBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgICAgICAkKCdbZGF0YS1hY3Rpb249XCInICsgbmF2ICsgJ1wiXScsIHRoaXMuZC4kbmF2KS5yZW1vdmVDbGFzcygnLWRpc2FibGVkLScpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQ2xpY2tOYXZCdXR0b246IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJGVsID0gJChlLnRhcmdldCkuY2xvc2VzdCgnW2RhdGEtYWN0aW9uXScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbiA9ICRlbC5kYXRhKCdhY3Rpb24nKTtcblxuICAgICAgICAgICAgdGhpcy5kW2FjdGlvbl0oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25DbGlja05hdlRpdGxlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKCctZGlzYWJsZWQtJykpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZC52aWV3ID09ICdkYXlzJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmQudmlldyA9ICdtb250aHMnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZC52aWV3ID0gJ3llYXJzJztcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcblxuOyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50XCI+JyArXG4gICAgICAgICcgICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1ob3Vyc1wiPiN7aG91clZpc2libGV9PC9zcGFuPicgK1xuICAgICAgICAnICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtY29sb25cIj46PC9zcGFuPicgK1xuICAgICAgICAnICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtbWludXRlc1wiPiN7bWluVmFsdWV9PC9zcGFuPicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1zbGlkZXJzXCI+JyArXG4gICAgICAgICcgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1yb3dcIj4nICtcbiAgICAgICAgJyAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBuYW1lPVwiaG91cnNcIiB2YWx1ZT1cIiN7aG91clZhbHVlfVwiIG1pbj1cIiN7aG91ck1pbn1cIiBtYXg9XCIje2hvdXJNYXh9XCIgc3RlcD1cIiN7aG91clN0ZXB9XCIvPicgK1xuICAgICAgICAnICAgPC9kaXY+JyArXG4gICAgICAgICcgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1yb3dcIj4nICtcbiAgICAgICAgJyAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBuYW1lPVwibWludXRlc1wiIHZhbHVlPVwiI3ttaW5WYWx1ZX1cIiBtaW49XCIje21pbk1pbn1cIiBtYXg9XCIje21pbk1heH1cIiBzdGVwPVwiI3ttaW5TdGVwfVwiLz4nICtcbiAgICAgICAgJyAgIDwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICBkYXRlcGlja2VyID0gJC5mbi5kYXRlcGlja2VyLFxuICAgICAgICBkcCA9IGRhdGVwaWNrZXIuQ29uc3RydWN0b3I7XG5cbiAgICBkYXRlcGlja2VyLlRpbWVwaWNrZXIgPSBmdW5jdGlvbiAoaW5zdCwgb3B0cykge1xuICAgICAgICB0aGlzLmQgPSBpbnN0O1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLlRpbWVwaWNrZXIucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAnaW5wdXQnO1xuICAgICAgICAgICAgdGhpcy5fc2V0VGltZSh0aGlzLmQuZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLl9idWlsZEhUTUwoKTtcblxuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3RyaWRlbnQvZ2kpKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSAnY2hhbmdlJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kLiRlbC5vbignc2VsZWN0RGF0ZScsIHRoaXMuX29uU2VsZWN0RGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJHJhbmdlcy5vbihpbnB1dCwgdGhpcy5fb25DaGFuZ2VSYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJHJhbmdlcy5vbignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcFJhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2VzLm9uKCdtb3VzZW1vdmUgZm9jdXMgJywgdGhpcy5fb25Nb3VzZUVudGVyUmFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRyYW5nZXMub24oJ21vdXNlb3V0IGJsdXInLCB0aGlzLl9vbk1vdXNlT3V0UmFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldFRpbWU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgX2RhdGUgPSBkcC5nZXRQYXJzZWREYXRlKGRhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEYXRlKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5ob3VycyA9IF9kYXRlLmhvdXJzIDwgdGhpcy5taW5Ib3VycyA/IHRoaXMubWluSG91cnMgOiBfZGF0ZS5ob3VycztcbiAgICAgICAgICAgIHRoaXMubWludXRlcyA9IF9kYXRlLm1pbnV0ZXMgPCB0aGlzLm1pbk1pbnV0ZXMgPyB0aGlzLm1pbk1pbnV0ZXMgOiBfZGF0ZS5taW51dGVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIG1pbkhvdXJzIGFuZCBtaW5NaW51dGVzIGZyb20gZGF0ZSAodXN1YWxseSBpdCdzIGEgbWluRGF0ZSlcbiAgICAgICAgICogQWxzbyBjaGFuZ2VzIG1pbk1pbnV0ZXMgaWYgY3VycmVudCBob3VycyBhcmUgYmlnZ2VyIHRoZW4gQGRhdGUgaG91cnNcbiAgICAgICAgICogQHBhcmFtIGRhdGUge0RhdGV9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfc2V0TWluVGltZUZyb21EYXRlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5taW5Ib3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgIHRoaXMubWluTWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuXG4gICAgICAgICAgICAvLyBJZiwgZm9yIGV4YW1wbGUsIG1pbiBob3VycyBhcmUgMTAsIGFuZCBjdXJyZW50IGhvdXJzIGFyZSAxMixcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBtaW5NaW51dGVzIHRvIGRlZmF1bHQgdmFsdWUsIHRvIGJlIGFibGUgdG8gY2hvb3NlIHdob2xlIHJhbmdlIG9mIHZhbHVlc1xuICAgICAgICAgICAgaWYgKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlLmdldEhvdXJzKCkgPiBkYXRlLmdldEhvdXJzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5NaW51dGVzID0gdGhpcy5vcHRzLm1pbk1pbnV0ZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9zZXRNYXhUaW1lRnJvbURhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1heEhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICAgICAgdGhpcy5tYXhNaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZS5nZXRIb3VycygpIDwgZGF0ZS5nZXRIb3VycygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF4TWludXRlcyA9IHRoaXMub3B0cy5tYXhNaW51dGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfc2V0RGVmYXVsdE1pbk1heFRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtYXhIb3VycyA9IDIzLFxuICAgICAgICAgICAgICAgIG1heE1pbnV0ZXMgPSA1OSxcbiAgICAgICAgICAgICAgICBvcHRzID0gdGhpcy5vcHRzO1xuXG4gICAgICAgICAgICB0aGlzLm1pbkhvdXJzID0gb3B0cy5taW5Ib3VycyA8IDAgfHwgb3B0cy5taW5Ib3VycyA+IG1heEhvdXJzID8gMCA6IG9wdHMubWluSG91cnM7XG4gICAgICAgICAgICB0aGlzLm1pbk1pbnV0ZXMgPSBvcHRzLm1pbk1pbnV0ZXMgPCAwIHx8IG9wdHMubWluTWludXRlcyA+IG1heE1pbnV0ZXMgPyAwIDogb3B0cy5taW5NaW51dGVzO1xuICAgICAgICAgICAgdGhpcy5tYXhIb3VycyA9IG9wdHMubWF4SG91cnMgPCAwIHx8IG9wdHMubWF4SG91cnMgPiBtYXhIb3VycyA/IG1heEhvdXJzIDogb3B0cy5tYXhIb3VycztcbiAgICAgICAgICAgIHRoaXMubWF4TWludXRlcyA9IG9wdHMubWF4TWludXRlcyA8IDAgfHwgb3B0cy5tYXhNaW51dGVzID4gbWF4TWludXRlcyA/IG1heE1pbnV0ZXMgOiBvcHRzLm1heE1pbnV0ZXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvb2tzIGZvciBtaW4vbWF4IGhvdXJzL21pbnV0ZXMgYW5kIGlmIGN1cnJlbnQgdmFsdWVzXG4gICAgICAgICAqIGFyZSBvdXQgb2YgcmFuZ2Ugc2V0cyB2YWxpZCB2YWx1ZXMuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfdmFsaWRhdGVIb3Vyc01pbnV0ZXM6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3VycyA8IHRoaXMubWluSG91cnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXJzID0gdGhpcy5taW5Ib3VycztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ob3VycyA+IHRoaXMubWF4SG91cnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXJzID0gdGhpcy5tYXhIb3VycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWludXRlcyA8IHRoaXMubWluTWludXRlcykge1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMubWluTWludXRlcztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5taW51dGVzID4gdGhpcy5tYXhNaW51dGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5tYXhNaW51dGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9idWlsZEhUTUw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBseiA9IGRwLmdldExlYWRpbmdaZXJvTnVtLFxuICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXJNaW46IHRoaXMubWluSG91cnMsXG4gICAgICAgICAgICAgICAgICAgIGhvdXJNYXg6IGx6KHRoaXMubWF4SG91cnMpLFxuICAgICAgICAgICAgICAgICAgICBob3VyU3RlcDogdGhpcy5vcHRzLmhvdXJzU3RlcCxcbiAgICAgICAgICAgICAgICAgICAgaG91clZhbHVlOiB0aGlzLmhvdXJzLFxuICAgICAgICAgICAgICAgICAgICBob3VyVmlzaWJsZTogbHoodGhpcy5kaXNwbGF5SG91cnMpLFxuICAgICAgICAgICAgICAgICAgICBtaW5NaW46IHRoaXMubWluTWludXRlcyxcbiAgICAgICAgICAgICAgICAgICAgbWluTWF4OiBseih0aGlzLm1heE1pbnV0ZXMpLFxuICAgICAgICAgICAgICAgICAgICBtaW5TdGVwOiB0aGlzLm9wdHMubWludXRlc1N0ZXAsXG4gICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiBseih0aGlzLm1pbnV0ZXMpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfdGVtcGxhdGUgPSBkcC50ZW1wbGF0ZSh0ZW1wbGF0ZSwgZGF0YSk7XG5cbiAgICAgICAgICAgIHRoaXMuJHRpbWVwaWNrZXIgPSAkKF90ZW1wbGF0ZSkuYXBwZW5kVG8odGhpcy5kLiRkYXRlcGlja2VyKTtcbiAgICAgICAgICAgIHRoaXMuJHJhbmdlcyA9ICQoJ1t0eXBlPVwicmFuZ2VcIl0nLCB0aGlzLiR0aW1lcGlja2VyKTtcbiAgICAgICAgICAgIHRoaXMuJGhvdXJzID0gJCgnW25hbWU9XCJob3Vyc1wiXScsIHRoaXMuJHRpbWVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kbWludXRlcyA9ICQoJ1tuYW1lPVwibWludXRlc1wiXScsIHRoaXMuJHRpbWVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kaG91cnNUZXh0ID0gJCgnLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1ob3VycycsIHRoaXMuJHRpbWVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kbWludXRlc1RleHQgPSAkKCcuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LW1pbnV0ZXMnLCB0aGlzLiR0aW1lcGlja2VyKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZC5hbXBtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYW1wbSA9ICQoJzxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWFtcG1cIj4nKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJCgnLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudCcsIHRoaXMuJHRpbWVwaWNrZXIpKVxuICAgICAgICAgICAgICAgICAgICAuaHRtbCh0aGlzLmRheVBlcmlvZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lcGlja2VyLmFkZENsYXNzKCctYW0tcG0tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3VwZGF0ZUN1cnJlbnRUaW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaCA9ICBkcC5nZXRMZWFkaW5nWmVyb051bSh0aGlzLmRpc3BsYXlIb3VycyksXG4gICAgICAgICAgICAgICAgbSA9IGRwLmdldExlYWRpbmdaZXJvTnVtKHRoaXMubWludXRlcyk7XG5cbiAgICAgICAgICAgIHRoaXMuJGhvdXJzVGV4dC5odG1sKGgpO1xuICAgICAgICAgICAgdGhpcy4kbWludXRlc1RleHQuaHRtbChtKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZC5hbXBtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYW1wbS5odG1sKHRoaXMuZGF5UGVyaW9kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdXBkYXRlUmFuZ2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRob3Vycy5hdHRyKHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluSG91cnMsXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heEhvdXJzXG4gICAgICAgICAgICB9KS52YWwodGhpcy5ob3Vycyk7XG5cbiAgICAgICAgICAgIHRoaXMuJG1pbnV0ZXMuYXR0cih7XG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pbk1pbnV0ZXMsXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heE1pbnV0ZXNcbiAgICAgICAgICAgIH0pLnZhbCh0aGlzLm1pbnV0ZXMpXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgbWluSG91cnMsIG1pbk1pbnV0ZXMgZXRjLiBmcm9tIGRhdGUuIElmIGRhdGUgaXMgbm90IHBhc3NlZCwgdGhhbiBzZXRzXG4gICAgICAgICAqIHZhbHVlcyBmcm9tIG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIFtkYXRlXSB7b2JqZWN0fSAtIERhdGUgb2JqZWN0LCB0byBnZXQgdmFsdWVzIGZyb21cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9oYW5kbGVEYXRlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0RGVmYXVsdE1pbk1heFRpbWUoKTtcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRwLmlzU2FtZShkYXRlLCB0aGlzLmQub3B0cy5taW5EYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRNaW5UaW1lRnJvbURhdGUodGhpcy5kLm9wdHMubWluRGF0ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkcC5pc1NhbWUoZGF0ZSwgdGhpcy5kLm9wdHMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0TWF4VGltZUZyb21EYXRlKHRoaXMuZC5vcHRzLm1heERhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVIb3Vyc01pbnV0ZXMoZGF0ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVSYW5nZXMoKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUN1cnJlbnRUaW1lKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbGN1bGF0ZXMgdmFsaWQgaG91ciB2YWx1ZSB0byBkaXNwbGF5IGluIHRleHQgaW5wdXQgYW5kIGRhdGVwaWNrZXIncyBib2R5LlxuICAgICAgICAgKiBAcGFyYW0gZGF0ZSB7RGF0ZXxOdW1iZXJ9IC0gZGF0ZSBvciBob3Vyc1xuICAgICAgICAgKiBAcGFyYW0gW2FtcG1dIHtCb29sZWFufSAtIDEyIGhvdXJzIG1vZGVcbiAgICAgICAgICogQHJldHVybnMge3tob3VyczogKiwgZGF5UGVyaW9kOiBzdHJpbmd9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2dldFZhbGlkSG91cnNGcm9tRGF0ZTogZnVuY3Rpb24gKGRhdGUsIGFtcG0pIHtcbiAgICAgICAgICAgIHZhciBkID0gZGF0ZSxcbiAgICAgICAgICAgICAgICBob3VycyA9IGRhdGU7XG5cbiAgICAgICAgICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIGQgPSBkcC5nZXRQYXJzZWREYXRlKGRhdGUpO1xuICAgICAgICAgICAgICAgIGhvdXJzID0gZC5ob3VycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9hbXBtID0gYW1wbSB8fCB0aGlzLmQuYW1wbSxcbiAgICAgICAgICAgICAgICBkYXlQZXJpb2QgPSAnYW0nO1xuXG4gICAgICAgICAgICBpZiAoX2FtcG0pIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2godHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGhvdXJzID09IDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBob3VycyA9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgaG91cnMgPT0gMTI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlQZXJpb2QgPSAncG0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgaG91cnMgPiAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9ICdwbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBob3VyczogaG91cnMsXG4gICAgICAgICAgICAgICAgZGF5UGVyaW9kOiBkYXlQZXJpb2RcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgaG91cnMgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5faG91cnMgPSB2YWw7XG5cbiAgICAgICAgICAgIHZhciBkaXNwbGF5SG91cnMgPSB0aGlzLl9nZXRWYWxpZEhvdXJzRnJvbURhdGUodmFsKTtcblxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SG91cnMgPSBkaXNwbGF5SG91cnMuaG91cnM7XG4gICAgICAgICAgICB0aGlzLmRheVBlcmlvZCA9IGRpc3BsYXlIb3Vycy5kYXlQZXJpb2Q7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGhvdXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hvdXJzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vICBFdmVudHNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIF9vbkNoYW5nZVJhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGUudGFyZ2V0KSxcbiAgICAgICAgICAgICAgICBuYW1lID0gJHRhcmdldC5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZC50aW1lcGlja2VySXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzW25hbWVdID0gJHRhcmdldC52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUN1cnJlbnRUaW1lKCk7XG4gICAgICAgICAgICB0aGlzLmQuX3RyaWdnZXIoJ3RpbWVDaGFuZ2UnLCBbdGhpcy5ob3VycywgdGhpcy5taW51dGVzXSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZURhdGUodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vblNlbGVjdERhdGU6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEYXRlKGRhdGEpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZUVudGVyUmFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICQoZS50YXJnZXQpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICQoJy5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtJyArIG5hbWUsIHRoaXMuJHRpbWVwaWNrZXIpLmFkZENsYXNzKCctZm9jdXMtJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VPdXRSYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJChlLnRhcmdldCkuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZC5pbkZvY3VzKSByZXR1cm47IC8vIFByZXZlbnQgcmVtb3ZpbmcgZm9jdXMgd2hlbiBtb3VzZSBvdXQgb2YgcmFuZ2Ugc2xpZGVyXG4gICAgICAgICAgICAkKCcuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LScgKyBuYW1lLCB0aGlzLiR0aW1lcGlja2VyKS5yZW1vdmVDbGFzcygnLWZvY3VzLScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlVXBSYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZC50aW1lcGlja2VySXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuIH0pKHdpbmRvdywgalF1ZXJ5KTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy/vv73vv73vv73vv70g77+977+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv70g77+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv70g77+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/vSEhISEhISEhISEhIVxyXG4vL++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSBqUXVlcnkg77+9IO+/ve+/ve+/ve+/ve+/ve+/vSwg77+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv70gaHRtbFxyXG4vL2ltcG9ydCAkIGZyb20gJ2pxdWVyeSc7ICAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv70gbm9kZW1vZHVsZXNcclxuLy9pbXBvcnQgKiBhcyAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG4vL2dsb2JhbC5qUXVlcnkgPSAkO1xyXG4vL2dsb2JhbC4kID0gJDtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbi8vLS0tLS0tLe+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70tLS0tLS0tLS0tLS0tLS0tLy9cclxuLy8tLS0tLS0t77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuaW1wb3J0ICcuL2Nzcy9mb250LmNzcyc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vY3NzL3N0eWxlLmNzcyc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv70g77+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9sb2dvL2xvZ28uY3NzJzsgICAgICAgICAgICAgICAgICAgLy/vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9XHJcbi8vLS0tLS0tLe+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv70tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5cclxuaW1wb3J0ICcuL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b24uY3NzJzsgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b25hcnJvdy5jc3MnOy8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b253aXRlLmNzcyc7IC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvbWFpbnRleHQvbWFpbnRleHQuY3NzJzsgICAgICAgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvdGV4dGZpZWxkL3RleHRmaWVsZC5jc3MnOyAgICAgICAgIC8v77+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9yYWRpb2J1dHRvbi9yYWRpb2J1dHRvbi5jc3MnOyAgICAgLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL21hc2tlZGZpZWxkL21hc2tlZGZpZWxkLmNzcyc7ICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+9IO+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy90b2dnbGVidXR0b24vdG9nZ2xlYnV0dG9uLmNzcyc7ICAgLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+9L++/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9kYXRlZHJvcC9kYXRlZHJvcC5jc3MnOyAgICAgICAgICAgLy/vv73vv73vv73vv70g77+977+977+977+977+9IO+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9kcm9wZG93bi9kcm9wZG93bi5jc3MnOyAgICAgICAgICAgLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9XHJcbi8vaW1wb3J0ICcuL21vZHVsZXMvcmFuZ2VzbGlkZXIvcmFuZ2VzbGlkZXIuY3NzJzsgIC8v77+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5cclxuLy8tLS0tLS1jc3Mg77+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5cclxuLy9pbXBvcnQgJy4vY3NzL3NlYXJjaHJvb20uY3NzJzsgICAgICAgICAgICAgICAgICAgICAgLy/vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL2hlYWRlci9oZWFkZXItc3R5bGUuY3NzJzsgICAgICAgICAvL++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9ibG9jay9tZW51dG9wL21lbnV0b3AuY3NzJzsgICAgICAgICAgICAgLy/vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vYmxvY2svc2VhcmNoZm9ybS9zZWFyY2hmb3JtLmNzcyc7ICAgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9mb290ZXJzdHlsZS5jc3MnOyAgICAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vYmxvY2svZm9vdGVyL21lbnUvZm9vdGVybWVudS5jc3MnOyAgICAgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vYmxvY2svZm9vdGVyL3N1YnNjcmliZS9zdWJzY3JpYmUuY3NzJzsgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vYmxvY2svZm9vdGVyL2NvbXBhbnkvYWR2ZXJ0LmNzcyc7ICAgICAgIC8v77+977+977+977+977+977+977+9IO+/ve+/ve+/vSDvv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9jb21wYW55L2NvbXBhbnkuY3NzJzsgICAgICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv70g77+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vYmxvY2svZm9vdGVyL2NvcHlyaXRlL2NvcHlyaXRlLmNzcyc7ICAgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vYmxvY2svZm9vdGVyL3NvY2lhbC9zb2NpYWwuY3NzJzsgICAgICAgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vYmxvY2svcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5jc3MnOyAgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG4vL2ltcG9ydCAnLi9ibG9jay9jYWxlbmRhci9jYWxlbmRhci5jc3MnOyAgICAgICAgICAgLy/vv73vv73vv73vv70g77+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG4vL2ltcG9ydCAnLi9ibG9jay92aXNpdG9yL3Zpc2l0b3IuY3NzJzsgICAgICAgICAgICAgLy/vv73vv73vv73vv70g77+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbi8v77+977+977+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv71cclxuLy9pbXBvcnQgJy4vZm9ybWVsZW1lbnQuaHRtbCc7XHJcbi8vaW1wb3J0IGh0bWwgZnJvbSAncmVnaXN0cmF0aW9uLmh0bWwnO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbi8v77+977+977+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG4vL3NpbXBvcnQgJy4vYmxvY2svY2FsZW5kYXIvY2FsZW5kYXIuanMnO1xyXG4vL2ltcG9ydCAnLi9ibG9jay9zZWFyY2hmb3JtL3NlYXJjaGZvcm0uanMnO1xyXG4vL2ltcG9ydCAnLi9ibG9jay92aXNpdG9yL3Zpc2l0b3IuanMnO1xyXG4vL2ltcG9ydCAnLi9qcy9zZWFyY2hyb29tLmpzJzsgICAgICAgICAgICAgIC8v77+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuLy9pbXBvcnQgJy4vbW9kdWxlcy9yYW5nZXNsaWRlci9yYW5nZXNsaWRlci5qcyc7ICAgICAgICAvL++/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuLy9pbXBvcnQgYnRuQ291bnQgZnJvbSAnLi9idXR0b24uanMnO1xyXG4vL2ltcG9ydCBidG5yZWdpc3JhdGlvbiBmcm9tICcuL21vZHVsZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5qcyc7ICAgICAgICAgLy/vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv71cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5cclxuLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70gZGF0ZXBpY2tlclxyXG4vL2ltcG9ydCAnLi9ibG9jay9kYXRlcGlja2VyL2RhdGVwaWNrZXIuY3NzJztcclxuLy9pbXBvcnQgJy4vYmxvY2svZGF0ZXBpY2tlci9kYXRlcGlja2VyLmpzJztcclxuLy9pbXBvcnQgJy4vYmxvY2svZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1pbi5jc3MnO1xyXG4vL2ltcG9ydCAnLi9ibG9jay9kYXRlcGlja2VyL2RhdGVwaWNrZXIubWluLmpzJztcclxuaW1wb3J0ICcuL2Jsb2NrL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5jc3MnO1xyXG5pbXBvcnQgJy4vYmxvY2svZGF0ZXBpY2tlci9kYXRlcGlja2VyLmpzJztcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5cclxuLy9pbXBvcnQgXCIuL2pxdWVyeS0zLjQuMS5taW4uanNcIjtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS3vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9LS0tLS0tLS0tLS0tLS0tXHJcbi8vaW1wb3J0IEljb24gZnJvbSAnLi9pY29uLnBuZyc7XHJcbiJdLCJuYW1lcyI6WyJ3aW5kb3ciLCIkIiwidW5kZWZpbmVkIiwiVkVSU0lPTiIsInBsdWdpbk5hbWUiLCJhdXRvSW5pdFNlbGVjdG9yIiwiJGJvZHkiLCIkZGF0ZXBpY2tlcnNDb250YWluZXIiLCJjb250YWluZXJCdWlsdCIsImJhc2VUZW1wbGF0ZSIsImRlZmF1bHRzIiwiY2xhc3NlcyIsImlubGluZSIsImxhbmd1YWdlIiwic3RhcnREYXRlIiwiRGF0ZSIsImZpcnN0RGF5Iiwid2Vla2VuZHMiLCJkYXRlRm9ybWF0IiwiYWx0RmllbGQiLCJhbHRGaWVsZERhdGVGb3JtYXQiLCJ0b2dnbGVTZWxlY3RlZCIsImtleWJvYXJkTmF2IiwicG9zaXRpb24iLCJvZmZzZXQiLCJ2aWV3IiwibWluVmlldyIsInNob3dPdGhlck1vbnRocyIsInNlbGVjdE90aGVyTW9udGhzIiwibW92ZVRvT3RoZXJNb250aHNPblNlbGVjdCIsInNob3dPdGhlclllYXJzIiwic2VsZWN0T3RoZXJZZWFycyIsIm1vdmVUb090aGVyWWVhcnNPblNlbGVjdCIsIm1pbkRhdGUiLCJtYXhEYXRlIiwiZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlIiwibXVsdGlwbGVEYXRlcyIsIm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IiLCJyYW5nZSIsInRvZGF5QnV0dG9uIiwiY2xlYXJCdXR0b24iLCJzaG93RXZlbnQiLCJhdXRvQ2xvc2UiLCJtb250aHNGaWVsZCIsInByZXZIdG1sIiwibmV4dEh0bWwiLCJuYXZUaXRsZXMiLCJkYXlzIiwibW9udGhzIiwieWVhcnMiLCJ0aW1lcGlja2VyIiwib25seVRpbWVwaWNrZXIiLCJkYXRlVGltZVNlcGFyYXRvciIsInRpbWVGb3JtYXQiLCJtaW5Ib3VycyIsIm1heEhvdXJzIiwibWluTWludXRlcyIsIm1heE1pbnV0ZXMiLCJob3Vyc1N0ZXAiLCJtaW51dGVzU3RlcCIsIm9uU2VsZWN0Iiwib25TaG93Iiwib25IaWRlIiwib25DaGFuZ2VNb250aCIsIm9uQ2hhbmdlWWVhciIsIm9uQ2hhbmdlRGVjYWRlIiwib25DaGFuZ2VWaWV3Iiwib25SZW5kZXJDZWxsIiwiaG90S2V5cyIsImRhdGVwaWNrZXIiLCJEYXRlcGlja2VyIiwiZWwiLCJvcHRpb25zIiwiJGVsIiwib3B0cyIsImV4dGVuZCIsImRhdGEiLCJub2RlTmFtZSIsImVsSXNJbnB1dCIsIiRhbHRGaWVsZCIsImluaXRlZCIsInZpc2libGUiLCJzaWxlbnQiLCJjdXJyZW50RGF0ZSIsImN1cnJlbnRWaWV3IiwiX2NyZWF0ZVNob3J0Q3V0cyIsInNlbGVjdGVkRGF0ZXMiLCJ2aWV3cyIsImtleXMiLCJtaW5SYW5nZSIsIm1heFJhbmdlIiwiX3ByZXZPblNlbGVjdFZhbHVlIiwiaW5pdCIsInByb3RvdHlwZSIsInZpZXdJbmRleGVzIiwiX2J1aWxkRGF0ZXBpY2tlcnNDb250YWluZXIiLCJfYnVpbGRCYXNlSHRtbCIsIl9kZWZpbmVMb2NhbGUiLCJfc3luY1dpdGhNaW5NYXhEYXRlcyIsIl9zZXRQb3NpdGlvbkNsYXNzZXMiLCJfYmluZEV2ZW50cyIsIl9iaW5kS2V5Ym9hcmRFdmVudHMiLCIkZGF0ZXBpY2tlciIsIm9uIiwiX29uTW91c2VEb3duRGF0ZXBpY2tlciIsImJpbmQiLCJfb25Nb3VzZVVwRGF0ZXBpY2tlciIsImFkZENsYXNzIiwiZm4iLCJUaW1lcGlja2VyIiwiX2JpbmRUaW1lcGlja2VyRXZlbnRzIiwiQm9keSIsInNob3ciLCJuYXYiLCJOYXZpZ2F0aW9uIiwiX29uQ2xpY2tDZWxsIiwiX29uTW91c2VFbnRlckNlbGwiLCJfb25Nb3VzZUxlYXZlQ2VsbCIsIl9vblNob3dFdmVudCIsIl9vbk1vdXNlVXBFbCIsIl9vbkJsdXIiLCJfb25LZXlVcEdlbmVyYWwiLCJfb25SZXNpemUiLCJfb25Nb3VzZVVwQm9keSIsIl9vbktleURvd24iLCJfb25LZXlVcCIsIl9vbkhvdEtleSIsIl9vblRpbWVDaGFuZ2UiLCJpc1dlZWtlbmQiLCJkYXkiLCJpbmRleE9mIiwibGFuZyIsImxvYyIsImNvbnNvbGUiLCJ3YXJuIiwicnUiLCJqb2luIiwiYm91bmRhcnkiLCJfZ2V0V29yZEJvdW5kYXJ5UmVnRXhwIiwibWF0Y2giLCJhbXBtIiwiYXBwZW5kIiwiJGFwcGVuZFRhcmdldCIsIiRpbmxpbmUiLCJpbnNlcnRBZnRlciIsImFwcGVuZFRvIiwiJGNvbnRlbnQiLCIkbmF2IiwiX3RyaWdnZXJPbkNoYW5nZSIsImxlbmd0aCIsInBhcnNlZFNlbGVjdGVkIiwiZ2V0UGFyc2VkRGF0ZSIsImZvcm1hdHRlZERhdGVzIiwiX3RoaXMiLCJkYXRlcyIsInllYXIiLCJtb250aCIsImRhdGUiLCJob3VycyIsIm1pbnV0ZXMiLCJtYXAiLCJmb3JtYXREYXRlIiwicGFyc2VkRGF0ZSIsIm5leHQiLCJkIiwibyIsImN1ckRlY2FkZSIsInByZXYiLCJzdHJpbmciLCJyZXN1bHQiLCJsb2NhbGUiLCJsZWFkaW5nWmVybyIsImdldExlYWRpbmdaZXJvTnVtIiwiZGVjYWRlIiwiZ2V0RGVjYWRlIiwiZnVsbEhvdXJzIiwiZGF5UGVyaW9kIiwicmVwbGFjZXIiLCJfcmVwbGFjZXIiLCJ2YWxpZEhvdXJzIiwiX2dldFZhbGlkSG91cnNGcm9tRGF0ZSIsInRlc3QiLCJyZXBsYWNlIiwiZ2V0VGltZSIsInRvVXBwZXJDYXNlIiwiZnVsbERhdGUiLCJkYXlzU2hvcnQiLCJmdWxsTW9udGgiLCJtb250aHNTaG9ydCIsImZ1bGxNaW51dGVzIiwidG9TdHJpbmciLCJzbGljZSIsInN0ciIsInJlZyIsInAxIiwicDIiLCJwMyIsInNpZ24iLCJzeW1ib2xzIiwiUmVnRXhwIiwic2VsZWN0RGF0ZSIsImxlbiIsIm5ld0RhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwibGFzdFNlbGVjdGVkRGF0ZSIsIl9zZXRUaW1lIiwiX3RyaWdnZXIiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiX3JlbmRlciIsIl9pc1NlbGVjdGVkIiwicHVzaCIsImJpZ2dlciIsIl9zZXRJbnB1dFZhbHVlIiwidGltZXBpY2tlcklzQWN0aXZlIiwiaGlkZSIsInJlbW92ZURhdGUiLCJzZWxlY3RlZCIsInNvbWUiLCJjdXJEYXRlIiwiaSIsImlzU2FtZSIsInNwbGljZSIsInRvZGF5IiwiY2xlYXIiLCJ1cGRhdGUiLCJwYXJhbSIsInZhbHVlIiwiYXJndW1lbnRzIiwiX2FkZEJ1dHRvbnNJZk5lZWQiLCJzZXRQb3NpdGlvbiIsIl9oYW5kbGVEYXRlIiwiX3VwZGF0ZVJhbmdlcyIsIl91cGRhdGVDdXJyZW50VGltZSIsImN1clRpbWUiLCJtaW5UaW1lIiwibWF4VGltZSIsImNoZWNrRGF0ZSIsImNlbGxUeXBlIiwicmVzIiwiZm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0VmFsdWVzIiwidmFsIiwiX2lzSW5SYW5nZSIsInR5cGUiLCJ0aW1lIiwibWluIiwibWF4IiwiZE1pblRpbWUiLCJkTWF4VGltZSIsInR5cGVzIiwiX2dldERpbWVuc2lvbnMiLCJ3aWR0aCIsIm91dGVyV2lkdGgiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsImxlZnQiLCJ0b3AiLCJfZ2V0RGF0ZUZyb21DZWxsIiwiY2VsbCIsInBvcyIsInNwbGl0IiwibWFpbiIsInNlYyIsInJlbW92ZUF0dHIiLCJkaW1zIiwic2VsZkRpbXMiLCJzZWNvbmRhcnkiLCJjc3MiLCJfYmluZFZpc2lvbkV2ZW50cyIsInJlbW92ZUNsYXNzIiwiZm9jdXNlZCIsImluRm9jdXMiLCJibHVyIiwiZG93biIsIl9jaGFuZ2VWaWV3IiwidXAiLCJldmVudCIsIm9mZiIsIm9uZSIsImRpciIsIm5leHRWaWV3Iiwidmlld0luZGV4IiwiX2hhbmRsZUhvdEtleSIsImtleSIsIl9nZXRGb2N1c2VkRGF0ZSIsImZvY3VzZWRQYXJzZWQiLCJ0b3RhbERheXNJbk5leHRNb250aCIsIm1vbnRoQ2hhbmdlZCIsInllYXJDaGFuZ2VkIiwiZGVjYWRlQ2hhbmdlZCIsInkiLCJtIiwiZ2V0RGF5c0NvdW50IiwiX3JlZ2lzdGVyS2V5IiwiZXhpc3RzIiwiY3VyS2V5IiwiX3VuUmVnaXN0ZXJLZXkiLCJpbmRleCIsIl9pc0hvdEtleVByZXNzZWQiLCJjdXJyZW50SG90S2V5IiwiZm91bmQiLCJwcmVzc2VkS2V5cyIsInNvcnQiLCJob3RLZXkiLCJldmVyeSIsImFyZ3MiLCJ0cmlnZ2VyIiwiX2ZvY3VzTmV4dENlbGwiLCJrZXlDb2RlIiwibmQiLCJnZXREYXRlIiwiX2dldENlbGwiLCJzZWxlY3RvciIsIiRjZWxsIiwiZmluZCIsImRlc3Ryb3kiLCJjbG9zZXN0IiwicmVtb3ZlIiwiX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzIiwiYWxyZWFkeVNlbGVjdGVkIiwic2VsZWN0ZWREYXRlIiwiZSIsIm9yaWdpbmFsRXZlbnQiLCJ0aW1lcGlja2VyRm9jdXMiLCJmb2N1cyIsInNldFRpbWVvdXQiLCJjb2RlIiwid2hpY2giLCJwcmV2ZW50RGVmYXVsdCIsImhhc0NsYXNzIiwidGFyZ2V0IiwibGVzcyIsIl91cGRhdGUiLCJoIiwiX2ZvY3VzZWQiLCJwcmV2VmlldyIsInN1YnN0cmluZyIsImdldERheSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImZpcnN0WWVhciIsIk1hdGgiLCJmbG9vciIsInRlbXBsYXRlIiwic291cmNlIiwiZGF0ZTEiLCJkYXRlMiIsImQxIiwiZDIiLCJfdHlwZSIsImNvbmRpdGlvbnMiLCJkYXRlQ29tcGFyZVRvIiwibnVtIiwicGFyc2VJbnQiLCJyZXNldFRpbWUiLCJlYWNoIiwiQ29uc3RydWN0b3IiLCJkYXlzTWluIiwidGVtcGxhdGVzIiwiZHAiLCJwcm94eSIsIiRuYW1lcyIsIiRjZWxscyIsIl9nZXREYXlOYW1lc0h0bWwiLCJjdXJEYXkiLCJodG1sIiwiX2dldENlbGxDb250ZW50cyIsInBhcmVudCIsInJlbmRlciIsImRpc2FibGVkIiwiX2dldERheXNIdG1sIiwidG90YWxNb250aERheXMiLCJmaXJzdE1vbnRoRGF5IiwibGFzdE1vbnRoRGF5IiwiZGF5c0Zyb21QZXZNb250aCIsImRheXNGcm9tTmV4dE1vbnRoIiwic3RhcnREYXlJbmRleCIsIl9nZXREYXlIdG1sIiwiY29udGVudCIsIl9nZXRNb250aHNIdG1sIiwiX2dldE1vbnRoSHRtbCIsIl9nZXRZZWFyc0h0bWwiLCJfZ2V0WWVhckh0bWwiLCJfcmVuZGVyVHlwZXMiLCJkYXlOYW1lcyIsImF0dHIiLCJhY2l0dmUiLCJhY3RpdmUiLCJfaGFuZGxlQ2xpY2siLCJidXR0b25zQ29udGFpbmVyVGVtcGxhdGUiLCJidXR0b24iLCIkYnV0dG9uc0NvbnRhaW5lciIsIl9vbkNsaWNrTmF2QnV0dG9uIiwiX29uQ2xpY2tOYXZUaXRsZSIsIl9hZGRCdXR0b24iLCJ0aXRsZSIsIl9nZXRUaXRsZSIsInNldE5hdlN0YXR1cyIsIl9hZGRCdXR0b25zQ29udGFpbmVyIiwiYWN0aW9uIiwibGFiZWwiLCJfZGlzYWJsZU5hdiIsIl9hY3RpdmF0ZU5hdiIsImluc3QiLCJpbnB1dCIsIl9idWlsZEhUTUwiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJfb25TZWxlY3REYXRlIiwiJHJhbmdlcyIsIl9vbkNoYW5nZVJhbmdlIiwiX29uTW91c2VVcFJhbmdlIiwiX29uTW91c2VFbnRlclJhbmdlIiwiX29uTW91c2VPdXRSYW5nZSIsIl9kYXRlIiwiX3NldE1pblRpbWVGcm9tRGF0ZSIsIl9zZXRNYXhUaW1lRnJvbURhdGUiLCJfc2V0RGVmYXVsdE1pbk1heFRpbWUiLCJfdmFsaWRhdGVIb3Vyc01pbnV0ZXMiLCJseiIsImhvdXJNaW4iLCJob3VyTWF4IiwiaG91clN0ZXAiLCJob3VyVmFsdWUiLCJob3VyVmlzaWJsZSIsImRpc3BsYXlIb3VycyIsIm1pbk1pbiIsIm1pbk1heCIsIm1pblN0ZXAiLCJtaW5WYWx1ZSIsIl90ZW1wbGF0ZSIsIiR0aW1lcGlja2VyIiwiJGhvdXJzIiwiJG1pbnV0ZXMiLCIkaG91cnNUZXh0IiwiJG1pbnV0ZXNUZXh0IiwiJGFtcG0iLCJfYW1wbSIsIl9ob3VycyIsIiR0YXJnZXQiLCJuYW1lIiwialF1ZXJ5Il0sInNvdXJjZVJvb3QiOiIifQ==