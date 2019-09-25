import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Professional } from '../../interfaces/professional';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { JobRole } from 'src/app/interfaces/job-role';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent {
  states: any = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'TO'];
  keys = Object.keys;
  public enums = InstructionLevel;
  public contaPremium = false;
  public professionalProfile: Professional[] = [];
  public cardMaster = false;
  public cardVisa = false;
  public urlImage: any;

  constructor(private snackbar: MatSnackBar) { }

  @Input() professional: Professional = <Professional>{};
  @Input() jobRole: JobRole = <JobRole>{};
  @Output() outProfessional: EventEmitter<Professional> = new EventEmitter();

  onSubmit() {
    this.professional.jobRole = this.jobRole;
    console.log(this.professional);
    this.outProfessional.emit(this.professional);
  }

  habilitaPagamento() {
    this.contaPremium = !this.contaPremium;
  }

  displayCard(cardNum) {
    if (cardNum[0] === '5') {
      this.cardMaster = true;
      this.cardVisa = false;
    } else if (cardNum[0] == '4') {
      this.cardMaster = false;
      this.cardVisa = true;
    } else {
      this.cardMaster = false;
      this.cardVisa = false;
    }
  }

  selecionarFoto(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => { 
        if(reader.result.slice(5,10) === 'image'){
          this.urlImage = reader.result;
        } else {
          this.snackbar.open('Formato do arquivo não aceito!', 'Dismiss', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      }

    }
  }
  
}

export enum InstructionLevel {
  NENHUM = "Nenhum nível de instrução",
  BACHAREL = "Bacharelado",
  MESTRE = "Mestrado",
  DOUTOR = "Doutorado",
}

