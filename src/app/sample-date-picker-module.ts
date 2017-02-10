import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyDatePickerApp }  from './sample-date-picker-app';
import { SampleDatePickerNgModel }  from './components/sample-date-picker-ngmodel';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
    imports:      [ BrowserModule, FormsModule, NgxMyDatePickerModule ],
    declarations: [ MyDatePickerApp, SampleDatePickerNgModel ],
    bootstrap:    [ MyDatePickerApp ]
})
export class SampleDatePickerModule { }