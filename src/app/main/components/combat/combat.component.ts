import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AttackService } from 'src/app/services/attack.service';
import { DemonServiceService } from 'src/app/services/demon-service.service';
import { BUFFS } from 'src/shared/constants/BUFFS';
import { DEBUFFS } from 'src/shared/constants/DEBUFFS';
import { EElementTypes, ESkillTypes } from 'src/shared/models/all-enums';
import {
  AttackResponse,
  BuffModel,
  DemonPartyMember,
  PhysicalAttackRequest,
  Skill,
} from 'src/shared/models/all-models';
import { ManagePartyMemberXpComponent } from './../manage-party-member-xp/manage-party-member-xp.component';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
})
export class CombatComponent implements OnInit {
  public selectedSkill: Skill[];
  public partyMembers: DemonPartyMember[] = [];
  public selectedMember?: DemonPartyMember;

  public attackResult?: AttackResponse;

  public attackResults?: AttackResponse[];

  public buffs = BUFFS;
  public debuffs = DEBUFFS;

  public combatDamageForm: UntypedFormGroup;

  @ViewChild('skills') skills: MatSelectionList;

  constructor(
    private demonService: DemonServiceService,
    private attackService: AttackService,
    private _snackBar: MatSnackBar,
    private _modal: MatDialog,
    private _router: Router
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

  public selectSkill(skill: Skill[]): void {
    const skillSelected = skill[0];

    if (skillSelected) {
      this.selectedSkill = [skillSelected];
      if (skillSelected.skillType === ESkillTypes.Magic) {
        this.combatDamageForm.get('isWeakness')?.enable();
      } else {
        this.combatDamageForm.get('isWeakness')?.disable();
      }
    }
  }

  public getAllDemons(): void {
    this.demonService.getAllDemons().subscribe((response) => {
      this.partyMembers = response;
    });
  }

  public openXPModal(partyMember: DemonPartyMember): void {
    this._modal.open(ManagePartyMemberXpComponent, {
      data: partyMember,
    });
  }

  private initForm(model: PhysicalAttackRequest): void {
    this.combatDamageForm = new FormGroup({
      player: new FormControl(model.player),
      skill: new FormControl(model.skill),
      isFocus: new FormControl(model.isFocus),
      isMultiple: new FormControl(model.isMultiple),
      isWeakness: new FormControl({ value: model.isWeakness, disabled: true }),
      enemyQuantity: new FormControl(model.enemyQuantity),
      buffs: new FormControl(model.buffs),
      debuffs: new FormControl(model.debuffs),
    });
  }

  public attack(): void {
    if (this.combatDamageForm.valid && this.selectedSkill[0]) {
      this.combatDamageForm.patchValue({
        player: this.selectedMember,
        skill: this.selectedSkill[0],
        buffs: this.getSelectedBuffs(),
        debuffs: this.getSelectedDeBuffs(),
      });

      const fullValue = this.combatDamageForm.value as PhysicalAttackRequest;

      if (fullValue.skill === null || fullValue.skill === undefined) {
        this._snackBar.open('Select a skill.');
      } else {
        if (fullValue.isMultiple) {
          for (let i = 0; i < fullValue.enemyQuantity; i++) {
            this.attackResults?.push(this.attackService.attack(fullValue));
          }
        } else {
          this.attackResult = this.attackService.attack(fullValue);
        }
        if (this.selectedSkill[0].skillElement === EElementTypes.Support) {
          this.returnToDemonList();
        }
        this.selectedSkill = [];
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
