import { removeOldTokenCronJob } from "./remove-old-token.cron";
import { testCronJob } from "./test.cron";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokenCronJob.start();
};
