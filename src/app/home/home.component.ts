import { Component } from '@angular/core';
import { JobBoardComponent } from '../job-board/job-board.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JobBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
