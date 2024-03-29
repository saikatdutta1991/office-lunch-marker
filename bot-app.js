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

app.message(/(Reminder:).*(lunch at office).*/, async ({ message, client }) => {
  console.log("Lunch at office message triggered", JSON.stringify(message));
  const installations = await installationStore.fetchInstallation({
    teamId: message.team,
  });

  const { members: channelMembers } = await client.conversations.members({
    token: config.slack.botToken,
    channel: message.channel,
  });
  console.log(channelMembers, "channelMembers");

  const users = installations.map((i) => i.user);
  const isUserInChannel = (user) => channelMembers.includes(user.id);
  const usersToMarkLunch = users.filter(isUserInChannel);

  const userIdsToMarkLunch = usersToMarkLunch.map((u) => u.id);
  console.log(userIdsToMarkLunch, "usersToMarkLunch");

  const promises = usersToMarkLunch.map((user) =>
    client.reactions.add({
      name: "bento",
      timestamp: message.event_ts,
      channel: message.channel,
      token: user.token,
    })
  );
  await Promise.all(promises);
});

app.message("hello", async ({ message, say }) => {
  console.log(`hello message received`);
  await say(`Hey there <@${message.user}>!`);
});

app.command("/auto-opt-me-out", async ({ command, ack, respond }) => {
  console.log(command, "/auto-opt-me-out");
  await ack();
  const teamId = command.team_id;
  const userId = command.user_id;
  const installation = await installationStore.fetchInstallation({
    teamId,
    userId,
  });

  if (installation) {
    await installationStore.deleteInstallation({
      teamId,
      userId,
    });
    await respond(`You opted out from office lunch`);
  } else {
    await respond(`You haven't opted in for office lunch yet`);
  }
});

module.exports = app;
