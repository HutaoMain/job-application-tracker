import { Component, OnInit } from '@angular/core';
import { BoardInterface } from '../interface/board-interface';
import { BoardService } from '../service/board.service';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from '../job-card/job-card.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { JobInterface } from '../interface/job-interface';

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
  boardList: BoardInterface[] = [];

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.loadBoardList();
  }

  loadBoardList(): void {
    this.boardService.getAllBoards().subscribe((boardList) => {
      console.log(boardList);
      this.boardList = boardList;
    });
  }

  onDrop(event: CdkDragDrop<JobInterface[]>) {
    console.log('event', event);
    const jobId = event.item.dropContainer.data[0]?.id;
    console.log('jobId', jobId);
    const targetBoardId = this.boardList[event.currentIndex].id;

    console.log('targetBoardId', targetBoardId);
    // const targetBoard = this.boardList.find(
    //   (board) => board.id === targetBoardId
    // );
    // console.log('targetBoardId', targetBoard);
    // TODO: the problem here is that isPointerOverContainer is false meaning even tho the pointer is in the other container, it is not detecting maybe because my html is dynamically listing the boards
    // TODO: think if we will make the boards static
    // this.boardService
    //   .moveJobCardByJobIdAndTargetBoardId(jobId, targetBoardId)
    //   .subscribe((res) => console.log(res));
  }
}
