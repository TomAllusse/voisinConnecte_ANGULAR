import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

export type PriceUnit = 'par heure' | 'par jour' | 'à la prestation' | 'au forfait';
export type AnnouncementStatus = 'pending' | 'active' | 'closed';

export interface AnnouncementPayload {
  category_id: number;
  title: string;
  description: string;
  is_paid: boolean;
  price?: number | null;
  price_unit?: PriceUnit | null;
  status: AnnouncementStatus;
  is_active: boolean;
}

@Component({
  selector: 'app-form-response',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-response.component.html',
  styleUrls: ['./form-response.component.css'],
})
export class FormResponseComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitting = false;
  submitted = false;

  private paidSub!: Subscription;

  categories = [
    { id: 1, label: 'Bricolage' },
    { id: 2, label: 'Jardinage' },
    { id: 3, label: 'Soutien scolaire' },
    { id: 4, label: "Garde d'animaux" },
    { id: 5, label: 'Livraison / Courses' },
    { id: 6, label: 'Informatique' },
    { id: 7, label: 'Autre' },
  ];

  priceUnits: PriceUnit[] = ['par heure', 'par jour', 'à la prestation', 'au forfait'];

  statusOptions: { value: AnnouncementStatus; label: string }[] = [
    { value: 'pending', label: 'En attente' },
    { value: 'active', label: 'Actif' },
    { value: 'closed', label: 'Fermé' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      category_id: [null, Validators.required],
      description: ['', [Validators.required]],
      is_paid: [false],
      price: [null],
      price_unit: [null],
      status: ['pending'],
      is_active: [true],
    });

    this.paidSub = this.form.get('is_paid')!.valueChanges.subscribe((paid: boolean) => {
      const priceCtrl = this.form.get('price')!;
      const unitCtrl = this.form.get('price_unit')!;

      if (paid) {
        priceCtrl.setValidators([Validators.required, Validators.min(0)]);
        unitCtrl.setValidators([Validators.required]);
      } else {
        priceCtrl.clearValidators();
        unitCtrl.clearValidators();
        priceCtrl.setValue(null);
        unitCtrl.setValue(null);
      }

      priceCtrl.updateValueAndValidity();
      unitCtrl.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.paidSub?.unsubscribe();
  }

  get isPaid(): boolean {
    return this.form.get('is_paid')!.value;
  }

  get titleLength(): number {
    return this.form.get('title')?.value?.length ?? 0;
  }

  get descLength(): number {
    return this.form.get('description')?.value?.length ?? 0;
  }

  isFieldInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched || this.submitted));
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload: AnnouncementPayload = {
      category_id: this.form.value.category_id,
      title: this.form.value.title.trim(),
      description: this.form.value.description.trim(),
      is_paid: this.form.value.is_paid,
      price: this.form.value.is_paid ? this.form.value.price : null,
      price_unit: this.form.value.is_paid ? this.form.value.price_unit : null,
      status: this.form.value.status,
      is_active: this.form.value.is_active,
    };

    console.log('Payload à envoyer :', payload);
    // TODO: remplacer par ton service → this.announcementService.create(payload).subscribe(...)

    setTimeout(() => {
      this.isSubmitting = false;
      this.onReset();
    }, 1000);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset({ status: 'pending', is_paid: false, is_active: true });
  }
}
