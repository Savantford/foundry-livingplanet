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
      width: 460,
      height: "auto"
    }
  }

  /** @override */
  static PARTS = {
    main: {
      template: 'systems/livingplanet/templates/actors/deviant-sheet.hbs',
      scrollable: ['']
    }
  }

  /** @override */
  /*_configureRenderOptions(options) {
    super._configureRenderOptions(options);
    
    // Completely overriding the parts 
    options.parts = ['main'];
    
    return options;
  }*/

}