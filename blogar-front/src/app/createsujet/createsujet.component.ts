import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SujetService } from '../sujets.service';
import { User } from '../user';
import { Sujet } from '../sujet';


@Component({
  selector: 'app-createsujet',
  templateUrl: './createsujet.component.html',
  styleUrls: ['./createsujet.component.css']
})
export class CreatesujetComponent {
  title: string = '';
  author: User = { id: 0, name: '' , username : '', password : ''};

  constructor(private sujetService: SujetService, private router: Router) { }

  onSubmit() {
    const newSujet: Sujet = {
      id: 0, // l'ID sera généré par le backend
      title: this.title,
      author: this.author,
      created: new Date(),
      updated: new Date()
    };

    this.sujetService.createSujet(newSujet).then(() => {
      this.router.navigate(['/sujet']);
    }).catch(error => {
      console.error('Erreur lors de la création du sujet', error);
    });
  }
}
