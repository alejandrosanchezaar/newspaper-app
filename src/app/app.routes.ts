import { Routes } from '@angular/router';

// Import your new component at the top of the file.
import { ArticleEditionComponent } from './article-edition/article-edition.component';


export const routes: Routes = [
    // Note: Add this line to handle the default route.
    { path: '', redirectTo: 'article/new', pathMatch: 'full' },

    { path: 'article/new', component: ArticleEditionComponent },
    { path: 'article/edit/:id', component: ArticleEditionComponent }
];