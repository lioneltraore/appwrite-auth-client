import { Injectable } from '@angular/core';
import { Client, ID, Account } from 'appwrite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  appwriteProjectID = environment.appwriteProjectID;
  appwriteUrl = environment.appwriteUrl;

  private account!: Account;

  constructor() {
    this.init();
  }

  init() {
    const client = new Client();
    client.setEndpoint(this.appwriteUrl).setProject(this.appwriteProjectID);
    this.account = new Account(client);
  }

  async createAccount(email: string, password: string) {
    await this.account.create(ID.unique(), email, password);
  }

  async authenticate(email: string, password: string) {
    await this.account.createEmailPasswordSession(email, password);
    return await this.account.get();
  }

  async closeSession() {
    await this.account.deleteSession('current');
  }
}
