import { JobRole } from './job-role';

export interface Professional {
    name: string;
    userLogin: string;
    password: string;
    profileImage: File;
    birthDate: Date;
    careerDate: Date;
    jobRole: JobRole;
    listOfFriends: Array<Professional>;
    listOfFriendRequests: Array<Professional>;
}
