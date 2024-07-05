import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CreatepostComponent } from './Pages/createpost/createpost.component';
import { PostsComponent } from './Pages/posts/posts.component';
import { UpdatepostComponent } from './Pages/updatepost/updatepost.component';
import { UpdateSujetComponent } from './Pages/updatesujet/updatesujet.component';
import { LoginComponent } from './Pages/login/login.component';
import { SujetsComponent } from './Pages/sujets/sujets.component';
import { AuthService } from './shared/services/auth/auth.service';
import { filter } from 'rxjs';

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
  showLogoutButton = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkCurrentRoute();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkCurrentRoute();
      });
  }

  checkCurrentRoute(): void {
    this.showLogoutButton = this.router.url !== '/login';
  }

  logout() {
    this.authService.logout();
  }
}
