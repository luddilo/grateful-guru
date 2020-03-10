import { cloudFunction } from "narratory-cloud"
import { getDateString } from "./util"
import { db } from "./db"

export const getGrateful = cloudFunction(async (req, res) => {
  const { user_email } = req.body
  const collection = db.collection("gratefuls")

  try {
    const snap = await collection.doc(user_email).get()
    const gratefuls = snap.data()?.gratefuls
    if (!gratefuls || !Array.isArray(gratefuls) || gratefuls.length == 0) {
      res.json({
        set: {
          grateful: null
        }
      })
      return
    }
    const grateful = gratefuls[Math.floor(Math.random() * gratefuls.length)]
    res.json({
      set: {
        previousGrateful: grateful.text,
        fromUser: true,
        date: getDateString(grateful.updatedAt)
      }
    })
  } catch (err) {
    res.json({
      set: {
        errorFetchingGrateful: true
      }
    })
  }
}, {
  localDevelopmentUrl: "https://narratory.eu.ngrok.io/grateful-bnihxr/europe-west1/getGrateful"
})
