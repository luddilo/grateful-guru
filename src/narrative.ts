import { BotTurn, BridgeTurn, EXIT, SignInSuccess, SignInFailed } from "narratory"
import { addGratefulNarrative } from "./addGrateful"
import { cheerUpNarrative } from "./cheerUp"
import { END } from "./labels"
import { testingEmail, testingName } from "../config.json"

/*

Private and public gratefuls
"What was I grateful for X time ago?"
Create circles, where people can share their gratefuls. Circles can be either private or open
Allow reporting of gratefuls
// Todo: add an auth-state or optionally allow people to just listen to other people's gratefuls

Platform:
- Have botturns that aren't part of Narrative, or maybe several narratives..
*/

const greeting: BridgeTurn = {
  say: ["Hello", "Hi"],
  bot: [
    {
      cond: { user_returning: true },
      say: "Welcome back to the Grateful Guru"
    },
    {
      say: ["Welcome to the Grateful Guru", "I am the Grateful Guru"]
    }
  ]
}

const auth: BotTurn = {
  cond: { 
    platform: "google"
  },
  say: "To do grateful journaling",
  user: [
    {
      intent: SignInSuccess,
      bot: {
        say: "Now, let's get started!",
        url: "https://europe-west1-grateful-bnihxr.cloudfunctions.net/saveUser",
        params: ["user_email", "user_name"]
      }
    },
    {
      intent: SignInFailed,
      bot: {
        say: "Unfortunately you have to sign in for me to be able to help you",
        goto: END
      }
    }
  ]
}

const noGoogleAuth: BotTurn = {
  cond: {
    platform: "unknown"
  },
  say: `[TESTING ONLY] setting your credentials to ${testingEmail} / ${testingName}`,
  set: {
    user_email: testingEmail,
    user_name: testingName
  }
}

// AddGratefulNarrative and CheerUpNarrative imported from separate files

const end: BotTurn = {
  label: END,
  say: "Goodbye for now",
  goto: EXIT
}

export const narrative = [greeting, auth, noGoogleAuth, ...addGratefulNarrative, end, ...cheerUpNarrative]
