require("dotenv").config();
// const { App } = require("@slack/bolt");
// const { FileInstallationStore } = require("@slack/oauth");

// const installationStore = new FileInstallationStore();

const botApp = require("./bot-app");
// const authorizedApp = new App({
//   signingSecret: SLACK_SIGNING_SECRET,
//   appToken: SLACK_APP_TOKEN,
//   clientId: SLACK_CLIENT_ID,
//   clientSecret: SLACK_CLIENT_SECRET,
//   stateSecret: SLACK_STATE_SECRET,
//   scopes: ["channels:history", "chat:write", "commands", "reactions:write"],
//   installationStore,
//   socketMode: true,
//   port: PORT || 3000,
//   installerOptions: {
//     userScopes: ["channels:history", "chat:write", "reactions:write"],
//   },
// });

// botApp.message("react", async ({ message, client }) => {
//   console.log(`react message received`);
//   console.log(JSON.stringify({ message }), "react request");
//   await client.reactions.add({
//     name: "bento",
//     timestamp: message.event_ts,
//     channel: message.channel,
//     token: SLACK_USER_TOKEN,
//   });

//   // app.client.chat.postMessage({
//   //   token: SLACK_USER_TOKEN,
//   //   channel: message.channel,
//   //   text: "Reaction",
//   //   username: "",
//   //   as_user: true,
//   // });
// });

// botApp.command("/echo", async ({ command, ack, respond }) => {
//   console.log("/echo ");
//   if (command.text) {
//     console.log(command.text.split(" "), "message");
//     await ack();
//     await respond(`${command.text}`);
//   }
// });

(async () => {
  await botApp.start();
  // await authorizedApp.start();
  console.log("⚡️ Bolt app is running!");
})();
