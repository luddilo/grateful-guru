import { Intent, entities } from "narratory"

export const yes: Intent = {
  examples: ["yes", "absolutely", "totally", "yeah"]
}

export const no: Intent = {
  examples: ["no", "never", "no way", "nope"]
}

export const yesWithGrateful: Intent = {
  entities: {
    grateful: entities.any
  },
  examples: ["Yes I'm grateful because _grateful", "Yes add that _grateful", "You can add _grateful", "yes _grateful"]
}

export const isGrateful: Intent = {
  entities: {
    grateful: entities.any
  },
  examples: [
    "I am grateful because _grateful",
    "I am grateful since _grateful",
    "because _grateful happened today",
    "_grateful"
  ]
}

export const isGratefulWithYes: Intent = {
  ...isGrateful,
  examples: [...yesWithGrateful.examples, ...isGrateful.examples]
}

export const notGrateful: Intent = {
  examples: ["I am not grateful", "Nothing", "Nothing today"]
}

export const notSure: Intent = {
  examples: ["I don't know", "Not sure", "Dunno", "I'm not sure", "no idea"]
}

export const addGrateful: Intent = {
  examples: [
    "add a grateful",
    "add one",
    "add another",
    "add another grateful",
    "add more grateful",
    "more gratefuls",
    "I want one more"
  ]
}

export const cheerMeUp: Intent = {
  examples: [
    "Cheer me up",
    "Tell me what I was grateful for",
    "Tell me something nice",
    "Tell me what I have been grateful for before",
    "grateful in the past",
  ]
}
// Lists of intents
// Adding to variables, or adding to list of variables
