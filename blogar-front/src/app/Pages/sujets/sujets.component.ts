import { Component } from '@angular/core';
import { SujetService } from '../../shared/services/sujet/sujets.service';
import { Sujet } from '../../interfaces/sujet';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sujets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sujets.component.html',
  styleUrl: './sujets.component.css'
})
export class SujetsComponent {
  sujets: Sujet[] = [];

  constructor(private sujetService: SujetService, private router: Router) { }

  ngOnInit(): void {
    this.sujetService.getTopics().then(sujets => {
      this.sujets = sujets;
    });
  }

  createsujet() {
    this.router.navigate(['createsujet']);

  }

  trackById(index: number, sujet: any): number {
    return sujet.id;
  }
  

}
