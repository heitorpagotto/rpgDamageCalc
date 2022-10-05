import { Injectable } from '@angular/core';
import { DemonPartyMember, HealingSkill } from 'src/shared/models/all-models';

@Injectable({
  providedIn: 'root',
})
export class PartyHealService {
  constructor() {}

  public HealMember(
    partyMemberToHeal: DemonPartyMember,
    partyMemberOrigin: DemonPartyMember,
    healingType: HealingSkill
  ): any {}
}
