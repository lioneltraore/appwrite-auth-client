import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent, IonButton, IonList, IonItem, IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';

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
    IonInputPasswordToggle,
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
  }
}
