export const LP = {}

// Define Constants

LP.STRENGTH_DEGREES = {
  "3": "LP.Strength.Amazing",
  "2": "LP.Strength.VeryGood",
  "1": "LP.Strength.Good",
  "-1": "LP.Strength.Bad",
  "-2": "LP.Strength.VeryBad",
  "-3": "LP.Strength.Terrible"
}

LP.ASSET_SOURCES = {
  "frame": "LP.Frame",
  "modification": "LP.Asset.Modification",
  "knowledge": "LP.Asset.Knowledge",
  "equipment": "LP.Asset.Equipment"
}

LP.CHALLENGE_TYPES = {
  'personal': "LP.Progress.Challenge.Personal",
  'shared': "LP.Progress.Challenge.Shared"
}

LP.CHALLENGE_DIFFICULTIES = {
  2: "LP.Progress.Challenge.Easy",
  3: "LP.Progress.Challenge.Significant",
  4: "LP.Progress.Challenge.Troublesome",
  6: "LP.Progress.Challenge.Hard",
  8: "LP.Progress.Challenge.Epic"
}

LP.CONNECTION_TYPES = {
  'personal': "LP.Progress.Connection.Personal",
  'regional': "LP.Progress.Connection.Regional",
  'cultural': "LP.Progress.Connection.Cultural"
}

LP.CONNECTION_LEVELS = {
  2: "LP.Progress.Connection.Weak",
  3: "LP.Progress.Connection.Relevant",
  4: "LP.Progress.Connection.Strong",
  6: "LP.Progress.Connection.Crucial",
  8: "LP.Progress.Connection.Essential",
}

LP.EVENT_DURATIONS = {
  2: "LP.Progress.Event.Brief",
  3: "LP.Progress.Event.Short",
  4: "LP.Progress.Event.Moderate",
  6: "LP.Progress.Event.Long",
  8: "LP.Progress.Event.VeryLong",
}

LP.attributes = {
  "str": "LP.Strength",
  "agi": "LP.Agility",
  "int": "LP.Intellect",
  "wil": "LP.Will"
}

LP.details = {
  "features": "LP.Features",
  "personality": "LP.Personality",
  "belief": "LP.Belief",
  /*"professions": "LP.Professions",
  "languages": "LP.Languages",*/
  /*"information": "LP.Information",
  "bg_ancestry": "LP.Ancestry",
  "deeds": "LP.Deeds"*/
}

// Dropdown menus
LP.dropdownNumbers = {
  "⅛": "⅛",
  "¼": "¼",
  "½": "½",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
}
LP.dropdownAttributes = {
  "": "LP.Dont",
  "str": "LP.Strength",
  "agi": "LP.Agility",
  "int": "LP.Intellect",
  "wil": "LP.Will",
  "luck": "LP.Luck"
}

LP.dropdownSubtypes = {
  "trait": "LP.TalentSubtypes.Trait",
  "aura": "LP.TalentSubtypes.Aura",
  "action": "LP.TalentSubtypes.Action",
  "reaction": "LP.TalentSubtypes.Reaction",
  "end": "LP.TalentSubtypes.End",
  "fury": "LP.TalentSubtypes.Fury",
};

LP.talentSources = {
  "None": "LP.TalentSources.None",
  "Ancestry": "LP.TalentSources.Ancestry",
  "Novice": "LP.TalentSources.Novice",
  "Expert": "LP.TalentSources.Expert",
  "Master": "LP.TalentSources.Master",
  "Magical": "LP.TalentSources.Magical",
  "Other": "LP.TalentSources.Other"
};

LP.dropdownFrequencies = {
  "day": "LP.FrequencyChoices.Day",
  "hour": "LP.FrequencyChoices.Hour",
  "minute": "LP.FrequencyChoices.Minute",
  "round": "LP.FrequencyChoices.Round"
};

LP.dropdownTiers = {
  "Novice": "LP.Novice",
  "Expert": "LP.Expert",
  "Master": "LP.Master"
};

LP.coins = {
  "cp": "LP.Coins.CP",
  "sp": "LP.Coins.SP",
  "gp": "LP.Coins.GP"
};

LP.itemSubtypes = {
  "generic": "LP.Generic",
  "weapon": "LP.Weapon",
  "armor": "LP.Armor.Title",
  "consumable": "LP.Consumable",
  "container": "LP.Container"
};

LP.itemQualities = {
  "standard": "LP.QualityStandard",
  "superior": "LP.QualitySuperior",
  "inferior": "LP.QualityInferior"
};

LP.dropdownGrip = {
  "One": "LP.GripOne",
  "Two": "LP.GripTwo",
  "Off": "LP.GripOff"
};

LP.armorTypes = {
  "light": "LP.Armor.Light",
  "medium": "LP.Armor.Medium",
  "heavy": "LP.Armor.Heavy"
}

LP.armor = {
  "unarmored": {
    "label": "LP.Armor.Unarmored",
    "def": null,
    "bonus": null,
    "type": null
  },
  "padded": {
    "label": "LP.Armor.Padded",
    "def": 11,
    "bonus": null,
    "type": "Light"
  },
  "leather": {
    "label": "LP.Armor.Leather",
    "def": 12,
    "bonus": 1,
    "type": "Light"
  },
  "brigandine": {
    "label": "LP.Armor.Brigandine",
    "def": 13,
    "bonus": 1,
    "type": "Light"
  },
  "ring": {
    "label": "LP.Armor.Ring",
    "def": 14,
    "bonus": 2,
    "type": "Medium"
  },
  "mail": {
    "label": "LP.Armor.Mail",
    "def": 15,
    "bonus": null,
    "type": "Medium"
  },
  "plateAndMail": {
    "label": "LP.Armor.PlateAndMail",
    "def": 16,
    "bonus": null,
    "type": "Medium"
  },
  "breastplate": {
    "label": "LP.Armor.Breastplate",
    "def": 16,
    "bonus": 3,
    "type": "Heavy"
  },
  "plate": {
    "label": "LP.Armor.Plate",
    "def": 17,
    "bonus": null,
    "type": "Heavy"
  },
  "fullPlate": {
    "label": "LP.Armor.FullPlate", 
    "def": 18,
    "bonus": null,
    "type": "Heavy"
  }
};
