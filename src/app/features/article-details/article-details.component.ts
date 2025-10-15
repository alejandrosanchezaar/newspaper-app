import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { NewsService } from '@/core/services/news.service';
import { Article } from '@/core/models/article';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  article: Article | null = null;
  imageUrl: string | null = null; 
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');

    if (articleId) {
      this.loadArticleData(articleId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Article ID not found.';
      console.error('No article ID was provided in the route.');
    }
  }

  loadArticleData(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.newsService.getArticle(id).subscribe({
      next: (articleData) => {
        console.log('Loaded article:', articleData); // debug
        this.article = articleData;

        if (articleData.image_data && articleData.image_media_type) {
          this.imageUrl = `data:${articleData.image_media_type};base64,${articleData.image_data}`;
        } else {
          this.imageUrl = null;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load article details', err);
        this.errorMessage = 'Could not load article data. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Navigates to the previous page in the browser's history.
   */
  goBack(): void {
    this.location.back();
  }
}
