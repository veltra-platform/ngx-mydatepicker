///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, Component, ViewChild} from '@angular/core';
import {NgxMyDatePickerModule} from './ngx-my-date-picker.module';
import {NgxMyDatePickerDirective} from './ngx-my-date-picker.input';
import {IMyOptions} from "./interfaces/my-options.interface";

let comp: NgxMyDatepickerTestComponent;
let fixture: ComponentFixture<NgxMyDatepickerTestComponent>;
let de: DebugElement;
let el: HTMLElement;

let PREVMONTH: string = '.header tr td:first-child div .headerbtncell:first-child .headerbtn';
let NEXTMONTH: string = '.header tr td:first-child div .headerbtncell:last-child .headerbtn';
let PREVYEAR: string = '.header tr td:last-child div .headerbtncell:first-child .headerbtn';
let NEXTYEAR: string = '.header tr td:last-child div .headerbtncell:last-child .headerbtn';
let MONTHLABEL: string = '.header tr td:first-child div .headermonthtxt .headerlabelbtn';
let YEARLABEL: string = '.header tr td:last-child div .headeryeartxt .headerlabelbtn';

function getDefaultDateString(date: Date): string {
    return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}

function getElement(id: string): any {
    return fixture.nativeElement.querySelector(id);
}

function getElements(id: string): Array<any> {
    return fixture.nativeElement.querySelectorAll(id);
}

@Component({
    template: '<input class="myDateInput" id="myDateInput" ngx-mydatepicker #dp="ngx-mydatepicker" name="mydate"/>'
})
class NgxMyDatepickerTestComponent {
    @ViewChild('dp') vcDp: NgxMyDatePickerDirective;

    openCalendar(): void {
        this.vcDp.openCalendar();
    }

    closeCalendar(): void {
        this.vcDp.closeCalendar();
    }

    toggleCalendar(): void {
        this.vcDp.toggleCalendar();
    }

    clearDate(): void {
        this.vcDp.clearDate();
    }

    parseOptions(opts: IMyOptions): void {
        this.vcDp.parseOptions(opts);
    }

    setDefaultMonth(defMonth: string): void {
        this.vcDp.defaultMonth = defMonth;
    }
}

describe('ngx-mydatepicker', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NgxMyDatepickerTestComponent],
            imports: [NgxMyDatePickerModule]
        });
        fixture = TestBed.createComponent(NgxMyDatepickerTestComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('.myDateInput'));
        el = de.nativeElement;
    });

    it('test open/close/toggle calendar functions', () => {
        comp.openCalendar();
        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).not.toBe(null);

        comp.closeCalendar();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).toBe(null);

        comp.toggleCalendar();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).not.toBe(null);

        comp.toggleCalendar();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).toBe(null);
    });

    it('select today and clear date', () => {
        comp.openCalendar();
        fixture.detectChanges();
        let headertodaybtn = getElement('.headertodaybtn');
        expect(headertodaybtn).not.toBe(null);

        fixture.detectChanges();
        headertodaybtn.click();
        let selector = getElement('.selector');
        expect(selector).toBe(null);

        fixture.detectChanges();
        let selection = getElement('.myDateInput');
        expect(selection.value).toBe(getDefaultDateString(new Date()));

        comp.clearDate();
        fixture.detectChanges();
        selection = getElement('.myDateInput');
        expect(selection.value).toBe('');
    });

    it('select previous month', () => {
        let opts: IMyOptions = {
            monthLabels: {1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12"}
        };

        comp.parseOptions(opts);
        comp.setDefaultMonth('2016/12');

        comp.openCalendar();

        let prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);

        for(let i = 12; i > 0; i--) {
            fixture.detectChanges();

            let monthlabel = getElement(MONTHLABEL);
            expect(monthlabel).not.toBe(null);
            expect(monthlabel.textContent).toBe(String(i));

            prevmonth.click();
        }
    });

    it('select next month', () => {
        let opts: IMyOptions = {
            monthLabels: {1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12"}
        };

        comp.parseOptions(opts);
        comp.setDefaultMonth('2016/01');

        comp.openCalendar();

        let nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);

        for(let i = 1; i <= 12; i++) {
            fixture.detectChanges();

            let monthlabel = getElement(MONTHLABEL);
            expect(monthlabel).not.toBe(null);
            expect(monthlabel.textContent).toBe(String(i));

            nextmonth.click();
        }
    });

    it('select previous month form selector', () => {
        comp.setDefaultMonth('2016/01');

        comp.openCalendar();

        fixture.detectChanges();
        let prevmonth = getElements('.prevmonth');
        expect(prevmonth).not.toBe(null);

        fixture.detectChanges();
        prevmonth[0].click();

        fixture.detectChanges();
        let monthlabel = getElement(MONTHLABEL);
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.textContent).toBe('Dec');

        fixture.detectChanges();
        let yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent).toBe('2015');
    });

    it('select next month form selector', () => {
        comp.setDefaultMonth('2016/01');

        comp.openCalendar();

        fixture.detectChanges();
        let nextmonth = getElements('.nextmonth');
        expect(nextmonth).not.toBe(null);

        fixture.detectChanges();
        nextmonth[0].click();

        fixture.detectChanges();
        let monthlabel = getElement(MONTHLABEL);
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.textContent).toBe('Feb');

        fixture.detectChanges();
        let yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent).toBe('2016');
    });

    it('select today from selector', () => {
        comp.openCalendar();

        fixture.detectChanges();
        let currday = getElement('.currday');
        expect(currday).not.toBe(null);

        currday.click();

        fixture.detectChanges();
        let selection = getElement('.myDateInput');
        expect(selection.value).toBe(getDefaultDateString(new Date()));

        comp.clearDate();
        fixture.detectChanges();
        selection = getElement('.myDateInput');
        expect(selection.value).toBe('');
    });

    it('select previous year', () => {
        comp.setDefaultMonth('2010/12');

        comp.openCalendar();

        let prevyear = getElement(PREVYEAR);
        expect(prevyear).not.toBe(null);

        for(let i = 2010; i > 2000; i--) {
            fixture.detectChanges();

            let yearlabel = getElement(YEARLABEL);
            expect(yearlabel).not.toBe(null);
            expect(yearlabel.textContent).toBe(String(i));

            prevyear.click();
        }
    });

    it('select next year', () => {
        comp.setDefaultMonth('2010/12');

        comp.openCalendar();

        let nextyear = getElement(NEXTYEAR);
        expect(nextyear).not.toBe(null);

        for(let i = 2010; i < 2020; i++) {
            fixture.detectChanges();

            let yearlabel = getElement(YEARLABEL);
            expect(yearlabel).not.toBe(null);
            expect(yearlabel.textContent).toBe(String(i));

            nextyear.click();
        }
    });

    it('select previous month year change', () => {
        comp.setDefaultMonth('2016/01');

        comp.openCalendar();

        fixture.detectChanges();
        let prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);

        prevmonth.click();

        fixture.detectChanges();
        let monthlabel = getElement(MONTHLABEL);
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.textContent).toBe('Dec');

        fixture.detectChanges();
        let yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent).toBe('2015');
    });

    it('select next month year change', () => {
        comp.setDefaultMonth('2016/12');

        comp.openCalendar();

        fixture.detectChanges();
        let nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);

        nextmonth.click();

        fixture.detectChanges();
        let monthlabel = getElement(MONTHLABEL);
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.textContent).toBe('Jan');

        fixture.detectChanges();
        let yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent).toBe('2017');
    });

    it('edit month', () => {
        comp.setDefaultMonth('2016/12');

        comp.openCalendar();

        fixture.detectChanges();
        let monthinput = getElement('.monthinput');
        expect(monthinput).toBe(null);

        fixture.detectChanges();
        let monthlabel = getElement(MONTHLABEL);
        expect(monthlabel).not.toBe(null);

        monthlabel.click();

        fixture.detectChanges();
        monthinput = getElement('.monthinput');
        expect(monthinput).not.toBe(null);

        fixture.detectChanges();
        let headerbtncell = getElement('.headerbtncell');
        expect(headerbtncell).not.toBe(null);
        headerbtncell.click();

        fixture.detectChanges();
        monthinput = getElement('.monthinput');
        expect(monthinput).toBe(null);
    });

    it('edit year', () => {
        comp.setDefaultMonth('2016/12');

        comp.openCalendar();

        fixture.detectChanges();
        let yearinput = getElement('.yearinput');
        expect(yearinput).toBe(null);

        fixture.detectChanges();
        let yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);

        yearlabel.click();

        fixture.detectChanges();
        yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);

        fixture.detectChanges();
        let headerbtncell = getElement('.headerbtncell');
        expect(headerbtncell).not.toBe(null);
        headerbtncell.click();

        fixture.detectChanges();
        yearinput = getElement('.yearinput');
        expect(yearinput).toBe(null);
    });

    it('test calendar year 2016 month one by one - next month button', () => {
        comp.setDefaultMonth('2016/01');

        comp.openCalendar();

        fixture.detectChanges();
        let nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.textContent.trim()).toBe('Jan');

        fixture.detectChanges();
        let yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent.trim()).toBe('2016');

        let beginDate: Array<string> = ['28', '1', '29', '28', '25', '30', '27', '1', '29', '26', '31', '28'];
        let endDate: Array<string> = ['7', '13', '10', '8', '5', '10', '7', '11', '9', '6', '11', '8'];

        for(let i = 0; i < 12; i++) {
            fixture.detectChanges();
            let currmonth = getElements('.caltable tbody tr td');
            expect(currmonth).not.toBe(null);
            expect(currmonth.length).toBe(42);

            expect(currmonth[0]).not.toBe(null);
            expect(currmonth[0].textContent.trim()).toBe(beginDate[i]);

            expect(currmonth[41]).not.toBe(null);
            expect(currmonth[41].textContent.trim()).toBe(endDate[i]);

            nextmonth.click();
        }
    });

    it('test calendar year 2016 month one by one - previous month button', () => {
        comp.setDefaultMonth('2016/12');

        comp.openCalendar();

        fixture.detectChanges();
        let prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.textContent.trim()).toBe('Dec');

        fixture.detectChanges();
        let yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent.trim()).toBe('2016');

        let beginDate: Array<string> = ['28', '1', '29', '28', '25', '30', '27', '1', '29', '26', '31', '28'];
        let endDate: Array<string> = ['7', '13', '10', '8', '5', '10', '7', '11', '9', '6', '11', '8'];

        for(let i = 11; i > 0; i--) {
            fixture.detectChanges();
            let currmonth = getElements('.caltable tbody tr td');
            expect(currmonth).not.toBe(null);
            expect(currmonth.length).toBe(42);

            expect(currmonth[0]).not.toBe(null);
            expect(currmonth[0].textContent.trim()).toBe(beginDate[i]);

            expect(currmonth[41]).not.toBe(null);
            expect(currmonth[41].textContent.trim()).toBe(endDate[i]);

            prevmonth.click();
        }
    });

    // options
    it('options - dayLabels', () => {
        let options: IMyOptions = {dayLabels:  {su: '1', mo: '2', tu: '3', we: '4', th: '5', fr: '6', sa: '7'}, firstDayOfWeek: 'su'};

        comp.setDefaultMonth('2016/05');
        comp.parseOptions(options);

        comp.openCalendar();

        fixture.detectChanges();
        let ths = getElements('.weekdaytitle');
        expect(ths.length).toBe(7);

        for(let i = 0; i < ths.length; i++) {
            let el = ths[i];
            expect(parseInt(el.textContent.trim())).toBe(i + 1);
        }
    });

    it('options - monthLabels', () => {
        let opts: IMyOptions = {
            monthLabels: {1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12"}
        };

        comp.parseOptions(opts);
        comp.setDefaultMonth('2016/01');

        comp.openCalendar();

        let nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);

        for(let i = 1; i <= 12; i++) {
            fixture.detectChanges();

            let monthlabel = getElement(MONTHLABEL);
            expect(monthlabel).not.toBe(null);
            expect(monthlabel.textContent).toBe(String(i));

            nextmonth.click();
        }
    });

    it('options - dateFormat', () => {
        // default
        comp.setDefaultMonth('2016/01');
        comp.openCalendar();

        fixture.detectChanges();
        let currmonth = getElements('.daycell');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        currmonth[5].click();

        fixture.detectChanges();
        let selection = getElement('.myDateInput');
        expect(selection.value).toBe('2016-01-02');

        comp.closeCalendar();


        // dd.mm.yyyy
        let opts: IMyOptions = {
            dateFormat: 'dd.mm.yyyy'
        };

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        currmonth = getElements('.daycell');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        currmonth[4].click();

        fixture.detectChanges();
        selection = getElement('.myDateInput');
        expect(selection.value).toBe('01.01.2016');

        comp.closeCalendar();


        // dd mmm yyyy
        opts.dateFormat = 'dd mmm yyyy';
        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        currmonth = getElements('.daycell');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        currmonth[4].click();

        fixture.detectChanges();
        selection = getElement('.myDateInput');
        expect(selection.value).toBe('01 Jan 2016');
    });

    it('options - showTodayBtn', () => {
        comp.setDefaultMonth('2016/01');

        let opts: IMyOptions = {
            showTodayBtn: true
        };

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        let headertodaybtn = getElement('.headertodaybtn');
        expect(headertodaybtn).not.toBe(null);

        comp.closeCalendar();


        opts.showTodayBtn = false;

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        headertodaybtn = getElement('.headertodaybtn');
        expect(headertodaybtn).toBe(null);
    });

    it('options - todatBtnTxt', () => {
        comp.setDefaultMonth('2016/01');
        comp.openCalendar();

        fixture.detectChanges();
        let headertodaybtn = getElement('.headertodaybtn');
        expect(headertodaybtn).not.toBe(null);
        expect(headertodaybtn.textContent).toBe('Today');

        comp.closeCalendar();


        let opts: IMyOptions = {
            todayBtnTxt: 'text'
        };

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        headertodaybtn = getElement('.headertodaybtn');
        expect(headertodaybtn).not.toBe(null);
        expect(headertodaybtn.textContent).toBe('text');
    });

    it('options - firstDayOfWeek', () => {
        comp.setDefaultMonth('2016/01');
        comp.openCalendar();

        fixture.detectChanges();
        let first = getElement('.weekdaytitle:first-child');
        expect(first).not.toBe(null);
        expect(first.textContent).toBe('Mon');

        let last = getElement('.weekdaytitle:last-child');
        expect(last).not.toBe(null);
        expect(last.textContent).toBe('Sun');

        comp.closeCalendar();


        let opts: IMyOptions = {
            firstDayOfWeek: 'su'
        };

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        first = getElement('.weekdaytitle:first-child');
        expect(first).not.toBe(null);
        expect(first.textContent).toBe('Sun');

        last = getElement('.weekdaytitle:last-child');
        expect(last).not.toBe(null);
        expect(last.textContent).toBe('Sat');
    });

    it('options - sunHighlight', () => {
        comp.setDefaultMonth('2016/01');

        let opts: IMyOptions = {
            sunHighlight: true
        };

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        let sunday = getElements('.sunday');
        expect(sunday).not.toBe(null);
        expect(sunday.length).toBe(6);

        comp.closeCalendar();


        opts.sunHighlight = false;

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        sunday = getElements('.sunday');
        expect(sunday.length).toBe(0);
    });

    it('options - markCurrentDay', () => {
        let opts: IMyOptions = {
            markCurrentDay: true
        };

        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        let currday = getElement('.currday');
        expect(currday).not.toBe(null);

        comp.closeCalendar();


        opts.markCurrentDay = false;

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        currday = getElement('.currday');
        expect(currday).toBe(null);
    });

    it('options - editableMonthAndYear', () => {
        comp.setDefaultMonth('2016/12');

        let opts: IMyOptions = {
            editableMonthAndYear: true
        };

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        let monthlabel = getElement(MONTHLABEL);
        expect(monthlabel).not.toBe(null);

        monthlabel.click();

        fixture.detectChanges();
        let monthinput = getElement('.monthinput');
        expect(monthinput).not.toBe(null);

        fixture.detectChanges();
        let yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);

        yearlabel.click();

        fixture.detectChanges();
        let yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);

        comp.closeCalendar();


        opts.editableMonthAndYear = false;

        comp.parseOptions(opts);

        comp.openCalendar();

        fixture.detectChanges();
        monthlabel = getElement(MONTHLABEL);
        expect(monthlabel).not.toBe(null);

        monthlabel.click();

        fixture.detectChanges();
        monthinput = getElement('.monthinput');
        expect(monthinput).toBe(null);

        fixture.detectChanges();
        yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);

        yearlabel.click();

        fixture.detectChanges();
        yearinput = getElement('.yearinput');
        expect(yearinput).toBe(null);
    });

    it('options - minYear', () => {
        comp.setDefaultMonth('2011/12');
        let opts: IMyOptions = {
            minYear: 2010
        };

        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        let prevyear = getElement(PREVYEAR);
        expect(prevyear).not.toBe(null);

        prevyear.click();

        fixture.detectChanges();
        let yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent).toBe('2010');

        prevyear.click();

        fixture.detectChanges();
        yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent).toBe('2010');
    });

    it('options - maxYear', () => {
        comp.setDefaultMonth('2019/12');
        let opts: IMyOptions = {
            maxYear: 2020
        };

        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        let nextyear = getElement(NEXTYEAR);
        expect(nextyear).not.toBe(null);

        nextyear.click();

        fixture.detectChanges();
        let yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent).toBe('2020');

        nextyear.click();

        fixture.detectChanges();
        yearlabel = getElement(YEARLABEL);
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.textContent).toBe('2020');
    });

    it('options - disableUntil', () => {
        comp.setDefaultMonth('2017/01');
        let opts: IMyOptions = {
            disableUntil: {year: 2017, month: 1, day: 26}
        };

        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        let disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(32);

        fixture.detectChanges();
        let prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);

        prevmonth.click();

        fixture.detectChanges();
        disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(42);
    });

    it('options - disableSince', () => {
        comp.setDefaultMonth('2017/01');
        let opts: IMyOptions = {
            disableSince: {year: 2017, month: 1, day: 12}
        };

        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        let disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(25);

        fixture.detectChanges();
        let nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);

        nextmonth.click();

        fixture.detectChanges();
        disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(42);
    });

    it('options - disableDays', () => {
        comp.setDefaultMonth('2017/01');
        let opts: IMyOptions = {
            disableDays: [{year: 2017, month: 1, day: 12}, {year: 2017, month: 1, day: 14}]
        };

        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        let disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(2);

        fixture.detectChanges();
        let daycell = getElements('.daycell');
        expect(daycell).not.toBe(null);
        expect(daycell.length).toBe(42);

        daycell[17].click();

        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).not.toBe(null);

        fixture.detectChanges();
        let selection = getElement('.myDateInput');
        expect(selection.value).toBe('');

        daycell[18].click();

        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).toBe(null);

        fixture.detectChanges();
        selection = getElement('.myDateInput');
        expect(selection.value).toBe('2017-01-13');
    });

    it('options - enableDays', () => {
        comp.setDefaultMonth('2017/01');
        let opts: IMyOptions = {
            disableUntil: {year: 2017, month: 1, day: 31},
            enableDays: [{year: 2017, month: 1, day: 14}, {year: 2017, month: 1, day: 15}]
        };

        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        let disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(35);

        fixture.detectChanges();
        let daycell = getElements('.daycell');
        expect(daycell).not.toBe(null);
        expect(daycell.length).toBe(42);

        daycell[19].click();

        fixture.detectChanges();
        let selection = getElement('.myDateInput');
        expect(selection.value).toBe('2017-01-14');
    });

    it('options - disableDateRange', () => {
        comp.setDefaultMonth('2017/01');
        let opts: IMyOptions = {
            disableDateRange: {
                begin: {year: 2017, month: 1, day: 10},
                end: {year: 2017, month: 1, day: 20}
            }
        };

        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        let disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(11);
    });

    it('options - disableWeekends', () => {
        comp.setDefaultMonth('2016/10');
        let opts: IMyOptions = {
            firstDayOfWeek: 'mo',
            disableWeekends: true
        };

        comp.parseOptions(opts);
        comp.openCalendar();

        fixture.detectChanges();
        let disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(12);

        let firstDisabled = disabled[0];
        expect(firstDisabled.textContent.trim()).toBe('1');

        let secondDisabled = disabled[1];
        expect(secondDisabled.textContent.trim()).toBe('2');


        let thirdDisabled = disabled[2];
        expect(thirdDisabled.textContent.trim()).toBe('8');

        let fourthDisabled = disabled[3];
        expect(fourthDisabled.textContent.trim()).toBe('9');


        let lastDisabled = disabled[disabled.length - 1];
        expect(lastDisabled.textContent.trim()).toBe('6');
    });
});





