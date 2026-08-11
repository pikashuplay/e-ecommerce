import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [ MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'mead in china';

  private carrinhoService = inject(CarrinhoService);
  quantidade = this.carrinhoService.quantidadeItens;
  private authService = inject(AuthService)
  usuarioLogado = this.authService.usuarioLogado;
  usuarioAtual = this.authService.usuarioAtual;

  sair(){
    this.authService.logout();
  }
}
