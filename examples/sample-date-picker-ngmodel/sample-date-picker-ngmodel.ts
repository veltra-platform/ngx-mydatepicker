import {Component, OnInit, ViewChild} from '@angular/core';
import {IMyOptions, IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyMarkedDate} from '../../src/ngx-my-date-picker/interfaces';
import {NgxMyDatePickerDirective} from '../../src/ngx-my-date-picker';

declare var require:any;
const normalSampleTpl: string = require('./sample-date-picker-ngmodel.html');

@Component({
    selector: 'sample-date-picker-ngmodel',
    template: normalSampleTpl
})

export class SampleDatePickerNgModel implements OnInit {

    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd mmm yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        markCurrentDay: true,
        alignSelectorRight: false,
        openSelectorTopOfInput: false,
        minYear: 1900,
        maxYear: 2200,
        showSelectorArrow: true,
        editableMonthAndYear: true,
        disableDates:[],
        disableHeaderButtons: true,
        showWeekNumbers: false,
        disableDateRanges: [
            {begin: {year: 2016, month: 10, day: 5}, end: {year: 2016, month: 10, day: 7}},
            {begin: {year: 2016, month: 10, day: 10}, end: {year: 2016, month: 10, day: 12}}
        ],
        markDates: [],
        markWeekends: <IMyMarkedDate>{}
    };

    @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;

    private selectedTextNormal: string = '';
    private border: string = 'none';

    private disabled: boolean = false;

    private model: string = '';   // not initial date set
    //private model: Object = {date: {year: 2018, month: 10, day: 9}};   // this example is initialized to specific date

    private defMonth: string = '';

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

    onEditableMonthAndYear(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.editableMonthAndYear = checked;
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

    getCopyOfOptions(): IMyOptions {
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
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedTextNormal = '';
            this.border = 'none';
        }
    }

    onInputFieldChanged(event: IMyInputFieldChanged): void {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
    }

    onCalendarToggle(event: number): void {
        console.log('onCalendarToggle(): Reason: ', event);
    }

    onCalendarViewChanged(event: IMyCalendarViewChanged): void {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    }

}