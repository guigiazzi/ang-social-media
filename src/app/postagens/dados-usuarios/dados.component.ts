import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})

export class DadosComponent implements OnInit {
  @Input() isMyProfile = isPersonProfile: boolean;
  //public usuario: User;
  public usuario = {};
  public topics = [];

  constructor() { }

  ngOnInit() {
    this.usuario = {
      name:'Joao Rocco da Silva',
      birthdate: '11/01/2001',
      city: 'Sorocaba',
      state: 'São Paulo',
      company: 'Só os loco',
      salary: 1500.00,
      inicialDate: '17/06/2005',
      instructionlevel: 'Cursando Ensino Superior'
    };

    this.topics = ['1','2','3','4'];
   }
}