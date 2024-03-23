
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import {TestComponent} from '../components/test/test.component';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, FormsModule, TestComponent, LoginModalComponent],
})
export class HomePage {
  private api  = inject(ApiService);
  @ViewChild(IonModal) modal!: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name?: string;

  showModal: boolean = true;

  async openModal() {
    const modall = await this.modalCtrl.create({
      component: LoginModalComponent,
    });
    modall.present();
  }

  closeModal() {
    this.showModal = false;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  playerData: any;

  alertButtons = ['Action'];
  constructor(private modalCtrl: ModalController) {
    this.getUsers();
  }
  getUsers() {
    return this.api.getUsers().subscribe((data) => {
      console.log(data);
    })
  }
}
