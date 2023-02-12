import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotHistoryComponent } from './spot-history.component';

describe('SpotHistoryComponent', () => {
  let component: SpotHistoryComponent;
  let fixture: ComponentFixture<SpotHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
