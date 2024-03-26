import { Component, OnInit, inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  ModalController
} from '@ionic/angular/standalone';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  imports: [
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
  ],
  standalone: true,
})
export class LoginModalComponent implements OnInit {
  private router = inject(Router);
  private modalCtrl = inject(ModalController);
  private auth = inject(AuthenticationService);
  constructor() {}

  ngOnInit() {}
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  userData: any = {
    userType: '',
    username: '',
    password: '',
  };

  userType: string = "player";
  username: string = "";
  password: string = "";

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  handleLogin(userType: string) {
    if(userType === 'player') {
      this.auth.loginPlayer(this.username, this.password).subscribe((data) => {
        console.log(data)
        this.router.navigate(['/user-dashboard']);
      })
    }
    else {
      this.auth.loginEmployee(this.username, this.password).subscribe((data) => {
        console.log(data)
      })
    }
  }


  confirm() {
    return this.modalCtrl.dismiss(this.handleLogin(this.userType), 'confirm');

    //simple fetct post
    // fetch('http://localhost:5555/player/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: this.username,
    //     password: this.password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

  }

}
