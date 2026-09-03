import { isPlatformBrowser } from "@angular/common";
import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class FavoritoService {

    private platformId = inject(PLATFORM_ID);
    private readonly chaveStorage = 'minha-loja-favoritos';

    favoritos = signal<string[]>(this.carregarFavoritosSalvos());
    itens = computed(() => this.favoritos());
    quantidadeItens = computed(() => this.favoritos().length);
    favoritosVazio = computed(() => this.favoritos().length === 0);

    constructor(){
        effect(() => {
            this.salvarFavoritos(this.favoritos());
        });
    }

   adicionarFavorito(produto: string) {
    this.favoritos.update((listaAtual) => {
    if (listaAtual. includes (produto)) {
    return listaAtual;
    }
    return [... listaAtual, produto];
    });
    }

    removerFavorito(produto: string) {
        this.favoritos.update((listaAtual) =>
            listaAtual.filter((item) => item !== produto)
        );
    }
    limpar(){
        this.favoritos.set([]);
    }

    ehFavoritos(produto: string): boolean {
        return this.favoritos().includes(produto);
    }
    private estaNoNavegador(): boolean{
        return isPlatformBrowser(this.platformId);
    }
    private carregarFavoritosSalvos(): string[] {
        if (!this.estaNoNavegador()) {
            return[]
        }
        const dadosSalvos = localStorage.getItem(this.chaveStorage);
        if (!dadosSalvos) {
            return [];
        }
        try{
            return JSON.parse(dadosSalvos) as string[];
        }catch {
            return [];
        }
    }
    private salvarFavoritos(itens: string[]){
        if (!this.estaNoNavegador()){
            return;
        }
        localStorage.setItem(this.chaveStorage, JSON.stringify(itens));
    }

}