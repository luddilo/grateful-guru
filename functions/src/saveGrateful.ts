import { cloudFunction } from "narratory-cloud"
import { db } from "./db"
import admin = require("firebase-admin")

export const saveGrateful = cloudFunction(async (req, res) => {
    const { user_email, gratefuls } = req.body
    if (!user_email || !gratefuls) {
      res.status(404).json({
        status: "error",
        message: "user_email and grateful cannot be empty"
      })
      return
    }
    const collection = db.collection("gratefuls")
  
    const gratefulObj = {
      text: (gratefuls as string[]).join(". "),
      updatedAt: Date.now(),
      fromUser: true
    }
  
    try {
      await collection.doc(user_email).set(
        {
          // Data array
          gratefuls: admin.firestore.FieldValue.arrayUnion(gratefulObj),
          updatedAt: Date.now(),
        },
        {
          merge: true
        }
      )
      res.json({
        set: {
          status: "success"
        }
      })
    } catch (err) {
      console.log("Error setting data: ", err)
      res.json({
        set: {
          status: "error",
        },
        message: "Error setting data" + err
      })
    }
  }, {
    localDevelopmentUrl: "https://narratory.eu.ngrok.io/grateful-bnihxr/europe-west1/saveGrateful"
  })