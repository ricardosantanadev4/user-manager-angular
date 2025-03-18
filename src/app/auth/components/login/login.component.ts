import { NgClass, NgIf } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../../../shared/models/login.interface';
import { TokenService } from '../../../shared/services/token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuider: FormBuilder, private router: Router,
    private tokenService: TokenService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.tokenService.clearToken();
  }

  initForm() {
    this.loginForm = this.formBuider.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let login: ILogin = this.loginForm.value;
      this.tokenService.login(login).subscribe({
        next: (httpResponse) => {
          if (httpResponse.status === HttpStatusCode.Ok) {
            let token = httpResponse.headers.get('Authorization')?.replace('Bearer ', '') || '';
            this.tokenService.token = token;
            this.router.navigate(['/usuarios']);
          }
        },
      });
    }
  }

}