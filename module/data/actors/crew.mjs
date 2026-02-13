import {
  fields,
  makeIntField,
  makeStrField
} from './common.mjs'

export default class CrewModel extends foundry.abstract.DataModel {

  static defineSchema() {
    const type = 'crew';
    
    return {
      type: makeStrField('bonding',0),
      difficulty: makeIntField(0),

      duration: new fields.SchemaField({
        value: makeIntField(0),
        max: makeIntField(6)
      }),

    }
  }

  /**
   * Migrate source data from some prior format into a new specification.
   * The source parameter is either original data retrieved from disk or provided by an update operation.
   * @inheritDoc
   */
  static migrateData(source) {

    return super.migrateData(source);
  }

  /* -------------------------------------------- */
  /*  Properties (Getters)                        */
  /* -------------------------------------------- */

  /**
   * Determine whether the character is injured.
   * @type {boolean}
   */
  /*get dead() {
    const invulnerable = CONFIG.specialStatusEffects.INVULNERABLE;
    if ( this.parent.effects.some(e => e.statuses.has("invulnerable") )) return false;
    return this.health.value <= this.health.min;
  }*/

  /* The defined dead property could then be accessed on any Actor document of the character type as follows:

  // Determine if a character is dead.
  game.actors.getName("Character").system.dead;
  */

}