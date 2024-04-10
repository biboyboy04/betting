import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonRadioGroup,
  IonItem,
  IonRadio,
  IonInput,
  ModalController,
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { close } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LoginUser } from 'src/app/interface/login-user';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  imports: [
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonRadioGroup,
    IonItem,
    IonRadio,
    IonInput,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class LoginModalComponent implements OnInit {
  toast = inject(ToastController);
  private router = inject(Router);
  private modalCtrl = inject(ModalController);
  private auth = inject(AuthenticationService);
  isToastOpen = false;
  constructor() {

  }

  ngOnInit() {
    addIcons({ close });
  }
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  userDataForm = new FormGroup({
    userType: new FormControl('player', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  close() {
    console.log(this.userDataForm.value);
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  handleLogin() {
    const { userType, username, password } = this.userDataForm.value;

    const user: LoginUser = {
      username: username!,
      password: password!,
    };

    console.log(user)
    if (userType === 'player') {
      this.auth.loginPlayer(user).subscribe((data) => {
        console.log(data);
        this.presentSuccessToast('Login Successful');
        this.router.navigate(['/user-dashboard']);
      },
      (err) => {
         console.log(err)
        this.presentErrorToast(err.error.message);
      }
      );
    } else {
      this.auth.loginEmployee(user).subscribe((data) => {
        this.presentSuccessToast('Login Successful');
        this.router.navigate(['/employee-dashboard']);
        console.log(data);
      },
      (err) => {
        console.log(err)
        this.presentErrorToast(err.error.message);
      });
    }
  }

  confirm() {
    return this.modalCtrl.dismiss(this.handleLogin(), 'confirm');
  }

  async presentErrorToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      position: 'top',
      duration: 3000,
      color: 'danger',
    });
    toast.present();
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      position: 'top',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}
