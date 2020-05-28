export const CONFIG = {
  ATLAS_NAME: 'spriteAtlas',
  SCORE_KEY: 'local store score key',
  JOBS_KEY: 'localStorage jobs',
  SPRITES: {
    UPGRADE_ON: 'green_button03',
    UPGRADE_OFF: 'grey_button03',
  },
  APP_MENU_DESC: `Why spend *your* precious time on all this enlightment hooha?\nBuy some apps and run your transformation in the background!`,
  APP_MENU_TITLE: "There's an app for that!",
  OPEN_SFX: 'Pop1',
  CLOSED_SFX: 'Pop2',
  UNLOCK_SFX: 'Whoosh',
  APP_BUY_SFX: 'yay',
}

export const EVENT_TYPES = {
  TIME_PASSED: 'time passed event',
  TIME_LEFT: 'time left on job modified',
  JOB_START: 'clicked button to start a job',
  JOB_FINISHED: 'a job has completed running',
  SCORE_MODIFIED: 'score modified event',
  UNLOCK_CLICK: 'clicked button to unlock job',
  APP_PURCHASED: 'app purchase clicked',
  UPGRADE_CLICK: 'clicked button to purchase upgrade',
}

export const START_BUTTON_STATES = {
  ACTIVE: 'available to start',
  INACTIVE: 'running. not available',
  APP_RUNNING: 'app running. inactive',
}