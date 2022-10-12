import { Injectable } from '@angular/core';
import { DemonPartyMember, HealingSkill } from 'src/shared/models/all-models';
import { DemonServiceService } from './demon-service.service';

@Injectable({
  providedIn: 'root',
})
export class PartyHealService {
  constructor(private demonService: DemonServiceService) {}

  public async HealMember(
    partyMemberOrigin: DemonPartyMember,
    healingType: HealingSkill,
    partyMemberToHeal?: DemonPartyMember
  ): Promise<any> {
    const allPartyMembers = await this.demonService.getAllDemons().toPromise();
    partyMemberOrigin.currentMP -= healingType.cost;
    const diceroll = Math.floor(Math.random() * healingType.diceRollLevel) + 1;
    switch (healingType.id) {
      case 1:
        partyMemberToHeal!.currentHP +=
          partyMemberToHeal!.currentHP +
          partyMemberToHeal!.currentHP * 0.25 +
          diceroll;

        if (partyMemberToHeal!.currentHP >= partyMemberToHeal!.totalHP) {
          partyMemberToHeal!.currentHP = partyMemberToHeal!.totalHP;
        }
        await this.demonService.updateDemon(partyMemberToHeal!).toPromise();
        break;
      case 2:
        partyMemberToHeal!.currentHP +=
          partyMemberToHeal!.currentHP +
          partyMemberToHeal!.currentHP * 0.45 +
          diceroll;

        if (partyMemberToHeal!.currentHP >= partyMemberToHeal!.totalHP) {
          partyMemberToHeal!.currentHP = partyMemberToHeal!.totalHP;
        }
        await this.demonService.updateDemon(partyMemberToHeal!).toPromise();
        break;
      case 3:
        partyMemberToHeal!.currentHP = partyMemberToHeal!.totalHP;
        await this.demonService.updateDemon(partyMemberToHeal!).toPromise();
        break;
      case 4:
        allPartyMembers.forEach(async (demon) => {
          demon.currentHP += demon.currentHP + demon.currentHP * 0.2 + diceroll;

          if (demon.currentHP >= demon.totalHP) {
            demon.currentHP = demon.totalHP;
          }
          await this.demonService.updateDemon(demon).toPromise();
        });
        break;
      case 5:
        allPartyMembers.forEach(async (demon) => {
          demon.currentHP += demon.currentHP + demon.currentHP * 0.4 + diceroll;

          if (demon.currentHP >= demon.totalHP) {
            demon.currentHP = demon.totalHP;
          }
          await this.demonService.updateDemon(demon).toPromise();
        });
        break;
      case 6 && 7:
        allPartyMembers.forEach(async (demon) => {
          demon.currentHP = demon.totalHP;
          await this.demonService.updateDemon(demon).toPromise();
        });
        break;
    }
    await this.demonService.updateDemon(partyMemberOrigin).toPromise();
  }
}
