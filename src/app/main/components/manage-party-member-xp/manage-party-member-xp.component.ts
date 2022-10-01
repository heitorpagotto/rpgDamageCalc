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

  public async AddEXP(): Promise<void> {
    let expDifference = this.experienceNumber - this.data.currentEXP;

    const summedXP = this.data.currentEXP + this.experienceNumber;
    while (summedXP > this.data.totalEXP) {
      this.data.level++;
      this.statNumber++;
      this.data.totalEXP = this.data.totalEXP * 1.5;
      this.data.currentEXP = expDifference;
    }
  }
}
