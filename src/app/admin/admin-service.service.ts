import { Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  // criar interface dessas propriedades
  id?: string;
  nome = '';
  preco = '';
  descricao = '';
  cor = '';
  tamanho = '';
  escrita = '';
  caminhoImagem = '';
  // ------------------------
  produtos = [];

  constructor(private firebase: FirebaseService) { }

  async adicionar() {
    try {
      await this.firebase.db().collection('produto').add({
          id: this.id,
          nome: this.nome,
          preco: this.preco,
          descricao: this.descricao,
          cor: this.cor,
          tamanho: this.tamanho,
          escrita: this.escrita,
          caminhoImagem : this.caminhoImagem,
      });
      alert('Inserção realizada');
    } catch (error) {
      console.log(error);
    }
  }

  carregar() {
    this.firebase.db().collection('produto').onSnapshot(results => {
      results.docs.forEach(doc => {
        this.produtos.push({ id: doc.id, ...doc.data() });
      });
    });
    console.log(this.produtos);
    return this.produtos;
  }

  async atualizar(produto, valor) {
    await this.firebase.db().collection('produtos').doc(produto.id).update({
      nome: valor
    });
  }

  async deletar(produto) {
    await this.firebase.db().collection('produtos').doc(produto.id).delete();
  }
}
