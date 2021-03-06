import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'connect',
    loadChildren: () => import('./modals/connect/connect.module').then( m => m.ConnectPageModule)
  },
  {
    path: 'addproduct',
    loadChildren: () => import('./modals/addproduct/addproduct.module').then( m => m.AddproductPageModule)
  },
  {
    path: 'modify-product/:id',
    loadChildren: () => import('./modals/modify-product/modify-product.module').then( m => m.ModifyProductPageModule)
  },  {
    path: 'order-product',
    loadChildren: () => import('./modals/order-product/order-product.module').then( m => m.OrderProductPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
