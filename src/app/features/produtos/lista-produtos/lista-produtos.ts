import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { inject } from '@angular/core';
import { produtoService } from '../../../core/services/produtos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { ItemCarrinho } from '../../../core/models/item-carrinho';
import { ProdutoLoja } from '../../../core/models/produto-loja';
import { RouterLink } from "@angular/router";
import { Favoritos } from '../favoritos/favoritos';

@Component({
  selector: 'app-lista-produtos',
  imports: [PrecoFormatadoPipe, UpperCasePipe, MatButtonModule, Produto, MatCardModule, RouterLink],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  produtos = signal <ProdutoLoja[]>([]);

  carregando = signal(true);

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

  valorTotalFormatado = computed(() => this.valorTotal().toFixed(2));
  
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
    this.carregarProdutos();
     effect(() => {if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
     }
     });
    }
    produtoSelecionado = signal<string | null> (null);

    carrinho = signal <{nome: string; preco: number }[]>([]);

    erro = signal <string | null > (null);

    adicionarAoCarrinho (produto:ItemCarrinho){

      this.carrinhoFacade.adicionarProdutoCarrinho(produto);
    }
    
    
    //? ============ INJECT ============
    private produtoService = inject (produtoService);
    public carrinhoFacade = inject (CarrinhoFacade);


    quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
    totalCarrinho = this.carrinhoFacade.totalCarrinho;
  }
//criamos uma totalprodutos para calcular o total de produtos
//adicionado valortotal para somar todos os valores da lista que forem adicionados
