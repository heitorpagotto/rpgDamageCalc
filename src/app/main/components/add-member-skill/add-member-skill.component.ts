import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SKILL_ELEMENT_TYPES } from 'src/shared/constants/SKILL_ELEMENTS';
import { SKILL_LEVELS } from 'src/shared/constants/SKILL_LEVELS';
import { SKILL_TYPES } from 'src/shared/constants/SKILL_TYPES';

@Component({
  selector: 'app-add-member-skill',
  templateUrl: './add-member-skill.component.html',
  styleUrls: ['./add-member-skill.component.css'],
})
export class AddMemberSkillComponent implements OnInit {
  public skillLevels = SKILL_LEVELS;

  elementTypes = SKILL_ELEMENT_TYPES;
  skillTypes = SKILL_TYPES;
  constructor(public dialogRef: MatDialogRef<AddMemberSkillComponent>) {}

  ngOnInit() {}

  close(): void {
    this.dialogRef.close();
  }
}
