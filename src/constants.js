export const CONFIG = {
  ATLAS_NAME: 'spriteAtlas',
  SCORE_KEY: 'local store score key',
  JOBS_KEY: 'localStorage jobs',
  SPRITES: {
    UPGRADE_ON: 'green_button03',
    UPGRADE_OFF: 'grey_button03',
  },
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