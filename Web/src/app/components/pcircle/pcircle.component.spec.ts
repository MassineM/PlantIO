import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcircleComponent } from './pcircle.component';

describe('PcircleComponent', () => {
  let component: PcircleComponent;
  let fixture: ComponentFixture<PcircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
