// Similar syntax to importing, but note that
// this is object destructuring rather than an actual import
const JournalEntryPageHandlebarsSheet = foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet;

/**
 * Extend the basic JournalEntryPageHandlebarsSheet with modifications tailored for HotLP.
 * @extends {ActorSheetV2}
*/
export default class LPJournalPageSheet extends JournalEntryPageHandlebarsSheet {
  /*constructor(options = {}) {
    super(options); // Required for the constructor to work 
  }*/

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['livingplanet'],
    actions: {
      updateProgress: this.#onProgressUpdate
    },
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    }
  }

  /* -------------------------------------------- */

   /** @override */
  get title() {
    const {constructor: cls, id, name, type} = this.document;
    const prefix = cls.hasTypeData && type !== "base" ? CONFIG[cls.documentName].typeLabels[type] : cls.metadata.label;
    return `${name ?? id} - ${_loc(prefix)}`;
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare application rendering context data for a given render request.
   * @param {RenderOptions} options                 Options which configure application rendering behavior
   * @returns {Promise<ApplicationRenderContext>}   Context data for the render operation
   */
  async _prepareContext(options = {}) {
    const context = await super._prepareContext(options);

    context.sysFields = context.document.system.schema.fields;
    
    return context;
  }

  /* -------------------------------------------- */

  async _onRender(context, options) {
    await super._onRender(context, options);
  }

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /*_processFormData(event, form, formData) {
    return foundry.utils.expandObject(formData.object);
  }*/

  /* -------------------------------------------- */
  /*  Item button actions                         */
  /* -------------------------------------------- */

  // Set progress clock value to the segment clicked
  static #onProgressUpdate(event, button) {
    const segment = parseInt(button.value);

    const li = $(button).closest('.item');

    if (li.length) { // If the clock is from an item
      const itemId = li.data('itemId');
      const item = this.actor.items.get(itemId);
      const current = foundry.utils.getProperty(item, 'system.progress.value');

      item.update({ 'system.progress.value': current === segment ? segment - 1 : segment });

    } else { // If not from an item
      //const ele = $(button).closest('.impatience').length ? 'impatience' : '';

      const current = foundry.utils.getProperty(this.actor, 'system.impatience.value');
      
      this.actor.update({ 'system.impatience.value': current === segment ? segment - 1 : segment });
    }
  }

  // Reset Progress Clock (Luxury, requires right click listener)
  static #onProgressReset(event, button) {
    const li = $(button).closest('.item');

    if (li.length) { // If the clock is from an item
      const itemId = li.data('itemId');

      const item = this.actor.items.get(itemId);
      
      item.update({ 'system.progress.value': 0 });

    } else { // If not from an item
      this.actor.update({ 'system.impatience.value': 0 });
    }
  }
}