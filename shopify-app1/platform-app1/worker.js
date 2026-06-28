import { Worker } from "bullmq";
import { redis } from "./app/redis.server.js";
import prisma from "./app/db.server.js";

const worker = new Worker(
  "main",
  async (job) => {
    console.log(`[worker] processing job ${job.id}: ${job.name}`);

    switch (job.name) {
      case "cleanup-sessions":
        await prisma.session.deleteMany({
          where: { expires: { lt: new Date() } },
        });
        break;

      case "sync-products":
        // TODO: add Shopify product sync logic here
        break;

      default:
        console.warn(`[worker] unknown job type: ${job.name}`);
    }
  },
  { connection: redis }
);

worker.on("completed", (job) => console.log(`[worker] job ${job.id} done`));
worker.on("failed", (job, err) =>
  console.error(`[worker] job ${job?.id} failed:`, err.message)
);

console.log("[worker] started");
