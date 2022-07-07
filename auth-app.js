const { App } = require("@slack/bolt");
const config = require("./config");
const installationStore = require("./installation-store");

const app = new App({
  appToken: config.slack.appToken,
  signingSecret: config.slack.signingSecret,
  clientId: config.slack.clientId,
  clientSecret: config.slack.clientSecret,
  socketMode: true,
  port: config.port,
  stateSecret: config.slack.stateSecret,
  scopes: ["channels:history", "chat:write", "commands", "reactions:write"],
  installationStore,
  socketMode: false,
  port: config.port,
  installerOptions: {
    userScopes: ["channels:history", "chat:write", "reactions:write"],
  },
});

module.exports = app;
