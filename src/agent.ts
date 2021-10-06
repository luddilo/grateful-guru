import { AgentV2, Language } from "narratory-lib"
import { narrative } from "./narrative"
import { userInitiatives } from "./userInitiatives"

const agent: AgentV2 = {
  agentName: "Grateful Guru V2",
  language: Language.English,
  narratives: [
    {
      label: "Initial",
      botInitiatives: narrative,
      userInitiatives,
      bridges: ["So", "Where were we", "Now"],
    },
  ],
  narratoryKey: "<ENTER KEY>",
  googleCredentials: require("../google_credentials.json"), // Populate this file, or change the link to your existing credentials file. Check the README.md for how to create it.
}

export default agent
