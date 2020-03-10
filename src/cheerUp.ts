import { BridgeTurn, BotTurn } from "narratory"
import * as nlu from "./nlu"
import { END, CHEER_UP } from "./labels"

const cheerUp: BridgeTurn = {
  label: CHEER_UP,
  url: "https://europe-west1-grateful-bnihxr.cloudfunctions.net/getGrateful",
  params: ["user_email"],
  bot: [
    {
      say: [
        {
          cond: {
            previousGrateful: true,
            fromUser: true
          },
          text: [
              "On _date you said _previousGrateful",
              "You said _previousGrateful on _date"
            ]
        },
        {
          cond: {
            previousGrateful: true
          },
          text: "Oh I like this one: _previousGrateful"
        }
      ]
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