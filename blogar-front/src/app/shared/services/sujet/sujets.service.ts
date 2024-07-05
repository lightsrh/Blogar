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
    let author = '';
    
    try {
      let records = await this.pocketBase.collection('sujets').getFullList();
      

      const posts: Sujet[] = [];
      for (const record of records) {
        const authorUsername = await this.authService.getUsernameById(record['author']) // Récupérer l'username de l'auteur
        posts.push({
          id: record.id,
          title: record['title'],
          author: authorUsername,
          created: new Date(record.created),
          updated: new Date(record.updated)
        });
      }

      return posts;
    } catch (error) {
      console.error('Erreur lors de la récupération des enregistrements:', error);
      return [];
    }
  }

  async getSujetById(sujetId: string): Promise<Sujet | null> {
    try {
      const record = await this.pocketBase.collection('sujets').getOne(sujetId);
      if (record) {
        const authorUsername = await this.authService.getUsernameById(record['author']);
        return {
          id: record.id,
          title: record['title'],
          author: authorUsername,
          created: new Date(record.created),
          updated: new Date()
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du sujet:', error);
    }
    return null;
  }

  async updateSujet(sujetId: string, sujet: Sujet) {
    const updatedSujet = {
      title: sujet.title,
      updated: sujet.updated,
      author: sujet.author.id
    }
    console.log('updateSujet', updatedSujet);
    await this.pocketBase.collection('sujets').update(sujetId, updatedSujet);
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
