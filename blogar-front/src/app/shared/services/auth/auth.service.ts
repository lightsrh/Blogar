import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  username: string;
  isValid: boolean;
  authModel: any | null; // Assurez-vous que le type AuthModel est correctement importé depuis pocketbase
  token: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private pocketBase: PocketBase;
  private apiUrl = environment.baseUrl;
  router: Router;

  constructor() {
    this.pocketBase = new PocketBase(this.apiUrl);
    this.router = new Router();
  }

  public async login(username: string, password: string): Promise<boolean> {
    try {
      const user = await this.pocketBase.collection('users').authWithPassword(username, password);
      
      this.userSubject.next({
        username: username,
        isValid: this.pocketBase.authStore.isValid,
        authModel: this.pocketBase.authStore.model,
        token: this.pocketBase.authStore.token,
        id: this.pocketBase.authStore.model ? this.pocketBase.authStore.model['id'] : ''
      });

      return this.pocketBase.authStore.isValid;
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      return false;
    }
  }

  public async getUsers(): Promise<User[]> {
    try {
      const result = await this.pocketBase.collection('users').getFullList();
      console.log('result', result);
      if (result.length > 0) {
        return result as unknown as User[];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      return [];
    }
    return [];
  }

  public async getUsernameById(userId: string): Promise<User> {
    try {
      
      const result =  await this.pocketBase.collection('users').getOne(userId);
      return { username: result['username'], isValid: true, authModel: result['authModel'], token: '', id: result['id'] };

    } catch (error) {
      console.error('Erreur lors de la récupération de l\'username :', error);
      return { username: '', isValid: false, authModel: null, token: '', id: ''};
    }
  }

  public logout(): void {
    this.pocketBase.authStore.clear();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
  
}
