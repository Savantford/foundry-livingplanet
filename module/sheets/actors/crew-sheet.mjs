import LPActorSheet from "./actor-sheet.mjs";

/**
 * Extend the LPActorSheet with some modifications
 * @extends {LPActorSheet}
*/

export default class CrewSheet extends LPActorSheet {
  
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['livingplanet', 'sheet', 'actor', 'crew'],
    window: {
      icon: 'fa-solid fa-users',
      controls: [
        {
          action: "startRest",
          icon: "fa-solid fa-campground",
          label: "WW.Rest.Label",
          ownership: "OWNER"
        }
      ]
    },
    position: {
      width: 500,
      height: 'auto'
    }
  }

  /** @override */
  static PARTS = {
    main: {
      template: 'systems/livingplanet/templates/actors/crew-sheet.hbs',
      scrollable: [''],
      templates: [
        'systems/livingplanet/templates/actors/parts/timeline-entry.hbs'
      ]
    }
  }

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    
    // Completely overriding the parts 
    options.parts = ['main'];
    
    return options;
  }

}