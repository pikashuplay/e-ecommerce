import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink,Router } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';

@Component({
  selector: 'app-header',
  imports: [ MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'mundo 1 real';

  private carrinhoFacade = inject(CarrinhoFacade);
  private authFacade = inject(AuthFacade);
  private router = inject(Router);

  quantidade = this.carrinhoFacade.quantidadeCarrinho;
  usuarioLogado = this.authFacade.usuarioLogado;
  usuarioAtual = this.authFacade.usuarioAtual;


  sair(){
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
  }
}
