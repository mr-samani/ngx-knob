import { NgModule } from "@angular/core";
import { NgxKnobComponent } from "./public-api";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        NgxKnobComponent
    ],
    imports:[
        CommonModule
    ],
    exports:[
        NgxKnobComponent
    ]
})
export class NgxKnobModule{}