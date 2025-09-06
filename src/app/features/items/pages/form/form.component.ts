import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ItemService } from '@core/services/item.service';
import { ItemCreateDto } from '@core/models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  form!: FormGroup;
  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      price: [0, [Validators.required, Validators.min(0)]],
      createdBy: [1, [Validators.required]] // ajusta si quieres que venga del user
    });
  }

  submit(): void {
    this.successMsg = '';
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: ItemCreateDto = this.form.getRawValue();
    this.loading = true;

    this.itemService.create(dto).subscribe({
      next: (item) => {
        this.loading = false;
        this.successMsg = `Item creado: ${item.name} ($${item.price})`;
        // opcional: navegar a listado
        // this.router.navigate(['/main','items']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message ?? 'No se pudo crear el item.';
      }
    });
  }
}
