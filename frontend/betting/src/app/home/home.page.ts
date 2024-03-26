
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, FormsModule, LoginModalComponent],
})
export class HomePage {
  private auth = inject(AuthenticationService);

  playerData: any;
  constructor(private modalCtrl: ModalController) {
    console.log(modalCtrl);
  }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
      cssClass: 'modal'
    });
    modal.present();
  }

  async openSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: SignupModalComponent,
      cssClass: 'modal'
    });
    modal.present();
  }

}
