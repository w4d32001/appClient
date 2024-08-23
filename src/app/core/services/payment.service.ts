import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentResponse } from './../models/payment';
import { API_URL } from './../api/API_URL';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = API_URL + "/payment"
  private http = inject(HttpClient)

  getPayments(): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(this.url);
  }
}
