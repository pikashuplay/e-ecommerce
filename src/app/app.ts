import { Component, signal } from '@angular/core';
//!import { RouterOutlet } from '@angular/router'; //Remove RouterOutlet pois não estou usando ele no momento
import { Produto } from './components/produto/produto'; //importa o componente para produto
@Component({
  selector: 'app-root',
  imports: [Produto],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-ecommerce');
}
