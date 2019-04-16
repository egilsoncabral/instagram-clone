import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  
  public email: string;
  public publicacoes: any
  public comentarios:any
  public nomeUsuario:any

  constructor(private bd : Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) =>{
      this.email = user.email
      this.atualizarTimeLine()
    })
  }

  public atualizarTimeLine() : void {
    this.bd.consultaPublicacoes(this.email)
    .then((publicacoes:any) =>{
      this.publicacoes = publicacoes
      console.log(this.publicacoes)
    })
  }

  public adicionaComentario(publicacao:any , event:any){
    if (event.keyCode === 13) {
      if (publicacao.comentarios === undefined) {
        publicacao.comentarios = []
      }
      publicacao.comentarios.push((<HTMLInputElement>event.target).value) 
      publicacao.email = this.email
      this.nomeUsuario = publicacao.nomeUsuario
      this.bd.atualizaPublicacao(publicacao)
      .then(() => {
        this.atualizarTimeLine()
      })
    }
  }

}
