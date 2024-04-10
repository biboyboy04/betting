import { Component, OnInit, inject, Input, SimpleChanges } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
  ],
  standalone: true
})
export class TeamModalComponent  implements OnInit {
  constructor() { }
  @Input() type: any;
  @Input() data: any;
  teamService = inject(TeamService);
  modalCtrl = inject(ModalController);

  teamData = {
    id: 0,
    name: ''
  };

  ngOnInit() {
    if (this.type === 'Edit') {
      this.teamData = this.data;
    }
  }

  submit() {
    if (this.type === 'Add') {
      this.teamService.add(this.teamData.name).subscribe((res) => {
        console.log(res);
      });
    } else if (this.type === 'Edit') {
      this.teamService.update(this.teamData).subscribe((res) => {
        console.log(res);
      });
    }
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
