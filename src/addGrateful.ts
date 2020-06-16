import { BotTurn, BridgeTurn, EXIT } from "narratory"
import * as nlu from "./nlu"
import * as phrases from "./phrases"
import { youHeardWrong, saveGrateful, handleValidatedGrateful } from "./partials"
import { ADD_GRATEFUL, CHEER_UP, END, ADD_MORE } from "./labels"
import { userInitiatives } from "./userInitiatives"

const query: BotTurn = {
  label: ADD_GRATEFUL,
  say: [
    {
      cond: { user_returning: false, added: false },
      text: [
        "What do you feel grateful for in your life?",
        "Do you wanna tell me one thing you are grateful for?",
        "Do you wanna share one thing you are grateful for?"
      ]
    },
    {
      cond: { added: false },
      text: ["What do you feel grateful for since last time?", "What are you grateful for since last time we spoke?"]
    },
    {
      text: ["What else are you grateful for?", "What else do you feel grateful for?"]
    }
  ],
  set: {
    elaborated: false,
    gratefuls: []
  },
  user: [
    {
      intent: nlu.isGrateful,
      bot: [
        // If we have voice-input, we validate the input
        {
          cond: {
            inputType: "voice"
          },
          say: phrases.confirmGrateful,
          user: [
            {
              intent: nlu.yes,
              bot: handleValidatedGrateful
            },
            youHeardWrong({ parent: true })
          ]
        },
        handleValidatedGrateful // If we have text input we skip validation
      ]
    },
    {
      intent: nlu.notSure,
      bot: {
        say: [
          "It could be something small, like the weather or a person that is important in your life",
          "Maybe something that happened today. Maybe even the fact that this app exists"
        ],
        repair: true
      }
    },
    {
      intent: nlu.notGrateful,
      bot: {
        say: [
          "That's okay. Maybe you want me to share something you've been grateful for in the past?",
          "That happens. Perhaps you want me to repeat something you've told me before?"
        ],
        user: [
          {
            intent: nlu.yes,
            bot: {
              say: "Okay",
              goto: CHEER_UP
            }
          },
          {
            intent: nlu.no,
            bot: {
              say: ["Okay, but remember that life is pretty great", "Okay, no problem"],
              goto: END
            }
          }
        ]
      }
    },
    ...userInitiatives // Adding our UIs here since we are catching a sys.any entitiy in the isGrateful intent which will rank higher in classification than our user initiatives even if they theoretically are better matches
  ]
}

const addMore: BotTurn = {
  label: ADD_MORE,
  say: [
    "Now, do you want to add another grateful, or perhaps hear what you have been grateful for in the past?",
    "Now, wanna tell me something else you're grateful for, or maybe hear what you have been grateful for before?",
    "Now, do you wanna add another grateful, or hear one of your saved gratefuls?"
  ],
  user: [
    {
      intent: nlu.addGrateful,
      bot: {
        say: "Great",
        goto: ADD_GRATEFUL
      }
    },
    {
      intent: nlu.yes,
      bot: {
        say: "Sorry, was that add grateful or be cheered up?",
        repair: true
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

export const addGratefulNarrative = [query, addMore]
