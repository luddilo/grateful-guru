import {
  UserTurn,
  EXIT,
  BridgeTurn,
  DynamicBotTurn,
  BotTurn,
} from "narratory-lib"
import * as nlu from "./nlu"
import * as phrases from "./phrases"
import { getBackendUrl } from "./backend/getBackendUrl"

export const saveGrateful: BridgeTurn = {
  url: getBackendUrl("/saveGrateful"),
  params: ["gratefuls", "user_email"],
  set: {
    added: true,
  },
  bot: [
    {
      say: [
        {
          text: [
            "Lovely. I'll remember this",
            "Great, I've saved it",
            "Nice, now I've stored it",
          ],
        },
      ],
    },
  ], // Maybe ask if the grateful should be private or public?
}

export const youHeardWrong = ({
  parent = false,
}: {
  parent: boolean
}): UserTurn => {
  return {
    intent: {
      examples: [...nlu.no.examples, "It was wrong"],
    },
    bot: [
      {
        say: [
          {
            text: [
              "Oops, try saying it again",
              "Sorry, try saying it one more time",
            ],
          },
        ],
        repair: {
          repair: true,
          parent,
          repeat: false,
        },
      },
    ],
  }
}

export const handleValidatedGrateful: BotTurn = {
  say: [{ text: phrases.wannaElaborate }],
  set: {
    gratefuls: "+_grateful",
  },
  user: [
    {
      intent: nlu.yes,
      bot: [
        {
          say: [{ text: ["What should I add?", "What more?"] }],
          repair: { repair: true, parent: false, repeat: false },
        },
      ],
    },
    {
      intent: nlu.isGratefulWithYes,
      bot: [
        {
          say: [{ text: phrases.confirmGrateful }],
          set: {
            elaborated: true,
          },
          user: [
            {
              intent: nlu.yes,
              bot: [
                {
                  // If we haven't elaborated, we get the question once
                  cond: {
                    elaborated: false,
                  },
                  say: [{ text: phrases.wannaElaborate }],
                  set: {
                    gratefuls: "+_grateful",
                  },
                  repair: { repair: true, parent: true, repeat: false },
                },
                {
                  set: {
                    gratefuls: "+_grateful",
                  },
                  bot: [saveGrateful], // If we have elaborated, we save the grateful
                },
              ],
            },
            youHeardWrong({ parent: true }),
          ],
        },
      ],
    },
    {
      intent: nlu.no,
      bot: [
        {
          say: [{ text: ["Okay, no problem!"] }],
          bot: [saveGrateful],
        },
      ],
    },
  ],
}
