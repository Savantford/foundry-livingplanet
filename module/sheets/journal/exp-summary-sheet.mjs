import LPJournalPageSheet from "./page-sheet.mjs";

/**
 * Extend the LPJournalPageSheet with some modifications
 * @extends {LPJournalPageSheet}
*/
export default class ExpeditionSummarySheet extends LPJournalPageSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['expedition-summary']
  }
  
  /** @inheritDoc */
  static EDIT_PARTS = {
    header: super.EDIT_PARTS.header,
    content: {
      template: 'systems/livingplanet/templates/journal/exp-summary/edit.hbs',
      classes: ["standard-form"],
      scrollable: [""],
      templates: []
    },
    footer: super.EDIT_PARTS.footer
  };

  /** @inheritDoc */
  static VIEW_PARTS = {
    content: {
      template: "systems/livingplanet/templates/journal/exp-summary/view.hbs",
      templates: [],
      root: true
    }
  };
}