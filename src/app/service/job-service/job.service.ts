import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobInterface } from '../../interface/job-interface';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  url = environment + '/api/job';

  constructor(private http: HttpClient) {}

  getJobListByStatusAndEmail(
    status: string,
    email: string
  ): Observable<JobInterface[]> {
    return this.http.get<JobInterface[]>(`${this.url}/list/${status}/${email}`);
  }

  patchJobToMove(
    jobId: string,
    targetStatus: string
  ): Observable<JobInterface> {
    const apiUrl = `${this.url}/move-job?jobId=${jobId}&targetStatus=${targetStatus}`;
    return this.http
      .patch(apiUrl, {})
      .pipe(map((response: any) => response as JobInterface));
  }

  postJob(jobItems: JobInterface): Observable<JobInterface> {
    return this.http.post<JobInterface>(`${this.url}/create`, {
      jobName: jobItems.jobName,
      email: jobItems.email,
      companyName: jobItems.companyName,
      jobDescription: jobItems.jobDescription,
      askingSalary: jobItems.askingSalary,
      status: jobItems.status,
    });
  }
}
