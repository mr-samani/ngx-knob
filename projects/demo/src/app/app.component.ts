import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxKnobModule } from '../../../ngx-knob/src/ngx-knob.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IColorRange } from '../../../ngx-knob/src/public-api';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, NgxKnobModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  value: number | null = 100;
  disabled = false;
  colorRanges: IColorRange[] = [{ color: '#985EE1' }, { color: '#F25656' }];

  createRandomaize() {
    this.value = Math.round(Math.random() * 100);
  }

  clear() {
    this.value = null;
  }

  deleteColor(index: number) {
    this.colorRanges.splice(index, 1);
  }
  addNewColor() {
    this.colorRanges.push({ color: '#985ee1' });
  }
}
