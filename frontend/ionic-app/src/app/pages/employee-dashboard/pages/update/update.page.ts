import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  userForm: FormGroup | any;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}
  playerId: any;
  playerData: any;

  ngOnInit() {
    this.playerId = Number(this.route.snapshot.params['id']);
    this.apiService
      .getById('player', this.playerId)
      .then((player: any) => {
        console.log(player.data[0]);
        this.playerData = player.data[0];
        this.userForm = this.formBuilder.group({
          balance: [this.playerData?.balance, Validators.required],
          date_of_birth: [this.playerData?.date_of_birth || null, Validators.required],
          email: [this.playerData?.email || null, [Validators.required, Validators.email]],
          first_name: [this.playerData?.first_name || null, Validators.required],
          last_name: [this.playerData?.last_name || null, Validators.required],
          nationality: [this.playerData?.nationality || null, Validators.required],
          username: [this.playerData?.username || null, Validators.required],
        });
      })
      .catch((error) => {
        console.error('Error retrieving player data:', error);
      });
    console.log(this.playerData);

    
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.userForm.value.password = this.playerData.password;
      console.log(this.userForm.value, 'Form submitted');
      this.apiService.update('player', this.playerId, this.userForm.value).then((response: any) => {
        console.log('Player updated:', response);
      })
    } else {
      // Handle invalid form
    }
  }
}
