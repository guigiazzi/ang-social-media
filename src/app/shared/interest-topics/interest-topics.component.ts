import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SessionService } from '../sessionService/session.service';
import { interestTopic } from 'src/app/interfaces/interest-topic';

@Component({
  selector: 'app-interest-topics',
  templateUrl: './interest-topics.component.html',
  styleUrls: ['./interest-topics.component.css']
})

export class InterestTopicsComponent implements OnInit {
  public fimCad = false;
  public topics: UserTopics[];
  public showedTopic: any[];
  public userTopic = new Array<UserTopics>();
  public savedTopics: UserTopics[];
  @Input() professionalId: string;
  constructor(private appService: AppService, private router: Router, private snackbar: MatSnackBar,  private sessionService: SessionService) { }

  ngOnInit() {
    this.appService.getInterestTopics()
    .subscribe(
      res => {
        this.showedTopic = res;
      },
      err => {
        console.log(err);
        this.snackbar.open('Houve um erro ao carregar os topicos!', 'Dismiss' , {
          duration: 2000,
          panelClass: ['error-snackbar'] }
        );
      }
    )

    if(this.sessionService.getUserLogged()) {
      this.appService.getProfessionalTopics(this.professionalId)
      .subscribe(res => {
        this.savedTopics = res;
      })
    }
  }

  addTopic(topic: interestTopic) {
    let ut:UserTopics = {professionalID: this.professionalId, interestTopicID: topic.interestTopicID, description: topic.description}
    this.userTopic.push(ut);
    this.showedTopic.splice(this.showedTopic.indexOf(topic),1);
    if (this.userTopic.length === 5) {
      this.appService.updateProfessionalInterestTopics(this.userTopic as UserTopics[])
      .subscribe(
        res => {
          this.snackbar.open('Cadastro Finalizado com sucesso!', '' , {
            duration: 2000,
            panelClass: ['success-snackbar']
          });
          this.savedTopics = [];
          this.savedTopics = this.userTopic;
          this.fimCad = true;
        }, err => {
          console.log(err)
          this.snackbar.open('Ocorreu um erro ao cadastrar os topicos', 'ok' , {
            duration: 2000,
            panelClass: ['error-snackbar']
          });
          this.fimCad = false;
        }
      )
    }
  }

}

export interface UserTopics {
  professionalID: string;
  interestTopicID: string;
  description: string;
}