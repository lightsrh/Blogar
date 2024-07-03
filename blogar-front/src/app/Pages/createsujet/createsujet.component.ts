import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SujetService } from '../../shared/services/sujet/sujets.service';
import { Sujet } from '../../interfaces/sujet';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-createsujet',
  templateUrl: './createsujet.component.html',
  styleUrls: ['./createsujet.component.css'],
  imports: [FormsModule]
})
export class CreatesujetComponent {
  author = {
    id: 0, // l'ID sera généré par le backend
    username: 'user',
    email: '',
    isValid: false,
    authModel: null,
    token: ''

  };
  newSujet: Sujet = {
    id: '0', // l'ID sera généré par le backend
    title: '',
    created: new Date(),
    updated: new Date(),
    author: this.author
  };

  constructor(private sujetService: SujetService, private router: Router) { }

  onSubmit() {
    this.sujetService.createSujet(this.newSujet).then(() => {
      this.router.navigate(['/sujet']);
    }).catch(error => {
      console.error('Erreur lors de la création du sujet', error);
    });
  }
}
