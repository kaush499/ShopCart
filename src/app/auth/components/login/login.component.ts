import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // loading spinner while logins happens
  isLoading: boolean = false;
  redirectUrl: string;
  private authErrorSubs: Subscription;

  constructor(private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.redirectUrl = params.get("redirectUrl");
    });
  }

  // logins through authService
  onLogin(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password, this.redirectUrl);

    this.authErrorSubs = this.authService.getAuthError()
    .subscribe(val => {
      this.isLoading = false;
      form.resetForm();
    })
  }

  // private resetForm() {
  //   this.loginForm.resetForm();
  // }
 
  ngOnDestroy() {
    if(this.authErrorSubs) this.authErrorSubs.unsubscribe();
  }

}
