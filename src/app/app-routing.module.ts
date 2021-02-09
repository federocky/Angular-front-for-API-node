import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: '', component: ProductsListComponent},
    {path: 'list', component: ProductsListComponent},
    {path: 'product', component: ProductComponent},
    {path: 'product/:id', component: ProductComponent},
    {path :'**',  pathMatch: 'full' ,redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
