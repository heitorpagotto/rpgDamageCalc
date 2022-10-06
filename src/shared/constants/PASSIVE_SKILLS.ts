import { PassiveSkill } from '../models/all-models';

export const PASSIVE_SKILLS: PassiveSkill[] = [
  {
    id: 1,
    name: 'Attack All',
    description: 'Normal physical attacks will hit all enemies',
    effects: {
      isMultiple: true,
    },
  },
  {
    id: 2,
    name: 'Dark Might',
    description: 'Normal attacks will crit during New Kagutsuchi phase',
    effects: {
      showDarkmightOptions: true,
    },
  },
  {
    id: 3,
    name: 'Fire Boost',
    description: 'Fire damage +50%',
    effects: {
      boostDmg: true,
    },
  },
  {
    id: 4,
    name: 'Elec Boost',
    description: 'Elec damage +50%',
    effects: {
      boostDmg: true,
    },
  },
  {
    id: 5,
    name: 'Ice Boost',
    description: 'Ice damage +50%',
    effects: {
      boostDmg: true,
    },
  },
  {
    id: 6,
    name: 'Force Boost',
    description: 'Force damage +50%',
    effects: {
      boostDmg: true,
    },
  },
  {
    id: 7,
    name: 'Life Bonus',
    description: 'Maximum HP +10%',
    effects: {
      increaseMaxPercentHP: 10,
    },
  },
  {
    id: 8,
    name: 'Life Gain',
    description: 'Maximum HP +20%',
    effects: {
      increaseMaxPercentHP: 20,
    },
  },
  {
    id: 9,
    name: 'Life Surge',
    description: 'Maximum HP +30%',
    effects: {
      increaseMaxPercentHP: 30,
    },
  },
  {
    id: 10,
    name: 'Mana Bonus',
    description: 'Maximum MP +10%',
    effects: {
      increaseMaxPercentMP: 10,
    },
  },
  {
    id: 11,
    name: 'Mana Gain',
    description: 'Maximum MP +20%',
    effects: {
      increaseMaxPercentMP: 20,
    },
  },
  {
    id: 12,
    name: 'Mana Surge',
    description: 'Maximum MP +30%',
    effects: {
      increaseMaxPercentMP: 30,
    },
  },
  {
    id: 13,
    name: 'Might',
    description: 'Increases critical rate of normal attacks',
    effects: {
      increaseCriticalAttacksBy: 2,
    },
  },
];
