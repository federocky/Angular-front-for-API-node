import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  //almacenaremos los productos
  products$: Observable<Product>;

  constructor( private productService: ProductService ) { }

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(){
    this.products$ = this.productService.getAll();
  }

}
