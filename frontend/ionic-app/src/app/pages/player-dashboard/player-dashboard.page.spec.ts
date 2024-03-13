import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerDashboardPage } from './player-dashboard.page';

describe('PlayerDashboardPage', () => {
  let component: PlayerDashboardPage;
  let fixture: ComponentFixture<PlayerDashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlayerDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
