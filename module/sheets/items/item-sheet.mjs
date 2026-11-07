const ItemSheetV2 = foundry.applications?.sheets?.ItemSheetV2 ?? (class {});
const HandlebarsApplicationMixin = foundry.applications?.api?.HandlebarsApplicationMixin ?? (cls => cls);

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
*/
export default class LPItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["livingplanet", "sheet", "item"],
      width: 520,
      height: 200,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    return `systems/livingplanet/templates/items/${this.item.type}.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = super.getData();

    // Use a safe clone of the item data for further operations.

    context.system = context.item.system;

    // Prepare enriched variables for editor.
    /*context.system.description.enriched = await TextEditor.enrichHTML(context.system.description.value, { async: true })

    if (context.item.type == 'Talent') {

    }*/

    // Prepare dropdown menu objects.
    switch (this.item.type) {
      case 'Strength or Weakness': {
        context.strengthDegrees = Object.entries(CONFIG.LP.STRENGTH_DEGREES).map(([k, v]) => ({key: k, label: v})).sort((a,b) => b.key - a.key);
      }; break;

      case 'Asset': {
        context.assetSources = CONFIG.LP.ASSET_SOURCES;
      }; break;

      case 'Challenge': {
        context.challengeTypes = CONFIG.LP.CHALLENGE_TYPES;
        context.challengeDifs = CONFIG.LP.CHALLENGE_DIFFICULTIES;
      }; break;
      
      case 'Connection': {
        context.connectionTypes = CONFIG.LP.CONNECTION_TYPES;
        context.connectionLevels = CONFIG.LP.CONNECTION_LEVELS;
      }; break;
    }

    // Prepare active effects
    //context.effects = prepareActiveEffectCategories(this.object.effects);

    // Prepare effect change key-labels
    //context.effectChangeKeys = CONFIG.WW.effectChangeKeys;

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  setPosition(options = {}) {
    const position = super.setPosition(options);
    const sheetBody = this.element.find(".sheet-body");
    const bodyHeight = position.height - 192;
    sheetBody.css("height", bodyHeight);
    return position;
  }
}
