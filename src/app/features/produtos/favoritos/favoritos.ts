import { CarrinhoFacade } from "../../../core/facades/carrinho.facade";
import { Router, RouterLink } from "@angular/router";
import { AuthFacade } from "../../../core/facades/auth.facade";
import { PrecoFormatadoPipe } from "../../../shared/pipes/preco-formatado-pipe";
import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { FavoritoService } from "../../../core/services/favorito.service";

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, MatButtonModule, PrecoFormatadoPipe],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  constructor(
    private favoritoService: FavoritoService){}
    get favoritos(){
      return this.favoritoService.favoritos;
    }
    removerItem(produto:string){
      this.favoritoService.removerFavorito(produto);
    }
  }
