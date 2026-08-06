import { HttpClient } from "@angular/common/http";
import { Inject,Injectable } from "@angular/core";
import { inject } from "@angular/core";

type ProdutoApi = {
    title: string;
    price: number;
};
type Produto = {
    nome: string;
    preco: number;
}
@Injectable({providedIn: 'root'})
export class produtoService {
    private http = inject(HttpClient);

    private Api = 'https://fakestoreapi.com/products'; //!n mexe nisso seu lixo

    buscarProduto() {
        return this.http.get < ProdutoApi []>(this.Api);
    }
    transformarProdutos( dados: ProdutoApi []): Produto[] {
        return dados.map((p) =>({
            nome: p.title,
            preco: p.price,
        }));

    }
}