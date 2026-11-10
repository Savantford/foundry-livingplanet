import { makeUuidStrField } from '../field-presets.mjs';

export default class NarrativeModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const schema = {
      scene: makeUuidStrField()
    };

    return schema;
  }
}