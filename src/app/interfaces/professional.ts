import { JobRole } from './job-role';
import { EmailValidator } from '@angular/forms';

export interface Professional {
    name: string;
    userLogin: string;
    email: string;
    workingCity: string;
    workingState: string;
    password: string;
    profileImage: File;
    birthDate: Date;
    careerDate: Date;
    jobRole: JobRole;
    listOfFriends: Array<Professional>;
    listOfFriendRequests: Array<Professional>;
}