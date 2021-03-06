import { Injectable } from "@angular/core";
import { Year } from "../enums/year.enum";
export var NgxMyDatePickerConfig = (function () {
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
        { type: Injectable },
    ];
    NgxMyDatePickerConfig.ctorParameters = [];
    return NgxMyDatePickerConfig;
}());
//# sourceMappingURL=ngx-my-date-picker.config.js.map