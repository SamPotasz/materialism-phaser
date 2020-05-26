import 'phaser';
import JobView from '../views/JobView.js';

export default class AllJobsController {
  constructor({scene, x, y, data: models}) {
    this.jobViews = [];
    models.forEach( (model, i)  => {
      // console.log(`iterating over ${i}`)
      // console.log({model})
      const view = new JobView({ 
        scene, 
        x,
        y: y + i * 60,
        model
      });
      view.startClicked.on('', () => { this.onStartClicked(model) })
      view.unlockClicked.on('', () => { this.onUnlockClicked(model) })
      this.jobViews.push( view )
    });
  }

  onStartClicked( model ) {
    console.log( 'start detected in model ' + model.jobData.id )
  }

  onUnlockClicked( model ) {
    console.log( 'unlock detected in model ' + model.jobData.id )
  }
}