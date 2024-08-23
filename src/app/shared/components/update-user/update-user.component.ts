import { Customer, CustomerResponse } from './../../../core/models/client';
import { NotifyService } from './../../../core/services/generic/notify.service';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ClientService } from '../../../core/services/api/client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationErrorComponent],
  templateUrl: './update-user.component.html',
})
export class UpdateUserComponent {
  private authService = inject(AuthService);
  private clientService = inject(ClientService);
  private notify = inject(NotifyService)
  private router = inject(Router)

  updateForm!: FormGroup;

  user!: Customer;
  client: Customer = {
    id: 0,
    name: '',
    image: '',
    address: '',
    email: '',
    password: '',
  };

  ngOnInit() {
    this.getUser()
    this.getClient()
  }
  get nameFb() {
    return this.updateForm.controls['name']
  }
  get imageFb() {
    return this.updateForm.controls['image']
  }
  get emailFb() {
    return this.updateForm.controls['email']
  }

  constructor(private fb: FormBuilder) {
    this.updateForm = fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      image: [null, []],
      email: [null, [Validators.required]],
      });
  }

  getUser() {
    this.user = this.authService.getCurrentUser();
  }

  getClient() {
    this.clientService
      .getCustomer(this.user.id)
      .subscribe((response: CustomerResponse) => {
        this.client = response.data;
        this.updateForm.patchValue({
          name: this.client.name,
          email: this.client.email,
        })
        if (this.client.image) {
          this.imagePreview = this.client.image;
        }
      });
  }

  onSubmit() {
    if (!this.updateForm.valid) {
      this.updateForm.markAllAsTouched();
      this.updateForm.markAsDirty();
      return;
    }
    console.log(this.updateForm.value);
    this.clientService.updateCustomer(this.user.id, this.updateForm.value).subscribe(
      (response) => {
        this.notify.showSuccessToast(response.message)
        setTimeout(() => {
          this.router.navigate(['/admin/profile']);
        }, 0);
      },
      (error)=> {
        console.log(error)
      }
    )
  }
  
  imagePreview: string | ArrayBuffer | null = null;
  isLoading = false;

  captureImg(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (validImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
          this.updateForm.patchValue({ image: reader.result });
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview = null;
        this.updateForm.patchValue({ image: null });
        this.notify.showErrorToast("Por favor ingrese un archivo de tipo imagen válido (JPEG, PNG, GIF, WEBP)");
      }
    } else {
      this.imagePreview = null;
      this.updateForm.patchValue({ image: null });
      this.notify.showErrorToast("Por favor seleccione un archivo");
    }
  }
}
