import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor() {}
  selectedType = new FormControl('', Validators.required);
  selectedSkillLvl = 2;

  pLvl = new FormControl('', [Validators.min(1), Validators.max(256)]);

  pStat = new FormControl('', [Validators.min(1), Validators.max(40)]);

  pHP = new FormControl('', [Validators.min(1), Validators.max(999)]);

  pSkillPow = 1;

  damage = 0;

  diceNumb = 1;

  skillTypes = [
    { name: 'Físico', id: 1 },
    { name: 'Físico com Base no HP', id: 2 },
    { name: 'Magico', id: 3 },
  ];

  skillLevel = [
    { name: 'Ataque Normal', id: 6 },
    { name: 'Leve', id: 8 },
    { name: 'Médio', id: 10 },
    { name: 'Pesado', id: 12 },
    { name: 'Mega', id: 16 },
    { name: 'Severe', id: 24 },
  ];

  isCrit = false;
  isWeak = false;
  isFocus = false;

  buffs = [
    {
      id: 1,
      name: 'Tarukaja/Makakaja (No Player)',
      selected: false,
      stacks: 1,
    },
    {
      id: 2,
      name: 'Rakukaja (No Inimigo)',
      selected: false,
      stacks: 1,
    },
  ];
  debuffs = [
    {
      id: 1,
      name: 'Tarunda (No Player)',
      selected: false,
      stacks: 1,
    },
    {
      id: 2,
      name: 'Rakunda (No Inimigo)',
      selected: false,
      stacks: 1,
    },
  ];

  calcDmg(): void {
    const val = this.selectedType.value;
    switch (val) {
      case 1:
        this.calcPhys();
        break;
      case 2:
        this.calcHpPhys();
        break;
      case 3:
        this.calcMag();
        break;
    }
  }

  calcPhys(): number {
    const level = this.pLvl.value;
    const skillPower = this.pSkillPow;
    const playerStat = this.pStat.value;
    const diceroll = this.diceNumb;

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

    this.damage = Math.round(formula);

    return formula;
  }

  calcMag(): number {
    const level = this.pLvl.value;
    const skillPower = this.pSkillPow;
    const playerStat = this.pStat.value;
    const diceroll = this.diceNumb;

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

    this.damage = Math.round(formula);

    return formula;
  }

  calcHpPhys(): number {
    const playerHp = this.pHP.value;
    const skillPower = this.pSkillPow;
    const playerStat = this.pStat.value;
    const diceroll = this.diceNumb;

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

    this.damage = Math.round(formula);

    return formula;
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
}
