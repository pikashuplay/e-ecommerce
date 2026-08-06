import { Injectable, signal } from "@angular/core";
import { Signal } from "@angular/core";
import { computed } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CarrinhoService {
    //! estado global
    private carrinho = signal<{ nome: string; preco: number}[]>([]);

    //?seletores
    itens = computed(()=> this.carrinho());
    quantidadeItens = computed(() => this.carrinho().length); //!Quantidade de itens 
    totalItens = computed(() =>
        this.carrinho().reduce((total, item) => total + item.preco,0) 
    );
    // TODO: Ações
    adicionar(produto: {nome: string; preco: number}){
        this.carrinho.update(lista =>[
            ...lista, produto
        ]);

    }
    limpar() {
        this.carrinho.set([]);
    }
}
