import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public email = '';
  public senha = '';
  public checkingUser = true;
  public showLoading = false;

  constructor(public usuario: UsuarioService, public router: Router) {
    this.usuario.getUser().subscribe(user => {
      (user.isOnline) ? this.router.navigateByUrl('') : this.checkingUser = false;
    });
   }

  async login() {
    try {
      this.showLoading = true;
      await this.usuario.login(this.email, this.senha);
      this.showLoading = false;
      this.router.navigateByUrl('/cart');
    } catch (erro) {
      this.showLoading = false;
      console.log(erro);
    }
  }

  async registrar() {
    try {
      await this.usuario.registrar(this.email, this.senha);
      this.router.navigateByUrl('/register');
    } catch (erro) {
      console.log(erro);
    }
  }
  ngOnInit() {
  }

}
