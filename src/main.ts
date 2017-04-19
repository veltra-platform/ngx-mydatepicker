import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SampleDatePickerModule } from './app/sample-date-picker-module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(SampleDatePickerModule);
