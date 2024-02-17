import { Injectable } from '@angular/core';
import { BoardInterface } from '../interface/board-interface';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JobInterface } from '../interface/job-interface';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  url = 'http://localhost:8080/api/board';

  constructor(private http: HttpClient) {}

  getAllBoards(): Observable<BoardInterface[]> {
    return this.http.get<BoardInterface[]>(`${this.url}/list`);
  }

  getBoardById(id: string): Observable<BoardInterface> {
    return this.http.get<BoardInterface>(`${this.url}/${id}`);
  }

  moveJobCardByJobIdAndTargetBoardId(
    jobId: string,
    boardId: string
  ): Observable<JobInterface> {
    const apiUrl = `http://localhost:8080/api/job/move-job?jobId=${jobId}&targetBoardId=${boardId}`;
    return this.http
      .patch(apiUrl, {})
      .pipe(map((response: any) => response as JobInterface));
  }
}
