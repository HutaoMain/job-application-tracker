import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { UserInterface } from '../../interface/user-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  currentUser: UserInterface = {
    name: '',
    given_name: '',
    family_name: '',
    picture: '',
    email: '',
    email_verified: false,
    locale: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginWithGoogle(): void {
    this.authService.getAuthUrl();
  }

  // loginWithGoogle(): void {
  //   this.authService.getAuthUrl().subscribe({
  //     next: (response) => {
  //       this.currentUser = response;
  //       localStorage.setItem('job-tracking-user', this.currentUser.email);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching current user:', error);
  //     },
  //   });
  // }
}
