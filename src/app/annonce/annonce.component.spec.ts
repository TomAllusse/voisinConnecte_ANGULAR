import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceComponent } from './annonce.component';

describe('AnnonceComponent', () => {
  let component: AnnonceComponent;
  let fixture: ComponentFixture<AnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnonceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnonceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
