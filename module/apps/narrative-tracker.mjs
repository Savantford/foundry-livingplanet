// Similar syntax to importing, but note that
// this is object destructuring rather than an actual import
const AbstractSidebarTab = foundry.applications.sidebar.AbstractSidebarTab ?? (class {});
const HandlebarsApplicationMixin = foundry.applications.api.HandlebarsApplicationMixin ?? (cls => cls);

/**
 * An app meant to track the narrative elements during the game.
 * @extends {AbstractSidebarTab}
*/
export default class NarrativeTracker extends HandlebarsApplicationMixin(AbstractSidebarTab) {
  static tabName = "narrativeTracker";

  static DEFAULT_OPTIONS = {
    classes: ['livingplanet', 'narrative-tracker'],
    window: {
      title: "LP.Narrative.Title",
      icon: "fa-solid fa-sitemap"
    },
    position: {
      top: 350,
      left: 20,
      width: 350
    },
    actions: {
      //cancel: this.#cancel
    }
  }

  /* -------------------------------------------- */

  static PARTS = {
    main: {
      template: 'systems/livingplanet/templates/apps/narrative/tracker.hbs',
      classes: ['main'],
      templates: [
        'systems/livingplanet/templates/apps/narrative/parts/scenes-list.hbs',
        'systems/livingplanet/templates/apps/narrative/parts/expedition.hbs',
        'systems/livingplanet/templates/apps/narrative/parts/scene.hbs'
      ]
    }
  }

  /* -------------------------------------------- */

  /**
   * Return a cached copy of a DragDrop instance, creating one on first access.
   * @type {DragDrop}
   * @protected
   */
  get _dragDrop() {
    return this.#dragDrop ??= new foundry.applications.ux.DragDrop.implementation({
      permissions: {
        dragstart: this._canDragStart.bind(this),
        drop: this._canDragDrop.bind(this)
      },
      callbacks: {
        dragstart: this._onDragStart.bind(this),
        dragover: this._onDragOver.bind(this),
        drop: this._onDrop.bind(this)
      }
    });
  }

  /** @type {DragDrop|null} */
  #dragDrop = null;

  /* -------------------------------------------- */
  
  debounceRender = foundry.utils.debounce(this.render, 50);

  constructor(options={}) {
    super(options); // Required for "this." to work

    /*this.initialLayer = canvas.activeLayer;

    // Activate the Targeting tool in the Tokens layer
    canvas.tokens.activate({ tool: 'target' });

    // Hide the app that originated the Helper
    options.originApp?.minimize();

    // Display range
    if (options.item) options.item.displayRange();

    Hooks.on("targetToken", () => this.debounceRender() );*/
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  async _prepareContext(options = {}) {
    const settings = game.settings.get('livingplanet', 'narrativeSettings');
    const { scene, entry, expedition } = settings;
    const enrichHTML = async x => await foundry.applications.ux.TextEditor.implementation.enrichHTML(x);

    const context = {
      expedition, entry, scene,
      sceneTypes: CONFIG.LP.SCENE_TYPES,
      sceneTypeLabels: CONFIG.LP.SCENE_TYPE_LABELS,
      sysFields: foundry.utils.getProperty(scene, 'system.schema.fields')
    }
    
    if (scene) {
      // Prepare Scene Pages
      const sceneDocs = entry.pages.contents.filter(p => p.type === 'expeditionScene');
      const scenes = await Promise.all(sceneDocs?.map(async p => {
        return {
          id: p.id,
          name: p.name,
          type: p.system.sceneType,
          link: await enrichHTML(p.link),
          sort: p.sort
        }
      }))

      context.scenes = scenes;
    }

    return context;
  }

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    
    this._dragDrop.bind(this.element);
  }

  /* -------------------------------------------- */
  /*  Lifecycle & Form handling                   */
  /* -------------------------------------------- */

  #resolvers = Promise.withResolvers();

  get promise() { return this.#resolvers.promise; };

  /* -------------------------------------------- */

  /**
   * Create an Activity app instance and wait for it to be closed or confirmed.
   * @param config
   * @returns {Promise<any>}
   */

  static async wait(options) {
    const app = new this(options);
    app.render(true);
    return app.promise;
  }

  /* -------------------------------------------- */

  /**
   * @param {PointerEvent} event - The originating click event
   * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
   * @this {ActivityUse}
   */
  static async #cancel(event, target) {
    this.#resolvers.resolve({ cancel: true });
    this.close();
  }

  /* -------------------------------------------- */

  /** @override */
  _onClose(options) {
    this.#resolvers.resolve({ cancel: false });

    // Turn off targeting hook
    /*Hooks.off('targetToken');

    // Clear preview templates (Range)
    canvas.regions.clearPreviewContainer();

    // Switch back to the initial layer
    this.initialLayer.activate();

    // Clear region previews (Range display)
    canvas.regions.clearPreviewContainer();
    
    // Maximize the origin app
    this.options.originApp?.maximize();*/
  }

  /* -------------------------------------------- */
  /*  Drag and Drop                               */
  /* -------------------------------------------- */

  /**
   * Define whether a user is able to begin a dragstart workflow for a given drag selector.
   * @param {string} selector       The candidate HTML selector for dragging
   * @returns {boolean}             Can the current user drag this selector?
   * @protected
   */
  _canDragStart(selector) {
    return true;
  }

  /* -------------------------------------------- */

  /**
   * Define whether a user is able to conclude a drag-and-drop workflow for a given drop selector.
   * @param {string} selector       The candidate HTML selector for the drop target
   * @returns {boolean}             Can the current user drop on this selector?
   * @protected
   */
  _canDragDrop(selector) {
    return game.user.isActiveGM;
  }

  /* -------------------------------------------- */

  /**
   * An event that occurs when a drag workflow begins for a draggable Item or ActiveEffect on the sheet.
   * @param {DragEvent} event       The initiating drag start event
   * @returns {Promise<void>}
   * @protected
   */
  async _onDragStart(event) {
    const target = event.currentTarget;
    if ( "link" in event.target.dataset ) return;

    // If a Document reference is being dragged, assume it is either an Item or ActiveEffect
    const actor = this.document;
    const {effectId, itemId} = target.dataset;
    const item = actor.items.get(itemId);
    const effects = itemId ? item?.effects : actor.effects;
    const document = effectId ? effects?.get(effectId) : item;

    // Set data transfer
    const dragData = document?.toDragData();
    if ( dragData ) event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }

  /* -------------------------------------------- */

  /**
   * An event that occurs when a drag workflow moves over a drop target.
   * @param {DragEvent} event
   * @protected
   */
  _onDragOver(event) {
  }

  /* -------------------------------------------- */

  /**
   * An event that occurs when data is dropped into a drop target.
   * @param {DragEvent} event
   * @returns {Promise<void>}
   * @protected
   */
  async _onDrop(event) {
    const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(event);
    
    // Dropped Documents
    const documentClass = foundry.utils.getDocumentClass(data.type);
    if ( documentClass ) {
      const document = await documentClass.fromDropData(data);
      await this._onDropDocument(event, document);
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle a dropped document on the ActorSheet
   * @template {Document} TDocument
   * @param {DragEvent} event         The initiating drop event
   * @param {TDocument} document       The resolved Document class
   * @returns {Promise<TDocument|null>} A Document of the same type as the dropped one in case of a successful result,
   *                                    or null in case of failure or no action being taken
   * @protected
   */
  async _onDropDocument(event, document) {
    switch ( document.documentName ) {
      /*case "ActiveEffect":
        //return (await this._onDropActiveEffect(event, document)) ?? null;
      case "Actor":
        //return (await this._onDropActor(event, document)) ?? null;
      case "Item":
        //return (await this._onDropItem(event, document)) ?? null;
      case "Folder":
        //return (await this._onDropFolder(event, document)) ?? null;*/
      case "JournalEntry":
        return (await this._onDropJournalEntry(event, document)) ?? null;
      case "JournalEntryPage":
        return (await this._onDropJournalEntryPage(event, document)) ?? null;
      default:
        return null;
    }
  }

  /* -------------------------------------------- */

  async _onDropJournalEntry(event, entry) {
    for (const page of entry.pages) {
      if (page.type === 'expeditionScene') {
        const obj = foundry.utils.mergeObject(
          {...game.settings.get('livingplanet', 'narrativeSettings')},
          { sceneUuid: page.uuid }
        );
        
        const setting = await game.settings.set('livingplanet', 'narrativeSettings', obj);

        this.render();
        ui.notifications.success(_loc('LP.Narrative.EntryAdded'), { entry: entry.name });

        return setting;
      }
    }

    return null;
  }

  /* -------------------------------------------- */

  async _onDropJournalEntryPage(event, page) {
    if (page.type === 'expeditionSummary' || page.type === 'expeditionScene') {
      const obj = foundry.utils.mergeObject(
        {...game.settings.get('livingplanet', 'narrativeSettings')},
        { sceneUuid: page.uuid }
      );
      
      const setting = await game.settings.set('livingplanet', 'narrativeSettings', obj);
      
      this.render();
      ui.notifications.success(_loc('LP.Narrative.SceneAdded'), { page: page.name });

      return setting;
    }

    return null;
  }
}