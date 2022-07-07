const { App } = require("@slack/bolt");
const config = require("./config");
const installationStore = require("./installation-store");

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
  console.log(command, "/auto-opt-me-in");
  await ack();
  const teamId = command.team_id;
  const userId = command.user_id;
  installationStore
    .fetchInstallation({ teamId, userId })
    .then((data) => console.log(data, "data"));
  await respond(`Thanks`);
});

module.exports = app;
