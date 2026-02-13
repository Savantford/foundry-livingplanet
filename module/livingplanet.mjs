console.log('HotLP | Initializing...');

// Import document classes
import LPActor from './documents/actor.mjs';
import LPItem from './documents/item.mjs';
//import { LPToken } from './documents/token.mjs';

// Import data models
import DeviantModel from './data/actors/deviant.mjs';
import EntityModel from './data/actors/entity.mjs';
import CrewModel from './data/actors/crew.mjs';
import AssetModel from './data/items/asset.mjs';

// Import sheet classes
import DeviantSheet from './sheets/deviant-sheet.mjs';
//import EntitySheet from './sheets/entity-sheet.mjs';
//import CrewSheet from './sheets/crew-sheet.mjs';
//import AssetSheet from './sheets/item/asset-sheet.mjs';

// Import helper/utility classes and constants
import { LP } from './config.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  
  game.livingplanet = {
    LPActor,
    LPItem
  };

  // Add custom constants for configuration.
  CONFIG.LP = LP;
  
  // Define custom Document classes
  CONFIG.Actor.documentClass = LPActor;
  CONFIG.Actor.defaultType = 'entity';
  CONFIG.Item.documentClass = LPItem;

  // Register data models
  CONFIG.Actor.dataModels.deviant = DeviantModel;
  CONFIG.Actor.dataModels.entity = EntityModel;
  CONFIG.Actor.dataModels.crew = CrewModel;
  CONFIG.Item.dataModels.asset = AssetModel;
  
  // Register actor Sheet classes
  const Actors = foundry.documents.collections.Actors;

  Actors.registerSheet('livingplanet', DeviantSheet, {
    types: ['deviant'],
    makeDefault: true,
    label: 'WW.System.Sheet.Deviant'
  });
  /*Actors.registerSheet('livingplanet', EntitySheet, {
    types: ['entity'],
    makeDefault: true,
    label: 'WW.System.Sheet.Entity'
  });*/
  /*Actors.registerSheet('livingplanet', CrewSheet, {
    types: ['crew'],
    makeDefault: true,
    label: 'WW.System.Sheet.Crew'
  });*/

  // Register item Sheet classes
  const Items = foundry.documents.collections.Items;

  /*Items.registerSheet('livingplanet', AssetSheet, {
    types: ['asset'],
    makeDefault: true,
    label: 'WW.System.Sheet.Asset'
  });*/

  // Register custom Object classes (placeables)
  //CONFIG.Token.objectClass = LPToken;

  // Define token resources/bars
  /*CONFIG.Actor.trackableAttributes = {
    Character: {
      bar: [],
      value: ['stats.health.lasting']
    },
    NPC: {
      bar: [],
      value: ['stats.health.fleeting']
    }
  };*/

  // Preload Handlebars templates.
  //return preloadHandlebarsTemplates();
});

console.log('HotLP | Initialization done.');