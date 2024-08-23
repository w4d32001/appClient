import { BaseService } from './../generic/base.service';
import { BookResponse, Book } from './../../models/book';
import { Observable } from 'rxjs';
import { API_URL } from './../../api/API_URL';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService extends BaseService {

  private url = API_URL + "/book"
  private http = inject(HttpClient)

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getBooks(): Observable<BookResponse> {
    return this.http.get<BookResponse>(this.url, {
      headers: this.getAuthHeaders(),
    });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.url}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
