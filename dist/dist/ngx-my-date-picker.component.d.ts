import { ElementRef, Renderer, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { IMyDate, IMyMonth, IMyCalendarMonth, IMyCalendarYear, IMyWeek, IMyOptions, IMySelectorPosition } from "./interfaces/index";
import { UtilService } from "./services/ngx-my-date-picker.util.service";
export declare class NgxMyDatePicker implements OnDestroy {
    elem: ElementRef;
    private renderer;
    private cdr;
    private utilService;
    selectorEl: any;
    opts: IMyOptions;
    visibleMonth: IMyMonth;
    selectedMonth: IMyMonth;
    selectedDate: IMyDate;
    weekDays: Array<string>;
    dates: Array<IMyWeek>;
    months: Array<Array<IMyCalendarMonth>>;
    years: Array<Array<IMyCalendarYear>>;
    disableTodayBtn: boolean;
    dayIdx: number;
    weekDayOpts: Array<string>;
    selectMonth: boolean;
    selectYear: boolean;
    dateChanged: Function;
    calendarViewChanged: Function;
    closedByEsc: Function;
    selectorPos: IMySelectorPosition;
    prevMonthDisabled: boolean;
    nextMonthDisabled: boolean;
    prevYearDisabled: boolean;
    nextYearDisabled: boolean;
    prevYearsDisabled: boolean;
    nextYearsDisabled: boolean;
    prevMonthId: number;
    currMonthId: number;
    nextMonthId: number;
    clickListener: Function;
    constructor(elem: ElementRef, renderer: Renderer, cdr: ChangeDetectorRef, utilService: UtilService);
    ngOnDestroy(): void;
    initialize(opts: IMyOptions, defaultMonth: string, selectorPos: IMySelectorPosition, inputValue: string, dc: Function, cvc: Function, cbe: Function): void;
    setCalendarView(date: IMyDate): void;
    resetMonthYearSelect(): void;
    onSelectMonthClicked(event: any): void;
    onMonthCellClicked(cell: IMyCalendarMonth): void;
    onMonthCellKeyDown(event: any, cell: IMyCalendarMonth): void;
    onSelectYearClicked(event: any): void;
    onYearCellClicked(cell: IMyCalendarYear): void;
    onPrevYears(event: any, year: number): void;
    onNextYears(event: any, year: number): void;
    generateYears(year: number): void;
    onYearCellKeyDown(event: any, cell: IMyCalendarYear): void;
    isTodayDisabled(): void;
    setVisibleMonth(): void;
    onPrevMonth(): void;
    onNextMonth(): void;
    onPrevYear(): void;
    onNextYear(): void;
    onCloseSelector(event: any): void;
    onTodayClicked(): void;
    onCellClicked(cell: any): void;
    onCellKeyDown(event: any, cell: any): void;
    selectDate(date: IMyDate): void;
    monthStartIdx(y: number, m: number): number;
    daysInMonth(m: number, y: number): number;
    daysInPrevMonth(m: number, y: number): number;
    isCurrDay(d: number, m: number, y: number, cmo: number, today: IMyDate): boolean;
    isDateStringAvailable(date: IMyDate): boolean;
    getDateString(date: IMyDate): string;
    getToday(): IMyDate;
    getDayNumber(date: IMyDate): number;
    getWeekday(date: IMyDate): string;
    getDate(year: number, month: number, day: number): Date;
    sundayIdx(): number;
    generateCalendar(m: number, y: number, notifyChange: boolean): void;
    setHeaderBtnDisabledState(m: number, y: number): void;
}
