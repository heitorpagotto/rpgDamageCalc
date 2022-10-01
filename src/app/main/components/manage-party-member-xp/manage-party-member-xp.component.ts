import { DemonPartyMember } from 'src/shared/models/all-models';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemonServiceService } from 'src/app/services/demon-service.service';

@Component({
  selector: 'app-manage-party-member-xp',
  templateUrl: './manage-party-member-xp.component.html',
  styleUrls: ['./manage-party-member-xp.component.css'],
})
export class ManagePartyMemberXpComponent implements OnInit {
  public experienceNumber: number;

  public shouldShowLevelUp: boolean = false;

  public statNumber: number = 0;

  public get progressBarValue() {
    return (this.data.currentEXP * 100) / this.data.totalEXP;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DemonPartyMember,
    private demonService: DemonServiceService
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  public AddEXP(): void {
    const summedXP = this.data.currentEXP + this.experienceNumber;
    if (summedXP < this.data.totalEXP) {
      this.data.currentEXP = summedXP;
    } else {
      while (summedXP >= this.data.totalEXP) {
        let expDifference = summedXP - this.data.totalEXP;
        this.shouldShowLevelUp = true;
        this.data.level++;
        this.statNumber++;
        this.data.currentEXP = 0;
        this.data.totalEXP = Math.round(this.data.totalEXP * 1.5);
        if (expDifference >= 0) {
          this.data.currentEXP = expDifference;
        }
      }
    }
  }

  public HandleStatDistribution($event: number): void {
    this.statNumber;
  }

  public get usedAvaliableStats(): boolean {
    return this.statNumber === 0;
  }
}
