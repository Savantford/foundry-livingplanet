
export const fields = foundry.data.fields;

export function description (type = String) {
  let init = 'No creature description.';

  if (type === 'Character') init = "Unknown biography.";

  return {
    description: makeHtmlField(init)
  }
};

export function attributes(type = String) {

  return {
    power: makeStat('Power'),
    agility: makeStat('Agility'),
    cunning: makeStat('Cunning')
  }

};

export function details(type = String) {
  const obj = {
    type: makeStrField('',1,1),
    senses: makeStrField(),
    languages: makeStrField(),
    immune: makeStrField()
  }

  if (type === 'Character') {
    obj.languages = makeStrField("Common");
    obj.professions = makeStrField("",1,1);
    obj.ancestry = makeStrField("Human",1,1);
    obj.novice = makeStrField("",1,1);
    obj.expert = makeStrField("",1,1);
    obj.master = makeStrField("",1,1);
    obj.reputation = makeIntField();
    obj.traditions = makeStrField();

    obj.features = makeHtmlField();
    obj.personality = makeHtmlField();
    obj.belief = makeHtmlField();
    obj.information = makeHtmlField();
    obj.bg_ancestry = makeHtmlField();
    obj.deeds = makeHtmlField();
  }
  

  return {details: new fields.SchemaField(obj)}
}

/****************************************/
const makeHtmlField = (init = '') => new fields.SchemaField({
  value: new fields.HTMLField({
    initial: init,
    textSearch: true // Allow it to be searched in the Search Bar
  })
})

const makeBooField = (init = false) => new fields.BooleanField ({
  initial: init
})

export const makeNumField = (init = 1) => new fields.NumberField({
  required: true,
  initial: init,
  positive: true
})

export const makeIntField = (init = 0) => new fields.NumberField({
  required: true,
  initial: init,
  min: 0,
  integer: true,
  clean: true
})

export const makeStrField = (init = '', blank = true) => new fields.StringField({
  initial: init,
  blank: blank
})

function makeStat(stat) {
  const label = 'WW.' + stat;

  return new fields.NumberField({
    required: true,
    initial: 0,
    max: 2,
    min: -2,
    integer: true,
    label: label,
    hint: label
  })
}