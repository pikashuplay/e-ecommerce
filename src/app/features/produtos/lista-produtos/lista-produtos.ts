import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { inject } from '@angular/core';
import { produtoService } from '../produtos.service';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  //!remover a lista de produtos, dados carregados via API Fakestoreapi
  produtos = signal <{ nome: string; preco: number}[]>([]);
  //? criar estado de carregamento, 
  // **true: requisição em andamento, exibir dados no templete
  //! false: esconder indicador e exibir a lista de produtos
  carregando = signal(true);

  //!criar o metodo para requisição dos produtos
  carregarProdutos(){

    this.carregando.set(true);
    this.erro.set(null);

    this.produtoService.buscarProduto().subscribe({
          next: (dados) => {
            const produtos = this.produtoService.transformarProdutos(dados);
            this.produtos.set(produtos);
            this.carregando.set(false);
          },
          error: (erro) => {
            console.error('Erro ao carregar os produtos:, ', erro);
            this.erro.set('Erro ao carregar Produtos. Verifique sua conexão e tente novamente!');
            this.carregando.set(false);
          },
    });
  }

  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  adicionarProduto(){
    this.produtos.update(listaAtual =>[
      ...listaAtual, {nome: 'Processador Intel core i5 14550fs', preco:2500 }
    ]);
  }
  totalProdutos = computed(() => this.produtos().length);
  
  valorTotal  = computed(() => {return this.produtos().reduce((total, item) => total + item.preco,0)});
  
  substituirprodutos (){
    this.produtos.set([
      {nome: 'Teclado', preco: 40},
       {nome: 'Mouse', preco: 10},
        {nome: 'Monitor', preco: 100},
          {nome: 'Desktop', preco: 500},
            {nome: 'Headset', preco: 25},
    ]);
  }
  constructor(){
      //? =============== método http (api) foi modificado (produtoService)
    this.carregarProdutos();
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

    carrinho = signal<{ nome: string; preco: number}[]>([]);
    
    erro = signal <string | null > (null);

    adicionarAoCarrinho (produto: { nome:string; preco: number}){

      this.carrinho.update(listaAtual =>

        [...listaAtual,produto
      ]);}


       //? ============ INJECT ============
      private produtoService = inject (produtoService);


      quantidadeCarrinho = computed(() => this.carrinho().length)
      totalCarrinho = computed(() => {
        return this.carrinho().reduce((total, item) =>
        total + item.preco,0);
      });
    }
//criamos uma totalprodutos para calcular o total de produtos
//adicionado valortotal para somar todos os valores da lista que forem adicionados
