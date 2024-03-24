import { Component, OnInit } from '@angular/core';
import { IonRadio, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, IonLabel, ModalController, IonListHeader, IonDatetime, IonDatetimeButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
  imports: [IonDatetimeButton, IonDatetime, IonList, IonRadio, IonListHeader, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, FormsModule, IonLabel],
  standalone: true,
})
export class SignupModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  userData: any = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    userType: ''
  };

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name?: string;


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  alertButtons = ['Action'];

  ngOnInit() {}

}
