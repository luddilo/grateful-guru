import admin from "firebase-admin"

admin.initializeApp({
  credential: admin.credential.cert(require("../../google_credentials.json"))
})

export const db = admin.firestore() // The database needs to have proper rules set up. Remember remember!
