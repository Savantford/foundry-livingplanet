// Similar syntax to importing, but note that
// this is object destructuring rather than an actual import
const ActorSheetV2 = foundry.applications?.sheets?.ActorSheetV2 ?? (class {});
const HandlebarsApplicationMixin = foundry.applications?.api?.HandlebarsApplicationMixin ?? (cls => cls);

/**
 * Extend the basic ActorSheetV2 with modifications tailored for HotLP.
 * @extends {ActorSheetV2}
*/
export default class LPActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  /*constructor(options = {}) {
    super(options); // Required for the constructor to work 
  }*/
  
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['livingplanet', 'sheet', 'actor'],
    tag: 'form',
    window: {
      icon: 'far fa-scroll',
      resizable: true,
      contentClasses: ['scrollable']
    },
    actions: {
      //editModeToggle: this.#onToggleEditMode,
      //attributeRoll: this.#onAttributeRoll,

      itemCreate: this.#onItemCreate,
      itemEdit: this.#onItemEdit,
      itemRemove: this.#onItemRemove,

      updateProgress: this.#onProgressUpdate,

      itemUse: this.#onItemUse
    },
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    position: {
      width: 600,
      height: 600
    }
  }

  /* -------------------------------------------- */

   /** @override */
  get title() {
    const {constructor: cls, id, name, type} = this.actor;
    const prefix = cls.hasTypeData && type !== "base" ? CONFIG[cls.documentName].typeLabels[type] : cls.metadata.label;
    return `${name ?? id} - ${_loc(prefix)}`;
  }

  /* -------------------------------------------- */
  static PARTS = {
    // Handled by the subclasses
  }

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    // Handled by the subclass
    return options;
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
    const actorData = this.actor;
    
    // Add the actor's data to context.system for easier access, as well as flags.
    foundry.utils.mergeObject(context, {
      actor: actorData,
      system: actorData.system,
      flags: actorData.flags,
      dtypes: ['String', 'Number', 'Boolean']
    })

    // Prepare common data
    context.numbersObj = CONFIG.LP.dropdownNumbers;

    if (actorData.type === 'deviant' || actorData.type === 'entity') {
      // Prepare Impatience Array
      context.impatience = [];
      const imp = context.system.impatience;

      for (let i = 0; i < imp.max; i++) {
        context.impatience.push({
          id: i+1,
          checked: (parseInt(imp.value) === (i+1)) ? true : false
        });
      }

      context.impatience = context.impatience.reverse();
    }

    // Prepare Deviant data and items.
    if (actorData.type == 'deviant') {
      this._prepareDeviantData(context);  
    }

    // Prepare Entity data and items.
    if (actorData.type == 'entity') {
      
    }

    // Prepare items
    context.items = this.actor.items.contents.toSorted((a, b) => a.sort - b.sort);
    this._prepareItems(context);

    // Add roll data for TinyMCE editors.
    context.rollData = actorData.getRollData();

    // Prepare active effects
    //context.effects = prepareActiveEffectCategories(this.actor.effects);
    
    return context;
  }

  

  _prepareItems(context) {
    // Initialize containers.
    const [assets, connections, skills] = [[], [], []];
    
    // Iterate through items, allocating to containers
    for (let i of context.items) {
      //let item = i;
      i.img = i.img || DEFAULT_TOKEN;
      
      // Prepare progress clock array
      if (i.type === 'challenge' || i.type === 'connection') {
        const progressArr = [];
        
        const progress = i.system.progress ? i.system.progress : { value: 0, max: 2 };

        for (let i = 0; i < progress.max; i++) {
          progressArr.push({
            id: i+1,
            checked: (parseInt(progress.value) === (i+1)) ? true : false
          });
        }

        i.progressArr = progressArr.reverse();
      }

      // Append items to the correct list
      switch (i.type) {
        case 'asset': assets.push(i); break;
        case 'connection': connections.push(i); break;
        case 'skill': skills.push(i); break;
      }

    }

    // Assign lists to context
    foundry.utils.mergeObject(context, {
      assets,
      connections,
      skills
    });
  }

  /** @override */
  /*async _preparePartContext(partId, context, options) {
    await super._preparePartContext(partId, context, options);

    switch (partId) {
      // Summmary tab
      case 'summary':
        context.tab = context.tabs[partId];
      break;
    }

    return context;
  }*/

  /**
   * Organize and classify Items for Deviant sheets.
   *
   * @param {Object} system The actor to prepare.
   *
   * @return {undefined}
  */

  async _prepareDeviantData(context) {

    // Prepare enriched variables for editor.
    /*context.system.details.features.enriched = await TextEditor.enrichHTML(context.system.details.features.value, { async: true })
    context.system.details.personality.enriched = await TextEditor.enrichHTML(context.system.details.personality.value, { async: true })
    context.system.details.belief.enriched = await TextEditor.enrichHTML(context.system.details.belief.value, { async: true })
    context.system.details.information.enriched = await TextEditor.enrichHTML(context.system.details.information.value, { async: true })
    context.system.details.bg_ancestry.enriched = await TextEditor.enrichHTML(context.system.details.bg_ancestry.value, { async: true })
    context.system.details.deeds.enriched = await TextEditor.enrichHTML(context.system.details.deeds.value, { async: true })*/
  }

  /* -------------------------------------------- */

  _onRender(context, options) {
    const html = this.element;

    if (this.actor.type !== 'deviant') return;

    // Create triangle graph
    const sides = 3; // no. of data points (increment this to add more data)
    const units = 2; // no. of graphs + 1 (increment this to add more graph)
    const vertices = (new Array(units)).fill("");
    const percents = new Array(units);
    percents[0] = (new Array(sides)).fill(100); // for the polygon's grid
    // each graph's data points in the order [B, C, D... A] 
    function convert(x) {
      switch(x) {
        case -2: return 1 * 100/5;
        case -1: return 2 * 100/5;
        case 0: return 3 * 100/5;
        case 1: return 4 * 100/5;
        case 2: return 5 * 100/5;
      }
    }
    
    const a = this.document.system.attributes;

    // Attributes
    percents[1] = [
      convert(a.cunning.current),
      convert(a.agility.current),
      convert(a.power.current)
    ];
    percents[2] = [100, 80, 30];
    percents[3] = [80, 10, 60];
    
    // (add to percents[] to add a new graph's data points)
    let gradient = "conic-gradient(";
    const angle = 360 / sides;

    /* calculate vertices */
    let i = 0, n = 0, j = 0;
    for (i = 0, n = 2 * Math.PI; i < sides; i++, n += 2 * Math.PI) {
      for (j = 0; j < units; j++) {
        const x = (Math.round(Math.cos(-1 * Math.PI / 2 + n / sides) * percents[j][i]) + 100) / 2;
        const y = (Math.round(Math.sin(-1 * Math.PI / 2 + n / sides) * percents[j][i]) + 100) / 2;
        
        vertices[j] += `${x}% ${y}${i == sides - 1 ? '%' : '%, '}`;
      }
      //gradient += `white ${(angle * (i + 1)) - 1}deg,#FF00DC ${(angle * (i + 1)) - 1}deg,#FF00DC ${(angle * (i + 1)) + 1}deg,white ${(angle * (i + 1)) + 1}deg,`;
    }

    /* draw polygons (grids + graphs) */
    html.querySelectorAll('.graphs > div').forEach((graph, i) => { graph.style.clipPath = `polygon(${vertices[i + 1]})`; });
    html.querySelectorAll('.grids > div').forEach((grid, i) => { grid.style.clipPath = `polygon(${vertices[0]})`; }); // Draw background grids
    //html.querySelector('.grids:nth-of-type(1)>div').style.background = `${gradient.slice(0, -1)})`;

    /* position data labels */
    const firstLabel = html.querySelector('.labels:first-of-type');
    
    // first label is always set in the top middle
    firstLabel.style.insetInlineStart = `calc(50% - ${firstLabel.offsetWidth / 2}px)`;

    // setting labels for the rest of the vertices (data points) 
    const v = Array.from(vertices[0].split(' ').splice(0, (2 * sides) - 2), (n) => parseInt(n));

    html.querySelectorAll('.labels:not(:first-of-type)').forEach((label, i) => {
      const width = label.offsetWidth / 2;
      const height = label.offsetHeight;
      label.style.insetInlineStart = `calc(${v[i * 2]}% + ${v[i * 2] < 50 ? -3 * width : v[i * 2] == 50 ? -width : width}px)`;
      label.style.insetBlockStart = `calc(${v[(i * 2) + 1]}% - ${v[(i * 2) + 1] == 100 ? -height : height / 2}px)`;
    });
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
  
  /**
   * Handle clicked sheet buttons
   * @param {Event} ev   The originating click event
   * @private
  */

  static #onItemUse(ev) {
    const button = ev.currentTarget,
      dataset = Object.assign({}, button.dataset),
      item = this.actor.items.get(dataset.itemId);

    switch (dataset.action) {
      case 'attribute-roll': this._onAttributeRoll(dataset); break;
      case 'targeted-use': this._onItemUse(dataset); break;
      case 'untargeted-use': this._onItemUse(dataset); break;
      case 'item-scroll': this._onItemScroll(item); break;
      case 'item-toggle-effects': this._onItemToggleEffects(item); break;
      case 'item-toggle-reloaded': this._onItemToggleReloaded(item); break;
      case 'item-collapse': this._onItemCollapse(button); break;
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
  */
  static async #onItemCreate(event, button) {
    const dataset = Object.assign({}, button.dataset);

    let type = dataset.type; // Get the type of item to create.
    
    let name = _loc('LP.NewItem', { itemType: type.capitalize() }) // Initialize a default name.

    let subtype = '';
    let source = '';
    let attribute = '';
    let damage = '';
    let against = '';
    let degree = '';
    
    // If Strength or Weakness, set type and degree
    if (type == 'Strength') {
      type = 'Strength or Weakness';
      degree = "1";
    } else if (type == 'Weakness') {
      type = 'Strength or Weakness';
      degree = "-1";
    }

    // If weapon, set default automated roll
    if (subtype == 'weapon') {
      attribute = 'str';
      against = 'def';
      damage = '1d6';
    }

    // If Character's Talent, set source
    if ((this.actor.type) && (type == 'Trait or Talent')) source = event.currentTarget.dataset.source;

    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: { degree }
    };

    // Create the item
    const [createdItem] = await this.actor.createEmbeddedDocuments('Item', [itemData]);

    // Render the created item's template
    createdItem.sheet.render(true);

    return 
  }

  // Render the item sheet for viewing/editing prior to the editable check.
  static #onItemEdit(event, button) {
    const item = this.actor.items.get(button.dataset.itemId);

    item.sheet.render(true);
  }

  // On item remove
  static async #onItemRemove(event, button) {
    const item = this.actor.items.get(button.dataset.itemId);

    const confirm = await foundry.applications.api.DialogV2.confirm({
      title: _loc('LP.Item.Remove.Title'),
      content: `
        <p>${_loc('LP.Item.Remove.Msg')} <b>${item.name}</b>. ${_loc('LP.Item.Remove.Msg2')}</p>
        <p class="dialog-sure">${_loc('LP.Item.Remove.Confirm')} ${item.name}?</p>`
    });

    if (!confirm) return;

    item.delete();
  }

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

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
  */

  /*_onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle _onRoll events that has a defined rollType.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {       // Handle item rolls.
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula
    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.system);
      let label = dataset.label ? `Rolling ${dataset.label}` : '';

      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode')
      });
    }
  }*/

  /* -------------------------------------------- */
  /*  Drop item events                            */
  /* -------------------------------------------- */

  /** @override */
  /*async _onDropItemCreate(itemData) {
    const isAllowed = await this.checkDroppedItem(itemData)
    if (isAllowed) return await super._onDropItemCreate(itemData)
    console.warn('Wrong item type dragged', this.actor, itemData)
  }*/
}