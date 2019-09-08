import { JobRole } from './job-role';

export interface Professional {
    professionalID: string,
    name: string;
    userLogin: string;
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
