export interface IUserProject {
    userId: string;
    projectId: string;
    role: 'Owner' | 'Member';
  }