import { Component, OnInit } from '@angular/core';
import { JobInterface } from '../../interface/job-interface';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from '../../service/job-service/job.service';
import { AddJobComponent } from '../add-job/add-job.component';
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrl: './job-board.component.css',
})
export class JobBoardComponent implements OnInit {
  wishlist: JobInterface[] = [];
  applied: JobInterface[] = [];
  interview: JobInterface[] = [];
  offer: JobInterface[] = [];
  rejected: JobInterface[] = [];

  // add job data

  jobName: string = '';
  email: string = 'alimohamedalcantara@gmail.com';
  companyName: string = '';
  jobDescription: string = '';
  askingSalary: number = 0;
  status: string = 'wishlist';

  constructor(private jobService: JobService, private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddJobComponent, {
      width: '320px',
      data: {
        jobName: this.jobName,
        email: this.email,
        companyName: this.companyName,
        jobDescription: this.jobDescription,
        askingSalary: this.askingSalary,
        status: this.status,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.animal = result;
      console.log(result);
    });
  }

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
