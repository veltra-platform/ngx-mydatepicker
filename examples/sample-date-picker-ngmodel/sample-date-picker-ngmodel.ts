import {Component, OnInit} from '@angular/core';
import {IMyOptions, IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged} from '../../src/ngx-my-date-picker/interfaces';

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
        disableDays:[],
        disableHeaderButtons: true,
        disableUntil: {year: 2014, month: 11, day: 10},
        disableSince: {year: 2019, month: 3, day: 10}
    };
    private selectedDateNormal:string = '';

    private selectedTextNormal: string = '';
    private border: string = 'none';

    //private model: string = '';   // not initial date set
    private model: Object = {date: {year: 2018, month: 10, day: 9}};   // this example is initialized to specific date

    private defMonth: string = '';

    constructor() {}

    clearDate(): void {
        this.selectedDateNormal = '';
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
        copy.disableDays = checked ? [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}] : [];
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

            this.selectedDateNormal = event.formatted;
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