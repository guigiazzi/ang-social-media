import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Professional } from '../../interfaces/professional';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent {
  states: any = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'TO'];

  public isMyProfile = true;
  public showSpinner = false;
  public contaPremium = false;
  public professionalProfile: Professional[] = [];
  constructor(private appService: AppService, private router: Router, private snackbar: MatSnackBar) { }
  @Input() professional: Professional = <Professional>{};
  @Output() outPutProfessional: EventEmitter<Professional> = new EventEmitter();

  onSubmit() {
    console.log(this.professional);
    this.showSpinner = true;
    this.appService.cadastrarProfessional(this.professional)
      .subscribe(
        () => {
          this.snackbar.open('Publicação feita com sucesso!', 'Ok!', {
            duration: 4000,
            panelClass: ['success-snackbar']
          });
          this.showSpinner = false;
        },
        () => {
          this.snackbar.open('Não foi possivel cadastrar o usuario!', 'Ok!', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
          this.showSpinner = false;
        });

  }

  habilitaPagamento() {
    this.contaPremium = !this.contaPremium;
  }
}
