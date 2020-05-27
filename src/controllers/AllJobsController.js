import 'phaser';
import {EVENT_TYPES} from '../constants';
import JobView from '../views/JobView.js';

export default class AllJobsController {
  constructor({scene, x, y, model}) {

    this.model = model;
    this.jobViews = [];

    this.model.jobs.forEach( (model, i)  => {
      const view = new JobView({ 
        scene,
        x,
        y: y + i * 100,
        model
      });

      //add listeners to click events
      view.emitter.on(EVENT_TYPES.JOB_START, () => { this.onStartClicked( model.id ) })
      view.emitter.on(EVENT_TYPES.UNLOCK_CLICK, () => { this.onUnlockClicked( model.id ) })
      view.emitter.on(EVENT_TYPES.UPGRADE_CLICK, () => { this.onUpgradeClicked( model.id )});

      model.emitter.on(EVENT_TYPES.JOB_FINISHED, this.onJobFinished, this);

      view.update( this.model.score );
      this.jobViews.push( view )
    });
  }

  update() {
    this.jobViews.forEach( view => view.update(this.model.score) )
  }

  onStartClicked( jobId ) {
    // console.log('start clicked in AJC')
    const jobModel = this.model.getJobById(jobId);
    if( jobModel ){
      jobModel.tryToStart();
    }
    else {
      console.error("couldn't find model with id " + jobId + " to start")
    }
  }

  onUnlockClicked( jobId ) {
    console.log( 'unlock detected in model ' + jobId )
    this.model.unlockJob( jobId );
  }

  onUpgradeClicked( jobId ) {
    this.model.upgradeJob( jobId );
  }

  onJobFinished( jobModel, timesFinished ) {
    // console.log( `${jobModel.title} finished ${timesFinished} times`)
    const points = jobModel.benefit * timesFinished;
    this.model.setScore( this.model.score + points );
  }
}