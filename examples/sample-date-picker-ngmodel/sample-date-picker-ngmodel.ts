import {Component, OnInit, ViewChild} from '@angular/core';
import {INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyMarkedDate, IMyDate} from '../../src/ngx-my-date-picker/interfaces';
import {NgxMyDatePickerDirective} from '../../src/ngx-my-date-picker';

declare var require:any;
const normalSampleTpl: string = require('./sample-date-picker-ngmodel.html');

@Component({
    selector: 'sample-date-picker-ngmodel',
    template: normalSampleTpl
})

export class SampleDatePickerNgModel implements OnInit {

    private myDatePickerOptions: INgxMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        markCurrentDay: true,
        alignSelectorRight: false,
        openSelectorTopOfInput: false,
        minYear: 1900,
        maxYear: 2200,
        showSelectorArrow: true,
        monthSelector: true,
        yearSelector: true,
        satHighlight: false,
        highlightDates: [],
        disableDates:[],
        disableHeaderButtons: true,
        showWeekNumbers: false,
        disableDateRanges: [
            {begin: {year: 2016, month: 10, day: 5}, end: {year: 2016, month: 10, day: 7}},
            {begin: {year: 2016, month: 10, day: 10}, end: {year: 2016, month: 10, day: 12}}
        ],
        markDates: [],
        markWeekends: <IMyMarkedDate>{},
        selectorHeight: '232px',
        selectorWidth: '252px'
    };

    @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;

    private selectedTextNormal: string = '';

    private disabled: boolean = false;
    private validDate: boolean = false;
    private inputText: string = "";

    private model: string = null;   // not initial date set
    //private model: Object = {jsdate: new Date()};   // initialize today with jsdate property
    //private model: Object = {date: {year: 2018, month: 10, day: 9}};   // this example is initialized to specific date

    private defMonth: string = '';
    private selectorSizes: Array<string> = new Array('normal', 'small', 'big');

    constructor() {}

    clearDate(): void {
        this.ngxdp.clearDate();
    }

    onShowTodayButton(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.showTodayBtn = checked;
        this.myDatePickerOptions = copy;
    }

    onOpenSelectorTopOfInput(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.openSelectorTopOfInput = checked;
        this.myDatePickerOptions = copy;
    }

    onAlignSelectorRight(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.alignSelectorRight = checked;
        this.myDatePickerOptions = copy;
    }

    onShowSelectorArrow(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.showSelectorArrow = checked;
        this.myDatePickerOptions = copy;
    }

    onMonthSelector(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.monthSelector = checked;
        this.myDatePickerOptions = copy;
    }

    onYearSelector(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.yearSelector = checked;
        this.myDatePickerOptions = copy;
    }

    onDisableToday(checked: boolean): void {
        let d: Date = new Date();
        let copy = this.getCopyOfOptions();
        copy.disableDates = checked ? [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}] : [];
        this.myDatePickerOptions = copy;
    }

    onMarkToday(checked: boolean): void {
        let d: Date = new Date();
        let copy = this.getCopyOfOptions();
        copy.markDates = checked ? [{dates: [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}], color: '#C30000'}] : [];
        this.myDatePickerOptions = copy;
    }

    onMarkWeekends(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.markWeekends = checked ? {marked: true, color: 'blue'} : {marked: false, color: ''};
        this.myDatePickerOptions = copy;
    }

    onHighlighSaturday(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.satHighlight = checked;
        this.myDatePickerOptions = copy;
    }

    onHighlighSunday(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.sunHighlight = checked;
        this.myDatePickerOptions = copy;
    }

    onHighlightDates(checked: boolean): void {
        let d: Date = new Date();
        let copy = this.getCopyOfOptions();
        let dates: Array<IMyDate> = [];
        dates.push({year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()});

        d.setDate(d.getDate() + 1);
        dates.push({year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()});

        dates.push({year: 2017, month: 6, day: 1});

        copy.highlightDates = checked ? dates : [];
        this.myDatePickerOptions = copy;
    }

    onDisableWeekends(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.disableWeekends = checked;
        this.myDatePickerOptions = copy;
    }

    onDisableHeaderButtons(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.disableHeaderButtons = checked;
        this.myDatePickerOptions = copy;
    }

    onShowWeekNumbers(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.showWeekNumbers = checked;
        this.myDatePickerOptions = copy;
    }

    onDisableInput(checked: boolean) {
        this.disabled = checked;
    }

    onSelectorSize(size:string) {
        let copy = this.getCopyOfOptions();
        if (size === 'normal') {
            copy.selectorHeight = '232px';
            copy.selectorWidth = '252px';
            this.myDatePickerOptions = copy;
        }
        else if (size === 'small') {
            copy.selectorHeight = '200px';
            copy.selectorWidth = '220px';
            this.myDatePickerOptions = copy;
        }
        else {
            copy.selectorHeight = '260px';
            copy.selectorWidth = '290px';
            this.myDatePickerOptions = copy;
        }
    }

    getCopyOfOptions(): INgxMyDpOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    }

    ngOnInit(): void {
        console.log('onInit(): SampleDatePickerNgModel');
    }

    // callbacks
    onDateChanged(event: IMyDateModel): void {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if(event.formatted !== '') {
            this.selectedTextNormal = 'Formatted: ' + event.formatted + ' - epoc timestamp: ' + event.epoc;
            this.validDate = true;
            this.inputText = event.formatted;
        }
        else {
            this.selectedTextNormal = '';
        }
    }

    onInputFieldChanged(event: IMyInputFieldChanged): void {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
        this.validDate = event.valid;
        this.inputText = event.value;
    }

    onCalendarToggle(event: number): void {
        console.log('onCalendarToggle(): Reason: ', event);
    }

    onCalendarViewChanged(event: IMyCalendarViewChanged): void {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    }

}