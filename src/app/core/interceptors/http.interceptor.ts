import { HttpInterceptorFn } from "@angular/common/http";
import { error } from "console";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

    //!TOKEN
    const token = 'fake-jwt-token';
    const novaReq = req.clone({
        setHeaders: {
        Authorization: `Bearer $ {token}`,
        },
    });
    console.log('Interceptando requisição: ', req.url); 
    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('RESPONDE: ', event),
            error: (error) => console.log('ERRO: ', error)
        }),
        catchError((error) => {
            
            console.error('ERRO GLOBAL: ', error);

            if (error.status === 401){
                console.warn('Não Autorizado!');

            }
            if (error.status === 500){
                console.warn('Erro Interno no Servidor!');
            }
            return throwError(() => error);
        }),
    );
};