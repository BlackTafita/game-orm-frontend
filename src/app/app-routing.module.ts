import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'themes', loadChildren: () => import('./themes/themes.module').then(m => m.ThemesModule) },
  { path: 'tags', loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule) },
  { path: 'card', loadChildren: () => import('./card/card.module').then(m => m.CardModule) },
  { path: '*', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
