import BaseItemModel from './base-item.mjs';

export default class SkillModel extends BaseItemModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    const schema = super.defineSchema();
    
    foundry.utils.mergeObject(schema, {
      //source: makeStrField()
    });

    return schema;
  }
}