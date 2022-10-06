import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HEALING_SKILLS } from 'src/shared/constants/HEALING_SKILLS';
import { PASSIVE_SKILLS } from 'src/shared/constants/PASSIVE_SKILLS';
import { SKILL_ELEMENT_TYPES } from 'src/shared/constants/SKILL_ELEMENTS';
import { SKILL_LEVELS } from 'src/shared/constants/SKILL_LEVELS';
import { SKILL_TYPES } from 'src/shared/constants/SKILL_TYPES';
import { EElementTypes } from 'src/shared/models/all-enums';
import {
  HealingSkill,
  ModalSkillEdit,
  PassiveSkill,
  Skill,
} from './../../../../shared/models/all-models';

@Component({
  selector: 'app-add-member-skill',
  templateUrl: './add-member-skill.component.html',
  styleUrls: ['./add-member-skill.component.css'],
})
export class AddMemberSkillComponent implements OnInit {
  public skillLevels = SKILL_LEVELS;

  public elementTypes = SKILL_ELEMENT_TYPES;
  public skillTypes = SKILL_TYPES;

  public passiveSkills = PASSIVE_SKILLS;
  public healingSkills = HEALING_SKILLS;

  public skillForm: FormGroup;

  public shouldShowOnlyHealing: boolean;
  public shouldShowOnlyPassive: boolean;

  skill?: Skill;

  constructor(
    public dialogRef: MatDialogRef<AddMemberSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalSkillEdit
  ) {
    this.skill = data.skill;
    if (this.skill?.skillElement === EElementTypes.Healing) {
      this.shouldShowOnlyHealing = true;
      this.shouldShowOnlyPassive = false;
    }
    if (this.skill?.skillElement === EElementTypes.Passive) {
      this.shouldShowOnlyHealing = false;
      this.shouldShowOnlyPassive = true;
    }
  }

  ngOnInit() {
    let skillModel = new Skill();
    if (this.skill) {
      skillModel = this.skill;
    }
    this.initForm(skillModel);
  }

  close(skill?: Skill): void {
    if (skill) {
      this.dialogRef.close(skill);
    } else {
      this.dialogRef.close();
    }
  }

  initForm(model: Skill): void {
    this.skillForm = new FormGroup({
      id: new FormControl(model.id),
      name: new FormControl(model.name, [Validators.required]),
      description: new FormControl(model.description, [Validators.required]),
      diceRollLevel: new FormControl(model.diceRollLevel, [
        Validators.required,
      ]),
      cost: new FormControl(model.cost, [Validators.required]),
      skillType: new FormControl(model.skillType, [Validators.required]),
      skillElement: new FormControl(model.skillElement, [Validators.required]),
      skillPower: new FormControl(model.skillPower, [Validators.required]),
      passiveSkillId: new FormControl(model.passiveSkillId, []),
      passiveSkill: new FormControl(model.passiveSkill, []),
      healingSkillId: new FormControl(model.healingSkillId, []),
      healingSkill: new FormControl(model.healingSkill, []),
    });
  }

  controlFormValidators(skillElement: EElementTypes): void {
    if (skillElement === EElementTypes.Healing) {
      this.skillForm.clearValidators();
      this.skillForm.get('healingSkill')?.addValidators(Validators.required);
      this.skillForm.get('skillType')?.addValidators(Validators.required);
      this.skillForm.get('skillElement')?.addValidators(Validators.required);

      this.shouldShowOnlyHealing = true;
      this.shouldShowOnlyPassive = false;
    } else if (skillElement === EElementTypes.Passive) {
      this.skillForm.clearValidators();
      this.skillForm.get('passiveSkill')?.addValidators(Validators.required);
      this.skillForm.get('skillType')?.addValidators(Validators.required);
      this.skillForm.get('skillElement')?.addValidators(Validators.required);
      this.shouldShowOnlyHealing = false;
      this.shouldShowOnlyPassive = true;
    } else {
      this.skillForm.clearValidators();
      this.skillForm.get('name')?.addValidators(Validators.required);
      this.skillForm.get('description')?.addValidators(Validators.required);
      this.skillForm.get('diceRollLevel')?.addValidators(Validators.required);
      this.skillForm.get('cost')?.addValidators(Validators.required);
      this.skillForm.get('skillType')?.addValidators(Validators.required);
      this.skillForm.get('skillPower')?.addValidators(Validators.required);
      this.skillForm.get('skillElement')?.addValidators(Validators.required);
      this.shouldShowOnlyHealing = false;
      this.shouldShowOnlyPassive = false;
    }
    this.skillForm.updateValueAndValidity();
  }

  addSkill(): void {
    if (this.shouldShowOnlyHealing) {
      const healing = this.healingSkills.find(
        (x) => x.id === this.skillForm.get('healingSkillId')?.value
      ) as HealingSkill;

      this.skillForm.patchValue({
        name: healing.name,
        skillType: 3,
        description: healing.description,
        diceRollLevel: healing.diceRollLevel,
        skillPower: 0,
        cost: healing.cost,
        healingSkill: healing,
      });
    }

    if (this.shouldShowOnlyPassive) {
      const passive = this.passiveSkills.find(
        (x) => x.id === this.skillForm.get('passiveSkillId')?.value
      ) as PassiveSkill;

      this.skillForm.patchValue({
        name: passive.name,
        skillType: 3,
        description: passive.description,
        diceRollLevel: 0,
        skillPower: 0,
        cost: 0,
        passiveSkill: passive,
      });
    }

    const skill = this.skillForm.value as Skill;

    if (this.skillForm.valid) {
      this.skill = skill;
      this.close(skill);
    } else {
      this.skillForm.markAllAsTouched();
    }
  }
}
