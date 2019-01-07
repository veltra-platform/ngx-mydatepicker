import { ElementRef, ViewContainerRef, Renderer, ChangeDetectorRef, ComponentFactoryResolver, EventEmitter, SimpleChanges, OnChanges, OnDestroy } from "@angular/core";
import { AbstractControl, ControlValueAccessor, Validator } from "@angular/forms";
import { IMyOptions, IMyDateModel, IMyCalendarViewChanged, IMyInputFieldChanged } from "./interfaces/index";
import { UtilService } from "./services/ngx-my-date-picker.util.service";
import { NgxMyDatePickerConfig } from "./services/ngx-my-date-picker.config";
export declare class NgxMyDatePickerDirective implements OnChanges, OnDestroy, ControlValueAccessor, Validator {
    private utilService;
    private vcRef;
    private cfr;
    private renderer;
    private cdr;
    private elem;
    private config;
    options: IMyOptions;
    defaultMonth: string;
    dateChanged: EventEmitter<IMyDateModel>;
    inputFieldChanged: EventEmitter<IMyInputFieldChanged>;
    calendarViewChanged: EventEmitter<IMyCalendarViewChanged>;
    calendarToggle: EventEmitter<number>;
    private cRef;
    private inputText;
    private preventClose;
    private disabled;
    private opts;
    onChangeCb: (_: any) => void;
    onTouchedCb: () => void;
    constructor(utilService: UtilService, vcRef: ViewContainerRef, cfr: ComponentFactoryResolver, renderer: Renderer, cdr: ChangeDetectorRef, elem: ElementRef, config: NgxMyDatePickerConfig);
    onKeyUp(evt: KeyboardEvent): void;
    onBlur(): void;
    private onClickWrapper;
    onClick(evt: MouseEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    parseOptions(opts: IMyOptions): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    validate(c: AbstractControl): {
        [p: string]: any;
    };
    openCalendar(): void;
    closeCalendar(): void;
    toggleCalendar(): void;
    clearDate(): void;
    isDateValid(): boolean;
    private ignoreKeyPress(keyCode);
    private closeSelector(reason);
    private updateModel(model);
    private setInputValue(value);
    private focusToInput();
    private emitDateChanged(dateModel);
    private emitInputFieldChanged(value, valid);
    private emitCalendarChanged(cvc);
    private emitCalendarToggle(reason);
    private jsDateToMyDate(date);
    private appendSelector(elem);
    private getSelectorPosition(elem);
    private getSelectorDimension(value);
}
