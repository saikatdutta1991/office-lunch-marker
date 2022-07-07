const config = require("./config");
const Redis = require("ioredis");

const redis = new Redis(config.redisUrl);

async function storeInstallation(installation) {
  await redis.set(
    `team:${installation.team.id}:user:${installation.user.id}`,
    installation
  );
}

async function fetchInstallation({ teamId, userId }) {
  if (teamId && userId) {
    return await redis.get(`team:${teamId}:user:${userId}`);
  } else if (teamId) {
    const keys = await redis.keys(`team:${teamId}:user:*`);
    if (keys.length) {
      return await Promise.all(keys.map((key) => redis.get(key)));
    }
  }
}

async function deleteInstallation({ teamId, userId }) {
  if (teamId && userId) {
    return await redis.del(`team:${teamId}:user:${userId}`);
  } else if (teamId) {
    const keys = await redis.keys(`team:${teamId}:user:*`);
    if (keys.length) {
      return await Promise.all(keys.map((key) => redis.del(key)));
    }
  }
}

module.exports = { storeInstallation, fetchInstallation, deleteInstallation };
