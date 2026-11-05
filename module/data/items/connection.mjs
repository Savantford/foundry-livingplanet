import {
  //base,
  progress,
  makeStrField,
  makeBooField,
  makeHtmlField
} from '../field-presets.mjs';

export default class ConnectionData extends foundry.abstract.DataModel {

  static defineSchema() {
    
    return {
      //...base(type),
      ...progress(),
      
      type: makeStrField('personal',0,1)
      
    }
  }

  /**
   * Migrate source data from some prior format into a new specification.
   * The source parameter is either original data retrieved from disk or provided by an update operation.
   * @inheritDoc
   */
  static migrateData(source) {
    
    // Make sure Range is a number

    return super.migrateData(source);
  }

  /**
   * Determine whether the item is destroyed.
   * @type {boolean}
   */
  /*get destroyed() {
    const invulnerable = CONFIG.specialStatusEffects.INVULNERABLE;
    if ( this.parent.effects.some(e => e.statuses.has('invulnerable') )) return false;
    return this.health.value <= this.health.min;
  }*/

  /* The defined destroyed property could then be accessed on any Actor document of the item type as follows:

  // Determine if a item is destroyed.
  game.actors.getName('Character').system.destroyed;
  */

}