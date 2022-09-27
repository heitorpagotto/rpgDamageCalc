import { ManagePartyMemberXpComponent } from './../manage-party-member-xp/manage-party-member-xp.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttackService } from 'src/app/services/attack.service';
import { DemonServiceService } from 'src/app/services/demon-service.service';
import { BUFFS } from 'src/shared/constants/BUFFS';
import { DEBUFFS } from 'src/shared/constants/DEBUFFS';
import {
  AttackResponse,
  BuffModel,
  DemonPartyMember,
  PhysicalAttackRequest,
} from 'src/shared/models/all-models';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
})
export class CombatComponent implements OnInit {
  public partyMembers: DemonPartyMember[] = [];
  public selectedMember?: DemonPartyMember;

  public attackResult?: AttackResponse;

  public buffs = BUFFS;
  public debuffs = DEBUFFS;

  public combatDamageForm: UntypedFormGroup;

  @ViewChild('skills') skills: MatSelectionList;

  constructor(
    private demonService: DemonServiceService,
    private attackService: AttackService,
    private _snackBar: MatSnackBar,
    private _modal: MatDialog
  ) {}

  ngOnInit() {
    this.getAllDemons();
    this.initForm(new PhysicalAttackRequest());
  }

  public selectDemon(demon: DemonPartyMember): void {
    this.selectedMember = demon;
  }

  public returnToDemonList(): void {
    this.selectedMember = undefined;
    this.attackResult = undefined;
    this.getAllDemons();
  }

  public getAllDemons(): void {
    this.demonService.getAllDemons().subscribe((response) => {
      this.partyMembers = response;
    });
  }

  public openXPModal(currentXP: number, totalXP: number): void {
    this._modal.open(ManagePartyMemberXpComponent, {
      data: { currentXP: currentXP, totalXP: totalXP },
    });
  }

  private initForm(model: PhysicalAttackRequest): void {
    this.combatDamageForm = new UntypedFormGroup({
      player: new UntypedFormControl(model.player),
      skill: new UntypedFormControl(model.skill),
      isFocus: new UntypedFormControl(model.isFocus),
      isMultiple: new UntypedFormControl(model.isMultiple),
      isWeakness: new UntypedFormControl(model.isWeakness),
      enemyQuantity: new UntypedFormControl(model.enemyQuantity),
      buffs: new UntypedFormControl(model.buffs),
      debuffs: new UntypedFormControl(model.debuffs),
    });
  }

  public attack(): void {
    if (this.combatDamageForm.valid) {
      this.combatDamageForm.patchValue({
        player: this.selectedMember,
        skill: this.skills.selectedOptions.selected[0]?.value,
        buffs: this.getSelectedBuffs(),
        debuffs: this.getSelectedDeBuffs(),
      });

      const fullValue = this.combatDamageForm.value as PhysicalAttackRequest;

      if (fullValue.skill === null || fullValue.skill === undefined) {
        this._snackBar.open('Select a skill.');
      } else {
        this.attackResult = this.attackService.attack(fullValue);
        // TODO: show attack result animation and redirect the user to the demon select page
      }
    } else {
      this.combatDamageForm.markAllAsTouched();
    }
  }

  private getSelectedBuffs(): BuffModel[] {
    return this.buffs.filter((x) => x.selected === true);
  }

  private getSelectedDeBuffs(): BuffModel[] {
    return this.debuffs.filter((x) => x.selected === true);
  }
}
