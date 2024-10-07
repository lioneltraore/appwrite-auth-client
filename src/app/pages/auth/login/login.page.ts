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
  IonCardContent, IonButton, IonList, IonItem, IonInput, IonButtons, IonBackButton, IonSpinner } from '@ionic/angular/standalone';
import { User } from 'src/app/models/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonBackButton, IonButtons, IonInput, IonItem, IonList, IonButton,
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
    ReactiveFormsModule,
    RouterLink
  ],
})
export class LoginPage implements OnInit {

  fb = inject(FormBuilder);
  feedbackService = inject(FeedbackService);
  authService = inject(AuthService);
  router = inject(Router);

  isLoading = false;

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
    this.isLoading = true;
    this.authService.login(user.email, user.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        this.router.navigateByUrl('/');
      },
      error: (res) => {
        this.isLoading = false;
        this.feedbackService.presentToast(res.message || 'Login error', 'top', 'danger');
      }
    })
  }
}
