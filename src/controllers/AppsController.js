import 'phaser';
import {CONFIG, EVENT_TYPES} from '../constants';
import AppsView from '../views/AppsView';

/**
 * Controlls the buying of 'managers' for each job.
 * In this implementation, we refer to managers as apps.
 */
export default class AppsController {
  constructor({scene, model}) {
    this.model = model;

    this.appsMenu = new AppsView({
      scene, 
      model,
      atlas: CONFIG.ATLAS_NAME
    });

    this.appsMenu.emitter.on(EVENT_TYPES.APP_PURCHASED, this.onAppPurchased, this);
  }

  update() {
    this.appsMenu.update();
  }

  onAppPurchased( jobId ) {
    this.model.activateApp( jobId );
  }
}