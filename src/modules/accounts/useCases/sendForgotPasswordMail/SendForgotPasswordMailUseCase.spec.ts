import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
let dateProvider: DayjsDateProvider;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "ABC1234",
      email: "test@test.com",
      name: "Test",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("test@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send a forgot password mail to invalid user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("invalid@test.com")
    ).rejects.toEqual(new AppError("User not found"));
  });

  it("Should be able to create user token", async () => {
    const generatedTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "DEF1234",
      email: "test2@test2.com",
      name: "Test 2",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("test2@test2.com");

    expect(generatedTokenMail).toBeCalled();
  });
});
