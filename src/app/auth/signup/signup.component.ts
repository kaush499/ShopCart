import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // loading spinner while logins happens
  isLoading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  // signup through authService
  onSignup(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const name = form.value.name;
    const password = form.value.password;
    this.authService.createUser(name, email, password);
  }

}
