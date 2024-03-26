import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonText,
  IonRadio,
  IonList,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonSearchbar,
  IonButtons,
  IonItem,
  IonIcon,
  IonModal,
  IonLabel,
  ModalController,
  IonListHeader,
  IonDatetime,
  IonDatetimeButton,
  IonToast,
  ToastController,
} from '@ionic/angular/standalone';
import { close } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
  imports: [
    IonToast,
    IonText,
    IonDatetimeButton,
    IonDatetime,
    IonList,
    IonRadio,
    IonListHeader,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonSearchbar,
    IonButtons,
    IonItem,
    IonIcon,
    IonModal,
    FormsModule,
    IonLabel,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class SignupModalComponent implements OnInit {
  toast = inject(ToastController);
  route = inject(Router);
  auth = inject(AuthenticationService);
  modalCtrl = inject(ModalController);
  isToastOpen = false;
  constructor() {
    addIcons({ close });
  }

  playerDetailsForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    date_of_birth: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
  });

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

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  signup() {
    // Extract only the date from the datetime input
    this.playerDetailsForm.value.date_of_birth =
      this.playerDetailsForm.value.date_of_birth?.split('T')[0];

    this.auth.signupPlayer(this.playerDetailsForm.value).subscribe(
      (data) => {
        console.log(data);
        this.presentSuccessToast('Successfully Signed up!');
        this.modalCtrl.dismiss(null, 'cancel');
      },
      (err) => {
        this.playerDetailsForm.reset();
        this.presentErrorToast(err.error);
       
      }
    );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  alertButtons = ['Action'];

  ngOnInit() {}
}
