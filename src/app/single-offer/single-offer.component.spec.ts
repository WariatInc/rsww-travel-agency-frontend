import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOfferComponent } from './single-offer.component';

describe('SingleOfferComponent', () => {
  let component: SingleOfferComponent;
  let fixture: ComponentFixture<SingleOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleOfferComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
