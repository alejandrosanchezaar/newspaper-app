import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { NewsService } from '@/core/services/news.service';
import { Article } from '@/core/models/article';   

@Component({
  selector: 'app-article-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css'
})
export class ArticleEditComponent{

  articleForm: FormGroup;
  isEditMode = false;
  articleId: string | null = null;
  feedback: { type: 'success' | 'error', message: string } | null = null;
  cardImageBase64: string | null = null;
  toastType: 'success' | 'error' = 'success';
  showToast = false;
  toastMessage: string = '';

  categories: string[] = ["National", "Economy", "Sports", "Technology"];

  // THE CONSTRUCTOR IS KEY: It should ONLY inject services, never components.
  // This constructor is correct and will NOT cause a circular dependency.
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private location: Location
  ) {
    this.articleForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      subtitle: [''],
      abstract: ['', Validators.required],
      body: [''],
      category: [null, Validators.required],
      image_media_type: [''],
      image_data: ['']
    });
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');

    if (this.articleId) {
      this.isEditMode = true;
      this.loadArticleData(this.articleId);
    }
  }

  // UPDATED: This now calls the correct 'getArticle' method from your service.
  loadArticleData(id: string): void {
    this.newsService.getArticle(id).subscribe({
      next: (article) => {
        this.articleForm.patchValue(article); // Populate the form with real data
        if (article.image_data && article.image_media_type) {
          this.cardImageBase64 = `data:${article.image_media_type};base64,${article.image_data}`;
        }
      },
      error: (err) => {
        console.error('Failed to load article', err);
        this.feedback = { type: 'error', message: 'Could not load article data.' };
      }
    });
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      this.cardImageBase64 = reader.result as string;
      this.articleForm.patchValue({
        image_media_type: file.type,
        image_data: base64String
      });
    };
    reader.readAsDataURL(file);
  }

  // UPDATED: This now correctly calls 'updateArticle' or 'createArticle' from your service.
  onSubmit(): void {
    this.feedback = null;
    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched(); 
      return;
    }

    const articleData: Article = this.articleForm.value;

    const saveOperation = this.isEditMode 
      ? this.newsService.updateArticle(articleData) 
      : this.newsService.createArticle(articleData);

    saveOperation.subscribe({
      next: () => {
        this.displayToast('success', `Article successfully ${this.isEditMode ? 'updated' : 'created'}!`);
        setTimeout(() => this.router.navigate(['/']), 2000); // Navigate home after success
      },
      error: (err) => {
        console.error('Failed to save article', err);
        this.displayToast('error', `Failed to ${this.isEditMode ? 'update' : 'create'} article.`);      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  private displayToast(type: 'success' | 'error', message: string, duration: number = 3000) {
    this.toastType = type;
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, duration);
  }
}
