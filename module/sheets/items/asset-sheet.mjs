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
  static PARTS = {
    main: { template: 'systems/livingplanet/templates/items/asset-sheet.hbs' }
  }

  /** @override */
  /*_configureRenderOptions(options) {
    super._configureRenderOptions(options);
    
    // Completely overriding the parts 
    options.parts = ['main'];
    
    return options;
  }*/

}