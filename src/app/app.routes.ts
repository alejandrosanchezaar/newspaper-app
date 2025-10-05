import { ArticleCreateComponent } from '@/features/article-create/article-create.component';
import { ArticleDetailsComponent } from '@/features/article-details/article-details.component';
import { ArticleEditComponent } from '@/features/article-edit/article-edit.component';
import { LoginComponent } from '@/features/login/login.component';
import { MainComponent } from '@/features/main/main.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'articles/create', component: ArticleCreateComponent },
    { path: 'articles/:id', component: ArticleDetailsComponent },
    { path: 'articles/:id/edit', component: ArticleEditComponent },
    { path: '**', redirectTo: '/home' }
];