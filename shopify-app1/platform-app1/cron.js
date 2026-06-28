import cron from "node-cron";
import { Queue } from "bullmq";
import { redis } from "./app/redis.server.js";

const queue = new Queue("main", { connection: redis });

// Every day at midnight — purge expired sessions
cron.schedule("0 0 * * *", async () => {
  await queue.add("cleanup-sessions", {});
  console.log("[cron] queued: cleanup-sessions");
});

// Every hour — sync products
cron.schedule("0 * * * *", async () => {
  await queue.add("sync-products", {});
  console.log("[cron] queued: sync-products");
});

console.log("[cron] scheduler started");
