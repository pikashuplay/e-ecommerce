import { Component, signal } from '@angular/core';
//import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-ecommerce');
  nomeLoja = 'mead in china'; //nome do e-ecommerce
}
