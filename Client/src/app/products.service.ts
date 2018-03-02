import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product} from './Product';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any>{
    var url = 'http://localhost:3000/api/product/getProducts/';
  return this.http.get<any>(url); }

  createProduct(product: any): Observable<any> {
    var url = 'http://localhost:3000/api/product/createProduct';
    return this.http.post<any>(url,product);
  }
  updateProduct(product: any, productId: String): Observable<any> {
    var url = 'http://localhost:3000/api/product/updateProduct/'+productId;
    return this.http.patch<any>(url,product);
  }
  deleteProduct(productId: String): Observable<any> {
    var url = 'http://localhost:3000/api/product/deleteProduct/'+productId;
    return this.http.delete<any>(url);
  }
}
