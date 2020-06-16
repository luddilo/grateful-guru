import { cloudFunction } from "narratory-cloud"
import { db } from "./db"

export const saveUser = cloudFunction(async (req, res) => {
    const { user_email, user_name } = req.body
    if (!user_email) {
      res.status(404).json({
        status: "error",
        message: "user_email"
      })
    }
    const collection = db.collection("users")
  
    try {
      await collection.doc(user_email).set(
        {
          // Data array
          email: user_email,
          name: user_name ? user_name : null,
          updatedAt: Date.now(),
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
    region: "europe-west1",
    memory: "2GB" // To make cold starts faster
  })