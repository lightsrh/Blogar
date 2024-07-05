import { Component, OnInit } from '@angular/core';
import { SujetService } from '../../shared/services/sujet/sujets.service';
import { Sujet } from '../../interfaces/sujet';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sujets',
  standalone: true,
  imports: [CommonModule, RouterModule, MatPaginatorModule],
  templateUrl: './sujets.component.html',
  styleUrls: ['./sujets.component.css']
})
export class SujetsComponent implements OnInit {
  sujets: Sujet[] = [];
  pagedSujets: Sujet[] = [];
  pageSize = 5;
  pageEvent: PageEvent = { pageIndex: 0, pageSize: this.pageSize, length: this.sujets.length };
  pocketBase: PocketBase;
  currentUserId: string;

  constructor(private sujetService: SujetService, private router: Router, public dialog: MatDialog) {
    this.pocketBase = new PocketBase(environment.baseUrl);
    this.currentUserId = this.pocketBase.authStore.model?.['id'];  // Assurez-vous que l'utilisateur est connecté et que l'ID est disponible
  }

  ngOnInit(): void {
    this.sujetService.getTopics().then(sujets => {
      this.sujets = sujets;
      this.getPagedSujets();
    });
  }

  createsujet() {
    this.router.navigate(['createsujet']);
  }

  trackById(index: number, sujet: Sujet): number {
    return parseInt(sujet.id);
  }

  onSujetClick(sujet: Sujet) {
    this.sujetService.setSujetTitle(sujet.title);
    this.router.navigate(['/post', sujet.id]);
  }

  async editSujet(event: Event, sujet: Sujet) {
    event.stopPropagation();
    this.router.navigate([`sujet/${sujet.id}/editsujet`]);
  }

  async deleteSujet(event: Event, sujet: Sujet) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
      if (result === true) {
        try {
          await this.sujetService.deleteSujet(sujet.id.toString());
          this.sujets = this.sujets.filter(s => s.id !== sujet.id);
          this.getPagedSujets();
        } catch (error) {
          console.error('Erreur lors de la suppression du sujet:', error);
        }
      }
    });
  }

  getPagedSujets() {
    const startIndex = this.pageEvent ? this.pageEvent.pageIndex * this.pageSize : 0;
    const endIndex = this.pageEvent ? startIndex + this.pageSize : this.pageSize;
    this.pagedSujets = this.sujets.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.getPagedSujets();
  }
}
