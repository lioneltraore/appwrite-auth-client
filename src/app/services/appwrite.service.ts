import { Injectable } from '@angular/core';
import { Client } from 'appwrite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  appwriteProjectID = environment.appwriteProjectID;
  appwriteUrl = environment.appwriteUrl;

  private client!: Client;

  constructor() {
    this.init();
  }

  init() {
    this.client = new Client();
    this.client
      .setEndpoint(this.appwriteUrl)
      .setProject(this.appwriteProjectID);
  }
}
