import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResponseComponent } from './form-response.component';

describe('FormResponseComponent', () => {
  let component: FormResponseComponent;
  let fixture: ComponentFixture<FormResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormResponseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormResponseComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
