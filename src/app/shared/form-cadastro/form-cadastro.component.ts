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
    } else {
      this.cardMaster = false;
    }
    if (cardNum[0] == '4') {
      this.cardVisa = true;
    } else {
      this.cardVisa = false;
    }
  }

  selecionarFoto(event:any) {
    if (event.target.files && event.target.files[0]) {
      uploadedImage = event.target.files[0];
      
      if (uploadedImage.type && uploadedImage.type.substring(0, 5) === 'image') {
        if (uploadedImage.size > 0 && uploadedImage.size < 2097152) {
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);

          reader.onload = (event) => { 
            this.urlImage = reader.result;
          }
        } else {
          this.snackbar.open('Tamanho da imagem muito grande! (maior que 2Mb)', 'Dismiss', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      } else {
        this.snackbar.open('Formato da imagem inválido!', 'Dismiss', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
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

