import {
  makeIntField,
  makeStrField
} from '../field-presets.mjs';

export default class ExpeditionSceneModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const schema = {
      type: makeStrField({ initial: 'bonding' }),

      complexity: new fields.SchemaField({
        value: makeIntField({ initial: 0 }),
        max: makeIntField({ initial: 6 })
      }),
    };

    return schema;
  }
}