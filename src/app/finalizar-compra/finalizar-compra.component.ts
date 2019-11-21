import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../services/firebase.service';
import { UsuarioService } from './../services/usuario.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit {
  public userId;
  public todos = [];
  public checkingUser = true;

  constructor(private firebase: FirebaseService,
              private usuario: UsuarioService,
              private cartService: CartService,
              public router: Router) {
    this.usuario.getUser().subscribe((user) => this.userId = user.id);
  }

  async adicionar() {
    try {
      await this.firebase.db().collection('pedido').add({
        user_id: this.userId,
        cart: this.cartService.getItems()
      });
      alert('Compra realizada com sucesso!');
      this.cartService.clearCart();
    } catch (error) {
      console.log(error);
    }
  }

  async carregar() {
    this.firebase.db().collection('pedido').onSnapshot(results => {
      this.todos = [];
      results.docs.forEach(doc => {
        this.todos.push({ id: doc.id, ...doc.data() });
      });
    });
  }


  ngOnInit() {
    this.adicionar();
    this.carregar();
  }

}
