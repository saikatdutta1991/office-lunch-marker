const { App } = require("@slack/bolt");
const config = require("./config");

const app = new App({
  appToken: config.slack.appToken,
  token: config.slack.botToken,
  signingSecret: config.slack.signingSecret,
  clientId: config.slack.clientId,
  clientSecret: config.slack.clientSecret,
  socketMode: true,
  port: config.port,
});

app.command("/auto-opt-me-in", async ({ command, ack, respond }) => {
  await ack();
  await respond(`${command.text}`);
});

module.exports = app;
