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

/***/ "./modules/menutop/menutop.css":
/*!*************************************!*\
  !*** ./modules/menutop/menutop.css ***!
  \*************************************/
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
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ "./css/style.css");
/* harmony import */ var _modules_header_header_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/header/header-style.css */ "./modules/header/header-style.css");
/* harmony import */ var _modules_logo_logo_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/logo/logo.css */ "./modules/logo/logo.css");
/* harmony import */ var _modules_menutop_menutop_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menutop/menutop.css */ "./modules/menutop/menutop.css");
/* harmony import */ var _modules_cklikbutton_cklikbutton_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbutton.css */ "./modules/cklikbutton/cklikbutton.css");
/* harmony import */ var _modules_cklikbutton_cklikbuttonarrow_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbuttonarrow.css */ "./modules/cklikbutton/cklikbuttonarrow.css");
/* harmony import */ var _modules_cklikbutton_cklikbuttonwite_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cklikbutton/cklikbuttonwite.css */ "./modules/cklikbutton/cklikbuttonwite.css");
/* harmony import */ var _modules_searchform_searchform_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/searchform/searchform.css */ "./modules/searchform/searchform.css");
/* harmony import */ var _modules_maintext_maintext_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/maintext/maintext.css */ "./modules/maintext/maintext.css");
/* harmony import */ var _modules_footer_footerstyle_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/footer/footerstyle.css */ "./modules/footer/footerstyle.css");
/* harmony import */ var _modules_footer_company_advert_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/footer/company/advert.css */ "./modules/footer/company/advert.css");
/* harmony import */ var _modules_footer_company_company_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/footer/company/company.css */ "./modules/footer/company/company.css");
/* harmony import */ var _modules_footer_copyrite_copyrite_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/footer/copyrite/copyrite.css */ "./modules/footer/copyrite/copyrite.css");
/* harmony import */ var _modules_footer_menu_footermenu_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/footer/menu/footermenu.css */ "./modules/footer/menu/footermenu.css");
/* harmony import */ var _modules_footer_social_social_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/footer/social/social.css */ "./modules/footer/social/social.css");
/* harmony import */ var _modules_footer_subscribe_subscribe_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/footer/subscribe/subscribe.css */ "./modules/footer/subscribe/subscribe.css");
/* harmony import */ var _modules_datepicker_datepicker_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/datepicker/datepicker.css */ "./modules/datepicker/datepicker.css");
/* harmony import */ var _modules_datepicker_datepicker_min_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/datepicker/datepicker.min.css */ "./modules/datepicker/datepicker.min.css");
/* harmony import */ var _modules_datepicker_datepicker_min_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/datepicker/datepicker.min.js */ "./modules/datepicker/datepicker.min.js");
/* harmony import */ var _modules_datepicker_datepicker_min_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_modules_datepicker_datepicker_min_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _modules_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/datepicker/datepicker.js */ "./modules/datepicker/datepicker.js");
/* harmony import */ var _modules_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_modules_datepicker_datepicker_js__WEBPACK_IMPORTED_MODULE_19__);
//���������� jQuery � ������, �� ������ � html
//import 'jquery-3.4.1.min.js';
//-----------------------------------------//
// ����������� ������ 
 //�������� ����� �������� �� ������� ������������ ������ � ��������

 //�������� ����� ������

 //����� ��������

 //����� �������� ����

 //����� ����� ������

 //����� ����� ������ � ����� ��������

 //����� ����� ������

 //����� ������ �������

 //����� ������ ��������

 //����� ����� ��� ������

 //������� ��� ����

 //���� ���� � �������

 //���� ���������

 //���� ����

 //���� ��������

 //���� ��������
//---------------------------//
//����������� ��������� �������
//import './formelement.html';
//import html from "./formelement.html";
//---------------------------//
//����������� datepicker




 //---------------------------------//
//����������� ��������
//import "./jquery-3.4.1.min.js";
//---------------------------//
// ����������� ��������
//import Icon from './icon.png';
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7Q0FDb0Q7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7O0NBQ0E7QUFFcEQ7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtDQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQSxnQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL21vZHVsZXMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLmpzIiwid2VicGFjazovLy8uL21vZHVsZXMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9jc3Mvc3R5bGUuY3NzPzkzMDYiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9ja2xpa2J1dHRvbi9ja2xpa2J1dHRvbi5jc3M/MDA0MSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9uYXJyb3cuY3NzP2NhZmIiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9ja2xpa2J1dHRvbi9ja2xpa2J1dHRvbndpdGUuY3NzP2Y0MzEiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuY3NzPzg1N2MiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIubWluLmNzcz9lZGQxIiwid2VicGFjazovLy8uL21vZHVsZXMvZm9vdGVyL2NvbXBhbnkvYWR2ZXJ0LmNzcz82ZjNkIiwid2VicGFjazovLy8uL21vZHVsZXMvZm9vdGVyL2NvbXBhbnkvY29tcGFueS5jc3M/Y2JiOSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2Zvb3Rlci9jb3B5cml0ZS9jb3B5cml0ZS5jc3M/NDdmNCIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2Zvb3Rlci9mb290ZXJzdHlsZS5jc3M/M2IxZiIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2Zvb3Rlci9tZW51L2Zvb3Rlcm1lbnUuY3NzPzc1MmYiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9mb290ZXIvc29jaWFsL3NvY2lhbC5jc3M/MmI5NyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2Zvb3Rlci9zdWJzY3JpYmUvc3Vic2NyaWJlLmNzcyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2hlYWRlci9oZWFkZXItc3R5bGUuY3NzPzQ1MjQiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9sb2dvL2xvZ28uY3NzP2M4YTgiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9tYWludGV4dC9tYWludGV4dC5jc3M/NTdjNCIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL21lbnV0b3AvbWVudXRvcC5jc3M/ZTU3YSIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL3NlYXJjaGZvcm0vc2VhcmNoZm9ybS5jc3M/NTM5YyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiOyhmdW5jdGlvbiAod2luZG93LCAkLCB1bmRlZmluZWQpIHsgOyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIFZFUlNJT04gPSAnMi4yLjMnLFxuICAgICAgICBwbHVnaW5OYW1lID0gJ2RhdGVwaWNrZXInLFxuICAgICAgICBhdXRvSW5pdFNlbGVjdG9yID0gJy5kYXRlcGlja2VyLWhlcmUnLFxuICAgICAgICAkYm9keSwgJGRhdGVwaWNrZXJzQ29udGFpbmVyLFxuICAgICAgICBjb250YWluZXJCdWlsdCA9IGZhbHNlLFxuICAgICAgICBiYXNlVGVtcGxhdGUgPSAnJyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJcIj4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cImRhdGVwaWNrZXItLXBvaW50ZXJcIj48L2k+JyArXG4gICAgICAgICAgICAnPG5hdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdlwiPjwvbmF2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jb250ZW50XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBjbGFzc2VzOiAnJyxcbiAgICAgICAgICAgIGlubGluZTogZmFsc2UsXG4gICAgICAgICAgICBsYW5ndWFnZTogJ3J1JyxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAnJyxcbiAgICAgICAgICAgIHdlZWtlbmRzOiBbNiwgMF0sXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnJyxcbiAgICAgICAgICAgIGFsdEZpZWxkOiAnJyxcbiAgICAgICAgICAgIGFsdEZpZWxkRGF0ZUZvcm1hdDogJ0AnLFxuICAgICAgICAgICAgdG9nZ2xlU2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgICAgICBrZXlib2FyZE5hdjogdHJ1ZSxcblxuICAgICAgICAgICAgcG9zaXRpb246ICdib3R0b20gbGVmdCcsXG4gICAgICAgICAgICBvZmZzZXQ6IDEyLFxuXG4gICAgICAgICAgICB2aWV3OiAnZGF5cycsXG4gICAgICAgICAgICBtaW5WaWV3OiAnZGF5cycsXG5cbiAgICAgICAgICAgIHNob3dPdGhlck1vbnRoczogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdE90aGVyTW9udGhzOiB0cnVlLFxuICAgICAgICAgICAgbW92ZVRvT3RoZXJNb250aHNPblNlbGVjdDogdHJ1ZSxcblxuICAgICAgICAgICAgc2hvd090aGVyWWVhcnM6IHRydWUsXG4gICAgICAgICAgICBzZWxlY3RPdGhlclllYXJzOiB0cnVlLFxuICAgICAgICAgICAgbW92ZVRvT3RoZXJZZWFyc09uU2VsZWN0OiB0cnVlLFxuXG4gICAgICAgICAgICBtaW5EYXRlOiAnJyxcbiAgICAgICAgICAgIG1heERhdGU6ICcnLFxuICAgICAgICAgICAgZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlOiB0cnVlLFxuXG4gICAgICAgICAgICBtdWx0aXBsZURhdGVzOiBmYWxzZSwgLy8gQm9vbGVhbiBvciBOdW1iZXJcbiAgICAgICAgICAgIG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6ICcsJyxcbiAgICAgICAgICAgIHJhbmdlOiBmYWxzZSxcblxuICAgICAgICAgICAgdG9kYXlCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgY2xlYXJCdXR0b246IGZhbHNlLFxuXG4gICAgICAgICAgICBzaG93RXZlbnQ6ICdmb2N1cycsXG4gICAgICAgICAgICBhdXRvQ2xvc2U6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyBuYXZpZ2F0aW9uXG4gICAgICAgICAgICBtb250aHNGaWVsZDogJ21vbnRoc1Nob3J0JyxcbiAgICAgICAgICAgIHByZXZIdG1sOiAnPHN2Zz48cGF0aCBkPVwiTSAxNywxMiBsIC01LDUgbCA1LDVcIj48L3BhdGg+PC9zdmc+JyxcbiAgICAgICAgICAgIG5leHRIdG1sOiAnPHN2Zz48cGF0aCBkPVwiTSAxNCwxMiBsIDUsNSBsIC01LDVcIj48L3BhdGg+PC9zdmc+JyxcbiAgICAgICAgICAgIG5hdlRpdGxlczoge1xuICAgICAgICAgICAgICAgIGRheXM6ICdNTSwgPGk+eXl5eTwvaT4nLFxuICAgICAgICAgICAgICAgIG1vbnRoczogJ3l5eXknLFxuICAgICAgICAgICAgICAgIHllYXJzOiAneXl5eTEgLSB5eXl5MidcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIHRpbWVwaWNrZXJcbiAgICAgICAgICAgIHRpbWVwaWNrZXI6IGZhbHNlLFxuICAgICAgICAgICAgb25seVRpbWVwaWNrZXI6IGZhbHNlLFxuICAgICAgICAgICAgZGF0ZVRpbWVTZXBhcmF0b3I6ICcgJyxcbiAgICAgICAgICAgIHRpbWVGb3JtYXQ6ICcnLFxuICAgICAgICAgICAgbWluSG91cnM6IDAsXG4gICAgICAgICAgICBtYXhIb3VyczogMjQsXG4gICAgICAgICAgICBtaW5NaW51dGVzOiAwLFxuICAgICAgICAgICAgbWF4TWludXRlczogNTksXG4gICAgICAgICAgICBob3Vyc1N0ZXA6IDEsXG4gICAgICAgICAgICBtaW51dGVzU3RlcDogMSxcblxuICAgICAgICAgICAgLy8gZXZlbnRzXG4gICAgICAgICAgICBvblNlbGVjdDogJycsXG4gICAgICAgICAgICBvblNob3c6ICcnLFxuICAgICAgICAgICAgb25IaWRlOiAnJyxcbiAgICAgICAgICAgIG9uQ2hhbmdlTW9udGg6ICcnLFxuICAgICAgICAgICAgb25DaGFuZ2VZZWFyOiAnJyxcbiAgICAgICAgICAgIG9uQ2hhbmdlRGVjYWRlOiAnJyxcbiAgICAgICAgICAgIG9uQ2hhbmdlVmlldzogJycsXG4gICAgICAgICAgICBvblJlbmRlckNlbGw6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGhvdEtleXMgPSB7XG4gICAgICAgICAgICAnY3RybFJpZ2h0JzogWzE3LCAzOV0sXG4gICAgICAgICAgICAnY3RybFVwJzogWzE3LCAzOF0sXG4gICAgICAgICAgICAnY3RybExlZnQnOiBbMTcsIDM3XSxcbiAgICAgICAgICAgICdjdHJsRG93bic6IFsxNywgNDBdLFxuICAgICAgICAgICAgJ3NoaWZ0UmlnaHQnOiBbMTYsIDM5XSxcbiAgICAgICAgICAgICdzaGlmdFVwJzogWzE2LCAzOF0sXG4gICAgICAgICAgICAnc2hpZnRMZWZ0JzogWzE2LCAzN10sXG4gICAgICAgICAgICAnc2hpZnREb3duJzogWzE2LCA0MF0sXG4gICAgICAgICAgICAnYWx0VXAnOiBbMTgsIDM4XSxcbiAgICAgICAgICAgICdhbHRSaWdodCc6IFsxOCwgMzldLFxuICAgICAgICAgICAgJ2FsdExlZnQnOiBbMTgsIDM3XSxcbiAgICAgICAgICAgICdhbHREb3duJzogWzE4LCA0MF0sXG4gICAgICAgICAgICAnY3RybFNoaWZ0VXAnOiBbMTYsIDE3LCAzOF1cbiAgICAgICAgfSxcbiAgICAgICAgZGF0ZXBpY2tlcjtcblxuICAgIHZhciBEYXRlcGlja2VyICA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmVsID0gZWw7XG4gICAgICAgIHRoaXMuJGVsID0gJChlbCk7XG5cbiAgICAgICAgdGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBvcHRpb25zLCB0aGlzLiRlbC5kYXRhKCkpO1xuXG4gICAgICAgIGlmICgkYm9keSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdHMuc3RhcnREYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMuc3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVsLm5vZGVOYW1lID09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIHRoaXMuZWxJc0lucHV0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdHMuYWx0RmllbGQpIHtcbiAgICAgICAgICAgIHRoaXMuJGFsdEZpZWxkID0gdHlwZW9mIHRoaXMub3B0cy5hbHRGaWVsZCA9PSAnc3RyaW5nJyA/ICQodGhpcy5vcHRzLmFsdEZpZWxkKSA6IHRoaXMub3B0cy5hbHRGaWVsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlOyAvLyBOZWVkIHRvIHByZXZlbnQgdW5uZWNlc3NhcnkgcmVuZGVyaW5nXG5cbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHRoaXMub3B0cy5zdGFydERhdGU7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB0aGlzLm9wdHMudmlldztcbiAgICAgICAgdGhpcy5fY3JlYXRlU2hvcnRDdXRzKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IFtdO1xuICAgICAgICB0aGlzLnZpZXdzID0ge307XG4gICAgICAgIHRoaXMua2V5cyA9IFtdO1xuICAgICAgICB0aGlzLm1pblJhbmdlID0gJyc7XG4gICAgICAgIHRoaXMubWF4UmFuZ2UgPSAnJztcbiAgICAgICAgdGhpcy5fcHJldk9uU2VsZWN0VmFsdWUgPSAnJztcblxuICAgICAgICB0aGlzLmluaXQoKVxuICAgIH07XG5cbiAgICBkYXRlcGlja2VyID0gRGF0ZXBpY2tlcjtcblxuICAgIGRhdGVwaWNrZXIucHJvdG90eXBlID0ge1xuICAgICAgICBWRVJTSU9OOiBWRVJTSU9OLFxuICAgICAgICB2aWV3SW5kZXhlczogWydkYXlzJywgJ21vbnRocycsICd5ZWFycyddLFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyQnVpbHQgJiYgIXRoaXMub3B0cy5pbmxpbmUgJiYgdGhpcy5lbElzSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWlsZERhdGVwaWNrZXJzQ29udGFpbmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9idWlsZEJhc2VIdG1sKCk7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVMb2NhbGUodGhpcy5vcHRzLmxhbmd1YWdlKTtcbiAgICAgICAgICAgIHRoaXMuX3N5bmNXaXRoTWluTWF4RGF0ZXMoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBleHRyYSBjbGFzc2VzIGZvciBwcm9wZXIgdHJhbnNpdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0UG9zaXRpb25DbGFzc2VzKHRoaXMub3B0cy5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRFdmVudHMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmtleWJvYXJkTmF2ICYmICF0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmluZEtleWJvYXJkRXZlbnRzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIub24oJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duRGF0ZXBpY2tlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwRGF0ZXBpY2tlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5jbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyh0aGlzLm9wdHMuY2xhc3NlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyID0gbmV3ICQuZm4uZGF0ZXBpY2tlci5UaW1lcGlja2VyKHRoaXMsIHRoaXMub3B0cyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmluZFRpbWVwaWNrZXJFdmVudHMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoJy1vbmx5LXRpbWVwaWNrZXItJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10gPSBuZXcgJC5mbi5kYXRlcGlja2VyLkJvZHkodGhpcywgdGhpcy5jdXJyZW50VmlldywgdGhpcy5vcHRzKTtcbiAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5uYXYgPSBuZXcgJC5mbi5kYXRlcGlja2VyLk5hdmlnYXRpb24odGhpcywgdGhpcy5vcHRzKTtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IHRoaXMuY3VycmVudFZpZXc7XG5cbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdjbGlja0NlbGwuYWRwJywgdGhpcy5fb25DbGlja0NlbGwuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uKCdtb3VzZWVudGVyJywgJy5kYXRlcGlja2VyLS1jZWxsJywgdGhpcy5fb25Nb3VzZUVudGVyQ2VsbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIub24oJ21vdXNlbGVhdmUnLCAnLmRhdGVwaWNrZXItLWNlbGwnLCB0aGlzLl9vbk1vdXNlTGVhdmVDZWxsLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NyZWF0ZVNob3J0Q3V0czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5taW5EYXRlID0gdGhpcy5vcHRzLm1pbkRhdGUgPyB0aGlzLm9wdHMubWluRGF0ZSA6IG5ldyBEYXRlKC04NjM5OTk5OTEzNjAwMDAwKTtcbiAgICAgICAgICAgIHRoaXMubWF4RGF0ZSA9IHRoaXMub3B0cy5tYXhEYXRlID8gdGhpcy5vcHRzLm1heERhdGUgOiBuZXcgRGF0ZSg4NjM5OTk5OTEzNjAwMDAwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZEV2ZW50cyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKHRoaXMub3B0cy5zaG93RXZlbnQgKyAnLmFkcCcsIHRoaXMuX29uU2hvd0V2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ21vdXNldXAuYWRwJywgdGhpcy5fb25Nb3VzZVVwRWwuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbignYmx1ci5hZHAnLCB0aGlzLl9vbkJsdXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbigna2V5dXAuYWRwJywgdGhpcy5fb25LZXlVcEdlbmVyYWwuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5hZHAnLCB0aGlzLl9vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5vbignbW91c2V1cC5hZHAnLCB0aGlzLl9vbk1vdXNlVXBCb2R5LmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kS2V5Ym9hcmRFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdrZXlkb3duLmFkcCcsIHRoaXMuX29uS2V5RG93bi5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdrZXl1cC5hZHAnLCB0aGlzLl9vbktleVVwLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2hvdEtleS5hZHAnLCB0aGlzLl9vbkhvdEtleS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmluZFRpbWVwaWNrZXJFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCd0aW1lQ2hhbmdlLmFkcCcsIHRoaXMuX29uVGltZUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1dlZWtlbmQ6IGZ1bmN0aW9uIChkYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdHMud2Vla2VuZHMuaW5kZXhPZihkYXkpICE9PSAtMTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZGVmaW5lTG9jYWxlOiBmdW5jdGlvbiAobGFuZykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBsYW5nID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MgPSAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbbGFuZ107XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxvYykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZmluZCBsYW5ndWFnZSBcIicgKyBsYW5nICsgJ1wiIGluIERhdGVwaWNrZXIubGFuZ3VhZ2UsIHdpbGwgdXNlIFwicnVcIiBpbnN0ZWFkJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jID0gJC5leHRlbmQodHJ1ZSwge30sICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUsICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVtsYW5nXSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlLnJ1LCBsYW5nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmRhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYy5kYXRlRm9ybWF0ID0gdGhpcy5vcHRzLmRhdGVGb3JtYXRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MudGltZUZvcm1hdCA9IHRoaXMub3B0cy50aW1lRm9ybWF0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZmlyc3REYXkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MuZmlyc3REYXkgPSB0aGlzLm9wdHMuZmlyc3REYXlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MuZGF0ZUZvcm1hdCA9IFt0aGlzLmxvYy5kYXRlRm9ybWF0LCB0aGlzLmxvYy50aW1lRm9ybWF0XS5qb2luKHRoaXMub3B0cy5kYXRlVGltZVNlcGFyYXRvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYy5kYXRlRm9ybWF0ID0gdGhpcy5sb2MudGltZUZvcm1hdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGJvdW5kYXJ5ID0gdGhpcy5fZ2V0V29yZEJvdW5kYXJ5UmVnRXhwO1xuICAgICAgICAgICAgaWYgKHRoaXMubG9jLnRpbWVGb3JtYXQubWF0Y2goYm91bmRhcnkoJ2FhJykpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5sb2MudGltZUZvcm1hdC5tYXRjaChib3VuZGFyeSgnQUEnKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgdGhpcy5hbXBtID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfYnVpbGREYXRlcGlja2Vyc0NvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29udGFpbmVyQnVpbHQgPSB0cnVlO1xuICAgICAgICAgICAgJGJvZHkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlcnMtY29udGFpbmVyXCIgaWQ9XCJkYXRlcGlja2Vycy1jb250YWluZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICRkYXRlcGlja2Vyc0NvbnRhaW5lciA9ICQoJyNkYXRlcGlja2Vycy1jb250YWluZXInKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYnVpbGRCYXNlSHRtbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICRhcHBlbmRUYXJnZXQsXG4gICAgICAgICAgICAgICAgJGlubGluZSA9ICQoJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWlubGluZVwiPicpO1xuXG4gICAgICAgICAgICBpZih0aGlzLmVsLm5vZGVOYW1lID09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgJGFwcGVuZFRhcmdldCA9ICRkYXRlcGlja2Vyc0NvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkYXBwZW5kVGFyZ2V0ID0gJGlubGluZS5pbnNlcnRBZnRlcih0aGlzLiRlbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhcHBlbmRUYXJnZXQgPSAkaW5saW5lLmFwcGVuZFRvKHRoaXMuJGVsKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyID0gJChiYXNlVGVtcGxhdGUpLmFwcGVuZFRvKCRhcHBlbmRUYXJnZXQpO1xuICAgICAgICAgICAgdGhpcy4kY29udGVudCA9ICQoJy5kYXRlcGlja2VyLS1jb250ZW50JywgdGhpcy4kZGF0ZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRuYXYgPSAkKCcuZGF0ZXBpY2tlci0tbmF2JywgdGhpcy4kZGF0ZXBpY2tlcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RyaWdnZXJPbkNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBmcm9tIHRyaWdnZXJpbmcgbXVsdGlwbGUgb25TZWxlY3QgY2FsbGJhY2sgd2l0aCBzYW1lIGFyZ3VtZW50IChlbXB0eSBzdHJpbmcpIGluIElFMTAtMTFcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJldk9uU2VsZWN0VmFsdWUgPT09ICcnKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldk9uU2VsZWN0VmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRzLm9uU2VsZWN0KCcnLCAnJywgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzZWxlY3RlZERhdGVzID0gdGhpcy5zZWxlY3RlZERhdGVzLFxuICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHNlbGVjdGVkRGF0ZXNbMF0pLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZERhdGVzLFxuICAgICAgICAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkYXRlcyA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZC55ZWFyLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRTZWxlY3RlZC5tb250aCxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkU2VsZWN0ZWQuaG91cnMsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFNlbGVjdGVkLm1pbnV0ZXNcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkRGF0ZXMgPSBzZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZm9ybWF0RGF0ZShfdGhpcy5sb2MuZGF0ZUZvcm1hdCwgZGF0ZSlcbiAgICAgICAgICAgICAgICB9KS5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldyBkYXRlcyBhcnJheSwgdG8gc2VwYXJhdGUgaXQgZnJvbSBvcmlnaW5hbCBzZWxlY3RlZERhdGVzXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm11bHRpcGxlRGF0ZXMgfHwgdGhpcy5vcHRzLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgZGF0ZXMgPSBzZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZWREYXRlID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWREYXRlLnllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWREYXRlLm1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0ZS5kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0ZS5ob3VycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZERhdGUubWludXRlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlID0gZm9ybWF0dGVkRGF0ZXM7XG4gICAgICAgICAgICB0aGlzLm9wdHMub25TZWxlY3QoZm9ybWF0dGVkRGF0ZXMsIGRhdGVzLCB0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZCA9IHRoaXMucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICBvID0gdGhpcy5vcHRzO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoICsgMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlTW9udGgpIG8ub25DaGFuZ2VNb250aCh0aGlzLnBhcnNlZERhdGUubW9udGgsIHRoaXMucGFyc2VkRGF0ZS55ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyICsgMSwgZC5tb250aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlWWVhcikgby5vbkNoYW5nZVllYXIodGhpcy5wYXJzZWREYXRlLnllYXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciArIDEwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25DaGFuZ2VEZWNhZGUpIG8ub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcmV2OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZCA9IHRoaXMucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICBvID0gdGhpcy5vcHRzO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoIC0gMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlTW9udGgpIG8ub25DaGFuZ2VNb250aCh0aGlzLnBhcnNlZERhdGUubW9udGgsIHRoaXMucGFyc2VkRGF0ZS55ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZC55ZWFyIC0gMSwgZC5tb250aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm9uQ2hhbmdlWWVhcikgby5vbkNoYW5nZVllYXIodGhpcy5wYXJzZWREYXRlLnllYXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGQueWVhciAtIDEwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25DaGFuZ2VEZWNhZGUpIG8ub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBmb3JtYXREYXRlOiBmdW5jdGlvbiAoc3RyaW5nLCBkYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gZGF0ZSB8fCB0aGlzLmRhdGU7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc3RyaW5nLFxuICAgICAgICAgICAgICAgIGJvdW5kYXJ5ID0gdGhpcy5fZ2V0V29yZEJvdW5kYXJ5UmVnRXhwLFxuICAgICAgICAgICAgICAgIGxvY2FsZSA9IHRoaXMubG9jLFxuICAgICAgICAgICAgICAgIGxlYWRpbmdaZXJvID0gZGF0ZXBpY2tlci5nZXRMZWFkaW5nWmVyb051bSxcbiAgICAgICAgICAgICAgICBkZWNhZGUgPSBkYXRlcGlja2VyLmdldERlY2FkZShkYXRlKSxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIGZ1bGxIb3VycyA9IGQuZnVsbEhvdXJzLFxuICAgICAgICAgICAgICAgIGhvdXJzID0gZC5ob3VycyxcbiAgICAgICAgICAgICAgICBhbXBtID0gc3RyaW5nLm1hdGNoKGJvdW5kYXJ5KCdhYScpKSB8fCBzdHJpbmcubWF0Y2goYm91bmRhcnkoJ0FBJykpLFxuICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9ICdhbScsXG4gICAgICAgICAgICAgICAgcmVwbGFjZXIgPSB0aGlzLl9yZXBsYWNlcixcbiAgICAgICAgICAgICAgICB2YWxpZEhvdXJzO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVwaWNrZXIgJiYgdGhpcy50aW1lcGlja2VyICYmIGFtcG0pIHtcbiAgICAgICAgICAgICAgICB2YWxpZEhvdXJzID0gdGhpcy50aW1lcGlja2VyLl9nZXRWYWxpZEhvdXJzRnJvbURhdGUoZGF0ZSwgYW1wbSk7XG4gICAgICAgICAgICAgICAgZnVsbEhvdXJzID0gbGVhZGluZ1plcm8odmFsaWRIb3Vycy5ob3Vycyk7XG4gICAgICAgICAgICAgICAgaG91cnMgPSB2YWxpZEhvdXJzLmhvdXJzO1xuICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9IHZhbGlkSG91cnMuZGF5UGVyaW9kO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIC9ALy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9ALywgZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2FhLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2FhJyksIGRheVBlcmlvZCk7XG4gICAgICAgICAgICAgICAgY2FzZSAvQUEvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnQUEnKSwgZGF5UGVyaW9kLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2RkLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2RkJyksIGQuZnVsbERhdGUpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2QvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnZCcpLCBkLmRhdGUpO1xuICAgICAgICAgICAgICAgIGNhc2UgL0RELy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ0REJyksIGxvY2FsZS5kYXlzW2QuZGF5XSk7XG4gICAgICAgICAgICAgICAgY2FzZSAvRC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdEJyksIGxvY2FsZS5kYXlzU2hvcnRbZC5kYXldKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9tbS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdtbScpLCBkLmZ1bGxNb250aCk7XG4gICAgICAgICAgICAgICAgY2FzZSAvbS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdtJyksIGQubW9udGggKyAxKTtcbiAgICAgICAgICAgICAgICBjYXNlIC9NTS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdNTScpLCB0aGlzLmxvYy5tb250aHNbZC5tb250aF0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL00vLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnTScpLCBsb2NhbGUubW9udGhzU2hvcnRbZC5tb250aF0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL2lpLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2lpJyksIGQuZnVsbE1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2kvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgnaScpLCBkLm1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgIGNhc2UgL2hoLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ2hoJyksIGZ1bGxIb3Vycyk7XG4gICAgICAgICAgICAgICAgY2FzZSAvaC8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCdoJyksIGhvdXJzKTtcbiAgICAgICAgICAgICAgICBjYXNlIC95eXl5Ly50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ3l5eXknKSwgZC55ZWFyKTtcbiAgICAgICAgICAgICAgICBjYXNlIC95eXl5MS8udGVzdChyZXN1bHQpOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXBsYWNlcihyZXN1bHQsIGJvdW5kYXJ5KCd5eXl5MScpLCBkZWNhZGVbMF0pO1xuICAgICAgICAgICAgICAgIGNhc2UgL3l5eXkyLy50ZXN0KHJlc3VsdCk6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VyKHJlc3VsdCwgYm91bmRhcnkoJ3l5eXkyJyksIGRlY2FkZVsxXSk7XG4gICAgICAgICAgICAgICAgY2FzZSAveXkvLnRlc3QocmVzdWx0KTpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVwbGFjZXIocmVzdWx0LCBib3VuZGFyeSgneXknKSwgZC55ZWFyLnRvU3RyaW5nKCkuc2xpY2UoLTIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVwbGFjZXI6IGZ1bmN0aW9uIChzdHIsIHJlZywgZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZywgZnVuY3Rpb24gKG1hdGNoLCBwMSxwMixwMykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSArIGRhdGEgKyBwMztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFdvcmRCb3VuZGFyeVJlZ0V4cDogZnVuY3Rpb24gKHNpZ24pIHtcbiAgICAgICAgICAgIHZhciBzeW1ib2xzID0gJ1xcXFxzfFxcXFwufC18L3xcXFxcXFxcXHwsfFxcXFwkfFxcXFwhfFxcXFw/fDp8Oyc7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnw+fCcgKyBzeW1ib2xzICsgJykoJyArIHNpZ24gKyAnKSgkfDx8JyArIHN5bWJvbHMgKyAnKScsICdnJyk7XG4gICAgICAgIH0sXG5cblxuICAgICAgICBzZWxlY3REYXRlOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBvcHRzID0gX3RoaXMub3B0cyxcbiAgICAgICAgICAgICAgICBkID0gX3RoaXMucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGVzID0gX3RoaXMuc2VsZWN0ZWREYXRlcyxcbiAgICAgICAgICAgICAgICBsZW4gPSBzZWxlY3RlZERhdGVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBuZXdEYXRlID0gJyc7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdERhdGUoZClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZERhdGUgPSBkYXRlO1xuXG4gICAgICAgICAgICAvLyBTZXQgbmV3IHRpbWUgdmFsdWVzIGZyb20gRGF0ZVxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlci5fc2V0VGltZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT24gdGhpcyBzdGVwIHRpbWVwaWNrZXIgd2lsbCBzZXQgdmFsaWQgdmFsdWVzIGluIGl0J3MgaW5zdGFuY2VcbiAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyKCdzZWxlY3REYXRlJywgZGF0ZSk7XG5cbiAgICAgICAgICAgIC8vIFNldCBjb3JyZWN0IHRpbWUgdmFsdWVzIGFmdGVyIHRpbWVwaWNrZXIncyB2YWxpZGF0aW9uXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGZyb20gc2V0dGluZyBob3VycyBvciBtaW51dGVzIHdoaWNoIHZhbHVlcyBhcmUgbGVzc2VyIHRoZW4gYG1pbmAgdmFsdWUgb3JcbiAgICAgICAgICAgIC8vIGdyZWF0ZXIgdGhlbiBgbWF4YCB2YWx1ZVxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfdGhpcy52aWV3ID09ICdkYXlzJykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlLmdldE1vbnRoKCkgIT0gZC5tb250aCAmJiBvcHRzLm1vdmVUb090aGVyTW9udGhzT25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfdGhpcy52aWV3ID09ICd5ZWFycycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5nZXRGdWxsWWVhcigpICE9IGQueWVhciAmJiBvcHRzLm1vdmVUb090aGVyWWVhcnNPblNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdEYXRlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5kYXRlID0gbmV3RGF0ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zaWxlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5uYXYuX3JlbmRlcigpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm11bHRpcGxlRGF0ZXMgJiYgIW9wdHMucmFuZ2UpIHsgLy8gU2V0IHByaW9yaXR5IHRvIHJhbmdlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgICAgICBpZiAobGVuID09PSBvcHRzLm11bHRpcGxlRGF0ZXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl9pc1NlbGVjdGVkKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMucHVzaChkYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVuID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcyA9IFtkYXRlXTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGVuID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcy5wdXNoKGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLm1heFJhbmdlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1heFJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblJhbmdlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBTd2FwIGRhdGVzIGlmIHRoZXkgd2VyZSBzZWxlY3RlZCB2aWEgZHAuc2VsZWN0RGF0ZSgpIGFuZCBzZWNvbmQgZGF0ZSB3YXMgc21hbGxlciB0aGVuIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmJpZ2dlcihfdGhpcy5tYXhSYW5nZSwgX3RoaXMubWluUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYXhSYW5nZSA9IF90aGlzLm1pblJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdGVkRGF0ZXMgPSBbX3RoaXMubWluUmFuZ2UsIF90aGlzLm1heFJhbmdlXVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcyA9IFtkYXRlXTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSBkYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXRlcyA9IFtkYXRlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX3RoaXMuX3NldElucHV0VmFsdWUoKTtcblxuICAgICAgICAgICAgaWYgKG9wdHMub25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmF1dG9DbG9zZSAmJiAhdGhpcy50aW1lcGlja2VySXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdHMubXVsdGlwbGVEYXRlcyAmJiAhb3B0cy5yYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnJhbmdlICYmIF90aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX3RoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlRGF0ZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWREYXRlcyxcbiAgICAgICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICghKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQuc29tZShmdW5jdGlvbiAoY3VyRGF0ZSwgaSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmlzU2FtZShjdXJEYXRlLCBkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1heFJhbmdlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sYXN0U2VsZWN0ZWREYXRlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sYXN0U2VsZWN0ZWREYXRlID0gX3RoaXMuc2VsZWN0ZWREYXRlc1tfdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudmlld3NbX3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NldElucHV0VmFsdWUoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0cy5vblNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJPbkNoYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIHRvZGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLm9wdHMubWluVmlldztcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnRvZGF5QnV0dG9uIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZSh0aGlzLm9wdHMudG9kYXlCdXR0b24pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5taW5SYW5nZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9zZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9uU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlcyBkYXRlcGlja2VyIG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBwYXJhbSAtIHBhcmFtZXRlcidzIG5hbWUgdG8gdXBkYXRlLiBJZiBvYmplY3QgdGhlbiBpdCB3aWxsIGV4dGVuZCBjdXJyZW50IG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfE9iamVjdH0gW3ZhbHVlXSAtIG5ldyBwYXJhbSB2YWx1ZVxuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAocGFyYW0sIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBsYXN0U2VsZWN0ZWREYXRlID0gdGhpcy5sYXN0U2VsZWN0ZWREYXRlO1xuXG4gICAgICAgICAgICBpZiAobGVuID09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHNbcGFyYW1dID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxlbiA9PSAxICYmIHR5cGVvZiBwYXJhbSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIHRoaXMub3B0cywgcGFyYW0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVNob3J0Q3V0cygpO1xuICAgICAgICAgICAgdGhpcy5fc3luY1dpdGhNaW5NYXhEYXRlcygpO1xuICAgICAgICAgICAgdGhpcy5fZGVmaW5lTG9jYWxlKHRoaXMub3B0cy5sYW5ndWFnZSk7XG4gICAgICAgICAgICB0aGlzLm5hdi5fYWRkQnV0dG9uc0lmTmVlZCgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHRoaXMubmF2Ll9yZW5kZXIoKTtcbiAgICAgICAgICAgIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5lbElzSW5wdXQgJiYgIXRoaXMub3B0cy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRQb3NpdGlvbkNsYXNzZXModGhpcy5vcHRzLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5vcHRzLnBvc2l0aW9uKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5jbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyh0aGlzLm9wdHMuY2xhc3NlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoJy1vbmx5LXRpbWVwaWNrZXItJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VsZWN0ZWREYXRlKSB0aGlzLnRpbWVwaWNrZXIuX2hhbmRsZURhdGUobGFzdFNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyLl91cGRhdGVSYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIuX3VwZGF0ZUN1cnJlbnRUaW1lKCk7XG4gICAgICAgICAgICAgICAgLy8gQ2hhbmdlIGhvdXJzIGFuZCBtaW51dGVzIGlmIGl0J3MgdmFsdWVzIGhhdmUgYmVlbiBjaGFuZ2VkIHRocm91Z2ggbWluL21heCBob3Vycy9taW51dGVzXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkRGF0ZS5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VsZWN0ZWREYXRlLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fc2V0SW5wdXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBfc3luY1dpdGhNaW5NYXhEYXRlczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1clRpbWUgPSB0aGlzLmRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMubWluVGltZSA+IGN1clRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLm1pbkRhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1heFRpbWUgPCBjdXJUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaXNTZWxlY3RlZDogZnVuY3Rpb24gKGNoZWNrRGF0ZSwgY2VsbFR5cGUpIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcy5zb21lKGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVwaWNrZXIuaXNTYW1lKGRhdGUsIGNoZWNrRGF0ZSwgY2VsbFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSxcblxuICAgICAgICBfc2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBvcHRzID0gX3RoaXMub3B0cyxcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBfdGhpcy5sb2MuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgICAgICBhbHRGb3JtYXQgPSBvcHRzLmFsdEZpZWxkRGF0ZUZvcm1hdCxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IF90aGlzLnNlbGVjdGVkRGF0ZXMubWFwKGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5mb3JtYXREYXRlKGZvcm1hdCwgZGF0ZSlcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBhbHRWYWx1ZXM7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmFsdEZpZWxkICYmIF90aGlzLiRhbHRGaWVsZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhbHRWYWx1ZXMgPSB0aGlzLnNlbGVjdGVkRGF0ZXMubWFwKGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5mb3JtYXREYXRlKGFsdEZvcm1hdCwgZGF0ZSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhbHRWYWx1ZXMgPSBhbHRWYWx1ZXMuam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgdGhpcy4kYWx0RmllbGQudmFsKGFsdFZhbHVlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvcik7XG5cbiAgICAgICAgICAgIHRoaXMuJGVsLnZhbCh2YWx1ZSlcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgZGF0ZSBpcyBiZXR3ZWVuIG1pbkRhdGUgYW5kIG1heERhdGVcbiAgICAgICAgICogQHBhcmFtIGRhdGUge29iamVjdH0gLSBkYXRlIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gdHlwZSB7c3RyaW5nfSAtIGNlbGwgdHlwZVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9pc0luUmFuZ2U6IGZ1bmN0aW9uIChkYXRlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgdGltZSA9IGRhdGUuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgbWluID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMubWluRGF0ZSksXG4gICAgICAgICAgICAgICAgbWF4ID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMubWF4RGF0ZSksXG4gICAgICAgICAgICAgICAgZE1pblRpbWUgPSBuZXcgRGF0ZShkLnllYXIsIGQubW9udGgsIG1pbi5kYXRlKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgZE1heFRpbWUgPSBuZXcgRGF0ZShkLnllYXIsIGQubW9udGgsIG1heC5kYXRlKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgdHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRheTogdGltZSA+PSB0aGlzLm1pblRpbWUgJiYgdGltZSA8PSB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBkTWluVGltZSA+PSB0aGlzLm1pblRpbWUgJiYgZE1heFRpbWUgPD0gdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkLnllYXIgPj0gbWluLnllYXIgJiYgZC55ZWFyIDw9IG1heC55ZWFyXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlID8gdHlwZXNbdHlwZV0gOiB0eXBlcy5kYXlcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RGltZW5zaW9uczogZnVuY3Rpb24gKCRlbCkge1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9ICRlbC5vZmZzZXQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogJGVsLm91dGVyV2lkdGgoKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICRlbC5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0LFxuICAgICAgICAgICAgICAgIHRvcDogb2Zmc2V0LnRvcFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXREYXRlRnJvbUNlbGw6IGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgICB2YXIgY3VyRGF0ZSA9IHRoaXMucGFyc2VkRGF0ZSxcbiAgICAgICAgICAgICAgICB5ZWFyID0gY2VsbC5kYXRhKCd5ZWFyJykgfHwgY3VyRGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIG1vbnRoID0gY2VsbC5kYXRhKCdtb250aCcpID09IHVuZGVmaW5lZCA/IGN1ckRhdGUubW9udGggOiBjZWxsLmRhdGEoJ21vbnRoJyksXG4gICAgICAgICAgICAgICAgZGF0ZSA9IGNlbGwuZGF0YSgnZGF0ZScpIHx8IDE7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldFBvc2l0aW9uQ2xhc3NlczogZnVuY3Rpb24gKHBvcykge1xuICAgICAgICAgICAgcG9zID0gcG9zLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICB2YXIgbWFpbiA9IHBvc1swXSxcbiAgICAgICAgICAgICAgICBzZWMgPSBwb3NbMV0sXG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9ICdkYXRlcGlja2VyIC0nICsgbWFpbiArICctJyArIHNlYyArICctIC1mcm9tLScgKyBtYWluICsgJy0nO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlKSBjbGFzc2VzICs9ICcgYWN0aXZlJztcblxuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjbGFzcycpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGNsYXNzZXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFBvc2l0aW9uOiBmdW5jdGlvbiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgdGhpcy5vcHRzLnBvc2l0aW9uO1xuXG4gICAgICAgICAgICB2YXIgZGltcyA9IHRoaXMuX2dldERpbWVuc2lvbnModGhpcy4kZWwpLFxuICAgICAgICAgICAgICAgIHNlbGZEaW1zID0gdGhpcy5fZ2V0RGltZW5zaW9ucyh0aGlzLiRkYXRlcGlja2VyKSxcbiAgICAgICAgICAgICAgICBwb3MgPSBwb3NpdGlvbi5zcGxpdCgnICcpLFxuICAgICAgICAgICAgICAgIHRvcCwgbGVmdCxcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSB0aGlzLm9wdHMub2Zmc2V0LFxuICAgICAgICAgICAgICAgIG1haW4gPSBwb3NbMF0sXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5ID0gcG9zWzFdO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG1haW4pIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBkaW1zLnRvcCAtIHNlbGZEaW1zLmhlaWdodCAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGltcy5sZWZ0ICsgZGltcy53aWR0aCArIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gZGltcy50b3AgKyBkaW1zLmhlaWdodCArIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkaW1zLmxlZnQgLSBzZWxmRGltcy53aWR0aCAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaChzZWNvbmRhcnkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBkaW1zLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGltcy5sZWZ0ICsgZGltcy53aWR0aCAtIHNlbGZEaW1zLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBkaW1zLnRvcCArIGRpbXMuaGVpZ2h0IC0gc2VsZkRpbXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRpbXMubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9sZWZ0fHJpZ2h0Ly50ZXN0KG1haW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSBkaW1zLnRvcCArIGRpbXMuaGVpZ2h0LzIgLSBzZWxmRGltcy5oZWlnaHQvMjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkaW1zLmxlZnQgKyBkaW1zLndpZHRoLzIgLSBzZWxmRGltcy53aWR0aC8yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3BcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvblNob3cgPSB0aGlzLm9wdHMub25TaG93O1xuXG4gICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMub3B0cy5wb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChvblNob3cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iaW5kVmlzaW9uRXZlbnRzKG9uU2hvdylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb25IaWRlID0gdGhpcy5vcHRzLm9uSGlkZTtcblxuICAgICAgICAgICAgdGhpcy4kZGF0ZXBpY2tlclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJy0xMDAwMDBweCdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gJyc7XG4gICAgICAgICAgICB0aGlzLmtleXMgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5pbkZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGVsLmJsdXIoKTtcblxuICAgICAgICAgICAgaWYgKG9uSGlkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRWaXNpb25FdmVudHMob25IaWRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRvd246IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VWaWV3KGRhdGUsICdkb3duJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXA6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VWaWV3KGRhdGUsICd1cCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kVmlzaW9uRXZlbnRzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGRhdGVwaWNrZXIub2ZmKCd0cmFuc2l0aW9uZW5kLmRwJyk7XG4gICAgICAgICAgICBldmVudCh0aGlzLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLiRkYXRlcGlja2VyLm9uZSgndHJhbnNpdGlvbmVuZC5kcCcsIGV2ZW50LmJpbmQodGhpcywgdGhpcywgdHJ1ZSkpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NoYW5nZVZpZXc6IGZ1bmN0aW9uIChkYXRlLCBkaXIpIHtcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlIHx8IHRoaXMuZm9jdXNlZCB8fCB0aGlzLmRhdGU7XG5cbiAgICAgICAgICAgIHZhciBuZXh0VmlldyA9IGRpciA9PSAndXAnID8gdGhpcy52aWV3SW5kZXggKyAxIDogdGhpcy52aWV3SW5kZXggLSAxO1xuICAgICAgICAgICAgaWYgKG5leHRWaWV3ID4gMikgbmV4dFZpZXcgPSAyO1xuICAgICAgICAgICAgaWYgKG5leHRWaWV3IDwgMCkgbmV4dFZpZXcgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMSk7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gdGhpcy52aWV3SW5kZXhlc1tuZXh0Vmlld107XG5cbiAgICAgICAgfSxcblxuICAgICAgICBfaGFuZGxlSG90S2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLl9nZXRGb2N1c2VkRGF0ZSgpKSxcbiAgICAgICAgICAgICAgICBmb2N1c2VkUGFyc2VkLFxuICAgICAgICAgICAgICAgIG8gPSB0aGlzLm9wdHMsXG4gICAgICAgICAgICAgICAgbmV3RGF0ZSxcbiAgICAgICAgICAgICAgICB0b3RhbERheXNJbk5leHRNb250aCxcbiAgICAgICAgICAgICAgICBtb250aENoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICB5ZWFyQ2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlY2FkZUNoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICB5ID0gZGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLm1vbnRoLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmRhdGU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY3RybFJpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdjdHJsVXAnOlxuICAgICAgICAgICAgICAgICAgICBtICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2N0cmxMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdjdHJsRG93bic6XG4gICAgICAgICAgICAgICAgICAgIG0gLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgbW9udGhDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2hpZnRSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc2hpZnRVcCc6XG4gICAgICAgICAgICAgICAgICAgIHllYXJDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgeSArPSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzaGlmdExlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NoaWZ0RG93bic6XG4gICAgICAgICAgICAgICAgICAgIHllYXJDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhbHRSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx0VXAnOlxuICAgICAgICAgICAgICAgICAgICBkZWNhZGVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgeSArPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx0TGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx0RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGRlY2FkZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjdHJsU2hpZnRVcCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvdGFsRGF5c0luTmV4dE1vbnRoID0gZGF0ZXBpY2tlci5nZXREYXlzQ291bnQobmV3IERhdGUoeSxtKSk7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoeSxtLGQpO1xuXG4gICAgICAgICAgICAvLyBJZiBuZXh0IG1vbnRoIGhhcyBsZXNzIGRheXMgdGhhbiBjdXJyZW50LCBzZXQgZGF0ZSB0byB0b3RhbCBkYXlzIGluIHRoYXQgbW9udGhcbiAgICAgICAgICAgIGlmICh0b3RhbERheXNJbk5leHRNb250aCA8IGQpIGQgPSB0b3RhbERheXNJbk5leHRNb250aDtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbmV3RGF0ZSBpcyBpbiB2YWxpZCByYW5nZVxuICAgICAgICAgICAgaWYgKG5ld0RhdGUuZ2V0VGltZSgpIDwgdGhpcy5taW5UaW1lKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0ZSA9IHRoaXMubWluRGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3RGF0ZS5nZXRUaW1lKCkgPiB0aGlzLm1heFRpbWUpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBuZXdEYXRlO1xuXG4gICAgICAgICAgICBmb2N1c2VkUGFyc2VkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKG5ld0RhdGUpO1xuICAgICAgICAgICAgaWYgKG1vbnRoQ2hhbmdlZCAmJiBvLm9uQ2hhbmdlTW9udGgpIHtcbiAgICAgICAgICAgICAgICBvLm9uQ2hhbmdlTW9udGgoZm9jdXNlZFBhcnNlZC5tb250aCwgZm9jdXNlZFBhcnNlZC55ZWFyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHllYXJDaGFuZ2VkICYmIG8ub25DaGFuZ2VZZWFyKSB7XG4gICAgICAgICAgICAgICAgby5vbkNoYW5nZVllYXIoZm9jdXNlZFBhcnNlZC55ZWFyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlY2FkZUNoYW5nZWQgJiYgby5vbkNoYW5nZURlY2FkZSkge1xuICAgICAgICAgICAgICAgIG8ub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlZ2lzdGVyS2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RzID0gdGhpcy5rZXlzLnNvbWUoZnVuY3Rpb24gKGN1cktleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJLZXkgPT0ga2V5O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlzLnB1c2goa2V5KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF91blJlZ2lzdGVyS2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmtleXMuaW5kZXhPZihrZXkpO1xuXG4gICAgICAgICAgICB0aGlzLmtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaXNIb3RLZXlQcmVzc2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEhvdEtleSxcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBwcmVzc2VkS2V5cyA9IHRoaXMua2V5cy5zb3J0KCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGhvdEtleSBpbiBob3RLZXlzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEhvdEtleSA9IGhvdEtleXNbaG90S2V5XTtcbiAgICAgICAgICAgICAgICBpZiAocHJlc3NlZEtleXMubGVuZ3RoICE9IGN1cnJlbnRIb3RLZXkubGVuZ3RoKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SG90S2V5LmV2ZXJ5KGZ1bmN0aW9uIChrZXksIGkpIHsgcmV0dXJuIGtleSA9PSBwcmVzc2VkS2V5c1tpXX0pKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyKCdob3RLZXknLCBob3RLZXkpO1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RyaWdnZXI6IGZ1bmN0aW9uIChldmVudCwgYXJncykge1xuICAgICAgICAgICAgdGhpcy4kZWwudHJpZ2dlcihldmVudCwgYXJncylcbiAgICAgICAgfSxcblxuICAgICAgICBfZm9jdXNOZXh0Q2VsbDogZnVuY3Rpb24gKGtleUNvZGUsIHR5cGUpIHtcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlIHx8IHRoaXMuY2VsbFR5cGU7XG5cbiAgICAgICAgICAgIHZhciBkYXRlID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMuX2dldEZvY3VzZWREYXRlKCkpLFxuICAgICAgICAgICAgICAgIHkgPSBkYXRlLnllYXIsXG4gICAgICAgICAgICAgICAgbSA9IGRhdGUubW9udGgsXG4gICAgICAgICAgICAgICAgZCA9IGRhdGUuZGF0ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzSG90S2V5UHJlc3NlZCgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaChrZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAzNzogLy8gbGVmdFxuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdkYXknID8gKGQgLT0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnbW9udGgnID8gKG0gLT0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAneWVhcicgPyAoeSAtPSAxKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM4OiAvLyB1cFxuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdkYXknID8gKGQgLT0gNykgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnbW9udGgnID8gKG0gLT0gMykgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAneWVhcicgPyAoeSAtPSA0KSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM5OiAvLyByaWdodFxuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdkYXknID8gKGQgKz0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAnbW9udGgnID8gKG0gKz0gMSkgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PSAneWVhcicgPyAoeSArPSAxKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQwOiAvLyBkb3duXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPT0gJ2RheScgPyAoZCArPSA3KSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICdtb250aCcgPyAobSArPSAzKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID09ICd5ZWFyJyA/ICh5ICs9IDQpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbmQgPSBuZXcgRGF0ZSh5LG0sZCk7XG4gICAgICAgICAgICBpZiAobmQuZ2V0VGltZSgpIDwgdGhpcy5taW5UaW1lKSB7XG4gICAgICAgICAgICAgICAgbmQgPSB0aGlzLm1pbkRhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5kLmdldFRpbWUoKSA+IHRoaXMubWF4VGltZSkge1xuICAgICAgICAgICAgICAgIG5kID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBuZDtcblxuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRGb2N1c2VkRGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZvY3VzZWQgID0gdGhpcy5mb2N1c2VkIHx8IHRoaXMuc2VsZWN0ZWREYXRlc1t0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICAgICAgZCA9IHRoaXMucGFyc2VkRGF0ZTtcblxuICAgICAgICAgICAgaWYgKCFmb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2VkID0gbmV3IERhdGUoZC55ZWFyLCBkLm1vbnRoLCBuZXcgRGF0ZSgpLmdldERhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzZWQgPSBuZXcgRGF0ZShkLnllYXIsIGQubW9udGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzZWQgPSBuZXcgRGF0ZShkLnllYXIsIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm9jdXNlZDtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Q2VsbDogZnVuY3Rpb24gKGRhdGUsIHR5cGUpIHtcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlIHx8IHRoaXMuY2VsbFR5cGU7XG5cbiAgICAgICAgICAgIHZhciBkID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJy5kYXRlcGlja2VyLS1jZWxsW2RhdGEteWVhcj1cIicgKyBkLnllYXIgKyAnXCJdJyxcbiAgICAgICAgICAgICAgICAkY2VsbDtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICdbZGF0YS1tb250aD1cIicgKyBkLm1vbnRoICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yICs9ICdbZGF0YS1tb250aD1cIicgKyBkLm1vbnRoICsgJ1wiXVtkYXRhLWRhdGU9XCInICsgZC5kYXRlICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGNlbGwgPSB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLiRlbC5maW5kKHNlbGVjdG9yKTtcblxuICAgICAgICAgICAgcmV0dXJuICRjZWxsLmxlbmd0aCA/ICRjZWxsIDogJCgnJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIF90aGlzLiRlbFxuICAgICAgICAgICAgICAgIC5vZmYoJy5hZHAnKVxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJywgJycpO1xuXG4gICAgICAgICAgICBfdGhpcy5zZWxlY3RlZERhdGVzID0gW107XG4gICAgICAgICAgICBfdGhpcy5mb2N1c2VkID0gJyc7XG4gICAgICAgICAgICBfdGhpcy52aWV3cyA9IHt9O1xuICAgICAgICAgICAgX3RoaXMua2V5cyA9IFtdO1xuICAgICAgICAgICAgX3RoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgIF90aGlzLm1heFJhbmdlID0gJyc7XG5cbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRzLmlubGluZSB8fCAhX3RoaXMuZWxJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGRhdGVwaWNrZXIuY2xvc2VzdCgnLmRhdGVwaWNrZXItaW5saW5lJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLiRkYXRlcGlja2VyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlczogZnVuY3Rpb24gKGFscmVhZHlTZWxlY3RlZCwgc2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHBvc3NpYmlsaXR5IHRvIHNlbGVjdCBzYW1lIGRhdGUgd2hlbiByYW5nZSBpcyB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoICE9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoJ2NsaWNrQ2VsbCcsIHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURhdGUoc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0cy50b2dnbGVTZWxlY3RlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEYXRlKHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENoYW5nZSBsYXN0IHNlbGVjdGVkIGRhdGUgdG8gYmUgYWJsZSB0byBjaGFuZ2UgdGltZSB3aGVuIGNsaWNraW5nIG9uIHRoaXMgY2VsbFxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZERhdGUgPSBhbHJlYWR5U2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlci5fc2V0VGltZShhbHJlYWR5U2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vblNob3dFdmVudDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQmx1cjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluRm9jdXMgJiYgdGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VEb3duRGF0ZXBpY2tlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5Gb2N1cyA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VVcERhdGVwaWNrZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLmluRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIGUub3JpZ2luYWxFdmVudC5pbkZvY3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghZS5vcmlnaW5hbEV2ZW50LnRpbWVwaWNrZXJGb2N1cykgdGhpcy4kZWwuZm9jdXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25LZXlVcEdlbmVyYWw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gdGhpcy4kZWwudmFsKCk7XG5cbiAgICAgICAgICAgIGlmICghdmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vblJlc2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZVVwQm9keTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQuaW5Gb2N1cykgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlICYmICF0aGlzLmluRm9jdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZVVwRWw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLm9yaWdpbmFsRXZlbnQuaW5Gb2N1cyA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuX29uS2V5VXBHZW5lcmFsLmJpbmQodGhpcyksNCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uS2V5RG93bjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyS2V5KGNvZGUpO1xuXG4gICAgICAgICAgICAvLyBBcnJvd3NcbiAgICAgICAgICAgIGlmIChjb2RlID49IDM3ICYmIGNvZGUgPD0gNDApIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9jdXNOZXh0Q2VsbChjb2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRW50ZXJcbiAgICAgICAgICAgIGlmIChjb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2V0Q2VsbCh0aGlzLmZvY3VzZWQpLmhhc0NsYXNzKCctZGlzYWJsZWQtJykpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlldyAhPSB0aGlzLm9wdHMubWluVmlldykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duKClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHJlYWR5U2VsZWN0ZWQgPSB0aGlzLl9pc1NlbGVjdGVkKHRoaXMuZm9jdXNlZCwgdGhpcy5jZWxsVHlwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWQuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUodGhpcy5mb2N1c2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlcyhhbHJlYWR5U2VsZWN0ZWQsIHRoaXMuZm9jdXNlZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRXNjXG4gICAgICAgICAgICBpZiAoY29kZSA9PSAyNykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbktleVVwOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBlLndoaWNoO1xuICAgICAgICAgICAgdGhpcy5fdW5SZWdpc3RlcktleShjb2RlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Ib3RLZXk6IGZ1bmN0aW9uIChlLCBob3RLZXkpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUhvdEtleShob3RLZXkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlRW50ZXJDZWxsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyICRjZWxsID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmRhdGVwaWNrZXItLWNlbGwnKSxcbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5fZ2V0RGF0ZUZyb21DZWxsKCRjZWxsKTtcblxuICAgICAgICAgICAgLy8gUHJldmVudCBmcm9tIHVubmVjZXNzYXJ5IHJlbmRlcmluZyBhbmQgc2V0dGluZyBuZXcgY3VycmVudERhdGVcbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9ICcnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRjZWxsLmFkZENsYXNzKCctZm9jdXMtJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGRhdGU7XG4gICAgICAgICAgICB0aGlzLnNpbGVudCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnJhbmdlICYmIHRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSB0aGlzLnNlbGVjdGVkRGF0ZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmxlc3ModGhpcy5taW5SYW5nZSwgdGhpcy5mb2N1c2VkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1heFJhbmdlID0gdGhpcy5taW5SYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5SYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl91cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZUxlYXZlQ2VsbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciAkY2VsbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5kYXRlcGlja2VyLS1jZWxsJyk7XG5cbiAgICAgICAgICAgICRjZWxsLnJlbW92ZUNsYXNzKCctZm9jdXMtJyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5zaWxlbnQgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25UaW1lQ2hhbmdlOiBmdW5jdGlvbiAoZSwgaCwgbSkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXMgPSB0aGlzLnNlbGVjdGVkRGF0ZXMsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLmxhc3RTZWxlY3RlZERhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoaCk7XG4gICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMobSk7XG5cbiAgICAgICAgICAgIGlmICghc2VsZWN0ZWQgJiYgIXRoaXMuX2dldENlbGwoZGF0ZSkuaGFzQ2xhc3MoJy1kaXNhYmxlZC0nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkNsaWNrQ2VsbDogZnVuY3Rpb24gKGUsIGRhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3Vycyk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgZm9jdXNlZCh2YWwpIHtcbiAgICAgICAgICAgIGlmICghdmFsICYmIHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIHZhciAkY2VsbCA9IHRoaXMuX2dldENlbGwodGhpcy5mb2N1c2VkKTtcblxuICAgICAgICAgICAgICAgIGlmICgkY2VsbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGNlbGwucmVtb3ZlQ2xhc3MoJy1mb2N1cy0nKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB2YWw7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnJhbmdlICYmIHRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSB0aGlzLnNlbGVjdGVkRGF0ZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkYXRlcGlja2VyLmxlc3ModGhpcy5taW5SYW5nZSwgdGhpcy5fZm9jdXNlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhSYW5nZSA9IHRoaXMubWluUmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluUmFuZ2UgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zaWxlbnQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHZhbDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgZm9jdXNlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb2N1c2VkO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBwYXJzZWREYXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVwaWNrZXIuZ2V0UGFyc2VkRGF0ZSh0aGlzLmRhdGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBkYXRlICh2YWwpIHtcbiAgICAgICAgICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIERhdGUpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGUgPSB2YWw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRlZCAmJiAhdGhpcy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3RoaXMudmlld10uX3JlbmRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMubmF2Ll9yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlICYmIHRoaXMuZWxJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBkYXRlICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnREYXRlXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IHZpZXcgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy52aWV3SW5kZXggPSB0aGlzLnZpZXdJbmRleGVzLmluZGV4T2YodmFsKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlld0luZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcmV2VmlldyA9IHRoaXMuY3VycmVudFZpZXc7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdmFsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudmlld3NbdmFsXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdzW3ZhbF0gPSBuZXcgICQuZm4uZGF0ZXBpY2tlci5Cb2R5KHRoaXMsIHZhbCwgdGhpcy5vcHRzKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld3NbdmFsXS5fcmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3c1t0aGlzLnByZXZWaWV3XS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3c1t2YWxdLnNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdi5fcmVuZGVyKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLm9uQ2hhbmdlVmlldykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMub25DaGFuZ2VWaWV3KHZhbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWxJc0lucHV0ICYmIHRoaXMudmlzaWJsZSkgdGhpcy5zZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IHZpZXcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VmlldztcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgY2VsbFR5cGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3LnN1YnN0cmluZygwLCB0aGlzLnZpZXcubGVuZ3RoIC0gMSlcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgbWluVGltZSgpIHtcbiAgICAgICAgICAgIHZhciBtaW4gPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUodGhpcy5taW5EYXRlKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShtaW4ueWVhciwgbWluLm1vbnRoLCBtaW4uZGF0ZSkuZ2V0VGltZSgpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IG1heFRpbWUoKSB7XG4gICAgICAgICAgICB2YXIgbWF4ID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKHRoaXMubWF4RGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUobWF4LnllYXIsIG1heC5tb250aCwgbWF4LmRhdGUpLmdldFRpbWUoKVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBjdXJEZWNhZGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZXBpY2tlci5nZXREZWNhZGUodGhpcy5kYXRlKVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vICBVdGlsc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGRhdGVwaWNrZXIuZ2V0RGF5c0NvdW50ID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgIGZ1bGxNb250aDogKGRhdGUuZ2V0TW9udGgoKSArIDEpIDwgMTAgPyAnMCcgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvLyBPbmUgYmFzZWRcbiAgICAgICAgICAgIGRhdGU6IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgZnVsbERhdGU6IGRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyAnMCcgKyBkYXRlLmdldERhdGUoKSA6IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgZGF5OiBkYXRlLmdldERheSgpLFxuICAgICAgICAgICAgaG91cnM6IGRhdGUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgIGZ1bGxIb3VyczogIGRhdGUuZ2V0SG91cnMoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXRIb3VycygpIDogIGRhdGUuZ2V0SG91cnMoKSAsXG4gICAgICAgICAgICBtaW51dGVzOiBkYXRlLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgIGZ1bGxNaW51dGVzOiAgZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCA/ICcwJyArIGRhdGUuZ2V0TWludXRlcygpIDogIGRhdGUuZ2V0TWludXRlcygpXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5nZXREZWNhZGUgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICB2YXIgZmlyc3RZZWFyID0gTWF0aC5mbG9vcihkYXRlLmdldEZ1bGxZZWFyKCkgLyAxMCkgKiAxMDtcblxuICAgICAgICByZXR1cm4gW2ZpcnN0WWVhciwgZmlyc3RZZWFyICsgOV07XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIudGVtcGxhdGUgPSBmdW5jdGlvbiAoc3RyLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvI1xceyhbXFx3XSspXFx9L2csIGZ1bmN0aW9uIChzb3VyY2UsIG1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVttYXRjaF0gfHwgZGF0YVttYXRjaF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVttYXRjaF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuaXNTYW1lID0gZnVuY3Rpb24gKGRhdGUxLCBkYXRlMiwgdHlwZSkge1xuICAgICAgICBpZiAoIWRhdGUxIHx8ICFkYXRlMikgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZDEgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZTEpLFxuICAgICAgICAgICAgZDIgPSBkYXRlcGlja2VyLmdldFBhcnNlZERhdGUoZGF0ZTIpLFxuICAgICAgICAgICAgX3R5cGUgPSB0eXBlID8gdHlwZSA6ICdkYXknLFxuXG4gICAgICAgICAgICBjb25kaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIGRheTogZDEuZGF0ZSA9PSBkMi5kYXRlICYmIGQxLm1vbnRoID09IGQyLm1vbnRoICYmIGQxLnllYXIgPT0gZDIueWVhcixcbiAgICAgICAgICAgICAgICBtb250aDogZDEubW9udGggPT0gZDIubW9udGggJiYgZDEueWVhciA9PSBkMi55ZWFyLFxuICAgICAgICAgICAgICAgIHllYXI6IGQxLnllYXIgPT0gZDIueWVhclxuICAgICAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gY29uZGl0aW9uc1tfdHlwZV07XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIubGVzcyA9IGZ1bmN0aW9uIChkYXRlQ29tcGFyZVRvLCBkYXRlLCB0eXBlKSB7XG4gICAgICAgIGlmICghZGF0ZUNvbXBhcmVUbyB8fCAhZGF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKCkgPCBkYXRlQ29tcGFyZVRvLmdldFRpbWUoKTtcbiAgICB9O1xuXG4gICAgZGF0ZXBpY2tlci5iaWdnZXIgPSBmdW5jdGlvbiAoZGF0ZUNvbXBhcmVUbywgZGF0ZSwgdHlwZSkge1xuICAgICAgICBpZiAoIWRhdGVDb21wYXJlVG8gfHwgIWRhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpID4gZGF0ZUNvbXBhcmVUby5nZXRUaW1lKCk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuZ2V0TGVhZGluZ1plcm9OdW0gPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChudW0pIDwgMTAgPyAnMCcgKyBudW0gOiBudW07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY29weSBvZiBkYXRlIHdpdGggaG91cnMgYW5kIG1pbnV0ZXMgZXF1YWxzIHRvIDBcbiAgICAgKiBAcGFyYW0gZGF0ZSB7RGF0ZX1cbiAgICAgKi9cbiAgICBkYXRlcGlja2VyLnJlc2V0VGltZSA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0ZSAhPSAnb2JqZWN0JykgcmV0dXJuO1xuICAgICAgICBkYXRlID0gZGF0ZXBpY2tlci5nZXRQYXJzZWREYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRhdGUpXG4gICAgfTtcblxuICAgICQuZm4uZGF0ZXBpY2tlciA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISQuZGF0YSh0aGlzLCBwbHVnaW5OYW1lKSkge1xuICAgICAgICAgICAgICAgICQuZGF0YSh0aGlzLCAgcGx1Z2luTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IERhdGVwaWNrZXIoIHRoaXMsIG9wdGlvbnMgKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9ICQuZGF0YSh0aGlzLCBwbHVnaW5OYW1lKTtcblxuICAgICAgICAgICAgICAgIF90aGlzLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCBfdGhpcy5vcHRzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uZGF0ZXBpY2tlci5Db25zdHJ1Y3RvciA9IERhdGVwaWNrZXI7XG5cbiAgICAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UgPSB7XG4gICAgICAgIHJ1OiB7XG4gICAgICAgICAgICBkYXlzOiBbJ9CS0L7RgdC60YDQtdGB0LXQvdGM0LUnLCfQn9C+0L3QtdC00LXQu9GM0L3QuNC6Jywn0JLRgtC+0YDQvdC40LonLCfQodGA0LXQtNCwJywn0KfQtdGC0LLQtdGA0LMnLCfQn9GP0YLQvdC40YbQsCcsJ9Ch0YPQsdCx0L7RgtCwJ10sXG4gICAgICAgICAgICBkYXlzU2hvcnQ6IFsn0JLQvtGBJywn0J/QvtC9Jywn0JLRgtC+Jywn0KHRgNC1Jywn0KfQtdGCJywn0J/Rj9GCJywn0KHRg9CxJ10sXG4gICAgICAgICAgICBkYXlzTWluOiBbJ9CS0L7RgScsJ9Cf0L7QvScsJ9CS0YLQvicsJ9Ch0YDQtScsJ9Cn0LXRgicsJ9Cf0Y/RgicsJ9Ch0YPQsSddLFxuICAgICAgICAgICAgbW9udGhzOiBbJ9Cv0L3QstCw0YDRjCcsJ9Ck0LXQstGA0LDQu9GMJywn0JzQsNGA0YInLCfQkNC/0YDQtdC70YwnLCfQnNCw0LknLCfQmNGO0L3RjCcsJ9CY0Y7Qu9GMJywn0JDQstCz0YPRgdGCJywn0KHQtdC90YLRj9Cx0YDRjCcsJ9Ce0LrRgtGP0LHRgNGMJywn0J3QvtGP0LHRgNGMJywn0JTQtdC60LDQsdGA0YwnXSxcbiAgICAgICAgICAgIG1vbnRoc1Nob3J0OiBbJ9Cv0L3QsicsJ9Ck0LXQsicsJ9Cc0LDRgCcsJ9CQ0L/RgCcsJ9Cc0LDQuScsJ9CY0Y7QvScsJ9CY0Y7QuycsJ9CQ0LLQsycsJ9Ch0LXQvScsJ9Ce0LrRgicsJ9Cd0L7RjycsJ9CU0LXQuiddLFxuICAgICAgICAgICAgdG9kYXk6ICfQodC10LPQvtC00L3RjycsXG4gICAgICAgICAgICBjbGVhcjogJ9Ce0YfQuNGB0YLQuNGC0YwnLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkLm1tLnl5eXknLFxuICAgICAgICAgICAgdGltZUZvcm1hdDogJ2hoOmlpJyxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAxXG4gICAgICAgIH1cbiAgICB9O1xuICAgLy8gJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlWydydSddID0gIHtcbiAgIC8vICAgICBkYXlzOiBbJ9CS0L7RgdC60YDQtdGB0LXQvdGM0LUnLCfQn9C+0L3QtdC00LXQu9GM0L3QuNC6Jywn0JLRgtC+0YDQvdC40LonLCfQodGA0LXQtNCwJywn0KfQtdGC0LLQtdGA0LMnLCfQn9GP0YLQvdC40YbQsCcsJ9Ch0YPQsdCx0L7RgtCwJ10sXG4gICAgLy8gICAgZGF5c1Nob3J0OiBbJ9CS0L7RgScsJ9Cf0L7QvScsJ9CS0YLQvicsJ9Ch0YDQtScsJ9Cn0LXRgicsJ9Cf0Y/RgicsJ9Ch0YPQsSddLFxuICAgLy8gICAgIGRheXNNaW46IFsn0JLRgScsJ9Cf0L0nLCfQktGCJywn0KHRgCcsJ9Cn0YInLCfQn9GCJywn0KHQsSddLFxuICAgLy8gICAgIG1vbnRoczogWyfQr9C90LLQsNGA0YwnLCfQpNC10LLRgNCw0LvRjCcsJ9Cc0LDRgNGCJywn0JDQv9GA0LXQu9GMJywn0JzQsNC5Jywn0JjRjtC90YwnLCfQmNGO0LvRjCcsJ9CQ0LLQs9GD0YHRgicsJ9Ch0LXQvdGC0Y/QsdGA0YwnLCfQntC60YLRj9Cx0YDRjCcsJ9Cd0L7Rj9Cx0YDRjCcsJ9CU0LXQutCw0LHRgNGMJ10sXG4gICAvLyAgICAgbW9udGhzU2hvcnQ6IFsn0K/QvdCyJywn0KTQtdCyJywn0JzQsNGAJywn0JDQv9GAJywn0JzQsNC5Jywn0JjRjtC9Jywn0JjRjtC7Jywn0JDQstCzJywn0KHQtdC9Jywn0J7QutGCJywn0J3QvtGPJywn0JTQtdC6J10sXG4gICAvLyAgICAgdG9kYXk6ICfQodC10LPQvtC00L3RjycsXG4gIC8vICAgICAgY2xlYXI6ICfQntGH0LjRgdGC0LjRgtGMJyxcbiAvLyAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXl5eScsXG4gLy8gICAgICAgdGltZUZvcm1hdDogJ2hoOmlpJyxcbiAvLyAgICAgICBmaXJzdERheTogMVxuIC8vICAgfTtcblxuXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoYXV0b0luaXRTZWxlY3RvcikuZGF0ZXBpY2tlcigpO1xuICAgIH0pXG5cbn0pKCk7XG5cbjsoZnVuY3Rpb24gKCkge1xuICAgIHZhciB0ZW1wbGF0ZXMgPSB7XG4gICAgICAgIGRheXM6JycgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheXMgZGF0ZXBpY2tlci0tYm9keVwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheXMtbmFtZXNcIj48L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy1kYXlzXCI+PC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICBtb250aHM6ICcnICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1tb250aHMgZGF0ZXBpY2tlci0tYm9keVwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLW1vbnRoc1wiPjwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgeWVhcnM6ICcnICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS15ZWFycyBkYXRlcGlja2VyLS1ib2R5XCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY2VsbHMgZGF0ZXBpY2tlci0tY2VsbHMteWVhcnNcIj48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PidcbiAgICAgICAgfSxcbiAgICAgICAgZGF0ZXBpY2tlciA9ICQuZm4uZGF0ZXBpY2tlcixcbiAgICAgICAgZHAgPSBkYXRlcGlja2VyLkNvbnN0cnVjdG9yO1xuXG4gICAgZGF0ZXBpY2tlci5Cb2R5ID0gZnVuY3Rpb24gKGQsIHR5cGUsIG9wdHMpIHtcbiAgICAgICAgdGhpcy5kID0gZDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy4kZWwgPSAkKCcnKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSByZXR1cm47XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLkJvZHkucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9idWlsZEJhc2VIdG1sKCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbignY2xpY2snLCAnLmRhdGVwaWNrZXItLWNlbGwnLCAkLnByb3h5KHRoaXMuX29uQ2xpY2tDZWxsLCB0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkQmFzZUh0bWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJCh0ZW1wbGF0ZXNbdGhpcy50eXBlXSkuYXBwZW5kVG8odGhpcy5kLiRjb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuJG5hbWVzID0gJCgnLmRhdGVwaWNrZXItLWRheXMtbmFtZXMnLCB0aGlzLiRlbCk7XG4gICAgICAgICAgICB0aGlzLiRjZWxscyA9ICQoJy5kYXRlcGlja2VyLS1jZWxscycsIHRoaXMuJGVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RGF5TmFtZXNIdG1sOiBmdW5jdGlvbiAoZmlyc3REYXksIGN1ckRheSwgaHRtbCwgaSkge1xuICAgICAgICAgICAgY3VyRGF5ID0gY3VyRGF5ICE9IHVuZGVmaW5lZCA/IGN1ckRheSA6IGZpcnN0RGF5O1xuICAgICAgICAgICAgaHRtbCA9IGh0bWwgPyBodG1sIDogJyc7XG4gICAgICAgICAgICBpID0gaSAhPSB1bmRlZmluZWQgPyBpIDogMDtcblxuICAgICAgICAgICAgaWYgKGkgPiA3KSByZXR1cm4gaHRtbDtcbiAgICAgICAgICAgIGlmIChjdXJEYXkgPT0gNykgcmV0dXJuIHRoaXMuX2dldERheU5hbWVzSHRtbChmaXJzdERheSwgMCwgaHRtbCwgKytpKTtcblxuICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheS1uYW1lJyArICh0aGlzLmQuaXNXZWVrZW5kKGN1ckRheSkgPyBcIiAtd2Vla2VuZC1cIiA6IFwiXCIpICsgJ1wiPicgKyB0aGlzLmQubG9jLmRheXNNaW5bY3VyRGF5XSArICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGF5TmFtZXNIdG1sKGZpcnN0RGF5LCArK2N1ckRheSwgaHRtbCwgKytpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Q2VsbENvbnRlbnRzOiBmdW5jdGlvbiAoZGF0ZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBcImRhdGVwaWNrZXItLWNlbGwgZGF0ZXBpY2tlci0tY2VsbC1cIiArIHR5cGUsXG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHRoaXMuZCxcbiAgICAgICAgICAgICAgICBtaW5SYW5nZSA9IGRwLnJlc2V0VGltZShwYXJlbnQubWluUmFuZ2UpLFxuICAgICAgICAgICAgICAgIG1heFJhbmdlID0gZHAucmVzZXRUaW1lKHBhcmVudC5tYXhSYW5nZSksXG4gICAgICAgICAgICAgICAgb3B0cyA9IHBhcmVudC5vcHRzLFxuICAgICAgICAgICAgICAgIGQgPSBkcC5nZXRQYXJzZWREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIHJlbmRlciA9IHt9LFxuICAgICAgICAgICAgICAgIGh0bWwgPSBkLmRhdGU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuaXNXZWVrZW5kKGQuZGF5KSkgY2xhc3NlcyArPSBcIiAtd2Vla2VuZC1cIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQubW9udGggIT0gdGhpcy5kLnBhcnNlZERhdGUubW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gXCIgLW90aGVyLW1vbnRoLVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNlbGVjdE90aGVyTW9udGhzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSBcIiAtZGlzYWJsZWQtXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuc2hvd090aGVyTW9udGhzKSBodG1sID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgICAgICBodG1sID0gcGFyZW50LmxvY1twYXJlbnQub3B0cy5tb250aHNGaWVsZF1bZC5tb250aF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVjYWRlID0gcGFyZW50LmN1ckRlY2FkZTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IGQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQueWVhciA8IGRlY2FkZVswXSB8fCBkLnllYXIgPiBkZWNhZGVbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gJyAtb3RoZXItZGVjYWRlLSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuc2VsZWN0T3RoZXJZZWFycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gXCIgLWRpc2FibGVkLVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNob3dPdGhlclllYXJzKSBodG1sID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLm9uUmVuZGVyQ2VsbCkge1xuICAgICAgICAgICAgICAgIHJlbmRlciA9IG9wdHMub25SZW5kZXJDZWxsKGRhdGUsIHR5cGUpIHx8IHt9O1xuICAgICAgICAgICAgICAgIGh0bWwgPSByZW5kZXIuaHRtbCA/IHJlbmRlci5odG1sIDogaHRtbDtcbiAgICAgICAgICAgICAgICBjbGFzc2VzICs9IHJlbmRlci5jbGFzc2VzID8gJyAnICsgcmVuZGVyLmNsYXNzZXMgOiAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoZHAuaXNTYW1lKG1pblJhbmdlLCBkYXRlLCB0eXBlKSkgY2xhc3NlcyArPSAnIC1yYW5nZS1mcm9tLSc7XG4gICAgICAgICAgICAgICAgaWYgKGRwLmlzU2FtZShtYXhSYW5nZSwgZGF0ZSwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtcmFuZ2UtdG8tJztcblxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT0gMSAmJiBwYXJlbnQuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAoZHAuYmlnZ2VyKG1pblJhbmdlLCBkYXRlKSAmJiBkcC5sZXNzKHBhcmVudC5mb2N1c2VkLCBkYXRlKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChkcC5sZXNzKG1heFJhbmdlLCBkYXRlKSAmJiBkcC5iaWdnZXIocGFyZW50LmZvY3VzZWQsIGRhdGUpKSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIC1pbi1yYW5nZS0nXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZHAubGVzcyhtYXhSYW5nZSwgZGF0ZSkgJiYgZHAuaXNTYW1lKHBhcmVudC5mb2N1c2VkLCBkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIC1yYW5nZS1mcm9tLSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZHAuYmlnZ2VyKG1pblJhbmdlLCBkYXRlKSAmJiBkcC5pc1NhbWUocGFyZW50LmZvY3VzZWQsIGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzICs9ICcgLXJhbmdlLXRvLSdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnQuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHAuYmlnZ2VyKG1pblJhbmdlLCBkYXRlKSAmJiBkcC5sZXNzKG1heFJhbmdlLCBkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIC1pbi1yYW5nZS0nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKGRwLmlzU2FtZShjdXJyZW50RGF0ZSwgZGF0ZSwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtY3VycmVudC0nO1xuICAgICAgICAgICAgaWYgKHBhcmVudC5mb2N1c2VkICYmIGRwLmlzU2FtZShkYXRlLCBwYXJlbnQuZm9jdXNlZCwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtZm9jdXMtJztcbiAgICAgICAgICAgIGlmIChwYXJlbnQuX2lzU2VsZWN0ZWQoZGF0ZSwgdHlwZSkpIGNsYXNzZXMgKz0gJyAtc2VsZWN0ZWQtJztcbiAgICAgICAgICAgIGlmICghcGFyZW50Ll9pc0luUmFuZ2UoZGF0ZSwgdHlwZSkgfHwgcmVuZGVyLmRpc2FibGVkKSBjbGFzc2VzICs9ICcgLWRpc2FibGVkLSc7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaHRtbDogaHRtbCxcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiBjbGFzc2VzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbGN1bGF0ZXMgZGF5cyBudW1iZXIgdG8gcmVuZGVyLiBHZW5lcmF0ZXMgZGF5cyBodG1sIGFuZCByZXR1cm5zIGl0LlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0ZSAtIERhdGUgb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfZ2V0RGF5c0h0bWw6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgdG90YWxNb250aERheXMgPSBkcC5nZXREYXlzQ291bnQoZGF0ZSksXG4gICAgICAgICAgICAgICAgZmlyc3RNb250aERheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBsYXN0TW9udGhEYXkgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgdG90YWxNb250aERheXMpLmdldERheSgpLFxuICAgICAgICAgICAgICAgIGRheXNGcm9tUGV2TW9udGggPSBmaXJzdE1vbnRoRGF5IC0gdGhpcy5kLmxvYy5maXJzdERheSxcbiAgICAgICAgICAgICAgICBkYXlzRnJvbU5leHRNb250aCA9IDYgLSBsYXN0TW9udGhEYXkgKyB0aGlzLmQubG9jLmZpcnN0RGF5O1xuXG4gICAgICAgICAgICBkYXlzRnJvbVBldk1vbnRoID0gZGF5c0Zyb21QZXZNb250aCA8IDAgPyBkYXlzRnJvbVBldk1vbnRoICsgNyA6IGRheXNGcm9tUGV2TW9udGg7XG4gICAgICAgICAgICBkYXlzRnJvbU5leHRNb250aCA9IGRheXNGcm9tTmV4dE1vbnRoID4gNiA/IGRheXNGcm9tTmV4dE1vbnRoIC0gNyA6IGRheXNGcm9tTmV4dE1vbnRoO1xuXG4gICAgICAgICAgICB2YXIgc3RhcnREYXlJbmRleCA9IC1kYXlzRnJvbVBldk1vbnRoICsgMSxcbiAgICAgICAgICAgICAgICBtLCB5LFxuICAgICAgICAgICAgICAgIGh0bWwgPSAnJztcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0RGF5SW5kZXgsIG1heCA9IHRvdGFsTW9udGhEYXlzICsgZGF5c0Zyb21OZXh0TW9udGg7IGkgPD0gbWF4OyBpKyspIHtcbiAgICAgICAgICAgICAgICB5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIG0gPSBkYXRlLmdldE1vbnRoKCk7XG5cbiAgICAgICAgICAgICAgICBodG1sICs9IHRoaXMuX2dldERheUh0bWwobmV3IERhdGUoeSwgbSwgaSkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXREYXlIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuX2dldENlbGxDb250ZW50cyhkYXRlLCAnZGF5Jyk7XG5cbiAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyBjb250ZW50LmNsYXNzZXMgKyAnXCIgJyArXG4gICAgICAgICAgICAgICAgJ2RhdGEtZGF0ZT1cIicgKyBkYXRlLmdldERhdGUoKSArICdcIiAnICtcbiAgICAgICAgICAgICAgICAnZGF0YS1tb250aD1cIicgKyBkYXRlLmdldE1vbnRoKCkgKyAnXCIgJyArXG4gICAgICAgICAgICAgICAgJ2RhdGEteWVhcj1cIicgKyBkYXRlLmdldEZ1bGxZZWFyKCkgKyAnXCI+JyArIGNvbnRlbnQuaHRtbCArICc8L2Rpdj4nO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZW5lcmF0ZXMgbW9udGhzIGh0bWxcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGUgLSBkYXRlIGluc3RhbmNlXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfZ2V0TW9udGhzSHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBodG1sID0gJycsXG4gICAgICAgICAgICAgICAgZCA9IGRwLmdldFBhcnNlZERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlKGkgPCAxMikge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gdGhpcy5fZ2V0TW9udGhIdG1sKG5ldyBEYXRlKGQueWVhciwgaSkpO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0TW9udGhIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9nZXRDZWxsQ29udGVudHMoZGF0ZSwgJ21vbnRoJyk7XG5cbiAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyBjb250ZW50LmNsYXNzZXMgKyAnXCIgZGF0YS1tb250aD1cIicgKyBkYXRlLmdldE1vbnRoKCkgKyAnXCI+JyArIGNvbnRlbnQuaHRtbCArICc8L2Rpdj4nXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFllYXJzSHRtbDogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBkID0gZHAuZ2V0UGFyc2VkRGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICBkZWNhZGUgPSBkcC5nZXREZWNhZGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgZmlyc3RZZWFyID0gZGVjYWRlWzBdIC0gMSxcbiAgICAgICAgICAgICAgICBodG1sID0gJycsXG4gICAgICAgICAgICAgICAgaSA9IGZpcnN0WWVhcjtcblxuICAgICAgICAgICAgZm9yIChpOyBpIDw9IGRlY2FkZVsxXSArIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gdGhpcy5fZ2V0WWVhckh0bWwobmV3IERhdGUoaSAsIDApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFllYXJIdG1sOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9nZXRDZWxsQ29udGVudHMoZGF0ZSwgJ3llYXInKTtcblxuICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiJyArIGNvbnRlbnQuY2xhc3NlcyArICdcIiBkYXRhLXllYXI9XCInICsgZGF0ZS5nZXRGdWxsWWVhcigpICsgJ1wiPicgKyBjb250ZW50Lmh0bWwgKyAnPC9kaXY+J1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXJUeXBlczoge1xuICAgICAgICAgICAgZGF5czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXlOYW1lcyA9IHRoaXMuX2dldERheU5hbWVzSHRtbCh0aGlzLmQubG9jLmZpcnN0RGF5KSxcbiAgICAgICAgICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2dldERheXNIdG1sKHRoaXMuZC5jdXJyZW50RGF0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRjZWxscy5odG1sKGRheXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5hbWVzLmh0bWwoZGF5TmFtZXMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW9udGhzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGh0bWwgPSB0aGlzLl9nZXRNb250aHNIdG1sKHRoaXMuZC5jdXJyZW50RGF0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRjZWxscy5odG1sKGh0bWwpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeWVhcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCA9IHRoaXMuX2dldFllYXJzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kY2VsbHMuaHRtbChodG1sKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub25seVRpbWVwaWNrZXIpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlclR5cGVzW3RoaXMudHlwZV0uYmluZCh0aGlzKSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkY2VsbHMgPSAkKCcuZGF0ZXBpY2tlci0tY2VsbCcsIHRoaXMuJGNlbGxzKSxcbiAgICAgICAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICAkY2VsbCxcbiAgICAgICAgICAgICAgICBkYXRlO1xuICAgICAgICAgICAgJGNlbGxzLmVhY2goZnVuY3Rpb24gKGNlbGwsIGkpIHtcbiAgICAgICAgICAgICAgICAkY2VsbCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IF90aGlzLmQuX2dldERhdGVGcm9tQ2VsbCgkKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gX3RoaXMuX2dldENlbGxDb250ZW50cyhkYXRlLCBfdGhpcy5kLmNlbGxUeXBlKTtcbiAgICAgICAgICAgICAgICAkY2VsbC5hdHRyKCdjbGFzcycsY2xhc3Nlcy5jbGFzc2VzKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcikgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5hY2l0dmUgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gIEV2ZW50c1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgX2hhbmRsZUNsaWNrOiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gZWwuZGF0YSgnZGF0ZScpIHx8IDEsXG4gICAgICAgICAgICAgICAgbW9udGggPSBlbC5kYXRhKCdtb250aCcpIHx8IDAsXG4gICAgICAgICAgICAgICAgeWVhciA9IGVsLmRhdGEoJ3llYXInKSB8fCB0aGlzLmQucGFyc2VkRGF0ZS55ZWFyLFxuICAgICAgICAgICAgICAgIGRwID0gdGhpcy5kO1xuICAgICAgICAgICAgLy8gQ2hhbmdlIHZpZXcgaWYgbWluIHZpZXcgZG9lcyBub3QgcmVhY2ggeWV0XG4gICAgICAgICAgICBpZiAoZHAudmlldyAhPSB0aGlzLm9wdHMubWluVmlldykge1xuICAgICAgICAgICAgICAgIGRwLmRvd24obmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTZWxlY3QgZGF0ZSBpZiBtaW4gdmlldyBpcyByZWFjaGVkXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWREYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUpLFxuICAgICAgICAgICAgICAgIGFscmVhZHlTZWxlY3RlZCA9IHRoaXMuZC5faXNTZWxlY3RlZChzZWxlY3RlZERhdGUsIHRoaXMuZC5jZWxsVHlwZSk7XG5cbiAgICAgICAgICAgIGlmICghYWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgZHAuX3RyaWdnZXIoJ2NsaWNrQ2VsbCcsIHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkcC5faGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXMuYmluZChkcCwgYWxyZWFkeVNlbGVjdGVkLCBzZWxlY3RlZERhdGUpKCk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBfb25DbGlja0NlbGw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJGVsID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmRhdGVwaWNrZXItLWNlbGwnKTtcblxuICAgICAgICAgICAgaWYgKCRlbC5oYXNDbGFzcygnLWRpc2FibGVkLScpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcykoJGVsKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuXG47KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSAnJyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LWFjdGlvblwiIGRhdGEtYWN0aW9uPVwicHJldlwiPiN7cHJldkh0bWx9PC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LXRpdGxlXCI+I3t0aXRsZX08L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXYtYWN0aW9uXCIgZGF0YS1hY3Rpb249XCJuZXh0XCI+I3tuZXh0SHRtbH08L2Rpdj4nLFxuICAgICAgICBidXR0b25zQ29udGFpbmVyVGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWJ1dHRvbnNcIj48L2Rpdj4nLFxuICAgICAgICBidXR0b24gPSAnPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS1idXR0b25cIiBkYXRhLWFjdGlvbj1cIiN7YWN0aW9ufVwiPiN7bGFiZWx9PC9zcGFuPicsXG4gICAgICAgIGRhdGVwaWNrZXIgPSAkLmZuLmRhdGVwaWNrZXIsXG4gICAgICAgIGRwID0gZGF0ZXBpY2tlci5Db25zdHJ1Y3RvcjtcblxuICAgIGRhdGVwaWNrZXIuTmF2aWdhdGlvbiA9IGZ1bmN0aW9uIChkLCBvcHRzKSB7XG4gICAgICAgIHRoaXMuZCA9IGQ7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG5cbiAgICAgICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lciA9ICcnO1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH07XG5cbiAgICBkYXRlcGlja2VyLk5hdmlnYXRpb24ucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9idWlsZEJhc2VIdG1sKCk7XG4gICAgICAgICAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2JpbmRFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZC4kbmF2Lm9uKCdjbGljaycsICcuZGF0ZXBpY2tlci0tbmF2LWFjdGlvbicsICQucHJveHkodGhpcy5fb25DbGlja05hdkJ1dHRvbiwgdGhpcykpO1xuICAgICAgICAgICAgdGhpcy5kLiRuYXYub24oJ2NsaWNrJywgJy5kYXRlcGlja2VyLS1uYXYtdGl0bGUnLCAkLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZUaXRsZSwgdGhpcykpO1xuICAgICAgICAgICAgdGhpcy5kLiRkYXRlcGlja2VyLm9uKCdjbGljaycsICcuZGF0ZXBpY2tlci0tYnV0dG9uJywgJC5wcm94eSh0aGlzLl9vbkNsaWNrTmF2QnV0dG9uLCB0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkQmFzZUh0bWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hZGRCdXR0b25zSWZOZWVkKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FkZEJ1dHRvbnNJZk5lZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudG9kYXlCdXR0b24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRCdXR0b24oJ3RvZGF5JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY2xlYXJCdXR0b24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRCdXR0b24oJ2NsZWFyJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLl9nZXRUaXRsZSh0aGlzLmQuY3VycmVudERhdGUpLFxuICAgICAgICAgICAgICAgIGh0bWwgPSBkcC50ZW1wbGF0ZSh0ZW1wbGF0ZSwgJC5leHRlbmQoe3RpdGxlOiB0aXRsZX0sIHRoaXMub3B0cykpO1xuICAgICAgICAgICAgdGhpcy5kLiRuYXYuaHRtbChodG1sKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmQudmlldyA9PSAneWVhcnMnKSB7XG4gICAgICAgICAgICAgICAgJCgnLmRhdGVwaWNrZXItLW5hdi10aXRsZScsIHRoaXMuZC4kbmF2KS5hZGRDbGFzcygnLWRpc2FibGVkLScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXROYXZTdGF0dXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0VGl0bGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kLmZvcm1hdERhdGUodGhpcy5vcHRzLm5hdlRpdGxlc1t0aGlzLmQudmlld10sIGRhdGUpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FkZEJ1dHRvbjogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy4kYnV0dG9uc0NvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRCdXR0b25zQ29udGFpbmVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLmQubG9jW3R5cGVdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBodG1sID0gZHAudGVtcGxhdGUoYnV0dG9uLCBkYXRhKTtcblxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWFjdGlvbj0nICsgdHlwZSArICddJywgdGhpcy4kYnV0dG9uc0NvbnRhaW5lcikubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyLmFwcGVuZChodG1sKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYWRkQnV0dG9uc0NvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kLiRkYXRlcGlja2VyLmFwcGVuZChidXR0b25zQ29udGFpbmVyVGVtcGxhdGUpO1xuICAgICAgICAgICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lciA9ICQoJy5kYXRlcGlja2VyLS1idXR0b25zJywgdGhpcy5kLiRkYXRlcGlja2VyKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXROYXZTdGF0dXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMub3B0cy5taW5EYXRlIHx8IHRoaXMub3B0cy5tYXhEYXRlKSB8fCAhdGhpcy5vcHRzLmRpc2FibGVOYXZXaGVuT3V0T2ZSYW5nZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuZC5wYXJzZWREYXRlLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLm1vbnRoLFxuICAgICAgICAgICAgICAgIHkgPSBkYXRlLnllYXIsXG4gICAgICAgICAgICAgICAgZCA9IGRhdGUuZGF0ZTtcblxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmQudmlldykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKHksIG0tMSwgMSksICdtb250aCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlTmF2KCdwcmV2JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKHksIG0rMSwgMSksICdtb250aCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlTmF2KCduZXh0JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKHktMSwgbSwgZCksICd5ZWFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVOYXYoJ3ByZXYnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoeSsxLCBtLCBkKSwgJ3llYXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdignbmV4dCcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVjYWRlID0gZHAuZ2V0RGVjYWRlKHRoaXMuZC5kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShkZWNhZGVbMF0gLSAxLCAwLCAxKSwgJ3llYXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdigncHJldicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShkZWNhZGVbMV0gKyAxLCAwLCAxKSwgJ3llYXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZU5hdignbmV4dCcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2Rpc2FibGVOYXY6IGZ1bmN0aW9uIChuYXYpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLWFjdGlvbj1cIicgKyBuYXYgKyAnXCJdJywgdGhpcy5kLiRuYXYpLmFkZENsYXNzKCctZGlzYWJsZWQtJylcbiAgICAgICAgfSxcblxuICAgICAgICBfYWN0aXZhdGVOYXY6IGZ1bmN0aW9uIChuYXYpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLWFjdGlvbj1cIicgKyBuYXYgKyAnXCJdJywgdGhpcy5kLiRuYXYpLnJlbW92ZUNsYXNzKCctZGlzYWJsZWQtJylcbiAgICAgICAgfSxcblxuICAgICAgICBfb25DbGlja05hdkJ1dHRvbjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciAkZWwgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1hY3Rpb25dJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gJGVsLmRhdGEoJ2FjdGlvbicpO1xuXG4gICAgICAgICAgICB0aGlzLmRbYWN0aW9uXSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkNsaWNrTmF2VGl0bGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJy1kaXNhYmxlZC0nKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kLnZpZXcgPT0gJ2RheXMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZC52aWV3ID0gJ21vbnRocydcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kLnZpZXcgPSAneWVhcnMnO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuXG47KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWVcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnRcIj4nICtcbiAgICAgICAgJyAgIDxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWhvdXJzXCI+I3tob3VyVmlzaWJsZX08L3NwYW4+JyArXG4gICAgICAgICcgICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1jb2xvblwiPjo8L3NwYW4+JyArXG4gICAgICAgICcgICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1taW51dGVzXCI+I3ttaW5WYWx1ZX08L3NwYW4+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXNsaWRlcnNcIj4nICtcbiAgICAgICAgJyAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXJvd1wiPicgK1xuICAgICAgICAnICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG5hbWU9XCJob3Vyc1wiIHZhbHVlPVwiI3tob3VyVmFsdWV9XCIgbWluPVwiI3tob3VyTWlufVwiIG1heD1cIiN7aG91ck1heH1cIiBzdGVwPVwiI3tob3VyU3RlcH1cIi8+JyArXG4gICAgICAgICcgICA8L2Rpdj4nICtcbiAgICAgICAgJyAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXJvd1wiPicgK1xuICAgICAgICAnICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG5hbWU9XCJtaW51dGVzXCIgdmFsdWU9XCIje21pblZhbHVlfVwiIG1pbj1cIiN7bWluTWlufVwiIG1heD1cIiN7bWluTWF4fVwiIHN0ZXA9XCIje21pblN0ZXB9XCIvPicgK1xuICAgICAgICAnICAgPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgIGRhdGVwaWNrZXIgPSAkLmZuLmRhdGVwaWNrZXIsXG4gICAgICAgIGRwID0gZGF0ZXBpY2tlci5Db25zdHJ1Y3RvcjtcblxuICAgIGRhdGVwaWNrZXIuVGltZXBpY2tlciA9IGZ1bmN0aW9uIChpbnN0LCBvcHRzKSB7XG4gICAgICAgIHRoaXMuZCA9IGluc3Q7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfTtcblxuICAgIGRhdGVwaWNrZXIuVGltZXBpY2tlci5wcm90b3R5cGUgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICdpbnB1dCc7XG4gICAgICAgICAgICB0aGlzLl9zZXRUaW1lKHRoaXMuZC5kYXRlKTtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkSFRNTCgpO1xuXG4gICAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC9naSkpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9ICdjaGFuZ2UnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmQuJGVsLm9uKCdzZWxlY3REYXRlJywgdGhpcy5fb25TZWxlY3REYXRlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2VzLm9uKGlucHV0LCB0aGlzLl9vbkNoYW5nZVJhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2VzLm9uKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwUmFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLiRyYW5nZXMub24oJ21vdXNlbW92ZSBmb2N1cyAnLCB0aGlzLl9vbk1vdXNlRW50ZXJSYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuJHJhbmdlcy5vbignbW91c2VvdXQgYmx1cicsIHRoaXMuX29uTW91c2VPdXRSYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfc2V0VGltZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBfZGF0ZSA9IGRwLmdldFBhcnNlZERhdGUoZGF0ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZURhdGUoZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmhvdXJzID0gX2RhdGUuaG91cnMgPCB0aGlzLm1pbkhvdXJzID8gdGhpcy5taW5Ib3VycyA6IF9kYXRlLmhvdXJzO1xuICAgICAgICAgICAgdGhpcy5taW51dGVzID0gX2RhdGUubWludXRlcyA8IHRoaXMubWluTWludXRlcyA/IHRoaXMubWluTWludXRlcyA6IF9kYXRlLm1pbnV0ZXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgbWluSG91cnMgYW5kIG1pbk1pbnV0ZXMgZnJvbSBkYXRlICh1c3VhbGx5IGl0J3MgYSBtaW5EYXRlKVxuICAgICAgICAgKiBBbHNvIGNoYW5nZXMgbWluTWludXRlcyBpZiBjdXJyZW50IGhvdXJzIGFyZSBiaWdnZXIgdGhlbiBAZGF0ZSBob3Vyc1xuICAgICAgICAgKiBAcGFyYW0gZGF0ZSB7RGF0ZX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9zZXRNaW5UaW1lRnJvbURhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1pbkhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICAgICAgdGhpcy5taW5NaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG5cbiAgICAgICAgICAgIC8vIElmLCBmb3IgZXhhbXBsZSwgbWluIGhvdXJzIGFyZSAxMCwgYW5kIGN1cnJlbnQgaG91cnMgYXJlIDEyLFxuICAgICAgICAgICAgLy8gdXBkYXRlIG1pbk1pbnV0ZXMgdG8gZGVmYXVsdCB2YWx1ZSwgdG8gYmUgYWJsZSB0byBjaG9vc2Ugd2hvbGUgcmFuZ2Ugb2YgdmFsdWVzXG4gICAgICAgICAgICBpZiAodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUuZ2V0SG91cnMoKSA+IGRhdGUuZ2V0SG91cnMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbk1pbnV0ZXMgPSB0aGlzLm9wdHMubWluTWludXRlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldE1heFRpbWVGcm9tRGF0ZTogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMubWF4SG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgICAgICB0aGlzLm1heE1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlLmdldEhvdXJzKCkgPCBkYXRlLmdldEhvdXJzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhNaW51dGVzID0gdGhpcy5vcHRzLm1heE1pbnV0ZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9zZXREZWZhdWx0TWluTWF4VGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1heEhvdXJzID0gMjMsXG4gICAgICAgICAgICAgICAgbWF4TWludXRlcyA9IDU5LFxuICAgICAgICAgICAgICAgIG9wdHMgPSB0aGlzLm9wdHM7XG5cbiAgICAgICAgICAgIHRoaXMubWluSG91cnMgPSBvcHRzLm1pbkhvdXJzIDwgMCB8fCBvcHRzLm1pbkhvdXJzID4gbWF4SG91cnMgPyAwIDogb3B0cy5taW5Ib3VycztcbiAgICAgICAgICAgIHRoaXMubWluTWludXRlcyA9IG9wdHMubWluTWludXRlcyA8IDAgfHwgb3B0cy5taW5NaW51dGVzID4gbWF4TWludXRlcyA/IDAgOiBvcHRzLm1pbk1pbnV0ZXM7XG4gICAgICAgICAgICB0aGlzLm1heEhvdXJzID0gb3B0cy5tYXhIb3VycyA8IDAgfHwgb3B0cy5tYXhIb3VycyA+IG1heEhvdXJzID8gbWF4SG91cnMgOiBvcHRzLm1heEhvdXJzO1xuICAgICAgICAgICAgdGhpcy5tYXhNaW51dGVzID0gb3B0cy5tYXhNaW51dGVzIDwgMCB8fCBvcHRzLm1heE1pbnV0ZXMgPiBtYXhNaW51dGVzID8gbWF4TWludXRlcyA6IG9wdHMubWF4TWludXRlcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogTG9va3MgZm9yIG1pbi9tYXggaG91cnMvbWludXRlcyBhbmQgaWYgY3VycmVudCB2YWx1ZXNcbiAgICAgICAgICogYXJlIG91dCBvZiByYW5nZSBzZXRzIHZhbGlkIHZhbHVlcy5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF92YWxpZGF0ZUhvdXJzTWludXRlczogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJzIDwgdGhpcy5taW5Ib3Vycykge1xuICAgICAgICAgICAgICAgIHRoaXMuaG91cnMgPSB0aGlzLm1pbkhvdXJzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhvdXJzID4gdGhpcy5tYXhIb3Vycykge1xuICAgICAgICAgICAgICAgIHRoaXMuaG91cnMgPSB0aGlzLm1heEhvdXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5taW51dGVzIDwgdGhpcy5taW5NaW51dGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5taW5NaW51dGVzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1pbnV0ZXMgPiB0aGlzLm1heE1pbnV0ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLm1heE1pbnV0ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2J1aWxkSFRNTDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGx6ID0gZHAuZ2V0TGVhZGluZ1plcm9OdW0sXG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaG91ck1pbjogdGhpcy5taW5Ib3VycyxcbiAgICAgICAgICAgICAgICAgICAgaG91ck1heDogbHoodGhpcy5tYXhIb3VycyksXG4gICAgICAgICAgICAgICAgICAgIGhvdXJTdGVwOiB0aGlzLm9wdHMuaG91cnNTdGVwLFxuICAgICAgICAgICAgICAgICAgICBob3VyVmFsdWU6IHRoaXMuaG91cnMsXG4gICAgICAgICAgICAgICAgICAgIGhvdXJWaXNpYmxlOiBseih0aGlzLmRpc3BsYXlIb3VycyksXG4gICAgICAgICAgICAgICAgICAgIG1pbk1pbjogdGhpcy5taW5NaW51dGVzLFxuICAgICAgICAgICAgICAgICAgICBtaW5NYXg6IGx6KHRoaXMubWF4TWludXRlcyksXG4gICAgICAgICAgICAgICAgICAgIG1pblN0ZXA6IHRoaXMub3B0cy5taW51dGVzU3RlcCxcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IGx6KHRoaXMubWludXRlcylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF90ZW1wbGF0ZSA9IGRwLnRlbXBsYXRlKHRlbXBsYXRlLCBkYXRhKTtcblxuICAgICAgICAgICAgdGhpcy4kdGltZXBpY2tlciA9ICQoX3RlbXBsYXRlKS5hcHBlbmRUbyh0aGlzLmQuJGRhdGVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2VzID0gJCgnW3R5cGU9XCJyYW5nZVwiXScsIHRoaXMuJHRpbWVwaWNrZXIpO1xuICAgICAgICAgICAgdGhpcy4kaG91cnMgPSAkKCdbbmFtZT1cImhvdXJzXCJdJywgdGhpcy4kdGltZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRtaW51dGVzID0gJCgnW25hbWU9XCJtaW51dGVzXCJdJywgdGhpcy4kdGltZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRob3Vyc1RleHQgPSAkKCcuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWhvdXJzJywgdGhpcy4kdGltZXBpY2tlcik7XG4gICAgICAgICAgICB0aGlzLiRtaW51dGVzVGV4dCA9ICQoJy5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtbWludXRlcycsIHRoaXMuJHRpbWVwaWNrZXIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kLmFtcG0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRhbXBtID0gJCgnPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtYW1wbVwiPicpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKCcuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50JywgdGhpcy4kdGltZXBpY2tlcikpXG4gICAgICAgICAgICAgICAgICAgIC5odG1sKHRoaXMuZGF5UGVyaW9kKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVwaWNrZXIuYWRkQ2xhc3MoJy1hbS1wbS0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdXBkYXRlQ3VycmVudFRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBoID0gIGRwLmdldExlYWRpbmdaZXJvTnVtKHRoaXMuZGlzcGxheUhvdXJzKSxcbiAgICAgICAgICAgICAgICBtID0gZHAuZ2V0TGVhZGluZ1plcm9OdW0odGhpcy5taW51dGVzKTtcblxuICAgICAgICAgICAgdGhpcy4kaG91cnNUZXh0Lmh0bWwoaCk7XG4gICAgICAgICAgICB0aGlzLiRtaW51dGVzVGV4dC5odG1sKG0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kLmFtcG0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRhbXBtLmh0bWwodGhpcy5kYXlQZXJpb2QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF91cGRhdGVSYW5nZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGhvdXJzLmF0dHIoe1xuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5Ib3VycyxcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4SG91cnNcbiAgICAgICAgICAgIH0pLnZhbCh0aGlzLmhvdXJzKTtcblxuICAgICAgICAgICAgdGhpcy4kbWludXRlcy5hdHRyKHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluTWludXRlcyxcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4TWludXRlc1xuICAgICAgICAgICAgfSkudmFsKHRoaXMubWludXRlcylcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyBtaW5Ib3VycywgbWluTWludXRlcyBldGMuIGZyb20gZGF0ZS4gSWYgZGF0ZSBpcyBub3QgcGFzc2VkLCB0aGFuIHNldHNcbiAgICAgICAgICogdmFsdWVzIGZyb20gb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0gW2RhdGVdIHtvYmplY3R9IC0gRGF0ZSBvYmplY3QsIHRvIGdldCB2YWx1ZXMgZnJvbVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2hhbmRsZURhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXREZWZhdWx0TWluTWF4VGltZSgpO1xuICAgICAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZHAuaXNTYW1lKGRhdGUsIHRoaXMuZC5vcHRzLm1pbkRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldE1pblRpbWVGcm9tRGF0ZSh0aGlzLmQub3B0cy5taW5EYXRlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRwLmlzU2FtZShkYXRlLCB0aGlzLmQub3B0cy5tYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRNYXhUaW1lRnJvbURhdGUodGhpcy5kLm9wdHMubWF4RGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUhvdXJzTWludXRlcyhkYXRlKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ3VycmVudFRpbWUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsY3VsYXRlcyB2YWxpZCBob3VyIHZhbHVlIHRvIGRpc3BsYXkgaW4gdGV4dCBpbnB1dCBhbmQgZGF0ZXBpY2tlcidzIGJvZHkuXG4gICAgICAgICAqIEBwYXJhbSBkYXRlIHtEYXRlfE51bWJlcn0gLSBkYXRlIG9yIGhvdXJzXG4gICAgICAgICAqIEBwYXJhbSBbYW1wbV0ge0Jvb2xlYW59IC0gMTIgaG91cnMgbW9kZVxuICAgICAgICAgKiBAcmV0dXJucyB7e2hvdXJzOiAqLCBkYXlQZXJpb2Q6IHN0cmluZ319XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlOiBmdW5jdGlvbiAoZGF0ZSwgYW1wbSkge1xuICAgICAgICAgICAgdmFyIGQgPSBkYXRlLFxuICAgICAgICAgICAgICAgIGhvdXJzID0gZGF0ZTtcblxuICAgICAgICAgICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgZCA9IGRwLmdldFBhcnNlZERhdGUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgaG91cnMgPSBkLmhvdXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgX2FtcG0gPSBhbXBtIHx8IHRoaXMuZC5hbXBtLFxuICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9ICdhbSc7XG5cbiAgICAgICAgICAgIGlmIChfYW1wbSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgaG91cnMgPT0gMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBob3VycyA9PSAxMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheVBlcmlvZCA9ICdwbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBob3VycyA+IDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgaG91cnMgPSBob3VycyAtIDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5UGVyaW9kID0gJ3BtJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhvdXJzOiBob3VycyxcbiAgICAgICAgICAgICAgICBkYXlQZXJpb2Q6IGRheVBlcmlvZFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBob3VycyAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9ob3VycyA9IHZhbDtcblxuICAgICAgICAgICAgdmFyIGRpc3BsYXlIb3VycyA9IHRoaXMuX2dldFZhbGlkSG91cnNGcm9tRGF0ZSh2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlIb3VycyA9IGRpc3BsYXlIb3Vycy5ob3VycztcbiAgICAgICAgICAgIHRoaXMuZGF5UGVyaW9kID0gZGlzcGxheUhvdXJzLmRheVBlcmlvZDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgaG91cnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faG91cnM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gIEV2ZW50c1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgX29uQ2hhbmdlUmFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoZS50YXJnZXQpLFxuICAgICAgICAgICAgICAgIG5hbWUgPSAkdGFyZ2V0LmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5kLnRpbWVwaWNrZXJJc0FjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSAkdGFyZ2V0LnZhbCgpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ3VycmVudFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMuZC5fdHJpZ2dlcigndGltZUNoYW5nZScsIFt0aGlzLmhvdXJzLCB0aGlzLm1pbnV0ZXNdKTtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlRGF0ZSh0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uU2VsZWN0RGF0ZTogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZURhdGUoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbk1vdXNlRW50ZXJSYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJChlLnRhcmdldCkuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgJCgnLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC0nICsgbmFtZSwgdGhpcy4kdGltZXBpY2tlcikuYWRkQ2xhc3MoJy1mb2N1cy0nKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Nb3VzZU91dFJhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSAkKGUudGFyZ2V0KS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5kLmluRm9jdXMpIHJldHVybjsgLy8gUHJldmVudCByZW1vdmluZyBmb2N1cyB3aGVuIG1vdXNlIG91dCBvZiByYW5nZSBzbGlkZXJcbiAgICAgICAgICAgICQoJy5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtJyArIG5hbWUsIHRoaXMuJHRpbWVwaWNrZXIpLnJlbW92ZUNsYXNzKCctZm9jdXMtJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uTW91c2VVcFJhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdGhpcy5kLnRpbWVwaWNrZXJJc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4gfSkod2luZG93LCBqUXVlcnkpOyIsIiFmdW5jdGlvbih0LGUsaSl7IWZ1bmN0aW9uKCl7dmFyIHMsYSxuLGg9XCIyLjIuM1wiLG89XCJkYXRlcGlja2VyXCIscj1cIi5kYXRlcGlja2VyLWhlcmVcIixjPSExLGQ9JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyXCI+PGkgY2xhc3M9XCJkYXRlcGlja2VyLS1wb2ludGVyXCI+PC9pPjxuYXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXZcIj48L25hdj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY29udGVudFwiPjwvZGl2PjwvZGl2PicsbD17Y2xhc3NlczpcIlwiLGlubGluZTohMSxsYW5ndWFnZTpcInJ1XCIsc3RhcnREYXRlOm5ldyBEYXRlLGZpcnN0RGF5OlwiXCIsd2Vla2VuZHM6WzYsMF0sZGF0ZUZvcm1hdDpcIlwiLGFsdEZpZWxkOlwiXCIsYWx0RmllbGREYXRlRm9ybWF0OlwiQFwiLHRvZ2dsZVNlbGVjdGVkOiEwLGtleWJvYXJkTmF2OiEwLHBvc2l0aW9uOlwiYm90dG9tIGxlZnRcIixvZmZzZXQ6MTIsdmlldzpcImRheXNcIixtaW5WaWV3OlwiZGF5c1wiLHNob3dPdGhlck1vbnRoczohMCxzZWxlY3RPdGhlck1vbnRoczohMCxtb3ZlVG9PdGhlck1vbnRoc09uU2VsZWN0OiEwLHNob3dPdGhlclllYXJzOiEwLHNlbGVjdE90aGVyWWVhcnM6ITAsbW92ZVRvT3RoZXJZZWFyc09uU2VsZWN0OiEwLG1pbkRhdGU6XCJcIixtYXhEYXRlOlwiXCIsZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlOiEwLG11bHRpcGxlRGF0ZXM6ITEsbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjpcIixcIixyYW5nZTohMSx0b2RheUJ1dHRvbjohMSxjbGVhckJ1dHRvbjohMSxzaG93RXZlbnQ6XCJmb2N1c1wiLGF1dG9DbG9zZTohMSxtb250aHNGaWVsZDpcIm1vbnRoc1Nob3J0XCIscHJldkh0bWw6JzxzdmcgY2xhc3M9XCJzdmctYmFja1wiPjwvc3ZnPicsbmV4dEh0bWw6JzxzdmcgY2xhc3M9XCJzdmctbmV4dFwiPjwvc3ZnPicsbmF2VGl0bGVzOntkYXlzOlwiTU0gPGk+eXl5eTwvaT5cIixtb250aHM6XCJ5eXl5XCIseWVhcnM6XCJ5eXl5MSAtIHl5eXkyXCJ9LHRpbWVwaWNrZXI6ITEsb25seVRpbWVwaWNrZXI6ITEsZGF0ZVRpbWVTZXBhcmF0b3I6XCIgXCIsdGltZUZvcm1hdDpcIlwiLG1pbkhvdXJzOjAsbWF4SG91cnM6MjQsbWluTWludXRlczowLG1heE1pbnV0ZXM6NTksaG91cnNTdGVwOjEsbWludXRlc1N0ZXA6MSxvblNlbGVjdDpcIlwiLG9uU2hvdzpcIlwiLG9uSGlkZTpcIlwiLG9uQ2hhbmdlTW9udGg6XCJcIixvbkNoYW5nZVllYXI6XCJcIixvbkNoYW5nZURlY2FkZTpcIlwiLG9uQ2hhbmdlVmlldzpcIlwiLG9uUmVuZGVyQ2VsbDpcIlwifSx1PXtjdHJsUmlnaHQ6WzE3LDM5XSxjdHJsVXA6WzE3LDM4XSxjdHJsTGVmdDpbMTcsMzddLGN0cmxEb3duOlsxNyw0MF0sc2hpZnRSaWdodDpbMTYsMzldLHNoaWZ0VXA6WzE2LDM4XSxzaGlmdExlZnQ6WzE2LDM3XSxzaGlmdERvd246WzE2LDQwXSxhbHRVcDpbMTgsMzhdLGFsdFJpZ2h0OlsxOCwzOV0sYWx0TGVmdDpbMTgsMzddLGFsdERvd246WzE4LDQwXSxjdHJsU2hpZnRVcDpbMTYsMTcsMzhdfSxtPWZ1bmN0aW9uKHQsYSl7dGhpcy5lbD10LHRoaXMuJGVsPWUodCksdGhpcy5vcHRzPWUuZXh0ZW5kKCEwLHt9LGwsYSx0aGlzLiRlbC5kYXRhKCkpLHM9PWkmJihzPWUoXCJib2R5XCIpKSx0aGlzLm9wdHMuc3RhcnREYXRlfHwodGhpcy5vcHRzLnN0YXJ0RGF0ZT1uZXcgRGF0ZSksXCJJTlBVVFwiPT10aGlzLmVsLm5vZGVOYW1lJiYodGhpcy5lbElzSW5wdXQ9ITApLHRoaXMub3B0cy5hbHRGaWVsZCYmKHRoaXMuJGFsdEZpZWxkPVwic3RyaW5nXCI9PXR5cGVvZiB0aGlzLm9wdHMuYWx0RmllbGQ/ZSh0aGlzLm9wdHMuYWx0RmllbGQpOnRoaXMub3B0cy5hbHRGaWVsZCksdGhpcy5pbml0ZWQ9ITEsdGhpcy52aXNpYmxlPSExLHRoaXMuc2lsZW50PSExLHRoaXMuY3VycmVudERhdGU9dGhpcy5vcHRzLnN0YXJ0RGF0ZSx0aGlzLmN1cnJlbnRWaWV3PXRoaXMub3B0cy52aWV3LHRoaXMuX2NyZWF0ZVNob3J0Q3V0cygpLHRoaXMuc2VsZWN0ZWREYXRlcz1bXSx0aGlzLnZpZXdzPXt9LHRoaXMua2V5cz1bXSx0aGlzLm1pblJhbmdlPVwiXCIsdGhpcy5tYXhSYW5nZT1cIlwiLHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlPVwiXCIsdGhpcy5pbml0KCl9O249bSxuLnByb3RvdHlwZT17VkVSU0lPTjpoLHZpZXdJbmRleGVzOltcImRheXNcIixcIm1vbnRoc1wiLFwieWVhcnNcIl0saW5pdDpmdW5jdGlvbigpe2N8fHRoaXMub3B0cy5pbmxpbmV8fCF0aGlzLmVsSXNJbnB1dHx8dGhpcy5fYnVpbGREYXRlcGlja2Vyc0NvbnRhaW5lcigpLHRoaXMuX2J1aWxkQmFzZUh0bWwoKSx0aGlzLl9kZWZpbmVMb2NhbGUodGhpcy5vcHRzLmxhbmd1YWdlKSx0aGlzLl9zeW5jV2l0aE1pbk1heERhdGVzKCksdGhpcy5lbElzSW5wdXQmJih0aGlzLm9wdHMuaW5saW5lfHwodGhpcy5fc2V0UG9zaXRpb25DbGFzc2VzKHRoaXMub3B0cy5wb3NpdGlvbiksdGhpcy5fYmluZEV2ZW50cygpKSx0aGlzLm9wdHMua2V5Ym9hcmROYXYmJiF0aGlzLm9wdHMub25seVRpbWVwaWNrZXImJnRoaXMuX2JpbmRLZXlib2FyZEV2ZW50cygpLHRoaXMuJGRhdGVwaWNrZXIub24oXCJtb3VzZWRvd25cIix0aGlzLl9vbk1vdXNlRG93bkRhdGVwaWNrZXIuYmluZCh0aGlzKSksdGhpcy4kZGF0ZXBpY2tlci5vbihcIm1vdXNldXBcIix0aGlzLl9vbk1vdXNlVXBEYXRlcGlja2VyLmJpbmQodGhpcykpKSx0aGlzLm9wdHMuY2xhc3NlcyYmdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyh0aGlzLm9wdHMuY2xhc3NlcyksdGhpcy5vcHRzLnRpbWVwaWNrZXImJih0aGlzLnRpbWVwaWNrZXI9bmV3IGUuZm4uZGF0ZXBpY2tlci5UaW1lcGlja2VyKHRoaXMsdGhpcy5vcHRzKSx0aGlzLl9iaW5kVGltZXBpY2tlckV2ZW50cygpKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXImJnRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoXCItb25seS10aW1lcGlja2VyLVwiKSx0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddPW5ldyBlLmZuLmRhdGVwaWNrZXIuQm9keSh0aGlzLHRoaXMuY3VycmVudFZpZXcsdGhpcy5vcHRzKSx0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLnNob3coKSx0aGlzLm5hdj1uZXcgZS5mbi5kYXRlcGlja2VyLk5hdmlnYXRpb24odGhpcyx0aGlzLm9wdHMpLHRoaXMudmlldz10aGlzLmN1cnJlbnRWaWV3LHRoaXMuJGVsLm9uKFwiY2xpY2tDZWxsLmFkcFwiLHRoaXMuX29uQ2xpY2tDZWxsLmJpbmQodGhpcykpLHRoaXMuJGRhdGVwaWNrZXIub24oXCJtb3VzZWVudGVyXCIsXCIuZGF0ZXBpY2tlci0tY2VsbFwiLHRoaXMuX29uTW91c2VFbnRlckNlbGwuYmluZCh0aGlzKSksdGhpcy4kZGF0ZXBpY2tlci5vbihcIm1vdXNlbGVhdmVcIixcIi5kYXRlcGlja2VyLS1jZWxsXCIsdGhpcy5fb25Nb3VzZUxlYXZlQ2VsbC5iaW5kKHRoaXMpKSx0aGlzLmluaXRlZD0hMH0sX2NyZWF0ZVNob3J0Q3V0czpmdW5jdGlvbigpe3RoaXMubWluRGF0ZT10aGlzLm9wdHMubWluRGF0ZT90aGlzLm9wdHMubWluRGF0ZTpuZXcgRGF0ZSgtODYzOTk5OTkxMzZlNSksdGhpcy5tYXhEYXRlPXRoaXMub3B0cy5tYXhEYXRlP3RoaXMub3B0cy5tYXhEYXRlOm5ldyBEYXRlKDg2Mzk5OTk5MTM2ZTUpfSxfYmluZEV2ZW50czpmdW5jdGlvbigpe3RoaXMuJGVsLm9uKHRoaXMub3B0cy5zaG93RXZlbnQrXCIuYWRwXCIsdGhpcy5fb25TaG93RXZlbnQuYmluZCh0aGlzKSksdGhpcy4kZWwub24oXCJtb3VzZXVwLmFkcFwiLHRoaXMuX29uTW91c2VVcEVsLmJpbmQodGhpcykpLHRoaXMuJGVsLm9uKFwiYmx1ci5hZHBcIix0aGlzLl9vbkJsdXIuYmluZCh0aGlzKSksdGhpcy4kZWwub24oXCJrZXl1cC5hZHBcIix0aGlzLl9vbktleVVwR2VuZXJhbC5iaW5kKHRoaXMpKSxlKHQpLm9uKFwicmVzaXplLmFkcFwiLHRoaXMuX29uUmVzaXplLmJpbmQodGhpcykpLGUoXCJib2R5XCIpLm9uKFwibW91c2V1cC5hZHBcIix0aGlzLl9vbk1vdXNlVXBCb2R5LmJpbmQodGhpcykpfSxfYmluZEtleWJvYXJkRXZlbnRzOmZ1bmN0aW9uKCl7dGhpcy4kZWwub24oXCJrZXlkb3duLmFkcFwiLHRoaXMuX29uS2V5RG93bi5iaW5kKHRoaXMpKSx0aGlzLiRlbC5vbihcImtleXVwLmFkcFwiLHRoaXMuX29uS2V5VXAuYmluZCh0aGlzKSksdGhpcy4kZWwub24oXCJob3RLZXkuYWRwXCIsdGhpcy5fb25Ib3RLZXkuYmluZCh0aGlzKSl9LF9iaW5kVGltZXBpY2tlckV2ZW50czpmdW5jdGlvbigpe3RoaXMuJGVsLm9uKFwidGltZUNoYW5nZS5hZHBcIix0aGlzLl9vblRpbWVDaGFuZ2UuYmluZCh0aGlzKSl9LGlzV2Vla2VuZDpmdW5jdGlvbih0KXtyZXR1cm4tMSE9PXRoaXMub3B0cy53ZWVrZW5kcy5pbmRleE9mKHQpfSxfZGVmaW5lTG9jYWxlOmZ1bmN0aW9uKHQpe1wic3RyaW5nXCI9PXR5cGVvZiB0Pyh0aGlzLmxvYz1lLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbdF0sdGhpcy5sb2N8fChjb25zb2xlLndhcm4oXCJDYW4ndCBmaW5kIGxhbmd1YWdlIFxcXCJcIit0KydcIiBpbiBEYXRlcGlja2VyLmxhbmd1YWdlLCB3aWxsIHVzZSBcInJ1XCIgaW5zdGVhZCcpLHRoaXMubG9jPWUuZXh0ZW5kKCEwLHt9LGUuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSkpLHRoaXMubG9jPWUuZXh0ZW5kKCEwLHt9LGUuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSxlLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbdF0pKTp0aGlzLmxvYz1lLmV4dGVuZCghMCx7fSxlLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUsdCksdGhpcy5vcHRzLmRhdGVGb3JtYXQmJih0aGlzLmxvYy5kYXRlRm9ybWF0PXRoaXMub3B0cy5kYXRlRm9ybWF0KSx0aGlzLm9wdHMudGltZUZvcm1hdCYmKHRoaXMubG9jLnRpbWVGb3JtYXQ9dGhpcy5vcHRzLnRpbWVGb3JtYXQpLFwiXCIhPT10aGlzLm9wdHMuZmlyc3REYXkmJih0aGlzLmxvYy5maXJzdERheT10aGlzLm9wdHMuZmlyc3REYXkpLHRoaXMub3B0cy50aW1lcGlja2VyJiYodGhpcy5sb2MuZGF0ZUZvcm1hdD1bdGhpcy5sb2MuZGF0ZUZvcm1hdCx0aGlzLmxvYy50aW1lRm9ybWF0XS5qb2luKHRoaXMub3B0cy5kYXRlVGltZVNlcGFyYXRvcikpLHRoaXMub3B0cy5vbmx5VGltZXBpY2tlciYmKHRoaXMubG9jLmRhdGVGb3JtYXQ9dGhpcy5sb2MudGltZUZvcm1hdCk7dmFyIGk9dGhpcy5fZ2V0V29yZEJvdW5kYXJ5UmVnRXhwOyh0aGlzLmxvYy50aW1lRm9ybWF0Lm1hdGNoKGkoXCJhYVwiKSl8fHRoaXMubG9jLnRpbWVGb3JtYXQubWF0Y2goaShcIkFBXCIpKSkmJih0aGlzLmFtcG09ITApfSxfYnVpbGREYXRlcGlja2Vyc0NvbnRhaW5lcjpmdW5jdGlvbigpe2M9ITAscy5hcHBlbmQoJzxkaXYgY2xhc3M9XCJkYXRlcGlja2Vycy1jb250YWluZXJcIiBpZD1cImRhdGVwaWNrZXJzLWNvbnRhaW5lclwiPjwvZGl2PicpLGE9ZShcIiNkYXRlcGlja2Vycy1jb250YWluZXJcIil9LF9idWlsZEJhc2VIdG1sOmZ1bmN0aW9uKCl7dmFyIHQsaT1lKCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1pbmxpbmVcIj4nKTt0PVwiSU5QVVRcIj09dGhpcy5lbC5ub2RlTmFtZT90aGlzLm9wdHMuaW5saW5lP2kuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpOmE6aS5hcHBlbmRUbyh0aGlzLiRlbCksdGhpcy4kZGF0ZXBpY2tlcj1lKGQpLmFwcGVuZFRvKHQpLHRoaXMuJGNvbnRlbnQ9ZShcIi5kYXRlcGlja2VyLS1jb250ZW50XCIsdGhpcy4kZGF0ZXBpY2tlciksdGhpcy4kbmF2PWUoXCIuZGF0ZXBpY2tlci0tbmF2XCIsdGhpcy4kZGF0ZXBpY2tlcil9LF90cmlnZ2VyT25DaGFuZ2U6ZnVuY3Rpb24oKXtpZighdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCl7aWYoXCJcIj09PXRoaXMuX3ByZXZPblNlbGVjdFZhbHVlKXJldHVybjtyZXR1cm4gdGhpcy5fcHJldk9uU2VsZWN0VmFsdWU9XCJcIix0aGlzLm9wdHMub25TZWxlY3QoXCJcIixcIlwiLHRoaXMpfXZhciB0LGU9dGhpcy5zZWxlY3RlZERhdGVzLGk9bi5nZXRQYXJzZWREYXRlKGVbMF0pLHM9dGhpcyxhPW5ldyBEYXRlKGkueWVhcixpLm1vbnRoLGkuZGF0ZSxpLmhvdXJzLGkubWludXRlcyk7dD1lLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gcy5mb3JtYXREYXRlKHMubG9jLmRhdGVGb3JtYXQsdCl9KS5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKSwodGhpcy5vcHRzLm11bHRpcGxlRGF0ZXN8fHRoaXMub3B0cy5yYW5nZSkmJihhPWUubWFwKGZ1bmN0aW9uKHQpe3ZhciBlPW4uZ2V0UGFyc2VkRGF0ZSh0KTtyZXR1cm4gbmV3IERhdGUoZS55ZWFyLGUubW9udGgsZS5kYXRlLGUuaG91cnMsZS5taW51dGVzKX0pKSx0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZT10LHRoaXMub3B0cy5vblNlbGVjdCh0LGEsdGhpcyl9LG5leHQ6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnBhcnNlZERhdGUsZT10aGlzLm9wdHM7c3dpdGNoKHRoaXMudmlldyl7Y2FzZVwiZGF5c1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXIsdC5tb250aCsxLDEpLGUub25DaGFuZ2VNb250aCYmZS5vbkNoYW5nZU1vbnRoKHRoaXMucGFyc2VkRGF0ZS5tb250aCx0aGlzLnBhcnNlZERhdGUueWVhcik7YnJlYWs7Y2FzZVwibW9udGhzXCI6dGhpcy5kYXRlPW5ldyBEYXRlKHQueWVhcisxLHQubW9udGgsMSksZS5vbkNoYW5nZVllYXImJmUub25DaGFuZ2VZZWFyKHRoaXMucGFyc2VkRGF0ZS55ZWFyKTticmVhaztjYXNlXCJ5ZWFyc1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXIrMTAsMCwxKSxlLm9uQ2hhbmdlRGVjYWRlJiZlLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKX19LHByZXY6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnBhcnNlZERhdGUsZT10aGlzLm9wdHM7c3dpdGNoKHRoaXMudmlldyl7Y2FzZVwiZGF5c1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXIsdC5tb250aC0xLDEpLGUub25DaGFuZ2VNb250aCYmZS5vbkNoYW5nZU1vbnRoKHRoaXMucGFyc2VkRGF0ZS5tb250aCx0aGlzLnBhcnNlZERhdGUueWVhcik7YnJlYWs7Y2FzZVwibW9udGhzXCI6dGhpcy5kYXRlPW5ldyBEYXRlKHQueWVhci0xLHQubW9udGgsMSksZS5vbkNoYW5nZVllYXImJmUub25DaGFuZ2VZZWFyKHRoaXMucGFyc2VkRGF0ZS55ZWFyKTticmVhaztjYXNlXCJ5ZWFyc1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXItMTAsMCwxKSxlLm9uQ2hhbmdlRGVjYWRlJiZlLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKX19LGZvcm1hdERhdGU6ZnVuY3Rpb24odCxlKXtlPWV8fHRoaXMuZGF0ZTt2YXIgaSxzPXQsYT10aGlzLl9nZXRXb3JkQm91bmRhcnlSZWdFeHAsaD10aGlzLmxvYyxvPW4uZ2V0TGVhZGluZ1plcm9OdW0scj1uLmdldERlY2FkZShlKSxjPW4uZ2V0UGFyc2VkRGF0ZShlKSxkPWMuZnVsbEhvdXJzLGw9Yy5ob3Vycyx1PXQubWF0Y2goYShcImFhXCIpKXx8dC5tYXRjaChhKFwiQUFcIikpLG09XCJhbVwiLHA9dGhpcy5fcmVwbGFjZXI7c3dpdGNoKHRoaXMub3B0cy50aW1lcGlja2VyJiZ0aGlzLnRpbWVwaWNrZXImJnUmJihpPXRoaXMudGltZXBpY2tlci5fZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlKGUsdSksZD1vKGkuaG91cnMpLGw9aS5ob3VycyxtPWkuZGF5UGVyaW9kKSwhMCl7Y2FzZS9ALy50ZXN0KHMpOnM9cy5yZXBsYWNlKC9ALyxlLmdldFRpbWUoKSk7Y2FzZS9hYS8udGVzdChzKTpzPXAocyxhKFwiYWFcIiksbSk7Y2FzZS9BQS8udGVzdChzKTpzPXAocyxhKFwiQUFcIiksbS50b1VwcGVyQ2FzZSgpKTtjYXNlL2RkLy50ZXN0KHMpOnM9cChzLGEoXCJkZFwiKSxjLmZ1bGxEYXRlKTtjYXNlL2QvLnRlc3Qocyk6cz1wKHMsYShcImRcIiksYy5kYXRlKTtjYXNlL0RELy50ZXN0KHMpOnM9cChzLGEoXCJERFwiKSxoLmRheXNbYy5kYXldKTtjYXNlL0QvLnRlc3Qocyk6cz1wKHMsYShcIkRcIiksaC5kYXlzU2hvcnRbYy5kYXldKTtjYXNlL21tLy50ZXN0KHMpOnM9cChzLGEoXCJtbVwiKSxjLmZ1bGxNb250aCk7Y2FzZS9tLy50ZXN0KHMpOnM9cChzLGEoXCJtXCIpLGMubW9udGgrMSk7Y2FzZS9NTS8udGVzdChzKTpzPXAocyxhKFwiTU1cIiksdGhpcy5sb2MubW9udGhzW2MubW9udGhdKTtjYXNlL00vLnRlc3Qocyk6cz1wKHMsYShcIk1cIiksaC5tb250aHNTaG9ydFtjLm1vbnRoXSk7Y2FzZS9paS8udGVzdChzKTpzPXAocyxhKFwiaWlcIiksYy5mdWxsTWludXRlcyk7Y2FzZS9pLy50ZXN0KHMpOnM9cChzLGEoXCJpXCIpLGMubWludXRlcyk7Y2FzZS9oaC8udGVzdChzKTpzPXAocyxhKFwiaGhcIiksZCk7Y2FzZS9oLy50ZXN0KHMpOnM9cChzLGEoXCJoXCIpLGwpO2Nhc2UveXl5eS8udGVzdChzKTpzPXAocyxhKFwieXl5eVwiKSxjLnllYXIpO2Nhc2UveXl5eTEvLnRlc3Qocyk6cz1wKHMsYShcInl5eXkxXCIpLHJbMF0pO2Nhc2UveXl5eTIvLnRlc3Qocyk6cz1wKHMsYShcInl5eXkyXCIpLHJbMV0pO2Nhc2UveXkvLnRlc3Qocyk6cz1wKHMsYShcInl5XCIpLGMueWVhci50b1N0cmluZygpLnNsaWNlKC0yKSl9cmV0dXJuIHN9LF9yZXBsYWNlcjpmdW5jdGlvbih0LGUsaSl7cmV0dXJuIHQucmVwbGFjZShlLGZ1bmN0aW9uKHQsZSxzLGEpe3JldHVybiBlK2krYX0pfSxfZ2V0V29yZEJvdW5kYXJ5UmVnRXhwOmZ1bmN0aW9uKHQpe3ZhciBlPVwiXFxcXHN8XFxcXC58LXwvfFxcXFxcXFxcfCx8XFxcXCR8XFxcXCF8XFxcXD98Onw7XCI7cmV0dXJuIG5ldyBSZWdFeHAoXCIoXnw+fFwiK2UrXCIpKFwiK3QrXCIpKCR8PHxcIitlK1wiKVwiLFwiZ1wiKX0sc2VsZWN0RGF0ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLGk9ZS5vcHRzLHM9ZS5wYXJzZWREYXRlLGE9ZS5zZWxlY3RlZERhdGVzLGg9YS5sZW5ndGgsbz1cIlwiO2lmKEFycmF5LmlzQXJyYXkodCkpcmV0dXJuIHZvaWQgdC5mb3JFYWNoKGZ1bmN0aW9uKHQpe2Uuc2VsZWN0RGF0ZSh0KX0pO2lmKHQgaW5zdGFuY2VvZiBEYXRlKXtpZih0aGlzLmxhc3RTZWxlY3RlZERhdGU9dCx0aGlzLnRpbWVwaWNrZXImJnRoaXMudGltZXBpY2tlci5fc2V0VGltZSh0KSxlLl90cmlnZ2VyKFwic2VsZWN0RGF0ZVwiLHQpLHRoaXMudGltZXBpY2tlciYmKHQuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKSx0LnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpKSxcImRheXNcIj09ZS52aWV3JiZ0LmdldE1vbnRoKCkhPXMubW9udGgmJmkubW92ZVRvT3RoZXJNb250aHNPblNlbGVjdCYmKG89bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKSksXCJ5ZWFyc1wiPT1lLnZpZXcmJnQuZ2V0RnVsbFllYXIoKSE9cy55ZWFyJiZpLm1vdmVUb090aGVyWWVhcnNPblNlbGVjdCYmKG89bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLDAsMSkpLG8mJihlLnNpbGVudD0hMCxlLmRhdGU9byxlLnNpbGVudD0hMSxlLm5hdi5fcmVuZGVyKCkpLGkubXVsdGlwbGVEYXRlcyYmIWkucmFuZ2Upe2lmKGg9PT1pLm11bHRpcGxlRGF0ZXMpcmV0dXJuO2UuX2lzU2VsZWN0ZWQodCl8fGUuc2VsZWN0ZWREYXRlcy5wdXNoKHQpfWVsc2UgaS5yYW5nZT8yPT1oPyhlLnNlbGVjdGVkRGF0ZXM9W3RdLGUubWluUmFuZ2U9dCxlLm1heFJhbmdlPVwiXCIpOjE9PWg/KGUuc2VsZWN0ZWREYXRlcy5wdXNoKHQpLGUubWF4UmFuZ2U/ZS5taW5SYW5nZT10OmUubWF4UmFuZ2U9dCxuLmJpZ2dlcihlLm1heFJhbmdlLGUubWluUmFuZ2UpJiYoZS5tYXhSYW5nZT1lLm1pblJhbmdlLGUubWluUmFuZ2U9dCksZS5zZWxlY3RlZERhdGVzPVtlLm1pblJhbmdlLGUubWF4UmFuZ2VdKTooZS5zZWxlY3RlZERhdGVzPVt0XSxlLm1pblJhbmdlPXQpOmUuc2VsZWN0ZWREYXRlcz1bdF07ZS5fc2V0SW5wdXRWYWx1ZSgpLGkub25TZWxlY3QmJmUuX3RyaWdnZXJPbkNoYW5nZSgpLGkuYXV0b0Nsb3NlJiYhdGhpcy50aW1lcGlja2VySXNBY3RpdmUmJihpLm11bHRpcGxlRGF0ZXN8fGkucmFuZ2U/aS5yYW5nZSYmMj09ZS5zZWxlY3RlZERhdGVzLmxlbmd0aCYmZS5oaWRlKCk6ZS5oaWRlKCkpLGUudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpfX0scmVtb3ZlRGF0ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLnNlbGVjdGVkRGF0ZXMsaT10aGlzO2lmKHQgaW5zdGFuY2VvZiBEYXRlKXJldHVybiBlLnNvbWUoZnVuY3Rpb24ocyxhKXtyZXR1cm4gbi5pc1NhbWUocyx0KT8oZS5zcGxpY2UoYSwxKSxpLnNlbGVjdGVkRGF0ZXMubGVuZ3RoP2kubGFzdFNlbGVjdGVkRGF0ZT1pLnNlbGVjdGVkRGF0ZXNbaS5zZWxlY3RlZERhdGVzLmxlbmd0aC0xXTooaS5taW5SYW5nZT1cIlwiLGkubWF4UmFuZ2U9XCJcIixpLmxhc3RTZWxlY3RlZERhdGU9XCJcIiksaS52aWV3c1tpLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCksaS5fc2V0SW5wdXRWYWx1ZSgpLGkub3B0cy5vblNlbGVjdCYmaS5fdHJpZ2dlck9uQ2hhbmdlKCksITApOnZvaWQgMH0pfSx0b2RheTpmdW5jdGlvbigpe3RoaXMuc2lsZW50PSEwLHRoaXMudmlldz10aGlzLm9wdHMubWluVmlldyx0aGlzLnNpbGVudD0hMSx0aGlzLmRhdGU9bmV3IERhdGUsdGhpcy5vcHRzLnRvZGF5QnV0dG9uIGluc3RhbmNlb2YgRGF0ZSYmdGhpcy5zZWxlY3REYXRlKHRoaXMub3B0cy50b2RheUJ1dHRvbil9LGNsZWFyOmZ1bmN0aW9uKCl7dGhpcy5zZWxlY3RlZERhdGVzPVtdLHRoaXMubWluUmFuZ2U9XCJcIix0aGlzLm1heFJhbmdlPVwiXCIsdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCksdGhpcy5fc2V0SW5wdXRWYWx1ZSgpLHRoaXMub3B0cy5vblNlbGVjdCYmdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKCl9LHVwZGF0ZTpmdW5jdGlvbih0LGkpe3ZhciBzPWFyZ3VtZW50cy5sZW5ndGgsYT10aGlzLmxhc3RTZWxlY3RlZERhdGU7cmV0dXJuIDI9PXM/dGhpcy5vcHRzW3RdPWk6MT09cyYmXCJvYmplY3RcIj09dHlwZW9mIHQmJih0aGlzLm9wdHM9ZS5leHRlbmQoITAsdGhpcy5vcHRzLHQpKSx0aGlzLl9jcmVhdGVTaG9ydEN1dHMoKSx0aGlzLl9zeW5jV2l0aE1pbk1heERhdGVzKCksdGhpcy5fZGVmaW5lTG9jYWxlKHRoaXMub3B0cy5sYW5ndWFnZSksdGhpcy5uYXYuX2FkZEJ1dHRvbnNJZk5lZWQoKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fHRoaXMubmF2Ll9yZW5kZXIoKSx0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKSx0aGlzLmVsSXNJbnB1dCYmIXRoaXMub3B0cy5pbmxpbmUmJih0aGlzLl9zZXRQb3NpdGlvbkNsYXNzZXModGhpcy5vcHRzLnBvc2l0aW9uKSx0aGlzLnZpc2libGUmJnRoaXMuc2V0UG9zaXRpb24odGhpcy5vcHRzLnBvc2l0aW9uKSksdGhpcy5vcHRzLmNsYXNzZXMmJnRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3ModGhpcy5vcHRzLmNsYXNzZXMpLHRoaXMub3B0cy5vbmx5VGltZXBpY2tlciYmdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyhcIi1vbmx5LXRpbWVwaWNrZXItXCIpLHRoaXMub3B0cy50aW1lcGlja2VyJiYoYSYmdGhpcy50aW1lcGlja2VyLl9oYW5kbGVEYXRlKGEpLHRoaXMudGltZXBpY2tlci5fdXBkYXRlUmFuZ2VzKCksdGhpcy50aW1lcGlja2VyLl91cGRhdGVDdXJyZW50VGltZSgpLGEmJihhLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3VycyksYS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKSkpLHRoaXMuX3NldElucHV0VmFsdWUoKSx0aGlzfSxfc3luY1dpdGhNaW5NYXhEYXRlczpmdW5jdGlvbigpe3ZhciB0PXRoaXMuZGF0ZS5nZXRUaW1lKCk7dGhpcy5zaWxlbnQ9ITAsdGhpcy5taW5UaW1lPnQmJih0aGlzLmRhdGU9dGhpcy5taW5EYXRlKSx0aGlzLm1heFRpbWU8dCYmKHRoaXMuZGF0ZT10aGlzLm1heERhdGUpLHRoaXMuc2lsZW50PSExfSxfaXNTZWxlY3RlZDpmdW5jdGlvbih0LGUpe3ZhciBpPSExO3JldHVybiB0aGlzLnNlbGVjdGVkRGF0ZXMuc29tZShmdW5jdGlvbihzKXtyZXR1cm4gbi5pc1NhbWUocyx0LGUpPyhpPXMsITApOnZvaWQgMH0pLGl9LF9zZXRJbnB1dFZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLGk9ZS5vcHRzLHM9ZS5sb2MuZGF0ZUZvcm1hdCxhPWkuYWx0RmllbGREYXRlRm9ybWF0LG49ZS5zZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gZS5mb3JtYXREYXRlKHMsdCl9KTtpLmFsdEZpZWxkJiZlLiRhbHRGaWVsZC5sZW5ndGgmJih0PXRoaXMuc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIGUuZm9ybWF0RGF0ZShhLHQpfSksdD10LmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpLHRoaXMuJGFsdEZpZWxkLnZhbCh0KSksbj1uLmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpLHRoaXMuJGVsLnZhbChuKX0sX2lzSW5SYW5nZTpmdW5jdGlvbih0LGUpe3ZhciBpPXQuZ2V0VGltZSgpLHM9bi5nZXRQYXJzZWREYXRlKHQpLGE9bi5nZXRQYXJzZWREYXRlKHRoaXMubWluRGF0ZSksaD1uLmdldFBhcnNlZERhdGUodGhpcy5tYXhEYXRlKSxvPW5ldyBEYXRlKHMueWVhcixzLm1vbnRoLGEuZGF0ZSkuZ2V0VGltZSgpLHI9bmV3IERhdGUocy55ZWFyLHMubW9udGgsaC5kYXRlKS5nZXRUaW1lKCksYz17ZGF5Omk+PXRoaXMubWluVGltZSYmaTw9dGhpcy5tYXhUaW1lLG1vbnRoOm8+PXRoaXMubWluVGltZSYmcjw9dGhpcy5tYXhUaW1lLHllYXI6cy55ZWFyPj1hLnllYXImJnMueWVhcjw9aC55ZWFyfTtyZXR1cm4gZT9jW2VdOmMuZGF5fSxfZ2V0RGltZW5zaW9uczpmdW5jdGlvbih0KXt2YXIgZT10Lm9mZnNldCgpO3JldHVybnt3aWR0aDp0Lm91dGVyV2lkdGgoKSxoZWlnaHQ6dC5vdXRlckhlaWdodCgpLGxlZnQ6ZS5sZWZ0LHRvcDplLnRvcH19LF9nZXREYXRlRnJvbUNlbGw6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5wYXJzZWREYXRlLHM9dC5kYXRhKFwieWVhclwiKXx8ZS55ZWFyLGE9dC5kYXRhKFwibW9udGhcIik9PWk/ZS5tb250aDp0LmRhdGEoXCJtb250aFwiKSxuPXQuZGF0YShcImRhdGVcIil8fDE7cmV0dXJuIG5ldyBEYXRlKHMsYSxuKX0sX3NldFBvc2l0aW9uQ2xhc3NlczpmdW5jdGlvbih0KXt0PXQuc3BsaXQoXCIgXCIpO3ZhciBlPXRbMF0saT10WzFdLHM9XCJkYXRlcGlja2VyIC1cIitlK1wiLVwiK2krXCItIC1mcm9tLVwiK2UrXCItXCI7dGhpcy52aXNpYmxlJiYocys9XCIgYWN0aXZlXCIpLHRoaXMuJGRhdGVwaWNrZXIucmVtb3ZlQXR0cihcImNsYXNzXCIpLmFkZENsYXNzKHMpfSxzZXRQb3NpdGlvbjpmdW5jdGlvbih0KXt0PXR8fHRoaXMub3B0cy5wb3NpdGlvbjt2YXIgZSxpLHM9dGhpcy5fZ2V0RGltZW5zaW9ucyh0aGlzLiRlbCksYT10aGlzLl9nZXREaW1lbnNpb25zKHRoaXMuJGRhdGVwaWNrZXIpLG49dC5zcGxpdChcIiBcIiksaD10aGlzLm9wdHMub2Zmc2V0LG89blswXSxyPW5bMV07c3dpdGNoKG8pe2Nhc2VcInRvcFwiOmU9cy50b3AtYS5oZWlnaHQtaDticmVhaztjYXNlXCJyaWdodFwiOmk9cy5sZWZ0K3Mud2lkdGgraDticmVhaztjYXNlXCJib3R0b21cIjplPXMudG9wK3MuaGVpZ2h0K2g7YnJlYWs7Y2FzZVwibGVmdFwiOmk9cy5sZWZ0LWEud2lkdGgtaH1zd2l0Y2gocil7Y2FzZVwidG9wXCI6ZT1zLnRvcDticmVhaztjYXNlXCJyaWdodFwiOmk9cy5sZWZ0K3Mud2lkdGgtYS53aWR0aDticmVhaztjYXNlXCJib3R0b21cIjplPXMudG9wK3MuaGVpZ2h0LWEuaGVpZ2h0O2JyZWFrO2Nhc2VcImxlZnRcIjppPXMubGVmdDticmVhaztjYXNlXCJjZW50ZXJcIjovbGVmdHxyaWdodC8udGVzdChvKT9lPXMudG9wK3MuaGVpZ2h0LzItYS5oZWlnaHQvMjppPXMubGVmdCtzLndpZHRoLzItYS53aWR0aC8yfXRoaXMuJGRhdGVwaWNrZXIuY3NzKHtsZWZ0OmksdG9wOmV9KX0sc2hvdzpmdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0cy5vblNob3c7dGhpcy5zZXRQb3NpdGlvbih0aGlzLm9wdHMucG9zaXRpb24pLHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIiksdGhpcy52aXNpYmxlPSEwLHQmJnRoaXMuX2JpbmRWaXNpb25FdmVudHModCl9LGhpZGU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLm9wdHMub25IaWRlO3RoaXMuJGRhdGVwaWNrZXIucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikuY3NzKHtsZWZ0OlwiLTEwMDAwMHB4XCJ9KSx0aGlzLmZvY3VzZWQ9XCJcIix0aGlzLmtleXM9W10sdGhpcy5pbkZvY3VzPSExLHRoaXMudmlzaWJsZT0hMSx0aGlzLiRlbC5ibHVyKCksdCYmdGhpcy5fYmluZFZpc2lvbkV2ZW50cyh0KX0sZG93bjpmdW5jdGlvbih0KXt0aGlzLl9jaGFuZ2VWaWV3KHQsXCJkb3duXCIpfSx1cDpmdW5jdGlvbih0KXt0aGlzLl9jaGFuZ2VWaWV3KHQsXCJ1cFwiKX0sX2JpbmRWaXNpb25FdmVudHM6ZnVuY3Rpb24odCl7dGhpcy4kZGF0ZXBpY2tlci5vZmYoXCJ0cmFuc2l0aW9uZW5kLmRwXCIpLHQodGhpcywhMSksdGhpcy4kZGF0ZXBpY2tlci5vbmUoXCJ0cmFuc2l0aW9uZW5kLmRwXCIsdC5iaW5kKHRoaXMsdGhpcywhMCkpfSxfY2hhbmdlVmlldzpmdW5jdGlvbih0LGUpe3Q9dHx8dGhpcy5mb2N1c2VkfHx0aGlzLmRhdGU7dmFyIGk9XCJ1cFwiPT1lP3RoaXMudmlld0luZGV4KzE6dGhpcy52aWV3SW5kZXgtMTtpPjImJihpPTIpLDA+aSYmKGk9MCksdGhpcy5zaWxlbnQ9ITAsdGhpcy5kYXRlPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSksdGhpcy5zaWxlbnQ9ITEsdGhpcy52aWV3PXRoaXMudmlld0luZGV4ZXNbaV19LF9oYW5kbGVIb3RLZXk6ZnVuY3Rpb24odCl7dmFyIGUsaSxzLGE9bi5nZXRQYXJzZWREYXRlKHRoaXMuX2dldEZvY3VzZWREYXRlKCkpLGg9dGhpcy5vcHRzLG89ITEscj0hMSxjPSExLGQ9YS55ZWFyLGw9YS5tb250aCx1PWEuZGF0ZTtzd2l0Y2godCl7Y2FzZVwiY3RybFJpZ2h0XCI6Y2FzZVwiY3RybFVwXCI6bCs9MSxvPSEwO2JyZWFrO2Nhc2VcImN0cmxMZWZ0XCI6Y2FzZVwiY3RybERvd25cIjpsLT0xLG89ITA7YnJlYWs7Y2FzZVwic2hpZnRSaWdodFwiOmNhc2VcInNoaWZ0VXBcIjpyPSEwLGQrPTE7YnJlYWs7Y2FzZVwic2hpZnRMZWZ0XCI6Y2FzZVwic2hpZnREb3duXCI6cj0hMCxkLT0xO2JyZWFrO2Nhc2VcImFsdFJpZ2h0XCI6Y2FzZVwiYWx0VXBcIjpjPSEwLGQrPTEwO2JyZWFrO2Nhc2VcImFsdExlZnRcIjpjYXNlXCJhbHREb3duXCI6Yz0hMCxkLT0xMDticmVhaztjYXNlXCJjdHJsU2hpZnRVcFwiOnRoaXMudXAoKX1zPW4uZ2V0RGF5c0NvdW50KG5ldyBEYXRlKGQsbCkpLGk9bmV3IERhdGUoZCxsLHUpLHU+cyYmKHU9cyksaS5nZXRUaW1lKCk8dGhpcy5taW5UaW1lP2k9dGhpcy5taW5EYXRlOmkuZ2V0VGltZSgpPnRoaXMubWF4VGltZSYmKGk9dGhpcy5tYXhEYXRlKSx0aGlzLmZvY3VzZWQ9aSxlPW4uZ2V0UGFyc2VkRGF0ZShpKSxvJiZoLm9uQ2hhbmdlTW9udGgmJmgub25DaGFuZ2VNb250aChlLm1vbnRoLGUueWVhciksciYmaC5vbkNoYW5nZVllYXImJmgub25DaGFuZ2VZZWFyKGUueWVhciksYyYmaC5vbkNoYW5nZURlY2FkZSYmaC5vbkNoYW5nZURlY2FkZSh0aGlzLmN1ckRlY2FkZSl9LF9yZWdpc3RlcktleTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLmtleXMuc29tZShmdW5jdGlvbihlKXtyZXR1cm4gZT09dH0pO2V8fHRoaXMua2V5cy5wdXNoKHQpfSxfdW5SZWdpc3RlcktleTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLmtleXMuaW5kZXhPZih0KTt0aGlzLmtleXMuc3BsaWNlKGUsMSl9LF9pc0hvdEtleVByZXNzZWQ6ZnVuY3Rpb24oKXt2YXIgdCxlPSExLGk9dGhpcyxzPXRoaXMua2V5cy5zb3J0KCk7Zm9yKHZhciBhIGluIHUpdD11W2FdLHMubGVuZ3RoPT10Lmxlbmd0aCYmdC5ldmVyeShmdW5jdGlvbih0LGUpe3JldHVybiB0PT1zW2VdfSkmJihpLl90cmlnZ2VyKFwiaG90S2V5XCIsYSksZT0hMCk7cmV0dXJuIGV9LF90cmlnZ2VyOmZ1bmN0aW9uKHQsZSl7dGhpcy4kZWwudHJpZ2dlcih0LGUpfSxfZm9jdXNOZXh0Q2VsbDpmdW5jdGlvbih0LGUpe2U9ZXx8dGhpcy5jZWxsVHlwZTt2YXIgaT1uLmdldFBhcnNlZERhdGUodGhpcy5fZ2V0Rm9jdXNlZERhdGUoKSkscz1pLnllYXIsYT1pLm1vbnRoLGg9aS5kYXRlO2lmKCF0aGlzLl9pc0hvdEtleVByZXNzZWQoKSl7c3dpdGNoKHQpe2Nhc2UgMzc6XCJkYXlcIj09ZT9oLT0xOlwiXCIsXCJtb250aFwiPT1lP2EtPTE6XCJcIixcInllYXJcIj09ZT9zLT0xOlwiXCI7YnJlYWs7Y2FzZSAzODpcImRheVwiPT1lP2gtPTc6XCJcIixcIm1vbnRoXCI9PWU/YS09MzpcIlwiLFwieWVhclwiPT1lP3MtPTQ6XCJcIjticmVhaztjYXNlIDM5OlwiZGF5XCI9PWU/aCs9MTpcIlwiLFwibW9udGhcIj09ZT9hKz0xOlwiXCIsXCJ5ZWFyXCI9PWU/cys9MTpcIlwiO2JyZWFrO2Nhc2UgNDA6XCJkYXlcIj09ZT9oKz03OlwiXCIsXCJtb250aFwiPT1lP2ErPTM6XCJcIixcInllYXJcIj09ZT9zKz00OlwiXCJ9dmFyIG89bmV3IERhdGUocyxhLGgpO28uZ2V0VGltZSgpPHRoaXMubWluVGltZT9vPXRoaXMubWluRGF0ZTpvLmdldFRpbWUoKT50aGlzLm1heFRpbWUmJihvPXRoaXMubWF4RGF0ZSksdGhpcy5mb2N1c2VkPW99fSxfZ2V0Rm9jdXNlZERhdGU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmZvY3VzZWR8fHRoaXMuc2VsZWN0ZWREYXRlc1t0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoLTFdLGU9dGhpcy5wYXJzZWREYXRlO2lmKCF0KXN3aXRjaCh0aGlzLnZpZXcpe2Nhc2VcImRheXNcIjp0PW5ldyBEYXRlKGUueWVhcixlLm1vbnRoLChuZXcgRGF0ZSkuZ2V0RGF0ZSgpKTticmVhaztjYXNlXCJtb250aHNcIjp0PW5ldyBEYXRlKGUueWVhcixlLm1vbnRoLDEpO2JyZWFrO2Nhc2VcInllYXJzXCI6dD1uZXcgRGF0ZShlLnllYXIsMCwxKX1yZXR1cm4gdH0sX2dldENlbGw6ZnVuY3Rpb24odCxpKXtpPWl8fHRoaXMuY2VsbFR5cGU7dmFyIHMsYT1uLmdldFBhcnNlZERhdGUodCksaD0nLmRhdGVwaWNrZXItLWNlbGxbZGF0YS15ZWFyPVwiJythLnllYXIrJ1wiXSc7c3dpdGNoKGkpe2Nhc2VcIm1vbnRoXCI6aD0nW2RhdGEtbW9udGg9XCInK2EubW9udGgrJ1wiXSc7YnJlYWs7Y2FzZVwiZGF5XCI6aCs9J1tkYXRhLW1vbnRoPVwiJythLm1vbnRoKydcIl1bZGF0YS1kYXRlPVwiJythLmRhdGUrJ1wiXSd9cmV0dXJuIHM9dGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS4kZWwuZmluZChoKSxzLmxlbmd0aD9zOmUoXCJcIil9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3QuJGVsLm9mZihcIi5hZHBcIikuZGF0YShcImRhdGVwaWNrZXJcIixcIlwiKSx0LnNlbGVjdGVkRGF0ZXM9W10sdC5mb2N1c2VkPVwiXCIsdC52aWV3cz17fSx0LmtleXM9W10sdC5taW5SYW5nZT1cIlwiLHQubWF4UmFuZ2U9XCJcIix0Lm9wdHMuaW5saW5lfHwhdC5lbElzSW5wdXQ/dC4kZGF0ZXBpY2tlci5jbG9zZXN0KFwiLmRhdGVwaWNrZXItaW5saW5lXCIpLnJlbW92ZSgpOnQuJGRhdGVwaWNrZXIucmVtb3ZlKCl9LF9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlczpmdW5jdGlvbih0LGUpe3RoaXMub3B0cy5yYW5nZT90aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQ/dGhpcy5yZW1vdmVEYXRlKGUpOjIhPXRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgmJnRoaXMuX3RyaWdnZXIoXCJjbGlja0NlbGxcIixlKTp0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQmJnRoaXMucmVtb3ZlRGF0ZShlKSx0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWR8fCh0aGlzLmxhc3RTZWxlY3RlZERhdGU9dCx0aGlzLm9wdHMudGltZXBpY2tlciYmKHRoaXMudGltZXBpY2tlci5fc2V0VGltZSh0KSx0aGlzLnRpbWVwaWNrZXIudXBkYXRlKCkpKX0sX29uU2hvd0V2ZW50OmZ1bmN0aW9uKHQpe3RoaXMudmlzaWJsZXx8dGhpcy5zaG93KCl9LF9vbkJsdXI6ZnVuY3Rpb24oKXshdGhpcy5pbkZvY3VzJiZ0aGlzLnZpc2libGUmJnRoaXMuaGlkZSgpfSxfb25Nb3VzZURvd25EYXRlcGlja2VyOmZ1bmN0aW9uKHQpe3RoaXMuaW5Gb2N1cz0hMH0sX29uTW91c2VVcERhdGVwaWNrZXI6ZnVuY3Rpb24odCl7dGhpcy5pbkZvY3VzPSExLHQub3JpZ2luYWxFdmVudC5pbkZvY3VzPSEwLHQub3JpZ2luYWxFdmVudC50aW1lcGlja2VyRm9jdXN8fHRoaXMuJGVsLmZvY3VzKCl9LF9vbktleVVwR2VuZXJhbDpmdW5jdGlvbih0KXt2YXIgZT10aGlzLiRlbC52YWwoKTtlfHx0aGlzLmNsZWFyKCl9LF9vblJlc2l6ZTpmdW5jdGlvbigpe3RoaXMudmlzaWJsZSYmdGhpcy5zZXRQb3NpdGlvbigpfSxfb25Nb3VzZVVwQm9keTpmdW5jdGlvbih0KXt0Lm9yaWdpbmFsRXZlbnQuaW5Gb2N1c3x8dGhpcy52aXNpYmxlJiYhdGhpcy5pbkZvY3VzJiZ0aGlzLmhpZGUoKX0sX29uTW91c2VVcEVsOmZ1bmN0aW9uKHQpe3Qub3JpZ2luYWxFdmVudC5pbkZvY3VzPSEwLHNldFRpbWVvdXQodGhpcy5fb25LZXlVcEdlbmVyYWwuYmluZCh0aGlzKSw0KX0sX29uS2V5RG93bjpmdW5jdGlvbih0KXt2YXIgZT10LndoaWNoO2lmKHRoaXMuX3JlZ2lzdGVyS2V5KGUpLGU+PTM3JiY0MD49ZSYmKHQucHJldmVudERlZmF1bHQoKSx0aGlzLl9mb2N1c05leHRDZWxsKGUpKSwxMz09ZSYmdGhpcy5mb2N1c2VkKXtpZih0aGlzLl9nZXRDZWxsKHRoaXMuZm9jdXNlZCkuaGFzQ2xhc3MoXCItZGlzYWJsZWQtXCIpKXJldHVybjtpZih0aGlzLnZpZXchPXRoaXMub3B0cy5taW5WaWV3KXRoaXMuZG93bigpO2Vsc2V7dmFyIGk9dGhpcy5faXNTZWxlY3RlZCh0aGlzLmZvY3VzZWQsdGhpcy5jZWxsVHlwZSk7aWYoIWkpcmV0dXJuIHRoaXMudGltZXBpY2tlciYmKHRoaXMuZm9jdXNlZC5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpLHRoaXMuZm9jdXNlZC5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKSksdm9pZCB0aGlzLnNlbGVjdERhdGUodGhpcy5mb2N1c2VkKTt0aGlzLl9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlcyhpLHRoaXMuZm9jdXNlZCl9fTI3PT1lJiZ0aGlzLmhpZGUoKX0sX29uS2V5VXA6ZnVuY3Rpb24odCl7dmFyIGU9dC53aGljaDt0aGlzLl91blJlZ2lzdGVyS2V5KGUpfSxfb25Ib3RLZXk6ZnVuY3Rpb24odCxlKXt0aGlzLl9oYW5kbGVIb3RLZXkoZSl9LF9vbk1vdXNlRW50ZXJDZWxsOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLmNsb3Nlc3QoXCIuZGF0ZXBpY2tlci0tY2VsbFwiKSxzPXRoaXMuX2dldERhdGVGcm9tQ2VsbChpKTt0aGlzLnNpbGVudD0hMCx0aGlzLmZvY3VzZWQmJih0aGlzLmZvY3VzZWQ9XCJcIiksaS5hZGRDbGFzcyhcIi1mb2N1cy1cIiksdGhpcy5mb2N1c2VkPXMsdGhpcy5zaWxlbnQ9ITEsdGhpcy5vcHRzLnJhbmdlJiYxPT10aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiYodGhpcy5taW5SYW5nZT10aGlzLnNlbGVjdGVkRGF0ZXNbMF0sdGhpcy5tYXhSYW5nZT1cIlwiLG4ubGVzcyh0aGlzLm1pblJhbmdlLHRoaXMuZm9jdXNlZCkmJih0aGlzLm1heFJhbmdlPXRoaXMubWluUmFuZ2UsdGhpcy5taW5SYW5nZT1cIlwiKSx0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl91cGRhdGUoKSl9LF9vbk1vdXNlTGVhdmVDZWxsOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLmNsb3Nlc3QoXCIuZGF0ZXBpY2tlci0tY2VsbFwiKTtpLnJlbW92ZUNsYXNzKFwiLWZvY3VzLVwiKSx0aGlzLnNpbGVudD0hMCx0aGlzLmZvY3VzZWQ9XCJcIix0aGlzLnNpbGVudD0hMX0sX29uVGltZUNoYW5nZTpmdW5jdGlvbih0LGUsaSl7dmFyIHM9bmV3IERhdGUsYT10aGlzLnNlbGVjdGVkRGF0ZXMsbj0hMTthLmxlbmd0aCYmKG49ITAscz10aGlzLmxhc3RTZWxlY3RlZERhdGUpLHMuc2V0SG91cnMoZSkscy5zZXRNaW51dGVzKGkpLG58fHRoaXMuX2dldENlbGwocykuaGFzQ2xhc3MoXCItZGlzYWJsZWQtXCIpPyh0aGlzLl9zZXRJbnB1dFZhbHVlKCksdGhpcy5vcHRzLm9uU2VsZWN0JiZ0aGlzLl90cmlnZ2VyT25DaGFuZ2UoKSk6dGhpcy5zZWxlY3REYXRlKHMpfSxfb25DbGlja0NlbGw6ZnVuY3Rpb24odCxlKXt0aGlzLnRpbWVwaWNrZXImJihlLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3VycyksZS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKSksdGhpcy5zZWxlY3REYXRlKGUpfSxzZXQgZm9jdXNlZCh0KXtpZighdCYmdGhpcy5mb2N1c2VkKXt2YXIgZT10aGlzLl9nZXRDZWxsKHRoaXMuZm9jdXNlZCk7ZS5sZW5ndGgmJmUucmVtb3ZlQ2xhc3MoXCItZm9jdXMtXCIpfXRoaXMuX2ZvY3VzZWQ9dCx0aGlzLm9wdHMucmFuZ2UmJjE9PXRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgmJih0aGlzLm1pblJhbmdlPXRoaXMuc2VsZWN0ZWREYXRlc1swXSx0aGlzLm1heFJhbmdlPVwiXCIsbi5sZXNzKHRoaXMubWluUmFuZ2UsdGhpcy5fZm9jdXNlZCkmJih0aGlzLm1heFJhbmdlPXRoaXMubWluUmFuZ2UsdGhpcy5taW5SYW5nZT1cIlwiKSksdGhpcy5zaWxlbnR8fCh0aGlzLmRhdGU9dCl9LGdldCBmb2N1c2VkKCl7cmV0dXJuIHRoaXMuX2ZvY3VzZWR9LGdldCBwYXJzZWREYXRlKCl7cmV0dXJuIG4uZ2V0UGFyc2VkRGF0ZSh0aGlzLmRhdGUpfSxzZXQgZGF0ZSh0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIERhdGU/KHRoaXMuY3VycmVudERhdGU9dCx0aGlzLmluaXRlZCYmIXRoaXMuc2lsZW50JiYodGhpcy52aWV3c1t0aGlzLnZpZXddLl9yZW5kZXIoKSx0aGlzLm5hdi5fcmVuZGVyKCksdGhpcy52aXNpYmxlJiZ0aGlzLmVsSXNJbnB1dCYmdGhpcy5zZXRQb3NpdGlvbigpKSx0KTp2b2lkIDB9LGdldCBkYXRlKCl7cmV0dXJuIHRoaXMuY3VycmVudERhdGV9LHNldCB2aWV3KHQpe3JldHVybiB0aGlzLnZpZXdJbmRleD10aGlzLnZpZXdJbmRleGVzLmluZGV4T2YodCksdGhpcy52aWV3SW5kZXg8MD92b2lkIDA6KHRoaXMucHJldlZpZXc9dGhpcy5jdXJyZW50Vmlldyx0aGlzLmN1cnJlbnRWaWV3PXQsdGhpcy5pbml0ZWQmJih0aGlzLnZpZXdzW3RdP3RoaXMudmlld3NbdF0uX3JlbmRlcigpOnRoaXMudmlld3NbdF09bmV3IGUuZm4uZGF0ZXBpY2tlci5Cb2R5KHRoaXMsdCx0aGlzLm9wdHMpLHRoaXMudmlld3NbdGhpcy5wcmV2Vmlld10uaGlkZSgpLHRoaXMudmlld3NbdF0uc2hvdygpLHRoaXMubmF2Ll9yZW5kZXIoKSx0aGlzLm9wdHMub25DaGFuZ2VWaWV3JiZ0aGlzLm9wdHMub25DaGFuZ2VWaWV3KHQpLHRoaXMuZWxJc0lucHV0JiZ0aGlzLnZpc2libGUmJnRoaXMuc2V0UG9zaXRpb24oKSksdCl9LGdldCB2aWV3KCl7cmV0dXJuIHRoaXMuY3VycmVudFZpZXd9LGdldCBjZWxsVHlwZSgpe3JldHVybiB0aGlzLnZpZXcuc3Vic3RyaW5nKDAsdGhpcy52aWV3Lmxlbmd0aC0xKX0sZ2V0IG1pblRpbWUoKXt2YXIgdD1uLmdldFBhcnNlZERhdGUodGhpcy5taW5EYXRlKTtyZXR1cm4gbmV3IERhdGUodC55ZWFyLHQubW9udGgsdC5kYXRlKS5nZXRUaW1lKCl9LGdldCBtYXhUaW1lKCl7dmFyIHQ9bi5nZXRQYXJzZWREYXRlKHRoaXMubWF4RGF0ZSk7cmV0dXJuIG5ldyBEYXRlKHQueWVhcix0Lm1vbnRoLHQuZGF0ZSkuZ2V0VGltZSgpfSxnZXQgY3VyRGVjYWRlKCl7cmV0dXJuIG4uZ2V0RGVjYWRlKHRoaXMuZGF0ZSl9fSxuLmdldERheXNDb3VudD1mdW5jdGlvbih0KXtyZXR1cm4gbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSsxLDApLmdldERhdGUoKX0sbi5nZXRQYXJzZWREYXRlPWZ1bmN0aW9uKHQpe3JldHVybnt5ZWFyOnQuZ2V0RnVsbFllYXIoKSxtb250aDp0LmdldE1vbnRoKCksZnVsbE1vbnRoOnQuZ2V0TW9udGgoKSsxPDEwP1wiMFwiKyh0LmdldE1vbnRoKCkrMSk6dC5nZXRNb250aCgpKzEsZGF0ZTp0LmdldERhdGUoKSxmdWxsRGF0ZTp0LmdldERhdGUoKTwxMD9cIjBcIit0LmdldERhdGUoKTp0LmdldERhdGUoKSxkYXk6dC5nZXREYXkoKSxob3Vyczp0LmdldEhvdXJzKCksZnVsbEhvdXJzOnQuZ2V0SG91cnMoKTwxMD9cIjBcIit0LmdldEhvdXJzKCk6dC5nZXRIb3VycygpLG1pbnV0ZXM6dC5nZXRNaW51dGVzKCksZnVsbE1pbnV0ZXM6dC5nZXRNaW51dGVzKCk8MTA/XCIwXCIrdC5nZXRNaW51dGVzKCk6dC5nZXRNaW51dGVzKCl9fSxuLmdldERlY2FkZT1mdW5jdGlvbih0KXt2YXIgZT0xMCpNYXRoLmZsb29yKHQuZ2V0RnVsbFllYXIoKS8xMCk7cmV0dXJuW2UsZSs5XX0sbi50ZW1wbGF0ZT1mdW5jdGlvbih0LGUpe3JldHVybiB0LnJlcGxhY2UoLyNcXHsoW1xcd10rKVxcfS9nLGZ1bmN0aW9uKHQsaSl7cmV0dXJuIGVbaV18fDA9PT1lW2ldP2VbaV06dm9pZCAwfSl9LG4uaXNTYW1lPWZ1bmN0aW9uKHQsZSxpKXtpZighdHx8IWUpcmV0dXJuITE7dmFyIHM9bi5nZXRQYXJzZWREYXRlKHQpLGE9bi5nZXRQYXJzZWREYXRlKGUpLGg9aT9pOlwiZGF5XCIsbz17ZGF5OnMuZGF0ZT09YS5kYXRlJiZzLm1vbnRoPT1hLm1vbnRoJiZzLnllYXI9PWEueWVhcixtb250aDpzLm1vbnRoPT1hLm1vbnRoJiZzLnllYXI9PWEueWVhcix5ZWFyOnMueWVhcj09YS55ZWFyfTtyZXR1cm4gb1toXX0sbi5sZXNzPWZ1bmN0aW9uKHQsZSxpKXtyZXR1cm4gdCYmZT9lLmdldFRpbWUoKTx0LmdldFRpbWUoKTohMX0sbi5iaWdnZXI9ZnVuY3Rpb24odCxlLGkpe3JldHVybiB0JiZlP2UuZ2V0VGltZSgpPnQuZ2V0VGltZSgpOiExfSxuLmdldExlYWRpbmdaZXJvTnVtPWZ1bmN0aW9uKHQpe3JldHVybiBwYXJzZUludCh0KTwxMD9cIjBcIit0OnR9LG4ucmVzZXRUaW1lPWZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiB0Pyh0PW4uZ2V0UGFyc2VkRGF0ZSh0KSxuZXcgRGF0ZSh0LnllYXIsdC5tb250aCx0LmRhdGUpKTp2b2lkIDB9LGUuZm4uZGF0ZXBpY2tlcj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7aWYoZS5kYXRhKHRoaXMsbykpe3ZhciBpPWUuZGF0YSh0aGlzLG8pO2kub3B0cz1lLmV4dGVuZCghMCxpLm9wdHMsdCksaS51cGRhdGUoKX1lbHNlIGUuZGF0YSh0aGlzLG8sbmV3IG0odGhpcyx0KSl9KX0sZS5mbi5kYXRlcGlja2VyLkNvbnN0cnVjdG9yPW0sZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlPXtydTp7ZGF5czpbXCLQktC+0YHQutGA0LXRgdC10L3RjNC1XCIsXCLQn9C+0L3QtdC00LXQu9GM0L3QuNC6XCIsXCLQktGC0L7RgNC90LjQulwiLFwi0KHRgNC10LTQsFwiLFwi0KfQtdGC0LLQtdGA0LNcIixcItCf0Y/RgtC90LjRhtCwXCIsXCLQodGD0LHQsdC+0YLQsFwiXSxkYXlzU2hvcnQ6W1wi0JLQvtGBXCIsXCLQn9C+0L1cIixcItCS0YLQvlwiLFwi0KHRgNC1XCIsXCLQp9C10YJcIixcItCf0Y/RglwiLFwi0KHRg9CxXCJdLGRheXNNaW46W1wi0J/QvVwiLFwi0JLRglwiLFwi0KHRgFwiLFwi0KfRglwiLFwi0J/RglwiLFwi0KHQsVwiLFwi0JLRgVwiXSxtb250aHM6W1wi0K/QvdCy0LDRgNGMXCIsXCLQpNC10LLRgNCw0LvRjFwiLFwi0JzQsNGA0YJcIixcItCQ0L/RgNC10LvRjFwiLFwi0JzQsNC5XCIsXCLQmNGO0L3RjFwiLFwi0JjRjtC70YxcIixcItCQ0LLQs9GD0YHRglwiLFwi0KHQtdC90YLRj9Cx0YDRjFwiLFwi0J7QutGC0Y/QsdGA0YxcIixcItCd0L7Rj9Cx0YDRjFwiLFwi0JTQtdC60LDQsdGA0YxcIl0sbW9udGhzU2hvcnQ6W1wi0K/QvdCyXCIsXCLQpNC10LJcIixcItCc0LDRgFwiLFwi0JDQv9GAXCIsXCLQnNCw0LlcIixcItCY0Y7QvVwiLFwi0JjRjtC7XCIsXCLQkNCy0LNcIixcItCh0LXQvVwiLFwi0J7QutGCXCIsXCLQndC+0Y9cIixcItCU0LXQulwiXSx0b2RheTpcItCh0LXQs9C+0LTQvdGPXCIsY2xlYXI6XCLQntGH0LjRgdGC0LjRgtGMXCIsZGF0ZUZvcm1hdDpcImRkLm1tLnl5eXlcIix0aW1lRm9ybWF0OlwiaGg6aWlcIixmaXJzdERheToxfX0sZShmdW5jdGlvbigpe2UocikuZGF0ZXBpY2tlcigpfSl9KCksZnVuY3Rpb24oKXt2YXIgdD17ZGF5czonPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheXMgZGF0ZXBpY2tlci0tYm9keVwiPjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXlzLW5hbWVzXCI+PC9kaXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLWRheXNcIj48L2Rpdj48L2Rpdj4nLG1vbnRoczonPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW1vbnRocyBkYXRlcGlja2VyLS1ib2R5XCI+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLW1vbnRoc1wiPjwvZGl2PjwvZGl2PicseWVhcnM6JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS15ZWFycyBkYXRlcGlja2VyLS1ib2R5XCI+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLXllYXJzXCI+PC9kaXY+PC9kaXY+J30scz1lLmZuLmRhdGVwaWNrZXIsYT1zLkNvbnN0cnVjdG9yO3MuQm9keT1mdW5jdGlvbih0LGkscyl7dGhpcy5kPXQsdGhpcy50eXBlPWksdGhpcy5vcHRzPXMsdGhpcy4kZWw9ZShcIlwiKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fHRoaXMuaW5pdCgpfSxzLkJvZHkucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKCl7dGhpcy5fYnVpbGRCYXNlSHRtbCgpLHRoaXMuX3JlbmRlcigpLHRoaXMuX2JpbmRFdmVudHMoKX0sX2JpbmRFdmVudHM6ZnVuY3Rpb24oKXt0aGlzLiRlbC5vbihcImNsaWNrXCIsXCIuZGF0ZXBpY2tlci0tY2VsbFwiLGUucHJveHkodGhpcy5fb25DbGlja0NlbGwsdGhpcykpfSxfYnVpbGRCYXNlSHRtbDpmdW5jdGlvbigpe3RoaXMuJGVsPWUodFt0aGlzLnR5cGVdKS5hcHBlbmRUbyh0aGlzLmQuJGNvbnRlbnQpLHRoaXMuJG5hbWVzPWUoXCIuZGF0ZXBpY2tlci0tZGF5cy1uYW1lc1wiLHRoaXMuJGVsKSx0aGlzLiRjZWxscz1lKFwiLmRhdGVwaWNrZXItLWNlbGxzXCIsdGhpcy4kZWwpfSxfZ2V0RGF5TmFtZXNIdG1sOmZ1bmN0aW9uKHQsZSxzLGEpe3JldHVybiBlPWUhPWk/ZTp0LHM9cz9zOlwiXCIsYT1hIT1pP2E6MCxhPjc/czo3PT1lP3RoaXMuX2dldERheU5hbWVzSHRtbCh0LDAscywrK2EpOihzKz0nPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheS1uYW1lJysodGhpcy5kLmlzV2Vla2VuZChlKT9cIiAtd2Vla2VuZC1cIjpcIlwiKSsnXCI+Jyt0aGlzLmQubG9jLmRheXNNaW5bZV0rXCI8L2Rpdj5cIix0aGlzLl9nZXREYXlOYW1lc0h0bWwodCwrK2UscywrK2EpKX0sX2dldENlbGxDb250ZW50czpmdW5jdGlvbih0LGUpe3ZhciBpPVwiZGF0ZXBpY2tlci0tY2VsbCBkYXRlcGlja2VyLS1jZWxsLVwiK2Uscz1uZXcgRGF0ZSxuPXRoaXMuZCxoPWEucmVzZXRUaW1lKG4ubWluUmFuZ2UpLG89YS5yZXNldFRpbWUobi5tYXhSYW5nZSkscj1uLm9wdHMsYz1hLmdldFBhcnNlZERhdGUodCksZD17fSxsPWMuZGF0ZTtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6bi5pc1dlZWtlbmQoYy5kYXkpJiYoaSs9XCIgLXdlZWtlbmQtXCIpLGMubW9udGghPXRoaXMuZC5wYXJzZWREYXRlLm1vbnRoJiYoaSs9XCIgLW90aGVyLW1vbnRoLVwiLHIuc2VsZWN0T3RoZXJNb250aHN8fChpKz1cIiAtZGlzYWJsZWQtXCIpLHIuc2hvd090aGVyTW9udGhzfHwobD1cIlwiKSk7YnJlYWs7Y2FzZVwibW9udGhcIjpsPW4ubG9jW24ub3B0cy5tb250aHNGaWVsZF1bYy5tb250aF07YnJlYWs7Y2FzZVwieWVhclwiOnZhciB1PW4uY3VyRGVjYWRlO2w9Yy55ZWFyLChjLnllYXI8dVswXXx8Yy55ZWFyPnVbMV0pJiYoaSs9XCIgLW90aGVyLWRlY2FkZS1cIixyLnNlbGVjdE90aGVyWWVhcnN8fChpKz1cIiAtZGlzYWJsZWQtXCIpLHIuc2hvd090aGVyWWVhcnN8fChsPVwiXCIpKX1yZXR1cm4gci5vblJlbmRlckNlbGwmJihkPXIub25SZW5kZXJDZWxsKHQsZSl8fHt9LGw9ZC5odG1sP2QuaHRtbDpsLGkrPWQuY2xhc3Nlcz9cIiBcIitkLmNsYXNzZXM6XCJcIiksci5yYW5nZSYmKGEuaXNTYW1lKGgsdCxlKSYmKGkrPVwiIC1yYW5nZS1mcm9tLVwiKSxhLmlzU2FtZShvLHQsZSkmJihpKz1cIiAtcmFuZ2UtdG8tXCIpLDE9PW4uc2VsZWN0ZWREYXRlcy5sZW5ndGgmJm4uZm9jdXNlZD8oKGEuYmlnZ2VyKGgsdCkmJmEubGVzcyhuLmZvY3VzZWQsdCl8fGEubGVzcyhvLHQpJiZhLmJpZ2dlcihuLmZvY3VzZWQsdCkpJiYoaSs9XCIgLWluLXJhbmdlLVwiKSxhLmxlc3Mobyx0KSYmYS5pc1NhbWUobi5mb2N1c2VkLHQpJiYoaSs9XCIgLXJhbmdlLWZyb20tXCIpLGEuYmlnZ2VyKGgsdCkmJmEuaXNTYW1lKG4uZm9jdXNlZCx0KSYmKGkrPVwiIC1yYW5nZS10by1cIikpOjI9PW4uc2VsZWN0ZWREYXRlcy5sZW5ndGgmJmEuYmlnZ2VyKGgsdCkmJmEubGVzcyhvLHQpJiYoaSs9XCIgLWluLXJhbmdlLVwiKSksYS5pc1NhbWUocyx0LGUpJiYoaSs9XCIgLWN1cnJlbnQtXCIpLG4uZm9jdXNlZCYmYS5pc1NhbWUodCxuLmZvY3VzZWQsZSkmJihpKz1cIiAtZm9jdXMtXCIpLG4uX2lzU2VsZWN0ZWQodCxlKSYmKGkrPVwiIC1zZWxlY3RlZC1cIiksKCFuLl9pc0luUmFuZ2UodCxlKXx8ZC5kaXNhYmxlZCkmJihpKz1cIiAtZGlzYWJsZWQtXCIpLHtodG1sOmwsY2xhc3NlczppfX0sX2dldERheXNIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPWEuZ2V0RGF5c0NvdW50KHQpLGk9bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKS5nZXREYXkoKSxzPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksZSkuZ2V0RGF5KCksbj1pLXRoaXMuZC5sb2MuZmlyc3REYXksaD02LXMrdGhpcy5kLmxvYy5maXJzdERheTtuPTA+bj9uKzc6bixoPWg+Nj9oLTc6aDtmb3IodmFyIG8scixjPS1uKzEsZD1cIlwiLGw9Yyx1PWUraDt1Pj1sO2wrKylyPXQuZ2V0RnVsbFllYXIoKSxvPXQuZ2V0TW9udGgoKSxkKz10aGlzLl9nZXREYXlIdG1sKG5ldyBEYXRlKHIsbyxsKSk7cmV0dXJuIGR9LF9nZXREYXlIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2dldENlbGxDb250ZW50cyh0LFwiZGF5XCIpO3JldHVybic8ZGl2IGNsYXNzPVwiJytlLmNsYXNzZXMrJ1wiIGRhdGEtZGF0ZT1cIicrdC5nZXREYXRlKCkrJ1wiIGRhdGEtbW9udGg9XCInK3QuZ2V0TW9udGgoKSsnXCIgZGF0YS15ZWFyPVwiJyt0LmdldEZ1bGxZZWFyKCkrJ1wiPicrZS5odG1sK1wiPC9kaXY+XCJ9LF9nZXRNb250aHNIdG1sOmZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1cIlwiLGk9YS5nZXRQYXJzZWREYXRlKHQpLHM9MDsxMj5zOyllKz10aGlzLl9nZXRNb250aEh0bWwobmV3IERhdGUoaS55ZWFyLHMpKSxzKys7cmV0dXJuIGV9LF9nZXRNb250aEh0bWw6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fZ2V0Q2VsbENvbnRlbnRzKHQsXCJtb250aFwiKTtyZXR1cm4nPGRpdiBjbGFzcz1cIicrZS5jbGFzc2VzKydcIiBkYXRhLW1vbnRoPVwiJyt0LmdldE1vbnRoKCkrJ1wiPicrZS5odG1sK1wiPC9kaXY+XCJ9LF9nZXRZZWFyc0h0bWw6ZnVuY3Rpb24odCl7dmFyIGU9KGEuZ2V0UGFyc2VkRGF0ZSh0KSxhLmdldERlY2FkZSh0KSksaT1lWzBdLTEscz1cIlwiLG49aTtmb3IobjtuPD1lWzFdKzE7bisrKXMrPXRoaXMuX2dldFllYXJIdG1sKG5ldyBEYXRlKG4sMCkpO3JldHVybiBzfSxfZ2V0WWVhckh0bWw6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fZ2V0Q2VsbENvbnRlbnRzKHQsXCJ5ZWFyXCIpO3JldHVybic8ZGl2IGNsYXNzPVwiJytlLmNsYXNzZXMrJ1wiIGRhdGEteWVhcj1cIicrdC5nZXRGdWxsWWVhcigpKydcIj4nK2UuaHRtbCtcIjwvZGl2PlwifSxfcmVuZGVyVHlwZXM6e2RheXM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9nZXREYXlOYW1lc0h0bWwodGhpcy5kLmxvYy5maXJzdERheSksZT10aGlzLl9nZXREYXlzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO3RoaXMuJGNlbGxzLmh0bWwoZSksdGhpcy4kbmFtZXMuaHRtbCh0KX0sbW9udGhzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0TW9udGhzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO3RoaXMuJGNlbGxzLmh0bWwodCl9LHllYXJzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0WWVhcnNIdG1sKHRoaXMuZC5jdXJyZW50RGF0ZSk7dGhpcy4kY2VsbHMuaHRtbCh0KX19LF9yZW5kZXI6ZnVuY3Rpb24oKXt0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fHRoaXMuX3JlbmRlclR5cGVzW3RoaXMudHlwZV0uYmluZCh0aGlzKSgpfSxfdXBkYXRlOmZ1bmN0aW9uKCl7dmFyIHQsaSxzLGE9ZShcIi5kYXRlcGlja2VyLS1jZWxsXCIsdGhpcy4kY2VsbHMpLG49dGhpczthLmVhY2goZnVuY3Rpb24oYSxoKXtpPWUodGhpcykscz1uLmQuX2dldERhdGVGcm9tQ2VsbChlKHRoaXMpKSx0PW4uX2dldENlbGxDb250ZW50cyhzLG4uZC5jZWxsVHlwZSksaS5hdHRyKFwiY2xhc3NcIix0LmNsYXNzZXMpfSl9LHNob3c6ZnVuY3Rpb24oKXt0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fCh0aGlzLiRlbC5hZGRDbGFzcyhcImFjdGl2ZVwiKSx0aGlzLmFjaXR2ZT0hMCl9LGhpZGU6ZnVuY3Rpb24oKXt0aGlzLiRlbC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSx0aGlzLmFjdGl2ZT0hMX0sX2hhbmRsZUNsaWNrOmZ1bmN0aW9uKHQpe3ZhciBlPXQuZGF0YShcImRhdGVcIil8fDEsaT10LmRhdGEoXCJtb250aFwiKXx8MCxzPXQuZGF0YShcInllYXJcIil8fHRoaXMuZC5wYXJzZWREYXRlLnllYXIsYT10aGlzLmQ7aWYoYS52aWV3IT10aGlzLm9wdHMubWluVmlldylyZXR1cm4gdm9pZCBhLmRvd24obmV3IERhdGUocyxpLGUpKTt2YXIgbj1uZXcgRGF0ZShzLGksZSksaD10aGlzLmQuX2lzU2VsZWN0ZWQobix0aGlzLmQuY2VsbFR5cGUpO3JldHVybiBoP3ZvaWQgYS5faGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXMuYmluZChhLGgsbikoKTp2b2lkIGEuX3RyaWdnZXIoXCJjbGlja0NlbGxcIixuKX0sX29uQ2xpY2tDZWxsOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLmNsb3Nlc3QoXCIuZGF0ZXBpY2tlci0tY2VsbFwiKTtpLmhhc0NsYXNzKFwiLWRpc2FibGVkLVwiKXx8dGhpcy5faGFuZGxlQ2xpY2suYmluZCh0aGlzKShpKX19fSgpLGZ1bmN0aW9uKCl7dmFyIHQ9JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXYtYWN0aW9uXCIgZGF0YS1hY3Rpb249XCJwcmV2XCI+I3twcmV2SHRtbH08L2Rpdj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LXRpdGxlXCI+I3t0aXRsZX08L2Rpdj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LWFjdGlvblwiIGRhdGEtYWN0aW9uPVwibmV4dFwiPiN7bmV4dEh0bWx9PC9kaXY+JyxpPSc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tYnV0dG9uc1wiPjwvZGl2Picscz0nPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS1idXR0b25cIiBkYXRhLWFjdGlvbj1cIiN7YWN0aW9ufVwiPiN7bGFiZWx9PC9zcGFuPicsYT1lLmZuLmRhdGVwaWNrZXIsbj1hLkNvbnN0cnVjdG9yO2EuTmF2aWdhdGlvbj1mdW5jdGlvbih0LGUpe3RoaXMuZD10LHRoaXMub3B0cz1lLHRoaXMuJGJ1dHRvbnNDb250YWluZXI9XCJcIix0aGlzLmluaXQoKX0sYS5OYXZpZ2F0aW9uLnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbigpe3RoaXMuX2J1aWxkQmFzZUh0bWwoKSx0aGlzLl9iaW5kRXZlbnRzKCl9LF9iaW5kRXZlbnRzOmZ1bmN0aW9uKCl7dGhpcy5kLiRuYXYub24oXCJjbGlja1wiLFwiLmRhdGVwaWNrZXItLW5hdi1hY3Rpb25cIixlLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZCdXR0b24sdGhpcykpLHRoaXMuZC4kbmF2Lm9uKFwiY2xpY2tcIixcIi5kYXRlcGlja2VyLS1uYXYtdGl0bGVcIixlLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZUaXRsZSx0aGlzKSksdGhpcy5kLiRkYXRlcGlja2VyLm9uKFwiY2xpY2tcIixcIi5kYXRlcGlja2VyLS1idXR0b25cIixlLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZCdXR0b24sdGhpcykpfSxfYnVpbGRCYXNlSHRtbDpmdW5jdGlvbigpe3RoaXMub3B0cy5vbmx5VGltZXBpY2tlcnx8dGhpcy5fcmVuZGVyKCksdGhpcy5fYWRkQnV0dG9uc0lmTmVlZCgpfSxfYWRkQnV0dG9uc0lmTmVlZDpmdW5jdGlvbigpe3RoaXMub3B0cy50b2RheUJ1dHRvbiYmdGhpcy5fYWRkQnV0dG9uKFwidG9kYXlcIiksdGhpcy5vcHRzLmNsZWFyQnV0dG9uJiZ0aGlzLl9hZGRCdXR0b24oXCJjbGVhclwiKX0sX3JlbmRlcjpmdW5jdGlvbigpe3ZhciBpPXRoaXMuX2dldFRpdGxlKHRoaXMuZC5jdXJyZW50RGF0ZSkscz1uLnRlbXBsYXRlKHQsZS5leHRlbmQoe3RpdGxlOml9LHRoaXMub3B0cykpO3RoaXMuZC4kbmF2Lmh0bWwocyksXCJ5ZWFyc1wiPT10aGlzLmQudmlldyYmZShcIi5kYXRlcGlja2VyLS1uYXYtdGl0bGVcIix0aGlzLmQuJG5hdikuYWRkQ2xhc3MoXCItZGlzYWJsZWQtXCIpLHRoaXMuc2V0TmF2U3RhdHVzKCl9LF9nZXRUaXRsZTpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5kLmZvcm1hdERhdGUodGhpcy5vcHRzLm5hdlRpdGxlc1t0aGlzLmQudmlld10sdCl9LF9hZGRCdXR0b246ZnVuY3Rpb24odCl7dGhpcy4kYnV0dG9uc0NvbnRhaW5lci5sZW5ndGh8fHRoaXMuX2FkZEJ1dHRvbnNDb250YWluZXIoKTt2YXIgaT17YWN0aW9uOnQsbGFiZWw6dGhpcy5kLmxvY1t0XX0sYT1uLnRlbXBsYXRlKHMsaSk7ZShcIltkYXRhLWFjdGlvbj1cIit0K1wiXVwiLHRoaXMuJGJ1dHRvbnNDb250YWluZXIpLmxlbmd0aHx8dGhpcy4kYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQoYSl9LF9hZGRCdXR0b25zQ29udGFpbmVyOmZ1bmN0aW9uKCl7dGhpcy5kLiRkYXRlcGlja2VyLmFwcGVuZChpKSx0aGlzLiRidXR0b25zQ29udGFpbmVyPWUoXCIuZGF0ZXBpY2tlci0tYnV0dG9uc1wiLHRoaXMuZC4kZGF0ZXBpY2tlcil9LHNldE5hdlN0YXR1czpmdW5jdGlvbigpe2lmKCh0aGlzLm9wdHMubWluRGF0ZXx8dGhpcy5vcHRzLm1heERhdGUpJiZ0aGlzLm9wdHMuZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlKXt2YXIgdD10aGlzLmQucGFyc2VkRGF0ZSxlPXQubW9udGgsaT10LnllYXIscz10LmRhdGU7c3dpdGNoKHRoaXMuZC52aWV3KXtjYXNlXCJkYXlzXCI6dGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoaSxlLTEsMSksXCJtb250aFwiKXx8dGhpcy5fZGlzYWJsZU5hdihcInByZXZcIiksdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoaSxlKzEsMSksXCJtb250aFwiKXx8dGhpcy5fZGlzYWJsZU5hdihcIm5leHRcIik7YnJlYWs7Y2FzZVwibW9udGhzXCI6dGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoaS0xLGUscyksXCJ5ZWFyXCIpfHx0aGlzLl9kaXNhYmxlTmF2KFwicHJldlwiKSx0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShpKzEsZSxzKSxcInllYXJcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJuZXh0XCIpO2JyZWFrO2Nhc2VcInllYXJzXCI6dmFyIGE9bi5nZXREZWNhZGUodGhpcy5kLmRhdGUpO3RoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGFbMF0tMSwwLDEpLFwieWVhclwiKXx8dGhpcy5fZGlzYWJsZU5hdihcInByZXZcIiksdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoYVsxXSsxLDAsMSksXCJ5ZWFyXCIpfHx0aGlzLl9kaXNhYmxlTmF2KFwibmV4dFwiKX19fSxfZGlzYWJsZU5hdjpmdW5jdGlvbih0KXtlKCdbZGF0YS1hY3Rpb249XCInK3QrJ1wiXScsdGhpcy5kLiRuYXYpLmFkZENsYXNzKFwiLWRpc2FibGVkLVwiKX0sX2FjdGl2YXRlTmF2OmZ1bmN0aW9uKHQpe2UoJ1tkYXRhLWFjdGlvbj1cIicrdCsnXCJdJyx0aGlzLmQuJG5hdikucmVtb3ZlQ2xhc3MoXCItZGlzYWJsZWQtXCIpfSxfb25DbGlja05hdkJ1dHRvbjpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5jbG9zZXN0KFwiW2RhdGEtYWN0aW9uXVwiKSxzPWkuZGF0YShcImFjdGlvblwiKTt0aGlzLmRbc10oKX0sX29uQ2xpY2tOYXZUaXRsZTpmdW5jdGlvbih0KXtyZXR1cm4gZSh0LnRhcmdldCkuaGFzQ2xhc3MoXCItZGlzYWJsZWQtXCIpP3ZvaWQgMDpcImRheXNcIj09dGhpcy5kLnZpZXc/dGhpcy5kLnZpZXc9XCJtb250aHNcIjp2b2lkKHRoaXMuZC52aWV3PVwieWVhcnNcIil9fX0oKSxmdW5jdGlvbigpe3ZhciB0PSc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZVwiPjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnRcIj4gICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1ob3Vyc1wiPiN7aG91clZpc2libGV9PC9zcGFuPiAgIDxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWNvbG9uXCI+Ojwvc3Bhbj4gICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1taW51dGVzXCI+I3ttaW5WYWx1ZX08L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtc2xpZGVyc1wiPiAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXJvd1wiPiAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBuYW1lPVwiaG91cnNcIiB2YWx1ZT1cIiN7aG91clZhbHVlfVwiIG1pbj1cIiN7aG91ck1pbn1cIiBtYXg9XCIje2hvdXJNYXh9XCIgc3RlcD1cIiN7aG91clN0ZXB9XCIvPiAgIDwvZGl2PiAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXJvd1wiPiAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBuYW1lPVwibWludXRlc1wiIHZhbHVlPVwiI3ttaW5WYWx1ZX1cIiBtaW49XCIje21pbk1pbn1cIiBtYXg9XCIje21pbk1heH1cIiBzdGVwPVwiI3ttaW5TdGVwfVwiLz4gICA8L2Rpdj48L2Rpdj48L2Rpdj4nLGk9ZS5mbi5kYXRlcGlja2VyLHM9aS5Db25zdHJ1Y3RvcjtpLlRpbWVwaWNrZXI9ZnVuY3Rpb24odCxlKXt0aGlzLmQ9dCx0aGlzLm9wdHM9ZSx0aGlzLmluaXQoKX0saS5UaW1lcGlja2VyLnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbigpe3ZhciB0PVwiaW5wdXRcIjt0aGlzLl9zZXRUaW1lKHRoaXMuZC5kYXRlKSx0aGlzLl9idWlsZEhUTUwoKSxuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC90cmlkZW50L2dpKSYmKHQ9XCJjaGFuZ2VcIiksdGhpcy5kLiRlbC5vbihcInNlbGVjdERhdGVcIix0aGlzLl9vblNlbGVjdERhdGUuYmluZCh0aGlzKSksdGhpcy4kcmFuZ2VzLm9uKHQsdGhpcy5fb25DaGFuZ2VSYW5nZS5iaW5kKHRoaXMpKSx0aGlzLiRyYW5nZXMub24oXCJtb3VzZXVwXCIsdGhpcy5fb25Nb3VzZVVwUmFuZ2UuYmluZCh0aGlzKSksdGhpcy4kcmFuZ2VzLm9uKFwibW91c2Vtb3ZlIGZvY3VzIFwiLHRoaXMuX29uTW91c2VFbnRlclJhbmdlLmJpbmQodGhpcykpLHRoaXMuJHJhbmdlcy5vbihcIm1vdXNlb3V0IGJsdXJcIix0aGlzLl9vbk1vdXNlT3V0UmFuZ2UuYmluZCh0aGlzKSl9LF9zZXRUaW1lOmZ1bmN0aW9uKHQpe3ZhciBlPXMuZ2V0UGFyc2VkRGF0ZSh0KTt0aGlzLl9oYW5kbGVEYXRlKHQpLHRoaXMuaG91cnM9ZS5ob3Vyczx0aGlzLm1pbkhvdXJzP3RoaXMubWluSG91cnM6ZS5ob3Vycyx0aGlzLm1pbnV0ZXM9ZS5taW51dGVzPHRoaXMubWluTWludXRlcz90aGlzLm1pbk1pbnV0ZXM6ZS5taW51dGVzfSxfc2V0TWluVGltZUZyb21EYXRlOmZ1bmN0aW9uKHQpe3RoaXMubWluSG91cnM9dC5nZXRIb3VycygpLHRoaXMubWluTWludXRlcz10LmdldE1pbnV0ZXMoKSx0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSYmdGhpcy5kLmxhc3RTZWxlY3RlZERhdGUuZ2V0SG91cnMoKT50LmdldEhvdXJzKCkmJih0aGlzLm1pbk1pbnV0ZXM9dGhpcy5vcHRzLm1pbk1pbnV0ZXMpfSxfc2V0TWF4VGltZUZyb21EYXRlOmZ1bmN0aW9uKHQpe1xudGhpcy5tYXhIb3Vycz10LmdldEhvdXJzKCksdGhpcy5tYXhNaW51dGVzPXQuZ2V0TWludXRlcygpLHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlJiZ0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZS5nZXRIb3VycygpPHQuZ2V0SG91cnMoKSYmKHRoaXMubWF4TWludXRlcz10aGlzLm9wdHMubWF4TWludXRlcyl9LF9zZXREZWZhdWx0TWluTWF4VGltZTpmdW5jdGlvbigpe3ZhciB0PTIzLGU9NTksaT10aGlzLm9wdHM7dGhpcy5taW5Ib3Vycz1pLm1pbkhvdXJzPDB8fGkubWluSG91cnM+dD8wOmkubWluSG91cnMsdGhpcy5taW5NaW51dGVzPWkubWluTWludXRlczwwfHxpLm1pbk1pbnV0ZXM+ZT8wOmkubWluTWludXRlcyx0aGlzLm1heEhvdXJzPWkubWF4SG91cnM8MHx8aS5tYXhIb3Vycz50P3Q6aS5tYXhIb3Vycyx0aGlzLm1heE1pbnV0ZXM9aS5tYXhNaW51dGVzPDB8fGkubWF4TWludXRlcz5lP2U6aS5tYXhNaW51dGVzfSxfdmFsaWRhdGVIb3Vyc01pbnV0ZXM6ZnVuY3Rpb24odCl7dGhpcy5ob3Vyczx0aGlzLm1pbkhvdXJzP3RoaXMuaG91cnM9dGhpcy5taW5Ib3Vyczp0aGlzLmhvdXJzPnRoaXMubWF4SG91cnMmJih0aGlzLmhvdXJzPXRoaXMubWF4SG91cnMpLHRoaXMubWludXRlczx0aGlzLm1pbk1pbnV0ZXM/dGhpcy5taW51dGVzPXRoaXMubWluTWludXRlczp0aGlzLm1pbnV0ZXM+dGhpcy5tYXhNaW51dGVzJiYodGhpcy5taW51dGVzPXRoaXMubWF4TWludXRlcyl9LF9idWlsZEhUTUw6ZnVuY3Rpb24oKXt2YXIgaT1zLmdldExlYWRpbmdaZXJvTnVtLGE9e2hvdXJNaW46dGhpcy5taW5Ib3Vycyxob3VyTWF4OmkodGhpcy5tYXhIb3VycyksaG91clN0ZXA6dGhpcy5vcHRzLmhvdXJzU3RlcCxob3VyVmFsdWU6dGhpcy5ob3Vycyxob3VyVmlzaWJsZTppKHRoaXMuZGlzcGxheUhvdXJzKSxtaW5NaW46dGhpcy5taW5NaW51dGVzLG1pbk1heDppKHRoaXMubWF4TWludXRlcyksbWluU3RlcDp0aGlzLm9wdHMubWludXRlc1N0ZXAsbWluVmFsdWU6aSh0aGlzLm1pbnV0ZXMpfSxuPXMudGVtcGxhdGUodCxhKTt0aGlzLiR0aW1lcGlja2VyPWUobikuYXBwZW5kVG8odGhpcy5kLiRkYXRlcGlja2VyKSx0aGlzLiRyYW5nZXM9ZSgnW3R5cGU9XCJyYW5nZVwiXScsdGhpcy4kdGltZXBpY2tlciksdGhpcy4kaG91cnM9ZSgnW25hbWU9XCJob3Vyc1wiXScsdGhpcy4kdGltZXBpY2tlciksdGhpcy4kbWludXRlcz1lKCdbbmFtZT1cIm1pbnV0ZXNcIl0nLHRoaXMuJHRpbWVwaWNrZXIpLHRoaXMuJGhvdXJzVGV4dD1lKFwiLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1ob3Vyc1wiLHRoaXMuJHRpbWVwaWNrZXIpLHRoaXMuJG1pbnV0ZXNUZXh0PWUoXCIuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LW1pbnV0ZXNcIix0aGlzLiR0aW1lcGlja2VyKSx0aGlzLmQuYW1wbSYmKHRoaXMuJGFtcG09ZSgnPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtYW1wbVwiPicpLmFwcGVuZFRvKGUoXCIuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50XCIsdGhpcy4kdGltZXBpY2tlcikpLmh0bWwodGhpcy5kYXlQZXJpb2QpLHRoaXMuJHRpbWVwaWNrZXIuYWRkQ2xhc3MoXCItYW0tcG0tXCIpKX0sX3VwZGF0ZUN1cnJlbnRUaW1lOmZ1bmN0aW9uKCl7dmFyIHQ9cy5nZXRMZWFkaW5nWmVyb051bSh0aGlzLmRpc3BsYXlIb3VycyksZT1zLmdldExlYWRpbmdaZXJvTnVtKHRoaXMubWludXRlcyk7dGhpcy4kaG91cnNUZXh0Lmh0bWwodCksdGhpcy4kbWludXRlc1RleHQuaHRtbChlKSx0aGlzLmQuYW1wbSYmdGhpcy4kYW1wbS5odG1sKHRoaXMuZGF5UGVyaW9kKX0sX3VwZGF0ZVJhbmdlczpmdW5jdGlvbigpe3RoaXMuJGhvdXJzLmF0dHIoe21pbjp0aGlzLm1pbkhvdXJzLG1heDp0aGlzLm1heEhvdXJzfSkudmFsKHRoaXMuaG91cnMpLHRoaXMuJG1pbnV0ZXMuYXR0cih7bWluOnRoaXMubWluTWludXRlcyxtYXg6dGhpcy5tYXhNaW51dGVzfSkudmFsKHRoaXMubWludXRlcyl9LF9oYW5kbGVEYXRlOmZ1bmN0aW9uKHQpe3RoaXMuX3NldERlZmF1bHRNaW5NYXhUaW1lKCksdCYmKHMuaXNTYW1lKHQsdGhpcy5kLm9wdHMubWluRGF0ZSk/dGhpcy5fc2V0TWluVGltZUZyb21EYXRlKHRoaXMuZC5vcHRzLm1pbkRhdGUpOnMuaXNTYW1lKHQsdGhpcy5kLm9wdHMubWF4RGF0ZSkmJnRoaXMuX3NldE1heFRpbWVGcm9tRGF0ZSh0aGlzLmQub3B0cy5tYXhEYXRlKSksdGhpcy5fdmFsaWRhdGVIb3Vyc01pbnV0ZXModCl9LHVwZGF0ZTpmdW5jdGlvbigpe3RoaXMuX3VwZGF0ZVJhbmdlcygpLHRoaXMuX3VwZGF0ZUN1cnJlbnRUaW1lKCl9LF9nZXRWYWxpZEhvdXJzRnJvbURhdGU6ZnVuY3Rpb24odCxlKXt2YXIgaT10LGE9dDt0IGluc3RhbmNlb2YgRGF0ZSYmKGk9cy5nZXRQYXJzZWREYXRlKHQpLGE9aS5ob3Vycyk7dmFyIG49ZXx8dGhpcy5kLmFtcG0saD1cImFtXCI7aWYobilzd2l0Y2goITApe2Nhc2UgMD09YTphPTEyO2JyZWFrO2Nhc2UgMTI9PWE6aD1cInBtXCI7YnJlYWs7Y2FzZSBhPjExOmEtPTEyLGg9XCJwbVwifXJldHVybntob3VyczphLGRheVBlcmlvZDpofX0sc2V0IGhvdXJzKHQpe3RoaXMuX2hvdXJzPXQ7dmFyIGU9dGhpcy5fZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlKHQpO3RoaXMuZGlzcGxheUhvdXJzPWUuaG91cnMsdGhpcy5kYXlQZXJpb2Q9ZS5kYXlQZXJpb2R9LGdldCBob3Vycygpe3JldHVybiB0aGlzLl9ob3Vyc30sX29uQ2hhbmdlUmFuZ2U6ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkscz1pLmF0dHIoXCJuYW1lXCIpO3RoaXMuZC50aW1lcGlja2VySXNBY3RpdmU9ITAsdGhpc1tzXT1pLnZhbCgpLHRoaXMuX3VwZGF0ZUN1cnJlbnRUaW1lKCksdGhpcy5kLl90cmlnZ2VyKFwidGltZUNoYW5nZVwiLFt0aGlzLmhvdXJzLHRoaXMubWludXRlc10pLHRoaXMuX2hhbmRsZURhdGUodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUpLHRoaXMudXBkYXRlKCl9LF9vblNlbGVjdERhdGU6ZnVuY3Rpb24odCxlKXt0aGlzLl9oYW5kbGVEYXRlKGUpLHRoaXMudXBkYXRlKCl9LF9vbk1vdXNlRW50ZXJSYW5nZTpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5hdHRyKFwibmFtZVwiKTtlKFwiLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1cIitpLHRoaXMuJHRpbWVwaWNrZXIpLmFkZENsYXNzKFwiLWZvY3VzLVwiKX0sX29uTW91c2VPdXRSYW5nZTpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5hdHRyKFwibmFtZVwiKTt0aGlzLmQuaW5Gb2N1c3x8ZShcIi5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtXCIraSx0aGlzLiR0aW1lcGlja2VyKS5yZW1vdmVDbGFzcyhcIi1mb2N1cy1cIil9LF9vbk1vdXNlVXBSYW5nZTpmdW5jdGlvbih0KXt0aGlzLmQudGltZXBpY2tlcklzQWN0aXZlPSExfX19KCl9KHdpbmRvdyxqUXVlcnkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSBqUXVlcnkg77+9IO+/ve+/ve+/ve+/ve+/ve+/vSwg77+977+9IO+/ve+/ve+/ve+/ve+/ve+/vSDvv70gaHRtbFxyXG4vL2ltcG9ydCAnanF1ZXJ5LTMuNC4xLm1pbi5qcyc7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG4vLyDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9IFxyXG5pbXBvcnQgJy4vY3NzL3N0eWxlLmNzcyc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv70g77+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9oZWFkZXIvaGVhZGVyLXN0eWxlLmNzcyc7ICAgICAgICAgLy/vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9sb2dvL2xvZ28uY3NzJzsgICAgICAgICAgICAgICAgICAgLy/vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL21lbnV0b3AvbWVudXRvcC5jc3MnOyAgICAgICAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9uLmNzcyc7ICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9uYXJyb3cuY3NzJzsvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+977+977+977+977+977+9IO+/vSDvv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL2NrbGlrYnV0dG9uL2NrbGlrYnV0dG9ud2l0ZS5jc3MnOyAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL3NlYXJjaGZvcm0vc2VhcmNoZm9ybS5jc3MnOyAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL21haW50ZXh0L21haW50ZXh0LmNzcyc7ICAgICAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL2Zvb3Rlci9mb290ZXJzdHlsZS5jc3MnOyAgICAgICAgICAvL++/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9mb290ZXIvY29tcGFueS9hZHZlcnQuY3NzJzsgICAgICAgLy/vv73vv73vv73vv73vv73vv73vv70g77+977+977+9IO+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9mb290ZXIvY29tcGFueS9jb21wYW55LmNzcyc7ICAgICAgLy/vv73vv73vv73vv70g77+977+977+977+9IO+/vSDvv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvZm9vdGVyL2NvcHlyaXRlL2NvcHlyaXRlLmNzcyc7ICAgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5pbXBvcnQgJy4vbW9kdWxlcy9mb290ZXIvbWVudS9mb290ZXJtZW51LmNzcyc7ICAgICAgLy/vv73vv73vv73vv70g77+977+977+977+9XHJcbmltcG9ydCAnLi9tb2R1bGVzL2Zvb3Rlci9zb2NpYWwvc29jaWFsLmNzcyc7ICAgICAgICAvL++/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv71cclxuaW1wb3J0ICcuL21vZHVsZXMvZm9vdGVyL3N1YnNjcmliZS9zdWJzY3JpYmUuY3NzJzsgIC8v77+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5cclxuLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/vVxyXG4vL2ltcG9ydCAnLi9mb3JtZWxlbWVudC5odG1sJztcclxuLy9pbXBvcnQgaHRtbCBmcm9tIFwiLi9mb3JtZWxlbWVudC5odG1sXCI7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbi8v77+977+977+977+977+977+977+977+977+977+977+9IGRhdGVwaWNrZXJcclxuaW1wb3J0ICcuL21vZHVsZXMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLmNzcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5taW4uY3NzJztcclxuaW1wb3J0ICcuL21vZHVsZXMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1pbi5qcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5qcyc7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9XHJcbi8vaW1wb3J0IFwiLi9qcXVlcnktMy40LjEubWluLmpzXCI7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4vLyDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9XHJcbi8vaW1wb3J0IEljb24gZnJvbSAnLi9pY29uLnBuZyc7XHJcbiJdLCJuYW1lcyI6WyJ3aW5kb3ciLCIkIiwidW5kZWZpbmVkIiwiVkVSU0lPTiIsInBsdWdpbk5hbWUiLCJhdXRvSW5pdFNlbGVjdG9yIiwiJGJvZHkiLCIkZGF0ZXBpY2tlcnNDb250YWluZXIiLCJjb250YWluZXJCdWlsdCIsImJhc2VUZW1wbGF0ZSIsImRlZmF1bHRzIiwiY2xhc3NlcyIsImlubGluZSIsImxhbmd1YWdlIiwic3RhcnREYXRlIiwiRGF0ZSIsImZpcnN0RGF5Iiwid2Vla2VuZHMiLCJkYXRlRm9ybWF0IiwiYWx0RmllbGQiLCJhbHRGaWVsZERhdGVGb3JtYXQiLCJ0b2dnbGVTZWxlY3RlZCIsImtleWJvYXJkTmF2IiwicG9zaXRpb24iLCJvZmZzZXQiLCJ2aWV3IiwibWluVmlldyIsInNob3dPdGhlck1vbnRocyIsInNlbGVjdE90aGVyTW9udGhzIiwibW92ZVRvT3RoZXJNb250aHNPblNlbGVjdCIsInNob3dPdGhlclllYXJzIiwic2VsZWN0T3RoZXJZZWFycyIsIm1vdmVUb090aGVyWWVhcnNPblNlbGVjdCIsIm1pbkRhdGUiLCJtYXhEYXRlIiwiZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlIiwibXVsdGlwbGVEYXRlcyIsIm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IiLCJyYW5nZSIsInRvZGF5QnV0dG9uIiwiY2xlYXJCdXR0b24iLCJzaG93RXZlbnQiLCJhdXRvQ2xvc2UiLCJtb250aHNGaWVsZCIsInByZXZIdG1sIiwibmV4dEh0bWwiLCJuYXZUaXRsZXMiLCJkYXlzIiwibW9udGhzIiwieWVhcnMiLCJ0aW1lcGlja2VyIiwib25seVRpbWVwaWNrZXIiLCJkYXRlVGltZVNlcGFyYXRvciIsInRpbWVGb3JtYXQiLCJtaW5Ib3VycyIsIm1heEhvdXJzIiwibWluTWludXRlcyIsIm1heE1pbnV0ZXMiLCJob3Vyc1N0ZXAiLCJtaW51dGVzU3RlcCIsIm9uU2VsZWN0Iiwib25TaG93Iiwib25IaWRlIiwib25DaGFuZ2VNb250aCIsIm9uQ2hhbmdlWWVhciIsIm9uQ2hhbmdlRGVjYWRlIiwib25DaGFuZ2VWaWV3Iiwib25SZW5kZXJDZWxsIiwiaG90S2V5cyIsImRhdGVwaWNrZXIiLCJEYXRlcGlja2VyIiwiZWwiLCJvcHRpb25zIiwiJGVsIiwib3B0cyIsImV4dGVuZCIsImRhdGEiLCJub2RlTmFtZSIsImVsSXNJbnB1dCIsIiRhbHRGaWVsZCIsImluaXRlZCIsInZpc2libGUiLCJzaWxlbnQiLCJjdXJyZW50RGF0ZSIsImN1cnJlbnRWaWV3IiwiX2NyZWF0ZVNob3J0Q3V0cyIsInNlbGVjdGVkRGF0ZXMiLCJ2aWV3cyIsImtleXMiLCJtaW5SYW5nZSIsIm1heFJhbmdlIiwiX3ByZXZPblNlbGVjdFZhbHVlIiwiaW5pdCIsInByb3RvdHlwZSIsInZpZXdJbmRleGVzIiwiX2J1aWxkRGF0ZXBpY2tlcnNDb250YWluZXIiLCJfYnVpbGRCYXNlSHRtbCIsIl9kZWZpbmVMb2NhbGUiLCJfc3luY1dpdGhNaW5NYXhEYXRlcyIsIl9zZXRQb3NpdGlvbkNsYXNzZXMiLCJfYmluZEV2ZW50cyIsIl9iaW5kS2V5Ym9hcmRFdmVudHMiLCIkZGF0ZXBpY2tlciIsIm9uIiwiX29uTW91c2VEb3duRGF0ZXBpY2tlciIsImJpbmQiLCJfb25Nb3VzZVVwRGF0ZXBpY2tlciIsImFkZENsYXNzIiwiZm4iLCJUaW1lcGlja2VyIiwiX2JpbmRUaW1lcGlja2VyRXZlbnRzIiwiQm9keSIsInNob3ciLCJuYXYiLCJOYXZpZ2F0aW9uIiwiX29uQ2xpY2tDZWxsIiwiX29uTW91c2VFbnRlckNlbGwiLCJfb25Nb3VzZUxlYXZlQ2VsbCIsIl9vblNob3dFdmVudCIsIl9vbk1vdXNlVXBFbCIsIl9vbkJsdXIiLCJfb25LZXlVcEdlbmVyYWwiLCJfb25SZXNpemUiLCJfb25Nb3VzZVVwQm9keSIsIl9vbktleURvd24iLCJfb25LZXlVcCIsIl9vbkhvdEtleSIsIl9vblRpbWVDaGFuZ2UiLCJpc1dlZWtlbmQiLCJkYXkiLCJpbmRleE9mIiwibGFuZyIsImxvYyIsImNvbnNvbGUiLCJ3YXJuIiwicnUiLCJqb2luIiwiYm91bmRhcnkiLCJfZ2V0V29yZEJvdW5kYXJ5UmVnRXhwIiwibWF0Y2giLCJhbXBtIiwiYXBwZW5kIiwiJGFwcGVuZFRhcmdldCIsIiRpbmxpbmUiLCJpbnNlcnRBZnRlciIsImFwcGVuZFRvIiwiJGNvbnRlbnQiLCIkbmF2IiwiX3RyaWdnZXJPbkNoYW5nZSIsImxlbmd0aCIsInBhcnNlZFNlbGVjdGVkIiwiZ2V0UGFyc2VkRGF0ZSIsImZvcm1hdHRlZERhdGVzIiwiX3RoaXMiLCJkYXRlcyIsInllYXIiLCJtb250aCIsImRhdGUiLCJob3VycyIsIm1pbnV0ZXMiLCJtYXAiLCJmb3JtYXREYXRlIiwicGFyc2VkRGF0ZSIsIm5leHQiLCJkIiwibyIsImN1ckRlY2FkZSIsInByZXYiLCJzdHJpbmciLCJyZXN1bHQiLCJsb2NhbGUiLCJsZWFkaW5nWmVybyIsImdldExlYWRpbmdaZXJvTnVtIiwiZGVjYWRlIiwiZ2V0RGVjYWRlIiwiZnVsbEhvdXJzIiwiZGF5UGVyaW9kIiwicmVwbGFjZXIiLCJfcmVwbGFjZXIiLCJ2YWxpZEhvdXJzIiwiX2dldFZhbGlkSG91cnNGcm9tRGF0ZSIsInRlc3QiLCJyZXBsYWNlIiwiZ2V0VGltZSIsInRvVXBwZXJDYXNlIiwiZnVsbERhdGUiLCJkYXlzU2hvcnQiLCJmdWxsTW9udGgiLCJtb250aHNTaG9ydCIsImZ1bGxNaW51dGVzIiwidG9TdHJpbmciLCJzbGljZSIsInN0ciIsInJlZyIsInAxIiwicDIiLCJwMyIsInNpZ24iLCJzeW1ib2xzIiwiUmVnRXhwIiwic2VsZWN0RGF0ZSIsImxlbiIsIm5ld0RhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwibGFzdFNlbGVjdGVkRGF0ZSIsIl9zZXRUaW1lIiwiX3RyaWdnZXIiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiX3JlbmRlciIsIl9pc1NlbGVjdGVkIiwicHVzaCIsImJpZ2dlciIsIl9zZXRJbnB1dFZhbHVlIiwidGltZXBpY2tlcklzQWN0aXZlIiwiaGlkZSIsInJlbW92ZURhdGUiLCJzZWxlY3RlZCIsInNvbWUiLCJjdXJEYXRlIiwiaSIsImlzU2FtZSIsInNwbGljZSIsInRvZGF5IiwiY2xlYXIiLCJ1cGRhdGUiLCJwYXJhbSIsInZhbHVlIiwiYXJndW1lbnRzIiwiX2FkZEJ1dHRvbnNJZk5lZWQiLCJzZXRQb3NpdGlvbiIsIl9oYW5kbGVEYXRlIiwiX3VwZGF0ZVJhbmdlcyIsIl91cGRhdGVDdXJyZW50VGltZSIsImN1clRpbWUiLCJtaW5UaW1lIiwibWF4VGltZSIsImNoZWNrRGF0ZSIsImNlbGxUeXBlIiwicmVzIiwiZm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0VmFsdWVzIiwidmFsIiwiX2lzSW5SYW5nZSIsInR5cGUiLCJ0aW1lIiwibWluIiwibWF4IiwiZE1pblRpbWUiLCJkTWF4VGltZSIsInR5cGVzIiwiX2dldERpbWVuc2lvbnMiLCJ3aWR0aCIsIm91dGVyV2lkdGgiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsImxlZnQiLCJ0b3AiLCJfZ2V0RGF0ZUZyb21DZWxsIiwiY2VsbCIsInBvcyIsInNwbGl0IiwibWFpbiIsInNlYyIsInJlbW92ZUF0dHIiLCJkaW1zIiwic2VsZkRpbXMiLCJzZWNvbmRhcnkiLCJjc3MiLCJfYmluZFZpc2lvbkV2ZW50cyIsInJlbW92ZUNsYXNzIiwiZm9jdXNlZCIsImluRm9jdXMiLCJibHVyIiwiZG93biIsIl9jaGFuZ2VWaWV3IiwidXAiLCJldmVudCIsIm9mZiIsIm9uZSIsImRpciIsIm5leHRWaWV3Iiwidmlld0luZGV4IiwiX2hhbmRsZUhvdEtleSIsImtleSIsIl9nZXRGb2N1c2VkRGF0ZSIsImZvY3VzZWRQYXJzZWQiLCJ0b3RhbERheXNJbk5leHRNb250aCIsIm1vbnRoQ2hhbmdlZCIsInllYXJDaGFuZ2VkIiwiZGVjYWRlQ2hhbmdlZCIsInkiLCJtIiwiZ2V0RGF5c0NvdW50IiwiX3JlZ2lzdGVyS2V5IiwiZXhpc3RzIiwiY3VyS2V5IiwiX3VuUmVnaXN0ZXJLZXkiLCJpbmRleCIsIl9pc0hvdEtleVByZXNzZWQiLCJjdXJyZW50SG90S2V5IiwiZm91bmQiLCJwcmVzc2VkS2V5cyIsInNvcnQiLCJob3RLZXkiLCJldmVyeSIsImFyZ3MiLCJ0cmlnZ2VyIiwiX2ZvY3VzTmV4dENlbGwiLCJrZXlDb2RlIiwibmQiLCJnZXREYXRlIiwiX2dldENlbGwiLCJzZWxlY3RvciIsIiRjZWxsIiwiZmluZCIsImRlc3Ryb3kiLCJjbG9zZXN0IiwicmVtb3ZlIiwiX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzIiwiYWxyZWFkeVNlbGVjdGVkIiwic2VsZWN0ZWREYXRlIiwiZSIsIm9yaWdpbmFsRXZlbnQiLCJ0aW1lcGlja2VyRm9jdXMiLCJmb2N1cyIsInNldFRpbWVvdXQiLCJjb2RlIiwid2hpY2giLCJwcmV2ZW50RGVmYXVsdCIsImhhc0NsYXNzIiwidGFyZ2V0IiwibGVzcyIsIl91cGRhdGUiLCJoIiwiX2ZvY3VzZWQiLCJwcmV2VmlldyIsInN1YnN0cmluZyIsImdldERheSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImZpcnN0WWVhciIsIk1hdGgiLCJmbG9vciIsInRlbXBsYXRlIiwic291cmNlIiwiZGF0ZTEiLCJkYXRlMiIsImQxIiwiZDIiLCJfdHlwZSIsImNvbmRpdGlvbnMiLCJkYXRlQ29tcGFyZVRvIiwibnVtIiwicGFyc2VJbnQiLCJyZXNldFRpbWUiLCJlYWNoIiwiQ29uc3RydWN0b3IiLCJkYXlzTWluIiwidGVtcGxhdGVzIiwiZHAiLCJwcm94eSIsIiRuYW1lcyIsIiRjZWxscyIsIl9nZXREYXlOYW1lc0h0bWwiLCJjdXJEYXkiLCJodG1sIiwiX2dldENlbGxDb250ZW50cyIsInBhcmVudCIsInJlbmRlciIsImRpc2FibGVkIiwiX2dldERheXNIdG1sIiwidG90YWxNb250aERheXMiLCJmaXJzdE1vbnRoRGF5IiwibGFzdE1vbnRoRGF5IiwiZGF5c0Zyb21QZXZNb250aCIsImRheXNGcm9tTmV4dE1vbnRoIiwic3RhcnREYXlJbmRleCIsIl9nZXREYXlIdG1sIiwiY29udGVudCIsIl9nZXRNb250aHNIdG1sIiwiX2dldE1vbnRoSHRtbCIsIl9nZXRZZWFyc0h0bWwiLCJfZ2V0WWVhckh0bWwiLCJfcmVuZGVyVHlwZXMiLCJkYXlOYW1lcyIsImF0dHIiLCJhY2l0dmUiLCJhY3RpdmUiLCJfaGFuZGxlQ2xpY2siLCJidXR0b25zQ29udGFpbmVyVGVtcGxhdGUiLCJidXR0b24iLCIkYnV0dG9uc0NvbnRhaW5lciIsIl9vbkNsaWNrTmF2QnV0dG9uIiwiX29uQ2xpY2tOYXZUaXRsZSIsIl9hZGRCdXR0b24iLCJ0aXRsZSIsIl9nZXRUaXRsZSIsInNldE5hdlN0YXR1cyIsIl9hZGRCdXR0b25zQ29udGFpbmVyIiwiYWN0aW9uIiwibGFiZWwiLCJfZGlzYWJsZU5hdiIsIl9hY3RpdmF0ZU5hdiIsImluc3QiLCJpbnB1dCIsIl9idWlsZEhUTUwiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJfb25TZWxlY3REYXRlIiwiJHJhbmdlcyIsIl9vbkNoYW5nZVJhbmdlIiwiX29uTW91c2VVcFJhbmdlIiwiX29uTW91c2VFbnRlclJhbmdlIiwiX29uTW91c2VPdXRSYW5nZSIsIl9kYXRlIiwiX3NldE1pblRpbWVGcm9tRGF0ZSIsIl9zZXRNYXhUaW1lRnJvbURhdGUiLCJfc2V0RGVmYXVsdE1pbk1heFRpbWUiLCJfdmFsaWRhdGVIb3Vyc01pbnV0ZXMiLCJseiIsImhvdXJNaW4iLCJob3VyTWF4IiwiaG91clN0ZXAiLCJob3VyVmFsdWUiLCJob3VyVmlzaWJsZSIsImRpc3BsYXlIb3VycyIsIm1pbk1pbiIsIm1pbk1heCIsIm1pblN0ZXAiLCJtaW5WYWx1ZSIsIl90ZW1wbGF0ZSIsIiR0aW1lcGlja2VyIiwiJGhvdXJzIiwiJG1pbnV0ZXMiLCIkaG91cnNUZXh0IiwiJG1pbnV0ZXNUZXh0IiwiJGFtcG0iLCJfYW1wbSIsIl9ob3VycyIsIiR0YXJnZXQiLCJuYW1lIiwialF1ZXJ5IiwidCIsInMiLCJhIiwibiIsInIiLCJjIiwibCIsInUiLCJjdHJsUmlnaHQiLCJjdHJsVXAiLCJjdHJsTGVmdCIsImN0cmxEb3duIiwic2hpZnRSaWdodCIsInNoaWZ0VXAiLCJzaGlmdExlZnQiLCJzaGlmdERvd24iLCJhbHRVcCIsImFsdFJpZ2h0IiwiYWx0TGVmdCIsImFsdERvd24iLCJjdHJsU2hpZnRVcCIsInAiXSwic291cmNlUm9vdCI6IiJ9