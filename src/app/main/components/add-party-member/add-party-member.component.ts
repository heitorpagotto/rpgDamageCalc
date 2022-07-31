import { DemonStats } from './../../../../shared/models/all-models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { DemonPartyMember, Skill } from 'src/shared/models/all-models';
import { AddMemberSkillComponent } from '../add-member-skill/add-member-skill.component';
import { EElementTypes, ESkillTypes } from 'src/shared/models/all-enums';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-party-member',
  templateUrl: './add-party-member.component.html',
  styleUrls: ['./add-party-member.component.css'],
})
export class AddPartyMemberComponent implements OnInit {
  @Input()
  partyMember?: DemonPartyMember;

  @Input()
  isEdit: boolean;

  @Output() returnFromAddPartyMember: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public skills: Skill[] = [
    {
      id: 1,
      name: 'Attack',
      description: 'Regular attack',
      diceRollLevel: 6,
      cost: 0,
      skillType: ESkillTypes.Physical,
      skillElement: EElementTypes.Physical,
      skillPower: 36,
    },
  ];
  public selectedSkill: Skill | undefined;

  public partyMemberForm: FormGroup;
  public statsForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private dbService: NgxIndexedDBService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    let partyMember = new DemonPartyMember();
    if (this.partyMember) {
      partyMember = this.partyMember;
      this.skills = this.partyMember.skills;
    }
    this.initForm(partyMember);
    this.initStatsForm(
      !partyMember.stats ? new DemonStats() : partyMember.stats
    );
  }

  openSkillDialog(): void {
    this.selectedSkill = undefined;
    const ref = this.dialog.open(AddMemberSkillComponent, {
      data: { isEdit: false, skill: null },
    });

    ref.afterClosed().subscribe((result) => {
      this.addSkill(result);
    });
  }

  editSkillDialog(skill: Skill): void {
    this.selectedSkill = skill;
    const ref = this.dialog.open(AddMemberSkillComponent, {
      data: { isEdit: true, skill: skill },
    });

    ref.afterClosed().subscribe((result) => {
      this.editSkill(result);
    });
  }

  cancelAddition(): void {
    this.returnFromAddPartyMember.emit(true);
  }

  addSkill(skill: Skill): void {
    if (skill) {
      skill.id = this.skills.length + 1;
      this.skills.push(skill);
    }
  }

  editSkill(skill: Skill): void {
    const index = this.skills.findIndex((x) => x.id === skill.id);
    if (index > -1) {
      this.skills[index] = skill;
    }
  }

  removeSkill(id: number): void {
    const index = this.skills.findIndex((x) => x.id === id);
    if (index > -1) {
      this.skills.splice(index, 1);
    }
  }

  initForm(model: DemonPartyMember): void {
    this.partyMemberForm = new FormGroup({
      id: new FormControl(model.id),
      name: new FormControl(model.name, [Validators.required]),
      nickname: new FormControl(model.nickname),
      level: new FormControl(model.level, [Validators.required]),
      currentEXP: new FormControl(model.currentEXP, [Validators.required]),
      totalEXP: new FormControl(model.totalEXP, [Validators.required]),
      currentHP: new FormControl(model.currentHP, [Validators.required]),
      totalHP: new FormControl(model.totalHP, [Validators.required]),
      currentMP: new FormControl(model.currentMP, [Validators.required]),
      totalMP: new FormControl(model.totalMP, [Validators.required]),
      stats: new FormControl(model.stats, [Validators.required]),
      skills: new FormControl(model.skills, [Validators.required]),
      race: new FormControl(model.race, [Validators.required]),
    });
  }

  initStatsForm(model: DemonStats): void {
    this.statsForm = new FormGroup({
      ST: new FormControl(model.ST, [Validators.required]),
      MA: new FormControl(model.MA, [Validators.required]),
      EN: new FormControl(model.EN, [Validators.required]),
      AG: new FormControl(model.AG, [Validators.required]),
      LU: new FormControl(model.LU, [Validators.required]),
    });
  }

  insertPartyMember(model: DemonPartyMember): void {
    this.dbService.add('party_member', model).subscribe({
      next: () => {
        this.returnFromAddPartyMember.emit(true);
        this._snackBar.open('Successfully added party member!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editPartyMember(model: DemonPartyMember): void {
    this.dbService.update('party_member', model).subscribe({
      next: () => {
        this.returnFromAddPartyMember.emit(true);
        this._snackBar.open('Successfully updated party member!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addPartyMember(): void {
    this.partyMemberForm.get('skills')?.setValue(this.skills);
    if (!this.statsForm.valid) {
      this.statsForm.markAllAsTouched();
    }
    if (!this.partyMemberForm.valid) {
      this.partyMemberForm.markAllAsTouched();
    }
    if (this.statsForm.valid) {
      const statsValue = this.statsForm.value as DemonStats;
      this.partyMemberForm.get('stats')?.setValue(statsValue);
    }
    if (this.statsForm.valid && this.partyMemberForm.valid) {
      const value = this.partyMemberForm.value as DemonPartyMember;
      if (this.isEdit) {
        this.editPartyMember(value);
      } else {
        delete value.id;
        this.insertPartyMember(value);
      }
    } else {
      this.statsForm.markAllAsTouched();
      this.partyMemberForm.markAllAsTouched();
    }
  }
}
