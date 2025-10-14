import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;                    // ← declarar sin inicializar
  errorMessage = '';

  constructor(
    private fb: FormBuilder,           // ← aquí se inyecta fb
    private loginService: LoginService,
    private router: Router
  ) {
    this.form = this.fb.group({        // ← inicialización ya con fb disponible
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { username, password, remember } = this.form.value;
    this.loginService.login(username!, password!, remember!).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.errorMessage = 'Invalid username or password'
    });
  }
}
