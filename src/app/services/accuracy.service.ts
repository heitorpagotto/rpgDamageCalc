import { DEBUFFS } from 'src/shared/constants/DEBUFFS';
import { BUFFS } from './../../shared/constants/BUFFS';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalcSuccessService {
  constructor() {}

  public CalcAccuracy(
    playerAgi: number,
    playerLuc: number,
    selectedSkilType: number,
    isWeakness: boolean,
    buffId?: number,
    debuffId?: number
  ): AccuracyResult {
    const d20 = Math.floor(Math.random() * 20) + 1;

    const playerAgiBuffValue = this.calcAgilityBuffAndDebuff(buffId, debuffId);

    let result: AccuracyResult = 'ok';

    if (playerAgi <= 5) {
      if (d20 < 10 - playerAgiBuffValue) {
        result = 'miss';
      }
    } else if (playerAgi <= 10) {
      if (d20 < 9 - playerAgiBuffValue) {
        result = 'miss';
      }
    } else if (playerAgi <= 15) {
      if (d20 < 8 - playerAgiBuffValue) {
        result = 'miss';
      }
    } else if (playerAgi <= 20) {
      if (d20 < 7 - playerAgiBuffValue) {
        result = 'miss';
      }
    } else if (playerAgi <= 25) {
      if (d20 < 6 - playerAgiBuffValue) {
        result = 'miss';
      }
    } else if (playerAgi <= 30) {
      if (d20 < 5 - playerAgiBuffValue) {
        result = 'miss';
      }
    } else if (playerAgi <= 35) {
      if (d20 < 4 - playerAgiBuffValue) {
        result = 'miss';
      }
    } else if (playerAgi <= 40) {
      if (d20 < 3 - playerAgiBuffValue) {
        result = 'miss';
      }
    }

    if (result !== 'miss') {
      if (playerLuc <= 10) {
        if (d20 >= 19) {
          result = 'critical';
        }
      } else if (playerLuc <= 20) {
        if (d20 >= 18) {
          result = 'critical';
        }
      } else if (playerLuc <= 30) {
        if (d20 >= 17) {
          result = 'critical';
        }
      } else if (playerLuc <= 40) {
        if (d20 >= 16) {
          result = 'critical';
        }
      }
    }

    if (result === 'critical' && selectedSkilType === 3) {
      result = 'ok';
    }

    if (result !== 'miss' && isWeakness) {
      result = 'ok_weak';
    }

    return result;
  }

  private calcAgilityBuffAndDebuff(buffId?: number, debuffId?: number): number {
    const selectedBuff = BUFFS.find((x) => x.id === buffId);
    const selectedDebuffs = DEBUFFS.find((x) => x.id === debuffId);

    let acutalAgiValue: number = 0;
    if (selectedBuff) {
      acutalAgiValue += selectedBuff.stacks * 2;
    }
    if (selectedDebuffs) {
      acutalAgiValue -= selectedDebuffs.stacks * 2;
    }

    return acutalAgiValue;
  }
}

export type AccuracyResult = 'miss' | 'critical' | 'ok' | 'ok_weak';
