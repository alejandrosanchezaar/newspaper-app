import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;           
  toastType: 'success' | 'error' = 'success';
  showToast = false;
  toastMessage: string = '';

  constructor(
    private fb: FormBuilder,           
    private loginService: LoginService,
    private router: Router
  ) {
    this.form = this.fb.group({        
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  // Login method
  protected onSubmit() {
    if (this.form.invalid) return;
    const { username, password, remember } = this.form.value;
    this.loginService.login(username!, password!, remember!).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.displayToast('error', "Invalid username or password")
    });
  }

  // Display toast notification
  private displayToast(type: 'success' | 'error', message: string, duration: number = 3000) {
    this.toastType = type;
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, duration);
  }
}
