import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreatepostComponent } from './Pages/createpost/createpost.component';
import { PostsComponent } from './Pages/posts/posts.component';
import { UpdatepostComponent } from './Pages/updatepost/updatepost.component';
import { UpdateSujetComponent } from './Pages/updatesujet/updatesujet.component';
import { LoginComponent } from './Pages/login/login.component';
import { SujetsComponent } from './Pages/sujets/sujets.component';
import { AuthService } from './shared/services/auth/auth.service';

//source file that describes the app-root component.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, CreatepostComponent, PostsComponent, SujetsComponent, UpdatepostComponent, UpdateSujetComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Blogar';

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
