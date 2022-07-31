import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemonServiceService } from 'src/app/services/demon-service.service';
import { DemonPartyMember } from 'src/shared/models/all-models';

@Component({
  selector: 'app-party-members-listing',
  templateUrl: './party-members-listing.component.html',
  styleUrls: ['./party-members-listing.component.css'],
})
export class PartyMembersListingComponent implements OnInit {
  public addPartyMember: boolean;

  public partyMembers: DemonPartyMember[] = [];

  public selectedPartyMember?: DemonPartyMember;
  public isToEditPartyMember: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private demonService: DemonServiceService
  ) {}

  ngOnInit() {
    this.getPartyMembersFromIndexDB();
  }

  private getPartyMembersFromIndexDB() {
    this.demonService
      .getAllDemons()
      .subscribe((response: DemonPartyMember[]) => {
        this.partyMembers = response;
      });
  }

  public deletePartyMember(id: number): void {
    this.demonService.deleteDemon(id).subscribe((response: boolean) => {
      if (response === true) {
        this.getPartyMembersFromIndexDB();
        this._snackBar.open('Successfully deleted party member!');
      }
    });
  }

  public changeView(): void {
    this.addPartyMember = false;
    this.getPartyMembersFromIndexDB();
  }

  public editPartyMember(partyMember: DemonPartyMember) {
    console.log(partyMember);
    this.selectedPartyMember = partyMember;
    this.addPartyMember = true;
    this.isToEditPartyMember = true;
  }
}
