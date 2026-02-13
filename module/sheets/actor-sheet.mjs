import { i18n, plusify, sum } from '../helpers/utils.mjs'
//import RollAttribute from '../apps/roll-attribute.mjs'
//import RollDamage from '../apps/roll-damage.mjs'
//import { onManageActiveEffect, prepareActiveEffectCategories } from '../active-effects/effects.mjs';
//import { LPAfflictions } from '../active-effects/afflictions.mjs';

// Similar syntax to importing, but note that
// this is object destructuring rather than an actual import
const ActorSheetV2 = foundry.applications?.sheets?.ActorSheetV2 ?? (class {});
const HandlebarsApplicationMixin = foundry.applications?.api?.HandlebarsApplicationMixin ?? (cls => cls);

/**
 * Extend the basic ActorSheetV2 with modifications tailored for SotWW
 * @extends {ActorSheetV2}
*/

export default class LPActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  constructor(options = {}) {
    super(options); // Required for the constructor to work 
  }
  
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['weirdwizard', 'sheet', 'actor'],
    tag: 'form',
    window: {
      title: this.title, // Custom title display
      icon: 'far fa-scroll',
      resizable: true,
      contentClasses: ['scrollable'],
      controls: super.DEFAULT_OPTIONS.window.controls.concat([ // Remove concat in V13
        {
          action: "embedInChat",
          icon: "fa-solid fa-scroll",
          label: "WW.System.Embed",
          ownership: "OWNER"
        },
        {
          action: "linkInChat",
          icon: "fa-solid fa-link",
          label: "WW.System.Link",
          ownership: "OWNER"
        },
        {
          action: "openTour",
          icon: "fa-solid fa-person-hiking",
          label: "WW.System.Tour",
          ownership: "OWNER"
        }
      ])
    },
    actions: {
      /*editImage: this.#onEditImage, // delete in V13; core functionality
      /*embedInChat: this.#embedInChat,
      linkInChat: this.#linkInChat,
      startRest: this.#onRest,
      resetSheet: this.#onSheetReset,

      editModeToggle: this.#onToggleEditMode,
      dispositionToggle: this.#onDispositionToggle,
      incapacitatedRoll: this.#onIncapacitatedRoll,
      attributeRoll: this.#onAttributeRoll,
      afflictionsMenu: this.#onAfflictionsMenuOpen,
      folderEdit: this.#onFolderEdit,

      entryCreate: this.#onEntryCreate,
      entryEdit: this.#onEntryEdit,
      entryRemove: this.#onEntryRemove,

      journalView: this.#onJournalView,
      journalRemove: this.#onJournalRemove,
      journalHelp: this.#onJournalHelp,

      itemCreate: this.#onItemCreate,
      itemEdit: this.#onItemEdit,
      itemRemove: this.#onItemRemove,

      itemLabelClick: this.#onItemLabelClick,
      itemScroll: this.#onItemScroll,
      itemToggleEffects: this.#onItemToggleEffects,
      itemToggleReloaded: this.#onItemToggleReloaded,
      itemUpdateUses: this.#onItemUpdateUses,
      containerCollapse: this.#onContainerCollapse,

      effectCreate: this.#onEffectCreate,
      effectEdit: this.#onEffectEdit,
      effectToggle: this.#onEffectToggle,
      effectRemove: this.#onEffectRemove*/
    },
    form: {
      //handler: this.#onSubmitDocumentForm, // delete in v13, core functionality
      submitOnChange: true,
      closeOnSubmit: false
    },
    position: {
      width: 860,
      height: 500
    }
  }

  /* -------------------------------------------- */

  /** @override */
  get title() {
    const {constructor: cls, id, name, type} = this.actor;
    const prefix = cls.hasTypeData && type !== "base" ? CONFIG[cls.documentName].typeLabels[type] : cls.metadata.label;
    return `${name ?? id} - ${game.i18n.localize(prefix)}`;
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

  /**
   * Generates the data for the generic tab navigation template
   * @param {string[]} parts An array of named template parts to render
   * @returns {Record<string, Partial<ApplicationTab>>}
   * @protected
   */
  _getTabs(parts) {
    // If you have sub-tabs this is necessary to change
    const tabGroup = 'primary';
    const type = this.actor.type;

    // Default tab for first time it's rendered this session
    if (!this.tabGroups[tabGroup]) this.tabGroups[tabGroup] = this.actor.limited ? 'details' : 'summary';
    
    // Assign tab properties
    return parts.reduce((tabs, partId) => {
      
      const tab = {
        cssClass: "",
        group: tabGroup,
        // Matches tab property to
        id: '',
        // Icon svg
        icon: '',
        // Run through localization
        label: ''
      };

      switch (partId) {
        case 'sidetabs':
          return tabs;
        case 'summary':
          tab.id = 'summary';
          tab.label = 'WW.Actor.Summary';
          tab.icon = 'systems/weirdwizard/assets/icons/diploma.svg';
          break;
        case 'details':
          if (type === 'Character') {
            tab.id = 'details';
            tab.label = 'WW.Actor.Details';
            tab.icon = 'systems/weirdwizard/assets/icons/scroll-quill.svg';
          }
          break;
        case 'equipment':
          if (type === 'Character') {
            tab.id = 'equipment';
            tab.label = 'WW.Equipment.Label';
            tab.icon = 'systems/weirdwizard/assets/icons/backpack.svg';
          }
          break;
        case 'talents':
          if (type === 'Character') {
            tab.id = 'talents';
            tab.label = 'WW.Talents.Label';
            tab.icon = 'systems/weirdwizard/assets/icons/skills.svg';
          }
          break;
        case 'spells':
          if (type === 'Character') {
            tab.id = 'spells';
            tab.label = 'WW.Spells.Label';
            tab.icon = 'systems/weirdwizard/assets/icons/spell-book.svg';
          }
          break;
        case 'description':
          if (type === 'NPC') {
            tab.id = 'description';
            tab.label = 'WW.Item.Description';
            tab.icon = 'systems/weirdwizard/assets/icons/scroll-quill.svg';
          }
          break;
        case 'effects':
          tab.id = 'effects';
          tab.label = 'WW.Effects.Label';
          tab.icon = '/icons/svg/aura.svg';
          break;
        default: break;
      }

      // Activate tab
      if (this.tabGroups[tabGroup] === tab.id) tab.cssClass = "active";
      if (tab.id) tabs[partId] = tab;

      return tabs;
    }, {});
  }

  /**
   * Prepare application rendering context data for a given render request.
   * @param {RenderOptions} options                 Options which configure application rendering behavior
   * @returns {Promise<ApplicationRenderContext>}   Context data for the render operation
   */
  async _prepareContext(options = {}) {
    const actorData = this.actor;
    
    // Add the actor's data to context.system for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;
    context.dtypes = ['String', 'Number', 'Boolean'];

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

    /*for (let attr of Object.values(context.system.attributes)) {
      attr.isCheckbox = attr.dtype === 'Boolean';
    }

    // Localize attribute names
    for (let [k, v] of Object.entries(context.system.attributes)) {
      v.label = i18n(CONFIG.LP.attributes[k] ?? k);
    }

    // Prepare common data
    context.system.description.enriched = await TextEditor.enrichHTML(context.system.description.value, { async: true })
    context.numbersObj = CONFIG.LP.dropdownNumbers;

    // Prepare hasEffect for use in templates
    context.hasEffect = {};

    CONFIG.statusEffects.forEach(function (e) {
      context.hasEffect[e.id] = actorData.statuses.has(e.id);
    })*/

    // Prepare Deviant data and items.
    /*if (actorData.type == 'Deviant') {
      this._prepareItems(context);
      this._prepareDeviantData(context);  
    }

    // Prepare Entity data and items.
    if (actorData.type == 'Entity') {
      this._prepareItems(context);
    }

    // Add roll data for TinyMCE editors.
    //context.rollData = context.actor.getRollData();

    // Prepare active effects
    //context.effects = prepareActiveEffectCategories(this.actor.effects);

    // Prepare effect change key-labels
    //context.effectChangeKeys = CONFIG.LP.effectChangeKeys;
    
    // Ensure editMode has a value
    if (this.editMode === undefined) this.editMode = false;
    
    const context = {
      actor: actorData, // Use a safe clone of the actor data for further operations.
    
      system: actorData.system, // Add the actor's data to context.system for easier access, as well as flags.
      charOptions: actorData.charOptions,
      folder: await actorData.folder,
      flags: actorData.flags,
      dtypes: ['String', 'Number', 'Boolean'],
      editMode: this.editMode, // Pass editMode state
      tabs: this._getTabs(options.parts),
      afflictions: this.appliedAfflictions,

      //itemSources: CONFIG.WW.TALENT_SOURCES,
      //tiers: CONFIG.WW.TIERS,

      injured: actorData.injured,
      incapacitated: actorData.incapacitated,
      dead: actorData.dead
    }
    
    // Prepare attributes
    for (let attr of Object.values(context.system.attributes)) {
      attr.isCheckbox = attr.dtype === 'Boolean';
    }

    // Localize attribute names
    for (let [k, v] of Object.entries(context.system.attributes)) {
      v.label = i18n(CONFIG.WW.ATTRIBUTES[k] ?? k);
    }

    // Prepare Disposition
    context.disposition = await this.actor?.token ? await this.actor.token.disposition : await this.actor.prototypeToken.disposition;

    // Prepare Health data
    const damage = actorData.system.stats.damage.value;
    const health = actorData.system.stats.health;
    const current = health.current;
    const temp = health.temp;

    // Get Health percentages
    context.healthPct = current > 0 ? (damage / current) * 100 : 100;
    context.tempHealthPct = current > 0 ? (temp < current ? (temp / current) * 100 : 100) : 0;

    // Get the degrees on the HSV wheel, going from 30° (greenish-yellow) to 120° (green)
    const degrees = mapRange((current ? damage : 1), 0, (current ? current : 1), 30, 120);
    // Invert the degrees and map them from 0 to a third
    context.healthHue = mapRange(120 - degrees, 0, 120, 0, 1 / 3);

    // Prepare Sizes
    context.sizes = Object.entries(CONFIG.WW.SIZES).map(([k, v]) => ({key: k, label: v})).sort((a,b) => a.key - b.key);
    context.size = CONFIG.WW.SIZES[context.system.stats.size];

    // Prepare hasEffect for use in templates
    context.hasEffect = {};

    CONFIG.statusEffects.forEach(function (e) {
      context.hasEffect[e.id] = actorData.statuses.has(e.id);
    })

    /* Tooltips */

    // Health tooltip
    /*context.healthTooltip = escape(`
      <p>${i18n("WW.Health.Current")}: ${health.current}</p>
      <p>${i18n("WW.Health.NormalScore")}: ${health.normal}</p>
      <p>${i18n("WW.Health.Temporary")}: ${health.temp}</p>
      <p>${i18n("WW.Health.Lost")}: ${health.lost}</p>
    `);

    if (!health.normal || health.temp) context.healthTooltip += `<hr/>`;
    if (!health.normal) context.healthTooltip += escape(`<p>• ${i18n('WW.Health.NormalHint')}</p>`);
    if (health.temp) context.healthTooltip += escape(`<p>• ${i18n("WW.Health.CurrentHint")}</p>`);

    // Speed tooltip
    context.speedTooltip = escape(`
      <p>${i18n("WW.Stats.NormalSpeed")}: ${actorData.system.stats.speed.normal}</p>
      <p>• ${i18n('WW.Stats.AutomationHint', { stat: i18n("WW.Stats.NormalSpeed") })}</p>
    `);

    // Size tooltip
    context.sizeTooltip = escape(`
      <p>${i18n('WW.Stats.AutomationHint', { stat: i18n("WW.Stats.Size") })}</p>
    `);

    // Bonus Damage Tooltip
    context.bonusDamageTooltip = escape(`
      <p>${i18n('WW.Stats.AutomationHint', { stat: i18n("WW.Damage.Bonus") })}</p>
    `);

    // Prepare Items
    context.items = this.actor.items.contents.toSorted((a, b) => a.sort - b.sort);
    await this._prepareItems(context);

    // Prepare character data
    if (actorData.type == 'Character') this._prepareCharacterData(context);

    // Prepare NPC data
    if (actorData.type == 'NPC') this._prepareNPCData(context);*/

    // Add roll data for TinyMCE editors.
    context.rollData = actorData.getRollData();
    
    return context;
  }

  /** @override */
  async _preparePartContext(partId, context, options) {
    await super._preparePartContext(partId, context, options);

    switch (partId) {
      // Summmary tab
      case 'summary':
        context.tab = context.tabs[partId];
      break;
      
      // Details tab
      case 'details':
        context.tab = context.tabs[partId];
      break;
      
      // Equipment tab
      case 'equipment':
        context.tab = context.tabs[partId];
      break;
      
      // Talents tab
      case 'talents':
        context.tab = context.tabs[partId];
      break;
      
      // Spells tab
      case 'spells':
        context.tab = context.tabs[partId];
      break;
      
      // Description tab
      case 'description':
        context.tab = context.tabs[partId];
        context.system.description.enriched = await TextEditor.enrichHTML(context.system.description.value, { async: true, secrets: this.actor.isOwner });
      break;
      
      // Effects tab
      case 'effects':
        context.tab = context.tabs[partId];

        // Prepare all applied active effects
        context.appliedEffects = await prepareActiveEffectCategories(await this.actor.appliedEffects);
        
        for (const c in context.appliedEffects) {
          context.appliedEffects[c].effects = context.appliedEffects[c].effects.toSorted((a, b) => a.sort - b.sort)
        }

        // Prepare all embedded active effects
        context.effects = await prepareActiveEffectCategories(await this.actor.effects);

        for (const c in context.effects) {
          context.effects[c].effects = context.effects[c].effects.toSorted((a, b) => a.sort - b.sort)
        };
        
      break;
    }

    return context;
  }
}

/*export class LPActorSheet extends ActorSheet {
  
  /** @override */
  /*static get defaultOptions() {

    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['livingplanet', 'sheet', 'actor'],
      width: 600,
      height: 600,
      tabs: [{ navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'features' }]
    });
  }

  /** @override */
  /*get template() {
    const path = 'systems/livingplanet/templates/actors';
    
    let permission = this.document.getUserLevel(game.user);
    if ((permission === CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED) | (permission === CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER)) return `${path}/${this.actor.type}-limited.hbs`;
    if (permission === CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) return `${path}/${this.actor.type}-sheet.hbs`;
    
    // Return a single sheet for all item types.
    // return `${path}/actor-sheet.html`;
    // Alternatively, you could use the following return statement to do a
    // unique actor sheet by type, like `Deviant-sheet.hbs`
  }
  
  /* -------------------------------------------- */

  /** @override */
  /*async getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    

    return context;
  }

  /**
       * Organize and classify Items for Deviant sheets.
       *
       * @param {Object} actorData The actor to prepare.
       *
       * @return {undefined}
  */

  /*_prepareItems(context) {
    // Initialize containers.
    const strengths = [];
    const weaknesses = [];
    const assets = [];
    const challenges = [];
    const connections = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      //let item = i;
      i.img = i.img || DEFAULT_TOKEN;
      
      // Prepare progress clock array
      if (i.type === 'Challenge' || i.type === 'Connection') {
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
        case 'Strength or Weakness': {
          if (i.system.degree > 0) strengths.push(i);
          else weaknesses.push(i);
        }; break;
  
        case 'Asset': assets.push(i); break;
  
        case 'Challenge': challenges.push(i); break;
        
        case 'Connection': connections.push(i); break;
      }

    }

    // Calculate total Equipment weight.
    /*function calcWeight(item, id) {
      item.system.weight = item.system.quantity * item.system.weightUnit;
    }

    equipment.forEach(calcWeight)

    context.totalWeight = sum(equipment.map(i => i.system.weight))

    // Prepare uses display for talents and spells
    function updateUses(item, id) {
      let spent = item.system.uses.value ? item.system.uses.value : 0;
      let max = item.system.uses.max;
      let arr = [];

      let i = 0; // fill the Buttons with available traditions

      for (i = 1; i <= max; i++) { // statement 1 = beginning of the block, statement 2 = condition, statement 3 = executed at the end of each loop
        if (i <= spent) { arr.push('fas') } else { arr.push('far') }; // fas (solid) = unspent, far (regular) = spent
      };

      item.uses = arr;
    }

    talents.forEach(updateUses)
    actions.forEach(updateUses)
    fury.forEach(updateUses)
    equipment.forEach(updateUses)
    spells.forEach(updateUses)*/

    // Assign and return
    /*context.strengths = strengths;
    context.weaknesses = weaknesses;
    context.assets = assets;
    context.challenges = challenges;
    context.connections = connections;
    
  }

  /**
   * Organize and classify Items for Deviant sheets.
   *
   * @param {Object} system The actor to prepare.
   *
   * @return {undefined}
  */

  /*async _prepareDeviantData(context) {

    // Prepare enriched variables for editor.
    /*context.system.details.features.enriched = await TextEditor.enrichHTML(context.system.details.features.value, { async: true })
    context.system.details.personality.enriched = await TextEditor.enrichHTML(context.system.details.personality.value, { async: true })
    context.system.details.belief.enriched = await TextEditor.enrichHTML(context.system.details.belief.value, { async: true })
    context.system.details.information.enriched = await TextEditor.enrichHTML(context.system.details.information.value, { async: true })
    context.system.details.bg_ancestry.enriched = await TextEditor.enrichHTML(context.system.details.bg_ancestry.value, { async: true })
    context.system.details.deeds.enriched = await TextEditor.enrichHTML(context.system.details.deeds.value, { async: true })*/
  /*}

  /** @override */
  /*activateListeners(html) {
    super.activateListeners(html);

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    let sides = 3; // no. of data points (increment this to add more data)
    let units = 2; // no. of graphs + 1 (increment this to add more graph)
    let vertices = (new Array(units)).fill("");
    let percents = new Array(units);
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
    
    const sys = this.object.system;
    percents[1] = [convert(sys.strategy), convert(sys.speed), convert(sys.power)];
    percents[2] = [100, 80, 30];
    percents[3] = [80, 10, 60];
    // (add to percents[] to add a new graph's data points)
    let gradient = "conic-gradient(";
    let angle = 360 / sides;

    /* calculate vertices */
    /*let i = 0, n = 0, j = 0;
    for (i = 0, n = 2 * Math.PI; i < sides; i++, n += 2 * Math.PI) {
      for (j = 0; j < units; j++) {
        let x = (Math.round(Math.cos(-1 * Math.PI / 2 + n / sides) * percents[j][i]) + 100) / 2;
        let y = (Math.round(Math.sin(-1 * Math.PI / 2 + n / sides) * percents[j][i]) + 100) / 2;
        vertices[j] += `${x}% ${y}${i == sides - 1 ? '%' : '%, '}`;
      }
      //gradient += `white ${(angle * (i + 1)) - 1}deg,#FF00DC ${(angle * (i + 1)) - 1}deg,#FF00DC ${(angle * (i + 1)) + 1}deg,white ${(angle * (i + 1)) + 1}deg,`;
    }

    /* draw polygons (grids + graphs) */
    /*html[0].querySelectorAll('.graphs > div').forEach((graph, i) => { graph.style.clipPath = `polygon(${vertices[i + 1]})`; });
    html[0].querySelectorAll('.grids>div').forEach((grid, i) => { grid.style.clipPath = `polygon(${vertices[0]})`; });
    //html[0].querySelector('.grids:nth-of-type(1)>div').style.background = `${gradient.slice(0, -1)})`;

    /* position data labels */
    /*let firstLabel = html[0].querySelector('.labels:first-of-type');
    // first label is always set in the top middle
    firstLabel.style.insetInlineStart = `calc(50% - ${firstLabel.offsetWidth / 2}px)`;
    // setting labels for the rest of the vertices (data points) 
    let v = Array.from(vertices[0].split(' ').splice(0, (2 * sides) - 2), (n) => parseInt(n));
    html[0].querySelectorAll('.labels:not(:first-of-type)').forEach((label, i) => {
      let width = label.offsetWidth / 2;
      let height = label.offsetHeight;
      label.style.insetInlineStart = `calc(${v[i * 2]}% + ${v[i * 2] < 50 ? -3 * width : v[i * 2] == 50 ? -width : width}px)`;
      label.style.insetBlockStart = `calc(${v[(i * 2) + 1]}% - ${v[(i * 2) + 1] == 100 ? -height : height / 2}px)`;
    });*/

    /////////// ATTRIBUTES & STATS /////////////

    // Rollable attributes.
    /*html.find('.rollable').click(ev => { //this._onRoll.bind(this)
      // Define variables to be used
      let system = this.object.system;
      let label = '';
      let content = '';
      let attKey = '';
      let fixedBoons = 0;
      
      if ($(ev.currentTarget).hasClass('item-roll')) { // If it is a roll from an item.
        let li = $(ev.currentTarget).parents('.item');
        if (!li.length) { // If parent does not have .item class, set li to current target.
          li = $(ev.currentTarget);
        }

        const item = this.actor.items.get(li.data('itemId'));

        label = item.name;
        fixedBoons = item.system.boons;
        
        if (this.actor.type == 'Deviant') content = item.system.description.value;
        
        if (this.actor.system.attributes[item.system.attribute]) {
          attKey = item.system.attribute;
        }

      }
      
      // If the clicked element has a data-label, use it to determine the mod and label
      switch (ev.target.getAttribute('data-label')) {
        case 'Strength': {
          label = i18n('LP.Strength');
          attKey = 'str';
          break;
        }
        case 'Agility': {
          label = i18n('LP.Agility');
          attKey = 'agi';
          break;
        }
        case 'Intellect': {
          label = i18n('LP.Intellect');
          attKey = 'int';
          break;
        }
        case 'Will': {
          label = i18n('LP.Will');
          attKey = 'wil';
          break;
        }
        case 'Luck': {
          label = i18n('LP.Luck');
          attKey = 'luck';
          break;
        }
      }

      let obj = {
        actor: this.actor,
        target: ev,
        label: label,
        content: content,
        attKey: attKey,
        fixedBoons: fixedBoons
      }

      new RollAttribute(obj).render(true)
    });

    // Damage Roll
    html.find('.damage-roll').click(ev => { //this._onRoll.bind(this)
      // Define variables to be used
      let li = $(ev.currentTarget).parents('.item');

      if (!li.length) { // If parent does not have .item class, set li to current target.
        li = $(ev.currentTarget);
      }

      const item = this.actor.items.get(li.data('itemId'));
      
      let obj = {
        actor: this.actor,
        target: ev,
        label: i18n('LP.Damage.Of') + ' ' + item.name,
        baseDamage: item.system.damage,
        bonusDamage: this.actor.system.stats.bonusdamage
      }

      new RollDamage(obj).render(true)
    });

    // Healing Roll
    html.find('.healing-roll').click(ev => { //this._onRoll.bind(this)
      // Define variables to be used
      let li = $(ev.currentTarget).parents('.item');

      if (!li.length) { // If parent does not have .item class, set li to current target.
        li = $(ev.currentTarget);
      }

      const item = this.actor.items.get(li.data('itemId'));
      
      let roll = new Roll(item.system.healing, this.actor.system);
      let label = i18n('LP.HealingOf') + ' ' + item.name;

      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode')
      });
      
    });

    // Edit Health button
    html.find('.health-edit').click(ev => {
      new healthDetails(this.actor).render(true)
    });

    /////////////////////// ITEMS ////////////////////////

    // Handle item buttons
    html.find('.item-button').click(this._onItemButtonClicked.bind(this))

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Update Progress
    html.find('.progress input').click(ev => this._onProgressUpdate(ev));

    // Update Progress
    html.find('.progress input').contextmenu(ev => this._onProgressReset(ev));

    ////////////////// EFFECTS ////////////////////

    // Active Effect management
    html.find('.effect-control').click(ev => onManageActiveEffect(ev, this.actor));

    // Disable Afflictions
    html.find('.remove-afflictions').click(async () => {
      await LPAfflictions.clearAfflictions(this.actor);
    });

    // Afflictions tab checkboxes
    html.find('.afflictions input').click(async ev => {
      const input = ev.currentTarget;
      const checked = input.checked;
      const afflictionId = $(ev.currentTarget).data('name');

      if (checked) {
        const affliction = CONFIG.statusEffects.find(a => a.id === afflictionId);
        
        if (!affliction) return false
        affliction['statuses'] = [affliction.id];
        
        await ActiveEffect.create(affliction, {parent: this.actor});

      } else {
        const affliction = this.actor.effects.find(e => e?.statuses?.has(afflictionId));

        if (!affliction) return false

        await affliction.delete();
      }

      return true
    });

    // Drag events for macros.
    if (this.actor.isOwner) {
      const handler = ev => this._onDragStart(ev)
      html.find('.dropitem').each((i, li) => {
        if (li.classList.contains('inventory-header')) return
        li.setAttribute('draggable', true)
        li.addEventListener('dragstart', handler, false)
      })
    }
  }
  /* -------------------------------------------- */

  /* -------------------------------------------- */
  /*  Item button actions                         */
  /* -------------------------------------------- */
  
  /**
   * Handle clicked sheet buttons
   * @param {Event} ev   The originating click event
   * @private
  */

  /*_onItemButtonClicked(ev) {
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
      case 'item-edit': this._onItemEdit(item); break;
      case 'item-delete': this._onItemDelete(item, button); break;
      case 'item-collapse': this._onItemCollapse(button); break;
    }
    
  }

  // Render the item sheet for viewing/editing prior to the editable check.
  _onItemEdit(item) {
    item.sheet.render(true);
  }

  // On item delete
  async _onItemDelete(item, button) {
    const confirm = await Dialog.confirm({
      title: i18n('LP.Item.Delete.Title'),
      content: i18n('LP.Item.Delete.Msg') + ' <b>' + item.name + '</b>. ' + i18n('LP.Item.Delete.Msg2') + '<p class="dialog-sure">' + i18n('LP.Item.Delete.Confirm') + " " + item.name + '?</p>'
    });

    if (!confirm) return;

    item.delete();
    $(button).slideUp(200, () => this.render(false));
  }

  // Set progress clock value to the segment clicked
  _onProgressUpdate(ev) {
    
    const input = ev.currentTarget;
    const segment = input.value;

    const li = $(input).closest('.item');

    if (li.length) { // If the clock is from an item
      
      const itemId = li.data('itemId');

      const item = this.actor.items.get(itemId);
      
      item.update({ 'system.progress.value': segment });

    } else { // If not from an item
      //const ele = $(input).closest('.impatience').length ? 'impatience' : '';

      this.actor.update({ 'system.impatience.value': segment });
    }
    
  }

  // Reset Progress Clock
  _onProgressReset(ev) {
    
    const input = ev.currentTarget;

    const li = $(input).closest('.item');

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
  }

  /* -------------------------------------------- */
  /*  Drop item events                             */
  /* -------------------------------------------- */

  /** @override */
  /*async _onDropItemCreate(itemData) {
    const isAllowed = await this.checkDroppedItem(itemData)
    if (isAllowed) return await super._onDropItemCreate(itemData)
    console.warn('Wrong item type dragged', this.actor, itemData)
  }

  /* -------------------------------------------- */
  /** @override */
  /*async checkDroppedItem(itemData) {
    const type = itemData.type
    if (['specialaction', 'endoftheround'].includes(type)) return false

    if (type === 'ancestry') {
      const currentAncestriesIds = this.actor.items.filter(i => i.type === 'ancestry').map(i => i._id)
      if (currentAncestriesIds?.length > 0) await this.actor.deleteEmbeddedDocuments('Item', currentAncestriesIds)
      return true
    } else if (type === 'path' && this.actor.system.paths?.length >= 3) return false

    return true
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
  */
  /*async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    let type = header.dataset.type; // Get the type of item to create.
    let name = i18n('LP.NewItem', { itemType: type.capitalize() }) // Initialize a default name.

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

}*/