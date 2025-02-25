import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { ILogin } from '../../../shared/models/login.interface';
import { response } from 'express';
import { HttpStatusCode } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private formBuider: FormBuilder, private router: Router,
    private usuarioService: UsuarioService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.usuarioService.clearToken();
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
      this.usuarioService.login(login).subscribe({
        next: (httpResponse) => {
          if (httpResponse.status === HttpStatusCode.Ok) {
            let token =  httpResponse.headers.get('Authorization')?.replace('Bearer ','') || '';
            this.usuarioService.token = token;
            this.router.navigate(['/usuarios']);
          }
        },
      });
    }
  }

}