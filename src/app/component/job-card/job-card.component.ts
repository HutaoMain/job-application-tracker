import { Component, Input } from '@angular/core';
import { JobInterface } from '../../interface/job-interface';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input() job!: JobInterface;

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
