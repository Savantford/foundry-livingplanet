/**
 * Extend the basic Journal Entry with modifications.
 * @extends {JournalEntry}
*/

export default class LPJournalEntry extends JournalEntry {
  /** @override */
  getTrackedAttributes(data, path = []) {
    const attr = 0;/*super.getTrackedAttributes(data, path);
    console.log(attr)
    if (path.length === 0) {
      attr.value.push(["stats", "damage", "value"], ["stats", "health", "total"]);
    }*/
    return attr;
  }
}