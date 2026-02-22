import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import SendGrid from "@sendgrid/mail";

import { config } from "../config/config";
import { emailTemplateConstants } from "../constants/email-template.constants";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { emailTypeToPayload } from "../types/email-type-to-payload.type";

class SendGridService {
  constructor() {
    SendGrid.setApiKey(config.SENDGRID_API_KEY as string);
  }

  public async sendByType<T extends EmailTypeEnum>(
    to: string,
    type: T,
    dynamicTemplateData: emailTypeToPayload[T],
  ): Promise<void> {
    try {
      const templateId = emailTemplateConstants[type].templateId;
      await this.send({
        from: config.SEND_GRID_TO_EMAIL,
        to,
        templateId,
        dynamicTemplateData,
      });
      console.log("FROM:", config.SEND_GRID_TO_EMAIL);
      console.log("TEMPLATE:", templateId);
    } catch (err) {
      console.error("Error email", err);
    }
  }

  private async send(email: MailDataRequired): Promise<void> {
    try {
      await SendGrid.send(email);
    } catch (err) {
      console.error("Error email", err);
    }
  }
}

export const sendGridService = new SendGridService();
