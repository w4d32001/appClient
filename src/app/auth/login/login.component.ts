import { ValidationErrorComponent } from './../../shared/components/validation-error/validation-error.component';
import { FormControlComponent } from './../../shared/components/form-control/form-control.component';
import { Router, RouterLink } from '@angular/router';
import { NotifyService } from './../../core/services/generic/notify.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormControlComponent, ValidationErrorComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  private authService = inject(AuthService)
  private notify = inject(NotifyService)

  get emailFb() {
    return this.loginForm.controls['email']
  }
  get passwordFb() {
    return this.loginForm.controls['password']
  }

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.loginForm.markAsDirty();
      return;
    }
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response) => {

        this.notify.showSuccessToast(response.message)
        setTimeout(() => {
          this.router.navigate(['admin']);
        }, 2000);
      },
      (error) => {
        this.notify.showErrorToast(error.error.error)
      }
    )
  }
}
