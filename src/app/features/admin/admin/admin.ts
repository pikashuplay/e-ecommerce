import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { computed } from '@angular/core';
import { AuthFacade } from '../../../core/facades/auth.facade';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private authFacade = inject(AuthFacade);
  private router = inject(Router);

  totalProdutosCadastrados = signal(20);
  pedidosPendentes = signal(3);
  usuariosCadastrados = signal (8);

  usuarioAtual = this.authFacade.usuarioAtual;

  mensagemPerfil = computed(() => {
    const usuario = this.usuarioAtual();
    if (!usuario){
      return('Nenhum Usuário Autenticado!')
    }
    return `Usuário Autenticado como: ${usuario.perfil}`;
  });

  sair(){
    this.authFacade.usuarioLogado();
    this.router.navigateByUrl('/login');
  }
}