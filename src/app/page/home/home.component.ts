import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const emailParam = params['email'];

      console.log(emailParam);

      if (emailParam) {
        // Save the email to localStorage
        localStorage.setItem('email', emailParam);

        // You can also use the email in your component logic if needed
        console.log('Email from URL:', emailParam);
      }
    });
  }
}
