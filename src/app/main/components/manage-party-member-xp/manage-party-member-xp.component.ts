import { DemonPartyMember } from 'src/shared/models/all-models';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  public get progressBarValue() {
    return (this.data.currentEXP * 100) / this.data.totalEXP;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DemonPartyMember,
    private demonService: DemonServiceService,
    private _dialog: MatDialog
  ) {}

  ngOnInit() {
    this.previousLevel = this.data.level;
    this.saveOnClose();
  }

  saveOnClose(): void {
    const ref = this._dialog.getDialogById('mat-dialog-0');

    ref?.afterClosed().subscribe((result) => {
      this.saveAlterations();
    });
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

  public saveAlterations(): void {
    if (this.data.level > this.previousLevel) {
      this.data.totalHP = (this.data.level + this.data.stats.EN) * 6;
      this.data.totalMP = (this.data.level + this.data.stats.MA) * 4;

      this.data.currentHP = this.data.totalHP;
      this.data.currentMP = this.data.totalMP;
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
    // TODO: change this logic to use temporaty stats instead of replacing directly on data

    switch (stat) {
      case 'ST':
        this.data.stats.ST = statValue;
        break;
      case 'MA':
        this.data.stats.MA = statValue;
        break;
      case 'EN':
        this.data.stats.EN = statValue;
        break;
      case 'AG':
        this.data.stats.AG = statValue;
        break;
      case 'LU':
        this.data.stats.LU = statValue;
        break;
    }
  }

  public get usedAvaliableStats(): boolean {
    return this.statNumber === 0;
  }
}
