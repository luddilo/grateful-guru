import { UserTurn } from "narratory"
import * as nlu from "./nlu"
import { ADD_GRATEFUL, CHEER_UP } from "./labels"

/*
    Questions and other user-driven initiatives
*/

const addGrateful = {
  intent: nlu.addGrateful,
  bot: {
    say: "Okay, let's add a grateful!",
    goto: ADD_GRATEFUL
  }
}

/*
  Bot: hi
  Bot: welcome back to the Grateful Guru
  Bot: What are you grateful for?
  >> cheer me up
  Bot: Absolutely
  Bot: You said I'm grateful for my relationship with ludvig. I'm grateful for the way we are communicating on 16th of February
  Bot: Now, do you want to hear another?
  >> add a grateful
  Bot: Okay, let's add a grateful!
  Bot: So
  Bot: Now, do you want to hear another?
*/

const cheerMeUp = {
  intent: nlu.cheerMeUp,
  bot: {
    say: "Absolutely",
    goto: CHEER_UP
  }
}

export const userInitiatives : UserTurn[] = [addGrateful, cheerMeUp]
