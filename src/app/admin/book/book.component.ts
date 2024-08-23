import { Category } from './../../core/models/category';
import { Book, BookResponse } from './../../core/models/book';
import { BookService } from './../../core/services/api/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './../../shared/components/loader/loader.component';
import { ProductModalComponent } from './../../shared/components/product-modal/product-modal.component';
import { CardComponent } from './../../shared/components/card/card.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CardComponent, ProductModalComponent, LoaderComponent, FormsModule, CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  private bookService = inject(BookService)

  books: Book[] = []
  filteredBooks: Book[] = []
  selectedBook: Book | null = null
  categories: Category[] = []
  selectedCategoryId: string = ''
  isLoading: boolean = false

  ngOnInit() {
    this.loadBooks()
  }

  loadBooks() {
    this.isLoading = true
    this.bookService.getBooks().subscribe(
      (response: BookResponse) => {
        this.books = response.data
        console.log(this.books)
        this.filteredBooks = [...this.books] 
        this.isLoading = false
      }
    )
  }

  // filterProducts() {
  //   if (this.selectedCategoryId) {
  //     this.filteredBooks = this.books.filter(product => product.category.id === parseInt(this.selectedCategoryId, 10))
  //   } else {
  //     this.filteredBooks = [...this.books] 
  //   }
  // }

  openModal(book: Book) {
    this.selectedBook = book
  }

  closeModal() {
    this.selectedBook = null
  }

  trackByBookId(index: number, item: Book) {
    return item.id
  }

  trackByCategoryId(index: number, item: Category) {
    return item.id
  }
}
