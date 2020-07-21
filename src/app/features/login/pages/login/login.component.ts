// angular
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// project
import { LoginService } from './../../services/login.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // props
  hide = true;
  submitted = false;
  loginForm: FormGroup;
  user: User = new User();
  errorMsg: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeChange();
    this.buildForm();
  }

  routeChange() {
    console.log('router change');

    const token = localStorage.getItem('token');

    if (token !== null) {
      /* if (!this.jwtHelper.isTokenExpired(token)) {
                this.router.navigateByUrl('/customer/customerlist');
            } */
      this.router.navigateByUrl('ganapati/customer');
    }
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // Msg
  getUsernameErrorMsg() {
    return this.loginForm.controls.username.hasError('required')
      ? 'Username is required.'
      : '';
  }
  getPassErrorMsg() {
    return this.loginForm.controls.password.hasError('required')
      ? 'Password is required.'
      : '';
  }

  onLogin() {
    console.log('calling login' + this.loginForm);

    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginService
        .getLogin(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log('response for login');
            this.router.navigate(['/ganapati/customer']);
          },
          error: (err) => {
            err = err.error.message
              ? (this.errorMsg = err.error.message)
              : (this.errorMsg = 'Login failed');
            this.loading = false;
          },
        });
    }
  }
}
