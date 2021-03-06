import { Component, OnInit } from '@angular/core';
import { AuthJwtService } from '../auth/auth-jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  userInfo: AuthLoginInfo;
  constructor(private auth: AuthJwtService, private fb: FormBuilder,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    this.userInfo = new AuthLoginInfo(this.fusername.value, this.fpassword.value);
    this.login(this.userInfo);
  }

  get fusername() {
    return this.loginForm.get('username');
  }
  get fpassword() {
    return this.loginForm.get('password');
  }
  public login(userInfo) {
    this.auth.attemptAuth(userInfo).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
      },
      error => {
        console.log("Error ", error);
      }
    );

  }
  
}
