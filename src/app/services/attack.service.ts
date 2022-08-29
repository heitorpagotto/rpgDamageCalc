import {
  AttackResponse,
  PhysicalAttackRequest,
} from './../../shared/models/all-models';
import { Injectable } from '@angular/core';
import { AccuracyService } from './accuracy.service';
import { DamageService } from './damage.service';
import { DemonServiceService } from './demon-service.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class AttackService {
  constructor(
    private accuracyService: AccuracyService,
    private damageService: DamageService,
    private dbService: NgxIndexedDBService
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
          if (model.player.currentHP > model.skill.cost) {
            model.player.currentHP -= model.skill.cost;
            attackResults +=
              '-' + this.damageService.calcPhysicalDamage(model) + 'HP';
          }
          break;
        case 2:
          if (model.player.currentHP > model.skill.cost) {
            model.player.currentHP -= model.skill.cost;
            attackResults +=
              '-' + this.damageService.calcHpPhysicalDamage(model) + 'HP';
          }
          break;
        case 3:
          if (model.player.currentMP > model.skill.cost) {
            model.player.currentMP -= model.skill.cost;
            attackResults +=
              '-' + this.damageService.calcMagicDamage(model) + 'HP';
          }
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

    this.dbService.update('party_member', model.player).toPromise();

    return {
      attackStatus: attackResults,
      isCritical: isCritical,
      missAttack: missedAttack,
      weakness: model.isWeakness,
    };
  }
}
