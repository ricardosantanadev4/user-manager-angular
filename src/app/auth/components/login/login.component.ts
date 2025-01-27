import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuider: FormBuilder, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuider.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['/usuarios']);
    }
  }
}