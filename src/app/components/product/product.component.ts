import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/model/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  //parametro recibido por url
  recibedParam: number;

  //creamos el formulario
  myForm: FormGroup;

  //creamos los campos del formulario.
  name: FormControl;
  price: FormControl;
  amount: FormControl;


  constructor( private activatedRoute: ActivatedRoute,
                private productService: ProductService,
                private router: Router
    ) {
      this.createForm();
     }

  ngOnInit(): void {

    this.checkForParameters();

  }

  //creamos el formulario en codigo.
  createForm(): void{
    
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      amount: new FormControl('', [Validators.required, Validators.min(0)])
    });

    this.setFormControlsVariables();
  }

  setFormControlsVariables(): void {
    this.name     = this.myForm.controls.name     as FormControl;
    this.price    = this.myForm.controls.price    as FormControl;    
    this.amount   = this.myForm.controls.amount   as FormControl;
  }


  ///comprobamos si se han pasado parametros por url.
  checkForParameters(){

    this.activatedRoute.params.subscribe( (params: Params) => {
      
      //si memandan parametros
      if( params.id ) {
      
        //los almaceno en una variable
        this.recibedParam = params.id;

        //pido ese producto a la API
        this.getProduct();
      } 

   });
  }

  //pedimos el producto
  getProduct() {
    this.productService.getProduct(this.recibedParam)
      .subscribe( (res:any) => {
        this.name.setValue(res.data[0].name);
        this.price.setValue(res.data[0].price);
        this.amount.setValue(res.data[0].amount);
      });
  }


  onSubmit(){

    //creamos producto aux el id no es importante ya que lo genera la api
    const productoAux: Product = {
      id:  0,
      name: this.name.value,
      price: this.price.value,
      amount: this.amount.value
    }
      
    //si he recibido parametro por url
    if( this.recibedParam ){
       
      //realizo la peticion put
      this.productService.updateProduct(this.recibedParam, productoAux)
        .subscribe( () => {
          this.router.navigateByUrl('list');
        });

    } else {
      ///si no se reciben parametros por url

      //lanzamos el metodo del servicio post
      this.productService.addProduct(productoAux)
        .subscribe( () => {
          //una vez recibida la respuesta redireccionamos.
          this.router.navigateByUrl('list');
        });
    }
  }

}
