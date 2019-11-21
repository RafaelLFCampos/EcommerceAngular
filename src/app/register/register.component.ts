import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../services/usuario.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userId = '';
  public cpf = '';
  public endereco = '';
  public telefone = '';
  public checkingUser = false;

  constructor(public usuario: UsuarioService, public router: Router, private firebase: FirebaseService) {
    this.usuario.getUser().subscribe(user => {
      (user.cadTerminado) ? this.router.navigateByUrl('') : this.checkingUser = false;
    });
    this.usuario.getUser().subscribe((user) => this.userId = user.id);
  }

  async adicionarDados() {
    try {
      await this.firebase.db().collection('dadosUsuario').add({
        user_id: this.userId,
        cpf: this.cpf,
        endereco: this.endereco,
        telefone: this.telefone
      });
      this.router.navigateByUrl('');
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
  }

}
