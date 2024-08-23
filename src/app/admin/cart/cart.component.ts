import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from './../../core/services/api/book.service';
import { CartService } from './../../core/services/generic/cart.service';
import { NotifyService } from './../../core/services/generic/notify.service';
import { Cart } from './../../core/models/cart';
import { BookResponse } from './../../core/models/book';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  private bookService = inject(BookService);
  private cartService = inject(CartService);
  private notify = inject(NotifyService);
  private router = inject(Router);

  cartItems: Cart[] = [];
  inventories: Record<number, number> = {}; 

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items.map(item => ({
        ...item,
        quantity: 1 
      }));
    });
  }

  removeItem(item: Cart): void {
    this.cartService.removeFromCart(item.name);
  }

  getTotalPrice(): number {
    const total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    localStorage.setItem('cartTotal', total.toString()); 
    return total;
  }
  

  checkQuantitiesBeforeRedirect(): void {
    const hasZeroQuantity = this.cartItems.some(item => item.quantity <= 0);

    if (hasZeroQuantity) {
      this.notify.showErrorToast('Hay artículos en el carrito con cantidad cero. Por favor, actualiza las cantidades.');
    } else {
      this.router.navigate(['admin/shopping']);
    }
  }
}
