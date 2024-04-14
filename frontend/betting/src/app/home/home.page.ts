
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';
import { searchOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSearchbar, IonButtons, IonItem, IonIcon, IonModal, FormsModule, LoginModalComponent],
})
export class HomePage {

  playerData: any;
  authService = inject(AuthenticationService);
  constructor(private modalCtrl: ModalController) {
    addIcons({ searchOutline });
  }

 ngOnInit(){ 
    this.authService.getUser().subscribe((data:any) => {
      this.authService.redirectLoggedUser(data);
    })
  }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent
    });
    modal.present();
  }

  async openSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: SignupModalComponent
    });
    modal.present();
  }

}
