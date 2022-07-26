import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberSkillComponent } from '../add-member-skill/add-member-skill.component';

@Component({
  selector: 'app-add-party-member',
  templateUrl: './add-party-member.component.html',
  styleUrls: ['./add-party-member.component.css'],
})
export class AddPartyMemberComponent implements OnInit {
  @Output() cancelAddPartyMember: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openSkillDialog(): void {
    this.dialog.open(AddMemberSkillComponent);
  }

  cancelAddition(): void {
    this.cancelAddPartyMember.emit(true);
  }
}
