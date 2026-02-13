import LPActorSheet from "./actor-sheet.mjs";

/**
 * Extend the LPActorSheet with some modifications
 * @extends {LPActorSheet}
*/

export default class DeviantSheet extends LPActorSheet {
  
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['livingplanet', 'sheet', 'actor', 'deviant'],
    window: {
      icon: 'fa-solid fa-user',
      controls: [
        {
          action: "startRest",
          icon: "fa-solid  fa-campground",
          label: "WW.Rest.Label",
          ownership: "OWNER"
        }
      ]
    },
    position: {
      width: 400,
      height: 600
    }
  }

  /** @override */
  static PARTS = {
    main: { template: 'systems/livingplanet/templates/actors/deviant-sheet.hbs' },

    // Partials
    clock: { template: 'systems/livingplanet/templates/progress-clock.hbs' },
    asset: { template: 'systems/livingplanet/templates/actors/item/asset.hbs' },
    strength: { template: 'systems/livingplanet/templates/actors/parts/actor-strength.hbs' },
    challenge: { template: 'systems/livingplanet/templates/actors/parts/actor-challenge.hbs' }
  }

  /** @override */
  /*_configureRenderOptions(options) {
    super._configureRenderOptions(options);
    
    // Completely overriding the parts 
    options.parts = ['main'];
    
    return options;
  }*/

}