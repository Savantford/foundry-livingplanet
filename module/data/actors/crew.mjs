import {
  makeIntField,
  makeStrField
} from '../field-presets.mjs';

export default class CrewModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const schema = {
      preparation: new fields.NumberField({
        initial: 0,
        integer: true,
        min: 1,
        max: 5
      })
    };

    return schema;
  }
}