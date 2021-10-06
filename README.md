# Grateful journaling Dialogflow bot built using Narratory 

Allows you to add things you are grateful for (allowing elaboration) and then recall them at a later time ("cheer me up"). Using a backend built on Firebase Functions (wrapped in the narratory-cloud npm package) with a Firebase Firestore DB. 

The bot is built using Narratory and is using Google Auth account linking on Google Actions/Google Assistant. For other clients, a hardcoded email is taken from `narratory_config.json`. 

## Setting up the bot

1. Install Narratory with `npm install -g narratory`
2. Clone this repository.
4. Install dependencies with `npm install` or `yarn`
5. Set up credentials (see [Narratory docs on setup](https://narratory.io/docs/setup))
6. Create your agent and start an interactive chat-prompt in the terminal with `narratory start`

> Note, you need the backend to save and retrieve your grateful entires

## Setting up the backend

1. Install firebase CLI with `npm i -g firebase-tools`
1. Set up firebase with your Google project with `firebase use --add <your-google-project-name>`
1. Make sure the service account you created for Narratory (and with credentials you put in `google_credentials.json`) has the **Firebase Develop Admin** role in the [Google Cloud IAM console](https://console.cloud.google.com/iam-admin)
1. Create a Firebase Firestore Database for your Google project at [Firebase console](https://console.firebase.google.com/)
1. Deploy the cloud functions with `firebase deploy`
1. Add your public URL (excluding the function name, for example `https://europe-west1-grateful-bnihxr.cloudfunctions.net`) to the `config.json` file

### Running backend locally

1. Run `npm run dev` to emulate your cloud functions locally
1. Download and install [ngrok](https://ngrok.com/) and then run it in your app folder with `npm run ngrok` or `npm run ngrok:subdomain` if you have a dedicated subdomain (recommended since otherwise the URL will change for every run).
1. Add your ngrok url to the `config.json` file and change `local` to true in the same file
1. Run `narratory build` on your bot to update it to connect to your local backend


## Documentation

For more info, see [the Narratory docs](https://narratory.io/).

## Questions / Support

Join the Narratory Community on [Slack](https://join.slack.com/t/narratorycommunity/shared_invite/zt-eep3tj1f-H5u5PE2qhKreS4wV9lFpNA) or [Facebook](https://www.facebook.com/groups/837176406808483/) or open an issue!


