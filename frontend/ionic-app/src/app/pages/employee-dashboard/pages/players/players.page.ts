import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UserRedirectService } from 'src/app/services/user-redirect.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  constructor(private apiService: ApiService) { }

  playerData: any;

  ngOnInit() {
    this.apiService.getAll('player')
    .then((playerData: any) => {
      this.playerData = playerData.data;
    })
    .catch((error) => {
      console.error('Error retrieving player data:', error);
    });
  }

  addPlayer(){
    this.apiService.add('player', {name: 'New Player'}).then(
      (response: any) => {
        console.log('Player added:', response);
      }
    ).catch((error) => {
      console.error('Error adding player:', error);
    })
  }

  handleDelete(id:number) {
    this.apiService.delete('player', id).then(
      (response: any) => {
        console.log('Player deleted:', response);
      }
    ).catch((error) => {
      console.error('Error deleting player:', error);
    })
  }
}
