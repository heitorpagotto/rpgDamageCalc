import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-party-member-xp',
  templateUrl: './manage-party-member-xp.component.html',
  styleUrls: ['./manage-party-member-xp.component.css'],
})
export class ManagePartyMemberXpComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { currentXP: number; totalXP: number }
  ) {}

  ngOnInit() {
    console.log('initialized!');
  }

  //TODO: implement exp and level up system
}
