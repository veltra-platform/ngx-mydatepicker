///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {NgxMyDatePicker} from './ngx-my-date-picker.component';
import {FocusDirective} from './directives/ngx-my-date-picker.focus.directive';

let comp: NgxMyDatePicker;
let fixture: ComponentFixture<NgxMyDatePicker>;
let de: DebugElement;
let el: HTMLElement;

let PREVMONTH: string = '.header tr td:first-child div .headerbtncell:first-child .headerbtn';
let NEXTMONTH: string = '.header tr td:first-child div .headerbtncell:last-child .headerbtn';
let PREVYEAR: string = '.header tr td:last-child div .headerbtncell:first-child .headerbtn';
let NEXTYEAR: string = '.header tr td:last-child div .headerbtncell:last-child .headerbtn';

function getDateString(date:any):string {
    return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}

function getElement(id:string):DebugElement {
    return de.query(By.css(id));
}

function getElements(id:string):Array<DebugElement> {
    return de.queryAll(By.css(id));
}

describe('NgxMyDatePicker', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NgxMyDatePicker, FocusDirective],
        });

        fixture = TestBed.createComponent(NgxMyDatePicker);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('.mydp'));
        el = de.nativeElement;
    });

    it('test', () => {

    });



});





