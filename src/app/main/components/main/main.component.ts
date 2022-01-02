import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogRefComponent } from '../dialogRef/dialogRef.component';

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

  skillLevel = [
    { name: 'Ataque Normal (D6)', id: 6 },
    { name: 'Leve (D8)', id: 8 },
    { name: 'Médio (D10)', id: 10 },
    { name: 'Pesado (D12)', id: 12 },
    { name: 'Mega (D16)', id: 16 },
    { name: 'Severe (D24)', id: 24 },
  ];

  isCrit = false;
  isWeak = false;
  isFocus = false;
  isMulti = false;

  buffs = [
    {
      id: 1,
      name: 'Tarukaja/Makakaja',
      selected: false,
      stacks: 1,
      desc: 'Player (Atk+)',
    },
    {
      id: 2,
      name: 'Rakukaja',
      selected: false,
      stacks: 1,
      desc: 'Inimigo (Def+)',
    },
    {
      id: 3,
      name: 'Sukukaja',
      selected: false,
      stacks: 1,
      desc: 'Player (Ag+)',
    },
  ];
  debuffs = [
    {
      id: 1,
      name: 'Tarunda',
      selected: false,
      stacks: 1,
      desc: 'Player (Atk-)',
    },
    {
      id: 2,
      name: 'Rakunda',
      selected: false,
      stacks: 1,
      desc: 'Inimigo (Def-)',
    },
    {
      id: 3,
      name: 'Sukunda',
      selected: false,
      stacks: 1,
      desc: 'Player (Ag-)',
    },
  ];

  accuracyResult: AccuracyResult = 'ok';

  constructor(public dialog: MatDialog) {}

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
        sound = new Audio('../../../../assets/audio/crit.wav');
      } else {
        sound = new Audio('../../../../assets/audio/atk.wav');
      }

      if (accuracy === 'ok_weak') {
        sound = new Audio('../../../../assets/audio/crit.wav');
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
      sound = new Audio('../../../../assets/audio/miss.wav');
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

    if (this.isWeak) {
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
    const dialogRef = this.dialog.open(DialogRefComponent, {
      width: '300px',
    });
  }
}

type AccuracyResult = 'miss' | 'critical' | 'ok' | 'ok_weak';
