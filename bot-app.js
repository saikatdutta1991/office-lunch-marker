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
});

app.command("/auto-opt-me-in", async ({ command, ack, respond }) => {
  console.log(command, "/auto-opt-me-in");
  await ack();
  const teamId = command.team_id;
  const userId = command.user_id;
  const installation = await installationStore.fetchInstallation({
    teamId,
    userId,
  });

  if (!installation) {
    const installationUrl = new URL("/slack/install", config.baseUrl);
    console.log(installationUrl.toString());
    await respond(`Autorize yourself here: ${installationUrl.toString()}`);
  } else {
    await respond(`You have already opted in for office lunch`);
  }
});

app.message(/(lunch at office)/, async ({ message, client }) => {
  console.log("Lunch at office message triggered", JSON.stringify(message));
  const installations = await installationStore.fetchInstallation({
    teamId: message.team,
  });

  const promises = installations.map((installation) =>
    client.reactions.add({
      name: "bento",
      timestamp: message.event_ts,
      channel: message.channel,
      token: installation.user.token,
    })
  );
  await Promise.all(promises);
});

module.exports = app;
