(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
	(factory((global['ngx-mydatepicker'] = global['ngx-mydatepicker'] || {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,_angular_core,_angular_forms,_angular_common) { 'use strict';

var M = "m";
var MM = "mm";
var MMM = "mmm";
var D = "d";
var DD = "dd";
var YYYY = "yyyy";
var UtilService = (function () {
    function UtilService() {
        this.weekDays = ["su", "mo", "tu", "we", "th", "fr", "sa"];
    }
    UtilService.prototype.isDateValid = function (dateStr, dateFormat, minYear, maxYear, disableUntil, disableSince, disableWeekends, disableDates, disableDateRanges, disableWeekdays, monthLabels, enableDates) {
        var returnDate = { day: 0, month: 0, year: 0 };
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var isMonthStr = dateFormat.indexOf(MMM) !== -1;
        var delimeters = dateFormat.match(/[^(dmy)]{1,}/g);
        var dateValue = this.getDateValue(dateStr, dateFormat, delimeters);
        var year = this.getNumberByValue(dateValue[0]);
        var month = isMonthStr ? this.getMonthNumberByMonthName(dateValue[1], monthLabels) : this.getNumberByValue(dateValue[1]);
        var day = this.getNumberByValue(dateValue[2]);
        if (month !== -1 && day !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return returnDate;
            }
            var date = { year: year, month: month, day: day };
            if (this.isDisabledDate(date, minYear, maxYear, disableUntil, disableSince, disableWeekends, disableDates, disableDateRanges, disableWeekdays, enableDates)) {
                return returnDate;
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }
            if (day < 1 || day > daysInMonth[month - 1]) {
                return returnDate;
            }
            return date;
        }
        return returnDate;
    };
    UtilService.prototype.getDateValue = function (dateStr, dateFormat, delimeters) {
        var del = delimeters[0];
        if (delimeters[0] !== delimeters[1]) {
            del = delimeters[0] + delimeters[1];
        }
        var re = new RegExp("[" + del + "]");
        var ds = dateStr.split(re);
        var df = dateFormat.split(re);
        var da = [];
        for (var i = 0; i < df.length; i++) {
            if (df[i].indexOf(YYYY) !== -1) {
                da[0] = { value: ds[i], format: df[i] };
            }
            if (df[i].indexOf(M) !== -1) {
                da[1] = { value: ds[i], format: df[i] };
            }
            if (df[i].indexOf(D) !== -1) {
                da[2] = { value: ds[i], format: df[i] };
            }
        }
        return da;
    };
    UtilService.prototype.getMonthNumberByMonthName = function (df, monthLabels) {
        if (df.value) {
            for (var key = 1; key <= 12; key++) {
                if (df.value.toLowerCase() === monthLabels[key].toLowerCase()) {
                    return key;
                }
            }
        }
        return -1;
    };
    UtilService.prototype.getNumberByValue = function (df) {
        if (!/^\d+$/.test(df.value)) {
            return -1;
        }
        var nbr = Number(df.value);
        if (df.format.length === 1 && df.value.length !== 1 && nbr < 10 || df.format.length === 1 && df.value.length !== 2 && nbr >= 10) {
            nbr = -1;
        }
        else if (df.format.length === 2 && df.value.length > 2) {
            nbr = -1;
        }
        return nbr;
    };
    UtilService.prototype.parseDefaultMonth = function (monthString) {
        var month = { monthTxt: "", monthNbr: 0, year: 0 };
        if (monthString !== "") {
            var split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? parseInt(split[0]) : parseInt(split[1]);
            month.year = split[0].length === 2 ? parseInt(split[1]) : parseInt(split[0]);
        }
        return month;
    };
    UtilService.prototype.isDisabledDate = function (date, minYear, maxYear, disableUntil, disableSince, disableWeekends, disableDates, disableDateRanges, disableWeekdays, enableDates) {
        for (var _i = 0, enableDates_1 = enableDates; _i < enableDates_1.length; _i++) {
            var d = enableDates_1[_i];
            if ((d.year === 0 || d.year === date.year) && (d.month === 0 || d.month === date.month) && d.day === date.day) {
                return false;
            }
        }
        if (date.year < minYear && date.month === 12 || date.year > maxYear && date.month === 1) {
            return true;
        }
        var dateMs = this.getTimeInMilliseconds(date);
        if (this.isInitializedDate(disableUntil) && dateMs <= this.getTimeInMilliseconds(disableUntil)) {
            return true;
        }
        if (this.isInitializedDate(disableSince) && dateMs >= this.getTimeInMilliseconds(disableSince)) {
            return true;
        }
        if (disableWeekends) {
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return true;
            }
        }
        var dn = this.getDayNumber(date);
        if (disableWeekdays.length > 0) {
            for (var _a = 0, disableWeekdays_1 = disableWeekdays; _a < disableWeekdays_1.length; _a++) {
                var wd = disableWeekdays_1[_a];
                if (dn === this.getWeekdayIndex(wd)) {
                    return true;
                }
            }
        }
        for (var _b = 0, disableDates_1 = disableDates; _b < disableDates_1.length; _b++) {
            var d = disableDates_1[_b];
            if ((d.year === 0 || d.year === date.year) && (d.month === 0 || d.month === date.month) && d.day === date.day) {
                return true;
            }
        }
        for (var _c = 0, disableDateRanges_1 = disableDateRanges; _c < disableDateRanges_1.length; _c++) {
            var d = disableDateRanges_1[_c];
            if (this.isInitializedDate(d.begin) && this.isInitializedDate(d.end) && dateMs >= this.getTimeInMilliseconds(d.begin) && dateMs <= this.getTimeInMilliseconds(d.end)) {
                return true;
            }
        }
        return false;
    };
    UtilService.prototype.isMarkedDate = function (date, markedDates, markWeekends) {
        for (var _i = 0, markedDates_1 = markedDates; _i < markedDates_1.length; _i++) {
            var md = markedDates_1[_i];
            for (var _a = 0, _b = md.dates; _a < _b.length; _a++) {
                var d = _b[_a];
                if (d.year === date.year && d.month === date.month && d.day === date.day) {
                    return { marked: true, color: md.color };
                }
            }
        }
        if (markWeekends && markWeekends.marked) {
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return { marked: true, color: markWeekends.color };
            }
        }
        return { marked: false, color: "" };
    };
    UtilService.prototype.isHighlightedDate = function (date, sunHighlight, satHighlight, highlightDates) {
        var dayNbr = this.getDayNumber(date);
        if (sunHighlight && dayNbr === 0 || satHighlight && dayNbr === 6) {
            return true;
        }
        for (var _i = 0, highlightDates_1 = highlightDates; _i < highlightDates_1.length; _i++) {
            var d = highlightDates_1[_i];
            if (d.year === date.year && d.month === date.month && d.day === date.day) {
                return true;
            }
        }
        return false;
    };
    UtilService.prototype.getWeekNumber = function (date) {
        var d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
        return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
    };
    UtilService.prototype.isMonthDisabledByDisableUntil = function (date, disableUntil) {
        return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
    };
    UtilService.prototype.isMonthDisabledByDisableSince = function (date, disableSince) {
        return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
    };
    UtilService.prototype.getDateModel = function (date, dateFormat, monthLabels, dateStr) {
        if (dateStr === void 0) { dateStr = ""; }
        return { date: date, jsdate: this.getDate(date), formatted: dateStr.length ? dateStr : this.formatDate(date, dateFormat, monthLabels), epoc: Math.round(this.getTimeInMilliseconds(date) / 1000.0) };
    };
    UtilService.prototype.formatDate = function (date, dateFormat, monthLabels) {
        var formatted = dateFormat.replace(YYYY, String(date.year));
        if (dateFormat.indexOf(MMM) !== -1) {
            formatted = formatted.replace(MMM, monthLabels[date.month]);
        }
        else if (dateFormat.indexOf(MM) !== -1) {
            formatted = formatted.replace(MM, this.preZero(date.month));
        }
        else {
            formatted = formatted.replace(M, String(date.month));
        }
        if (dateFormat.indexOf(DD) !== -1) {
            formatted = formatted.replace(DD, this.preZero(date.day));
        }
        else {
            formatted = formatted.replace(D, String(date.day));
        }
        return formatted;
    };
    UtilService.prototype.preZero = function (val) {
        return val < 10 ? "0" + val : String(val);
    };
    UtilService.prototype.isInitializedDate = function (date) {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    };
    UtilService.prototype.getTimeInMilliseconds = function (date) {
        return this.getDate(date).getTime();
    };
    UtilService.prototype.getDate = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
    };
    UtilService.prototype.getDayNumber = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getDay();
    };
    UtilService.prototype.getWeekdayIndex = function (wd) {
        return this.weekDays.indexOf(wd);
    };
    UtilService.decorators = [
        { type: _angular_core.Injectable },
    ];
    UtilService.ctorParameters = [];
    return UtilService;
}());

var Year;
(function (Year) {
    Year[Year["min"] = 1000] = "min";
    Year[Year["max"] = 9999] = "max";
})(Year || (Year = {}));

var NgxMyDatePickerConfig = (function () {
    function NgxMyDatePickerConfig() {
        this.dayLabels = { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" };
        this.monthLabels = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" };
        this.dateFormat = "yyyy-mm-dd";
        this.showTodayBtn = true;
        this.todayBtnTxt = "Today";
        this.firstDayOfWeek = "mo";
        this.satHighlight = false;
        this.sunHighlight = true;
        this.highlightDates = [];
        this.markCurrentDay = true;
        this.markCurrentMonth = true;
        this.markCurrentYear = true;
        this.monthSelector = true;
        this.yearSelector = true;
        this.disableHeaderButtons = true;
        this.showWeekNumbers = false;
        this.selectorHeight = "232px";
        this.selectorWidth = "252px";
        this.disableUntil = { year: 0, month: 0, day: 0 };
        this.disableSince = { year: 0, month: 0, day: 0 };
        this.disableDates = [];
        this.enableDates = [];
        this.markDates = [];
        this.markWeekends = {};
        this.disableDateRanges = [];
        this.disableWeekends = false;
        this.disableWeekdays = [];
        this.alignSelectorRight = false;
        this.openSelectorTopOfInput = false;
        this.closeSelectorOnDateSelect = true;
        this.closeSelectorOnDocumentClick = true;
        this.minYear = Year.min;
        this.maxYear = Year.max;
        this.showSelectorArrow = true;
        this.allowSelectionOnlyInCurrentMonth = true;
        this.appendSelectorToBody = false;
        this.focusInputOnDateSelect = true;
        this.ariaLabelPrevMonth = "Previous Month";
        this.ariaLabelNextMonth = "Next Month";
        this.ariaLabelPrevYear = "Previous Year";
        this.ariaLabelNextYear = "Next Year";
    }
    NgxMyDatePickerConfig.decorators = [
        { type: _angular_core.Injectable },
    ];
    NgxMyDatePickerConfig.ctorParameters = [];
    return NgxMyDatePickerConfig;
}());

var FocusDirective = (function () {
    function FocusDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    FocusDirective.prototype.ngAfterViewInit = function () {
        if (this.value === "0") {
            return;
        }
        this.renderer.invokeElementMethod(this.el.nativeElement, "focus", []);
    };
    FocusDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: "[ngxfocus]"
                },] },
    ];
    FocusDirective.ctorParameters = [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.Renderer, },
    ];
    FocusDirective.propDecorators = {
        'value': [{ type: _angular_core.Input, args: ["ngxfocus",] },],
    };
    return FocusDirective;
}());

var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["enter"] = 13] = "enter";
    KeyCode[KeyCode["esc"] = 27] = "esc";
    KeyCode[KeyCode["space"] = 32] = "space";
    KeyCode[KeyCode["leftArrow"] = 37] = "leftArrow";
    KeyCode[KeyCode["upArrow"] = 38] = "upArrow";
    KeyCode[KeyCode["rightArrow"] = 39] = "rightArrow";
    KeyCode[KeyCode["downArrow"] = 40] = "downArrow";
    KeyCode[KeyCode["tab"] = 9] = "tab";
    KeyCode[KeyCode["shift"] = 16] = "shift";
})(KeyCode || (KeyCode = {}));

var MonthId;
(function (MonthId) {
    MonthId[MonthId["prev"] = 1] = "prev";
    MonthId[MonthId["curr"] = 2] = "curr";
    MonthId[MonthId["next"] = 3] = "next";
})(MonthId || (MonthId = {}));

var NgxMyDatePicker = (function () {
    function NgxMyDatePicker(elem, renderer, cdr, utilService) {
        var _this = this;
        this.elem = elem;
        this.renderer = renderer;
        this.cdr = cdr;
        this.utilService = utilService;
        this.visibleMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedDate = { year: 0, month: 0, day: 0 };
        this.weekDays = [];
        this.dates = [];
        this.months = [];
        this.years = [];
        this.disableTodayBtn = false;
        this.dayIdx = 0;
        this.weekDayOpts = ["su", "mo", "tu", "we", "th", "fr", "sa"];
        this.selectMonth = false;
        this.selectYear = false;
        this.selectorPos = null;
        this.prevMonthDisabled = false;
        this.nextMonthDisabled = false;
        this.prevYearDisabled = false;
        this.nextYearDisabled = false;
        this.prevYearsDisabled = false;
        this.nextYearsDisabled = false;
        this.prevMonthId = MonthId.prev;
        this.currMonthId = MonthId.curr;
        this.nextMonthId = MonthId.next;
        this.clickListener = renderer.listen(elem.nativeElement, "click", function (evt) {
            if ((_this.opts.monthSelector || _this.opts.yearSelector) && evt.target) {
                _this.resetMonthYearSelect();
            }
        });
    }
    NgxMyDatePicker.prototype.ngOnDestroy = function () {
        this.clickListener();
    };
    NgxMyDatePicker.prototype.initialize = function (opts, defaultMonth, selectorPos, inputValue, dc, cvc, cbe) {
        this.opts = opts;
        this.selectorPos = selectorPos;
        this.weekDays.length = 0;
        this.isTodayDisabled();
        this.dayIdx = this.weekDayOpts.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            var idx = this.dayIdx;
            for (var i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === "sa" ? 0 : idx + 1;
            }
        }
        var date = this.utilService.isDateValid(inputValue, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.monthLabels, this.opts.enableDates);
        if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
            this.selectedDate = date;
        }
        else {
            if (defaultMonth !== null && defaultMonth !== undefined && defaultMonth !== "") {
                this.selectedMonth = this.utilService.parseDefaultMonth(defaultMonth);
            }
        }
        this.dateChanged = dc;
        this.calendarViewChanged = cvc;
        this.closedByEsc = cbe;
        this.setVisibleMonth();
    };
    NgxMyDatePicker.prototype.setCalendarView = function (date) {
        this.selectedDate = date;
        this.setVisibleMonth();
    };
    NgxMyDatePicker.prototype.resetMonthYearSelect = function () {
        this.selectMonth = false;
        this.selectYear = false;
    };
    NgxMyDatePicker.prototype.onSelectMonthClicked = function (event) {
        event.stopPropagation();
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            var today = this.getToday();
            this.months.length = 0;
            for (var i = 1; i <= 12; i += 3) {
                var row = [];
                for (var j = i; j < i + 3; j++) {
                    var disabled = this.utilService.isMonthDisabledByDisableUntil({ year: this.visibleMonth.year, month: j, day: this.daysInMonth(j, this.visibleMonth.year) }, this.opts.disableUntil)
                        || this.utilService.isMonthDisabledByDisableSince({ year: this.visibleMonth.year, month: j, day: 1 }, this.opts.disableSince);
                    row.push({ nbr: j, name: this.opts.monthLabels[j], currMonth: j === today.month && this.visibleMonth.year === today.year, selected: j === this.visibleMonth.monthNbr, disabled: disabled });
                }
                this.months.push(row);
            }
        }
    };
    NgxMyDatePicker.prototype.onMonthCellClicked = function (cell) {
        var mc = cell.nbr !== this.visibleMonth.monthNbr;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[cell.nbr], monthNbr: cell.nbr, year: this.visibleMonth.year };
        this.generateCalendar(cell.nbr, this.visibleMonth.year, mc);
        this.selectMonth = false;
        this.selectorEl.nativeElement.focus();
    };
    NgxMyDatePicker.prototype.onMonthCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onMonthCellClicked(cell);
        }
    };
    NgxMyDatePicker.prototype.onSelectYearClicked = function (event) {
        event.stopPropagation();
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(this.visibleMonth.year);
        }
    };
    NgxMyDatePicker.prototype.onYearCellClicked = function (cell) {
        var yc = cell.year !== this.visibleMonth.year;
        this.visibleMonth = { monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: cell.year };
        this.generateCalendar(this.visibleMonth.monthNbr, cell.year, yc);
        this.selectYear = false;
        this.selectorEl.nativeElement.focus();
    };
    NgxMyDatePicker.prototype.onPrevYears = function (event, year) {
        event.stopPropagation();
        this.generateYears(year - 25);
    };
    NgxMyDatePicker.prototype.onNextYears = function (event, year) {
        event.stopPropagation();
        this.generateYears(year + 25);
    };
    NgxMyDatePicker.prototype.generateYears = function (year) {
        this.years.length = 0;
        var today = this.getToday();
        for (var i = year; i <= 20 + year; i += 5) {
            var row = [];
            for (var j = i; j < i + 5; j++) {
                var disabled = this.utilService.isMonthDisabledByDisableUntil({ year: j, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, j) }, this.opts.disableUntil)
                    || this.utilService.isMonthDisabledByDisableSince({ year: j, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
                var minMax = j < this.opts.minYear || j > this.opts.maxYear;
                row.push({ year: j, currYear: j === today.year, selected: j === this.visibleMonth.year, disabled: disabled || minMax });
            }
            this.years.push(row);
        }
        this.prevYearsDisabled = this.years[0][0].year <= this.opts.minYear || this.utilService.isMonthDisabledByDisableUntil({ year: this.years[0][0].year - 1, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, this.years[0][0].year - 1) }, this.opts.disableUntil);
        this.nextYearsDisabled = this.years[4][4].year >= this.opts.maxYear || this.utilService.isMonthDisabledByDisableSince({ year: this.years[4][4].year + 1, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
    };
    NgxMyDatePicker.prototype.onYearCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onYearCellClicked(cell);
        }
    };
    NgxMyDatePicker.prototype.isTodayDisabled = function () {
        this.disableTodayBtn = this.utilService.isDisabledDate(this.getToday(), this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.enableDates);
    };
    NgxMyDatePicker.prototype.setVisibleMonth = function () {
        var y = 0, m = 0;
        if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                var today = this.getToday();
                y = today.year;
                m = today.month;
            }
            else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    NgxMyDatePicker.prototype.onPrevMonth = function () {
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    NgxMyDatePicker.prototype.onNextMonth = function () {
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    NgxMyDatePicker.prototype.onPrevYear = function () {
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    NgxMyDatePicker.prototype.onNextYear = function () {
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    NgxMyDatePicker.prototype.onCloseSelector = function (event) {
        if (event.keyCode === KeyCode.esc) {
            this.closedByEsc();
        }
    };
    NgxMyDatePicker.prototype.onTodayClicked = function () {
        var today = this.getToday();
        this.selectDate(today);
        if (!this.opts.closeSelectorOnDateSelect) {
            this.setVisibleMonth();
        }
    };
    NgxMyDatePicker.prototype.onCellClicked = function (cell) {
        if (cell.cmo === this.prevMonthId) {
            this.onPrevMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj);
            }
        }
        else if (cell.cmo === this.currMonthId) {
            this.selectDate(cell.dateObj);
        }
        else if (cell.cmo === this.nextMonthId) {
            this.onNextMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj);
            }
        }
        this.resetMonthYearSelect();
    };
    NgxMyDatePicker.prototype.onCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onCellClicked(cell);
        }
    };
    NgxMyDatePicker.prototype.selectDate = function (date) {
        this.selectedDate = date;
        this.dateChanged(this.utilService.getDateModel(date, this.opts.dateFormat, this.opts.monthLabels), this.opts.closeSelectorOnDateSelect);
    };
    NgxMyDatePicker.prototype.monthStartIdx = function (y, m) {
        var d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        var idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    };
    NgxMyDatePicker.prototype.daysInMonth = function (m, y) {
        return new Date(y, m, 0).getDate();
    };
    NgxMyDatePicker.prototype.daysInPrevMonth = function (m, y) {
        var d = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    };
    NgxMyDatePicker.prototype.isCurrDay = function (d, m, y, cmo, today) {
        return d === today.day && m === today.month && y === today.year && cmo === this.currMonthId;
    };
    NgxMyDatePicker.prototype.isDateStringAvailable = function (date) {
        if (this.opts.dateStrings) {
            var hasDateString_1 = false;
            this.opts.dateStrings.forEach(function (dateString) {
                if (dateString.date.day === date.day &&
                    dateString.date.month === date.month &&
                    dateString.date.year === date.year) {
                    hasDateString_1 = true;
                }
            });
            return hasDateString_1;
        }
        else {
            return false;
        }
    };
    NgxMyDatePicker.prototype.getDateString = function (date) {
        if (!this.opts.dateStrings) {
            return "";
        }
        var dateString = "-";
        this.opts.dateStrings.forEach(function (currDateString) {
            if (currDateString.date.day === date.day &&
                currDateString.date.month === date.month &&
                currDateString.date.year === date.year) {
                dateString = currDateString.string;
            }
        });
        return dateString;
    };
    NgxMyDatePicker.prototype.getToday = function () {
        var date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    NgxMyDatePicker.prototype.getDayNumber = function (date) {
        var d = this.getDate(date.year, date.month, date.day);
        return d.getDay();
    };
    NgxMyDatePicker.prototype.getWeekday = function (date) {
        return this.weekDayOpts[this.getDayNumber(date)];
    };
    NgxMyDatePicker.prototype.getDate = function (year, month, day) {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    NgxMyDatePicker.prototype.sundayIdx = function () {
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    };
    NgxMyDatePicker.prototype.generateCalendar = function (m, y, notifyChange) {
        this.dates.length = 0;
        var today = this.getToday();
        var monthStart = this.monthStartIdx(y, m);
        var dInThisM = this.daysInMonth(m, y);
        var dInPrevM = this.daysInPrevMonth(m, y);
        var dayNbr = 1;
        var cmo = this.prevMonthId;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                var pm = dInPrevM - monthStart + 1;
                for (var j = pm; j <= dInPrevM; j++) {
                    var date = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j };
                    week.push({ dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(j, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDate(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.enableDates),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                }
                cmo = this.currMonthId;
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDate(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.enableDates),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            else {
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        dayNbr = 1;
                        cmo = this.nextMonthId;
                    }
                    var date = { year: cmo === this.nextMonthId && m === 12 ? y + 1 : y, month: cmo === this.currMonthId ? m : cmo === this.nextMonthId && m < 12 ? m + 1 : 1, day: dayNbr };
                    week.push({ dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDate(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.enableDates),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            var weekNbr = this.opts.showWeekNumbers && this.opts.firstDayOfWeek === "mo" ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({ week: week, weekNbr: weekNbr });
        }
        this.setHeaderBtnDisabledState(m, y);
        if (notifyChange) {
            this.calendarViewChanged({ year: y, month: m, first: { number: 1, weekday: this.getWeekday({ year: y, month: m, day: 1 }) }, last: { number: dInThisM, weekday: this.getWeekday({ year: y, month: m, day: dInThisM }) } });
        }
    };
    NgxMyDatePicker.prototype.setHeaderBtnDisabledState = function (m, y) {
        var dpm = false;
        var dpy = false;
        var dnm = false;
        var dny = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.utilService.isMonthDisabledByDisableUntil({ year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y) }, this.opts.disableUntil);
            dpy = this.utilService.isMonthDisabledByDisableUntil({ year: y - 1, month: m, day: this.daysInMonth(m, y - 1) }, this.opts.disableUntil);
            dnm = this.utilService.isMonthDisabledByDisableSince({ year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1 }, this.opts.disableSince);
            dny = this.utilService.isMonthDisabledByDisableSince({ year: y + 1, month: m, day: 1 }, this.opts.disableSince);
        }
        this.prevMonthDisabled = m === 1 && y === this.opts.minYear || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = m === 12 && y === this.opts.maxYear || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    };
    NgxMyDatePicker.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: "ngx-my-date-picker",
                    styles: [".ngxmdp .headertodaybtn,.ngxmdp .monthcell,.ngxmdp .weekdaytitle{overflow:hidden;white-space:nowrap}.ngxmdp *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.ngxmdp .selector{position:absolute;padding:0;border:1px solid #CCC;border-radius:4px;z-index:100000;animation:selectorfadein 60ms}.ngxmdp .selector:focus{border:1px solid #ADD8E6;outline:0}@keyframes selectorfadein{from{opacity:0}to{opacity:1}}.ngxmdp .selectorarrow{background:#FAFAFA;padding:0}.ngxmdp .selectorarrow:after,.ngxmdp .selectorarrow:before{bottom:100%;border:solid transparent;content:\" \";height:0;width:0;position:absolute}.ngxmdp .selectorarrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#FAFAFA;border-width:10px;margin-left:-10px}.ngxmdp .selectorarrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#CCC;border-width:11px;margin-left:-11px}.ngxmdp .selectorarrow:focus:before{border-bottom-color:#ADD8E6}.ngxmdp .selectorarrowleft:after,.ngxmdp .selectorarrowleft:before{left:24px}.ngxmdp .selectorarrowright:after,.ngxmdp .selectorarrowright:before{left:86%}.ngxmdp ::-ms-clear{display:none}.ngxmdp .headerbtnenabled,.ngxmdp .headertodaybtnenabled,.ngxmdp .yearchangebtnenabled{cursor:pointer}.ngxmdp .headerbtndisabled,.ngxmdp .headertodaybtndisabled,.ngxmdp .yearchangebtndisabled{cursor:not-allowed;opacity:.65}.ngxmdp .headertodaybtn{background:#FFF}.ngxmdp .header{width:100%;height:30px;border-radius:4px 4px 0 0;background-color:#FAFAFA}.ngxmdp .header td{vertical-align:middle;border:none;line-height:0}.ngxmdp .header td:nth-child(1){padding-left:4px}.ngxmdp .header td:nth-child(2){text-align:center}.ngxmdp .header td:nth-child(3){padding-right:4px}.ngxmdp .caltable,.ngxmdp .monthtable,.ngxmdp .yeartable{border-radius:0 0 4px 4px}.ngxmdp .caltable.hasDateStrings .daycell{position:relative;text-align:left;vertical-align:top}.ngxmdp .caltable.hasDateStrings .daycell .daycell-container{display:flex;height:100%;flex-direction:column;justify-content:space-between}.ngxmdp .caltable.hasDateStrings .datevalue{display:inline-block;text-align:left}.ngxmdp .caltable.hasDateStrings .pricevalue{display:inline-block;text-align:right;background-color:inherit}.ngxmdp .price{display:inline;font-size:11px}.ngxmdp .caltable tbody tr:nth-child(6) td:first-child,.ngxmdp .monthtable tbody tr:nth-child(4) td:first-child,.ngxmdp .yeartable tbody tr:nth-child(7) td:first-child{border-bottom-left-radius:4px}.ngxmdp .caltable tbody tr:nth-child(6) td:last-child,.ngxmdp .monthtable tbody tr:nth-child(4) td:last-child,.ngxmdp .yeartable tbody tr:nth-child(7) td:last-child{border-bottom-right-radius:4px}.ngxmdp .caltable,.ngxmdp .monthtable,.ngxmdp .yeartable{table-layout:fixed;width:100%;height:calc(100% - 30px);background-color:#FFF;font-size:14px}.ngxmdp .caltable,.ngxmdp .daycell,.ngxmdp .monthcell,.ngxmdp .monthtable,.ngxmdp .weekdaytitle,.ngxmdp .yearcell,.ngxmdp .yeartable{border-collapse:collapse;color:#036;line-height:1.1}.ngxmdp .daycell,.ngxmdp .monthcell,.ngxmdp .weekdaytitle,.ngxmdp .yearcell{padding:4px;text-align:center}.ngxmdp .weekdaytitle{background-color:#DDD;font-size:11px;font-weight:400;vertical-align:middle;max-width:36px}.ngxmdp .weekdaytitleweeknbr{width:20px;border-right:1px solid #BBB}.ngxmdp .monthcell{background-color:#FAFAFA}.ngxmdp .yearcell{background-color:#FAFAFA;width:20%}.ngxmdp .daycell .datevalue{background-color:inherit;vertical-align:middle}.ngxmdp .daycell .datevalue span{vertical-align:middle}.ngxmdp .daycellweeknbr{font-size:10px;border-right:1px solid #CCC;cursor:default;color:#000}.ngxmdp .nextmonth,.ngxmdp .prevmonth{color:#999}.ngxmdp .hidenoncurrent{background-color:#f9f9f9;color:#f9f9f9}.ngxmdp .hidenoncurrent .datevalue,.ngxmdp .hidenoncurrent .pricevalue{color:#f9f9f9}.ngxmdp .disabled{cursor:default!important;color:#CCC;background:#FBEFEF}.ngxmdp .hidenoncurrent.disabled{background-color:#f9f9f9!important;color:#f9f9f9}.ngxmdp .highlight{color:#C30000}.ngxmdp .dimday{opacity:.5}.ngxmdp .currmonth{background-color:#F6F6F6;font-weight:400}.ngxmdp .markdate{position:absolute;width:4px;height:4px;border-radius:4px}.ngxmdp .markcurrday,.ngxmdp .markcurrmonth,.ngxmdp .markcurryear{text-decoration:underline}.ngxmdp .selectedday{background-color:#8EBFFF!important}.ngxmdp .headerbtncell{background-color:#FAFAFA;display:table-cell;vertical-align:middle}.ngxmdp .yearchangebtncell{text-align:center;background-color:#FAFAFA}.ngxmdp .headerbtn,.ngxmdp .headerlabelbtn,.ngxmdp .yearchangebtn{background:#FAFAFA;border:none;height:22px}.ngxmdp .headerbtn{width:16px}.ngxmdp .headerlabelbtn{font-size:14px;outline:0;cursor:default}.ngxmdp .headerlabelbtnnotedit{cursor:default}.ngxmdp .headertodaybtn{border:1px solid #CCC;padding:0 4px;border-radius:4px;font-size:11px;height:22px;min-width:60px;max-width:84px}.ngxmdp .headerbtn,.ngxmdp .headermonthtxt,.ngxmdp .headertodaybtn,.ngxmdp .headeryeartxt,.ngxmdp .yearchangebtn{color:#000}.ngxmdp button::-moz-focus-inner{border:0}.ngxmdp .headermonthtxt,.ngxmdp .headeryeartxt{text-align:center;display:table-cell;vertical-align:middle;font-size:14px;height:26px;width:40px;max-width:40px;overflow:hidden;white-space:nowrap}.ngxmdp .headertodaybtn:focus{background:#ADD8E6}.ngxmdp .headerbtn:focus,.ngxmdp .monthlabel:focus,.ngxmdp .yearchangebtn:focus,.ngxmdp .yearlabel:focus{color:#ADD8E6;outline:0}.ngxmdp .daycell:focus,.ngxmdp .monthcell:focus,.ngxmdp .yearcell:focus{outline:#CCC solid 1px}.ngxmdp .icon-ngxmydpdown,.ngxmdp .icon-ngxmydpleft,.ngxmdp .icon-ngxmydpright,.ngxmdp .icon-ngxmydpup{color:#222;font-size:20px}.ngxmdp .icon-ngxmydptoday{color:#222;font-size:11px}.ngxmdp table{display:table;border-spacing:0}.ngxmdp table td{padding:0}.ngxmdp table,.ngxmdp td,.ngxmdp th{border:none}.ngxmdp .headertodaybtnenabled:hover{background-color:#E6E6E6}.ngxmdp .tablesingleday:hover,.ngxmdp .tablesinglemonth:hover,.ngxmdp .tablesingleyear:hover{background-color:#DDD}.ngxmdp .daycell,.ngxmdp .monthcell,.ngxmdp .monthlabel,.ngxmdp .yearcell,.ngxmdp .yearlabel{cursor:pointer}.ngxmdp .headerbtnenabled:hover,.ngxmdp .monthlabel:hover,.ngxmdp .yearchangebtnenabled:hover,.ngxmdp .yearlabel:hover{color:#777}@font-face{font-family:ngx-mydatepicker;src:url(data:application/octet-stream;base64,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QGBZZrABY7AEJmEgsAQlYGQjsAMlYGRQWCEbIyFZIyAgsAQmI0ZhOFktsDcssAAWICAgsAUmIC5HI0cjYSM8OC2wOCywABYgsAgjQiAgIEYjR7ABKyNhOC2wOSywABawAyWwAiVHI0cjYbAAVFguIDwjIRuwAiWwAiVHI0cjYSCwBSWwBCVHI0cjYbAGJbAFJUmwAiVhuQgACABjYyMgWGIbIVljuAQAYiCwAFBYsEBgWWawAWNgIy4jICA8ijgjIVktsDossAAWILAIQyAuRyNHI2EgYLAgYGawAmIgsABQWLBAYFlmsAFjIyAgPIo4LbA7LCMgLkawAiVGUlggPFkusSsBFCstsDwsIyAuRrACJUZQWCA8WS6xKwEUKy2wPSwjIC5GsAIlRlJYIDxZIyAuRrACJUZQWCA8WS6xKwEUKy2wPiywNSsjIC5GsAIlRlJYIDxZLrErARQrLbA/LLA2K4ogIDywBCNCijgjIC5GsAIlRlJYIDxZLrErARQrsARDLrArKy2wQCywABawBCWwBCYgLkcjRyNhsAlDKyMgPCAuIzixKwEUKy2wQSyxCAQlQrAAFrAEJbAEJSAuRyNHI2EgsAQjQrAJQysgsGBQWCCwQFFYswIgAyAbswImAxpZQkIjIEewBEOwAmIgsABQWLBAYFlmsAFjYCCwASsgiophILACQ2BkI7ADQ2FkUFiwAkNhG7ADQ2BZsAMlsAJiILAAUFiwQGBZZrABY2GwAiVGYTgjIDwjOBshICBGI0ewASsjYTghWbErARQrLbBCLLA1Ky6xKwEUKy2wQyywNishIyAgPLAEI0IjOLErARQrsARDLrArKy2wRCywABUgR7AAI0KyAAEBFRQTLrAxKi2wRSywABUgR7AAI0KyAAEBFRQTLrAxKi2wRiyxAAEUE7AyKi2wRyywNCotsEgssAAWRSMgLiBGiiNhOLErARQrLbBJLLAII0KwSCstsEossgAAQSstsEsssgABQSstsEwssgEAQSstsE0ssgEBQSstsE4ssgAAQistsE8ssgABQistsFAssgEAQistsFEssgEBQistsFIssgAAPistsFMssgABPistsFQssgEAPistsFUssgEBPistsFYssgAAQCstsFcssgABQCstsFgssgEAQCstsFkssgEBQCstsFossgAAQystsFsssgABQystsFwssgEAQystsF0ssgEBQystsF4ssgAAPystsF8ssgABPystsGAssgEAPystsGEssgEBPystsGIssDcrLrErARQrLbBjLLA3K7A7Ky2wZCywNyuwPCstsGUssAAWsDcrsD0rLbBmLLA4Ky6xKwEUKy2wZyywOCuwOystsGgssDgrsDwrLbBpLLA4K7A9Ky2waiywOSsusSsBFCstsGsssDkrsDsrLbBsLLA5K7A8Ky2wbSywOSuwPSstsG4ssDorLrErARQrLbBvLLA6K7A7Ky2wcCywOiuwPCstsHEssDorsD0rLbByLLMJBAIDRVghGyMhWUIrsAhlsAMkUHiwARUwLQBLuADIUlixAQGOWbABuQgACABjcLEABUKyAAEAKrEABUKzCgIBCCqxAAVCsw4AAQgqsQAGQroCwAABAAkqsQAHQroAQAABAAkqsQMARLEkAYhRWLBAiFixA2REsSYBiFFYugiAAAEEQIhjVFixAwBEWVlZWbMMAgEMKrgB/4WwBI2xAgBEAAA=) format('truetype');font-weight:400;font-style:normal}.ngxmdp .ngxmdpicon{font-family:ngx-mydatepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngxmdp .icon-ngxmydpright:before{content:\"\\e800\"}.ngxmdp .icon-ngxmydpleft:before{content:\"\\e801\"}.ngxmdp .icon-ngxmydptoday:before{content:\"\\e802\"}.ngxmdp .icon-ngxmydpup:before{content:\"\\e803\"}.ngxmdp .icon-ngxmydpdown:before{content:\"\\e804\"}"],
                    template: "<div class=\"ngxmdp\"><div class=\"selector\" #selectorEl [ngxfocus]=\"1\" [ngStyle]=\"{'width': opts.selectorWidth, 'height' : opts.selectorHeight, 'top': selectorPos.top, 'left': selectorPos.left}\" [ngClass]=\"{'selectorarrow': opts.showSelectorArrow, 'selectorarrowleft': opts.showSelectorArrow&&!opts.alignSelectorRight, 'selectorarrowright': opts.showSelectorArrow&&opts.alignSelectorRight}\" (keyup)=\"onCloseSelector($event)\" tabindex=\"0\"><table class=\"header\"><tr><td><div style=\"float:left\"><div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelPrevMonth\" class=\"headerbtn ngxmdpicon icon-ngxmydpleft\" (click)=\"onPrevMonth()\" [disabled]=\"prevMonthDisabled\" [ngClass]=\"{'headerbtnenabled': !prevMonthDisabled, 'headerbtndisabled': prevMonthDisabled}\"></button></div><div class=\"headermonthtxt\"><button class=\"headerlabelbtn\" [ngClass]=\"{'monthlabel': opts.monthSelector, 'headerlabelbtnnotedit': !opts.monthSelector}\" type=\"button\" (click)=\"opts.monthSelector&&onSelectMonthClicked($event)\" tabindex=\"{{opts.monthSelector?'0':'-1'}}\">{{visibleMonth.monthTxt}}</button></div><div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelNextMonth\" class=\"headerbtn ngxmdpicon icon-ngxmydpright\" (click)=\"onNextMonth()\" [disabled]=\"nextMonthDisabled\" [ngClass]=\"{'headerbtnenabled': !nextMonthDisabled, 'headerbtndisabled': nextMonthDisabled}\"></button></div></div></td><td><button *ngIf=\"opts.showTodayBtn\" type=\"button\" class=\"headertodaybtn\" (click)=\"onTodayClicked()\" [disabled]=\"disableTodayBtn\" [ngClass]=\"{'headertodaybtnenabled': !disableTodayBtn, 'headertodaybtndisabled': disableTodayBtn}\"><span class=\"ngxmdpicon icon-ngxmydptoday\"></span> <span>{{opts.todayBtnTxt}}</span></button></td><td><div style=\"float:right\"><div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelPrevYear\" class=\"headerbtn ngxmdpicon icon-ngxmydpleft\" (click)=\"onPrevYear()\" [disabled]=\"prevYearDisabled\" [ngClass]=\"{'headerbtnenabled': !prevYearDisabled, 'headerbtndisabled': prevYearDisabled}\"></button></div><div class=\"headeryeartxt\"><button class=\"headerlabelbtn\" [ngClass]=\"{'yearlabel': opts.yearSelector, 'headerlabelbtnnotedit': !opts.yearSelector}\" type=\"button\" (click)=\"opts.yearSelector&&onSelectYearClicked($event)\" tabindex=\"{{opts.yearSelector?'0':'-1'}}\">{{visibleMonth.year}}</button></div><div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelNextYear\" class=\"headerbtn ngxmdpicon icon-ngxmydpright\" (click)=\"onNextYear()\" [disabled]=\"nextYearDisabled\" [ngClass]=\"{'headerbtnenabled': !nextYearDisabled, 'headerbtndisabled': nextYearDisabled}\"></button></div></div></td></tr></table><table class=\"caltable\" *ngIf=\"!selectMonth&&!selectYear\"><thead><tr><th class=\"weekdaytitle weekdaytitleweeknbr\" *ngIf=\"opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'\">#</th><th class=\"weekdaytitle\" scope=\"col\" *ngFor=\"let d of weekDays\">{{d}}</th></tr></thead><tbody><tr *ngFor=\"let w of dates\"><td class=\"daycell daycellweeknbr\" *ngIf=\"opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'\">{{w.weekNbr}}</td><td class=\"daycell\" *ngFor=\"let d of w.week\" [ngClass]=\"{'currmonth':d.cmo===currMonthId&&!d.disabled, 'selectedday':selectedDate.day===d.dateObj.day && selectedDate.month===d.dateObj.month && selectedDate.year===d.dateObj.year && d.cmo===currMonthId, 'disabled': d.disabled, 'tablesingleday':(!opts.allowSelectionOnlyInCurrentMonth||d.cmo===currMonthId&&opts.allowSelectionOnlyInCurrentMonth)&&!d.disabled, 'hidenoncurrent': opts.hideNonCurrentMonth && d.cmo!==currMonthId}\" (click)=\"!d.disabled&&onCellClicked(d);$event.stopPropagation()\" (keydown)=\"onCellKeyDown($event, d)\" tabindex=\"0\"><div *ngIf=\"d.markedDate.marked\" class=\"markdate\" [ngStyle]=\"{'background-color': d.markedDate.color}\"></div><div class=\"daycell-container\"><div class=\"datevalue\" [ngClass]=\"{'prevmonth':d.cmo===prevMonthId,'currmonth':d.cmo===currMonthId,'nextmonth':d.cmo===nextMonthId,'highlight':d.highlight}\"><span class=\"daynumtext\" [ngClass]=\"{'markcurrday':d.currDay&&opts.markCurrentDay, 'dimday': d.highlight && (d.cmo===prevMonthId || d.cmo===nextMonthId || d.disabled)}\">{{d.dateObj.day}}</span></div><div class=\"pricevalue\" [ngClass]=\"{'prevmonth':d.cmo===prevMonthId,'currmonth':d.cmo===currMonthId,'nextmonth':d.cmo===nextMonthId}\"><span class=\"price\">{{ getDateString(d.dateObj) }}</span></div></div></td></tr></tbody></table><table class=\"monthtable\" *ngIf=\"selectMonth\"><tbody><tr *ngFor=\"let mr of months\"><td class=\"monthcell tablesinglemonth\" [ngClass]=\"{'selectedmonth': m.selected, 'disabled': m.disabled}\" *ngFor=\"let m of mr\" (click)=\"!m.disabled&&onMonthCellClicked(m);$event.stopPropagation()\" (keydown)=\"onMonthCellKeyDown($event, m)\" tabindex=\"0\"><div class=\"monthvalue\" [ngClass]=\"{'markcurrmonth':m.currMonth&&opts.markCurrentMonth}\">{{m.name}}</div></td></tr></tbody></table><table class=\"yeartable\" *ngIf=\"selectYear\"><tbody><tr><td colspan=\"5\" class=\"yearchangebtncell\" (click)=\"$event.stopPropagation()\"><button type=\"button\" class=\"yearchangebtn ngxmdpicon icon-ngxmydpup\" (click)=\"onPrevYears($event, years[0][0].year)\" [disabled]=\"prevYearsDisabled\" [ngClass]=\"{'yearchangebtnenabled': !prevYearsDisabled, 'yearchangebtndisabled': prevYearsDisabled}\"></button></td></tr><tr *ngFor=\"let yr of years\"><td class=\"yearcell tablesingleyear\" [ngClass]=\"{'selectedyear': y.selected, 'disabled': y.disabled}\" *ngFor=\"let y of yr\" (click)=\"!y.disabled&&onYearCellClicked(y);$event.stopPropagation()\" (keydown)=\"onYearCellKeyDown($event, y)\" tabindex=\"0\"><div class=\"yearvalue\" [ngClass]=\"{'markcurryear':y.currYear&&opts.markCurrentYear}\">{{y.year}}</div></td></tr><tr><td colspan=\"5\" class=\"yearchangebtncell\" (click)=\"$event.stopPropagation()\"><button type=\"button\" class=\"yearchangebtn ngxmdpicon icon-ngxmydpdown\" (click)=\"onNextYears($event, years[0][0].year)\" [disabled]=\"nextYearsDisabled\" [ngClass]=\"{'yearchangebtnenabled': !nextYearsDisabled, 'yearchangebtndisabled': nextYearsDisabled}\"></button></td></tr></tbody></table></div></div>",
                    providers: [UtilService],
                    encapsulation: _angular_core.ViewEncapsulation.None
                },] },
    ];
    NgxMyDatePicker.ctorParameters = [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.Renderer, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: UtilService, },
    ];
    NgxMyDatePicker.propDecorators = {
        'selectorEl': [{ type: _angular_core.ViewChild, args: ["selectorEl",] },],
    };
    return NgxMyDatePicker;
}());

var CalToggle;
(function (CalToggle) {
    CalToggle[CalToggle["Open"] = 1] = "Open";
    CalToggle[CalToggle["CloseByDateSel"] = 2] = "CloseByDateSel";
    CalToggle[CalToggle["CloseByCalBtn"] = 3] = "CloseByCalBtn";
    CalToggle[CalToggle["CloseByOutClick"] = 4] = "CloseByOutClick";
    CalToggle[CalToggle["CloseByEsc"] = 5] = "CloseByEsc";
})(CalToggle || (CalToggle = {}));

var NGX_DP_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return NgxMyDatePickerDirective; }),
    multi: true
};
var NGX_DP_VALIDATORS = {
    provide: _angular_forms.NG_VALIDATORS,
    useExisting: _angular_core.forwardRef(function () { return NgxMyDatePickerDirective; }),
    multi: true
};
var NgxMyDatePickerDirective = (function () {
    function NgxMyDatePickerDirective(utilService, vcRef, cfr, renderer, cdr, elem, config) {
        var _this = this;
        this.utilService = utilService;
        this.vcRef = vcRef;
        this.cfr = cfr;
        this.renderer = renderer;
        this.cdr = cdr;
        this.elem = elem;
        this.config = config;
        this.dateChanged = new _angular_core.EventEmitter();
        this.inputFieldChanged = new _angular_core.EventEmitter();
        this.calendarViewChanged = new _angular_core.EventEmitter();
        this.calendarToggle = new _angular_core.EventEmitter();
        this.cRef = null;
        this.inputText = "";
        this.preventClose = false;
        this.disabled = false;
        this.onChangeCb = function () { };
        this.onTouchedCb = function () { };
        this.onClickWrapper = function (ev) { _this.onClick(ev); };
        this.opts = Object.assign({}, config);
        this.parseOptions(config);
    }
    NgxMyDatePickerDirective.prototype.onKeyUp = function (evt) {
        if (this.ignoreKeyPress(evt.keyCode)) {
            return;
        }
        else if (evt.keyCode === KeyCode.esc) {
            this.closeSelector(CalToggle.CloseByEsc);
        }
        else {
            var date = this.utilService.isDateValid(this.elem.nativeElement.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.monthLabels, this.opts.enableDates);
            if (this.utilService.isInitializedDate(date)) {
                var dateModel = this.utilService.getDateModel(date, this.opts.dateFormat, this.opts.monthLabels, this.elem.nativeElement.value);
                this.emitDateChanged(dateModel);
                this.updateModel(dateModel);
                this.emitInputFieldChanged(dateModel.formatted, true);
                if (this.opts.closeSelectorOnDateSelect) {
                    this.closeSelector(CalToggle.CloseByDateSel);
                }
                else if (this.cRef !== null) {
                    this.cRef.instance.setCalendarView(date);
                }
            }
            else {
                if (this.inputText !== this.elem.nativeElement.value) {
                    if (this.elem.nativeElement.value === "") {
                        this.clearDate();
                    }
                    else {
                        this.onChangeCb(null);
                        this.emitInputFieldChanged(this.elem.nativeElement.value, false);
                    }
                }
            }
            this.inputText = this.elem.nativeElement.value;
        }
    };
    NgxMyDatePickerDirective.prototype.onBlur = function () {
        this.onTouchedCb();
    };
    NgxMyDatePickerDirective.prototype.onClick = function (evt) {
        if (this.opts.closeSelectorOnDocumentClick && !this.preventClose && evt.target && this.cRef !== null && this.elem.nativeElement !== evt.target && !this.cRef.location.nativeElement.contains(evt.target) && !this.disabled) {
            this.closeSelector(CalToggle.CloseByOutClick);
        }
    };
    NgxMyDatePickerDirective.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty("options")) {
            this.parseOptions(changes["options"].currentValue);
        }
        if (changes.hasOwnProperty("defaultMonth")) {
            var dm = changes["defaultMonth"].currentValue;
            if (typeof dm === "object") {
                dm = dm.defMonth;
            }
            this.defaultMonth = dm;
        }
    };
    NgxMyDatePickerDirective.prototype.ngOnDestroy = function () {
        this.closeCalendar();
    };
    NgxMyDatePickerDirective.prototype.parseOptions = function (opts) {
        var _this = this;
        if (opts !== undefined) {
            Object.keys(opts).forEach(function (k) {
                _this.opts[k] = opts[k];
            });
        }
        if (this.opts.minYear < Year.min) {
            this.opts.minYear = Year.min;
        }
        if (this.opts.maxYear > Year.max) {
            this.opts.maxYear = Year.max;
        }
    };
    NgxMyDatePickerDirective.prototype.writeValue = function (value) {
        if (!this.disabled) {
            if (value && (value["date"] || value["jsdate"])) {
                var formatted = this.utilService.formatDate(value["date"] ? value["date"] : this.jsDateToMyDate(value["jsdate"]), this.opts.dateFormat, this.opts.monthLabels);
                var date = this.utilService.isDateValid(formatted, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.monthLabels, this.opts.enableDates);
                this.setInputValue(formatted);
                this.emitInputFieldChanged(formatted, this.utilService.isInitializedDate(date));
            }
            else if (value === null || value === "") {
                this.setInputValue("");
                this.emitInputFieldChanged("", false);
            }
        }
    };
    NgxMyDatePickerDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCb = fn;
    };
    NgxMyDatePickerDirective.prototype.registerOnTouched = function (fn) {
        this.onTouchedCb = fn;
    };
    NgxMyDatePickerDirective.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.renderer.setElementProperty(this.elem.nativeElement, "disabled", isDisabled);
        if (isDisabled) {
            this.closeCalendar();
        }
    };
    NgxMyDatePickerDirective.prototype.refreshCalendar = function () {
    };
    NgxMyDatePickerDirective.prototype.validate = function (c) {
        if (this.elem.nativeElement.value === null || this.elem.nativeElement.value === "") {
            return null;
        }
        var date = this.utilService.isDateValid(this.elem.nativeElement.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.monthLabels, this.opts.enableDates);
        if (!this.utilService.isInitializedDate(date)) {
            return { invalidDateFormat: true };
        }
        return null;
    };
    NgxMyDatePickerDirective.prototype.openCalendar = function () {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.preventClose = true;
        this.cdr.detectChanges();
        if (this.cRef === null) {
            this.cRef = this.vcRef.createComponent(this.cfr.resolveComponentFactory(NgxMyDatePicker));
            this.appendSelector(this.cRef.location.nativeElement);
            this.cRef.instance.initialize(this.opts, this.defaultMonth, this.getSelectorPosition(this.elem.nativeElement), this.elem.nativeElement.value, function (dm, close) {
                _this.focusToInput();
                _this.emitDateChanged(dm);
                _this.emitInputFieldChanged(dm.formatted, true);
                _this.updateModel(dm);
                if (close) {
                    _this.closeSelector(CalToggle.CloseByDateSel);
                }
            }, function (cvc) {
                _this.emitCalendarChanged(cvc);
            }, function () {
                _this.closeSelector(CalToggle.CloseByEsc);
            });
            this.emitCalendarToggle(CalToggle.Open);
        }
        setTimeout(function () {
            _this.preventClose = false;
        }, 50);
    };
    NgxMyDatePickerDirective.prototype.closeCalendar = function () {
        this.closeSelector(CalToggle.CloseByCalBtn);
    };
    NgxMyDatePickerDirective.prototype.toggleCalendar = function () {
        if (this.disabled) {
            return;
        }
        if (this.cRef === null) {
            document.addEventListener("click", this.onClickWrapper);
            this.openCalendar();
        }
        else {
            document.removeEventListener("click", this.onClickWrapper);
            this.closeSelector(CalToggle.CloseByCalBtn);
        }
    };
    NgxMyDatePickerDirective.prototype.clearDate = function () {
        if (this.disabled) {
            return;
        }
        this.setInputValue("");
        this.emitInputFieldChanged("", false);
        this.emitDateChanged({ date: { year: 0, month: 0, day: 0 }, jsdate: null, formatted: "", epoc: 0 });
        this.onChangeCb(null);
        this.onTouchedCb();
        this.closeSelector(CalToggle.CloseByCalBtn);
    };
    NgxMyDatePickerDirective.prototype.isDateValid = function () {
        if (this.elem.nativeElement.value !== "") {
            var date = this.utilService.isDateValid(this.elem.nativeElement.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.disableWeekdays, this.opts.monthLabels, this.opts.enableDates);
            if (this.utilService.isInitializedDate(date)) {
                this.emitInputFieldChanged(this.elem.nativeElement.value, true);
                return true;
            }
        }
        this.emitInputFieldChanged(this.elem.nativeElement.value, false);
        return false;
    };
    NgxMyDatePickerDirective.prototype.ignoreKeyPress = function (keyCode) {
        return keyCode === KeyCode.leftArrow || keyCode === KeyCode.rightArrow || keyCode === KeyCode.upArrow || keyCode === KeyCode.downArrow || keyCode === KeyCode.tab || keyCode === KeyCode.shift;
    };
    NgxMyDatePickerDirective.prototype.closeSelector = function (reason) {
        if (this.cRef !== null) {
            this.vcRef.remove(this.vcRef.indexOf(this.cRef.hostView));
            this.cRef = null;
            this.emitCalendarToggle(reason);
        }
    };
    NgxMyDatePickerDirective.prototype.updateModel = function (model) {
        this.setInputValue(model.formatted);
        this.onChangeCb(model);
        this.onTouchedCb();
    };
    NgxMyDatePickerDirective.prototype.setInputValue = function (value) {
        this.inputText = value;
        this.renderer.setElementProperty(this.elem.nativeElement, "value", value);
    };
    NgxMyDatePickerDirective.prototype.focusToInput = function () {
        var _this = this;
        if (this.opts.focusInputOnDateSelect) {
            setTimeout(function () {
                _this.elem.nativeElement.focus();
            });
        }
    };
    NgxMyDatePickerDirective.prototype.emitDateChanged = function (dateModel) {
        this.dateChanged.emit(dateModel);
    };
    NgxMyDatePickerDirective.prototype.emitInputFieldChanged = function (value, valid) {
        this.inputFieldChanged.emit({ value: value, dateFormat: this.opts.dateFormat, valid: valid });
    };
    NgxMyDatePickerDirective.prototype.emitCalendarChanged = function (cvc) {
        this.calendarViewChanged.emit(cvc);
    };
    NgxMyDatePickerDirective.prototype.emitCalendarToggle = function (reason) {
        this.calendarToggle.emit(reason);
    };
    NgxMyDatePickerDirective.prototype.jsDateToMyDate = function (date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    NgxMyDatePickerDirective.prototype.appendSelector = function (elem) {
        if (this.opts.appendSelectorToBody) {
            document.querySelector("body").appendChild(elem);
        }
    };
    NgxMyDatePickerDirective.prototype.getSelectorPosition = function (elem) {
        var top = 0;
        var left = 0;
        if (this.opts.appendSelectorToBody) {
            var b = document.body.getBoundingClientRect();
            var e = elem.getBoundingClientRect();
            top = e.top - b.top;
            left = e.left - b.left;
        }
        if (this.opts.openSelectorTopOfInput) {
            top = top - this.getSelectorDimension(this.opts.selectorHeight) - 2;
        }
        else {
            top = top + elem.offsetHeight + (this.opts.showSelectorArrow ? 12 : 2);
        }
        if (this.opts.alignSelectorRight) {
            left = left + elem.offsetWidth - this.getSelectorDimension(this.opts.selectorWidth);
        }
        return { top: top + "px", left: left + "px" };
    };
    NgxMyDatePickerDirective.prototype.getSelectorDimension = function (value) {
        return Number(value.replace("px", ""));
    };
    NgxMyDatePickerDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: "[ngx-mydatepicker]",
                    exportAs: "ngx-mydatepicker",
                    providers: [UtilService, NGX_DP_VALUE_ACCESSOR, NGX_DP_VALIDATORS]
                },] },
    ];
    NgxMyDatePickerDirective.ctorParameters = [
        { type: UtilService, },
        { type: _angular_core.ViewContainerRef, },
        { type: _angular_core.ComponentFactoryResolver, },
        { type: _angular_core.Renderer, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: _angular_core.ElementRef, },
        { type: NgxMyDatePickerConfig, },
    ];
    NgxMyDatePickerDirective.propDecorators = {
        'options': [{ type: _angular_core.Input },],
        'defaultMonth': [{ type: _angular_core.Input },],
        'dateChanged': [{ type: _angular_core.Output },],
        'inputFieldChanged': [{ type: _angular_core.Output },],
        'calendarViewChanged': [{ type: _angular_core.Output },],
        'calendarToggle': [{ type: _angular_core.Output },],
        'onKeyUp': [{ type: _angular_core.HostListener, args: ["keyup", ["$event"],] },],
        'onBlur': [{ type: _angular_core.HostListener, args: ["blur",] },],
    };
    return NgxMyDatePickerDirective;
}());

var NgxMyDatePickerModule = (function () {
    function NgxMyDatePickerModule() {
    }
    NgxMyDatePickerModule.forRoot = function () {
        return {
            ngModule: NgxMyDatePickerModule,
            providers: [NgxMyDatePickerConfig]
        };
    };
    NgxMyDatePickerModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
                    declarations: [NgxMyDatePicker, NgxMyDatePickerDirective, FocusDirective],
                    entryComponents: [NgxMyDatePicker],
                    exports: [NgxMyDatePicker, NgxMyDatePickerDirective, FocusDirective]
                },] },
    ];
    NgxMyDatePickerModule.ctorParameters = [];
    return NgxMyDatePickerModule;
}());

exports.UtilService = UtilService;
exports.NgxMyDatePickerConfig = NgxMyDatePickerConfig;
exports.FocusDirective = FocusDirective;
exports.NgxMyDatePickerDirective = NgxMyDatePickerDirective;
exports.NgxMyDatePicker = NgxMyDatePicker;
exports.NgxMyDatePickerModule = NgxMyDatePickerModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-mydatepicker.umd.js.map
