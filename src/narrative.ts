import {
  BotTurn,
  BridgeTurn,
  EXIT,
  SignInSuccess,
  SignInFailed,
} from "narratory-lib"
import { addGratefulNarrative } from "./addGrateful"
import { cheerUpNarrative } from "./cheerUp"
import { END } from "./labels"
import { testingEmail, testingName } from "../config.json"
import { getBackendUrl } from "./backend/getBackendUrl"

const greeting: BridgeTurn = {
  say: [{ text: ["Hi", "Hello"] }],
  bot: [
    {
      cond: { user_returning: true },
      say: [{ text: ["Welcome back to the Grateful Guru"] }],
    },
    {
      say: [
        { text: ["Welcome to the Grateful Guru", "I am the Grateful Guru"] },
      ],
    },
  ],
}

const auth: BotTurn = {
  cond: {
    platform: "google",
  },
  say: [{ text: ["To do grateful journaling"] }],
  user: [
    {
      intent: SignInSuccess,
      bot: [
        {
          say: [{ text: ["Now, let's get started!"] }],
          url: getBackendUrl("/saveUser"),
          params: ["user_email", "user_name"],
        },
      ],
    },
    {
      intent: SignInFailed,
      bot: [
        {
          say: [
            {
              text: [
                "Unfortunately you have to sign in for me to be able to help you",
              ],
            },
          ],
          goto: END,
        },
      ],
    },
  ],
}

const noGoogleAuth: BotTurn = {
  cond: {
    platform: "unknown",
  },
  say: [
    {
      text: [
        `[TESTING ONLY] setting your credentials to ${testingEmail} / ${testingName}`,
      ],
    },
  ],
  set: {
    user_email: testingEmail,
    user_name: testingName,
  },
}

// AddGratefulNarrative and CheerUpNarrative imported from separate files

const end: BotTurn = {
  label: END,
  say: [{ text: ["Goodbye for now"] }],
  goto: EXIT,
}

export const narrative = [
  greeting,
  auth,
  noGoogleAuth,
  ...addGratefulNarrative,
  end,
  ...cheerUpNarrative,
]
