import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritosFacade {
  // Estado centralizado dos favoritos, compartilhado entre os componentes.
  private favoritos = signal<string[]>([]);

  listaFavoritos = this.favoritos.asReadonly();

  isFavorito(nome: string): boolean {
    return this.favoritos().includes(nome);
  }

  alternarFavorito(nome: string): void {
    if (this.isFavorito(nome)) {
      this.removerFavorito(nome);
    } else {
      this.adicionarFavorito(nome);
    }
  }

  adicionarFavorito(nome: string): void {
    const produto = nome.trim();
    if (!produto || this.isFavorito(produto)) return;

    this.favoritos.update((lista) => [...lista, produto]);
  }

  removerFavorito(nome: string): void {
    this.favoritos.update((lista) => lista.filter((item) => item !== nome));
  }
}