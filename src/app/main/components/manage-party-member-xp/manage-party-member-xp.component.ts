import { DemonPartyMember, DemonStats } from 'src/shared/models/all-models';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemonServiceService } from 'src/app/services/demon-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-party-member-xp',
  templateUrl: './manage-party-member-xp.component.html',
  styleUrls: ['./manage-party-member-xp.component.css'],
})
export class ManagePartyMemberXpComponent implements OnInit {
  public experienceNumber: number;

  public shouldShowLevelUp: boolean = false;

  public statNumber: number = 0;

  public previousLevel: number;

  public previousStats: DemonStats;

  public get progressBarValue() {
    return (this.data.currentEXP * 100) / this.data.totalEXP;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DemonPartyMember,
    private demonService: DemonServiceService,
    private _dialogRef: MatDialogRef<ManagePartyMemberXpComponent>
  ) {
    _dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.previousLevel = this.data.level;
    this.previousStats = structuredClone(this.data.stats);
    this.saveOnClose();
  }

  saveOnClose(): void {
    this._dialogRef.afterClosed().subscribe((result) => {
      this.saveAlterations();
    });
  }

  public AddEXP(): void {
    const summedXP = this.data.currentEXP + this.experienceNumber;
    if (summedXP < this.data.totalEXP) {
      this.data.currentEXP = summedXP;
      this._dialogRef.close();
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

  public saveAlterations(): void {
    if (this.data.level > this.previousLevel) {
      this.data.totalHP = (this.data.level + this.data.stats.EN) * 6;
      this.data.totalMP = (this.data.level + this.data.stats.MA) * 4;

      this.data.currentHP = this.data.totalHP;
      this.data.currentMP = this.data.totalMP;

      this.data.stats = this.previousStats;
    }
    this.demonService.updateDemon(this.data).subscribe((response) => {});
  }

  public HandleStatDistribution(statOperation: string): void {
    if (statOperation === 'plus') {
      this.statNumber--;
    } else {
      this.statNumber++;
    }
  }

  public HandleStatValueDistribution(stat: string, statValue: number): void {
    switch (stat) {
      case 'ST':
        this.previousStats.ST = statValue;
        break;
      case 'MA':
        this.previousStats.MA = statValue;
        break;
      case 'EN':
        this.previousStats.EN = statValue;
        break;
      case 'AG':
        this.previousStats.AG = statValue;
        break;
      case 'LU':
        this.previousStats.LU = statValue;
        break;
    }
  }

  public get usedAvaliableStats(): boolean {
    return this.statNumber === 0;
  }
}
