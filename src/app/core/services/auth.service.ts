import { Inject, Injectable, signal } from "@angular/core";
import { Signal } from "@angular/core";
import { computed } from "@angular/core";


type PerfilUsuario = 'admin' | 'usuario';

type Usuario = {
    email: string;
    perfil: PerfilUsuario;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {



    private usuario = signal<Usuario | null>(null);
    private tokenJwt = signal<string | null>(null);

    usuarioAtual = computed(() => this.usuario());
    token = computed(() => this.tokenJwt());
    usuarioLogado = computed(() => this.usuario() !== null);
    Admin = computed(() => this.usuario()?.perfil === 'admin');

    login (email: string, senha: string): boolean{
        if(!email || !senha){
            return false;
        }

        const perfil: PerfilUsuario = email === 'admin@email.com' ? 'admin' : 'usuario';

        const tokenSimulado = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiJhbHVub0B0ZXN0ZS5jb20iLCJwZXJmaWwiOiJ1c3VhcmlvIn0.' 
    +
    'assinatura-simulada';

    this.usuario.set({
        email,
        perfil,
    });
    
    this.tokenJwt.set(tokenSimulado);
    return true;

}
logout (){
    this.usuario.set(null);
    this.tokenJwt.set(null);
}
obterToken(): string | null{
    return this.tokenJwt();
}



}