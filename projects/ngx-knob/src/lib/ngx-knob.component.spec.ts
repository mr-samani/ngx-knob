import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxKnobComponent } from './ngx-knob.component';

describe('NgxKnobComponent', () => {
  let component: NgxKnobComponent;
  let fixture: ComponentFixture<NgxKnobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxKnobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxKnobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
