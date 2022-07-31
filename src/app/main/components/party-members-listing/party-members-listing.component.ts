import { DemonPartyMember } from 'src/shared/models/all-models';
import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dbService: NgxIndexedDBService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getPartyMembersFromIndexDB();
  }

  private getPartyMembersFromIndexDB() {
    this.dbService
      .getAll<DemonPartyMember>('party_member')
      .subscribe((response: DemonPartyMember[]) => {
        this.partyMembers = response;
      });
  }

  public deletePartyMember(id: number): void {
    this.dbService
      .deleteByKey('party_member', id)
      .subscribe((response: boolean) => {
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
