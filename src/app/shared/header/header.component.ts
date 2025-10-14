import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // si usas routerLink en el header

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink] // añade NgIf/NgClass si los usas
})
export class HeaderComponent {
  menuOpen = false;
  toggleMenu() { this.menuOpen = !this.menuOpen; }
}

