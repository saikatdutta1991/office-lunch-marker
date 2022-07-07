require("dotenv").config();

const botApp = require("./bot-app");
const authApp = require("./auth-app");

(async () => {
  await botApp.start();
  await authApp.start();
  console.log("⚡️ Bolt app is running!");
})();
