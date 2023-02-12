import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbtnComponent } from './pbtn.component';

describe('PbtnComponent', () => {
  let component: PbtnComponent;
  let fixture: ComponentFixture<PbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
