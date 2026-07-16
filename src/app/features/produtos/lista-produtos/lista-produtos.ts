import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
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
}
//criamos uma totalprodutos para calcular o total de produtos
//adicionado valortotal para somar todos os valores da lista que forem adicionados
