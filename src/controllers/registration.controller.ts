import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import * as bcrypt from 'bcrypt';

export class RegistrationController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post('/register')
  async registerUser(@requestBody() user: User) {
    let hashedPassword = await bcrypt.hash(user.password, 10);

    var userToStore = new User();
    userToStore = user;
    userToStore.password = hashedPassword;
    return await this.userRepo.create(userToStore);
  }

}