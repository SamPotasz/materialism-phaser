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
        y: y + i * 60,
        model
      });

      //add listeners to click events
      view.emitter.on(EVENT_TYPES.JOB_START, () => { this.onStartClicked(model.id) })
      view.emitter.on(EVENT_TYPES.UNLOCK_CLICK, () => { this.onUnlockClicked(model.id) })

      model.emitter.on(EVENT_TYPES.JOB_FINISHED, this.onJobFinished, this);

      view.update( this.model.score );
      this.jobViews.push( view )
    });
  }

  update() {
    this.jobViews.forEach( view => view.update(this.model.score) )
  }

  onStartClicked( modelId ) {
    // console.log('start clicked in AJC')
    const jobModel = this.model.getJobById(modelId);
    if( jobModel ){
      jobModel.tryToStart();
    }
    else {
      console.error("couldn't find model with id " + modelId + " to start")
    }
  }

  onUnlockClicked( modelId ) {
    console.log( 'unlock detected in model ' + modelId )
    this.model.unlockJob( modelId );
  }

  onJobFinished( jobModel, timesFinished ) {
    // console.log( `${jobModel.title} finished ${timesFinished} times`)
    const points = jobModel.benefit * timesFinished;
    this.model.setScore( this.model.score + points );
  }
}