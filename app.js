require("dotenv").config();
const { App } = require("@slack/bolt");
const { FileInstallationStore } = require("@slack/oauth");

const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_USER_TOKEN = process.env.SLACK_USER_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const SLACK_STATE_SECRET = process.env.SLACK_STATE_SECRET || "my-state-secret";
const PORT = process.env.PORT;

const installationStore = new FileInstallationStore();

const app = new App({
  // token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  appToken: SLACK_APP_TOKEN,
  clientId: SLACK_CLIENT_ID,
  clientSecret: SLACK_CLIENT_SECRET,
  stateSecret: SLACK_STATE_SECRET,
  scopes: ["channels:history", "chat:write", "commands"],
  installationStore,
  socketMode: true,
  port: PORT || 3000,
});

app.message("react", async ({ message, client }) => {
  console.log(`react message received`);
  console.log(JSON.stringify({ message, client }), "react request");
  await client.reactions.add({
    name: "thumbsup",
    timestamp: message.event_ts,
    channel: message.channel,
    token: SLACK_USER_TOKEN,
  });
  // app.client.chat.postMessage({
  //   token: SLACK_USER_TOKEN,
  //   channel: message.channel,
  //   text: "Reaction",
  // });
});

app.command("/echo", async ({ command, ack, respond }) => {
  if (command.text) {
    console.log(command.text.split(" "), "message");
    await ack();
    await respond(`${command.text}`);
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
