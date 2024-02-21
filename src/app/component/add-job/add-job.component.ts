import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
})
export class AddJobComponent implements OnInit {
  jobForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<AddJobComponent>,
    private fb: FormBuilder
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

  ngOnInit(): void {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {}
}
