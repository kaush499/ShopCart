import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  // loading spinner while logins happens
  isLoading: boolean = false;
  private authErrorSubs: Subscription;

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

    this.authErrorSubs = this.authService.getAuthError()
      .subscribe(val => {
        this.isLoading = false;
        form.resetForm();
      })
  }

  ngOnDestroy() {
    this.authErrorSubs.unsubscribe();
  }

}
