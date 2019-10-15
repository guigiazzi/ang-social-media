import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Professional } from '../../interfaces/professional';
import { MatSnackBar } from '@angular/material';
import { JobRole } from 'src/app/interfaces/job-role';
import { PaymentInfo } from 'src/app/interfaces/payment-info';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

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
  public professionalForm: FormGroup;
  public submitted = false;
  public jobRoleForm: FormGroup;
  public paymentInfoForm: FormGroup;
  public minDate = new Date().getFullYear() + '-' +((new Date().getMonth() < 10) ? '0' + new Date().getMonth() : new Date().getMonth());
  public maxDate = new Date().getFullYear() + '-' +((new Date().getMonth() < 10) ? '0' + new Date().getMonth() : new Date().getMonth()) + '-' + ((new Date().getDate() < 10) ? '0' + new Date().getDate() : new Date().getDate());

  constructor(private snackbar: MatSnackBar, private formBuilder: FormBuilder) {
    this.professionalForm = this.createProfessionalFormGroup();
    this.jobRoleForm = this.createJobRoleFormGroup();
    this.paymentInfoForm = this.createPaymentInfoFormGroup();
   }
  
  @Input() professional: Professional = <Professional>{};
  @Input() jobRole: JobRole = <JobRole>{};
  @Input() paymentInfo: PaymentInfo = <PaymentInfo>{};
  @Output() outProfessional: EventEmitter<Professional> = new EventEmitter();

  onSubmit() {
    this.submitted = true;
    if(this.professionalForm.invalid || this.jobRoleForm.invalid){
      return;
    }
    if(this.contaPremium && this.paymentInfoForm.invalid){
      return;
    }

    this.professional = this.professionalForm.value;
    this.professional.jobRole = this.jobRoleForm.value;
    this.professional.profileImage = this.urlImage;

    if(this.contaPremium){
      this.professional.profileType = "PREMIUM";
      this.professional.paymentInfo = this.paymentInfoForm.value;
    } else {
      this.professional.profileType = 'STANDARD';
    }
    console.log(this.professional)
    this.outProfessional.emit(this.professional);
  }

  habilitaPagamento() {
    this.contaPremium = !this.contaPremium;
  }

  displayCard(cardNum) {
    if(cardNum.length >= 4){
      if (cardNum[0] === '5') {
        this.cardMaster = true;
      }
      if (cardNum[0] == '4') {
        this.cardVisa = true;
      }
    }
    if(cardNum[0] != '5') {
      this.cardMaster = false;
    }
    if(cardNum[0] != '4') {
      this.cardVisa = false;
    }
  }

  selecionarFoto(event:any) {
    if (event.target.files && event.target.files[0]) {
      let uploadedImage = event.target.files[0];

      if (uploadedImage.type && uploadedImage.type.substring(0, 5) === 'image') {
        if (uploadedImage.size > 0 && uploadedImage.size < 2097152) {
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);

          reader.onload = (event) => {
            this.urlImage = reader.result;
            console.log(this.urlImage);
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

  createProfessionalFormGroup() {
    return new FormGroup({
       'name': new FormControl(this.professional.name, [Validators.required]),
       'userLogin': new FormControl(this.professional.userLogin, [Validators.required]),
       'email': new FormControl(this.professional.email, [Validators.required, Validators.email]),
       'password': new FormControl(this.professional.password, [Validators.required, Validators.minLength(3)]),
        'city': new FormControl(this.professional.email, [Validators.required]),
        'state': new FormControl(this.professional.state, [Validators.required]),
        'birthDate': new FormControl(this.professional.birthDate, [Validators.required, RxwebValidators.maxDate({value: new Date()})]),
        'careerDate': new FormControl(this.professional.careerDate, [Validators.required, RxwebValidators.maxDate({value: new Date()})]),
        'instructionLevel': new FormControl(this.professional.instructionLevel, [Validators.required])        
    })
  }

  createJobRoleFormGroup(){
    return new FormGroup({
      'companyName': new FormControl(this.jobRole.companyName, [Validators.required]),
      'salary': new FormControl(this.jobRole.salary, [Validators.required]),
      'jobTitle': new FormControl(this.jobRole.jobTitle, [Validators.required]),
    })
  }

  createPaymentInfoFormGroup(){
    return new FormGroup({
      'cardName': new FormControl(this.paymentInfo.cardName, [Validators.required]),
      'cardNumber': new FormControl(this.paymentInfo.cardNumber, [Validators.required, Validators.minLength(16)]),
      'cardValidationDate': new FormControl(this.paymentInfo.cardValidationDate, [Validators.required]),
      'cardSecurityCode': new FormControl(this.paymentInfo.cardSecurityCode, [Validators.required, Validators.minLength(3)])
    })
  }

  get name() {
    return this.professionalForm.get('name');
  }
  get userLogin() {
    return this.professionalForm.get('userLogin');
  }
  get email() {
    return this.professionalForm.get('email');
  }
  get password() {
    return this.professionalForm.get('password');
  }
  get city() {
    return this.professionalForm.get('city');
  }
  get state() {
    return this.professionalForm.get('state');
  }
  get birthDate() {
    return this.professionalForm.get('birthDate');
  }
  get careerDate() {
    return this.professionalForm.get('careerDate');
  }
  get instructionLevel() {
    return this.professionalForm.get('instructionLevel');
  }

  get companyName() {
    return this.jobRoleForm.get('companyName');
  }
  get salary() {
    return this.jobRoleForm.get('salary');
  }
  get jobTitle() {
    return this.jobRoleForm.get('jobTitle');
  }

  get cardName() {
    return this.paymentInfoForm.get('cardName');
  }
  get cardNumber() {
    return this.paymentInfoForm.get('cardNumber');
  }
  get cardValidationDate() {
    return this.paymentInfoForm.get('cardValidationDate');
  }
  get cardSecurityCode() {
    return this.paymentInfoForm.get('cardSecurityCode');
  }
}

export enum InstructionLevel {
  NENHUM = "Nenhum nível de instrução",
  BACHAREL = "Bacharelado",
  MESTRE = "Mestrado",
  DOUTOR = "Doutorado",
}

