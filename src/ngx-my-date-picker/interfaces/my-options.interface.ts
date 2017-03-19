import { IMyDayLabels } from "./my-day-labels.interface";
import { IMyMonthLabels } from "./my-month-labels.interface";
import { IMyDate } from "./my-date.interface";
import { IMyDateRange } from "./my-date-range.interface";

export interface IMyOptions {
    dayLabels?: IMyDayLabels;
    monthLabels?: IMyMonthLabels;
    dateFormat?: string;
    showTodayBtn?: boolean;
    todayBtnTxt?: string;
    firstDayOfWeek?: string;
    sunHighlight?: boolean;
    markCurrentDay?: boolean;
    editableMonthAndYear?: boolean;
    disableHeaderButtons?: boolean;
    showWeekNumbers?: boolean;
    disableUntil?: IMyDate;
    disableSince?: IMyDate;
    disableDates?: Array<IMyDate>;
    enableDates?: Array<IMyDate>;
    disableDateRanges?: Array<IMyDateRange>;
    disableWeekends?: boolean;
    alignSelectorRight?: boolean;
    openSelectorTopOfInput?: boolean;
    minYear?: number;
    maxYear?: number;
    showSelectorArrow?: boolean;
    ariaLabelPrevMonth?: string;
    ariaLabelNextMonth?: string;
    ariaLabelPrevYear?: string;
    ariaLabelNextYear?: string;
}
