import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  //almacenaremos los productos
  products: Product[] = [];

  constructor( private productService: ProductService ) { }

  ngOnInit(): void {

    //solicitamos los productos
    this.loadProducts();
  }

  //cargamos los productos
  loadProducts(){
    this.productService.getAll()
      .subscribe( (res:any) => {
        this.products = res;
      })
  }


  /**
   * Entiendo que esta parte del sweet alert deberia estar en un componente separado
   * pero como tengo el paso de parametros, la llamada al metodo delete, la actualizacion
   * de la lista... he dedicido por simplicidad en el codigo dejarlo aqui.
   */

  //cuadro de confirmacion (sweet alert)
  confirmBox( id: number ){  
    Swal.fire({  
      title: 'Are you sure want to remove?',  
      text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      //si aceptamos
      if (result.value) {  
        
        //solicitamos eliminar el producto
        this.onDeleteProduct( id );
        
        //si no aceptamos nos muestra que fue cancelado
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your file is safe :)',  
          'error'  
        )  
      }  
    })  
  }  


  //funciona que elimina un producto utilizando el servicio
  onDeleteProduct( id:number ){

    this.productService.deleteProduct( id )
      .subscribe( ( res:any ) => {
        
        //guarda la nueva lista de productos
        this.products = res.data;

        //lanzamos el mensaje de sweet alert
        Swal.fire( 
        'Deleted!',  
        'Your imaginary file has been deleted.',  
        'success' 
        );
      })
    
  }




}
