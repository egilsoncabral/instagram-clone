import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Auth{

    public tokenId : string

    constructor(private router :Router){}

    public cadastrarUsuario(usuario: Usuario) : Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha).then(
            (resposta:any) => {
                delete usuario.senha
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`).set(usuario)
            }
        )
        .catch((error:any) =>{
            console.log(error)
        })
    }

    public autenticar(email:string, senha:string) : void {
        firebase.auth().signInWithEmailAndPassword(email, senha).then((resposta: any) => {
            firebase.auth().currentUser.getIdToken().then((idToken:string) => {
                this.tokenId = idToken
                localStorage.setItem('idToken', idToken);
                this.router.navigate(['home']);
            })
        }).catch((error : Error) => {

        })
    }

    public autenticado() : boolean{
        if (this.tokenId === undefined && localStorage.getItem('idToken') != null) {
            this.tokenId = localStorage.getItem('idToken')
        }
        if (this.tokenId === undefined) {
            this.router.navigate([''])
        }
        return this.tokenId !== undefined
    }

    public sair() : void {
        firebase.auth().signOut().then(() =>{
            localStorage.removeItem('idToken')
            this.tokenId = undefined
            this.router.navigate([''])
        })
        
    }
}