import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { ɵInternalFormsSharedModule } from "@angular/forms";


@Component({
  selector: 'app-carrinho',
  imports: [RouterLink, MatButtonModule, PrecoFormatadoPipe, ɵInternalFormsSharedModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  public carrinhoFacade  = inject (CarrinhoFacade);
  private router = inject (Router);
  private authFacade = inject (AuthFacade);

  removerItem(rmvItem: number){
    this.carrinhoFacade.removerItem(rmvItem);
  }


  limparCarrinho(){
    this.carrinhoFacade.limparCarrinho();
  }

  cancelarCompra(){
    this.authFacade.sair();
    this.carrinhoFacade.limparCarrinho();                                                                                          
    this.router.navigateByUrl('/login');
  }
}
