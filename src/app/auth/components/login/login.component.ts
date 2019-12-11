import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loading spinner while logins happens
  isLoading: boolean = false;
  redirectUrl: string;

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
  }

}
