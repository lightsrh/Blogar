import { Component } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HousingLocationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router) { }

  login() {
    console.log('Login');
    this.router.navigate(['test']);
  }
}



