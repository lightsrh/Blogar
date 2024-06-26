import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { CreatesujetComponent } from './createsujet/createsujet.component';
import { SujetsComponent } from './sujets/sujets.component';
import { PostsComponent } from './posts/posts.component';
import { UpdatepostComponent } from './updatepost/updatepost.component';
import { UpdatesujetComponent } from './updatesujet/updatesujet.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'createpost', component: CreatepostComponent},
  {path: 'createsujet', component: CreatesujetComponent},
  {path: 'sujet', component: SujetsComponent},
  {path: 'post', component: PostsComponent},
  {path: 'updatepost', component: UpdatepostComponent},
  {path: 'updatesujet', component: UpdatesujetComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full' } // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
