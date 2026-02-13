import LPItemSheet from "./item-sheet.mjs";

/**
 * Extend the LPItemSheet with some modifications
 * @extends {LPItemSheet}
*/

export default class AssetSheet extends LPItemSheet {
  
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['asset'],
    window: {
      icon: 'fa-solid fa-tools',
      controls: [
      ]
    },
    position: {
      width: 520,
      height: 200,
    }
  }

  /** @override */
  /*static PARTS = {
    main: { template: 'systems/livingplanet/templates/actors/deviant-sheet.hbs' },

    // Partials
    clock: { template: 'systems/livingplanet/templates/progress-clock.hbs' },
    asset: { template: 'systems/livingplanet/templates/actors/item/asset.hbs' },
    strength: { template: 'systems/livingplanet/templates/actors/parts/actor-strength.hbs' },
    challenge: { template: 'systems/livingplanet/templates/actors/parts/actor-challenge.hbs' }
  }*/

  /** @override */
  /*_configureRenderOptions(options) {
    super._configureRenderOptions(options);
    
    // Completely overriding the parts 
    options.parts = ['main'];
    
    return options;
  }*/

}