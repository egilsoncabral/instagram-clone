import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import * as firebase from 'firebase'
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output()
  public atualizarTimeLine :EventEmitter<any> = new EventEmitter()

  public email: string

  public imagem: any

  public progressoPublicacao : string = 'pendente'

  public formulario : FormGroup = new FormGroup({
    'titulo' : new FormControl()
  })

  constructor(private bd : Bd, private progresso: Progresso) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) =>{
      this.email = user.email
    })
  }

  public publicar() : void {
    this.bd.publicar({
      email:this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })


    const acompanhamentoUpload = interval(1000);
    let continua = new Subject()
    continua.next(true)
    acompanhamentoUpload.pipe(
      takeUntil(continua)
    )
    .subscribe(() => {
        this.progressoPublicacao = 'andamento'
        if (this.progresso.avanco === 100) {
          this.progressoPublicacao = 'concluido'
          this.atualizarTimeLine.emit()
          continua.next(false)
        }
      });
  }

  public preparaImagemUpload(event : Event) : void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
