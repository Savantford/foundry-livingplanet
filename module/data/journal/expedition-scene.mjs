import {
  makeIntField,
  makePosIntField,
  makeRequiredStrField
} from '../field-presets.mjs';

export default class ExpeditionSceneModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const schema = {
      sceneType: makeRequiredStrField({
        label: _loc('LP.Scene.Type.Label'),
        initial: 'bonding',
        choices: {
          'bonding': _loc('LP.Scene.Type.Bonding'),
          'exploration': _loc('LP.Scene.Type.Exploration'),
          'action': _loc('LP.Scene.Type.Action')
        }
      }),

      complexity: makePosIntField({
        label: _loc('LP.Scene.Complexity'),
        initial: 1,
        max: 5,
        min: 0
      }),

      clocks: new fields.SchemaField({
        complexity: new fields.SchemaField({
          value: makeIntField({ initial: 0 }),
          max: makeIntField({ initial: 6 })
        }),

        countdown: new fields.SchemaField({
          value: makeIntField({ initial: 6 }),
          max: makeIntField({ initial: 6 })
        })
      })
    };

    return schema;
  }
}