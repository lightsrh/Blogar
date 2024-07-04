import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sujet } from '../../interfaces/sujet';
import { SujetService } from '../../shared/services/sujet/sujets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-sujet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './updatesujet.component.html',
  styleUrls: ['./updatesujet.component.css']
})
export class UpdateSujetComponent implements OnInit {
  newSujet: Sujet = {
    id: '0',
    title: '',
    created: new Date(),
    updated: new Date(),
    author: {
      username: 'user',
      isValid: false,
      authModel: null,
      token: ''
    }
  };
  editMode = false;
  sujetId: string | null = null;

  constructor(private sujetService: SujetService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sujetId = params['id'];
      if (this.sujetId) {
        this.editMode = true;
        this.sujetService.getSujetById(this.sujetId).then(sujet => {
          if (sujet) {
            this.newSujet = sujet;
          }
        });
      }
    });
  }

  onSubmit() {
      this.sujetService.updateSujet(this.sujetId!, this.newSujet).then(() => {
        this.router.navigate(['/sujet']);
      }).catch(error => {
        console.error('Error updating sujet:', error);
      });
  }
}
