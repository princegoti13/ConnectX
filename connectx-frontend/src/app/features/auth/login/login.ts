import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services/auth';

import Swal from 'sweetalert2';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [ReactiveFormsModule],

  templateUrl: './login.html',

  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  hidePassword = true;

  loading = false;

  constructor(
    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.loading = false;

        Swal.fire({
          icon: 'success',

          title: 'Welcome',

          text: response.message,

          timer: 1500,

          showConfirmButton: false,
        });

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },

      error: (error) => {
        this.loading = false;

        Swal.fire({
          icon: 'error',

          title: 'Login Failed',

          text: error.error.message,
        });
      },
    });
  }
}
