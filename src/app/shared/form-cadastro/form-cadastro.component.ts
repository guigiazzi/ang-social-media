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
  constructor() { }

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
}
export enum InstructionLevel {
  NONE = "Nenhum nível de instrução",
  BACHELOR = "Bacharelado",
  MASTER = "Mestrado",
  DOCTOR = "Doutorado",
}

