import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { AuthService } from '../auth/auth.service';
import { Sujet } from '../../../interfaces/sujet';

@Injectable({
  providedIn: 'root'
})
export class SujetService {
  private pocketBase: PocketBase;
  private apiUrl = 'http://localhost:8090';
  authService: AuthService;
  private sujetTitle: string | null = null;

  constructor() {
    this.pocketBase = new PocketBase(this.apiUrl);
    this.authService = new AuthService();
  }

  setSujetTitle(title: string) {
    this.sujetTitle = title;
  }

  getSujetTitle(): string | null {
    return this.sujetTitle;
  }

  async getTopics(): Promise<Sujet[]> {
    try {
      const transactionsRecords = await this.pocketBase.collection('sujets').getFullList();
      const sujets: Sujet[] = [];
      
      for (const transaction of transactionsRecords) {
        const authorUsername = await this.authService.getUsernameById(transaction['author']);
        sujets.push({
          id: transaction.id,
          title: transaction['title'],
          author: authorUsername,
          created: new Date(transaction.created),
          updated: new Date(transaction.updated)
        });
      }

      return sujets;
    } catch (error) {
      console.error('Erreur lors de la récupération des sujets:', error);
      return [];
    }
  }

  async createSujet(request: any) {
    let author = '';
    if (this.pocketBase.authStore.model) {
      author = this.pocketBase.authStore.model['id'];
    }
    const transaction = {
      title: request.title,
      author: author,
      created: request.created,
      updated: request.updated
    };
    const newSujet = await this.pocketBase.collection('sujets').create(transaction);
  }

  async deleteSujet(sujetId: string) {
    console.log('deleteSujet', sujetId);
    await this.pocketBase.collection('sujets').delete(sujetId);
  }
}
