import { Component, OnInit } from '@angular/core';
import { DemonServiceService } from 'src/app/services/demon-service.service';
import { BUFFS } from 'src/shared/constants/BUFFS';
import { DEBUFFS } from 'src/shared/constants/DEBUFFS';
import { DemonPartyMember } from 'src/shared/models/all-models';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
})
export class CombatComponent implements OnInit {
  public partyMembers: DemonPartyMember[] = [];
  public selectedMember?: DemonPartyMember;

  public buffs = BUFFS;
  public debuffs = DEBUFFS;

  constructor(private demonService: DemonServiceService) {}

  ngOnInit() {
    this.getAllDemons();
  }

  public selectDemon(demon: DemonPartyMember): void {
    this.selectedMember = demon;
  }

  private getAllDemons(): void {
    this.demonService.getAllDemons().subscribe((response) => {
      this.partyMembers = response;
    });
  }
}
