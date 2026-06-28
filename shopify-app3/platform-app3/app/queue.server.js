import { Queue } from "bullmq";
import { redis } from "./redis.server.js";

export const mainQueue = new Queue("main", { connection: redis });

export const addJob = (name, data = {}, opts = {}) =>
  mainQueue.add(name, data, opts);
