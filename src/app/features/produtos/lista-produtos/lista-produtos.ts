import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    {
      nome: 'Teclado Gamer', 
    preco:59.99
  },
    {
      nome: 'Mouse Gamer', 
    preco:59.99
  },
    {
      nome: 'Monitor Gamer', 
    preco:369.99
  },
    {
      nome: 'Desktop Gamer', 
    preco:1200.99
  },
    {
      nome: 'Headset Gamer', 
    preco: 466.99
  }
  ]);
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  adicionarProduto(){
    this.produtos.update(listaAtual =>[
      ...listaAtual, {nome: 'Sony Playstation 5', preco:20000}
    ]);
  }
  totalProdutos = computed(() => this.produtos().length);
  
  valorTotal  = computed(() => {return this.produtos().reduce((total, item) => total + item.preco,0)});
  
  substituirprodutos (){
    this.produtos.set([
      {nome: 'Arroz Fazenda', preco: 200},
    ]);
  }
  constructor(){
    effect(() => {console.log('Lista de Produtos Alterado', this.produtos());
     });
     effect(() => {console.log('Valor total atualizado:', this.valorTotal());
     });
     effect(() => {if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
     }
     });
    }
    produtoSelecionado = signal<string | null> (null);

}
//criamos uma totalprodutos para calcular o total de produtos
//adicionado valortotal para somar todos os valores da lista que forem adicionados
