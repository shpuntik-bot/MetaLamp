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

/***/ "./block/searchform/searchform.js":
/*!****************************************!*\
  !*** ./block/searchform/searchform.js ***!
  \****************************************/
/***/ (() => {

var coming = document.querySelector('.form-coming-button');
var startDate = document.querySelector('.form-coming_input');
var departure = document.querySelector('.form-departure-button');
var endDate = document.querySelector('.form-departure_input');
var datepickerBlock = "<div class=\"datepicker-here\" data-position=\"right top\"s></div>";
var insertCalendar = "<section class=\"calendar calendar_props\">\n\t\t\t\t\t\t\t\t\t\t\t\t".concat(datepickerBlock, "\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"calendar-bottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"button-clear calendar_button \">\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"button-apply calendar_button\">\u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</section>"); //let mdyCalendar = '';

console.log(coming);
console.log(departure);
console.log(datepickerBlock);
console.log(insertCalendar);
coming.addEventListener('click', function () {
  console.log('нажата кнопка ПРИБЫТИЕ');
  var buttonCalendar = document.querySelector('.form-coming');
  var btnForm = '.form-coming_input';
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
    console.log('Нажата кнопка ОЧИСТИТЬ');
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
          endDate.value = mdyEnd;
        } //return mdyCalendar;

      }
    }); //$('.datepicker-here').data('datepicker');
  });
} //------------------------------
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

/***/ "./block/calendar/calendar.css":
/*!*************************************!*\
  !*** ./block/calendar/calendar.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/* harmony import */ var _modules_logo_logo_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/logo/logo.css */ "./modules/logo/logo.css");
/* harmony import */ var _modules_cklikbutton_cklikbutton_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbutton.css */ "./modules/cklikbutton/cklikbutton.css");
/* harmony import */ var _modules_cklikbutton_cklikbuttonarrow_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbuttonarrow.css */ "./modules/cklikbutton/cklikbuttonarrow.css");
/* harmony import */ var _modules_cklikbutton_cklikbuttonwite_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbuttonwite.css */ "./modules/cklikbutton/cklikbuttonwite.css");
/* harmony import */ var _modules_maintext_maintext_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/maintext/maintext.css */ "./modules/maintext/maintext.css");
/* harmony import */ var _modules_textfield_textfield_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/textfield/textfield.css */ "./modules/textfield/textfield.css");
/* harmony import */ var _modules_radiobutton_radiobutton_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/radiobutton/radiobutton.css */ "./modules/radiobutton/radiobutton.css");
/* harmony import */ var _modules_maskedfield_maskedfield_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/maskedfield/maskedfield.css */ "./modules/maskedfield/maskedfield.css");
/* harmony import */ var _modules_togglebutton_togglebutton_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/togglebutton/togglebutton.css */ "./modules/togglebutton/togglebutton.css");
/* harmony import */ var _modules_datedrop_datedrop_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/datedrop/datedrop.css */ "./modules/datedrop/datedrop.css");
/* harmony import */ var _modules_dropdown_dropdown_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/dropdown/dropdown.css */ "./modules/dropdown/dropdown.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./css/style.css */ "./css/style.css");
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
/* harmony import */ var _block_calendar_calendar_css__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./block/calendar/calendar.css */ "./block/calendar/calendar.css");
/* harmony import */ var _block_searchform_searchform_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./block/searchform/searchform.js */ "./block/searchform/searchform.js");
/* harmony import */ var _block_searchform_searchform_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_block_searchform_searchform_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _block_datepicker_datepicker_css__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./block/datepicker/datepicker.css */ "./block/datepicker/datepicker.css");
/* harmony import */ var _block_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./block/datepicker/datepicker.js */ "./block/datepicker/datepicker.js");
/* harmony import */ var _block_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_block_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_27__);
//���������� jQuery � ������, �� ������ � html
//import $ from 'jquery';        //����� �� nodemodules
//import * as $ from 'jquery';
//global.jQuery = $;
//global.$ = $;
//-----------------------------------------//
//-------����������� ������----------------//
//-------����� �����-----------------------//
 //����� �������
//-------����� �������---------------------//

 //����� ��������

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
//------css �������� ������----------------//

 //�������� ����� �������� �� ������� ������������ ������ � ��������

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

 //���� ������ ���������
//---------------------------//
//����������� ��������� �������
//import './formelement.html';
//import html from 'registration.html';
//---------------------------//
//---------------------------//
//����������� ��������
//simport './block/calendar/calendar.js';

 //import btnCount from './button.js';
//import btnregisration from './modules/registration/registration.js';         //������ ������ ����� �����������
//---------------------------//
//����������� datepicker

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7Q0FFQTtBQUVBO0FBRUE7QUFFQTtBQUNBLGdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYmxvY2svZGF0ZXBpY2tlci9kYXRlcGlja2VyLmpzIiwid2VicGFjazovLy8uL2Jsb2NrL3NlYXJjaGZvcm0vc2VhcmNoZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ibG9jay9jYWxlbmRhci9jYWxlbmRhci5jc3M/NzAwMCIsIndlYnBhY2s6Ly8vLi9ibG9jay9kYXRlcGlja2VyL2RhdGVwaWNrZXIuY3NzPzYwMjYiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svZm9vdGVyL2NvbXBhbnkvYWR2ZXJ0LmNzcz9jMmE5Iiwid2VicGFjazovLy8uL2Jsb2NrL2Zvb3Rlci9jb21wYW55L2NvbXBhbnkuY3NzPzIxNjYiLCJ3ZWJwYWNrOi8vLy4vYmxvY2svZm9vdGVyL2NvcHlyaXRlL2NvcHlyaXRlLmNzcz9iODdkIiwid2VicGFjazovLy8uL2Jsb2NrL2Zvb3Rlci9mb290ZXJzdHlsZS5jc3M/YTQzZiIsIndlYnBhY2s6Ly8vLi9ibG9jay9mb290ZXIvbWVudS9mb290ZXJtZW51LmNzcz8yNWNhIiwid2VicGFjazovLy8uL2Jsb2NrL2Zvb3Rlci9zb2NpYWwvc29jaWFsLmNzcz81OTkxIiwid2VicGFjazovLy8uL2Jsb2NrL2Zvb3Rlci9zdWJzY3JpYmUvc3Vic2NyaWJlLmNzcyIsIndlYnBhY2s6Ly8vLi9ibG9jay9oZWFkZXIvaGVhZGVyLXN0eWxlLmNzcz9lYjVmIiwid2VicGFjazovLy8uL2Jsb2NrL21lbnV0b3AvbWVudXRvcC5jc3M/Mjg4MCIsIndlYnBhY2s6Ly8vLi9ibG9jay9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmNzcz8xNTg3Iiwid2VicGFjazovLy8uL2Jsb2NrL3NlYXJjaGZvcm0vc2VhcmNoZm9ybS5jc3M/YjQ3MyIsIndlYnBhY2s6Ly8vLi9jc3MvZm9udC5jc3M/YzA3NyIsIndlYnBhY2s6Ly8vLi9jc3Mvc3R5bGUuY3NzPzkzMDYiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9ja2xpa2J1dHRvbi9ja2xpa2J1dHRvbi5jc3M/MDA0MSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9uYXJyb3cuY3NzP2NhZmIiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9ja2xpa2J1dHRvbi9ja2xpa2J1dHRvbndpdGUuY3NzP2Y0MzEiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9kYXRlZHJvcC9kYXRlZHJvcC5jc3M/ODQwZSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2Ryb3Bkb3duL2Ryb3Bkb3duLmNzcz9kZTU1Iiwid2VicGFjazovLy8uL21vZHVsZXMvbG9nby9sb2dvLmNzcz9jOGE4Iiwid2VicGFjazovLy8uL21vZHVsZXMvbWFpbnRleHQvbWFpbnRleHQuY3NzPzU3YzQiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9tYXNrZWRmaWVsZC9tYXNrZWRmaWVsZC5jc3M/N2RkMCIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3JhZGlvYnV0dG9uL3JhZGlvYnV0dG9uLmNzcz85YjdlIiwid2VicGFjazovLy8uL21vZHVsZXMvdGV4dGZpZWxkL3RleHRmaWVsZC5jc3M/MWU4MSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3RvZ2dsZWJ1dHRvbi90b2dnbGVidXR0b24uY3NzP2JiNjMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24gKHdpbmRvdywgJCwgdW5kZWZpbmVkKSB7IDsoZnVuY3Rpb24gKCkge1xuICAgIHZhciBWRVJTSU9OID0gJzIuMi4zJyxcbiAgICAgICAgcGx1Z2luTmFtZSA9ICdkYXRlcGlja2VyJyxcbiAgICAgICAgYXV0b0luaXRTZWxlY3RvciA9ICcuZGF0ZXBpY2tlci1oZXJlJyxcbiAgICAgICAgJGJvZHksICRkYXRlcGlja2Vyc0NvbnRhaW5lcixcbiAgICAgICAgY29udGFpbmVyQnVpbHQgPSBmYWxzZSxcbiAgICAgICAgYmFzZVRlbXBsYXRlID0gJycgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJkYXRlcGlja2VyLS1wb2ludGVyXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxuYXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXZcIj48L25hdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY29udGVudFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgY2xhc3NlczogJycsXG4gICAgICAgICAgICBpbmxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6ICdydScsXG4gICAgICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBmaXJzdERheTogJycsXG4gICAgICAgICAgICB3ZWVrZW5kczogWzYsIDBdLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJycsXG4gICAgICAgICAgICBhbHRGaWVsZDogJycsXG4gICAgICAgICAgICBhbHRGaWVsZERhdGVGb3JtYXQ6ICdAJyxcbiAgICAgICAgICAgIHRvZ2dsZVNlbGVjdGVkOiB0cnVlLFxuICAgICAgICAgICAga2V5Ym9hcmROYXY6IHRydWUsXG5cbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYm90dG9tIGxlZnQnLFxuICAgICAgICAgICAgb2Zmc2V0OiAxMixcblxuICAgICAgICAgICAgdmlldzogJ2RheXMnLFxuICAgICAgICAgICAgbWluVmlldzogJ2RheXMnLFxuXG4gICAgICAgICAgICBzaG93T3RoZXJNb250aHM6IHRydWUsXG4gICAgICAgICAgICBzZWxlY3RPdGhlck1vbnRoczogdHJ1ZSxcbiAgICAgICAgICAgIG1vdmVUb090aGVyTW9udGhzT25TZWxlY3Q6IHRydWUsXG5cbiAgICAgICAgICAgIHNob3dPdGhlclllYXJzOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0T3RoZXJZZWFyczogdHJ1ZSxcbiAgICAgICAgICAgIG1vdmVUb090aGVyWWVhcnNPblNlbGVjdDogdHJ1ZSxcblxuICAgICAgICAgICAgbWluRGF0ZTogJycsXG4gICAgICAgICAgICBtYXhEYXRlOiAnJyxcbiAgICAgICAgICAgIGRpc2FibGVOYXZXaGVuT3V0T2ZSYW5nZTogdHJ1ZSxcblxuICAgICAgICAgICAgbXVsdGlwbGVEYXRlczogZmFsc2UsIC8vIEJvb2xlYW4gb3IgTnVtYmVyXG4gICAgICAgICAgICBtdWx0aXBsZURhdGVzU2VwYXJhdG9yOiAnLCcsXG4gICAgICAgICAgICByYW5nZTogZmFsc2UsXG5cbiAgICAgICAgICAgIHRvZGF5QnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIGNsZWFyQnV0dG9uOiBmYWxzZSxcblxuICAgICAgICAgICAgc2hvd0V2ZW50OiAnZm9jdXMnLFxuICAgICAgICAgICAgYXV0b0Nsb3NlOiBmYWxzZSxcblxuICAgICAgICAgICAgLy8gbmF2aWdhdGlvblxuICAgICAgICAgICAgbW9udGhzRmllbGQ6ICdtb250aHNTaG9ydCcsXG4gICAgICAgICAgICBwcmV2SHRtbDogJzxzdmcgY2xhc3M9XCJzdmctYmFja1wiPjwvc3ZnPicsXG4gICAgICAgICAgICBuZXh0SHRtbDogJzxzdmcgY2xhc3M9XCJzdmctbmV4dFwiPjwvc3ZnPicsXG4gICAgICAgICAgICBuYXZUaXRsZXM6IHtcbiAgICAgICAgICAgICAgICBkYXlzOiAnTU0gPGk+eXl5eTwvaT4nLFxuICAgICAgICAgICAgICAgIG1vbnRoczogJ3l5eXknLFxuICAgICAgICAgICAgICAgIHllYXJzOiAneXl5eTEgLSB5eXl5MidcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIHRpbWVwaWNrZXJcbiAgICAgICAgICAgIHRpbWVwaWNrZXI6IGZhbHNlLFxuICAgICAgICAgICAgb25seVRpbWVwaWNrZXI6IGZhbHNlLFxuICAgICAgICAgICAgZGF0ZVRpbWVTZXBhcmF0b3I6ICcgJyxcbiAgICAgICAgICAgIHRpbWVGb3JtYXQ6ICcnLFxuICAgICAgICAgICAgbWluSG91cnM6IDAsXG4gICAgICAgICAgICBtYXhIb3VyczogMjQsXG4gICAgICAgICAgICBtaW5NaW51dGVzOiAwLFxuICAgICAgICAgICAgbWF4TWludXRlczogNTksXG4gICAgICAgICAgICBob3Vyc1N0ZXA6IDEsXG4gICAgICAgICAgICBtaW51dGVzU3RlcDogMSxcblxuICAgICAgICAgICAgLy8gZXZlbnRzXG4gICAgICAgICAgICBvblNlbGVjdDogJycsXG4gICAgICAgICAgICBvblNob3c6ICcnLFxuICAgICAgICAgICAgb25IaWRlOiAnJyxcbiAgICAgICAgICAgIG9uQ2hhbmdlTW9udGg6ICcnLFxuICAgICAgICAgICAgb25DaGFuZ2VZZWFyOiAnJyxcbiAgICAgICAgICAgIG9uQ2hhbmdlRGVjYWRlOiAnJyxcbiAgICAgICAgICAgIG9uQ2hhbmdlVmlldzogJycsXG4gICAgICAgICAgICBvblJlbmRlckNlbGw6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGhvdEtleXMgPSB7XG4gICAgICAgICAgICAnY3RybFJpZ2h0JzogWzE3LCAzOV0sXG4gICAgICAgICAgICAnY3RybFVwJzogWzE3LCAzOF0sXG4gICAgICAgICAgICAnY3RybExlZnQnOiBbMTcsIDM3XSxcbiAgICAgICAgICAgICdjdHJsRG93bic6IFsxNywgNDBdLFxuICAgICAgICAgICAgJ3NoaWZ0UmlnaHQnOiBbMTYsIDM5XSxcbiAgICAgICAgICAgICdzaGlmdFVwJzogWzE2LCAzOF0sXG4gICAgICAgICAgICAnc2hpZnRMZWZ0JzogWzE2LCAzN10sXG4gICAgICAgICAgICAnc2hpZnREb3duJzogWzE2LCA0MF0sXG4gICAgICAgICAgICAnYWx0VXAnOiBbMTgsIDM4XSxcbiAgICAgICAgICAgICdhbHRSaWdodCc6IFsxOCwgMzldLFxuICAgICAgICAgICAgJ2FsdExlZnQnOiBbMTgsIDM3XSxcbiAgICAgICAgICAgICdhbHREb3duJzogWzE4LCA0MF0sXG4gICAgICAgICAgICAnY3RybFNoaWZ0VXAnOiBbMTYsIDE3LCAzOF1cbiAgICAgICAgfSxcbiAgICAgICAgZGF0ZXBpY2tlcjtcblxuICAgIHZhciBEYXRlcGlja2VyICA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmVsID0gZWw7XG4gICAgICAgIHRoaXMuJGVsID0gJChlbCk7XG5cbiAgICAgICAgdGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBvcHRpb25zLCB0aGlzLiRlbC5kYXRhKCkpO1xuXG4gICAgICAgIGlmICgkYm9keSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdHMuc3RhcnREYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMuc3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVsLm5vZGVOYW1lID09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIHRoaXMuZWxJc0lucHV0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdHMuYWx0RmllbGQpIHtcbiAgICAgICAgICAgIHRoaXMuJGFsdEZpZWxkID0gdHlwZW9mIHRoaXMub3B0cy5hbHRGaWVsZCA9PSAnc3RyaW5nJyA/ICQodGhpcy5vcHRzLmFsdEZpZWxkKSA6IHRoaXMub3B0cy5hbHRGaWVsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlOyAvLyBOZWVkIHRvIHByZXZlbnQgdW5uZWNlc3NhcnkgcmVuZGVyaW5nXG5cbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHRoaXMub3B0cy5zdGFydERhdGU7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB0aGlzLm9wdHMudmlldztcbiAgICAgICAgdGhpcy5fY3JlYXRlU2hvcnRDdXRzKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IFtdO1xuICAgICAgICB0aGlzLnZpZXdzID0ge307XG4gICAgICAgIHRoaXMua2V5cyA9IFtdO1xuICAgICAgICB0aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgIHRoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgdGhpcy5fcHJldk9uU2VsZWN0VmFsdWUgPSAnJztcblxuICAgICAgICB0aGlzLmluaXQoKVxuICAgIH07XG5cbiAgICBkYXRlcGlja2VyID0gRGF0ZXBpY2tlcjtcblxuICAgIGRhdGVwaWNrZXIucHJvdG90eXBlID0ge1xuICAgICAgICBWRVJTSU9OOiBWRVJTSU9OLFxuICAgICAgICB2aWV3SW5kZXhlczogWydkYXlzJywgJ21vbnRocycsICd5ZWFycyddLFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyQnVpbHQgJiYgIXRoaXMub3B0cy5pbmxpbmUgJiYgdGhpcy5lbElzSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWlsZERhdGVwaWNrZXJzQ29udGFpbmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9idWlsZEJhc2VIdG1sKCk7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVMb2NhbGUodGhpcy5vcHRzLmxhbmd1YWdlKTtcbiAgICAgICAgICAgIHRoaXMuX3N5bmNXaXRoTWluTWF4RGF0ZXMoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBleHRyYSBjbGFzc2VzIGZvciBwcm9wZXIgdHJhbnNpdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0UG9zaXRpb25DbGFzc2VzKHRoaXMub3B0cy5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRFdmVudHMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmtleWJvYXJkTmF2ICYmICF0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmluZEtleWJvYXJkRXZlbnRzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIub24oJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duRGF0ZXBpY2tlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwRGF0ZXBpY2tlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5jbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyh0aGlzLm9wdHMuY2xhc3NlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyID0gbmV3ICQuZm4uZGF0ZXBpY2tlci5UaW1lcGlja2VyKHRoaXMsIHRoaXMub3B0cyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmluZFRpbWVwaWNrZXJFdmVudHMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoJy1vbmx5LXRpbWVwaWNrZXItJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10gPSBuZXcgJC5mbi5kYXRlcGlja2VyLkJvZHkodGhpcywgdGhpcy5jdXJyZW50VmlldywgdGhpcy5vcHRzKTtcbiAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5uYXYgPSBuZXcgJC5mbi5kYXRlcGlja2VyLk5hdmlnYXRpb24odGhpcywgdGhpcy5vcHRzKTtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IHRoaXMuY3VycmVudFZpZXc7XG5cbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdjbGlja0NlbGwuYWRwJywgdGhpcy5fb25DbGlja0NlbGwuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uKCdtb3VzZWVudGVyJywgJy5kYXRlcGlja2VyLS1jZWxsJywgdGhpcy5fb25Nb3VzZUVudGVyQ2VsbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIub24oJ21vdXNlbGVhdmUnLCAnLmRhdGVwaWNrZXItLWNlbGwnLCB0aGlzLl9vbk1vdXNlTGVhdmVDZWxsLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NyZWF0ZVNob3J0Q3V0czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5taW5EYXRlID0gdGhpcy5vcHRzLm1pbkRhdGUgPyB0aGlzLm9wdHMubWluRGF0ZSA6IG5ldyBEYXRlKC04NjM5OTk5OTEzNjAwMDAwKTtcbiAgICAgICAgICAgIHRoaXMubWF4RGF0ZSA9IHRoaXMub3B0cy5tYXhEYXRlID8gdGhpcy5vcHRzLm1heERhdGUgOiBuZXcgRGF0ZSg4NjM5OTk5OTEzNjAwMDAwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZEV2ZW50cyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKHRoaXMub3B0cy5zaG93RXZlbnQgKyAnLmFkcCcsIHRoaXMuX29uU2hvd0V2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ21vdXNldXAuYWRwJywgdGhpcy5fb25Nb3VzZVVwRWwuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbignYmx1ci5hZHAnLCB0aGlzLl9vbkJsdXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbigna2V5dXAuYWRwJywgdGhpcy5fb25LZXlVcEdlbmVyYWwuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5hZHAnLCB0aGlzLl9vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5vbignbW91c2V1cC5hZHAnLCB0aGlzLl9vbk1vdXNlVXBCb2R5LmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kS2V5Ym9hcmRFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdrZXlkb3duLmFkcCcsIHRoaXMuX29uS2V5RG93bi5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdrZXl1cC5hZHAnLCB0aGlzLl9vbktleVVwLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2hvdEtleS5hZHAnLCB0aGlzLl9vbkhvdEtleS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZFRpbWVwaWNrZXJFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCd0aW1lQ2hhbmdlLmFkcCcsIHRoaXMuX29uVGltZUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1dlZWtlbmQ6IGZ1bmN0aW9uIChkYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdHMud2Vla2VuZHMuaW5kZXhPZihkYXkpICE9PSAtMTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZGVmaW5lTG9jYWxlOiBmdW5jdGlvbiAobGFuZykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBsYW5nID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MgPSAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbbGFuZ107XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxvYykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZmluZCBsYW5ndWFnZSBcIicgKyBsYW5nICsgJ1wiIGluIERhdGVwaWNrZXIubGFuZ3VhZ2UsIHdpbGwgdXNlIFwicnVcIiBpbnN0ZWFkJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jID0gJC5leHRlbmQodHJ1ZSwge30sICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUsICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVtsYW5nXSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlLnJ1LCBsYW5nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmRhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYy5kYXRlRm9ybWF0ID0gdGhpcy5vcHRzLmRhdGVGb3JtYXRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MudGltZUZvcm1hdCA9IHRoaXMub3B0cy50aW1lRm9ybWF0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZmlyc3REYXkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MuZmlyc3REYXkgPSB0aGlzLm9wdHMuZmlyc3REYXlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MuZGF0ZUZvcm1hdCA9IFt0aGlzLmxvYy5kYXRlRm9ybWF0LCB0aGlzLmxvYy50aW1lRm9ybWF0XS5qb2luKHRoaXMub3B0cy5kYXRlVGltZVNlcGFyYXRvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYy5kYXRlRm9ybWF0ID0gdGhpcy5sb2MudGltZUZvcm1hdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGJvdW5kYXJ5ID0gdGhpcy5fZ2V0V29yZEJvdW5kYXJ5UmVnRXhwO1xuICAgICAgICAgICAgaWYgKHRoaXMubG9jLnRpbWVGb3JtYXQubWF0Y2goYm91bmRhcnkoJ2FhJykpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MudGltZUZvcm1hdC5tYXRjaChib3VuZGFyeSgnQUEnKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgdGhpcy5hbXBtID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfYnVpbGREYXRlcGlja2Vyc0NvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29udGFpbmVyQnVpbHQgPSB0cnVlO1xuICAgICAgICAgICAgJGJvZHkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlcnMtY29udGFpbmVyXCIgaWQ9XCJkYXRlcGlja2Vycy1jb250YWluZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICRkYXRlcGlja2Vyc0NvbnRhaW5lciA9ICQoJyNkYXRlcGlja2Vycy1jb250YWluZXInKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYnVpbGRCYXNlSHRtbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICRhcHBlbmRUYXJnZXQsXG4gICAgICAgICAgICAgICAgJGlubGluZSA9ICQoJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWlubGluZVwiPicpO1xuXG4gICAgICAgICAgICBpZih0aGlzLmVsLm5vZGVOYW1lID09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgJGFwcGVuZFRhcmdldCA9ICRkYXRlcGlja2Vyc0NvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkYXBwZW5kVGFyZ2V0ID0gJGlubGluZS5pbnNlcnRBZnRlcih0aGlzLiRlbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhcHBlbmRUYXJnZXQgPSAkaW5saW5lLmFwcGVuZFRvKHRoaXMuJGVsKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyID0gJChiYXNlVGVtcGxhdGUpLmFwcGVuZFRvKCRhcHBlbmRUYXJnZXQpO1xuICAgICAgICAgICAgdGhpcy4kY29udGVudCA9ICQoJy5kYXRlcGlja2VyLS1jb250ZW50JywgdGhpcy4kZGF0ZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRuYXYgPSAkKCcuZGF0ZXBpY2tlci0tbmF2JywgdGhpcy4kZGF0ZXBpY2tlcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RyaWdnZXJPbkNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBmcm9tIHRyaWdnZXJpbmcgbXVsdGlwbGUgb25TZWxlY3QgY2FsbGJhY2sgd2l0aCBzYW1lIGFyZ3VtZW50IChlbXB0eSBzdHJpbmcpIGluIElFMTAtMTFcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJldk9uU2VsZWN0VmFsdWUgPT09ICcnKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldk9uU2VsZWN0VmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRzLm9uU2VsZWN0KCcnLCAnJywgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzZWxlY3RlZERhdGVzID0gdGhpcy5zZWxlY3RlZERhdGVzLFxuICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHNlbGVjdGVkRGF0ZXNbMF0pLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZERhdGVzLFxuICAgICAgICAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkYXRlcyA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZC55ZWFyLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZC5tb250aCxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQuaG91cnMsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkLm1pbnV0ZXNcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkRGF0ZXMgPSBzZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZm9ybWF0RGF0ZShfdGhpcy5sb2MuZGF0ZUZvcm1hdCwgZGF0ZSlcbiAgICAgICAgICAgICAgICB9KS5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldyBkYXRlcyBhcnJheSwgdG8gc2VwYXJhdGUgaXQgZnJvbSBvcmlnaW5hbCBzZWxlY3RlZERhdGVzXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm11bHRpcGxlRGF0ZXMgfHwgdGhpcy5vcHRzLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgZGF0ZXMgPSBzZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZWREYXRlID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWREYXRlLnllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWREYXRlLm1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0ZS5kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0ZS5ob3VycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZERhdGUubWludXRlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlID0gZm9ybWF0dGVkRGF0ZXM7XG4gICAgICAgICAgICB0aGlzLm9wdHMub25TZWxlY3QoZm9ybWF0dGVkRGF0ZXMsIGRhdGVzLCB0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZCA9IHRoaXMucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICBvID0gdGhpcy5vcHRzO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoICsgMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlTW9udGgpIG8ub25DaGFuZ2VNb250aCh0aGlzLnBhcnNlZERhdGUubW9udGgsIHRoaXMucGFyc2VkRGF0ZS55ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyICsgMSwgZC5tb250aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlWWVhcikgby5vbkNoYW5nZVllYXIodGhpcy5wYXJzZWREYXRlLnllYXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciArIDEwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25DaGFuZ2VEZWNhZGUpIG8ub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcmV2OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZCA9IHRoaXMucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICBvID0gdGhpcy5vcHRzO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoIC0gMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlTW9udGgpIG8ub25DaGFuZ2VNb250aCh0aGlzLnBhcnNlZERhdGUubW9udGgsIHRoaXMucGFyc2VkRGF0ZS55ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyIC0gMSwgZC5tb250aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlWWVhcikgby5vbkNoYW5nZVllYXIodGhpcy5wYXJzZWREYXRlLnllYXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciAtIDEwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25DaGFuZ2VEZWNhZGUpIG8ub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBmb3JtYXREYXRlOiBmdW5jdGlvbiAoc3RyaW5nLCBkYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gZGF0ZSB8fCB0aGlzLmRhdGU7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc3RyaW5nLFxuICAgICAgICAgICAgICAgIGJvdW5kYXJ5ID0gdGhpcy5fZ2V0V29yZEJvdW5kYXJ5UmVnRXhwLFxuICAgICAgICAgICAgICAgIGxvY2FsZSA9IHRoaXMubG9jLFxuICAgICAgICAgICAgICAgIGxlYWRpbmdaZXJvID0gZGF0ZXBpY2tlci5nZXRMZWFkaW5nWmVyb051bSxcbiAgICAgICAgICAgICAgICBkZWNhZGUgPSBkYXRlcGlja2VyLmdldERlY2FkZShkYXRlKSxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIGZ1bGxIb3VycyA9IGQuZnVsbEhvdXJzLFxuICAgICAgICAgICAgICAgIGhvdXJzID0gZC5ob3VycyxcbiAgICAgICAgICAgICAgICBhbXBtID0gc3RyaW5nLm1hdGNoKGJvdW5kYXJ5KCdhYScpKSB8fCBzdHJpbmcubWF0Y2goYm91bmRhcnkoJ0FBJykpLFxuICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9ICdhbScsXG4gICAgICAgICAgICAgICAgcmVwbGFjZXIgPSB0aGlzLl9yZXBsYWNlcixcbiAgICAgICAgICAgICAgICB2YWxpZEhvdXJzO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVwaWNrZXIgJiYgdGhpcy50aW1lcGlja2VyICYmIGFtcG0pIHtcbiAgICAgICAgICAgICAgICB2YWxpZEhvdXJzID0gdGhpcy50aW1lcGlja2VyLl9nZXRWYWxpZEhvdXJzRnJvbURhdGUoZGF0ZSwgYW1wbSk7XG4gICAgICAgICAgICAgICAgZnVsbEhvdXJzID0gbGVhZGluZ1plcm8odmFsaWRIb3Vycy5ob3Vycyk7XG4gICAgICAgICAgICAgICAgaG91cnMgPSB2YWxpZEhvdXJzLmhvdXJzO1xuICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9IHZhbGlkSG91cnMuZGF5UGVyaW9kO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIC9ALy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9ALywgZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2FhLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2FhJyksIGRheVBlcmlvZCk7XG4gICAgICAgICAgICAgICAgY2FzZSAvQUEvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnQUEnKSwgZGF5UGVyaW9kLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2RkLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2RkJyksIGQuZnVsbERhdGUpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2QvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnZCcpLCBkLmRhdGUpO1xuICAgICAgICAgICAgICAgIGNhc2UgL0RELy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ0REJyksIGxvY2FsZS5kYXlzW2QuZGF5XSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvRC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdEJyksIGxvY2FsZS5kYXlzU2hvcnRbZC5kYXldKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9tbS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdtbScpLCBkLmZ1bGxNb250aCk7XG4gICAgICAgICAgICAgICAgY2FzZSAvbS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdtJyksIGQubW9udGggKyAxKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9NTS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdNTScpLCB0aGlzLmxvYy5tb250aHNbZC5tb250aF0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL00vLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnTScpLCBsb2NhbGUubW9udGhzU2hvcnRbZC5tb250aF0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL2lpLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2lpJyksIGQuZnVsbE1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2kvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnaScpLCBkLm1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2hoLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2hoJyksIGZ1bGxIb3Vycyk7XG4gICAgICAgICAgICAgICAgY2FzZSAvaC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdoJyksIGhvdXJzKTtcbiAgICAgICAgICAgICAgICBjYXNlIC95eXl5Ly50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ3l5eXknKSwgZC55ZWFyKTtcbiAgICAgICAgICAgICAgICBjYXNlIC95eXl5MS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCd5eXl5MScpLCBkZWNhZGVbMF0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL3l5eXkyLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ3l5eXkyJyksIGRlY2FkZVsxXSk7XG4gICAgICAgICAgICAgICAgY2FzZSAveXkvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgneXknKSwgZC55ZWFyLnRvU3RyaW5nKCkuc2xpY2UoLTIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVwbGFjZXI6IGZ1bmN0aW9uIChzdHIsIHJlZywgZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZywgZnVuY3Rpb24gKG1hdGNoLCBwMSxwMixwMykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSArIGRhdGEgKyBwMztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFdvcmRCb3VuZGFyeVJlZ0V4cDogZnVuY3Rpb24gKHNpZ24pIHtcbiAgICAgICAgICAgIHZhciBzeW1ib2xzID0gJ1xcXFxzfFxcXFwufC18L3xcXFxcXFxcXHwsfFxcXFwkfFxcXFwhfFxcXFw/fDp8Oyc7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnw+fCcgKyBzeW1ib2xzICsgJykoJyArIHNpZ24gKyAnKSgkfDx8JyArIHN5bWJvbHMgKyAnKScsICdnJyk7XG4gICAgICAgIH0sXG5cblxuICAgICAgICBzZWxlY3REYXRlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBvcHRzID0gX3RoaXMub3B0cyxcbiAgICAgICAgICAgICAgICBkID0gX3RoaXMucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGVzID0gX3RoaXMuc2VsZWN0ZWREYXRlcyxcbiAgICAgICAgICAgICAgICBsZW4gPSBzZWxlY3RlZERhdGVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBuZXdEYXRlID0gJyc7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdERhdGUoZClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZERhdGUgPSBkYXRlO1xuXG4gICAgICAgICAgICAvLyBTZXQgbmV3IHRpbWUgdmFsdWVzIGZyb20gRGF0ZVxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlci5fc2V0VGltZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT24gdGhpcyBzdGVwIHRpbWVwaWNrZXIgd2lsbCBzZXQgdmFsaWQgdmFsdWVzIGluIGl0J3MgaW5zdGFuY2VcbiAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyKCdzZWxlY3REYXRlJywgZGF0ZSk7XG5cbiAgICAgICAgICAgIC8vIFNldCBjb3JyZWN0IHRpbWUgdmFsdWVzIGFmdGVyIHRpbWVwaWNrZXIncyB2YWxpZGF0aW9uXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGZyb20gc2V0dGluZyBob3VycyBvciBtaW51dGVzIHdoaWNoIHZhbHVlcyBhcmUgbGVzc2VyIHRoZW4gYG1pbmAgdmFsdWUgb3JcbiAgICAgICAgICAgIC8vIGdyZWF0ZXIgdGhlbiBgbWF4YCB2YWx1ZVxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfdGhpcy52aWV3ID09ICdkYXlzJykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlLmdldE1vbnRoKCkgIT0gZC5tb250aCAmJiBvcHRzLm1vdmVUb090aGVyTW9udGhzT25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfdGhpcy52aWV3ID09ICd5ZWFycycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5nZXRGdWxsWWVhcigpICE9IGQueWVhciAmJiBvcHRzLm1vdmVUb090aGVyWWVhcnNPblNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdEYXRlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5kYXRlID0gbmV3RGF0ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zaWxlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5uYXYuX3JlbmRlcigpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm11bHRpcGxlRGF0ZXMgJiYgIW9wdHMucmFuZ2UpIHsgLy8gU2V0IHByaW9yaXR5IHRvIHJhbmdlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgICAgICBpZiAobGVuID09PSBvcHRzLm11bHRpcGxlRGF0ZXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl9pc1NlbGVjdGVkKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMucHVzaChkYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVuID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcyA9IFtkYXRlXTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGVuID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcy5wdXNoKGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLm1heFJhbmdlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1heFJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBTd2FwIGRhdGVzIGlmIHRoZXkgd2VyZSBzZWxlY3RlZCB2aWEgZHAuc2VsZWN0RGF0ZSgpIGFuZCBzZWNvbmQgZGF0ZSB3YXMgc21hbGxlciB0aGVuIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmJpZ2dlcihfdGhpcy5tYXhSYW5nZSwgX3RoaXMubWluUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9IF90aGlzLm1pblJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMgPSBbX3RoaXMubWluUmFuZ2UsIF90aGlzLm1heFJhbmdlXVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcyA9IFtkYXRlXTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSBkYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcyA9IFtkYXRlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX3RoaXMuX3NldElucHV0VmFsdWUoKTtcblxuICAgICAgICAgICAgaWYgKG9wdHMub25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmF1dG9DbG9zZSAmJiAhdGhpcy50aW1lcGlja2VySXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdHMubXVsdGlwbGVEYXRlcyAmJiAhb3B0cy5yYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnJhbmdlICYmIF90aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX3RoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlRGF0ZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWREYXRlcyxcbiAgICAgICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICghKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQuc29tZShmdW5jdGlvbiAoY3VyRGF0ZSwgaSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmlzU2FtZShjdXJEYXRlLCBkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1heFJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sYXN0U2VsZWN0ZWREYXRlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sYXN0U2VsZWN0ZWREYXRlID0gX3RoaXMuc2VsZWN0ZWREYXRlc1tfdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudmlld3NbX3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NldElucHV0VmFsdWUoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0cy5vblNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJPbkNoYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIHRvZGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLm9wdHMubWluVmlldztcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRvZGF5QnV0dG9uIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZSh0aGlzLm9wdHMudG9kYXlCdXR0b24pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5taW5SYW5nZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9zZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlcyBkYXRlcGlja2VyIG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBwYXJhbSAtIHBhcmFtZXRlcidzIG5hbWUgdG8gdXBkYXRlLiBJZiBvYmplY3QgdGhlbiBpdCB3aWxsIGV4dGVuZCBjdXJyZW50IG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfE9iamVjdH0gW3ZhbHVlXSAtIG5ldyBwYXJhbSB2YWx1ZVxuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAocGFyYW0sIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBsYXN0U2VsZWN0ZWREYXRlID0gdGhpcy5sYXN0U2VsZWN0ZWREYXRlO1xuXG4gICAgICAgICAgICBpZiAobGVuID09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHNbcGFyYW1dID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxlbiA9PSAxICYmIHR5cGVvZiBwYXJhbSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIHRoaXMub3B0cywgcGFyYW0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVNob3J0Q3V0cygpO1xuICAgICAgICAgICAgdGhpcy5fc3luY1dpdGhNaW5NYXhEYXRlcygpO1xuICAgICAgICAgICAgdGhpcy5fZGVmaW5lTG9jYWxlKHRoaXMub3B0cy5sYW5ndWFnZSk7XG4gICAgICAgICAgICB0aGlzLm5hdi5fYWRkQnV0dG9uc0lmTmVlZCgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHRoaXMubmF2Ll9yZW5kZXIoKTtcbiAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5lbElzSW5wdXQgJiYgIXRoaXMub3B0cy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRQb3NpdGlvbkNsYXNzZXModGhpcy5vcHRzLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5vcHRzLnBvc2l0aW9uKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5jbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyh0aGlzLm9wdHMuY2xhc3NlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoJy1vbmx5LXRpbWVwaWNrZXItJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VsZWN0ZWREYXRlKSB0aGlzLnRpbWVwaWNrZXIuX2hhbmRsZURhdGUobGFzdFNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyLl91cGRhdGVSYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIuX3VwZGF0ZUN1cnJlbnRUaW1lKCk7XG4gICAgICAgICAgICAgICAgLy8gQ2hhbmdlIGhvdXJzIGFuZCBtaW51dGVzIGlmIGl0J3MgdmFsdWVzIGhhdmUgYmVlbiBjaGFuZ2VkIHRocm91Z2ggbWluL21heCBob3Vycy9taW51dGVzXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkRGF0ZS5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VsZWN0ZWREYXRlLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fc2V0SW5wdXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBfc3luY1dpdGhNaW5NYXhEYXRlczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1clRpbWUgPSB0aGlzLmRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMubWluVGltZSA+IGN1clRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLm1pbkRhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1heFRpbWUgPCBjdXJUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaXNTZWxlY3RlZDogZnVuY3Rpb24gKGNoZWNrRGF0ZSwgY2VsbFR5cGUpIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcy5zb21lKGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVwaWNrZXIuaXNTYW1lKGRhdGUsIGNoZWNrRGF0ZSwgY2VsbFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSxcblxuICAgICAgICBfc2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBvcHRzID0gX3RoaXMub3B0cyxcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBfdGhpcy5sb2MuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgICAgICBhbHRGb3JtYXQgPSBvcHRzLmFsdEZpZWxkRGF0ZUZvcm1hdCxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IF90aGlzLnNlbGVjdGVkRGF0ZXMubWFwKGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5mb3JtYXREYXRlKGZvcm1hdCwgZGF0ZSlcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBhbHRWYWx1ZXM7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmFsdEZpZWxkICYmIF90aGlzLiRhbHRGaWVsZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhbHRWYWx1ZXMgPSB0aGlzLnNlbGVjdGVkRGF0ZXMubWFwKGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5mb3JtYXREYXRlKGFsdEZvcm1hdCwgZGF0ZSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhbHRWYWx1ZXMgPSBhbHRWYWx1ZXMuam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgdGhpcy4kYWx0RmllbGQudmFsKGFsdFZhbHVlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvcik7XG5cbiAgICAgICAgICAgIHRoaXMuJGVsLnZhbCh2YWx1ZSlcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgZGF0ZSBpcyBiZXR3ZWVuIG1pbkRhdGUgYW5kIG1heERhdGVcbiAgICAgICAgICogQHBhcmFtIGRhdGUge29iamVjdH0gLSBkYXRlIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gdHlwZSB7c3RyaW5nfSAtIGNlbGwgdHlwZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9pc0luUmFuZ2U6IGZ1bmN0aW9uIChkYXRlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgdGltZSA9IGRhdGUuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgbWluID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMubWluRGF0ZSksXG4gICAgICAgICAgICAgICAgbWF4ID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMubWF4RGF0ZSksXG4gICAgICAgICAgICAgICAgZE1pblRpbWUgPSBuZXcgRGF0ZShkLnllYXIsIGQubW9udGgsIG1pbi5kYXRlKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgZE1heFRpbWUgPSBuZXcgRGF0ZShkLnllYXIsIGQubW9udGgsIG1heC5kYXRlKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgdHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRheTogdGltZSA+PSB0aGlzLm1pblRpbWUgJiYgdGltZSA8PSB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBkTWluVGltZSA+PSB0aGlzLm1pblRpbWUgJiYgZE1heFRpbWUgPD0gdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkLnllYXIgPj0gbWluLnllYXIgJiYgZC55ZWFyIDw9IG1heC55ZWFyXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlID8gdHlwZXNbdHlwZV0gOiB0eXBlcy5kYXlcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RGltZW5zaW9uczogZnVuY3Rpb24gKCRlbCkge1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9ICRlbC5vZmZzZXQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogJGVsLm91dGVyV2lkdGgoKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICRlbC5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0LFxuICAgICAgICAgICAgICAgIHRvcDogb2Zmc2V0LnRvcFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXREYXRlRnJvbUNlbGw6IGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgICB2YXIgY3VyRGF0ZSA9IHRoaXMucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICB5ZWFyID0gY2VsbC5kYXRhKCd5ZWFyJykgfHwgY3VyRGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIG1vbnRoID0gY2VsbC5kYXRhKCdtb250aCcpID09IHVuZGVmaW5lZCA/IGN1ckRhdGUubW9udGggOiBjZWxsLmRhdGEoJ21vbnRoJyksXG4gICAgICAgICAgICAgICAgZGF0ZSA9IGNlbGwuZGF0YSgnZGF0ZScpIHx8IDE7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldFBvc2l0aW9uQ2xhc3NlczogZnVuY3Rpb24gKHBvcykge1xuICAgICAgICAgICAgcG9zID0gcG9zLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICB2YXIgbWFpbiA9IHBvc1swXSxcbiAgICAgICAgICAgICAgICBzZWMgPSBwb3NbMV0sXG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9ICdkYXRlcGlja2VyIC0nICsgbWFpbiArICctJyArIHNlYyArICctIC1mcm9tLScgKyBtYWluICsgJy0nO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlKSBjbGFzc2VzICs9ICcgYWN0aXZlJztcblxuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjbGFzcycpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGNsYXNzZXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFBvc2l0aW9uOiBmdW5jdGlvbiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgdGhpcy5vcHRzLnBvc2l0aW9uO1xuXG4gICAgICAgICAgICB2YXIgZGltcyA9IHRoaXMuX2dldERpbWVuc2lvbnModGhpcy4kZWwpLFxuICAgICAgICAgICAgICAgIHNlbGZEaW1zID0gdGhpcy5fZ2V0RGltZW5zaW9ucyh0aGlzLiRkYXRlcGlja2VyKSxcbiAgICAgICAgICAgICAgICBwb3MgPSBwb3NpdGlvbi5zcGxpdCgnICcpLFxuICAgICAgICAgICAgICAgIHRvcCwgbGVmdCxcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSB0aGlzLm9wdHMub2Zmc2V0LFxuICAgICAgICAgICAgICAgIG1haW4gPSBwb3NbMF0sXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5ID0gcG9zWzFdO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG1haW4pIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBkaW1zLnRvcCAtIHNlbGZEaW1zLmhlaWdodCAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGltcy5sZWZ0ICsgZGltcy53aWR0aCArIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3AgKyBkaW1zLmhlaWdodCArIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkaW1zLmxlZnQgLSBzZWxmRGltcy53aWR0aCAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaChzZWNvbmRhcnkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBkaW1zLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGltcy5sZWZ0ICsgZGltcy53aWR0aCAtIHNlbGZEaW1zLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBkaW1zLnRvcCArIGRpbXMuaGVpZ2h0IC0gc2VsZkRpbXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRpbXMubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9sZWZ0fHJpZ2h0Ly50ZXN0KG1haW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSBkaW1zLnRvcCArIGRpbXMuaGVpZ2h0LzIgLSBzZWxmRGltcy5oZWlnaHQvMjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkaW1zLmxlZnQgKyBkaW1zLndpZHRoLzIgLSBzZWxmRGltcy53aWR0aC8yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3BcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvblNob3cgPSB0aGlzLm9wdHMub25TaG93O1xuXG4gICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMub3B0cy5wb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChvblNob3cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iaW5kVmlzaW9uRXZlbnRzKG9uU2hvdylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb25IaWRlID0gdGhpcy5vcHRzLm9uSGlkZTtcblxuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJy0xMDAwMDBweCdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gJyc7XG4gICAgICAgICAgICB0aGlzLmtleXMgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5pbkZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGVsLmJsdXIoKTtcblxuICAgICAgICAgICAgaWYgKG9uSGlkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRWaXNpb25FdmVudHMob25IaWRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRvd246IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VWaWV3KGRhdGUsICdkb3duJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXA6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VWaWV3KGRhdGUsICd1cCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kVmlzaW9uRXZlbnRzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIub2ZmKCd0cmFuc2l0aW9uZW5kLmRwJyk7XG4gICAgICAgICAgICBldmVudCh0aGlzLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uZSgndHJhbnNpdGlvbmVuZC5kcCcsIGV2ZW50LmJpbmQodGhpcywgdGhpcywgdHJ1ZSkpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NoYW5nZVZpZXc6IGZ1bmN0aW9uIChkYXRlLCBkaXIpIHtcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlIHx8IHRoaXMuZm9jdXNlZCB8fCB0aGlzLmRhdGU7XG5cbiAgICAgICAgICAgIHZhciBuZXh0VmlldyA9IGRpciA9PSAndXAnID8gdGhpcy52aWV3SW5kZXggKyAxIDogdGhpcy52aWV3SW5kZXggLSAxO1xuICAgICAgICAgICAgaWYgKG5leHRWaWV3ID4gMikgbmV4dFZpZXcgPSAyO1xuICAgICAgICAgICAgaWYgKG5leHRWaWV3IDwgMCkgbmV4dFZpZXcgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMSk7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gdGhpcy52aWV3SW5kZXhlc1tuZXh0Vmlld107XG5cbiAgICAgICAgfSxcblxuICAgICAgICBfaGFuZGxlSG90S2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLl9nZXRGb2N1c2VkRGF0ZSgpKSxcbiAgICAgICAgICAgICAgICBmb2N1c2VkUGFyc2VkLFxuICAgICAgICAgICAgICAgIG8gPSB0aGlzLm9wdHMsXG4gICAgICAgICAgICAgICAgbmV3RGF0ZSxcbiAgICAgICAgICAgICAgICB0b3RhbERheXNJbk5leHRNb250aCxcbiAgICAgICAgICAgICAgICBtb250aENoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICB5ZWFyQ2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlY2FkZUNoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICB5ID0gZGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLm1vbnRoLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmRhdGU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3RybFJpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdjdHJsVXAnOlxuICAgICAgICAgICAgICAgICAgICBtICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2N0cmxMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdjdHJsRG93bic6XG4gICAgICAgICAgICAgICAgICAgIG0gLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgbW9udGhDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2hpZnRSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc2hpZnRVcCc6XG4gICAgICAgICAgICAgICAgICAgIHllYXJDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgeSArPSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzaGlmdExlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NoaWZ0RG93bic6XG4gICAgICAgICAgICAgICAgICAgIHllYXJDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhbHRSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx0VXAnOlxuICAgICAgICAgICAgICAgICAgICBkZWNhZGVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgeSArPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx0TGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx0RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGRlY2FkZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjdHJsU2hpZnRVcCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvdGFsRGF5c0luTmV4dE1vbnRoID0gZGF0ZXBpY2tlci5nZXREYXlzQ291bnQobmV3IERhdGUoeSxtKSk7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoeSxtLGQpO1xuXG4gICAgICAgICAgICAvLyBJZiBuZXh0IG1vbnRoIGhhcyBsZXNzIGRheXMgdGhhbiBjdXJyZW50LCBzZXQgZGF0ZSB0byB0b3RhbCBkYXlzIGluIHRoYXQgbW9udGhcbiAgICAgICAgICAgIGlmICh0b3RhbERheXNJbk5leHRNb250aCA8IGQpIGQgPSB0b3RhbERheXNJbk5leHRNb250aDtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbmV3RGF0ZSBpcyBpbiB2YWxpZCByYW5nZVxuICAgICAgICAgICAgaWYgKG5ld0RhdGUuZ2V0VGltZSgpIDwgdGhpcy5taW5UaW1lKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0ZSA9IHRoaXMubWluRGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3RGF0ZS5nZXRUaW1lKCkgPiB0aGlzLm1heFRpbWUpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBuZXdEYXRlO1xuXG4gICAgICAgICAgICBmb2N1c2VkUGFyc2VkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKG5ld0RhdGUpO1xuICAgICAgICAgICAgaWYgKG1vbnRoQ2hhbmdlZCAmJiBvLm9uQ2hhbmdlTW9udGgpIHtcbiAgICAgICAgICAgICAgICBvLm9uQ2hhbmdlTW9udGgoZm9jdXNlZFBhcnNlZC5tb250aCwgZm9jdXNlZFBhcnNlZC55ZWFyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHllYXJDaGFuZ2VkICYmIG8ub25DaGFuZ2VZZWFyKSB7XG4gICAgICAgICAgICAgICAgby5vbkNoYW5nZVllYXIoZm9jdXNlZFBhcnNlZC55ZWFyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlY2FkZUNoYW5nZWQgJiYgby5vbkNoYW5nZURlY2FkZSkge1xuICAgICAgICAgICAgICAgIG8ub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlZ2lzdGVyS2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RzID0gdGhpcy5rZXlzLnNvbWUoZnVuY3Rpb24gKGN1cktleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJLZXkgPT0ga2V5O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlzLnB1c2goa2V5KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF91blJlZ2lzdGVyS2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmtleXMuaW5kZXhPZihrZXkpO1xuXG4gICAgICAgICAgICB0aGlzLmtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaXNIb3RLZXlQcmVzc2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEhvdEtleSxcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBwcmVzc2VkS2V5cyA9IHRoaXMua2V5cy5zb3J0KCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGhvdEtleSBpbiBob3RLZXlzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEhvdEtleSA9IGhvdEtleXNbaG90S2V5XTtcbiAgICAgICAgICAgICAgICBpZiAocHJlc3NlZEtleXMubGVuZ3RoICE9IGN1cnJlbnRIb3RLZXkubGVuZ3RoKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SG90S2V5LmV2ZXJ5KGZ1bmN0aW9uIChrZXksIGkpIHsgcmV0dXJuIGtleSA9PSBwcmVzc2VkS2V5c1tpXX0pKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyKCdob3RLZXknLCBob3RLZXkpO1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RyaWdnZXI6IGZ1bmN0aW9uIChldmVudCwgYXJncykge1xuICAgICAgICAgICAgdGhpcy4kZWwudHJpZ2dlcihldmVudCwgYXJncylcbiAgICAgICAgfSxcblxuICAgICAgICBfZm9jdXNOZXh0Q2VsbDogZnVuY3Rpb24gKGtleUNvZGUsIHR5cGUpIHtcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlIHx8IHRoaXMuY2VsbFR5cGU7XG5cbiAgICAgICAgICAgIHZhciBkYXRlID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMuX2dldEZvY3VzZWREYXRlKCkpLFxuICAgICAgICAgICAgICAgIHkgPSBkYXRlLnllYXIsXG4gICAgICAgICAgICAgICAgbSA9IGRhdGUubW9udGgsXG4gICAgICAgICAgICAgICAgZCA9IGRhdGUuZGF0ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzSG90S2V5UHJlc3NlZCgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaChrZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAzNzogLy8gbGVmdFxuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdkYXknID8gKGQgLT0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnbW9udGgnID8gKG0gLT0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAneWVhcicgPyAoeSAtPSAxKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM4OiAvLyB1cFxuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdkYXknID8gKGQgLT0gNykgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnbW9udGgnID8gKG0gLT0gMykgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAneWVhcicgPyAoeSAtPSA0KSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM5OiAvLyByaWdodFxuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdkYXknID8gKGQgKz0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnbW9udGgnID8gKG0gKz0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAneWVhcicgPyAoeSArPSAxKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQwOiAvLyBkb3duXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ2RheScgPyAoZCArPSA3KSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdtb250aCcgPyAobSArPSAzKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICd5ZWFyJyA/ICh5ICs9IDQpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbmQgPSBuZXcgRGF0ZSh5LG0sZCk7XG4gICAgICAgICAgICBpZiAobmQuZ2V0VGltZSgpIDwgdGhpcy5taW5UaW1lKSB7XG4gICAgICAgICAgICAgICAgbmQgPSB0aGlzLm1pbkRhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5kLmdldFRpbWUoKSA+IHRoaXMubWF4VGltZSkge1xuICAgICAgICAgICAgICAgIG5kID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBuZDtcblxuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRGb2N1c2VkRGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZvY3VzZWQgID0gdGhpcy5mb2N1c2VkIHx8IHRoaXMuc2VsZWN0ZWREYXRlc1t0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICAgICAgZCA9IHRoaXMucGFyc2VkRGF0ZTtcblxuICAgICAgICAgICAgaWYgKCFmb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2VkID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoLCBuZXcgRGF0ZSgpLmdldERhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzZWQgPSBuZXcgRGF0ZShkLnllYXIsIGQubW9udGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzZWQgPSBuZXcgRGF0ZShkLnllYXIsIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm9jdXNlZDtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Q2VsbDogZnVuY3Rpb24gKGRhdGUsIHR5cGUpIHtcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlIHx8IHRoaXMuY2VsbFR5cGU7XG5cbiAgICAgICAgICAgIHZhciBkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJy5kYXRlcGlja2VyLS1jZWxsW2RhdGEteWVhcj1cIicgKyBkLnllYXIgKyAnXCJdJyxcbiAgICAgICAgICAgICAgICAkY2VsbDtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICdbZGF0YS1tb250aD1cIicgKyBkLm1vbnRoICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yICs9ICdbZGF0YS1tb250aD1cIicgKyBkLm1vbnRoICsgJ1wiXVtkYXRhLWRhdGU9XCInICsgZC5kYXRlICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGNlbGwgPSB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLiRlbC5maW5kKHNlbGVjdG9yKTtcblxuICAgICAgICAgICAgcmV0dXJuICRjZWxsLmxlbmd0aCA/ICRjZWxsIDogJCgnJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIF90aGlzLiRlbFxuICAgICAgICAgICAgICAgIC5vZmYoJy5hZHAnKVxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJywgJycpO1xuXG4gICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzID0gW107XG4gICAgICAgICAgICBfdGhpcy5mb2N1c2VkID0gJyc7XG4gICAgICAgICAgICBfdGhpcy52aWV3cyA9IHt9O1xuICAgICAgICAgICAgX3RoaXMua2V5cyA9IFtdO1xuICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgIF90aGlzLm1heFJhbmdlID0gJyc7XG5cbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRzLmlubGluZSB8fCAhX3RoaXMuZWxJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGRhdGVwaWNrZXIuY2xvc2VzdCgnLmRhdGVwaWNrZXItaW5saW5lJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLiRkYXRlcGlja2VyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlczogZnVuY3Rpb24gKGFscmVhZHlTZWxlY3RlZCwgc2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHBvc3NpYmlsaXR5IHRvIHNlbGVjdCBzYW1lIGRhdGUgd2hlbiByYW5nZSBpcyB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoICE9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoJ2NsaWNrQ2VsbCcsIHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURhdGUoc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0cy50b2dnbGVTZWxlY3RlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEYXRlKHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENoYW5nZSBsYXN0IHNlbGVjdGVkIGRhdGUgdG8gYmUgYWJsZSB0byBjaGFuZ2UgdGltZSB3aGVuIGNsaWNraW5nIG9uIHRoaXMgY2VsbFxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZERhdGUgPSBhbHJlYWR5U2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlci5fc2V0VGltZShhbHJlYWR5U2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vblNob3dFdmVudDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQmx1cjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluRm9jdXMgJiYgdGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VEb3duRGF0ZXBpY2tlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5Gb2N1cyA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VVcERhdGVwaWNrZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLmluRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIGUub3JpZ2luYWxFdmVudC5pbkZvY3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghZS5vcmlnaW5hbEV2ZW50LnRpbWVwaWNrZXJGb2N1cykgdGhpcy4kZWwuZm9jdXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25LZXlVcEdlbmVyYWw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gdGhpcy4kZWwudmFsKCk7XG5cbiAgICAgICAgICAgIGlmICghdmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vblJlc2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZVVwQm9keTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQuaW5Gb2N1cykgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlICYmICF0aGlzLmluRm9jdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZVVwRWw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLm9yaWdpbmFsRXZlbnQuaW5Gb2N1cyA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuX29uS2V5VXBHZW5lcmFsLmJpbmQodGhpcyksNCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uS2V5RG93bjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyS2V5KGNvZGUpO1xuXG4gICAgICAgICAgICAvLyBBcnJvd3NcbiAgICAgICAgICAgIGlmIChjb2RlID49IDM3ICYmIGNvZGUgPD0gNDApIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9jdXNOZXh0Q2VsbChjb2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRW50ZXJcbiAgICAgICAgICAgIGlmIChjb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2V0Q2VsbCh0aGlzLmZvY3VzZWQpLmhhc0NsYXNzKCctZGlzYWJsZWQtJykpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlldyAhPSB0aGlzLm9wdHMubWluVmlldykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duKClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHJlYWR5U2VsZWN0ZWQgPSB0aGlzLl9pc1NlbGVjdGVkKHRoaXMuZm9jdXNlZCwgdGhpcy5jZWxsVHlwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWQuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUodGhpcy5mb2N1c2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlcyhhbHJlYWR5U2VsZWN0ZWQsIHRoaXMuZm9jdXNlZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRXNjXG4gICAgICAgICAgICBpZiAoY29kZSA9PSAyNykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbktleVVwOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBlLndoaWNoO1xuICAgICAgICAgICAgdGhpcy5fdW5SZWdpc3RlcktleShjb2RlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Ib3RLZXk6IGZ1bmN0aW9uIChlLCBob3RLZXkpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUhvdEtleShob3RLZXkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlRW50ZXJDZWxsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyICRjZWxsID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmRhdGVwaWNrZXItLWNlbGwnKSxcbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5fZ2V0RGF0ZUZyb21DZWxsKCRjZWxsKTtcblxuICAgICAgICAgICAgLy8gUHJldmVudCBmcm9tIHVubmVjZXNzYXJ5IHJlbmRlcmluZyBhbmQgc2V0dGluZyBuZXcgY3VycmVudERhdGVcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9ICcnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRjZWxsLmFkZENsYXNzKCctZm9jdXMtJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGRhdGU7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnJhbmdlICYmIHRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSB0aGlzLnNlbGVjdGVkRGF0ZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmxlc3ModGhpcy5taW5SYW5nZSwgdGhpcy5mb2N1c2VkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1heFJhbmdlID0gdGhpcy5taW5SYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5SYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl91cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZUxlYXZlQ2VsbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciAkY2VsbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5kYXRlcGlja2VyLS1jZWxsJyk7XG5cbiAgICAgICAgICAgICRjZWxsLnJlbW92ZUNsYXNzKCctZm9jdXMtJyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25UaW1lQ2hhbmdlOiBmdW5jdGlvbiAoZSwgaCwgbSkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXMgPSB0aGlzLnNlbGVjdGVkRGF0ZXMsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLmxhc3RTZWxlY3RlZERhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoaCk7XG4gICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMobSk7XG5cbiAgICAgICAgICAgIGlmICghc2VsZWN0ZWQgJiYgIXRoaXMuX2dldENlbGwoZGF0ZSkuaGFzQ2xhc3MoJy1kaXNhYmxlZC0nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkNsaWNrQ2VsbDogZnVuY3Rpb24gKGUsIGRhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3Vycyk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgZm9jdXNlZCh2YWwpIHtcbiAgICAgICAgICAgIGlmICghdmFsICYmIHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIHZhciAkY2VsbCA9IHRoaXMuX2dldENlbGwodGhpcy5mb2N1c2VkKTtcblxuICAgICAgICAgICAgICAgIGlmICgkY2VsbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGNlbGwucmVtb3ZlQ2xhc3MoJy1mb2N1cy0nKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB2YWw7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnJhbmdlICYmIHRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSB0aGlzLnNlbGVjdGVkRGF0ZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmxlc3ModGhpcy5taW5SYW5nZSwgdGhpcy5fZm9jdXNlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9IHRoaXMubWluUmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zaWxlbnQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHZhbDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgZm9jdXNlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb2N1c2VkO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBwYXJzZWREYXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLmRhdGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBkYXRlICh2YWwpIHtcbiAgICAgICAgICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIERhdGUpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGUgPSB2YWw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRlZCAmJiAhdGhpcy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMudmlld10uX3JlbmRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMubmF2Ll9yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlICYmIHRoaXMuZWxJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBkYXRlICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnREYXRlXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IHZpZXcgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy52aWV3SW5kZXggPSB0aGlzLnZpZXdJbmRleGVzLmluZGV4T2YodmFsKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlld0luZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcmV2VmlldyA9IHRoaXMuY3VycmVudFZpZXc7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdmFsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudmlld3NbdmFsXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3ZhbF0gPSBuZXcgICQuZm4uZGF0ZXBpY2tlci5Cb2R5KHRoaXMsIHZhbCwgdGhpcy5vcHRzKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld3NbdmFsXS5fcmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLnByZXZWaWV3XS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3c1t2YWxdLnNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdi5fcmVuZGVyKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9uQ2hhbmdlVmlldykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMub25DaGFuZ2VWaWV3KHZhbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWxJc0lucHV0ICYmIHRoaXMudmlzaWJsZSkgdGhpcy5zZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IHZpZXcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VmlldztcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgY2VsbFR5cGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3LnN1YnN0cmluZygwLCB0aGlzLnZpZXcubGVuZ3RoIC0gMSlcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgbWluVGltZSgpIHtcbiAgICAgICAgICAgIHZhciBtaW4gPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5taW5EYXRlKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShtaW4ueWVhciwgbWluLm1vbnRoLCBtaW4uZGF0ZSkuZ2V0VGltZSgpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IG1heFRpbWUoKSB7XG4gICAgICAgICAgICB2YXIgbWF4ID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMubWF4RGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUobWF4LnllYXIsIG1heC5tb250aCwgbWF4LmRhdGUpLmdldFRpbWUoKVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBjdXJEZWNhZGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZXBpY2tlci5nZXREZWNhZGUodGhpcy5kYXRlKVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vICBVdGlsc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGRhdGVwaWNrZXIuZ2V0RGF5c0NvdW50ID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgIGZ1bGxNb250aDogKGRhdGUuZ2V0TW9udGgoKSArIDEpIDwgMTAgPyAnMCcgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvLyBPbmUgYmFzZWRcbiAgICAgICAgICAgIGRhdGU6IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgZnVsbERhdGU6IGRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyAnMCcgKyBkYXRlLmdldERhdGUoKSA6IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgZGF5OiBkYXRlLmdldERheSgpLFxuICAgICAgICAgICAgaG91cnM6IGRhdGUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgIGZ1bGxIb3VyczogIGRhdGUuZ2V0SG91cnMoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXRIb3VycygpIDogIGRhdGUuZ2V0SG91cnMoKSAsXG4gICAgICAgICAgICBtaW51dGVzOiBkYXRlLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgIGZ1bGxNaW51dGVzOiAgZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCA/ICcwJyArIGRhdGUuZ2V0TWludXRlcygpIDogIGRhdGUuZ2V0TWludXRlcygpXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5nZXREZWNhZGUgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICB2YXIgZmlyc3RZZWFyID0gTWF0aC5mbG9vcihkYXRlLmdldEZ1bGxZZWFyKCkgLyAxMCkgKiAxMDtcblxuICAgICAgICByZXR1cm4gW2ZpcnN0WWVhciwgZmlyc3RZZWFyICsgOV07XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIudGVtcGxhdGUgPSBmdW5jdGlvbiAoc3RyLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvI1xceyhbXFx3XSspXFx9L2csIGZ1bmN0aW9uIChzb3VyY2UsIG1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVttYXRjaF0gfHwgZGF0YVttYXRjaF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVttYXRjaF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuaXNTYW1lID0gZnVuY3Rpb24gKGRhdGUxLCBkYXRlMiwgdHlwZSkge1xuICAgICAgICBpZiAoIWRhdGUxIHx8ICFkYXRlMikgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZDEgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZTEpLFxuICAgICAgICAgICAgZDIgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZTIpLFxuICAgICAgICAgICAgX3R5cGUgPSB0eXBlID8gdHlwZSA6ICdkYXknLFxuXG4gICAgICAgICAgICBjb25kaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIGRheTogZDEuZGF0ZSA9PSBkMi5kYXRlICYmIGQxLm1vbnRoID09IGQyLm1vbnRoICYmIGQxLnllYXIgPT0gZDIueWVhcixcbiAgICAgICAgICAgICAgICBtb250aDogZDEubW9udGggPT0gZDIubW9udGggJiYgZDEueWVhciA9PSBkMi55ZWFyLFxuICAgICAgICAgICAgICAgIHllYXI6IGQxLnllYXIgPT0gZDIueWVhclxuICAgICAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gY29uZGl0aW9uc1tfdHlwZV07XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIubGVzcyA9IGZ1bmN0aW9uIChkYXRlQ29tcGFyZVRvLCBkYXRlLCB0eXBlKSB7XG4gICAgICAgIGlmICghZGF0ZUNvbXBhcmVUbyB8fCAhZGF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKCkgPCBkYXRlQ29tcGFyZVRvLmdldFRpbWUoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5iaWdnZXIgPSBmdW5jdGlvbiAoZGF0ZUNvbXBhcmVUbywgZGF0ZSwgdHlwZSkge1xuICAgICAgICBpZiAoIWRhdGVDb21wYXJlVG8gfHwgIWRhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpID4gZGF0ZUNvbXBhcmVUby5nZXRUaW1lKCk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuZ2V0TGVhZGluZ1plcm9OdW0gPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChudW0pIDwgMTAgPyAnMCcgKyBudW0gOiBudW07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY29weSBvZiBkYXRlIHdpdGggaG91cnMgYW5kIG1pbnV0ZXMgZXF1YWxzIHRvIDBcbiAgICAgKiBAcGFyYW0gZGF0ZSB7RGF0ZX1cbiAgICAgKi9cbiAgICBkYXRlcGlja2VyLnJlc2V0VGltZSA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0ZSAhPSAnb2JqZWN0JykgcmV0dXJuO1xuICAgICAgICBkYXRlID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRhdGUpXG4gICAgfTtcblxuICAgICQuZm4uZGF0ZXBpY2tlciA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISQuZGF0YSh0aGlzLCBwbHVnaW5OYW1lKSkge1xuICAgICAgICAgICAgICAgICQuZGF0YSh0aGlzLCAgcGx1Z2luTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IERhdGVwaWNrZXIoIHRoaXMsIG9wdGlvbnMgKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9ICQuZGF0YSh0aGlzLCBwbHVnaW5OYW1lKTtcblxuICAgICAgICAgICAgICAgIF90aGlzLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCBfdGhpcy5vcHRzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uZGF0ZXBpY2tlci5Db25zdHJ1Y3RvciA9IERhdGVwaWNrZXI7XG5cbiAgICAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UgPSB7XG4gICAgICAgIHJ1OiB7XG4gICAgICAgICAgICBkYXlzOiBbJ9CS0L7RgdC60YDQtdGB0LXQvdGM0LUnLCfQn9C+0L3QtdC00LXQu9GM0L3QuNC6Jywn0JLRgtC+0YDQvdC40LonLCfQodGA0LXQtNCwJywn0KfQtdGC0LLQtdGA0LMnLCfQn9GP0YLQvdC40YbQsCcsJ9Ch0YPQsdCx0L7RgtCwJ10sXG4gICAgICAgICAgICBkYXlzU2hvcnQ6IFsn0JLRgScsJ9Cf0L0nLCfQktGCJywn0KHRgCcsJ9Cn0YInLCfQn9GCJywn0KHQsSddLFxuICAgICAgICAgICAgZGF5c01pbjogWyfQktGBJywn0J/QvScsJ9CS0YInLCfQodGAJywn0KfRgicsJ9Cf0YInLCfQodCxJ10sXG4gICAgICAgICAgICBtb250aHM6IFsn0K/QvdCy0LDRgNGMJywn0KTQtdCy0YDQsNC70YwnLCfQnNCw0YDRgicsJ9CQ0L/RgNC10LvRjCcsJ9Cc0LDQuScsJ9CY0Y7QvdGMJywn0JjRjtC70YwnLCfQkNCy0LPRg9GB0YInLCfQodC10L3RgtGP0LHRgNGMJywn0J7QutGC0Y/QsdGA0YwnLCfQndC+0Y/QsdGA0YwnLCfQlNC10LrQsNCx0YDRjCddLFxuICAgICAgICAgICAgbW9udGhzU2hvcnQ6IFsn0K/QvdCyJywn0KTQtdCyJywn0JzQsNGAJywn0JDQv9GAJywn0JzQsNC5Jywn0JjRjtC9Jywn0JjRjtC7Jywn0JDQstCzJywn0KHQtdC9Jywn0J7QutGCJywn0J3QvtGPJywn0JTQtdC6J10sXG4gICAgICAgICAgICB0b2RheTogJ9Ch0LXQs9C+0LTQvdGPJyxcbiAgICAgICAgICAgIGNsZWFyOiAn0J7Rh9C40YHRgtC40YLRjCcsXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXl5eScsXG4gICAgICAgICAgICB0aW1lRm9ybWF0OiAnaGg6aWknLFxuICAgICAgICAgICAgZmlyc3REYXk6IDFcbiAgICAgICAgfVxuICAgIH07XG4gICAvLyAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbJ3J1J10gPSAge1xuICAgLy8gICAgIGRheXM6IFsn0JLQvtGB0LrRgNC10YHQtdC90YzQtScsJ9Cf0L7QvdC10LTQtdC70YzQvdC40LonLCfQktGC0L7RgNC90LjQuicsJ9Ch0YDQtdC00LAnLCfQp9C10YLQstC10YDQsycsJ9Cf0Y/RgtC90LjRhtCwJywn0KHRg9Cx0LHQvtGC0LAnXSxcbiAgICAvLyAgICBkYXlzU2hvcnQ6IFsn0JLQvtGBJywn0J/QvtC9Jywn0JLRgtC+Jywn0KHRgNC1Jywn0KfQtdGCJywn0J/Rj9GCJywn0KHRg9CxJ10sXG4gICAvLyAgICAgZGF5c01pbjogWyfQktGBJywn0J/QvScsJ9CS0YInLCfQodGAJywn0KfRgicsJ9Cf0YInLCfQodCxJ10sXG4gICAvLyAgICAgbW9udGhzOiBbJ9Cv0L3QstCw0YDRjCcsJ9Ck0LXQstGA0LDQu9GMJywn0JzQsNGA0YInLCfQkNC/0YDQtdC70YwnLCfQnNCw0LknLCfQmNGO0L3RjCcsJ9CY0Y7Qu9GMJywn0JDQstCz0YPRgdGCJywn0KHQtdC90YLRj9Cx0YDRjCcsJ9Ce0LrRgtGP0LHRgNGMJywn0J3QvtGP0LHRgNGMJywn0JTQtdC60LDQsdGA0YwnXSxcbiAgIC8vICAgICBtb250aHNTaG9ydDogWyfQr9C90LInLCfQpNC10LInLCfQnNCw0YAnLCfQkNC/0YAnLCfQnNCw0LknLCfQmNGO0L0nLCfQmNGO0LsnLCfQkNCy0LMnLCfQodC10L0nLCfQntC60YInLCfQndC+0Y8nLCfQlNC10LonXSxcbiAgIC8vICAgICB0b2RheTogJ9Ch0LXQs9C+0LTQvdGPJyxcbiAgLy8gICAgICBjbGVhcjogJ9Ce0YfQuNGB0YLQuNGC0YwnLFxuIC8vICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eXl5JyxcbiAvLyAgICAgICB0aW1lRm9ybWF0OiAnaGg6aWknLFxuIC8vICAgICAgIGZpcnN0RGF5OiAxXG4gLy8gICB9O1xuXG5cbiAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChhdXRvSW5pdFNlbGVjdG9yKS5kYXRlcGlja2VyKCk7XG4gICAgfSlcblxufSkoKTtcblxuOyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRlbXBsYXRlcyA9IHtcbiAgICAgICAgZGF5czonJyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tZGF5cyBkYXRlcGlja2VyLS1ib2R5XCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tZGF5cy1uYW1lc1wiPjwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLWRheXNcIj48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgIG1vbnRoczogJycgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW1vbnRocyBkYXRlcGlja2VyLS1ib2R5XCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY2VsbHMgZGF0ZXBpY2tlci0tY2VsbHMtbW9udGhzXCI+PC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICB5ZWFyczogJycgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXllYXJzIGRhdGVwaWNrZXItLWJvZHlcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy15ZWFyc1wiPjwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICAgICB9LFxuICAgICAgICBkYXRlcGlja2VyID0gJC5mbi5kYXRlcGlja2VyLFxuICAgICAgICBkcCA9IGRhdGVwaWNrZXIuQ29uc3RydWN0b3I7XG5cbiAgICBkYXRlcGlja2VyLkJvZHkgPSBmdW5jdGlvbiAoZCwgdHlwZSwgb3B0cykge1xuICAgICAgICB0aGlzLmQgPSBkO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLiRlbCA9ICQoJycpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHJldHVybjtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuQm9keS5wcm90b3R5cGUgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkQmFzZUh0bWwoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xuXG4gICAgICAgICAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2JpbmRFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdjbGljaycsICcuZGF0ZXBpY2tlci0tY2VsbCcsICQucHJveHkodGhpcy5fb25DbGlja0NlbGwsIHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYnVpbGRCYXNlSHRtbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKHRlbXBsYXRlc1t0aGlzLnR5cGVdKS5hcHBlbmRUbyh0aGlzLmQuJGNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy4kbmFtZXMgPSAkKCcuZGF0ZXBpY2tlci0tZGF5cy1uYW1lcycsIHRoaXMuJGVsKTtcbiAgICAgICAgICAgIHRoaXMuJGNlbGxzID0gJCgnLmRhdGVwaWNrZXItLWNlbGxzJywgdGhpcy4kZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXREYXlOYW1lc0h0bWw6IGZ1bmN0aW9uIChmaXJzdERheSwgY3VyRGF5LCBodG1sLCBpKSB7XG4gICAgICAgICAgICBjdXJEYXkgPSBjdXJEYXkgIT0gdW5kZWZpbmVkID8gY3VyRGF5IDogZmlyc3REYXk7XG4gICAgICAgICAgICBodG1sID0gaHRtbCA/IGh0bWwgOiAnJztcbiAgICAgICAgICAgIGkgPSBpICE9IHVuZGVmaW5lZCA/IGkgOiAwO1xuXG4gICAgICAgICAgICBpZiAoaSA+IDcpIHJldHVybiBodG1sO1xuICAgICAgICAgICAgaWYgKGN1ckRheSA9PSA3KSByZXR1cm4gdGhpcy5fZ2V0RGF5TmFtZXNIdG1sKGZpcnN0RGF5LCAwLCBodG1sLCArK2kpO1xuXG4gICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tZGF5LW5hbWUnICsgKHRoaXMuZC5pc1dlZWtlbmQoY3VyRGF5KSA/IFwiIC13ZWVrZW5kLVwiIDogXCJcIikgKyAnXCI+JyArIHRoaXMuZC5sb2MuZGF5c01pbltjdXJEYXldICsgJzwvZGl2Pic7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXREYXlOYW1lc0h0bWwoZmlyc3REYXksICsrY3VyRGF5LCBodG1sLCArK2kpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRDZWxsQ29udGVudHM6IGZ1bmN0aW9uIChkYXRlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFwiZGF0ZXBpY2tlci0tY2VsbCBkYXRlcGlja2VyLS1jZWxsLVwiICsgdHlwZSxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5kLFxuICAgICAgICAgICAgICAgIG1pblJhbmdlID0gZHAucmVzZXRUaW1lKHBhcmVudC5taW5SYW5nZSksXG4gICAgICAgICAgICAgICAgbWF4UmFuZ2UgPSBkcC5yZXNldFRpbWUocGFyZW50Lm1heFJhbmdlKSxcbiAgICAgICAgICAgICAgICBvcHRzID0gcGFyZW50Lm9wdHMsXG4gICAgICAgICAgICAgICAgZCA9IGRwLmdldFBhcnNlZERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgcmVuZGVyID0ge30sXG4gICAgICAgICAgICAgICAgaHRtbCA9IGQuZGF0ZTtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5pc1dlZWtlbmQoZC5kYXkpKSBjbGFzc2VzICs9IFwiIC13ZWVrZW5kLVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5tb250aCAhPSB0aGlzLmQucGFyc2VkRGF0ZS5tb250aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSBcIiAtb3RoZXItbW9udGgtXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuc2VsZWN0T3RoZXJNb250aHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9IFwiIC1kaXNhYmxlZC1cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0cy5zaG93T3RoZXJNb250aHMpIGh0bWwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBwYXJlbnQubG9jW3BhcmVudC5vcHRzLm1vbnRoc0ZpZWxkXVtkLm1vbnRoXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNhZGUgPSBwYXJlbnQuY3VyRGVjYWRlO1xuICAgICAgICAgICAgICAgICAgICBodG1sID0gZC55ZWFyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC55ZWFyIDwgZGVjYWRlWzBdIHx8IGQueWVhciA+IGRlY2FkZVsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIC1vdGhlci1kZWNhZGUtJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0cy5zZWxlY3RPdGhlclllYXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSBcIiAtZGlzYWJsZWQtXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuc2hvd090aGVyWWVhcnMpIGh0bWwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMub25SZW5kZXJDZWxsKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyID0gb3B0cy5vblJlbmRlckNlbGwoZGF0ZSwgdHlwZSkgfHwge307XG4gICAgICAgICAgICAgICAgaHRtbCA9IHJlbmRlci5odG1sID8gcmVuZGVyLmh0bWwgOiBodG1sO1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gcmVuZGVyLmNsYXNzZXMgPyAnICcgKyByZW5kZXIuY2xhc3NlcyA6ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChkcC5pc1NhbWUobWluUmFuZ2UsIGRhdGUsIHR5cGUpKSBjbGFzc2VzICs9ICcgLXJhbmdlLWZyb20tJztcbiAgICAgICAgICAgICAgICBpZiAoZHAuaXNTYW1lKG1heFJhbmdlLCBkYXRlLCB0eXBlKSkgY2xhc3NlcyArPSAnIC1yYW5nZS10by0nO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PSAxICYmIHBhcmVudC5mb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIChkcC5iaWdnZXIobWluUmFuZ2UsIGRhdGUpICYmIGRwLmxlc3MocGFyZW50LmZvY3VzZWQsIGRhdGUpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKGRwLmxlc3MobWF4UmFuZ2UsIGRhdGUpICYmIGRwLmJpZ2dlcihwYXJlbnQuZm9jdXNlZCwgZGF0ZSkpKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9ICcgLWluLXJhbmdlLSdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcC5sZXNzKG1heFJhbmdlLCBkYXRlKSAmJiBkcC5pc1NhbWUocGFyZW50LmZvY3VzZWQsIGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9ICcgLXJhbmdlLWZyb20tJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkcC5iaWdnZXIobWluUmFuZ2UsIGRhdGUpICYmIGRwLmlzU2FtZShwYXJlbnQuZm9jdXNlZCwgZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gJyAtcmFuZ2UtdG8tJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmVudC5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkcC5iaWdnZXIobWluUmFuZ2UsIGRhdGUpICYmIGRwLmxlc3MobWF4UmFuZ2UsIGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9ICcgLWluLXJhbmdlLSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoZHAuaXNTYW1lKGN1cnJlbnREYXRlLCBkYXRlLCB0eXBlKSkgY2xhc3NlcyArPSAnIC1jdXJyZW50LSc7XG4gICAgICAgICAgICBpZiAocGFyZW50LmZvY3VzZWQgJiYgZHAuaXNTYW1lKGRhdGUsIHBhcmVudC5mb2N1c2VkLCB0eXBlKSkgY2xhc3NlcyArPSAnIC1mb2N1cy0nO1xuICAgICAgICAgICAgaWYgKHBhcmVudC5faXNTZWxlY3RlZChkYXRlLCB0eXBlKSkgY2xhc3NlcyArPSAnIC1zZWxlY3RlZC0nO1xuICAgICAgICAgICAgaWYgKCFwYXJlbnQuX2lzSW5SYW5nZShkYXRlLCB0eXBlKSB8fCByZW5kZXIuZGlzYWJsZWQpIGNsYXNzZXMgKz0gJyAtZGlzYWJsZWQtJztcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBodG1sOiBodG1sLFxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsY3VsYXRlcyBkYXlzIG51bWJlciB0byByZW5kZXIuIEdlbmVyYXRlcyBkYXlzIGh0bWwgYW5kIHJldHVybnMgaXQuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRlIC0gRGF0ZSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9nZXREYXlzSHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciB0b3RhbE1vbnRoRGF5cyA9IGRwLmdldERheXNDb3VudChkYXRlKSxcbiAgICAgICAgICAgICAgICBmaXJzdE1vbnRoRGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpLmdldERheSgpLFxuICAgICAgICAgICAgICAgIGxhc3RNb250aERheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCB0b3RhbE1vbnRoRGF5cykuZ2V0RGF5KCksXG4gICAgICAgICAgICAgICAgZGF5c0Zyb21QZXZNb250aCA9IGZpcnN0TW9udGhEYXkgLSB0aGlzLmQubG9jLmZpcnN0RGF5LFxuICAgICAgICAgICAgICAgIGRheXNGcm9tTmV4dE1vbnRoID0gNiAtIGxhc3RNb250aERheSArIHRoaXMuZC5sb2MuZmlyc3REYXk7XG5cbiAgICAgICAgICAgIGRheXNGcm9tUGV2TW9udGggPSBkYXlzRnJvbVBldk1vbnRoIDwgMCA/IGRheXNGcm9tUGV2TW9udGggKyA3IDogZGF5c0Zyb21QZXZNb250aDtcbiAgICAgICAgICAgIGRheXNGcm9tTmV4dE1vbnRoID0gZGF5c0Zyb21OZXh0TW9udGggPiA2ID8gZGF5c0Zyb21OZXh0TW9udGggLSA3IDogZGF5c0Zyb21OZXh0TW9udGg7XG5cbiAgICAgICAgICAgIHZhciBzdGFydERheUluZGV4ID0gLWRheXNGcm9tUGV2TW9udGggKyAxLFxuICAgICAgICAgICAgICAgIG0sIHksXG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnREYXlJbmRleCwgbWF4ID0gdG90YWxNb250aERheXMgKyBkYXlzRnJvbU5leHRNb250aDsgaSA8PSBtYXg7IGkrKykge1xuICAgICAgICAgICAgICAgIHkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgbSA9IGRhdGUuZ2V0TW9udGgoKTtcblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gdGhpcy5fZ2V0RGF5SHRtbChuZXcgRGF0ZSh5LCBtLCBpKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldERheUh0bWw6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5fZ2V0Q2VsbENvbnRlbnRzKGRhdGUsICdkYXknKTtcblxuICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiJyArIGNvbnRlbnQuY2xhc3NlcyArICdcIiAnICtcbiAgICAgICAgICAgICAgICAnZGF0YS1kYXRlPVwiJyArIGRhdGUuZ2V0RGF0ZSgpICsgJ1wiICcgK1xuICAgICAgICAgICAgICAgICdkYXRhLW1vbnRoPVwiJyArIGRhdGUuZ2V0TW9udGgoKSArICdcIiAnICtcbiAgICAgICAgICAgICAgICAnZGF0YS15ZWFyPVwiJyArIGRhdGUuZ2V0RnVsbFllYXIoKSArICdcIj4nICsgY29udGVudC5odG1sICsgJzwvZGl2Pic7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdlbmVyYXRlcyBtb250aHMgaHRtbFxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0ZSAtIGRhdGUgaW5zdGFuY2VcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9nZXRNb250aHNIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIGh0bWwgPSAnJyxcbiAgICAgICAgICAgICAgICBkID0gZHAuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAgICAgd2hpbGUoaSA8IDEyKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSB0aGlzLl9nZXRNb250aEh0bWwobmV3IERhdGUoZC55ZWFyLCBpKSk7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRNb250aEh0bWw6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuX2dldENlbGxDb250ZW50cyhkYXRlLCAnbW9udGgnKTtcblxuICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiJyArIGNvbnRlbnQuY2xhc3NlcyArICdcIiBkYXRhLW1vbnRoPVwiJyArIGRhdGUuZ2V0TW9udGgoKSArICdcIj4nICsgY29udGVudC5odG1sICsgJzwvZGl2PidcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0WWVhcnNIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIGQgPSBkcC5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIGRlY2FkZSA9IGRwLmdldERlY2FkZShkYXRlKSxcbiAgICAgICAgICAgICAgICBmaXJzdFllYXIgPSBkZWNhZGVbMF0gLSAxLFxuICAgICAgICAgICAgICAgIGh0bWwgPSAnJyxcbiAgICAgICAgICAgICAgICBpID0gZmlyc3RZZWFyO1xuXG4gICAgICAgICAgICBmb3IgKGk7IGkgPD0gZGVjYWRlWzFdICsgMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSB0aGlzLl9nZXRZZWFySHRtbChuZXcgRGF0ZShpICwgMCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0WWVhckh0bWw6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuX2dldENlbGxDb250ZW50cyhkYXRlLCAneWVhcicpO1xuXG4gICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCInICsgY29udGVudC5jbGFzc2VzICsgJ1wiIGRhdGEteWVhcj1cIicgKyBkYXRlLmdldEZ1bGxZZWFyKCkgKyAnXCI+JyArIGNvbnRlbnQuaHRtbCArICc8L2Rpdj4nXG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlbmRlclR5cGVzOiB7XG4gICAgICAgICAgICBkYXlzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRheU5hbWVzID0gdGhpcy5fZ2V0RGF5TmFtZXNIdG1sKHRoaXMuZC5sb2MuZmlyc3REYXkpLFxuICAgICAgICAgICAgICAgICAgICBkYXlzID0gdGhpcy5fZ2V0RGF5c0h0bWwodGhpcy5kLmN1cnJlbnREYXRlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJGNlbGxzLmh0bWwoZGF5cyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbmFtZXMuaHRtbChkYXlOYW1lcylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb250aHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCA9IHRoaXMuX2dldE1vbnRoc0h0bWwodGhpcy5kLmN1cnJlbnREYXRlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJGNlbGxzLmh0bWwoaHRtbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5ZWFyczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBodG1sID0gdGhpcy5fZ2V0WWVhcnNIdG1sKHRoaXMuZC5jdXJyZW50RGF0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRjZWxscy5odG1sKGh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyVHlwZXNbdGhpcy50eXBlXS5iaW5kKHRoaXMpKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICRjZWxscyA9ICQoJy5kYXRlcGlja2VyLS1jZWxsJywgdGhpcy4kY2VsbHMpLFxuICAgICAgICAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgICAgICRjZWxsLFxuICAgICAgICAgICAgICAgIGRhdGU7XG4gICAgICAgICAgICAkY2VsbHMuZWFjaChmdW5jdGlvbiAoY2VsbCwgaSkge1xuICAgICAgICAgICAgICAgICRjZWxsID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICBkYXRlID0gX3RoaXMuZC5fZ2V0RGF0ZUZyb21DZWxsKCQodGhpcykpO1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBfdGhpcy5fZ2V0Q2VsbENvbnRlbnRzKGRhdGUsIF90aGlzLmQuY2VsbFR5cGUpO1xuICAgICAgICAgICAgICAgICRjZWxsLmF0dHIoJ2NsYXNzJyxjbGFzc2VzLmNsYXNzZXMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmFjaXR2ZSA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyAgRXZlbnRzXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICBfaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBlbC5kYXRhKCdkYXRlJykgfHwgMSxcbiAgICAgICAgICAgICAgICBtb250aCA9IGVsLmRhdGEoJ21vbnRoJykgfHwgMCxcbiAgICAgICAgICAgICAgICB5ZWFyID0gZWwuZGF0YSgneWVhcicpIHx8IHRoaXMuZC5wYXJzZWREYXRlLnllYXIsXG4gICAgICAgICAgICAgICAgZHAgPSB0aGlzLmQ7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgdmlldyBpZiBtaW4gdmlldyBkb2VzIG5vdCByZWFjaCB5ZXRcbiAgICAgICAgICAgIGlmIChkcC52aWV3ICE9IHRoaXMub3B0cy5taW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgZHAuZG93bihuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNlbGVjdCBkYXRlIGlmIG1pbiB2aWV3IGlzIHJlYWNoZWRcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZERhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSksXG4gICAgICAgICAgICAgICAgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5kLl9pc1NlbGVjdGVkKHNlbGVjdGVkRGF0ZSwgdGhpcy5kLmNlbGxUeXBlKTtcblxuICAgICAgICAgICAgaWYgKCFhbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBkcC5fdHJpZ2dlcignY2xpY2tDZWxsJywgc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRwLl9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlcy5iaW5kKGRwLCBhbHJlYWR5U2VsZWN0ZWQsIHNlbGVjdGVkRGF0ZSkoKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkNsaWNrQ2VsbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciAkZWwgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZGF0ZXBpY2tlci0tY2VsbCcpO1xuXG4gICAgICAgICAgICBpZiAoJGVsLmhhc0NsYXNzKCctZGlzYWJsZWQtJykpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlQ2xpY2suYmluZCh0aGlzKSgkZWwpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cbjsoZnVuY3Rpb24gKCkge1xuICAgIHZhciB0ZW1wbGF0ZSA9ICcnICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXYtYWN0aW9uXCIgZGF0YS1hY3Rpb249XCJwcmV2XCI+I3twcmV2SHRtbH08L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXYtdGl0bGVcIj4je3RpdGxlfTwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi1hY3Rpb25cIiBkYXRhLWFjdGlvbj1cIm5leHRcIj4je25leHRIdG1sfTwvZGl2PicsXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXJUZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tYnV0dG9uc1wiPjwvZGl2PicsXG4gICAgICAgIGJ1dHRvbiA9ICc8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLWJ1dHRvblwiIGRhdGEtYWN0aW9uPVwiI3thY3Rpb259XCI+I3tsYWJlbH08L3NwYW4+JyxcbiAgICAgICAgZGF0ZXBpY2tlciA9ICQuZm4uZGF0ZXBpY2tlcixcbiAgICAgICAgZHAgPSBkYXRlcGlja2VyLkNvbnN0cnVjdG9yO1xuXG4gICAgZGF0ZXBpY2tlci5OYXZpZ2F0aW9uID0gZnVuY3Rpb24gKGQsIG9wdHMpIHtcbiAgICAgICAgdGhpcy5kID0gZDtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcblxuICAgICAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyID0gJyc7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuTmF2aWdhdGlvbi5wcm90b3R5cGUgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkQmFzZUh0bWwoKTtcbiAgICAgICAgICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kLiRuYXYub24oJ2NsaWNrJywgJy5kYXRlcGlja2VyLS1uYXYtYWN0aW9uJywgJC5wcm94eSh0aGlzLl9vbkNsaWNrTmF2QnV0dG9uLCB0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmQuJG5hdi5vbignY2xpY2snLCAnLmRhdGVwaWNrZXItLW5hdi10aXRsZScsICQucHJveHkodGhpcy5fb25DbGlja05hdlRpdGxlLCB0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmQuJGRhdGVwaWNrZXIub24oJ2NsaWNrJywgJy5kYXRlcGlja2VyLS1idXR0b24nLCAkLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZCdXR0b24sIHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYnVpbGRCYXNlSHRtbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FkZEJ1dHRvbnNJZk5lZWQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYWRkQnV0dG9uc0lmTmVlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50b2RheUJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZEJ1dHRvbigndG9kYXknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5jbGVhckJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZEJ1dHRvbignY2xlYXInKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0aXRsZSA9IHRoaXMuX2dldFRpdGxlKHRoaXMuZC5jdXJyZW50RGF0ZSksXG4gICAgICAgICAgICAgICAgaHRtbCA9IGRwLnRlbXBsYXRlKHRlbXBsYXRlLCAkLmV4dGVuZCh7dGl0bGU6IHRpdGxlfSwgdGhpcy5vcHRzKSk7XG4gICAgICAgICAgICB0aGlzLmQuJG5hdi5odG1sKGh0bWwpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZC52aWV3ID09ICd5ZWFycycpIHtcbiAgICAgICAgICAgICAgICAkKCcuZGF0ZXBpY2tlci0tbmF2LXRpdGxlJywgdGhpcy5kLiRuYXYpLmFkZENsYXNzKCctZGlzYWJsZWQtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldE5hdlN0YXR1cygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRUaXRsZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmQuZm9ybWF0RGF0ZSh0aGlzLm9wdHMubmF2VGl0bGVzW3RoaXMuZC52aWV3XSwgZGF0ZSlcbiAgICAgICAgfSxcblxuICAgICAgICBfYWRkQnV0dG9uOiBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLiRidXR0b25zQ29udGFpbmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZEJ1dHRvbnNDb250YWluZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMuZC5sb2NbdHlwZV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGh0bWwgPSBkcC50ZW1wbGF0ZShidXR0b24sIGRhdGEpO1xuXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtYWN0aW9uPScgKyB0eXBlICsgJ10nLCB0aGlzLiRidXR0b25zQ29udGFpbmVyKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIuYXBwZW5kKGh0bWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9hZGRCdXR0b25zQ29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmQuJGRhdGVwaWNrZXIuYXBwZW5kKGJ1dHRvbnNDb250YWluZXJUZW1wbGF0ZSk7XG4gICAgICAgICAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyID0gJCgnLmRhdGVwaWNrZXItLWJ1dHRvbnMnLCB0aGlzLmQuJGRhdGVwaWNrZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldE5hdlN0YXR1czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5vcHRzLm1pbkRhdGUgfHwgdGhpcy5vcHRzLm1heERhdGUpIHx8ICF0aGlzLm9wdHMuZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBkYXRlID0gdGhpcy5kLnBhcnNlZERhdGUsXG4gICAgICAgICAgICAgICAgbSA9IGRhdGUubW9udGgsXG4gICAgICAgICAgICAgICAgeSA9IGRhdGUueWVhcixcbiAgICAgICAgICAgICAgICBkID0gZGF0ZS5kYXRlO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZC52aWV3KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoeSwgbS0xLCAxKSwgJ21vbnRoJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ3ByZXYnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoeSwgbSsxLCAxKSwgJ21vbnRoJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ25leHQnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoeS0xLCBtLCBkKSwgJ3llYXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdigncHJldicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZSh5KzEsIG0sIGQpLCAneWVhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlTmF2KCduZXh0JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNhZGUgPSBkcC5nZXREZWNhZGUodGhpcy5kLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGRlY2FkZVswXSAtIDEsIDAsIDEpLCAneWVhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlTmF2KCdwcmV2JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGRlY2FkZVsxXSArIDEsIDAsIDEpLCAneWVhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlTmF2KCduZXh0JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfZGlzYWJsZU5hdjogZnVuY3Rpb24gKG5hdikge1xuICAgICAgICAgICAgJCgnW2RhdGEtYWN0aW9uPVwiJyArIG5hdiArICdcIl0nLCB0aGlzLmQuJG5hdikuYWRkQ2xhc3MoJy1kaXNhYmxlZC0nKVxuICAgICAgICB9LFxuXG4gICAgICAgIF9hY3RpdmF0ZU5hdjogZnVuY3Rpb24gKG5hdikge1xuICAgICAgICAgICAgJCgnW2RhdGEtYWN0aW9uPVwiJyArIG5hdiArICdcIl0nLCB0aGlzLmQuJG5hdikucmVtb3ZlQ2xhc3MoJy1kaXNhYmxlZC0nKVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkNsaWNrTmF2QnV0dG9uOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyICRlbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJ1tkYXRhLWFjdGlvbl0nKSxcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSAkZWwuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZFthY3Rpb25dKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQ2xpY2tOYXZUaXRsZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5oYXNDbGFzcygnLWRpc2FibGVkLScpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmQudmlldyA9PSAnZGF5cycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kLnZpZXcgPSAnbW9udGhzJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmQudmlldyA9ICd5ZWFycyc7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG5cbjsoZnVuY3Rpb24gKCkge1xuICAgIHZhciB0ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZVwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudFwiPicgK1xuICAgICAgICAnICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtaG91cnNcIj4je2hvdXJWaXNpYmxlfTwvc3Bhbj4nICtcbiAgICAgICAgJyAgIDxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWNvbG9uXCI+Ojwvc3Bhbj4nICtcbiAgICAgICAgJyAgIDxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LW1pbnV0ZXNcIj4je21pblZhbHVlfTwvc3Bhbj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtc2xpZGVyc1wiPicgK1xuICAgICAgICAnICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtcm93XCI+JyArXG4gICAgICAgICcgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbmFtZT1cImhvdXJzXCIgdmFsdWU9XCIje2hvdXJWYWx1ZX1cIiBtaW49XCIje2hvdXJNaW59XCIgbWF4PVwiI3tob3VyTWF4fVwiIHN0ZXA9XCIje2hvdXJTdGVwfVwiLz4nICtcbiAgICAgICAgJyAgIDwvZGl2PicgK1xuICAgICAgICAnICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtcm93XCI+JyArXG4gICAgICAgICcgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbmFtZT1cIm1pbnV0ZXNcIiB2YWx1ZT1cIiN7bWluVmFsdWV9XCIgbWluPVwiI3ttaW5NaW59XCIgbWF4PVwiI3ttaW5NYXh9XCIgc3RlcD1cIiN7bWluU3RlcH1cIi8+JyArXG4gICAgICAgICcgICA8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgZGF0ZXBpY2tlciA9ICQuZm4uZGF0ZXBpY2tlcixcbiAgICAgICAgZHAgPSBkYXRlcGlja2VyLkNvbnN0cnVjdG9yO1xuXG4gICAgZGF0ZXBpY2tlci5UaW1lcGlja2VyID0gZnVuY3Rpb24gKGluc3QsIG9wdHMpIHtcbiAgICAgICAgdGhpcy5kID0gaW5zdDtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5UaW1lcGlja2VyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gJ2lucHV0JztcbiAgICAgICAgICAgIHRoaXMuX3NldFRpbWUodGhpcy5kLmRhdGUpO1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRIVE1MKCk7XG5cbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC90cmlkZW50L2dpKSkge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gJ2NoYW5nZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZC4kZWwub24oJ3NlbGVjdERhdGUnLCB0aGlzLl9vblNlbGVjdERhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRyYW5nZXMub24oaW5wdXQsIHRoaXMuX29uQ2hhbmdlUmFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRyYW5nZXMub24oJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXBSYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJHJhbmdlcy5vbignbW91c2Vtb3ZlIGZvY3VzICcsIHRoaXMuX29uTW91c2VFbnRlclJhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2VzLm9uKCdtb3VzZW91dCBibHVyJywgdGhpcy5fb25Nb3VzZU91dFJhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9zZXRUaW1lOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIF9kYXRlID0gZHAuZ2V0UGFyc2VkRGF0ZShkYXRlKTtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuaG91cnMgPSBfZGF0ZS5ob3VycyA8IHRoaXMubWluSG91cnMgPyB0aGlzLm1pbkhvdXJzIDogX2RhdGUuaG91cnM7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSBfZGF0ZS5taW51dGVzIDwgdGhpcy5taW5NaW51dGVzID8gdGhpcy5taW5NaW51dGVzIDogX2RhdGUubWludXRlcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyBtaW5Ib3VycyBhbmQgbWluTWludXRlcyBmcm9tIGRhdGUgKHVzdWFsbHkgaXQncyBhIG1pbkRhdGUpXG4gICAgICAgICAqIEFsc28gY2hhbmdlcyBtaW5NaW51dGVzIGlmIGN1cnJlbnQgaG91cnMgYXJlIGJpZ2dlciB0aGVuIEBkYXRlIGhvdXJzXG4gICAgICAgICAqIEBwYXJhbSBkYXRlIHtEYXRlfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX3NldE1pblRpbWVGcm9tRGF0ZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMubWluSG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgICAgICB0aGlzLm1pbk1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcblxuICAgICAgICAgICAgLy8gSWYsIGZvciBleGFtcGxlLCBtaW4gaG91cnMgYXJlIDEwLCBhbmQgY3VycmVudCBob3VycyBhcmUgMTIsXG4gICAgICAgICAgICAvLyB1cGRhdGUgbWluTWludXRlcyB0byBkZWZhdWx0IHZhbHVlLCB0byBiZSBhYmxlIHRvIGNob29zZSB3aG9sZSByYW5nZSBvZiB2YWx1ZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZS5nZXRIb3VycygpID4gZGF0ZS5nZXRIb3VycygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluTWludXRlcyA9IHRoaXMub3B0cy5taW5NaW51dGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfc2V0TWF4VGltZUZyb21EYXRlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5tYXhIb3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgIHRoaXMubWF4TWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUuZ2V0SG91cnMoKSA8IGRhdGUuZ2V0SG91cnMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1heE1pbnV0ZXMgPSB0aGlzLm9wdHMubWF4TWludXRlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldERlZmF1bHRNaW5NYXhUaW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWF4SG91cnMgPSAyMyxcbiAgICAgICAgICAgICAgICBtYXhNaW51dGVzID0gNTksXG4gICAgICAgICAgICAgICAgb3B0cyA9IHRoaXMub3B0cztcblxuICAgICAgICAgICAgdGhpcy5taW5Ib3VycyA9IG9wdHMubWluSG91cnMgPCAwIHx8IG9wdHMubWluSG91cnMgPiBtYXhIb3VycyA/IDAgOiBvcHRzLm1pbkhvdXJzO1xuICAgICAgICAgICAgdGhpcy5taW5NaW51dGVzID0gb3B0cy5taW5NaW51dGVzIDwgMCB8fCBvcHRzLm1pbk1pbnV0ZXMgPiBtYXhNaW51dGVzID8gMCA6IG9wdHMubWluTWludXRlcztcbiAgICAgICAgICAgIHRoaXMubWF4SG91cnMgPSBvcHRzLm1heEhvdXJzIDwgMCB8fCBvcHRzLm1heEhvdXJzID4gbWF4SG91cnMgPyBtYXhIb3VycyA6IG9wdHMubWF4SG91cnM7XG4gICAgICAgICAgICB0aGlzLm1heE1pbnV0ZXMgPSBvcHRzLm1heE1pbnV0ZXMgPCAwIHx8IG9wdHMubWF4TWludXRlcyA+IG1heE1pbnV0ZXMgPyBtYXhNaW51dGVzIDogb3B0cy5tYXhNaW51dGVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb29rcyBmb3IgbWluL21heCBob3Vycy9taW51dGVzIGFuZCBpZiBjdXJyZW50IHZhbHVlc1xuICAgICAgICAgKiBhcmUgb3V0IG9mIHJhbmdlIHNldHMgdmFsaWQgdmFsdWVzLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX3ZhbGlkYXRlSG91cnNNaW51dGVzOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG91cnMgPCB0aGlzLm1pbkhvdXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VycyA9IHRoaXMubWluSG91cnM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaG91cnMgPiB0aGlzLm1heEhvdXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VycyA9IHRoaXMubWF4SG91cnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1pbnV0ZXMgPCB0aGlzLm1pbk1pbnV0ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLm1pbk1pbnV0ZXM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWludXRlcyA+IHRoaXMubWF4TWludXRlcykge1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMubWF4TWludXRlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfYnVpbGRIVE1MOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbHogPSBkcC5nZXRMZWFkaW5nWmVyb051bSxcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBob3VyTWluOiB0aGlzLm1pbkhvdXJzLFxuICAgICAgICAgICAgICAgICAgICBob3VyTWF4OiBseih0aGlzLm1heEhvdXJzKSxcbiAgICAgICAgICAgICAgICAgICAgaG91clN0ZXA6IHRoaXMub3B0cy5ob3Vyc1N0ZXAsXG4gICAgICAgICAgICAgICAgICAgIGhvdXJWYWx1ZTogdGhpcy5ob3VycyxcbiAgICAgICAgICAgICAgICAgICAgaG91clZpc2libGU6IGx6KHRoaXMuZGlzcGxheUhvdXJzKSxcbiAgICAgICAgICAgICAgICAgICAgbWluTWluOiB0aGlzLm1pbk1pbnV0ZXMsXG4gICAgICAgICAgICAgICAgICAgIG1pbk1heDogbHoodGhpcy5tYXhNaW51dGVzKSxcbiAgICAgICAgICAgICAgICAgICAgbWluU3RlcDogdGhpcy5vcHRzLm1pbnV0ZXNTdGVwLFxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogbHoodGhpcy5taW51dGVzKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX3RlbXBsYXRlID0gZHAudGVtcGxhdGUodGVtcGxhdGUsIGRhdGEpO1xuXG4gICAgICAgICAgICB0aGlzLiR0aW1lcGlja2VyID0gJChfdGVtcGxhdGUpLmFwcGVuZFRvKHRoaXMuZC4kZGF0ZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRyYW5nZXMgPSAkKCdbdHlwZT1cInJhbmdlXCJdJywgdGhpcy4kdGltZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRob3VycyA9ICQoJ1tuYW1lPVwiaG91cnNcIl0nLCB0aGlzLiR0aW1lcGlja2VyKTtcbiAgICAgICAgICAgIHRoaXMuJG1pbnV0ZXMgPSAkKCdbbmFtZT1cIm1pbnV0ZXNcIl0nLCB0aGlzLiR0aW1lcGlja2VyKTtcbiAgICAgICAgICAgIHRoaXMuJGhvdXJzVGV4dCA9ICQoJy5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtaG91cnMnLCB0aGlzLiR0aW1lcGlja2VyKTtcbiAgICAgICAgICAgIHRoaXMuJG1pbnV0ZXNUZXh0ID0gJCgnLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1taW51dGVzJywgdGhpcy4kdGltZXBpY2tlcik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmQuYW1wbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGFtcG0gPSAkKCc8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1hbXBtXCI+JylcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQoJy5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQnLCB0aGlzLiR0aW1lcGlja2VyKSlcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwodGhpcy5kYXlQZXJpb2QpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZXBpY2tlci5hZGRDbGFzcygnLWFtLXBtLScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF91cGRhdGVDdXJyZW50VGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGggPSAgZHAuZ2V0TGVhZGluZ1plcm9OdW0odGhpcy5kaXNwbGF5SG91cnMpLFxuICAgICAgICAgICAgICAgIG0gPSBkcC5nZXRMZWFkaW5nWmVyb051bSh0aGlzLm1pbnV0ZXMpO1xuXG4gICAgICAgICAgICB0aGlzLiRob3Vyc1RleHQuaHRtbChoKTtcbiAgICAgICAgICAgIHRoaXMuJG1pbnV0ZXNUZXh0Lmh0bWwobSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmQuYW1wbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGFtcG0uaHRtbCh0aGlzLmRheVBlcmlvZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3VwZGF0ZVJhbmdlczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kaG91cnMuYXR0cih7XG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pbkhvdXJzLFxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhIb3Vyc1xuICAgICAgICAgICAgfSkudmFsKHRoaXMuaG91cnMpO1xuXG4gICAgICAgICAgICB0aGlzLiRtaW51dGVzLmF0dHIoe1xuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5NaW51dGVzLFxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhNaW51dGVzXG4gICAgICAgICAgICB9KS52YWwodGhpcy5taW51dGVzKVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIG1pbkhvdXJzLCBtaW5NaW51dGVzIGV0Yy4gZnJvbSBkYXRlLiBJZiBkYXRlIGlzIG5vdCBwYXNzZWQsIHRoYW4gc2V0c1xuICAgICAgICAgKiB2YWx1ZXMgZnJvbSBvcHRpb25zXG4gICAgICAgICAqIEBwYXJhbSBbZGF0ZV0ge29iamVjdH0gLSBEYXRlIG9iamVjdCwgdG8gZ2V0IHZhbHVlcyBmcm9tXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfaGFuZGxlRGF0ZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldERlZmF1bHRNaW5NYXhUaW1lKCk7XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkcC5pc1NhbWUoZGF0ZSwgdGhpcy5kLm9wdHMubWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0TWluVGltZUZyb21EYXRlKHRoaXMuZC5vcHRzLm1pbkRhdGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZHAuaXNTYW1lKGRhdGUsIHRoaXMuZC5vcHRzLm1heERhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldE1heFRpbWVGcm9tRGF0ZSh0aGlzLmQub3B0cy5tYXhEYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlSG91cnNNaW51dGVzKGRhdGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDdXJyZW50VGltZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWxjdWxhdGVzIHZhbGlkIGhvdXIgdmFsdWUgdG8gZGlzcGxheSBpbiB0ZXh0IGlucHV0IGFuZCBkYXRlcGlja2VyJ3MgYm9keS5cbiAgICAgICAgICogQHBhcmFtIGRhdGUge0RhdGV8TnVtYmVyfSAtIGRhdGUgb3IgaG91cnNcbiAgICAgICAgICogQHBhcmFtIFthbXBtXSB7Qm9vbGVhbn0gLSAxMiBob3VycyBtb2RlXG4gICAgICAgICAqIEByZXR1cm5zIHt7aG91cnM6ICosIGRheVBlcmlvZDogc3RyaW5nfX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9nZXRWYWxpZEhvdXJzRnJvbURhdGU6IGZ1bmN0aW9uIChkYXRlLCBhbXBtKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGRhdGUsXG4gICAgICAgICAgICAgICAgaG91cnMgPSBkYXRlO1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBkID0gZHAuZ2V0UGFyc2VkRGF0ZShkYXRlKTtcbiAgICAgICAgICAgICAgICBob3VycyA9IGQuaG91cnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBfYW1wbSA9IGFtcG0gfHwgdGhpcy5kLmFtcG0sXG4gICAgICAgICAgICAgICAgZGF5UGVyaW9kID0gJ2FtJztcblxuICAgICAgICAgICAgaWYgKF9hbXBtKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBob3VycyA9PSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaG91cnMgPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGhvdXJzID09IDEyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5UGVyaW9kID0gJ3BtJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGhvdXJzID4gMTE6XG4gICAgICAgICAgICAgICAgICAgICAgICBob3VycyA9IGhvdXJzIC0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlQZXJpb2QgPSAncG0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaG91cnM6IGhvdXJzLFxuICAgICAgICAgICAgICAgIGRheVBlcmlvZDogZGF5UGVyaW9kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGhvdXJzICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2hvdXJzID0gdmFsO1xuXG4gICAgICAgICAgICB2YXIgZGlzcGxheUhvdXJzID0gdGhpcy5fZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlKHZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUhvdXJzID0gZGlzcGxheUhvdXJzLmhvdXJzO1xuICAgICAgICAgICAgdGhpcy5kYXlQZXJpb2QgPSBkaXNwbGF5SG91cnMuZGF5UGVyaW9kO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBob3VycygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ob3VycztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyAgRXZlbnRzXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICBfb25DaGFuZ2VSYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChlLnRhcmdldCksXG4gICAgICAgICAgICAgICAgbmFtZSA9ICR0YXJnZXQuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmQudGltZXBpY2tlcklzQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpc1tuYW1lXSA9ICR0YXJnZXQudmFsKCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDdXJyZW50VGltZSgpO1xuICAgICAgICAgICAgdGhpcy5kLl90cmlnZ2VyKCd0aW1lQ2hhbmdlJywgW3RoaXMuaG91cnMsIHRoaXMubWludXRlc10pO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEYXRlKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKClcbiAgICAgICAgfSxcblxuICAgICAgICBfb25TZWxlY3REYXRlOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlRGF0ZShkYXRhKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VFbnRlclJhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSAkKGUudGFyZ2V0KS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAkKCcuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LScgKyBuYW1lLCB0aGlzLiR0aW1lcGlja2VyKS5hZGRDbGFzcygnLWZvY3VzLScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlT3V0UmFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICQoZS50YXJnZXQpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmQuaW5Gb2N1cykgcmV0dXJuOyAvLyBQcmV2ZW50IHJlbW92aW5nIGZvY3VzIHdoZW4gbW91c2Ugb3V0IG9mIHJhbmdlIHNsaWRlclxuICAgICAgICAgICAgJCgnLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC0nICsgbmFtZSwgdGhpcy4kdGltZXBpY2tlcikucmVtb3ZlQ2xhc3MoJy1mb2N1cy0nKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZVVwUmFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLmQudGltZXBpY2tlcklzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiB9KSh3aW5kb3csIGpRdWVyeSk7IiwibGV0IGNvbWluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbWluZy1idXR0b24nKTtcclxubGV0IHN0YXJ0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbWluZ19pbnB1dCcpO1xyXG5sZXQgZGVwYXJ0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tZGVwYXJ0dXJlLWJ1dHRvbicpO1xyXG5sZXQgZW5kRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRlcGFydHVyZV9pbnB1dCcpO1xyXG5sZXQgZGF0ZXBpY2tlckJsb2NrID0gYDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWhlcmVcIiBkYXRhLXBvc2l0aW9uPVwicmlnaHQgdG9wXCJzPjwvZGl2PmA7XHJcblxyXG5sZXQgaW5zZXJ0Q2FsZW5kYXIgPSBgPHNlY3Rpb24gY2xhc3M9XCJjYWxlbmRhciBjYWxlbmRhcl9wcm9wc1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQke2RhdGVwaWNrZXJCbG9ja31cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhbGVuZGFyLWJvdHRvbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJidXR0b24tY2xlYXIgY2FsZW5kYXJfYnV0dG9uIFwiPtC+0YfQuNGB0YLQuNGC0Yw8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYnV0dG9uLWFwcGx5IGNhbGVuZGFyX2J1dHRvblwiPtC/0YDQuNC80LXQvdC40YLRjDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5gO1xyXG4vL2xldCBtZHlDYWxlbmRhciA9ICcnO1xyXG5cclxuY29uc29sZS5sb2coY29taW5nKTtcclxuY29uc29sZS5sb2coZGVwYXJ0dXJlKTtcclxuY29uc29sZS5sb2coZGF0ZXBpY2tlckJsb2NrKTtcclxuY29uc29sZS5sb2coaW5zZXJ0Q2FsZW5kYXIpO1xyXG5cclxuXHJcblxyXG5jb21pbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRjb25zb2xlLmxvZygn0L3QsNC20LDRgtCwINC60L3QvtC/0LrQsCDQn9Cg0JjQkdCr0KLQmNCVJyk7XHJcblx0bGV0IGJ1dHRvbkNhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tY29taW5nJyk7XHJcblx0bGV0IGJ0bkZvcm0gPSAnLmZvcm0tY29taW5nX2lucHV0JztcclxuXHRjYWxlbmRhck91dHB1dChidXR0b25DYWxlbmRhciwgYnRuRm9ybSk7ICAgICAgICAgICAgICAgICAgIC8v0LLRi9Cy0L7QtCDQutCw0LvQtdC90LTQsNGA0Y9cclxuXHJcblx0YnRuQ2FsZW5kYXJSZXN1bHQoKTsgICAgICAgICAgICAgICAgLy/QutC90L7Qv9C60Lgg0LIg0LrQsNC70LXQvdC00LDRgNC1XHJcbn0pO1xyXG5cclxuZGVwYXJ0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0Y29uc29sZS5sb2coJ9C90LDQttCw0YLQsCDQutC90L7Qv9C60LAg0JLQq9CV0JfQlCcpO1xyXG5cdGxldCBidXR0b25DYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWRlcGFydHVyZScpO1xyXG5cdGxldCBidG5Gb3JtID0gJy5mb3JtLWRlcGFydHVyZV9pbnB1dCc7XHJcblx0Y2FsZW5kYXJPdXRwdXQoYnV0dG9uQ2FsZW5kYXIsIGJ0bkZvcm0pO1xyXG5cclxuXHRidG5DYWxlbmRhclJlc3VsdCgpO1xyXG59KTtcclxuXHJcbi8v0YTRg9C90LrRhtC40Y8g0LLRi9Cy0L7QtNCwINGA0LXQt9GD0LvRjNGC0LDRgtC+0LIg0LLRi9Cx0L7RgNCwINC00LDQvdC90YvRhVxyXG5mdW5jdGlvbiBidG5DYWxlbmRhclJlc3VsdCgpIHtcclxuXHRsZXQgYnRuQ2FsZW5kYXJDbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tY2xlYXInKTtcclxuXHRsZXQgYnRuQ2FsZW5kYXJBcHBseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tYXBwbHknKTtcclxuXHRcclxuXHRidG5DYWxlbmRhckFwcGx5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ9Cd0LDQttCw0YLQsCDQutC90L7Qv9C60LAg0J/QoNCY0JzQldCd0JjQotCsJyk7XHJcblxyXG5cdFx0Y2FsZW5kYXJEZWxldGUoKTtcclxuXHR9KTtcclxuXHRidG5DYWxlbmRhckNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ9Cd0LDQttCw0YLQsCDQutC90L7Qv9C60LAg0J7Qp9CY0KHQotCY0KLQrCcpO1xyXG5cdFx0c3RhcnREYXRlLnZhbHVlID0gJ9CU0JQu0JzQnC7Qk9CT0JPQkyc7XHJcblx0XHRlbmREYXRlLnZhbHVlID0gJ9CU0JQu0JzQnC7Qk9CT0JPQkyc7XHJcblx0XHRjYWxlbmRhckRlbGV0ZSgpO1xyXG5cdH0pXHJcbn1cclxuLy/RhNGD0L3QutGG0LjRjyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40Y8g0LrQsNC70LXQvdC00LDRgNGPXHJcbmZ1bmN0aW9uIGNhbGVuZGFyT3V0cHV0KGJ0bkNsaWNrLCBidG5JbnB1dCkge1xyXG5cdGNvbnNvbGUubG9nKGJ0bkNsaWNrKTtcclxuXHRsZXQgYmxvY2tDYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcicpO1xyXG5cdGlmIChibG9ja0NhbGVuZGFyICE9IG51bGwpIHtcclxuXHRcdGNvbnNvbGUubG9nKCfQt9C90LDRh9C10L3QuNC1IGJsb2NrQ2FsZW5kYXIgJyArIGJsb2NrQ2FsZW5kYXIpO1xyXG5cdFx0Y2FsZW5kYXJEZWxldGUoKTtcclxuXHRcdGRhdGVwaWNrZXJDcmVhdGUoYnRuSW5wdXQpO1xyXG5cdFx0YnRuQ2xpY2suaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVFbmQnLCBpbnNlcnRDYWxlbmRhcik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGRhdGVwaWNrZXJDcmVhdGUoYnRuSW5wdXQpO1xyXG5cdFx0YnRuQ2xpY2suaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVFbmQnLCBpbnNlcnRDYWxlbmRhcik7XHJcblx0fVxyXG5cclxufVxyXG4vL9GE0YPQvdC60YbQuNGPINGD0LTQsNC70LXQvdC40Y8g0LrQsNC70LXQvdC00LDRgNGPXHJcbmZ1bmN0aW9uIGNhbGVuZGFyRGVsZXRlKCkge1xyXG5cdGxldCBibG9ja0NhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyJyk7XHJcblx0Ly9ibG9ja0NhbGVuZGFyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0YmxvY2tDYWxlbmRhci5yZW1vdmUoKTtcclxufVxyXG4vL9GE0YPQvdC60YbQuNGPINCy0YvQt9C+0LLQsCDQtNCw0YLQsNC/0LjQutC10YDQsFxyXG5mdW5jdGlvbiBkYXRlcGlja2VyQ3JlYXRlKGJ0bkZvcm0pIHtcclxuXHQvL2xldCBidG5Gb3JtID0gZFxyXG5cdGNvbnNvbGUubG9nKCdidG5Gb3JtIC0gJyArIGJ0bkZvcm0pO1xyXG5cclxuXHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJy5kYXRlcGlja2VyLWhlcmUnKS5kYXRlcGlja2VyKCB7XHJcblx0XHRcdC8vYWx0RmllbGQ6IGJ0bkZvcm0sICAgICAgICAgICAgICAgICAgIC8v0LLRi9Cz0YDRg9C30LrQsCDQsiDQv9C+0LvQtSBidG5Gb3JtXHJcblx0XHRcdC8vYWx0RmllbGREYXRlRm9ybWF0OiAnZGQubW0ueXl5eScsICAgIC8v0YTQvtGA0LzQsNGCINC00LDRgtGLINCy0YvQs9GA0YPQt9C60LhcclxuXHRcdFx0cmFuZ2U6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC00LjQsNC/0LDQt9C+0L0g0LTQsNGCINCy0LrQu9GO0YfQtdC9XHJcblx0XHRcdHRvZ2dsZVNlbGVjdGVkOiBmYWxzZSwgICAgICAgICAgICAgICAvLyDRgNCw0LfRgNC10YjQuNGC0Ywg0LLRi9Cx0L7RgCAx0Lkg0LTQsNGC0YtcclxuXHRcdFx0bXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJyAtICcsICAgICAgIC8vINGA0LDQt9C00LXQu9C40YLQtdC70Ywg0LTQuNCw0L/QsNC30L7QvdCwINC00LDRglxyXG5cdFx0XHRtaW5EYXRlOiBuZXcgRGF0ZSgpLCAgICAgICAgICAgICAgICAgIC8vINC30LDQv9GA0LXRgtC40YLRjCDQstGL0LHQvtGAINC90LjQttC1INGC0LXQutGD0YnQtdC5INC00LDRgtGLXHJcblx0XHRcdG9uU2VsZWN0OiBmdW5jdGlvbiBvblNlbGVjdChzZWxlY3RlZERhdGVzKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coc2VsZWN0ZWREYXRlcyk7XHJcblx0XHRcdFx0aWYoc2VsZWN0ZWREYXRlcyAhPT0gdW5kZWZpbmVkICYmIHNlbGVjdGVkRGF0ZXMgIT0gJycgJiYgc2VsZWN0ZWREYXRlcy5pbmRleE9mKCctJykgPiAtMSl7XHJcblx0XHRcdFx0XHRtZHlDYWxlbmRhciA9IHNlbGVjdGVkRGF0ZXMuc3BsaXQoJy0gJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnbWR5Q2FsZW5kYXIgLSAnICsgbWR5Q2FsZW5kYXIpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cobWR5Q2FsZW5kYXIpO1xyXG5cdFx0XHRcdFx0bGV0IG1keVN0YXJ0ID0gKG1keUNhbGVuZGFyWzBdKTtcclxuXHRcdFx0XHRcdGxldCBtZHlFbmQgPSAobWR5Q2FsZW5kYXJbMV0pO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cobWR5U3RhcnQpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cobWR5RW5kKTtcclxuXHRcdFx0XHRcdHN0YXJ0RGF0ZS52YWx1ZSA9IG1keVN0YXJ0O1xyXG5cdFx0XHRcdFx0ZW5kRGF0ZS52YWx1ZSA9IG1keUVuZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly9yZXR1cm4gbWR5Q2FsZW5kYXI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Ly8kKCcuZGF0ZXBpY2tlci1oZXJlJykuZGF0YSgnZGF0ZXBpY2tlcicpO1xyXG5cdH0pO1xyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0t0L7Qv9GA0LXQtNC10LvRj9C10Lwg0YDQvtC00LjRgtC10LvRjyDQtNC70Y8g0LLRgdGC0LDQstC60Lgg0LHQu9C+0LrQsFxyXG4vL2xldCBlbGVtZW50Q2xpY2sgPSBjb21pbmc7XHJcblxyXG4vL2VsZW1lbnRDbGljay5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4vL1x0bGV0IGVsZW1lbnRUYXJnZXQgPSBldmVudC50YXJnZXQ7ICAgICAgLy/QutC90L7Qv9C60LBcclxuLy9cdGNvbnNvbGUubG9nKGVsZW1lbnRUYXJnZXQpO1xyXG4vL1x0bGV0IHBhcmVudEVsZW1lbnRUYXJnZXQgPSBlbGVtZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQ7ICAgICAgIC8v0YTQvtGA0LzQsCDQt9Cw0L/RgNC+0YHQsFxyXG4vL1x0Y29uc29sZS5sb2cocGFyZW50RWxlbWVudFRhcmdldCk7XHJcbi8vXHRsZXQgdGFibGVUYXJnZXRQYXJlbnQgPSBwYXJlbnRFbGVtZW50VGFyZ2V0LmNoaWxkcmVuOyAgICAgICAgLy8g0LLRgdGPINGE0L7RgNC80LBcclxuLy9cdGNvbnNvbGUubG9nKHRhYmxlVGFyZ2V0UGFyZW50KTtcclxuLy9cdC8vdGV4dFdyaXRlLnRleHRDb250ZW50ID0gdGFibGVUYXJnZXRQYXJlbnRbMl0udGV4dENvbnRlbnQ7XHJcbi8vXHRjb25zb2xlLmxvZyh0YWJsZVRhcmdldFBhcmVudCk7XHJcbi8vfTtcclxuXHJcblxyXG4vLzxzZWN0aW9uIGNsYXNzTmFtZT1cImNhbGVuZGFyXCI+XHJcbi8vXHQ8ZGl2IGNsYXNzTmFtZT1cImRhdGVwaWNrZXItaGVyZVwiIGRhdGEtcG9zaXRpb249XCJyaWdodCB0b3BcIiBkYXRhLXJhbmdlPVwidHJ1ZVwiXHJcbi8vXHRcdFx0IGRhdGEtbXVsdGlwbGUtZGF0ZXMtc2VwYXJhdG9yPVwiIC0gXCI+PC9kaXY+XHJcbi8vXHQ8ZGl2IGNsYXNzTmFtZT1cImNhbGVuZGFyLWJvdHRvbVwiPlxyXG4vL1x0XHQ8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jbGVhciBjYWxlbmRhcl9idXR0b24gXCI+0L7Rh9C40YHRgtC40YLRjDwvZGl2PlxyXG4vL1x0XHQ8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1hcHBseSBjYWxlbmRhcl9idXR0b25cIj7Qv9GA0LjQvNC10L3QuNGC0Yw8L2Rpdj5cclxuLy9cdDwvZGl2PlxyXG4vLzwvc2VjdGlvbj4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70galF1ZXJ5IO+/vSDvv73vv73vv73vv73vv73vv70sIO+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+9IGh0bWxcclxuLy9pbXBvcnQgJCBmcm9tICdqcXVlcnknOyAgICAgICAgLy/vv73vv73vv73vv73vv70g77+977+9IG5vZGVtb2R1bGVzXHJcbi8vaW1wb3J0ICogYXMgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuLy9nbG9iYWwualF1ZXJ5ID0gJDtcclxuLy9nbG9iYWwuJCA9ICQ7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG4vLy0tLS0tLS3vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9LS0tLS0tLS0tLS0tLS0tLS8vXHJcbi8vLS0tLS0tLe+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbmltcG9ydCAnLi9jc3MvZm9udC5jc3MnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv71cclxuLy8tLS0tLS0t77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/vS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbmltcG9ydCAnLi9tb2R1bGVzL2xvZ28vbG9nby5jc3MnOyAgICAgICAgICAgICAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b24uY3NzJzsgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b25hcnJvdy5jc3MnOy8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvY2tsaWtidXR0b24vY2tsaWtidXR0b253aXRlLmNzcyc7IC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvbWFpbnRleHQvbWFpbnRleHQuY3NzJzsgICAgICAgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvdGV4dGZpZWxkL3RleHRmaWVsZC5jc3MnOyAgICAgICAgIC8v77+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9yYWRpb2J1dHRvbi9yYWRpb2J1dHRvbi5jc3MnOyAgICAgLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL21hc2tlZGZpZWxkL21hc2tlZGZpZWxkLmNzcyc7ICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+9IO+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy90b2dnbGVidXR0b24vdG9nZ2xlYnV0dG9uLmNzcyc7ICAgLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+9L++/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9kYXRlZHJvcC9kYXRlZHJvcC5jc3MnOyAgICAgICAgICAgLy/vv73vv73vv73vv70g77+977+977+977+977+9IO+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9kcm9wZG93bi9kcm9wZG93bi5jc3MnOyAgICAgICAgICAgLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9XHJcblxyXG4vLy0tLS0tLWNzcyDvv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9LS0tLS0tLS0tLS0tLS0tLS8vXHJcbmltcG9ydCAnLi9jc3Mvc3R5bGUuY3NzJzsgICAgICAgICAgICAgICAgICAgICAgICAgICAvL++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9IO+/ve+/vSDvv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv70g77+977+977+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9ibG9jay9oZWFkZXIvaGVhZGVyLXN0eWxlLmNzcyc7ICAgICAgICAgLy/vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vYmxvY2svbWVudXRvcC9tZW51dG9wLmNzcyc7ICAgICAgICAgICAgIC8v77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL3NlYXJjaGZvcm0vc2VhcmNoZm9ybS5jc3MnOyAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9ibG9jay9mb290ZXIvZm9vdGVyc3R5bGUuY3NzJzsgICAgICAgICAgLy/vv73vv73vv73vv73vv70g77+977+977+977+977+9IO+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9tZW51L2Zvb3Rlcm1lbnUuY3NzJzsgICAgICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9zdWJzY3JpYmUvc3Vic2NyaWJlLmNzcyc7ICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9jb21wYW55L2FkdmVydC5jc3MnOyAgICAgICAvL++/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv70g77+977+977+977+9XHJcbmltcG9ydCAnLi9ibG9jay9mb290ZXIvY29tcGFueS9jb21wYW55LmNzcyc7ICAgICAgLy/vv73vv73vv73vv70g77+977+977+977+9IO+/vSDvv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9jb3B5cml0ZS9jb3B5cml0ZS5jc3MnOyAgICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL2Zvb3Rlci9zb2NpYWwvc29jaWFsLmNzcyc7ICAgICAgICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uY3NzJzsgICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL2Jsb2NrL2NhbGVuZGFyL2NhbGVuZGFyLmNzcyc7ICAgICAgICAgICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+977+9XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbi8v77+977+977+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv71cclxuLy9pbXBvcnQgJy4vZm9ybWVsZW1lbnQuaHRtbCc7XHJcbi8vaW1wb3J0IGh0bWwgZnJvbSAncmVnaXN0cmF0aW9uLmh0bWwnO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbi8v77+977+977+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG4vL3NpbXBvcnQgJy4vYmxvY2svY2FsZW5kYXIvY2FsZW5kYXIuanMnO1xyXG5pbXBvcnQgJy4vYmxvY2svc2VhcmNoZm9ybS9zZWFyY2hmb3JtLmpzJ1xyXG4vL2ltcG9ydCBidG5Db3VudCBmcm9tICcuL2J1dHRvbi5qcyc7XHJcbi8vaW1wb3J0IGJ0bnJlZ2lzcmF0aW9uIGZyb20gJy4vbW9kdWxlcy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmpzJzsgICAgICAgICAvL++/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4vL++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSBkYXRlcGlja2VyXHJcbmltcG9ydCAnLi9ibG9jay9kYXRlcGlja2VyL2RhdGVwaWNrZXIuY3NzJztcclxuLy9pbXBvcnQgJy4vYmxvY2svZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1pbi5jc3MnO1xyXG4vL2ltcG9ydCAnLi9ibG9jay9kYXRlcGlja2VyL2RhdGVwaWNrZXIubWluLmpzJztcclxuaW1wb3J0ICcuL2Jsb2NrL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5qcyc7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbi8vaW1wb3J0IFwiLi9qcXVlcnktMy40LjEubWluLmpzXCI7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0t77+977+977+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vS0tLS0tLS0tLS0tLS0tLVxyXG4vL2ltcG9ydCBJY29uIGZyb20gJy4vaWNvbi5wbmcnO1xyXG4iXSwibmFtZXMiOlsid2luZG93IiwiJCIsInVuZGVmaW5lZCIsIlZFUlNJT04iLCJwbHVnaW5OYW1lIiwiYXV0b0luaXRTZWxlY3RvciIsIiRib2R5IiwiJGRhdGVwaWNrZXJzQ29udGFpbmVyIiwiY29udGFpbmVyQnVpbHQiLCJiYXNlVGVtcGxhdGUiLCJkZWZhdWx0cyIsImNsYXNzZXMiLCJpbmxpbmUiLCJsYW5ndWFnZSIsInN0YXJ0RGF0ZSIsIkRhdGUiLCJmaXJzdERheSIsIndlZWtlbmRzIiwiZGF0ZUZvcm1hdCIsImFsdEZpZWxkIiwiYWx0RmllbGREYXRlRm9ybWF0IiwidG9nZ2xlU2VsZWN0ZWQiLCJrZXlib2FyZE5hdiIsInBvc2l0aW9uIiwib2Zmc2V0IiwidmlldyIsIm1pblZpZXciLCJzaG93T3RoZXJNb250aHMiLCJzZWxlY3RPdGhlck1vbnRocyIsIm1vdmVUb090aGVyTW9udGhzT25TZWxlY3QiLCJzaG93T3RoZXJZZWFycyIsInNlbGVjdE90aGVyWWVhcnMiLCJtb3ZlVG9PdGhlclllYXJzT25TZWxlY3QiLCJtaW5EYXRlIiwibWF4RGF0ZSIsImRpc2FibGVOYXZXaGVuT3V0T2ZSYW5nZSIsIm11bHRpcGxlRGF0ZXMiLCJtdWx0aXBsZURhdGVzU2VwYXJhdG9yIiwicmFuZ2UiLCJ0b2RheUJ1dHRvbiIsImNsZWFyQnV0dG9uIiwic2hvd0V2ZW50IiwiYXV0b0Nsb3NlIiwibW9udGhzRmllbGQiLCJwcmV2SHRtbCIsIm5leHRIdG1sIiwibmF2VGl0bGVzIiwiZGF5cyIsIm1vbnRocyIsInllYXJzIiwidGltZXBpY2tlciIsIm9ubHlUaW1lcGlja2VyIiwiZGF0ZVRpbWVTZXBhcmF0b3IiLCJ0aW1lRm9ybWF0IiwibWluSG91cnMiLCJtYXhIb3VycyIsIm1pbk1pbnV0ZXMiLCJtYXhNaW51dGVzIiwiaG91cnNTdGVwIiwibWludXRlc1N0ZXAiLCJvblNlbGVjdCIsIm9uU2hvdyIsIm9uSGlkZSIsIm9uQ2hhbmdlTW9udGgiLCJvbkNoYW5nZVllYXIiLCJvbkNoYW5nZURlY2FkZSIsIm9uQ2hhbmdlVmlldyIsIm9uUmVuZGVyQ2VsbCIsImhvdEtleXMiLCJkYXRlcGlja2VyIiwiRGF0ZXBpY2tlciIsImVsIiwib3B0aW9ucyIsIiRlbCIsIm9wdHMiLCJleHRlbmQiLCJkYXRhIiwibm9kZU5hbWUiLCJlbElzSW5wdXQiLCIkYWx0RmllbGQiLCJpbml0ZWQiLCJ2aXNpYmxlIiwic2lsZW50IiwiY3VycmVudERhdGUiLCJjdXJyZW50VmlldyIsIl9jcmVhdGVTaG9ydEN1dHMiLCJzZWxlY3RlZERhdGVzIiwidmlld3MiLCJrZXlzIiwibWluUmFuZ2UiLCJtYXhSYW5nZSIsIl9wcmV2T25TZWxlY3RWYWx1ZSIsImluaXQiLCJwcm90b3R5cGUiLCJ2aWV3SW5kZXhlcyIsIl9idWlsZERhdGVwaWNrZXJzQ29udGFpbmVyIiwiX2J1aWxkQmFzZUh0bWwiLCJfZGVmaW5lTG9jYWxlIiwiX3N5bmNXaXRoTWluTWF4RGF0ZXMiLCJfc2V0UG9zaXRpb25DbGFzc2VzIiwiX2JpbmRFdmVudHMiLCJfYmluZEtleWJvYXJkRXZlbnRzIiwiJGRhdGVwaWNrZXIiLCJvbiIsIl9vbk1vdXNlRG93bkRhdGVwaWNrZXIiLCJiaW5kIiwiX29uTW91c2VVcERhdGVwaWNrZXIiLCJhZGRDbGFzcyIsImZuIiwiVGltZXBpY2tlciIsIl9iaW5kVGltZXBpY2tlckV2ZW50cyIsIkJvZHkiLCJzaG93IiwibmF2IiwiTmF2aWdhdGlvbiIsIl9vbkNsaWNrQ2VsbCIsIl9vbk1vdXNlRW50ZXJDZWxsIiwiX29uTW91c2VMZWF2ZUNlbGwiLCJfb25TaG93RXZlbnQiLCJfb25Nb3VzZVVwRWwiLCJfb25CbHVyIiwiX29uS2V5VXBHZW5lcmFsIiwiX29uUmVzaXplIiwiX29uTW91c2VVcEJvZHkiLCJfb25LZXlEb3duIiwiX29uS2V5VXAiLCJfb25Ib3RLZXkiLCJfb25UaW1lQ2hhbmdlIiwiaXNXZWVrZW5kIiwiZGF5IiwiaW5kZXhPZiIsImxhbmciLCJsb2MiLCJjb25zb2xlIiwid2FybiIsInJ1Iiwiam9pbiIsImJvdW5kYXJ5IiwiX2dldFdvcmRCb3VuZGFyeVJlZ0V4cCIsIm1hdGNoIiwiYW1wbSIsImFwcGVuZCIsIiRhcHBlbmRUYXJnZXQiLCIkaW5saW5lIiwiaW5zZXJ0QWZ0ZXIiLCJhcHBlbmRUbyIsIiRjb250ZW50IiwiJG5hdiIsIl90cmlnZ2VyT25DaGFuZ2UiLCJsZW5ndGgiLCJwYXJzZWRTZWxlY3RlZCIsImdldFBhcnNlZERhdGUiLCJmb3JtYXR0ZWREYXRlcyIsIl90aGlzIiwiZGF0ZXMiLCJ5ZWFyIiwibW9udGgiLCJkYXRlIiwiaG91cnMiLCJtaW51dGVzIiwibWFwIiwiZm9ybWF0RGF0ZSIsInBhcnNlZERhdGUiLCJuZXh0IiwiZCIsIm8iLCJjdXJEZWNhZGUiLCJwcmV2Iiwic3RyaW5nIiwicmVzdWx0IiwibG9jYWxlIiwibGVhZGluZ1plcm8iLCJnZXRMZWFkaW5nWmVyb051bSIsImRlY2FkZSIsImdldERlY2FkZSIsImZ1bGxIb3VycyIsImRheVBlcmlvZCIsInJlcGxhY2VyIiwiX3JlcGxhY2VyIiwidmFsaWRIb3VycyIsIl9nZXRWYWxpZEhvdXJzRnJvbURhdGUiLCJ0ZXN0IiwicmVwbGFjZSIsImdldFRpbWUiLCJ0b1VwcGVyQ2FzZSIsImZ1bGxEYXRlIiwiZGF5c1Nob3J0IiwiZnVsbE1vbnRoIiwibW9udGhzU2hvcnQiLCJmdWxsTWludXRlcyIsInRvU3RyaW5nIiwic2xpY2UiLCJzdHIiLCJyZWciLCJwMSIsInAyIiwicDMiLCJzaWduIiwic3ltYm9scyIsIlJlZ0V4cCIsInNlbGVjdERhdGUiLCJsZW4iLCJuZXdEYXRlIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsImxhc3RTZWxlY3RlZERhdGUiLCJfc2V0VGltZSIsIl90cmlnZ2VyIiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsIl9yZW5kZXIiLCJfaXNTZWxlY3RlZCIsInB1c2giLCJiaWdnZXIiLCJfc2V0SW5wdXRWYWx1ZSIsInRpbWVwaWNrZXJJc0FjdGl2ZSIsImhpZGUiLCJyZW1vdmVEYXRlIiwic2VsZWN0ZWQiLCJzb21lIiwiY3VyRGF0ZSIsImkiLCJpc1NhbWUiLCJzcGxpY2UiLCJ0b2RheSIsImNsZWFyIiwidXBkYXRlIiwicGFyYW0iLCJ2YWx1ZSIsImFyZ3VtZW50cyIsIl9hZGRCdXR0b25zSWZOZWVkIiwic2V0UG9zaXRpb24iLCJfaGFuZGxlRGF0ZSIsIl91cGRhdGVSYW5nZXMiLCJfdXBkYXRlQ3VycmVudFRpbWUiLCJjdXJUaW1lIiwibWluVGltZSIsIm1heFRpbWUiLCJjaGVja0RhdGUiLCJjZWxsVHlwZSIsInJlcyIsImZvcm1hdCIsImFsdEZvcm1hdCIsImFsdFZhbHVlcyIsInZhbCIsIl9pc0luUmFuZ2UiLCJ0eXBlIiwidGltZSIsIm1pbiIsIm1heCIsImRNaW5UaW1lIiwiZE1heFRpbWUiLCJ0eXBlcyIsIl9nZXREaW1lbnNpb25zIiwid2lkdGgiLCJvdXRlcldpZHRoIiwiaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJsZWZ0IiwidG9wIiwiX2dldERhdGVGcm9tQ2VsbCIsImNlbGwiLCJwb3MiLCJzcGxpdCIsIm1haW4iLCJzZWMiLCJyZW1vdmVBdHRyIiwiZGltcyIsInNlbGZEaW1zIiwic2Vjb25kYXJ5IiwiY3NzIiwiX2JpbmRWaXNpb25FdmVudHMiLCJyZW1vdmVDbGFzcyIsImZvY3VzZWQiLCJpbkZvY3VzIiwiYmx1ciIsImRvd24iLCJfY2hhbmdlVmlldyIsInVwIiwiZXZlbnQiLCJvZmYiLCJvbmUiLCJkaXIiLCJuZXh0VmlldyIsInZpZXdJbmRleCIsIl9oYW5kbGVIb3RLZXkiLCJrZXkiLCJfZ2V0Rm9jdXNlZERhdGUiLCJmb2N1c2VkUGFyc2VkIiwidG90YWxEYXlzSW5OZXh0TW9udGgiLCJtb250aENoYW5nZWQiLCJ5ZWFyQ2hhbmdlZCIsImRlY2FkZUNoYW5nZWQiLCJ5IiwibSIsImdldERheXNDb3VudCIsIl9yZWdpc3RlcktleSIsImV4aXN0cyIsImN1cktleSIsIl91blJlZ2lzdGVyS2V5IiwiaW5kZXgiLCJfaXNIb3RLZXlQcmVzc2VkIiwiY3VycmVudEhvdEtleSIsImZvdW5kIiwicHJlc3NlZEtleXMiLCJzb3J0IiwiaG90S2V5IiwiZXZlcnkiLCJhcmdzIiwidHJpZ2dlciIsIl9mb2N1c05leHRDZWxsIiwia2V5Q29kZSIsIm5kIiwiZ2V0RGF0ZSIsIl9nZXRDZWxsIiwic2VsZWN0b3IiLCIkY2VsbCIsImZpbmQiLCJkZXN0cm95IiwiY2xvc2VzdCIsInJlbW92ZSIsIl9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlcyIsImFscmVhZHlTZWxlY3RlZCIsInNlbGVjdGVkRGF0ZSIsImUiLCJvcmlnaW5hbEV2ZW50IiwidGltZXBpY2tlckZvY3VzIiwiZm9jdXMiLCJzZXRUaW1lb3V0IiwiY29kZSIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJoYXNDbGFzcyIsInRhcmdldCIsImxlc3MiLCJfdXBkYXRlIiwiaCIsIl9mb2N1c2VkIiwicHJldlZpZXciLCJzdWJzdHJpbmciLCJnZXREYXkiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJmaXJzdFllYXIiLCJNYXRoIiwiZmxvb3IiLCJ0ZW1wbGF0ZSIsInNvdXJjZSIsImRhdGUxIiwiZGF0ZTIiLCJkMSIsImQyIiwiX3R5cGUiLCJjb25kaXRpb25zIiwiZGF0ZUNvbXBhcmVUbyIsIm51bSIsInBhcnNlSW50IiwicmVzZXRUaW1lIiwiZWFjaCIsIkNvbnN0cnVjdG9yIiwiZGF5c01pbiIsInRlbXBsYXRlcyIsImRwIiwicHJveHkiLCIkbmFtZXMiLCIkY2VsbHMiLCJfZ2V0RGF5TmFtZXNIdG1sIiwiY3VyRGF5IiwiaHRtbCIsIl9nZXRDZWxsQ29udGVudHMiLCJwYXJlbnQiLCJyZW5kZXIiLCJkaXNhYmxlZCIsIl9nZXREYXlzSHRtbCIsInRvdGFsTW9udGhEYXlzIiwiZmlyc3RNb250aERheSIsImxhc3RNb250aERheSIsImRheXNGcm9tUGV2TW9udGgiLCJkYXlzRnJvbU5leHRNb250aCIsInN0YXJ0RGF5SW5kZXgiLCJfZ2V0RGF5SHRtbCIsImNvbnRlbnQiLCJfZ2V0TW9udGhzSHRtbCIsIl9nZXRNb250aEh0bWwiLCJfZ2V0WWVhcnNIdG1sIiwiX2dldFllYXJIdG1sIiwiX3JlbmRlclR5cGVzIiwiZGF5TmFtZXMiLCJhdHRyIiwiYWNpdHZlIiwiYWN0aXZlIiwiX2hhbmRsZUNsaWNrIiwiYnV0dG9uc0NvbnRhaW5lclRlbXBsYXRlIiwiYnV0dG9uIiwiJGJ1dHRvbnNDb250YWluZXIiLCJfb25DbGlja05hdkJ1dHRvbiIsIl9vbkNsaWNrTmF2VGl0bGUiLCJfYWRkQnV0dG9uIiwidGl0bGUiLCJfZ2V0VGl0bGUiLCJzZXROYXZTdGF0dXMiLCJfYWRkQnV0dG9uc0NvbnRhaW5lciIsImFjdGlvbiIsImxhYmVsIiwiX2Rpc2FibGVOYXYiLCJfYWN0aXZhdGVOYXYiLCJpbnN0IiwiaW5wdXQiLCJfYnVpbGRIVE1MIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiX29uU2VsZWN0RGF0ZSIsIiRyYW5nZXMiLCJfb25DaGFuZ2VSYW5nZSIsIl9vbk1vdXNlVXBSYW5nZSIsIl9vbk1vdXNlRW50ZXJSYW5nZSIsIl9vbk1vdXNlT3V0UmFuZ2UiLCJfZGF0ZSIsIl9zZXRNaW5UaW1lRnJvbURhdGUiLCJfc2V0TWF4VGltZUZyb21EYXRlIiwiX3NldERlZmF1bHRNaW5NYXhUaW1lIiwiX3ZhbGlkYXRlSG91cnNNaW51dGVzIiwibHoiLCJob3VyTWluIiwiaG91ck1heCIsImhvdXJTdGVwIiwiaG91clZhbHVlIiwiaG91clZpc2libGUiLCJkaXNwbGF5SG91cnMiLCJtaW5NaW4iLCJtaW5NYXgiLCJtaW5TdGVwIiwibWluVmFsdWUiLCJfdGVtcGxhdGUiLCIkdGltZXBpY2tlciIsIiRob3VycyIsIiRtaW51dGVzIiwiJGhvdXJzVGV4dCIsIiRtaW51dGVzVGV4dCIsIiRhbXBtIiwiX2FtcG0iLCJfaG91cnMiLCIkdGFyZ2V0IiwibmFtZSIsImpRdWVyeSIsImNvbWluZyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRlcGFydHVyZSIsImVuZERhdGUiLCJkYXRlcGlja2VyQmxvY2siLCJpbnNlcnRDYWxlbmRhciIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJidXR0b25DYWxlbmRhciIsImJ0bkZvcm0iLCJjYWxlbmRhck91dHB1dCIsImJ0bkNhbGVuZGFyUmVzdWx0IiwiYnRuQ2FsZW5kYXJDbGVhciIsImJ0bkNhbGVuZGFyQXBwbHkiLCJjYWxlbmRhckRlbGV0ZSIsImJ0bkNsaWNrIiwiYnRuSW5wdXQiLCJibG9ja0NhbGVuZGFyIiwiZGF0ZXBpY2tlckNyZWF0ZSIsImluc2VydEFkamFjZW50SFRNTCIsIm1keUNhbGVuZGFyIiwibWR5U3RhcnQiLCJtZHlFbmQiXSwic291cmNlUm9vdCI6IiJ9