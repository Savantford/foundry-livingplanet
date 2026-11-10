// Similar syntax to importing, but note that
// this is object destructuring rather than an actual import
const AbstractSidebarTab = foundry.applications.sidebar.AbstractSidebarTab ?? (class {});
const HandlebarsApplicationMixin = foundry.applications.api.HandlebarsApplicationMixin ?? (cls => cls);

/**
 * An app meant to track the narrative elements during the game.
 * @extends {AbstractSidebarTab}
*/
export default class NarrativeTracker extends HandlebarsApplicationMixin(AbstractSidebarTab) {
  static tabName = "narrative-tracker";

  static DEFAULT_OPTIONS = {
    classes: ['livingplanet'],
    window: {
      title: "LP.Narrative.Title",
      icon: "fa-solid fa-sitemap"
    },
    actions: {
      //cancel: this.#cancel
    }
  }

  /* -------------------------------------------- */

  static PARTS = {
    main: {
      template: 'systems/livingplanet/templates/apps/narrative-tracker.hbs'
    }
  }

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
    const scene = await fromUuid(settings.scene);
    
    const context = {
      scene
    };

    return context;
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
}