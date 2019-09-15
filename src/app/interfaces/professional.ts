import { JobRole } from './job-role';
import { EmailValidator } from '@angular/forms';
import { InstructionLevel } from '../shared/form-cadastro/form-cadastro.component';

export interface Professional {
  professionalID: string;
  name: string;
  userLogin: string;
  password: string;
  profileImage: File;
  profileType: string;
  instructionLevel: InstructionLevel;
  state: string;
  city: string;
  birthDate: Date;
  careerDate: Date;
  jobRole: JobRole;
  listOfFriends: Array<Professional>;
  listOfFriendRequests: Array<Professional>;
}
