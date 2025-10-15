import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '@/core/models/article';
@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  
  transform(articles: Article[], selectedCategories: string[]): Article[] {
    if (!articles) return [];
    if (!selectedCategories || selectedCategories.length === 0 || selectedCategories.map(c => c.toLowerCase()).includes('all')) {
      return articles;
    }

    const selectedLower = selectedCategories.map(c => c.toLowerCase());

    return articles.filter(article =>
      selectedLower.includes(article.category.toLowerCase())
    );
  }
}
