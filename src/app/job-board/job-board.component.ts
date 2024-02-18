import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from '../job-card/job-card.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { JobInterface } from '../interface/job-interface';
import { JobService } from '../service/job.service';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [
    CommonModule,
    JobCardComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './job-board.component.html',
  styleUrl: './job-board.component.css',
})
export class JobBoardComponent implements OnInit {
  email: string = 'alimohamedalcantara@gmail.com';

  wishlist: JobInterface[] = [];
  applied: JobInterface[] = [];
  interview: JobInterface[] = [];
  offer: JobInterface[] = [];
  rejected: JobInterface[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService
      .getJobListByStatusAndEmail('wishlist', this.email)
      .subscribe((data) => (this.wishlist = data));
    this.jobService
      .getJobListByStatusAndEmail('applied', this.email)
      .subscribe((data) => (this.applied = data));
    this.jobService
      .getJobListByStatusAndEmail('interview', this.email)
      .subscribe((data) => (this.interview = data));
    this.jobService
      .getJobListByStatusAndEmail('offer', this.email)
      .subscribe((data) => (this.offer = data));
    this.jobService
      .getJobListByStatusAndEmail('rejected', this.email)
      .subscribe((data) => (this.rejected = data));
  }

  drop(event: CdkDragDrop<JobInterface[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log('move item');
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('transfer item');

      const jobId = event.container.data[0]?.id;
      let targetStatus = event.container.id;

      console.log('jobid', jobId);
      console.log('targetStatus', targetStatus);

      this.jobService
        .patchJobToMove(jobId, targetStatus)
        .subscribe((res) => console.log(res));
    }
  }
}
