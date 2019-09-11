import { Component, OnInit, Input } from '@angular/core';
import { AppService } from './../../app.service';
import { Professional } from './../../interfaces/professional';
import { FormatDateService } from 'src/app/shared/formatDateService/format-date.service';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})

export class DadosComponent implements OnInit {
  @Input() isPersonProfile;
  @Input() user;
  public usuario: Professional;
  public topics = [];

  constructor(private appservice: AppService, private formatDateService: FormatDateService) { }

  ngOnInit() {
    this.retornaDadosUsuarios(this.user);
  }

  retornaDadosUsuarios(user) {
    this.appservice.retornarDadosUsuario(user)
      .subscribe(user => {
        if (user.birthDate) {
          user.birthDate = this.formatDateService.formatDatewithoutHour(user.birthDate);
        }
        if (user.careerDate) {
          user.careerDate = this.formatDateService.formatDatewithoutHour(user.careerDate);
        }
        this.usuario = user;
      });
      this.topics = ['1','2','3','4'];
    }
}
