require("dotenv").config();
const { App } = require("@slack/bolt");

const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const PORT = process.env.PORT;

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  appToken: SLACK_APP_TOKEN,
  socketMode: true,
  port: PORT || 3000,
});

app.message("hello", async ({ message, say }) => {
  console.log(`hello message received`);
  await say(`Hey there <@${message.user}>!`);
});

app.command("/echo", async ({ command, ack, respond }) => {
  console.log("/echo command triggered");
  console.log(command.text.split(" "), "message");
  await ack();
  await respond(`${command.text}`);
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
