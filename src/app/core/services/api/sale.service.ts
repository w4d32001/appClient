import { Observable } from 'rxjs';
import { API_URL } from './../../api/API_URL';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private url = API_URL + '/sale';

  private http = inject(HttpClient);

  createSale(sale: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.url, sale);
  }

}
