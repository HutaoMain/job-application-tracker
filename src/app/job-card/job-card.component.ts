import { Component, Input } from '@angular/core';
import { JobInterface } from '../interface/job-interface';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input() job!: JobInterface;
}
