import {
  makeUuidStrField
} from '../field-presets.mjs';

export default class CrewModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const schema = {
      preparation: new fields.NumberField({
        label: _loc("LP.Crew.Preparation.Label"),
        initial: 0,
        integer: true,
        min: 0,
        max: 5
      }),

      members: new fields.SetField(makeUuidStrField())
    };

    return schema;
  }

  get memberDocs() {
    const map = [...this.members].map(uuid => fromUuidSync(uuid));
    return map;
  }
}