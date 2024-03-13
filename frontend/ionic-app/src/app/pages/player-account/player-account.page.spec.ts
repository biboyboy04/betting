import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerAccountPage } from './player-account.page';

describe('PlayerAccountPage', () => {
  let component: PlayerAccountPage;
  let fixture: ComponentFixture<PlayerAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlayerAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
