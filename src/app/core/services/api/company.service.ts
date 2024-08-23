import { CompanyR } from './../../models/company';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './../../api/API_URL';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private http = inject(HttpClient)

  private url = API_URL + "/company"

  getCompany(id: number): Observable<CompanyR> {
    return this.http.get<CompanyR>(`${this.url}/${id}`);
  }
}