import { BridgeTurn, BotTurn } from "narratory"
import * as nlu from "./nlu"
import { END, CHEER_UP, ADD_GRATEFUL } from "./labels"
import { getBackendUrl } from "./backend/getBackendUrl"

const cheerUp: BridgeTurn = {
  label: CHEER_UP,
  url: getBackendUrl("/getGrateful"),
  params: ["user_email"],
  bot: [
    {
      cond: {
        previousGrateful: true
      },
      say: [
        {
          cond: {
            fromUser: true
          },
          text: [
              "On _date you said _previousGrateful",
              "You said _previousGrateful on _date"
            ]
        },
        {
          text: "Oh I like this one: _previousGrateful"
        },
      ]
    }, 
    {
      say: "I haven't yet recorded anything",
      goto: ADD_GRATEFUL
    }
  ]
}

const moreCheer: BotTurn = {
    say: "Now, do you want to hear another?",
    user: [
      {
        intent: nlu.yes,
        bot: {
          say: "Coming up",
          goto: CHEER_UP
        }
      },
      {
        intent: nlu.notSure,
        bot: {
          say: "No problems. Take your time",
          repair: true
        }
      },
      {
        intent: nlu.no,
        bot: {
          say: "Okay, no worries. Thanks for today, hope to talk soon again!",
          goto: END
        }
      }
    ]
  }

export const cheerUpNarrative = [cheerUp, moreCheer]