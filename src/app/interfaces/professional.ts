import { JobRole } from './job-role';
import { EmailValidator } from '@angular/forms';
import { InstructionLevel } from '../shared/form-cadastro/form-cadastro.component';
import { PaymentInfo } from './payment-info';

export interface Professional {
  professionalID: string;
  name: string;
  userLogin: string;
  password: string;
  email: string;
  profileImage: string;
  profileType: string;
  instructionLevel: InstructionLevel;
  state: string;
  city: string;
  birthDate: Date;
  careerDate: Date;
  jobRole: JobRole;
  paymentInfo: PaymentInfo;
  age: number;
}
