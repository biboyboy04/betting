import { Component, NgModule, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppComponent {
  constructor() {}
  // Use matchMedia to check the user preference

}
