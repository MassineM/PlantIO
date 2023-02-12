import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantOverviewComponent } from './plant-overview.component';

describe('PlantOverviewComponent', () => {
  let component: PlantOverviewComponent;
  let fixture: ComponentFixture<PlantOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
