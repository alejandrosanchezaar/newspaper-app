import { LoginService } from '@/core/services/login.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(protected loginService: LoginService, private router: Router) { }

  protected logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']);
    window.location.reload();
  }

  protected isLogged(): boolean {
    return this.loginService.isLogged();
  }

  protected login(): void {
    this.router.navigate(['/login']);
  }

  protected getUserName(): string {
    const user = this.loginService.getUser();
    return user ? user.username : 'Guest';
  }
}
