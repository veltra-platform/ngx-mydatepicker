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

function getDateString(date: Date): string {
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
        expect(selection.value).toBe(getDateString(new Date()));

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
        expect(selection.value).toBe(getDateString(new Date()));

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

});





