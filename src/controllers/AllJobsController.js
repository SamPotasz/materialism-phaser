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

      view.onScoreUpdate( this.model.score );
      this.jobViews.push( view )
    });
  }

  onStartClicked( modelId ) {
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
  }

  //the model's points have changed. let all the views know about it
  onScoreUpdate( newPoints ) {
    this.jobViews.forEach( jobView => jobView.onScoreUpdate( newPoints ));
  }
}