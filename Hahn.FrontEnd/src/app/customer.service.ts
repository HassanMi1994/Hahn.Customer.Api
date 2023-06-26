import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './models/customer';
import { RequestModel } from './models/RequestModel';
import { ResponseModel } from './models/ResponseModel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private baseURL = environment.apiUrl;
  public paginationStore = new RequestModel();

  constructor(private http: HttpClient) {

  }

  getCustomers(): Observable<ResponseModel<Customer[]>> {

    var searchPart = this.paginationStore.search == "" ? "" : `/search/${this.paginationStore.search}`
    var request= this.http.get<ResponseModel<Customer[]>>(`${this.baseURL}/customers/page-size/${this.paginationStore.pageSize}/page-number/${this.paginationStore.pageNumber}${searchPart}`);
    return  request;
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(`${this.baseURL}/customers/${id}`);
  }

  create(customer: Customer) {
    return this.http.post<Customer>(`${this.baseURL}/customers/create/`, customer);
  }

  update(customer: Customer) {
    return this.http.put<Customer>(`${this.baseURL}/customers/put/`, customer)
  }

  delete(customer: Customer) {
    return this.http.delete<boolean>(`${this.baseURL}/customers/delete/${customer.id}`);
  }
}
