import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { User } from '../../../interfaces/user';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  public async login(username: string, password: string): Promise<boolean> {
    const pocketbase = new PocketBase(environment.baseUrl);
    const user = await pocketbase.collection('users').authWithPassword(username, password);
    this.userSubject.next({ isValid : pocketbase.authStore.isValid, authModel : pocketbase.authStore.model, token : pocketbase.authStore.token});
    return pocketbase.authStore.isValid;
  }
}
