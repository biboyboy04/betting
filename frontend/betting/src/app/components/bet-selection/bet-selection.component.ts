import {
  Component,
  OnInit,
  inject,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  IonIcon,
  IonContent,
  IonGrid,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton, IonFooter } from '@ionic/angular/standalone';
import { MatchCardDetailsComponent } from '../match-card-details/match-card-details.component';
import { MatchService } from 'src/app/services/match.service';
import { BetMenuComponent } from '../bet-menu/bet-menu.component';
import { MenuController } from '@ionic/angular/standalone';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-bet-selection',
  templateUrl: './bet-selection.component.html',
  styleUrls: ['./bet-selection.component.scss'],
  standalone: true,
  imports: [IonFooter, 
    NgxPaginationModule,
    MatchCardDetailsComponent,
    IonIcon,
    IonButton,
    IonCardTitle,
    IonCardHeader,
    IonContent,
    IonGrid,
    IonCard,
    IonCardContent,
    BetMenuComponent
  ],
})
export class BetSelectionComponent implements OnInit {
  @Input() matchData: any;
  matchService = inject(MatchService);

  private menuCtrl = inject(MenuController);
  matches: any[] = [];
  // ID's storeage
  selectedMatch: any;
  p: number = 1;
  total: any;
  constructor() {}
  ngOnInit() {
    this.matches = this.matchData
  }


  ngOnChanges(changes: SimpleChanges) {

    if (changes['matchData'].firstChange) {
      return;
    }
    const newValue = changes['matchData'].currentValue;
    this.matchData = newValue;
    this.matches = this.matchData

  }

  openBetMenu() {
    this.menuCtrl.open('bet-menu');
  }

  handleData(data: any) {
    this.selectedMatch = data;
    this.openBetMenu();
    console.log(data)
  }

  
  handlePageChange(page: any) {
    this.p = page;
    this.matchService.getAllDetails(page, 25).subscribe((data) => {
      // this.betData = data;
    });
  }

}
 