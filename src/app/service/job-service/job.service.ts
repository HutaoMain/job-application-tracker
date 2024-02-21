import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobInterface } from '../../interface/job-interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  url = 'http://localhost:8080/api/job';

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
}
