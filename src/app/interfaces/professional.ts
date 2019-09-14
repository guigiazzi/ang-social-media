import { JobRole } from './job-role';
import { EmailValidator } from '@angular/forms';

export interface Professional {
  professionalID: string;
  name: string;
  userLogin: string;
  password: string;
  profileImage: File;
  profileType: string;
  instructionLevel: string;
  state: string;
  city: string;
  birthDate: Date;
  careerDate: Date;
  jobRole: JobRole;
  listOfFriends: Array<Professional>;
  listOfFriendRequests: Array<Professional>;
}
