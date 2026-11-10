console.log('HotLP | Initializing...');

// Import document classes
import LPActor from './documents/actor.mjs';
import LPItem from './documents/item.mjs';
import LPJournalEntryPage from './documents/journal-page.mjs';
//import { LPToken } from './documents/token.mjs';

// Import data models
import DeviantModel from './data/actors/deviant.mjs';
import EntityModel from './data/actors/entity.mjs';
import CrewModel from './data/actors/crew.mjs';
import SkillModel from './data/items/skill.mjs';
import AssetModel from './data/items/asset.mjs';
import ConnectionModel from './data/items/connection.mjs';
import ExpeditionSummaryModel from './data/journal/expedition-summary.mjs';
import ExpeditionSceneModel from './data/journal/expedition-scene.mjs';

// Import sheet classes
import DeviantSheet from './sheets/actors/deviant-sheet.mjs';
import EntitySheet from './sheets/actors/entity-sheet.mjs';
import CrewSheet from './sheets/actors/crew-sheet.mjs';
import AssetSheet from './sheets/items/asset-sheet.mjs';
import SkillSheet from './sheets/items/skill-sheet.mjs';
import ExpeditionSummarySheet from './sheets/journal/exp-summary-sheet.mjs';
import ExpeditionSceneSheet from './sheets/journal/exp-scene-sheet.mjs';

// Import helper/utility classes and constants
import { LP } from './config.mjs';
import NarrativeModel from './data/apps/narrative.mjs';
import NarrativeTracker from './apps/narrative-tracker.mjs';


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
  
  CONFIG.JournalEntryPage.documentClass = LPJournalEntryPage;

  // Register data models
  CONFIG.Actor.dataModels.deviant = DeviantModel;
  CONFIG.Actor.dataModels.entity = EntityModel;
  CONFIG.Actor.dataModels.crew = CrewModel;
  CONFIG.Item.dataModels.asset = AssetModel;
  CONFIG.Item.dataModels.skill = SkillModel;
  CONFIG.Item.dataModels.connection = ConnectionModel;
  CONFIG.JournalEntryPage.dataModels.expeditionSummary = ExpeditionSummaryModel;
  CONFIG.JournalEntryPage.dataModels.expeditionScene = ExpeditionSceneModel;
  
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

  Items.registerSheet('livingplanet', AssetSheet, {
    types: ['asset'],
    makeDefault: true,
    label: 'WW.System.Sheet.Asset'
  });

  // Register Journal Page Sheet classes
  const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;

  DocumentSheetConfig.registerSheet(JournalEntryPage, 'livingplanet', ExpeditionSummarySheet, {
    types: ['expeditionSummary'],
    makeDefault: true,
    label: 'WW.System.Sheet.ExpeditionSummary'
  });

  DocumentSheetConfig.registerSheet(JournalEntryPage, 'livingplanet', ExpeditionSceneSheet, {
    types: ['expeditionScene'],
    makeDefault: true,
    label: 'WW.System.Sheet.ExpeditionScene'
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

  // Narrative Tracker
  game.settings.register("livingplanet", "narrativeHideTab", {
    name: "LP.Narrative.HideSidebarTab",
    title: "LP.Narrative.HideSidebarTabTitle",
    hint: "LP.Narrative.HideSidebarTabHint",
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    requiresReload: true,
    restricted: false
  });

  game.settings.register("livingplanet", "narrativeSettings", {
    name: "LP.Narrative.Settings",
    title: "LP.Narrative.SettingsTitle",
    hint: "LP.Narrative.SettingsHint",
    scope: "world",
    type: NarrativeModel,
    restricted: false
  });

  // Register sidebar tab unless GM disabled it
  if (!game.settings.get("livingplanet", "narrativeHideTab")) {
    CONFIG.ui["narrative-tracker"] = NarrativeTracker;
    const sidebarClass = CONFIG.ui.sidebar;

    if (sidebarClass?.TABS) {
      const narrativeTab = { icon: "fa-solid fa-sitemap", tooltip: "LP.Narrative.Title" };
      const settingsTab = sidebarClass.TABS.settings;

      if (settingsTab) {
        delete sidebarClass.TABS.settings;
        sidebarClass.TABS["narrative-tracker"] = narrativeTab;
        sidebarClass.TABS.settings = settingsTab;
      } else {
        sidebarClass.TABS["narrative-tracker"] = narrativeTab;
      }
    }
  }
});

console.log('HotLP | Initialization done.');