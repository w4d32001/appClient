import { CustomerResponse, Customer } from './../../models/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './../../api/API_URL';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = API_URL + '/customer';

  private http = inject(HttpClient);

  
  getCustomer(id: number): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.url}/${id}`);
  }

  createCustomer(customer: Customer): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.url, customer);
  }

  updateCustomer(
    id: number,
    customer: Customer
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.url}/${id}`,
      customer,
      
    );
  }

  deleteCustomer(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.url}/${id}`);
  }

  updateCustomerAddress(id: number, addressData: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/customer/address/${id}`, addressData);
  }
}
