import {
  makeIntField,
  makeStrField
} from '../field-presets.mjs';

export default class DeviantModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const makeAttribute = x => new fields.SchemaField({
      current: makeIntField({ initial: 0 }),
      normal: makeIntField({ initial: 0 })
    })

    const schema = {
      frame: makeStrField(''),

      attributes: new fields.SchemaField({
        power: makeAttribute(),
        agility: makeAttribute(),
        cunning: makeAttribute()
      }),

      impatience: new fields.SchemaField({
        value: makeIntField({ initial: 0 }),
        max: makeIntField({ initial: 6 })
      }),

      advantage: new fields.SchemaField({
        scene: makeIntField({ initial: 0 }),
      }),
      experience: makeIntField({ initial: 0 }),

      harm: new fields.SchemaField({
        stress: makeIntField({ initial: 0 }),
        fatigue: makeIntField({ initial: 0 }),
        damage: makeIntField({ initial: 0 })
      })
    };

    return schema;
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