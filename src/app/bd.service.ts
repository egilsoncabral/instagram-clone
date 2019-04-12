import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd{

    constructor(private progresso : Progresso){}

    public publicar(publicacao:any):void{

        let nomeImage = Date.now()

        firebase.storage().ref()
        .child(`imagens/${nomeImage}`)
        .put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED, 
            (snapshot : any) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
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
        
        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`).push({
        //     titulo: publicacao.titulo
        // })
    }
}