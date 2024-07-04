import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatepostComponent } from './Pages/createpost/createpost.component';
import { CreatesujetComponent } from './Pages/createsujet/createsujet.component';
import { PostsComponent } from './Pages/posts/posts.component';
import { UpdateSujetComponent } from './Pages/updatesujet/updatesujet.component';
import { UpdatepostComponent } from './Pages/updatepost/updatepost.component';
import { SujetsComponent } from './Pages/sujets/sujets.component';
import { LoginComponent } from './Pages/login/login.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'sujet/:id/createpost', component: CreatepostComponent},
  {path: 'createsujet', component: CreatesujetComponent},
  {path: 'sujet', component: SujetsComponent},
  {path: 'post/:id', component: PostsComponent},
  {path: 'sujet/:id/editpost/:id', component: UpdatepostComponent},
  {path: 'sujet/:id/editsujet', component: UpdateSujetComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full' } // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
