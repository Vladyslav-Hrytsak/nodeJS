import { CronJob } from "cron";

import { config } from "../config/config";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  try {
    const { value, unit } = timeHelper.parseConfigString(
      config.JWT_REFRESH_EXPIRATION,
    );

    const date = timeHelper.subtractByParams(value, unit);
    const deleteCount = await tokenRepository.deleteBeforeDate(date);
    console.log(`Deleted ${deleteCount} old tokens`);
  } catch (error) {
    console.error(error);
  }
};

export const removeOldTokenCronJob = new CronJob("* * * * *", handler);
