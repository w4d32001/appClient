import { CommonModule } from '@angular/common';
import { PaymentFormComponentComponent } from './../payment-form-component/payment-form-component.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [PaymentFormComponentComponent, CommonModule],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent {
  @Input() totalAmount!: number;
  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
