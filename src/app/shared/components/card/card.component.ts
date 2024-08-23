import { CartService } from './../../../core/services/generic/cart.service';
import { NotifyService } from './../../../core/services/generic/notify.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Cart } from '../../../core/models/cart';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './card.component.html'
})
export class CardComponent {

  @Input() image = ""
  @Input() name = ""
  @Input() description = ""
  @Input() price = 0
  @Input() inventory = 0
  faPlus = faPlus
  @Output() openModal = new EventEmitter<void>();

  private cartService = inject(CartService)
  private notify = inject(NotifyService)

  onImageClick() {
    this.openModal.emit();
  }

  addToCart(event: MouseEvent) {
    event.stopPropagation(); 
    const cartItem: Cart = {
      id: this.inventory,
      image: this.image,
      name: this.name,
      description: this.description,
      price: this.price,
      quantity: 0,
    };

    this.cartService.addToCart(cartItem);

    this.notify.showSuccessToast("Producto agregado al carrito")
  }
}
