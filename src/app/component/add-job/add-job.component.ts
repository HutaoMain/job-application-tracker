import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../../service/job-service/job.service';
import { JobInterface } from '../../interface/job-interface';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
})
export class AddJobComponent {
  jobForm: FormGroup = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<AddJobComponent>,
    private fb: FormBuilder,
    private jobService: JobService
  ) {
    this.jobForm = this.fb.group({
      jobName: new FormControl('', Validators.required),
      email: new FormControl('alimohamedalcantara@gmail.com', [
        Validators.email,
        Validators.required,
      ]),
      companyName: new FormControl('', Validators.required),
      jobDescription: new FormControl('', Validators.required),
      askingSalary: new FormControl(0, Validators.min(0)),
      status: new FormControl('wishlist', Validators.required),
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const jobItems = this.jobForm.value;

      this.jobService.postJob(jobItems).subscribe({
        next: (value: JobInterface) => {
          window.location.reload;
          console.log(value);
        },
        error: (error: any) => {
          console.error('Error adding job: ', error);
        },
      });
    }
  }
}
