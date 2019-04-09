import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private autenticacao : Auth) { }

  ngOnInit() {
  }

  public sair() : void {
    this.autenticacao.sair()
  }

}
