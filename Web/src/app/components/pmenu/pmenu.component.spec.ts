import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmenuComponent } from './pmenu.component';

describe('PmenuComponent', () => {
  let component: PmenuComponent;
  let fixture: ComponentFixture<PmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
