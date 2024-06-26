import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { CreatesujetComponent } from './createsujet/createsujet.component';
import { PostsComponent } from './posts/posts.component';
import { SujetsComponent } from './sujets/sujets.component';
import { UpdatepostComponent } from './updatepost/updatepost.component';
import { UpdatesujetComponent } from './updatesujet/updatesujet.component';

//source file that describes the app-root component.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CreatepostComponent, CreatesujetComponent, PostsComponent, SujetsComponent, UpdatepostComponent,UpdatesujetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
