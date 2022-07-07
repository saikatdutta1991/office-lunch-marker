const config = {
  port: process.env.PORT | "3000",
  slack: {
    appToken: process.env.SLACK_APP_TOKEN,
    botToken: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: process.env.SLACK_STATE_SECRET || "my-state-secret",
  },
};

module.exports = config;
