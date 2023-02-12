import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinputComponent } from './pinput.component';

describe('PinputComponent', () => {
  let component: PinputComponent;
  let fixture: ComponentFixture<PinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
