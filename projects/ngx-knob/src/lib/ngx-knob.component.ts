import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { convertDegreeToValue, convertValueToDegree, getOffsetPosition } from '../utils/utils';

@Component({
  selector: 'ngx-knob',
  templateUrl: './ngx-knob.component.html',
  styleUrls: ['./ngx-knob.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxKnobComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NgxKnobComponent),
      multi: true,
    },
  ],
})
export class NgxKnobComponent implements ControlValueAccessor, OnInit, Validator {
  @Input() title = 'HEATING';
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;

  arcValue = 0;

  isDisabled = false;
  position = { x: 0, y: 0 };
  dragging = false;
  _onChange = (value: number) => {};
  _onTouched = () => {};
  _validatorOnChange = () => {};
  @ViewChild('selectAngle', { static: true })
  selectAngle!: ElementRef<HTMLDivElement>;
  @ViewChild('pointer', { static: true })
  pointer!: ElementRef<HTMLDivElement>;
  constructor(private _renderer: Renderer2) {
    this.initRange();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  private get _min() {
    // min is =0
    return Math.round((this.min * 0) / 100);
  }

  private get _max() {
    return Math.round((this.max * 82) / 100);
  }

  private get _size() {
    return this.selectAngle.nativeElement.getBoundingClientRect().width;
  }

  writeValue(value: any): void {
    this.value = +value;
    let newVal = Math.round((this.value * 82) / 100);
    let deg = convertValueToDegree(value, this.min, this.max) - 150 ;
    this.movePointer(deg);
    this.initRange();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let error: any = {};
    if (this.value < this.min) error.min = true;
    if (this.value > this.max) error.max = true;
    if (typeof +this.value !== 'number') error.invalid = true;
    if (error.min || error.max || error.invalid) {
      return Object.assign(control.errors || {}, error);
    }
    return control.errors;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this._validatorOnChange = fn;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(disabled: boolean): void {
    this.isDisabled = disabled;
  }

  calcArc(val: number) {
    let radius = val / (3.14159 * 2);
    let diameter = radius * 2;
    let x = this._size / 2;
    let y = (this._size - diameter) / 2;
    return `M${x} ${y}
                        a ${radius}  ${radius} 0 0 1 0  ${diameter}
                        a  ${radius}  ${radius} 0 0 1 0 -${diameter}`;
  }
  initRange() {
    // calc from 100 => 100=82, x=?  ==> ;
    this.arcValue = Math.round((this.value * 82) / 100);
  }

  /*-------------------------------------------------------------------------------------------------*/

  /**
   * End dragging
   * on document mouse up
   * @param ev mouse event | touch event
   */
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(ev: MouseEvent | TouchEvent) {
    this.dragging = false;
  }
  /**
   * End dragging
   * on document touch end
   * @param ev mouse event | touch event
   */
  @HostListener('document:touchend', ['$event'])
  onTouchEnd(ev: MouseEvent | TouchEvent) {
    this.dragging = false;
  }
  /**
   * Start dragging
   * on mouse or touch down
   * @param ev mouse event | touch event
   */
  onMouseDown(ev: MouseEvent | TouchEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.position = getOffsetPosition(ev, this.selectAngle.nativeElement);
    this.dragging = true;
    this.updateAngle();
  }

  /**
   * Move
   * on mouse or touch move
   * @param ev mouse event | touch event
   */
  onMouseMove(ev: MouseEvent | TouchEvent) {
    if (!this.dragging) {
      return;
    }

    ev.preventDefault();
    ev.stopPropagation();
    this.position = getOffsetPosition(ev, this.selectAngle.nativeElement);
    this.updateAngle();
  }

  /**
   * get angle and update view
   */
  updateAngle() {
    let x2 = this.position.x;
    let y2 = this.position.y;
    let radians = Math.atan2(y2 - this._size / 2, x2 - this._size / 2);
    let e = radians * (180 / Math.PI);
    // e : is west
    e = 90 + e;
    e < 0 && (e = 360 + e);
    let deg = Math.round(e);
    if (deg > 150 && deg <= 180) {
      deg = 150;
    } else if (deg > 180 && deg <= 210) {
      deg = 210;
    }
    this.movePointer(deg);
    this.value = convertDegreeToValue(deg, this.min, this.max);
    this.initRange();
    this._onChange(this.value);
  }

  /**
   * move knob pointer
   * @param deg number between 0 - 360
   */
  private movePointer(deg: number) {
    let transform = 'translateZ(0px) rotate(' + deg + 'deg)';
    this._renderer.setStyle(this.pointer.nativeElement, 'transform', transform);
  }
  
}
