import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Usuario } from '../usuario.model';
import { Auth } from 'src/app/auth.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output()
  public exibirPainel : EventEmitter<string> = new EventEmitter()

  public formulario : FormGroup = new FormGroup({
    'email' : new FormControl(),
    'nome_completo' : new FormControl(),
    'nome_usuario' : new FormControl(),
    'senha' : new FormControl()
  })

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

  public exibirPainelLogin() : void{
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario() : void{
    let usuario : Usuario = new Usuario (
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    )
    this.auth.cadastrarUsuario(usuario).then(() => {
      this.exibirPainelLogin()
    })
  }

}
