import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailTemplateConstants = {
  [EmailTypeEnum.WELCOME]: {
    templateId: "d-afa6d133237440f191f01d79a009a3d6",
  },
  [EmailTypeEnum.RESET_PASSWORD]: {
    templateId: "d-babbf8f1f9764c779b4e3c7db21d8259",
  },
  [EmailTypeEnum.DELETE]: {
    templateId: "d-a16f9b5edd95486782d003f75691516a",
  },
};
