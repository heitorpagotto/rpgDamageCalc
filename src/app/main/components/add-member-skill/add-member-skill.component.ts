import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SKILL_ELEMENT_TYPES } from 'src/shared/constants/SKILL_ELEMENTS';
import { SKILL_LEVELS } from 'src/shared/constants/SKILL_LEVELS';
import { SKILL_TYPES } from 'src/shared/constants/SKILL_TYPES';
import { ModalSkillEdit, Skill } from './../../../../shared/models/all-models';

@Component({
  selector: 'app-add-member-skill',
  templateUrl: './add-member-skill.component.html',
  styleUrls: ['./add-member-skill.component.css'],
})
export class AddMemberSkillComponent implements OnInit {
  public skillLevels = SKILL_LEVELS;

  public elementTypes = SKILL_ELEMENT_TYPES;
  public skillTypes = SKILL_TYPES;

  public skillForm: UntypedFormGroup;

  skill?: Skill;

  constructor(
    public dialogRef: MatDialogRef<AddMemberSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalSkillEdit
  ) {
    this.skill = data.skill;
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

  initForm(model: Skill) {
    this.skillForm = new UntypedFormGroup({
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
    });
  }

  addSkill(): void {
    const skill = this.skillForm.value as Skill;
    if (this.skillForm.valid) {
      this.skill = skill;
      this.close(skill);
    } else {
      this.skillForm.markAllAsTouched();
    }
  }
}
