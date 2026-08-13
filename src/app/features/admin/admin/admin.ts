import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { computed } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private authService = inject(AuthService);
  private router = inject(Router);

  totalProdutosCadastrados = signal(20);
  pedidosPendentes = signal(3);
  usuariosCadastrados = signal (8);

  usuarioAtual = this.authService.usuarioAtual;

  mensagemPerfil = computed(() => {
    const usuario = this.usuarioAtual();
    if (!usuario){
      return('Nenhum Usuário Autenticado!')
    }
    return `Usuário Autenticado como: ${usuario.perfil}`;
  });

  sair(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}