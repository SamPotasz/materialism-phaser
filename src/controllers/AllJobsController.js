import 'phaser';
import {EVENT_TYPES} from '../constants';
import JobView from '../views/JobView.js';

export default class AllJobsController {
  constructor({scene, x, y, model}) {

    this.model = model;
    console.log(this.model)
    this.jobViews = [];
    
    // model.events.on()

    this.model.jobs.forEach( (model, i)  => {
      // console.log(`iterating over ${i}`)
      // console.log({model})
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
      // model.emitter.on(EVENT_TYPES.TIME_PASSED, this.onJobTimePassed, this);

      view.update( this.model.score );
      this.jobViews.push( view )
    });
  }

  update() {
    this.jobViews.forEach( view => view.update(this.model.score) )
  }

  onStartClicked( modelId ) {
    console.log('start clicked in AJC')
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
    const jobModel = this.model.getJobById(modelId);
    if( jobModel ) {
      jobModel.unlock( this.model.score );
      this.model.setScore( this.model.score - jobModel.unlockCost )
      // this.model.score -= jobModel.unlockCost;
    }
  }

  onJobFinished( jobModel, timesFinished ) {
    console.log( `${jobModel.title} finished ${timesFinished} times`)
    const points = jobModel.benefit * timesFinished;
    // this.model.score += points;
    this.model.setScore( this.model.score + points );
  }
}