import { DemonPartyMember } from './../../shared/models/all-models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class DemonServiceService {
  constructor(private dbService: NgxIndexedDBService) {}

  public getAllDemons(): Observable<DemonPartyMember[]> {
    return this.dbService.getAll<DemonPartyMember>('party_member');
  }

  public insertDemon(model: DemonPartyMember): Observable<DemonPartyMember> {
    return this.dbService.add('party_member', model);
  }

  public updateDemon(model: DemonPartyMember): Observable<DemonPartyMember> {
    return this.dbService.update('party_member', model);
  }

  public deleteDemon(id: number): Observable<boolean> {
    return this.dbService.deleteByKey('party_member', id);
  }
}
