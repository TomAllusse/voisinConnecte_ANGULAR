import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategorieService } from '../service/categorie.service';
import { AnnounceService } from '../service/announce.service';
import { AnnonceCreate, PriceUnit } from '../models/annonce.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-form-annonce',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-annonce.component.html',
  styleUrls: ['./form-annonce.component.css'],
})
export class FormAnnonceComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categorieService = inject(CategorieService);
  private announceService = inject(AnnounceService);
  private destroyRef = inject(DestroyRef);

  form!: FormGroup;
  categories$!: Observable<any[]>;
  isSubmitting = false;
  submitted = false;

  priceUnits: { value: PriceUnit; label: string }[] = [
    { value: 'heure', label: 'Par heure' },
    { value: 'service', label: 'À la prestation' },
    { value: 'jour', label: 'Par jour' },
  ];

  ngOnInit(): void {
    this.loadCategories();
    this.buildForm();
    this.watchIsPaid();
  }

  private loadCategories(): void {
    this.categories$ = this.categorieService
      .getCategories()
      .pipe(map((data: any) => data.result ?? data));
  }

  private buildForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      id_category: [null, Validators.required],
      description: ['', Validators.required],
      is_paid: [false],
      price: [null],
      price_unit: [null],
    });
  }

  private watchIsPaid(): void {
    this.form
      .get('is_paid')!
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((paid: boolean) => {
        const price = this.form.get('price')!;
        const unit = this.form.get('price_unit')!;

        if (paid) {
          price.setValidators([Validators.required, Validators.min(0)]);
          unit.setValidators(Validators.required);
        } else {
          price.clearValidators();
          unit.clearValidators();
          price.setValue(null);
          unit.setValue(null);
        }

        price.updateValueAndValidity();
        unit.updateValueAndValidity();
      });
  }

  get isPaid(): boolean {
    return this.form.get('is_paid')!.value;
  }

  get descLength(): number {
    return this.form.get('description')?.value?.length ?? 0;
  }

  isFieldInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && (ctrl.dirty || ctrl.touched || this.submitted));
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { title, description, id_category, is_paid, price, price_unit } = this.form.value;

    console.log(title, description, id_category, price, price_unit);

    const annonce: AnnonceCreate = {
      id_category,
      title: title.trim(),
      description: description.trim(),
      is_paid,
      price: is_paid ? price : null,
      price_unit: is_paid ? price_unit : null,
    };

    this.announceService
      .createAnnonce(annonce)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.onReset();
        },
        error: (err) => {
          console.error('Erreur création annonce :', err);
          this.isSubmitting = false;
        },
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset({ is_paid: false });
  }
}
