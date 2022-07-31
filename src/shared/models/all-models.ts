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
}

export class ModalSkillEdit {
  isEdit: boolean;
  skill: Skill;
}
