import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private server: string   = 'http://localhost:';
  private port: string     = '3000';
  private path: string     = 'api/products'
  private url: string      = `${this.server}${this.port}/${this.path}`

  constructor( private http: HttpClient) { }


  //pide todos los productos
  getAll(): Observable<any>{
    //devuelvo la respuesta de la peticion
    return this.http.get(this.url);
  }

  //devolver un producto
  getProduct( id: number ) {

    //devolvemos el producto seleccionado
    return this.http.get(`${this.url}/${id}`);
  }

  //creamos un producto
  addProduct( product: Product ): Observable<any> {
    return this.http.post<any>(this.url, product);
  }

  //actualizamos un producto
  updateProduct( id: number, product: Product ): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, product);
  }

}
