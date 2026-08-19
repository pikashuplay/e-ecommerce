import { effect, Injectable, signal, PLATFORM_ID, inject } from "@angular/core";
import { computed } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";


type PerfilUsuario = 'admin' | 'usuario';

type Usuario = {
    email: string;
    perfil: PerfilUsuario;
};

@Injectable({
    providedIn: 'root'
})

export class AuthService {



    private usuario = signal<Usuario | null>(this.carregarUsuarioSalvo());
    private tokenJwt = signal<string | null>(this.carregarTokenSalvo());

    usuarioLogado = computed(() => this.usuario() !== null && this.tokenJwt() !== null);
    usuarioAtual = computed(() => this.usuario());
    estaLogado = computed (() => this.usuario()!== null);
    token = computed(() => this.tokenJwt());
    Admin = computed(() => this.usuario()?.perfil === 'admin');

    //! ========= PERSISTENCIA AUTH ======

    private platformId = inject(PLATFORM_ID);
    private readonly chaveUsuario = 'usuario-storage'
    private readonly chaveToken = 'token-storage'



    private LimparAuthSalvo(){}


    login (email: string, senha: string): boolean{
        if(!email || !senha){
            return false;
        }

        const perfil: PerfilUsuario = email === 'admin@email.com' ? 'admin' : 'usuario';

        const usuarioLogado: Usuario = {
            email,
            perfil,
        };

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
    this.usuario.set(usuarioLogado);

    this.salvarAutenticacao(usuarioLogado, tokenSimulado);
    //!depois eu volto

    return true;

}
logout (){
    this.usuario.set(null);
    this.tokenJwt.set(null);

    this.limparAutenticacaoSalva();
}
obterToken(): string | null{
    return this.tokenJwt();
}
obterPerfil():PerfilUsuario  | null {
    return this.usuario()?.perfil ?? null;
}

private estaNoNavegador(): boolean{
    return isPlatformBrowser(this.platformId);
}

private carregarUsuarioSalvo(): Usuario | null {
    if(!this.estaNoNavegador()){
        return null;
    }
    const dadosSalvos = localStorage.getItem(this.chaveUsuario);
    if(!dadosSalvos){
        return null;
    } try {
        return JSON.parse(dadosSalvos) as Usuario;
    } catch{
        return null;
    }
}
    private carregarTokenSalvo(): string | null {
        if(!this.estaNoNavegador()){
            return null;
        }
        return localStorage.getItem(this.chaveToken);
    }

    private salvarAutenticacao (usuario: Usuario, token: string){
        if(!this.estaNoNavegador()){
            return;
        }

        localStorage.setItem(this.chaveUsuario, JSON.stringify(usuario));
        localStorage.setItem(this.chaveToken, (token));
    }

    private limparAutenticacaoSalva(){
        if(!this.estaNoNavegador()){
            return;
        }

        localStorage.removeItem(this.chaveUsuario);
        localStorage.removeItem(this.chaveToken);
    }
}