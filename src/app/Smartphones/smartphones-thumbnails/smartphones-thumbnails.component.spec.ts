import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartphonesThumbnailsComponent } from './smartphones-thumbnails.component';

describe('SmartphonesThumbnailsComponent', () => {
  let component: SmartphonesThumbnailsComponent;
  let fixture: ComponentFixture<SmartphonesThumbnailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartphonesThumbnailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartphonesThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
