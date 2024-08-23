import { ValidationErrorComponent } from './../../shared/components/validation-error/validation-error.component';
import { FormControlComponent } from './../../shared/components/form-control/form-control.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotifyService } from './../../core/services/generic/notify.service';
import { ClientService } from './../../core/services/api/client.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormControlComponent, ValidationErrorComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  private clientService = inject(ClientService)
  private notify = inject(NotifyService)

  get nameFb() {
    return this.registerForm.controls['name'];
  }
  get addressFb() {
    return this.registerForm.controls['address'];
  }
  get emailFb() {
    return this.registerForm.controls['email'];
  }
  get passwordFb() {
    return this.registerForm.controls['password'];
  }

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]], 
      password: [null, [Validators.required, Validators.minLength(6)]], 
    });
  }

  onSubmit(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      this.registerForm.markAsDirty();
      return;
    }
    this.clientService.createCustomer(this.registerForm.value).subscribe(
      (response) => {
        console.log(response.message)
        this.notify.showSuccessToast(response.message)
        setTimeout(() => {
          this.router.navigate(['auth/']);
        }, 2000);
      },
      (error) => {
        this.notify.showErrorToast(error.error.message)

      }
    )
  }

 
}
