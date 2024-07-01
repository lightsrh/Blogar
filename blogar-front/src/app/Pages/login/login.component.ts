import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SujetsComponent } from '../sujets/sujets.component';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, SujetsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  authService: AuthService = inject(AuthService);
  username: string = '';
  password: string = '';
  displayError: boolean = false;
  constructor(private router: Router) { }



  login() {

    this.authService.login(this.username, this.password).then((res: boolean) => {
      if (res) {
        this.router.navigate(['/sujet']);
      }
      else {
        this.displayError = true;
      } 

  }
)
}
}



