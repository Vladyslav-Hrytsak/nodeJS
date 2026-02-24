import { removeOldPasswordCronJob } from "./remove-old-password.cron";
import { removeOldTokenCronJob } from "./remove-old-token.cron";
import { sendEmailOldVisitCronJob } from "./send-old-visit.cron";
import { testCronJob } from "./test.cron";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokenCronJob.start();
  removeOldPasswordCronJob.start();
  sendEmailOldVisitCronJob.start();
};
