import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcardComponent } from './pcard.component';

describe('PcardComponent', () => {
  let component: PcardComponent;
  let fixture: ComponentFixture<PcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
