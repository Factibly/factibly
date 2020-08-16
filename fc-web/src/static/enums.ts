export enum ImageModerationScore {
  SAFE = "A_0", // yeah, I know that TS starts enums at 0 by default...
  WARNING = "A_1",
  NO_SHOW = "A_2",
}

export enum InputType {
  EDITABLE,
  FIXED,
}

export enum RatingAction {
  EDIT,
  VOTE,
}

export enum RatingOrigin {
  HIGHLIGHTED = "highlighted",
  THEIRS = "theirs",
  YOURS = "yours",
}
