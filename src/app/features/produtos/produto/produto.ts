import { Component,Input,Output, EventEmitter } from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardActions, MatCardTitle} from "@angular/material/card";
import { ItemCarrinho } from '../../../core/models/item-carrinho';
@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButton, MatCard, MatCardTitle, MatCardContent, MatCardHeader, MatCardActions],
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
  @Output() produtoAdicionado = new EventEmitter<ItemCarrinho>();

  adicionarAoCarrinho() {
    this.produtoAdicionado.emit(({nome: this.nome, preco: this.preco}))
  }
}
