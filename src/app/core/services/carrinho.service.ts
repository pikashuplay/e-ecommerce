import { Injectable, signal } from "@angular/core";
import { inject, effect } from "@angular/core";
import { computed } from "@angular/core";
import { ItemCarrinho } from "../models/item-carrinho";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";


@Injectable({
    providedIn: 'root'
})

export class CarrinhoService {


    private platformId = inject(PLATFORM_ID);

    //!chave de recuperação localstorage

    private readonly chaveStorage = 'carrinho-storage';

    //! estado global
    private carrinho = signal<ItemCarrinho[]>(this.carregarcarrinhoSalvo());

    //?seletores
    itens = computed(()=> this.carrinho());
    quantidadeItens = computed(() => this.carrinho().length); //!Quantidade de itens 
    totalItens = computed(() =>
        this.carrinho().reduce((total, item) => total + item.preco,0) 
    );

    carrinhoVazio = computed(() => this.carrinho().length === 0);

    //! ======= PERSISTENCIA CARRINHO ========

    constructor(){
        effect(() => {
            this.SalvarCarrinho(this.carrinho());
        });
    }

    private estaNoNavegador (): boolean{
        return isPlatformBrowser(this.platformId);
    }

    private carregarcarrinhoSalvo(): ItemCarrinho [] {
        if(!this.estaNoNavegador()){
            return[];
        }

        const dadosSalvos = localStorage.getItem(this.chaveStorage);

        if(!dadosSalvos){
            return [];
        }

        try {
            return JSON.parse(dadosSalvos) as ItemCarrinho [];
        }catch{
            return[];
        }
    }

    private SalvarCarrinho (item: ItemCarrinho []){
        if(!this.estaNoNavegador()){
            return;
        }
        localStorage.setItem(this.chaveStorage, JSON.stringify(item));

    }

    // TODO: Ações
    adicionar(produto:ItemCarrinho){
        this.carrinho.update(lista =>[
            ...lista, produto
        ]);

    }
    limpar() {
        this.carrinho.set([]);
    }

    removerItem(rmvItem: number){
        this.carrinho.update((listaAtual) => 
        listaAtual.filter((_, index) => index !== rmvItem));
    }
}
