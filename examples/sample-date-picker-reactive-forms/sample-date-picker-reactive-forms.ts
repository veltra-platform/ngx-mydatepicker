import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {INgxMyDpOptions} from '../../src/ngx-my-date-picker/interfaces';

declare var require:any;
const amSampleTpl: string = require('./sample-date-picker-reactive-forms.html');

@Component({
    selector: 'sample-date-picker-reactive-forms',
    template: amSampleTpl
})

export class SampleDatePickerReacticeForms implements OnInit {

    private myDatePickerOptions: INgxMyDpOptions = {
        dateFormat: 'dd.mm.yyyy'
    };

    private myForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        console.log('onInit(): SampleDatePickerReacticeForms');
        let d: Date = new Date();
        this.myForm = this.formBuilder.group({
            //myDate: [null, Validators.required]   // not initial date set
            //myDate: [{jsdate: new Date()}, Validators.required] // initialized todat with jsdate property
            myDate: [{date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}}, Validators.required]   // this example is initialized to specific date

        });
    }

    onSubmitReactiveForms(): void {
        console.log('Value: ', this.myForm.controls['myDate'].value, ' - Valid: ', this.myForm.controls['myDate'].valid, ' - Dirty: ', this.myForm.controls['myDate'].dirty);
    }

    setDate(): void {
        // Set today using the setValue function
        let date: Date = new Date();
        this.myForm.setValue({myDate: {date: {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}}});
    }

    resetDate(): void {
        // Reset date picker to specific date (today)
        let date: Date = new Date();
        this.myForm.reset({myDate: {date: {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}}});
    }

    clearDate(): void {
        // Clear the date using the setValue function
        this.myForm.setValue({myDate: null});
    }
}
