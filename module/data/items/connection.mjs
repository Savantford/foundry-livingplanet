import BaseItemModel from './base-item.mjs';
import { makeStrField, makeIntField } from '../field-presets.mjs';

export default class ConnectionModel extends BaseItemModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const schema = super.defineSchema();
    
    foundry.utils.mergeObject(schema, {
      type: makeStrField({ initial: 'personal' }),

      progress: new fields.SchemaField({
        value: makeIntField({ initial: 0 }),
        max: makeIntField({ initial: 6 })
      }),
    });

    return schema;
  }
}