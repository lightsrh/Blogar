import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatepostComponent } from './Pages/createpost/createpost.component';
import { CreatesujetComponent } from './Pages/createsujet/createsujet.component';
import { PostsComponent } from './Pages/posts/posts.component';
import { UpdateSujetComponent } from './Pages/updatesujet/updatesujet.component';
import { UpdatepostComponent } from './Pages/updatepost/updatepost.component';
import { SujetsComponent } from './Pages/sujets/sujets.component';
import { LoginComponent } from './Pages/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sujet/:id/createpost', component: CreatepostComponent, canActivate: [AuthGuard] },
  { path: 'createsujet', component: CreatesujetComponent, canActivate: [AuthGuard] },
  { path: 'sujet', component: SujetsComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'sujet/:id/editpost/:id', component: UpdatepostComponent, canActivate: [AuthGuard] },
  { path: 'sujet/:id/editsujet', component: UpdateSujetComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
