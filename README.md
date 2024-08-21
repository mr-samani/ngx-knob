# NgxKnob

`NgxKnob` is an Angular component that provides a knob controller allowing users to adjust values within a specified range. This component supports both mouse and touch interactions and can be easily integrated into Angular projects.

# [Live Demo](https://mr-samani.github.io/ngx-knob)


## Features

- **Adjustable Value:** Allows users to change the value between a minimum and maximum range using mouse or touch.
- **Form Integration:** Can be used with Angular forms as a `ControlValueAccessor`.
- **Validation Support:** Supports validation of input values.

## Installation

To install the library, use npm:

```bash
npm install ngx-knob --save
```

## Usage

### Importing the Module

First, add the `NgxKnobModule` to your Angular module:

```typescript
import { NgxKnobModule } from 'ngx-knob';

@NgModule({
  imports: [
    NgxKnobModule,
    // other modules
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Using in a Template

Use the `ngx-knob` component in your template as follows:

```html
<ngx-knob [min]="0" [max]="100" [(ngModel)]="value" title="HEATING"></ngx-knob>
```

### Component Setup

In your component, define the `value` property:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value = 50;
}
```

## Inputs and Outputs

### Inputs

| Input       | Type    | Default | Description                                           |
|-------------|---------|---------|-------------------------------------------------------|
| `title`     | `string`| `'HEATING'` | The title displayed above the knob.                    |
| `min`       | `number`| `0`     | The minimum value that the knob can represent.         |
| `max`       | `number`| `100`   | The maximum value that the knob can represent.         |
| `value`     | `number`| `0`     | The current value of the knob.                         |

### Outputs

| Output     | Type     | Description                                      |
|------------|----------|--------------------------------------------------|
| `change`   | `EventEmitter<number>` | Emits the new value whenever the knob's value changes. |

## Example

Here is a complete example of how to use the `ngx-knob` component:

```html
<ngx-knob 
  [min]="0" 
  [max]="100" 
  [(ngModel)]="value" 
  title="HEATING">
</ngx-knob>
<p>Value: {{ value }}</p>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value = 50;
}
```

## Development and Contribution

If you want to contribute to this library, you can clone the repository and make your changes:

```bash
git clone https://github.com/username/ngx-knob.git
cd ngx-knob
npm install
```

### Running Locally

To run the project locally and see your changes:

```bash
ng serve
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.





## Author
💻Mohammadreza samani | FrontEnd Developer

[❤️Buy me a coffee 😉](https://www.buymeacoffee.com/mrsamani)

 
