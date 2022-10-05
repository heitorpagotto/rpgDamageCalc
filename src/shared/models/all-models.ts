import { EElementTypes, ESkillTypes } from './all-enums';

export class DemonPartyMember {
  id?: number;
  name: string;
  nickname: string;
  level: number;
  currentEXP: number;
  totalEXP: number;
  currentHP: number;
  totalHP: number;
  currentMP: number;
  totalMP: number;
  stats: DemonStats;
  skills: Skill[];
  race: string;
}

export class DemonStats {
  ST: number;
  MA: number;
  EN: number;
  AG: number;
  LU: number;
}

export class Skill {
  id: number;
  name: string;
  description: string;
  diceRollLevel: number;
  cost: number;
  skillType: ESkillTypes;
  skillElement: EElementTypes;
  skillPower: number;
  passiveSkill?: PassiveSkill;
}

export class PassiveSkill {
  name: string;
  description: string;
  effects: {
    isMultiple?: boolean;
    showDarkmightOptions?: boolean;
    boostFireDmg?: boolean;
    boostElecDmg?: boolean;
    boostIceDmg?: boolean;
    boostForceDmg?: boolean;
    increaseMaxPercentHP?: number;
    increaseMaxPercentMP?: number;
    increaseCriticalAttacksBy?: number;
  };
}

export class HealingSkill {
  name: string;
  healingPercent: string;
}

export class ModalSkillEdit {
  isEdit: boolean;
  skill: Skill;
}

export class PhysicalAttackRequest {
  player: DemonPartyMember;
  skill: Skill;
  isCritical: boolean;
  isWeakness: boolean;
  isFocus: boolean;
  buffs: BuffModel[];
  debuffs: BuffModel[];
  isMultiple: boolean;
  enemyQuantity: number;
}

export class BuffModel {
  id: number;
  name: string;
  desc: string;
  stacks: number;
  selected?: boolean;
}

export class AttackResponse {
  attackStatus: string;
  isCritical: boolean;
  missAttack: boolean;
  weakness: boolean;
}
