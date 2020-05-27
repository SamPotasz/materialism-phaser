import { Events } from 'phaser';
import {CONFIG, EVENT_TYPES, START_BUTTON_STATES} from '../constants';

import StudentModel from './StudentModel';

export default class JobModel {
  constructor(jobData) {
    Object.assign( this, jobData );
    this.lastUpdate = Date.now();
    
    this.student = new StudentModel({
      ...jobData.student,
      isActive: this.hasApp
    });

    this.emitter = new Events.EventEmitter();
  }

  onTimePassed( newTime ) {
    if( this.isActive ) {
      if( newTime >= this.finishesAt ) {
        if(!this.hasApp) {
          this.isActive = false;
          this.saveToStorage();

          this.emitter.emit( EVENT_TYPES.JOB_FINISHED, this, 1 );
        }
        else {
          //calculate how many times we've finished since last start
          const timePassed = newTime - this.startedAt;
          const numTimesFinished = Math.floor( timePassed / this.duration );
          
          this.startedAt = this.startedAt + numTimesFinished * this.duration;
          this.saveToStorage();

          this.emitter.emit( EVENT_TYPES.JOB_FINISHED, this, numTimesFinished );
        }
      }
      
      this.lastUpdate = newTime;
    }
  }

  /**
   * tries to start the job.
   * returns bool of whether or not it was successful in doing so
   */
  tryToStart() {
    if( this.isAbleToStart ) {
      this.isActive = true;
      this.lastUpdate = Date.now();
      this.startedAt = this.lastUpdate;

      this.saveToStorage();

      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Try to unlock this job
   * @param {points in the game} currPoints 
   */
  unlock( currPoints ) {
    if( currPoints >= this.unlockCost ){
      this.isUnlocked = true;

      this.saveToStorage();
    }
  }

  upgrade() {
    this.upgradeCost *= 1.1;
    this.benefit *= 1.1;
    this.saveToStorage();
  }

  activateApp() {
    this.hasApp = true;
    this.student.activate();
    this.tryToStart();
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem(CONFIG.JOBS_KEY + this.id, 
      JSON.stringify(this.saveData));
  }

  canUpgrade( score ) {
    return score >= this.upgradeCost && this.isUnlocked;
  }

  canPurchaseApp( score ) {
    const app = this.student;
    return !app.isActive && this.isUnlocked && score >= app.cost;
  }

  get isAbleToStart() {
    return !this.isActive && this.isUnlocked;
  }

  /**
   * get millisecond value current job will earn points at
   */
  get finishesAt() {
    return this.startedAt + this.duration;
  }

  get startButtonState() {
    if( this.hasApp ) {
      return START_BUTTON_STATES.APP_RUNNING;
    }
    if( this.isActive ) {
      return START_BUTTON_STATES.ACTIVE;
    }
    return START_BUTTON_STATES.INACTIVE;
  }

  /**
   * The data which will get saved in localStorage.
   * Anything that we want to know about this model from session to session
   * we must store in this object.
   */
  get saveData() {
    return {
      isActive: this.isActive,
      startedAt: this.startedAt,
      isUnlocked: this.isUnlocked,
      upgradeCost: this.upgradeCost,
      benefit: this.benefit,
      hasApp: this.hasApp,
    }
  }
}