import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { FinalizarCompraComponent } from './finalizar-compra/finalizar-compra.component';
import { RegisterComponent } from './register/register.component';
import { AutenticacaoGuard } from './guards/autenticacao.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [  { path: '', component: ProductListComponent },
                          { path: 'products/:productId', component: ProductDetailsComponent},
                          { path: 'cart', component: CartComponent},
                          { path: 'login', component: LoginComponent},
                          { path: 'finalizar', component: FinalizarCompraComponent, canActivate: [AutenticacaoGuard] },
                          { path: 'register', component: RegisterComponent},
                          { path: 'admin', component: AdminComponent}
                      ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
