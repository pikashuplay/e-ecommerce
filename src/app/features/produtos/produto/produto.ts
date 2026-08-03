import { Component,Input,Output, EventEmitter } from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButton],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {

  //entrada de dados de lista-produtos.ts
  @Input() nome: string = '';
  @Input() preco: number = 0;
  
  //saida de dados de produtos selecionados para lista-produtos
  @Output() produtoSelecionado = new EventEmitter<string>();

  selecionarProduto() {
    this.produtoSelecionado.emit(this.nome);
  }
  @Output() produtoAdicionado = new EventEmitter<{
    nome: string;
    preco: number;
  }>();

  adicionarAoCarrinho() {
    this.produtoAdicionado.emit(({nome: this.nome, preco: this.preco}))
  }
}
