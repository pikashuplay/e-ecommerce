import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { Router } from '@angular/router';
import { MatAnchor } from "@angular/material/button";


@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatAnchor],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {
  private authFacade = inject(AuthFacade); //! TESTE
  private router = inject(Router)



  sair = this.authFacade.usuarioLogado();
}