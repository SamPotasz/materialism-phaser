export const JOBS_DATA = {
  1: {
    id: 1,
    title: "meditate",
    unlockCost: 0,
    isUnlocked: true,
    upgradeCost: 4.0,
    numUpgrades: 0,
    benefit: 1,
    benefitMultiplier: 1,
    duration: 1000,
    ticksMultiplier: 1,
    student: {
      id: 1,
      name: 'first student',
      description: 'It\'s basically like doing it yourself.',
      cost: 1000,
      isActive: false,
    }
  },
  2: {
    id: 2,
    title: "read a self-help book",
    unlockCost: 60,
    upgradeCost: 69,
    benefit: 60,
    duration: 3000,
    timeMultiplier: 1.0,
    student: {
      id: 2,
      name: 'second student',
      description: "They'll sumarize it for you, I'm sure.",
      cost: 15000,
      isActive: false,
    }
  },
  3: {
    id: 3,
    title: "take a class",
    unlockCost: 720,
    upgradeCost: 820.8,
    benefit: 540,
    duration: 6000,
    student: {
      id: 3,
      name: 'second student',
      description: 'Can totally pass you notes afterwards.',
      cost: 100000,
      isActive: false,
    }
  },
  4: {
    id: 4,
    title: "listen to a podcast",
    unlockCost: 8640,
    upgradeCost: 9763.2,
    benefit: 4200,
    duration: 12000,
    student: {
      id: 4,
      name: 'fourth student',
      description: 'Listens on 2.5x - so hardcore.',
      cost: 500000,
      isActive: false,
    }
  },
  5: {
    id: 5,
    title: "MEDITATE. HARDER.",
    unlockCost: 103680,
    upgradeCost: 116121.6,
    benefit: 5200,
    duration: 24000,
    student: {
      id: 5,
      name: 'fifth student',
      description: 'Will hit themselves with a stick.',
      cost: 1200000,
      isActive: false,
    }
  },
}
