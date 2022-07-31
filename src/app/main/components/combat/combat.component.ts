import { Component, OnInit } from '@angular/core';
import { DemonServiceService } from 'src/app/services/demon-service.service';
import { DemonPartyMember } from 'src/shared/models/all-models';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
})
export class CombatComponent implements OnInit {
  public partyMembers: DemonPartyMember[] = [];
  public selectedMember?: DemonPartyMember;

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
