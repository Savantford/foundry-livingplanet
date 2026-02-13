
export const fields = foundry.data.fields;

export function base(type = String) {
  let desc = 'No description.';

  let obj = {
    description: makeHtmlField(desc)
  }

  return obj;
};

export function progress() {
  return {
    progress: new fields.SchemaField({
      value: makeIntField(),
      max: makeIntField(2)
    })
  }
}

/****************************************/

export const makeHtmlField = (init = '') => new fields.SchemaField({
  value: new fields.HTMLField({
    initial: init,
    textSearch: true // Allow it to be searched in the Search Bar
  })
})

export const makeIntField = (init = 0, min = 0) => new fields.NumberField({
  required: true,
  initial: init,
  min: min,
  nullable: true,
  integer: true
})

export const makeStrField = (init = '', blank = true, searchable = false) => new fields.StringField({
  initial: init,
  blank: blank,
  textSearch: searchable
})

export const makeBooField = (init = false) => new fields.BooleanField ({
  initial: init
})