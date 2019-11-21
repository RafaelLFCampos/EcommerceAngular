import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-detalhes',
  templateUrl: './admin-detalhes.component.html',
  styleUrls: ['./admin-detalhes.component.css']
})
export class AdminDetalhesComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  product;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // this.product = products[+params.get('productId')];
    });
  }

}
