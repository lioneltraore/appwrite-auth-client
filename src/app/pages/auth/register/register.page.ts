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
  IonCardContent, IonButton, IonList, IonItem, IonInput, IonButtons, IonBackButton, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { matchPassword } from './match-password.validator';
import { CreateUser } from 'src/app/models/create-user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage implements OnInit {
  fb = inject(FormBuilder);
  feedbackService = inject(FeedbackService);
  authService = inject(AuthService);
  router = inject(Router);
  isLoading = false;

  registerForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    passwordConfirm: ['', [Validators.required]],
  },{
    validators: matchPassword
  });


  constructor() {
  }

  ngOnInit(): void {
    console.log('[NgOnInit Method] Init Success');
  }

  register(): void {

    console.log('[Register Method] form :: ', this.registerForm);
    const userData: CreateUser = this.registerForm.getRawValue() as CreateUser;
    console.log(`[Register Method] userData = ${JSON.stringify(userData)}`);

    if(!this.registerForm.valid) {
      this.feedbackService.presentToast('Form invalid', 'top', 'danger');
      return;
    }

    this.isLoading = true;

    this.authService.register(userData.email, userData.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('rsponse:: ', res);
      },
      error: (err) => {
        this.isLoading = false;
        this.feedbackService.presentToast(err.message || 'Registration error', 'top', 'danger');
      }
    })
  }
}
