import { HttpInterceptorFn } from "@angular/common/http";
import { error } from "console";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { inject, Inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";



export const httpInterceptor: HttpInterceptorFn = (req, next) => {

    
    const authService = inject(AuthService);
    const router = inject(Router);

    //!NOVO METODO TOKEN
    const token = authService.obterToken();
    //! requisição de log 
    console.log('Requisição: ', req.url); 
    //!token
    
    const novaReq = token ?
    
    req.clone({
        setHeaders:{
            Authorization: 'bearer ${token}'
        },
    }):req;

    //! NOVA REQUISIÇÃO + RESPOSTA DE LOG
    
    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('RESPONDE: ', event),
            error: (error) => console.log('ERRO: ', error)
        }),
        catchError((error) => {
            
            console.error('ERRO GLOBAL: ', error);

            if (error.status === 401){
                console.warn('Não Autorizado!');
                authService.logout();
                router.navigateByUrl('/login');
            }
            if (error.status === 403) {
                console.warn('Acesso negado, perfil sem permissão!');
                router.navigateByUrl('/produtos')
            }
            
            if (error.status === 500){
                console.warn('Erro Interno no Servidor!');
            }
            return throwError(() => error);
        }),
    );
};