import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartphoneDetailsComponent } from './smartphone-details.component';

describe('SmartphoneDetailsComponent', () => {
  let component: SmartphoneDetailsComponent;
  let fixture: ComponentFixture<SmartphoneDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartphoneDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartphoneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
