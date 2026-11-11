import { makeUuidStrField } from '../field-presets.mjs';

export default class NarrativeModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const schema = {
      sceneUuid: makeUuidStrField()
    };

    return schema;
  }

  get scene() {
    return fromUuidSync(this.sceneUuid);
  }

  get entry() {
    return this.scene?.parent;
  }

  get expedition() {
    return this.entry ? this.entry.pages.find(p => p.type === 'expeditionSummary') : null;
  }
}