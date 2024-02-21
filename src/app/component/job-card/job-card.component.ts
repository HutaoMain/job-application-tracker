import { Component, Input } from '@angular/core';
import { JobInterface } from '../../interface/job-interface';
import { MatDialog } from '@angular/material/dialog';
import { ViewJobComponent } from '../view-job/view-job.component';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input() job!: JobInterface;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ViewJobComponent, {
      width: '350px',
      data: {
        jobName: this.job.jobName,
        email: this.job.email,
        companyName: this.job.companyName,
        jobDescription: this.job.jobDescription,
        askingSalary: this.job.askingSalary,
        status: this.job.status,
        createdAt: this.job.createdAt,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  daysPassed(): number {
    const createdAtDate = new Date(this.job.createdAt);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();

    // Calculate the difference in days
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  }
}
