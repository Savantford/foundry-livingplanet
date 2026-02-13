/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return foundry.applications.handlebars.loadTemplates([

    // General purpose
    "systems/livingplanet/templates/progress-clock.hbs",

    // Actor partials
    "systems/livingplanet/templates/actors/parts/actor-strength.hbs",
    "systems/livingplanet/templates/actors/parts/actor-asset.hbs",
    "systems/livingplanet/templates/actors/parts/actor-challenge.hbs",
    "systems/livingplanet/templates/actors/parts/actor-connection.hbs"

  ]);
};
