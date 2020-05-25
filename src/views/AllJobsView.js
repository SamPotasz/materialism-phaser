import 'phaser';
import JobView from './JobView.js';

export default class AllJobsView {
  constructor({scene, x, y, data}) {
    // console.log('in ajv')
    // console.log({data});
    this.jobViews = [];
    data.forEach( (model, i)  => {
      console.log(`iterating over ${i}`)
      console.log({model})
      this.jobViews.push( new JobView({ 
        scene, 
        x,
        y: y + i * 40,
        model
      }))
    });
  }
}