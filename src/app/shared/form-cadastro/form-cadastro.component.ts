import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Professional } from '../../interfaces/professional';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent {
  states: any = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'TO'];

  public contaPremium = false;
  
  constructor(private appService: AppService, private router: Router) { }
  @Input() professional: Professional = <Professional>{};
  @Output() outPutProfessional: EventEmitter<Professional> = new EventEmitter();

  onSubmit() {
    console.log(this.professional);
    this.appService.cadastrarProfessional(this.professional)
      .subscribe(
        () => { this.router.navigateByUrl('/'); });
  }

  habilitaPagamento() {
    this.contaPremium = !this.contaPremium;
  }
}
