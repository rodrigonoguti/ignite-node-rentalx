import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherialMailProvider } from "./implementations/EtherialMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
  ethereal: container.resolve(EtherialMailProvider),
  ses: container.resolve(EtherialMailProvider),
  // ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
);
