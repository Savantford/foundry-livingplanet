import { makeIntField, makeStrField, makeUuidStrField } from '../field-presets.mjs';

export default class DeviantModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const makeAttribute = x => new fields.SchemaField({
      current: makeIntField({ initial: 0 }),
      normal: makeIntField({ initial: 0 })
    })

    const schema = {
      frame: makeStrField(),
      background: makeStrField(),
      dream: makeStrField(),
      crew: makeUuidStrField(),

      attributes: new fields.SchemaField({
        power: makeAttribute(),
        agility: makeAttribute(),
        cunning: makeAttribute()
      }),

      impatience: new fields.SchemaField({
        value: makeIntField({ initial: 0 }),
        max: makeIntField({ initial: 6 })
      }),

      experience: makeIntField({ initial: 0 }),

      harm: new fields.SchemaField({
        stress: makeIntField({ initial: 0 }),
        fatigue: makeIntField({ initial: 0 }),
        damage: makeIntField({ initial: 0 })
      }),
      
      // Non-persisted fields
      ups: new fields.NumberField({
        initial: 0,
        persisted: false
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
  get crewDoc() {
    return fromUuidSync(this.crew);
  }

  /* -------------------------------------------- */

  /**
   * Determine whether the character is injured.
   * @type {boolean}
   */
  get crewPreparation() {
    return fromUuidSync(this.crew).system.preparation;
  }

}