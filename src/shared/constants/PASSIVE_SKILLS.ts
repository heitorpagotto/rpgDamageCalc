export const PASSIVE_SKILLS = [
  {
    name: 'Attack All',
    description: 'Normal physical attacks will hit all enemies',
    effects: {
      isMultiple: true,
    },
  },
  {
    name: 'Dark Might',
    description: 'Normal attacks will crit during New Kagutsuchi phase',
    effects: {
      showDarkmightOptions: true,
    },
  },
  {
    name: 'Fire Boost',
    description: 'Fire damage +50%',
    effects: {
      boostFireDmg: true,
    },
  },
  {
    name: 'Elec Boost',
    description: 'Elec damage +50%',
    effects: {
      boostElecDmg: true,
    },
  },
  {
    name: 'Ice Boost',
    description: 'Ice damage +50%',
    effects: {
      boostIceDmg: true,
    },
  },
  {
    name: 'Force Boost',
    description: 'Force damage +50%',
    effects: {
      boostForceDmg: true,
    },
  },
  {
    name: 'Life Bonus',
    description: 'Maximum HP +10%',
    effects: {
      increaseMaxPercentHP: 10,
    },
  },
  {
    name: 'Life Gain',
    description: 'Maximum HP +20%',
    effects: {
      increaseMaxPercentHP: 20,
    },
  },
  {
    name: 'Life Surge',
    description: 'Maximum HP +30%',
    effects: {
      increaseMaxPercentHP: 30,
    },
  },
  {
    name: 'Mana Bonus',
    description: 'Maximum MP +10%',
    effects: {
      increaseMaxPercentMP: 10,
    },
  },
  {
    name: 'Mana Gain',
    description: 'Maximum MP +20%',
    effects: {
      increaseMaxPercentMP: 20,
    },
  },
  {
    name: 'Mana Surge',
    description: 'Maximum MP +30%',
    effects: {
      increaseMaxPercentMP: 30,
    },
  },
  {
    name: 'Might',
    description: 'Increases critical rate of normal attacks',
    effects: {
      increaseCriticalAttacksBy: 2,
    },
  },
];
