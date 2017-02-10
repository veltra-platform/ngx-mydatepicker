import {Component} from '@angular/core';

declare var require:any;
const styles: string = require('./sample-date-picker-app.css');
const template: string = require('./sample-date-picker-app.html');

@Component({
  selector: 'ngx-mydatepicker-app',
  styles: [styles],
  template
})

export class MyDatePickerApp {

  constructor() {
    console.log('constructor: MyDatePickerApp');
  }

}
