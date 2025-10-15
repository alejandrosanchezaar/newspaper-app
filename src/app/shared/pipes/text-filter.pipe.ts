import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '@/core/models/article';

@Pipe({
  name: 'textFilter'
})
export class TextFilterPipe implements PipeTransform {

  transform(articles: Article[], searchText: string): Article[]{
    if (!articles) return [];
    if (!searchText) return articles;

    const lowerText = searchText.toLowerCase();
    return articles.filter(article =>
      article.title.toLowerCase().includes(lowerText) ||
      article.category.toLowerCase().includes(lowerText)
    );
  }
}
