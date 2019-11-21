import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items;
  total = 0.0;

  constructor( private cartService: CartService,
               public router: Router) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    // tslint:disable-next-line: triple-equals
    if (this.items == '') {
      alert('Carrinho vazio!');
      this.router.navigateByUrl('');
    }

    this.items.forEach(element => {
      this.total = this.total + parseFloat(element.price);
    });
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
