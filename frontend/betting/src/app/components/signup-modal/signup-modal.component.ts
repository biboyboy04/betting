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
import { PlayerService } from 'src/app/services/player.service';
import { NewPlayer } from 'src/app/interface/new-player';

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
  playerService = inject(PlayerService);
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

    const {
      username,
      password,
      email,
      first_name,
      last_name,
      date_of_birth,
      nationality,
    } = this.playerDetailsForm.value;

    const newPlayer: NewPlayer = {
      username: username!,
      password: password!,
      email: email!,
      first_name: first_name!,
      last_name: last_name!,
      date_of_birth: date_of_birth!,
      nationality: nationality!,
    };

    console.log(newPlayer);

    this.playerService.add(newPlayer).subscribe(
      (data) => {
        console.log(data);
        this.presentSuccessToast('Successfully Signed up!');
        this.modalCtrl.dismiss(null, 'cancel');
      },
      (err) => {
        this.playerDetailsForm.reset();
        console.log(err)
        this.presentErrorToast(err.error);
      }
    );
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}
}
