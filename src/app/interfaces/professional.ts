import { JobRole } from './job-role';
import { EmailValidator } from '@angular/forms';

export interface Professional {
    professionalID: string,
    name: string;
    userLogin: string;
    email: string;
    workingCity: string;
    workingState: string;
    password: string;
    profileImage: File;
    profileType: string;
    instructionLevel: string;
    birthDate: Date;
    careerDate: Date;
    jobRole: JobRole;
    listOfFriends: Array<Professional>;
    listOfFriendRequests: Array<Professional>;
}