import { Injectable } from '@angular/core';
import { BuffModel } from 'src/shared/models/all-models';

@Injectable({
  providedIn: 'root',
})
export class AccuracyService {
  constructor() {}

  public CalcAccuracy(
    playerAgi: number,
    playerLuc: number,
    selectedSkilType: number,
    isWeakness: boolean,
    buffs?: BuffModel[],
    debuffs?: BuffModel[]
  ): AccuracyResult {
    const d20 = Math.ceil(Math.random() * 20) + 1;

    const playerAgiBuffValue = this.calcAgilityBuffAndDebuff(buffs, debuffs);

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

  private calcAgilityBuffAndDebuff(
    buffs?: BuffModel[],
    debuffs?: BuffModel[]
  ): number {
    const selectedBuff = buffs?.find((x) => x.id === 3);
    const selectedDebuffs = debuffs?.find((x) => x.id === 3);

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
