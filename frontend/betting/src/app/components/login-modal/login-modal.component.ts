import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, FormsModule],
  standalone: true,
})
export class LoginModalComponent  implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name?: string;


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  alertButtons = ['Action'];
}
