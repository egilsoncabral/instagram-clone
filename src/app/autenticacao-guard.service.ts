import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Injectable } from '@angular/core';
import { Auth } from './auth.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
    path: import("@angular/router").ActivatedRouteSnapshot[];
    route: import("@angular/router").ActivatedRouteSnapshot;
    
    constructor(private autenticacao : Auth){}

    canActivate():boolean{
        return this.autenticacao.autenticado()
    }

}