export interface JobInterface {
  id: string;
  email: string;
  jobName: string;
  companyName: string;
  jobDescription: string;
  askingSalary: number;
  status: string;
  createdAt: Date;
}
