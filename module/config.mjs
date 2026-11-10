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
  8: "LP.Progress.Connection.Essential"
}

LP.SCENE_TYPES = {
  bonding: "LP.Scene.Type.Bonding",
  exploration: "LP.Scene.Type.Exploration",
  action: "LP.Scene.Type.Action",
}

LP.SCENE_TYPE_LABELS = {
  bonding: "LP.Scene.Type.BondingLabel",
  exploration: "LP.Scene.Type.ExplorationLabel",
  action: "LP.Scene.Type.ActionLabel",
}

LP.EVENT_DURATIONS = {
  2: "LP.Progress.Event.Brief",
  3: "LP.Progress.Event.Short",
  4: "LP.Progress.Event.Moderate",
  6: "LP.Progress.Event.Long",
  8: "LP.Progress.Event.VeryLong"
}