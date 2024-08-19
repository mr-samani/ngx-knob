import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxKnobModule } from '../../../ngx-knob/src/ngx-knob.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxKnobModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  value: number | null = 100;
  createRandomaize() {
    this.value = Math.round(Math.random() * 100);
  }

  clear() {
    this.value = null;
  }
}
