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

  public downloadPartyMembers(): void {
    const demonParty = JSON.stringify(this.partyMembers);
    const hyperlink = document.createElement('a');
    hyperlink.setAttribute(
      'href',
      'data:text/json;charset=UTF-8,' + encodeURIComponent(demonParty)
    );
    hyperlink.setAttribute('download', 'demon_party.json');
    hyperlink.style.display = 'none';
    document.body.appendChild(hyperlink);
    hyperlink.click();
    document.body.removeChild(hyperlink);
  }

  public uploadPartyMembers($event: any): void {
    const selectedFile = $event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');
    fileReader.onload = () => {
      const jsonInfo = JSON.parse(
        fileReader.result ? fileReader.result.toString() : '[]'
      );

      jsonInfo.forEach(async (x: DemonPartyMember) => {
        await this.demonService.insertDemon(x).toPromise();
      });
      this.getPartyMembersFromIndexDB();
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  public changeView(): void {
    this.addPartyMember = false;
    this.getPartyMembersFromIndexDB();
  }

  public editPartyMember(partyMember: DemonPartyMember) {
    this.selectedPartyMember = partyMember;
    this.addPartyMember = true;
    this.isToEditPartyMember = true;
  }
}
