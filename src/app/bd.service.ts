import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd{

    constructor(private progresso : Progresso){}

    public publicar(publicacao:any):void{


        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`).push({
            titulo: publicacao.titulo
        }).then((resposta) =>{
            let nomeImage = resposta.key

            firebase.storage().ref()
            .child(`imagens/${nomeImage}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED, 
                (snapshot : any) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        this.progresso.status = 'andamento'
                        this.progresso.estado = snapshot
                        this.progresso.avanco = progress
                        break;
                    }
    
                }, (error: any) =>{
                    this.progresso.status = 'erro'
                }, () =>{
                    this.progresso.status = 'concluido'
                })
        })
        
    }

    public consultaPublicacoes(email:string) : Promise<any> {
        return new Promise((resolve, reject) =>{
            firebase.database().ref(`publicacoes/${btoa(email)}`)
            .orderByKey()
            .once('value').then((snapshot:any) => {
                let  publicacoes : Array<any> = [];
                snapshot.forEach((childSnapshot:any) => {
                    let publicacao = childSnapshot.val()
                    publicacao.key = childSnapshot.key
                    publicacoes.push(publicacao)
                });
                return publicacoes.reverse()
            }).then((publicacoes:any) =>{
                publicacoes.forEach((publicacao:any) =>{
                    firebase.storage().ref().child(`imagens/${publicacao.key}`)
                    .getDownloadURL().then((url:string) =>{
                        publicacao.urlImagem = url
                        firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                        .once('value').then((snapshot:any) =>{
                            publicacao.nomeUsuario = snapshot.val().nome_usuario
                        })
                    })
                })
                resolve(publicacoes)        
            })
        })
    }
}