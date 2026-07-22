import { signal } from "@angular/core";
//criado um novo arquivo e fixemos um import e um export
//!define valor inicial do Signal usuarioLogado com (false)
export const usuarioLogado = signal (false);
//!define Signal usuarioLogado como (true), Permite acesso as rotas
export function login(){
    usuarioLogado.set(true);
}
//!define Signal usuarioLogado com (false), bloqueio acesso imediatamente
export function logout(){
    usuarioLogado.set(false);
}