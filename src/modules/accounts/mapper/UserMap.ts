import { classToClass } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    email,
    name,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      email,
      name,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
