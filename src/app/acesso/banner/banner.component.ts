import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
       })),
      state('visivel', style({
        opacity: 1
       })),
       transition('escondido => visivel', animate('2s ease-in')),
       transition('visivel => escondido', animate('2s ease-out'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido'

  public imagens : Imagem[] = [
    {estado:'visivel', url:'/assets/banner-acesso/img_1.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_2.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_3.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_4.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_5.png'}
  ]

  constructor() { }

  ngOnInit() {
    setInterval(() => this.logicaRotacao(), 4000);
  }

  public logicaRotacao() : void {
    let bckIndex:number
    for (let index:number = 0; index <= this.imagens.length - 1; index++) {
      if (this.imagens[index].estado === 'visivel') {
        this.imagens[index].estado = 'escondido'
        bckIndex = index === this.imagens.length - 1 ? 0 : index + 1
        break
      }
    }
    this.imagens[bckIndex].estado = 'visivel'

  }

}
