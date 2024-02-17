import { JobInterface } from './job-interface';

export interface BoardInterface {
  id: string;
  email: string;
  boardName: string;
  jobList: JobInterface[];
  createdAt: Date;
}
