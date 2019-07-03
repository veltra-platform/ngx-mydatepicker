import { IMyOptions } from "../interfaces/my-options.interface";
import { IMyDayLabels } from "../interfaces/my-day-labels.interface";
import { IMyMonthLabels } from "../interfaces/my-month-labels.interface";
import { IMyDate } from "../interfaces/my-date.interface";
import { IMyMarkedDates } from "../interfaces/my-marked-dates.interface";
import { IMyDateRange } from "../interfaces/my-date-range.interface";
import { IMyMarkedDate } from "../interfaces/my-marked-date.interface";
export declare class NgxMyDatePickerConfig implements IMyOptions {
    dayLabels: IMyDayLabels;
    monthLabels: IMyMonthLabels;
    dateFormat: string;
    showTodayBtn: boolean;
    todayBtnTxt: string;
    firstDayOfWeek: string;
    satHighlight: boolean;
    sunHighlight: boolean;
    highlightDates: IMyDate[];
    markCurrentDay: boolean;
    markCurrentMonth: boolean;
    markCurrentYear: boolean;
    monthSelector: boolean;
    yearSelector: boolean;
    disableHeaderButtons: boolean;
    showWeekNumbers: boolean;
    selectorHeight: string;
    selectorWidth: string;
    disableUntil: IMyDate;
    disableSince: IMyDate;
    disableDates: IMyDate[];
    enableDates: IMyDate[];
    markDates: IMyMarkedDates[];
    markWeekends: IMyMarkedDate;
    disableDateRanges: IMyDateRange[];
    disableWeekends: boolean;
    disableWeekdays: string[];
    alignSelectorRight: boolean;
    openSelectorTopOfInput: boolean;
    closeSelectorOnDateSelect: boolean;
    closeSelectorOnDocumentClick: boolean;
    minYear: number;
    maxYear: number;
    showSelectorArrow: boolean;
    allowSelectionOnlyInCurrentMonth: boolean;
    appendSelectorToBody: boolean;
    focusInputOnDateSelect: boolean;
    ariaLabelPrevMonth: string;
    ariaLabelNextMonth: string;
    ariaLabelPrevYear: string;
    ariaLabelNextYear: string;
}
