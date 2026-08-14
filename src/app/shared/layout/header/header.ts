import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink,Router } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [ MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'mundo 1 real';

  private carrinhoService = inject(CarrinhoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  quantidade = this.carrinhoService.quantidadeItens;
  usuarioLogado = this.authService.usuarioLogado;
  usuarioAtual = this.authService.usuarioAtual;


  sair(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
