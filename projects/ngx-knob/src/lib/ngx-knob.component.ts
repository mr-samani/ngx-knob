import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-knob',
  templateUrl: './ngx-knob.component.html',
  styleUrls: ['./ngx-knob.component.scss'],
})
export class NgxKnobComponent {
  @Input() title = 'HEATING';
  @Input() min = 0;
  @Input() max = 0;

  width = 200;
  height = 200;

  value = 0;
  arcValue = 0;

  constuctor() {
    this.initRange(100);
  }

  calcArc(val: number) {
    let radius = val / (3.14159 * 2);
    let diameter = radius * 2;
    let x = this.width / 2;
    let y = (this.width - diameter) / 2;
    return `M${x} ${y}
                        a ${radius}  ${radius} 0 0 1 0  ${diameter}
                        a  ${radius}  ${radius} 0 0 1 0 -${diameter}`;
  }
  initRange(val = 100) {
    // calc from 100 => 100=80, x=?  ==> ;
    this.arcValue = Math.round((val * 80) / 100);

    // // // let svg = document.getElementById('range-s')!;
    // // // svg.setAttributeNS(
    // // //   'http://www.w3.org/2000/svg',
    // // //   'viewBox',
    // // //   `0 0 ${this.width} ${this.height}`
    // // // );
  }
}
