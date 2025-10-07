import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
cards = [
    { title: 'Card 1', text: 'Contenido 1' },
    { title: 'Card 2', text: 'Contenido 2' },
    { title: 'Card 3', text: 'Contenido 3' },
    { title: 'Card 4', text: 'Contenido 4' },
    { title: 'Card 5', text: 'Contenido 5' },
    { title: 'Card 6', text: 'Contenido 6' }
  ];

  // component.ts
categories = ['Technology', 'Sports', 'Health', 'Science'];
selectedCategories: string[] = [];

toggleCategory(cat: string) {
  const index = this.selectedCategories.indexOf(cat);
  if (index > -1) {
    this.selectedCategories.splice(index, 1);
  } else {
    this.selectedCategories.push(cat);
  }
}
}
