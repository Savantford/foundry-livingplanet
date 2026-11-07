console.log('HotLP | Initializing...');

// Import document classes
import LPActor from './documents/actor.mjs';
import LPItem from './documents/item.mjs';
//import { LPToken } from './documents/token.mjs';

// Import data models
import DeviantModel from './data/actors/deviant.mjs';
import EntityModel from './data/actors/entity.mjs';
import CrewModel from './data/actors/crew.mjs';
import SkillModel from './data/items/skill.mjs';
import AssetModel from './data/items/asset.mjs';
import ConnectionModel from './data/items/connection.mjs';

// Import sheet classes
import DeviantSheet from './sheets/actors/deviant-sheet.mjs';
import EntitySheet from './sheets/actors/entity-sheet.mjs';
import CrewSheet from './sheets/actors/crew-sheet.mjs';
import AssetSheet from './sheets/items/asset-sheet.mjs';
import SkillSheet from './sheets/items/skill-sheet.mjs';

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
  CONFIG.Item.defaultType = 'asset';

  // Register data models
  CONFIG.Actor.dataModels.deviant = DeviantModel;
  CONFIG.Actor.dataModels.entity = EntityModel;
  CONFIG.Actor.dataModels.crew = CrewModel;
  CONFIG.Item.dataModels.asset = AssetModel;
  CONFIG.Item.dataModels.skill = SkillModel;
  CONFIG.Item.dataModels.connection = ConnectionModel;
  
  // Register actor Sheet classes
  const Actors = foundry.documents.collections.Actors;

  Actors.registerSheet('livingplanet', DeviantSheet, {
    types: ['deviant'],
    makeDefault: true,
    label: 'WW.System.Sheet.Deviant'
  });
  Actors.registerSheet('livingplanet', CrewSheet, {
    types: ['crew'],
    makeDefault: true,
    label: 'WW.System.Sheet.Crew'
  });
  Actors.registerSheet('livingplanet', EntitySheet, {
    types: ['entity'],
    makeDefault: true,
    label: 'WW.System.Sheet.Entity'
  });

  // Register item Sheet classes
  const Items = foundry.documents.collections.Items;

  Items.registerSheet('livingplanet', AssetSheet, {
    types: ['asset'],
    makeDefault: true,
    label: 'WW.System.Sheet.Asset'
  });

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

  // Preload common Handlebars partials
  foundry.applications.handlebars.loadTemplates({
    clock: 'systems/livingplanet/templates/generic/progress-clock.hbs',
    itemSimple: 'systems/livingplanet/templates/generic/item-simple.hbs',
    itemProgress: 'systems/livingplanet/templates/generic/item-progress.hbs',
  })
});

console.log('HotLP | Initialization done.');