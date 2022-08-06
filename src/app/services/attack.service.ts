import {
  AttackResponse,
  PhysicalAttackRequest,
} from './../../shared/models/all-models';
import { Injectable } from '@angular/core';
import { AccuracyService } from './accuracy.service';
import { DamageService } from './damage.service';

@Injectable({
  providedIn: 'root',
})
export class AttackService {
  constructor(
    private accuracyService: AccuracyService,
    private damageService: DamageService
  ) {}

  public attack(model: PhysicalAttackRequest): AttackResponse {
    let isCritical = false;
    let missedAttack = false;
    let attackResults = '';

    const accuracy = this.accuracyService.CalcAccuracy(
      model.player.stats.AG,
      model.player.stats.LU,
      model.skill.skillType,
      model.isWeakness,
      model.buffs,
      model.debuffs
    );

    let sound = new Audio();

    if (accuracy !== 'miss') {
      if (accuracy === 'critical' && model.skill.skillType !== 3) {
        isCritical = true;
        model.isCritical = true;
        sound = new Audio('/assets/audio/crit.wav');
      } else {
        sound = new Audio('/assets/audio/atk.wav');
      }

      if (accuracy === 'ok_weak') {
        sound = new Audio('/assets/audio/crit.wav');
      }

      switch (model.skill.skillType) {
        case 1:
          attackResults +=
            '-' + this.damageService.calcPhysicalDamage(model) + 'HP';
          break;
        case 2:
          attackResults +=
            '-' + this.damageService.calcHpPhysicalDamage(model) + 'HP';
          break;
        case 3:
          attackResults +=
            '-' + this.damageService.calcMagicDamage(model) + 'HP';
          break;
      }
    } else {
      sound = new Audio('/assets/audio/miss.wav');
      missedAttack = true;
    }

    if (localStorage.getItem('sound_enabled') === 'true') {
      sound.volume = Number(localStorage.getItem('sound_volume'));
      sound.play();
    }

    // TODO: call demon service and update mp and hp values

    return {
      attackStatus: attackResults,
      isCritical: isCritical,
      missAttack: missedAttack,
      weakness: model.isWeakness,
    };
  }
}
