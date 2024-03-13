import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UserRedirectService } from 'src/app/services/user-redirect.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-dashboard',
  templateUrl: './player-dashboard.page.html',
  styleUrls: ['./player-dashboard.page.scss'],
})
export class PlayerDashboardPage implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private userRedirectService: UserRedirectService
  ) {}

  @ViewChild('popover') popover : any;
  isOpen = false;

  gameData: any;
  matchData: any;

  //docs have note: listen for ionPopoverDidDismiss or didDismiss event and set isOpen to false
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
 

  ngOnInit() {
    this.apiService
      .getUser()
      .then((userDetails: any) => {
        this.userRedirectService.redirectLoggedUser(userDetails);
      })
      .catch((error) => {
        this.userRedirectService.redirectToLandingPage();
        console.error('Error retrieving user details:', error);
      });

    this.apiService.getAll('game').then((gameData: any) => {
      this.gameData = gameData;
      console.log(this.gameData);
    });

    this.apiService.getAll('match/pending').then((matchData: any) => {
      this.matchData = matchData;
      console.log(this.matchData);
    });
  }

  async navigateTo(route: string) {
    // Close the popover
    // await this.popoverController.dismiss();

    // Navigate to the specified route

    
    this.popover.dismiss();
    switch (route) {
      case 'deposit':
        this.router.navigate(['/deposit']);
        break;
      case 'withdraw':
        this.router.navigate(['/withdraw']);
        break;
      case 'account':
        this.router.navigateByUrl('/player-account');
        break;
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      case 'transaction-history':
        this.router.navigate(['/transaction-history']);
        break;
      case 'bet-history':
        this.router.navigate(['/bet-history']);
        break;
      default:
        break;
    }
    
  }
}
