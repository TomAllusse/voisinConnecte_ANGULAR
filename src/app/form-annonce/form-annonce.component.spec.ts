import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnnonceComponent } from './form-annonce.component';

describe('FormAnnonceComponent', () => {
  let component: FormAnnonceComponent;
  let fixture: ComponentFixture<FormAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAnnonceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAnnonceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
