import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MyDatePickerApp } from './app.component';

import {SampleDatePickerNgModel} from './sample-date-picker-ngmodel';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';

@NgModule({
  declarations: [
    MyDatePickerApp, SampleDatePickerNgModel
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxMyDatePickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [MyDatePickerApp]
})
export class AppModule { }
