import { BUFFS } from './../../../../shared/constants/BUFFS';
import { SKILL_LEVELS } from './../../../../shared/constants/SKILL_LEVELS';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AddPartyMemberComponent } from '../add-party-member/add-party-member.component';
import { DialogRefComponent } from '../dialogRef/dialogRef.component';
import { DEBUFFS } from 'src/shared/constants/DEBUFFS';
import { AccuracyResult } from 'src/app/services/accuracy.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  attackResults = '';

  selectedType = new FormControl(1, Validators.required);

  selectedSkillLvl = 6;
  playerLevel = new FormControl(1, [
    Validators.min(1),
    Validators.max(256),
    Validators.required,
  ]);

  playerAttackStat = new FormControl(1, [
    Validators.min(1),
    Validators.max(40),
    Validators.required,
  ]);

  playerHP = new FormControl(1, [
    Validators.min(1),
    Validators.max(999),
    Validators.required,
  ]);

  playerAgility = new FormControl(1, [
    Validators.min(1),
    Validators.max(40),
    Validators.required,
  ]);

  playerLuck = new FormControl(1, [
    Validators.min(1),
    Validators.max(40),
    Validators.required,
  ]);

  enemyQnty = new FormControl(1, [Validators.min(1), Validators.required]);

  @ViewChild('damageOutput')
  damageOutput!: ElementRef<HTMLElement>;

  pSkillPow = 1;

  damage = 0;

  diceNumb = 1;

  skillTypes = [
    { name: 'Físico', id: 1 },
    { name: 'Físico com Base no HP', id: 2 },
    { name: 'Magico', id: 3 },
  ];

  skillLevel = SKILL_LEVELS;

  isCrit = false;
  isWeak = false;
  isFocus = false;
  isMulti = false;

  addPartyMember: boolean = false;

  buffs = BUFFS;
  debuffs = DEBUFFS;

  accuracyResult: AccuracyResult = 'ok';

  ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>github-circle-white-transparent</title><path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0 0 10 0z" fill="#FFF" fill-rule="evenodd"/></svg>';

  constructor(
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'github',
      sanitizer.bypassSecurityTrustHtml(this.ICON)
    );
  }

  disabledAnimations(): boolean {
    return localStorage.getItem('animations_disabled') === 'true';
  }

  calcDmg(): void {
    this.damageOutput.nativeElement.innerHTML = '';
    this.attackResults = '';
    this.isCrit = false;

    const val = this.selectedType.value;
    const accuracy = this.calcAccuracy();
    this.accuracyResult = accuracy;
    let sound = new Audio();

    if (accuracy !== 'miss') {
      if (accuracy === 'critical' && val !== 3) {
        this.isCrit = true;
        sound = new Audio('/assets/audio/crit.wav');
      } else {
        sound = new Audio('/assets/audio/atk.wav');
      }

      if (accuracy === 'ok_weak') {
        sound = new Audio('/assets/audio/crit.wav');
      }

      this.diceNumb = this.selectedSkillLvl;

      switch (val) {
        case 1:
          this.attackResults += '-' + this.calcPhys() + 'HP';
          break;
        case 2:
          this.attackResults += '-' + this.calcHpPhys() + 'HP';
          break;
        case 3:
          this.attackResults += '-' + this.calcMag() + 'HP';
          break;
      }

      const attackResultsDOM = document.createElement('p');
      attackResultsDOM.classList.add('actual-damage');
      if (!this.disabledAnimations()) {
        attackResultsDOM.classList.add('dmg-animated');
      }
      attackResultsDOM.innerHTML = this.attackResults;

      this.damageOutput.nativeElement.insertAdjacentElement(
        'beforeend',
        attackResultsDOM
      );
    } else {
      sound = new Audio('/assets/audio/miss.wav');
    }

    if (localStorage.getItem('sound_enabled') === 'true') {
      sound.volume = Number(localStorage.getItem('sound_volume'));
      sound.play();
    }
  }

  calcPhys(): number {
    const level = this.playerLevel.value;
    const skillPower = this.pSkillPow;
    const playerStat = this.playerAttackStat.value;
    const diceroll = Math.floor(Math.random() * this.diceNumb) + 1;

    let formula = ((level + playerStat) * skillPower) / 15 + diceroll;

    if (this.isCrit) {
      formula = this.calcCritical(formula);
    }
    if (this.isFocus) {
      formula = this.calcFocus(formula);
    }

    if (this.buffs.filter((x) => x.selected).length > 0) {
      formula = this.calcBuffs(formula);
    }

    if (this.debuffs.filter((x) => x.selected).length > 0) {
      formula = this.calcDebuffs(formula);
    }

    if (this.isMulti) {
      formula = formula / this.enemyQnty.value;
    }

    this.damage = Math.round(formula);

    return this.damage;
  }

  calcMag(): number {
    const level = this.playerLevel.value;
    const skillPower = this.pSkillPow;
    const playerStat = this.playerAttackStat.value;
    const diceroll = Math.floor(Math.random() * this.diceNumb) + 1;

    let formula = ((level + playerStat) * skillPower) / 15 + diceroll;

    if (this.isWeak) {
      formula = this.calcWeakness(formula);
    }
    if (this.isFocus) {
      formula = this.calcFocus(formula);
    }

    if (this.buffs.filter((x) => x.selected).length > 0) {
      formula = this.calcBuffs(formula);
    }

    if (this.debuffs.filter((x) => x.selected).length > 0) {
      formula = this.calcDebuffs(formula);
    }

    if (this.isMulti) {
      formula = formula / this.enemyQnty.value;
    }

    this.damage = Math.round(formula);

    return this.damage;
  }

  calcHpPhys(): number {
    const playerHp = this.playerHP.value;
    const skillPower = this.pSkillPow;
    const playerStat = this.playerAttackStat.value;
    const diceroll = Math.floor(Math.random() * this.diceNumb) + 1;

    let formula = ((playerHp + diceroll + playerStat) * skillPower) / 50;

    if (this.isCrit) {
      formula = this.calcCritical(formula);
    }
    if (this.isFocus) {
      formula = this.calcFocus(formula);
    }

    if (this.buffs.filter((x) => x.selected).length > 0) {
      formula = this.calcBuffs(formula);
    }

    if (this.debuffs.filter((x) => x.selected).length > 0) {
      formula = this.calcDebuffs(formula);
    }

    if (this.isMulti) {
      formula = formula / this.enemyQnty.value;
    }

    this.damage = Math.round(formula);

    return this.damage;
  }

  calcBuffs(formula: number): number {
    const selectedBuffs = this.buffs.filter((x) => x.selected === true);
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

  calcDebuffs(formula: number): number {
    const selectedDebuffs = this.debuffs.filter((x) => x.selected === true);
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

  calcFocus(formula: number): number {
    return formula * 2.5;
  }

  calcCritical(formula: number): number {
    return formula * 2;
  }

  calcWeakness(formula: number): number {
    return formula * 1.5;
  }

  calcAccuracy(): AccuracyResult {
    const d20 = Math.floor(Math.random() * 20) + 1;

    const playerAgi = this.playerAgility.value;
    const playerLuc = this.playerLuck.value;

    const playerAgiBuffValue = this.calcAgilityBuffAndDebuff();

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

    if (result === 'critical' && this.selectedType.value === 3) {
      result = 'ok';
    }

    if (result !== 'miss' && this.isWeak) {
      result = 'ok_weak';
    }

    return result;
  }

  calcAgilityBuffAndDebuff(): number {
    const selectedBuff = this.buffs.find((x) => x.id === 3 && x.selected);
    const selectedDebuffs = this.debuffs.find((x) => x.id === 3 && x.selected);

    let acutalAgiValue: number = 0;
    if (selectedBuff) {
      acutalAgiValue += selectedBuff.stacks * 2;
    }
    if (selectedDebuffs) {
      acutalAgiValue -= selectedDebuffs.stacks * 2;
    }

    return acutalAgiValue;
  }

  openConfigDialog(): void {
    this.dialog.open(DialogRefComponent, {
      width: '300px',
    });
  }

  openPartyMemberDialog(): void {
    this.dialog.open(AddPartyMemberComponent, {});
  }
}
