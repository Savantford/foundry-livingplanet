console.log('Initializing livingplanet.mjs...')

// Import document classes.
import { LPActor } from './documents/actor.mjs';
import { LPItem } from './documents/item.mjs';
//import { LPToken } from './documents/token.mjs';

// Import sheet classes.
import LPActorSheet from './sheets/actor-sheet.mjs';
import { LPItemSheet } from './sheets/item-sheet.mjs';

// Import data models
import DeviantData from './data/actors/deviant.mjs';
//import EntityData from './data/actors/entity.mjs';
import StrengthData from './data/items/strength.mjs';
import AssetData from './data/items/asset.mjs';
import ChallengeData from './data/items/challenge.mjs';
import ConnectionData from './data/items/connection.mjs';

// Import helper/utility classes and constants.
import { LP } from './config.mjs';
//import { Global } from './helpers/utils.mjs';
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
//import { LPAfflictions } from './active-effects/afflictions.mjs';
//import { LPActiveEffectConfig } from './active-effects/active-effect-config.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

const Actors = foundry.documents.collections.Actors;
const Items = foundry.documents.collections.Items;

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
  CONFIG.Item.documentClass = LPItem;

  // Register sheet application classes
  //Actors.unregisterSheet('core', ActorSheetV2);
  Actors.registerSheet('livingplanet', LPActorSheet, { makeDefault: true });
  /*Actors.registerSheet('weirdwizard', WWCharacterSheet, {
    types: ['Character'],
    makeDefault: true,
    label: 'WW.SheetClass.Character'
  });
  Actors.registerSheet('weirdwizard', WWNpcSheet, {
    types: ['NPC'],
    makeDefault: true,
    label: 'WW.SheetClass.NPC'
  });*/

  //Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('livingplanet', LPItemSheet, { makeDefault: true });

  //DocumentSheetConfig.registerSheet(ActiveEffect, "livingplanet", LPActiveEffectConfig, {makeDefault: true})

  // Disable legacy pre-V11 behavior of item effects being stored on actor.effects. Use actor.appliedEffects instead for all effects
  CONFIG.ActiveEffect.legacyTransfer = false;

  // Register data models
  CONFIG.Actor.dataModels.Deviant = DeviantData;
  //CONFIG.Actor.dataModels.Entity = EntityData;
  CONFIG.Item.dataModels['Strength or Weakness'] = StrengthData;
  CONFIG.Item.dataModels.Asset = AssetData;
  CONFIG.Item.dataModels.Challenge = ChallengeData;
  CONFIG.Item.dataModels.Connection = ConnectionData;

  // Register custom Object classes (placeables)
  //CONFIG.Token.objectClass = LPToken;

  // Define token resources/bars
  CONFIG.Actor.trackableAttributes = {
    Character: {
      bar: [],
      value: ['stats.health.lasting']
    },
    NPC: {
      bar: [],
      value: ['stats.health.fleeting']
    }
  };

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

// Rollable buttons on attribute rolls.
/*Hooks.on('renderChatMessage', (chatMessage, [html], messageData) => {
  html.querySelector('.my-button').addEventListener('click', (event) => console.log('button clicked'))
})*/

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Include steps that need to happen after Foundry has fully loaded here.
});

/* -------------------------------------------- */
/*  Setup Hook                                  */
/* -------------------------------------------- */

/**
 * This function runs after game data has been requested and loaded from the servers, so entities exist
*/

Hooks.once('setup', function () {
  // Localize CONFIG objects once up-front
  /*const toLocalize = ['attributes'];
  for (const o of toLocalize) {
    CONFIG.LP[o] = Object.entries(CONFIG.LP[o]).reduce((obj, e) => {
      obj[e[0]] = game.i18n.localize(e[1]);
      return obj
    }, {});
  }*/

  //const effects = LPAfflictions.buildAll();

  // Add the default status icons if the setting is not on
  /*if (!game.settings.get('livingplanet', 'statusIcons')) {
    for (const effect of CONFIG.statusEffects) {
      effects.push({
        id: effect.id,
        name: effect.name,
        icon: effect.icon,
      });
    }
  }
  // Regardless of the setting, add the 'invisible' status so that actors can turn invisible
  else {
    effects.push(CONFIG.statusEffects.find(e => e.id === 'invisible'));
  }*/

  // Assign Afflictions to token HUD
  //CONFIG.statusEffects = effects;

  // Set active effect keys-labels
  //LPActiveEffectConfig.initializeChangeKeys()
  
});

console.log('livingplanet.mjs loaded.')