import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './../../services/login.service';
import { User } from './../../../../../../../.history/ganapatiAngular/src/app/core/models/user.model_20200618155900';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // props
  hide = true;
  submitted = false;
  loginForm: FormGroup;
  user: User = new User();


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,

  ) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {
    this.loginForm = this.fb.group({
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  // error
  getUsernameErrorMsg() {
    return this.loginForm.controls.username.hasError('required') ? 'Username is required.' : '';
  }
  getPassErrorMsg() {
    return this.loginForm.controls.password.hasError('required') ? 'Password is required.' : '';
  }

  onLogin() {
    console.log('calling login'+ (this.loginForm));

    this.submitted = true;
    if (this.loginForm.valid) {

      this.loginService.getLogin(this.f.username.value, this.f.password.value);
    }
  }

}
