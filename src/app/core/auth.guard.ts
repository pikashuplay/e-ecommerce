import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

export const authGuard: CanActivateFn = () => {
    const authservice = inject (AuthService);
    const router = inject(Router);

    if(authservice.estaLogado()){
        return true;
    }
    return router.createUrlTree(['/login']);
}