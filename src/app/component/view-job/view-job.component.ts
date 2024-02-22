import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobInterface } from '../../interface/job-interface';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.css',
})
export class ViewJobComponent {
  jobName: string = '';
  companyName: string = '';
  jobDescription: string = '';
  askingSalary: number = 0;
  status: string = '';
  createdAt: Date;

  constructor(
    private dialogRef: MatDialogRef<ViewJobComponent>,
    @Inject(MAT_DIALOG_DATA) data: JobInterface
  ) {
    this.jobName = data.jobName;
    this.companyName = data.companyName;
    this.jobDescription = data.jobDescription;
    this.askingSalary = data.askingSalary;
    this.status = data.status;
    this.createdAt = data.createdAt;
    console.log('created At', this.createdAt);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
