import { Component } from '@angular/core';
import { SujetService } from '../sujets.service';
import { Sujet } from '../sujet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sujets',
  standalone: true,
  imports: [],
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
  

}
