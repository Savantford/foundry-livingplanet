import {
  makeBooField,
  makeIntField,
  makeRequiredStrField,
  makeStrField
} from '../field-presets.mjs';

export default class ExpeditionSummaryModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const schema = {
      objectives: new fields.SetField(
        new fields.SchemaField({
          text: makeStrField(),
          done: makeBooField(),
          type: makeRequiredStrField({
            label: _loc('LP.Expedition.Objective.Type'),
            initial: 'main',
            choices: {
              'main': _loc('LP.Expedition.Objective.Main'),
              'secondary': _loc('LP.Expedition.Objective.Secondary')
            }
          }),
        })
      ),

      countdown: new fields.SchemaField({
        value: makeIntField({ initial: 0 }),
        max: makeIntField({ initial: 6 })
      }),
    };

    return schema;
  }
}