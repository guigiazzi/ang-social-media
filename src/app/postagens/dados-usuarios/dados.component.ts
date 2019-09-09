import { Component, OnInit, Input } from '@angular/core';
import { AppService } from './../../app.service';
import { Professional } from './../../interfaces/professional';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})

export class DadosComponent implements OnInit {
  @Input() isPersonProfile;
  public usuario: Professional;
  public topics = [];

  constructor(private appservice: AppService) { }

  ngOnInit() {
    this.appservice.retornarDadosUsuario({professionalID: '5d719baf5c15490004e1f21e'})
    .subscribe(user => {
      user.birthDate = user.birthDate.substr(0,10);
      user.birthDate = new Date(user.birthDate.replace(/-/g, '\/'));
      user.birthDate =  ('0' + user.birthDate.getDate()).substr(-2) + '/'
      + ('0' + (user.birthDate.getMonth() + 1)).substr(-2) + '/' + user.birthDate.getFullYear();

      user.careerDate = user.careerDate.substr(0,10);
      user.careerDate = new Date(user.careerDate.replace(/-/g, '\/'));
      user.careerDate = ('0' + user.careerDate.getDate()).substr(-2) + '/'
      + ('/' + (user.careerDate.getMonth() + 1)).substr(-2) + '/' + user.careerDate.getFullYear();
      this.usuario = user;
    });
    this.topics = ['1','2','3','4'];
   }
}
