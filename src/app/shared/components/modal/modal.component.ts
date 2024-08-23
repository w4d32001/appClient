import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = 'Modal Title';
  @Output() close = new EventEmitter<void>();
  @Input() width: string = 'max-w-lg'; 

  closeModal() {
    this.close.emit();
  }
}
