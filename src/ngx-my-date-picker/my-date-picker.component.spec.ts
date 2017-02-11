///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, Component, ViewChild} from '@angular/core';
import {NgxMyDatePickerModule} from './ngx-my-date-picker.module';
import {NgxMyDatePickerDirective} from './ngx-my-date-picker.input';

let comp: NgxMyDatepickerTestComponent;
let fixture: ComponentFixture<NgxMyDatepickerTestComponent>;
let de: DebugElement;
let el: HTMLElement;

let PREVMONTH: string = '.header tr td:first-child div .headerbtncell:first-child .headerbtn';
let NEXTMONTH: string = '.header tr td:first-child div .headerbtncell:last-child .headerbtn';
let PREVYEAR: string = '.header tr td:last-child div .headerbtncell:first-child .headerbtn';
let NEXTYEAR: string = '.header tr td:last-child div .headerbtncell:last-child .headerbtn';

function getDateString(date:any):string {
    return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}

function getElement(id:string):any {
    return fixture.nativeElement.querySelector(id);
}

function getElements(id:string):Array<any> {
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
});





