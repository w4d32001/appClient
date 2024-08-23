import { ModalComponent } from './../../shared/components/modal/modal.component';
import { PaymentModalComponent } from './../../shared/components/payment-modal/payment-modal.component';
import { PaymentFormComponentComponent } from './../../shared/components/payment-form-component/payment-form-component.component';
import { CommonModule } from '@angular/common';
import { SaleService } from './../../core/services/api/sale.service';
import { PaymentResponse, Payment } from './../../core/models/payment';
import { Customer } from './../../core/models/client';
import { Cart } from './../../core/models/cart';
import { FormsModule } from '@angular/forms';
import { PaymentHeaderComponent } from './../../shared/components/payment-header/payment-header.component';
import { Router } from '@angular/router';
import { NotifyService } from './../../core/services/generic/notify.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { PaymentService } from './../../core/services/payment.service';
import { CartService } from './../../core/services/generic/cart.service';
import { Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HeaderDashboardComponent } from "../../shared/components/header-dashboard/header-dashboard.component";
@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [PaymentHeaderComponent, PaymentFormComponentComponent, FormsModule, CommonModule, PaymentModalComponent, ModalComponent, HeaderDashboardComponent],
  templateUrl: './shopping.component.html'
})
export class ShoppingComponent {
  private paymentService = inject(PaymentService)
  private authService = inject(AuthService)
  private saleService = inject(SaleService)
  private notify = inject(NotifyService)
  private router = inject(Router)

  cartItems: Cart[] = [];
  paymentMethod: string = '';
  totalAmount: number = 0;
  payments: Payment[] = []
  user!: Customer
  private notificationSent = false;
  isModalOpen: boolean = false

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
    
    const storedTotal = localStorage.getItem('cartTotal');
    if (storedTotal) {
      this.totalAmount = parseFloat(storedTotal);
    }
  }

  getUser(){
    this.user = this.authService.getCurrentUser()
  }

  getPayments(){
    this.paymentService.getPayments().subscribe(
      (response: PaymentResponse) => {
        this.payments = response.data
      }
    )
  }

  updateQuantity(item: Cart, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(item);
    } else {
      this.cartService.updateQuantity(item.name, quantity);
      this.calculateTotal();
    }
  }

  removeItem(item: Cart): void {
    this.cartService.removeFromCart(item.name);
    this.calculateTotal();
  }
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price, 0);
    localStorage.setItem('cartTotal', this.totalAmount.toString());
  }

  handlePayment(): void {
    console.log('Payment method:', this.paymentMethod);
    console.log('Total amount:', this.totalAmount);
  }
  onChange(){
    const saleRequests = this.cartItems.map(item => {
      const sale = {
        customer_id: this.user.id,
        inventory_id: item.id,
        payment_method_id: Number(this.paymentMethod),
        total_sale: item.price 
      };
  
      return this.saleService.createSale(sale);
    });
  
    forkJoin(saleRequests).subscribe(
      (responses) => {
        if (!this.notificationSent) {
          this.notify.showSuccessToast('Ventas procesadas correctamente');
          this.notificationSent = true;
        }
        this.cartService.clearCart();
        this.router.navigate(['/admin/']); 
      },
      (error) => {
        this.notify.showErrorToast('Error al procesar ventas');
        console.error('Error en el procesamiento de ventas:', error);
      }
    );
  }
  trackByIndex(index: number, item: Cart): number {
    return index;
  }
  
  openModal()
  {
    this.isModalOpen = true
  }

  closeModal()
  {
    this.isModalOpen = false
  }

}
