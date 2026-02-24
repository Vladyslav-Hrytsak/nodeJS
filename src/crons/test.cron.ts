import { CronJob } from "cron";

const handler = async () => {
  console.log("Hendler run");
};

export const testCronJob = new CronJob("* * * * *", handler);
