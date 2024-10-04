import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonGrid, IonCol } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);

  constructor() { }

  ngOnInit() {
    console.log('[NgOnInit Method] Init Success');
  }

  logout(): void {
    console.log('[Logout Method] Button clicked');
    this.authService.logout();
  }

  login() {
    this.router.navigateByUrl('/login');
  }

}
