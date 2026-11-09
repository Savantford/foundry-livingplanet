const fields = foundry.data.fields;

/* -------------------------------------------- */
/*  Number Fields                               */
/* -------------------------------------------- */

/* Integer (Min 0) */
export const makeIntField = (options={}) => {
  return new fields.NumberField(foundry.utils.mergeObject({
    initial: 0,
    required: true,
    nullable: true,
    integer: true,
    clean: true
  }, options))
}

/* Positive Integer (Min 1) */
export const makePosIntField = (options={}) => {
  return new fields.NumberField(foundry.utils.mergeObject({
    initial: 1,
    min: 1,
    required: true,
    nullable: true,
    integer: true,
    clean: true
  }, options))
}

/* Float (Min 0) */
export const makeFloField = (options={}) => {
  return new fields.NumberField(foundry.utils.mergeObject({
    initial: 0,
    min: 0,
    required: true,
    nullable: true,
    integer: false
  }, options))
}

/* Positive Integer */
export const makePosNegIntField = (options={}) => {
  return new fields.NumberField(foundry.utils.mergeObject({
    initial: 0,
    required: true,
    nullable: true,
    integer: true,
    clean: true
  }, options))
}

/* Any Number */
export const makeNumField = (options={}) => {
  return new fields.NumberField(foundry.utils.mergeObject({
    initial: 1,
    required: true,
    positive: true
  }, options))
}

/* -------------------------------------------- */
/*  String Fields                               */
/* -------------------------------------------- */

/* Regular String */
export const makeStrField = (options={}) => {
  return new fields.StringField(foundry.utils.mergeObject({
    initial: '',
    blank: true,
    textSearch: true
  }, options))
}

/* ID Reference String (Nullable, cannot be blank) */
export const makeIdStrField = (options={}) => {
  return new fields.StringField(foundry.utils.mergeObject({
    initial: null,
    nullable: true
  }, options))
}

/* UUID Reference String (Nullable, cannot be blank) */
export const makeUuidStrField = (options={}) => {
  return new fields.DocumentUUIDField(foundry.utils.mergeObject({
    initial: null,
    nullable: true,
    //relative: true - v14 only
  }, options))
}

/* Required String (Cannot be blank; for dropdown and name fields) */
export const makeRequiredStrField = (options={}) => {
  return new fields.StringField(foundry.utils.mergeObject({
    blank: false,
    nullable: true,
    textSearch: true
  }, options))
}

/* -------------------------------------------- */
/*  Other Fields                                */
/* -------------------------------------------- */

export const makeBooField = (options={}) => {
  const { initial = false, label } = options;

  return new fields.BooleanField ({
    initial, label
  })
}

/* Complex Fields */
export const makeHtmlField = (options={}) => {
  const { initial = '', label } = options;

  return new fields.HTMLField({
    initial, label,
    textSearch: true // Allow it to be searched in the Search Bar
  })
}

export function makeAttributeField({ options={} }) {
  const { label } = options;

  return new fields.SchemaField({
    value: new fields.NumberField({
      label,
      initial: 10,
      max: 20,
      min: 0,
      required: true,
      integer: true,
      hint: label + 'Score'
    })
  })
}