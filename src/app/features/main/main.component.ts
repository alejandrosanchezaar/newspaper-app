import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NewsService } from '@/core/services/news.service';
import { Article } from '@/core/models/article';
import * as _ from 'lodash';
import { CategoryFilterPipe } from '@/shared/pipes/category-filter.pipe';
import { TextFilterPipe } from '@/shared/pipes/text-filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule, CategoryFilterPipe, TextFilterPipe, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  articleList = signal<Article[]>([]);
  selectedArticle!: Article;
  loading: boolean = true;
  categories = ['All', 'National', 'Economy', 'Sports', 'International', 'Technology'];
  selectedCategories: string[] = ['All'];
  deletingLoading: boolean = false;


  searchText: string = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;
  toastMessage: string = '';

  
  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.getArticles();
    this.selectedArticle = {
    id: 0,
    id_user: 0,
    abstract: '',
    subtitle: '',
    update_date: '',
    category: '',
    title: '',
    thumbnail_image: '',
    thumbnail_media_type: '',
    image_data: '',
    image_media_type: ''
};
    
  }

  // component.ts
  

  private getArticles(): void {
    this.loading = true;
    this.newsService.getArticles().subscribe({
      next: (articles) => {this.articleList.set(articles); console.log(articles); this.loading = false;},
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.toastMessage = 'Error fetching articles. Please try again later.';
        this.showToast = true;
        this.loading = false;
      }
    });
  }

  toggleCategory(cat: string): void {
    if (cat === 'All') {
      this.selectedCategories = this.selectedCategories.includes('All') ? [] : ['All'];
      return;
    }

    const isSelected = this.selectedCategories.includes(cat);
    this.selectedCategories = isSelected
      ? this.selectedCategories.filter(c => c !== cat)
      : [...this.selectedCategories.filter(c => c !== 'All'), cat];
  }

  protected goToCreateArticle(): void {
    this.router.navigate(['/articles/create']);
  }

  protected goToEditArticle(articleID : number): void {
    this.router.navigate(['/articles', articleID, 'edit']);
  }

  protected deleteArticle(article: Article | number): void {
    this.deletingLoading = true;
    // this.newsService.deleteArticle(article).subscribe({
    //   next: (deletedArticle) => {
    //     console.log('Artículo eliminado:', deletedArticle);
    //     // Opcional: actualizar la lista de artículos en la UI
    //     const id = typeof article === 'number' ? article : article.id;
    //     this.articleList.update(list => list.filter(a => a.id !== id));
    //   },
    //   error: (err) => {
    //     console.error('Error eliminando el artículo:', err);
    //   },
    //   complete: () => {
    //     this.deletingLoading = false;
    //   }
    // });
    setTimeout(() => { // incrementa contador en lugar de borrar
      this.deletingLoading = false;
      //this.displayToast('success', 'Article deleted successfully.');
      this.displayToast('error', 'Failed to delete article.');

    }, 2000);
  }

  protected showDeleteConfirmation(article: Article): void {
    this.selectedArticle = article;
  }


displayToast(type: 'success' | 'error', message: string, duration: number = 3000) {
    this.toastType = type;
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, duration);
  }
}
