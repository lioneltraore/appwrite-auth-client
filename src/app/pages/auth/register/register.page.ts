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
  IonCardContent, IonButton, IonList, IonItem, IonInput, IonButtons, IonBackButton, IonLabel } from '@ionic/angular/standalone';
import { User } from 'src/app/models/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { matchPassword } from './match-password.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonInput, IonItem, IonList, IonButton,
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
    console.log(`[Register Method] form data = ${JSON.stringify(this.registerForm.getRawValue())}`);
    // const user: User = this.form.getRawValue() as User;

    // this.authService.login(user.email, user.password).subscribe({
    //   next: () => user.password === 'foo' ? this.router.navigateByUrl('/') : this.feedbackService.presentToast('Login error', 'top', 'danger'),
    //   error: () => this.feedbackService.presentToast('Login error', 'top', 'danger')
    // })
  }
}
