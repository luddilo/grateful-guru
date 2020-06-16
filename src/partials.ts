import { UserTurn, EXIT, BridgeTurn, DynamicBotTurn } from "narratory"
import * as nlu from "./nlu"
import * as phrases from "./phrases"
import { getBackendUrl } from "./backend/getBackendUrl"

export const saveGrateful : BridgeTurn = {
  url: getBackendUrl("/saveGrateful"),
  params: ["gratefuls", "user_email"],
  set: { 
    added: true
  },
  bot: ["Lovely. I'll remember this", "Great, I've saved it", "Nice, now I've stored it"] // Maybe ask if the grateful should be private or public?
}

export const youHeardWrong = ({ parent = false }: { parent: boolean }): UserTurn => {
  return {
    intent: [...nlu.no.examples, "It was wrong"],
    bot: {
      say: ["Oops, try saying it again", "Sorry, try saying it one more time"],
      repair: parent ? "PARENT" : true
    }
  }
}

export const handleValidatedGrateful = {
  say: phrases.wannaElaborate,
  set: {
    gratefuls: "+_grateful"
  },
  user: [
    { intent: nlu.yes, bot: { say: ["What should I add?", "What more?"], repair: true } },
    {
      intent: nlu.isGratefulWithYes,
      bot: {
        say: phrases.confirmGrateful,
        set: {
          elaborated: true
        },
        user: [
          {
            intent: nlu.yes,
            bot: [
              {
                // If we haven't elaborated, we get the question once
                cond: {
                  elaborated: false
                },
                say: phrases.wannaElaborate,
                set: {
                  gratefuls: "+_grateful"
                },
                repair: "PARENT"
              },
              saveGrateful // If we have elaborated, we save the grateful
            ]
          },
          youHeardWrong({ parent: true })
        ]
      }
    },
    {
      intent: nlu.no,
      bot: {
        say: "Okay, no problem!",
        bot: saveGrateful
      }
    }
  ]
}