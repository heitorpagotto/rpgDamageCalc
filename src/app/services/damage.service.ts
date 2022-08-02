import { Injectable } from '@angular/core';
import { PhysicalAttackRequest } from 'src/shared/models/all-models';

@Injectable({
  providedIn: 'root',
})
export class DamageService {
  constructor() {}

  public calcPhysicalDamage(request: PhysicalAttackRequest): number {
    const level = request.player.level;
    const skillPower = request.skill.skillPower;
    const playerStat = request.player.stats.ST;
    const diceroll =
      Math.floor(Math.random() * request.skill.diceRollLevel) + 1;

    let formula = ((level + playerStat) * skillPower) / 15 + diceroll;

    if (request.isCritical) {
      formula = this.calcCriticalDamage(formula);
    }
    if (request.isFocus) {
      formula = this.calcFocusDamage(formula);
    }

    if (request.buffs.filter((x) => x.selected).length > 0) {
      formula = this.calcBuffs(formula, request.buffs);
    }

    if (request.debuffs.filter((x) => x.selected).length > 0) {
      formula = this.calcDebuffs(formula, request.debuffs);
    }

    if (request.isMultiple) {
      formula = formula / request.enemyQuantity;
    }

    return Math.round(formula);
  }

  public calcMagicDamage(request: PhysicalAttackRequest): number {
    const level = request.player.level;
    const skillPower = request.skill.skillPower;
    const playerStat = request.player.stats.MA;
    const diceroll =
      Math.floor(Math.random() * request.skill.diceRollLevel) + 1;

    let formula = ((level + playerStat) * skillPower) / 15 + diceroll;

    if (request.isWeakness) {
      formula = this.calcWeaknessDamage(formula);
    }
    if (request.isFocus) {
      formula = this.calcFocusDamage(formula);
    }

    if (request.buffs.filter((x) => x.selected).length > 0) {
      formula = this.calcBuffs(formula, request.buffs);
    }

    if (request.debuffs.filter((x) => x.selected).length > 0) {
      formula = this.calcDebuffs(formula, request.debuffs);
    }

    if (request.isMultiple) {
      formula = formula / request.enemyQuantity;
    }

    return Math.round(formula);
  }

  public calcHpPhysicalDamage(request: PhysicalAttackRequest): number {
    const playerHp = request.player.currentHP;
    const skillPower = request.skill.skillPower;
    const playerStat = request.player.stats.ST;
    const diceroll =
      Math.floor(Math.random() * request.skill.diceRollLevel) + 1;

    let formula = ((playerHp + diceroll + playerStat) * skillPower) / 50;

    if (request.isCritical) {
      formula = this.calcCriticalDamage(formula);
    }
    if (request.isFocus) {
      formula = this.calcFocusDamage(formula);
    }

    if (request.buffs.filter((x) => x.selected).length > 0) {
      formula = this.calcBuffs(formula, request.buffs);
    }

    if (request.debuffs.filter((x) => x.selected).length > 0) {
      formula = this.calcDebuffs(formula, request.debuffs);
    }

    if (request.isMultiple) {
      formula = formula / request.enemyQuantity;
    }

    return Math.round(formula);
  }

  private calcBuffs(formula: number, buffs: any[]): number {
    const selectedBuffs = buffs.filter((x) => x.selected === true);
    selectedBuffs.map((c) => {
      if (c.id === 1) {
        switch (c.stacks) {
          case 1:
            formula = formula * 1.5;
            break;
          case 2:
            formula = formula * 2;
            break;
        }
      }
      if (c.id === 2) {
        switch (c.stacks) {
          case 1:
            formula = formula * 0.75;
            break;
          case 2:
            formula = formula * 0.5;
        }
      }
    });

    return formula;
  }

  private calcDebuffs(formula: number, debuffs: any[]): number {
    const selectedDebuffs = debuffs.filter((x) => x.selected === true);
    selectedDebuffs.map((c) => {
      if (c.id === 2) {
        switch (c.stacks) {
          case 1:
            formula = formula * 1.5;
            break;
          case 2:
            formula = formula * 2;
            break;
        }
      }
      if (c.id === 1) {
        switch (c.stacks) {
          case 1:
            formula = formula * 0.75;
            break;
          case 2:
            formula = formula * 0.5;
        }
      }
    });

    return formula;
  }

  private calcFocusDamage(formula: number): number {
    return formula * 2.5;
  }

  private calcCriticalDamage(formula: number): number {
    return formula * 2;
  }

  private calcWeaknessDamage(formula: number): number {
    return formula * 1.5;
  }
}
