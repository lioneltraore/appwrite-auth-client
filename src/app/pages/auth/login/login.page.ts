import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent, IonButton, IonList, IonItem, IonInput } from '@ionic/angular/standalone';
import { User } from 'src/app/models/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonList, IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class LoginPage implements OnInit {

  fb = inject(FormBuilder);
  feedbackService = inject(FeedbackService);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.group({
    email: ['foo@mail.com', [Validators.required]],
    password: ['foo', [Validators.required]]
  });

  constructor() {}

  ngOnInit() {
    console.log('[NgOnInit Method] Init Success');
  }

  login(): void {
    console.log(`[Login Method] form data = ${JSON.stringify(this.form.getRawValue())}`);
    const user: User = this.form.getRawValue() as User;

    this.authService.login(user.email, user.password).subscribe({
      next: () => user.password === 'foo' ? this.router.navigateByUrl('/') : this.feedbackService.presentToast('Login error', 'top', 'danger'),
      error: () => this.feedbackService.presentToast('Login error', 'top', 'danger')
    })
  }
}
