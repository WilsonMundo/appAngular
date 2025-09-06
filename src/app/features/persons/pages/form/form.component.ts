import { Component } from '@angular/core';
import { PersonService } from '@core/services/person.service';
import { PersonCreateDto } from '@core/models/person.model'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
type PersonForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  createdBy: FormControl<number>;
}>;
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {
  loading = false;
  errorMsg = '';
  successMsg = '';
  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      firstName: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.maxLength(100)] }),
      lastName: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.maxLength(100)] }),
      email: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.email] }),
      createdBy: this.fb.nonNullable.control(1, { validators: [Validators.required] })
    });
  }

  submit(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: PersonCreateDto = this.form.getRawValue();
    this.loading = true;

    this.personService.create(dto).subscribe({
      next: (person) => {
        this.loading = false;
        this.successMsg = `Persona creada: ${person.firstName} ${person.lastName}`;
        // this.router.navigate(['/main','persons']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message ?? 'No se pudo crear la persona.';
      }
    });
  }
}
