import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import { Login } from "../models/login";

export class LoginController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post('/login')
  async loginUser(@requestBody() login: Login) {
    var AllUsers = await this.userRepo.find();
    let registeredUser: User | null = null;
    for (var i=0;i<AllUsers.length;i++) {
      var usernametocompare = AllUsers[i].username;
      if(usernametocompare == login.username){
        registeredUser = AllUsers[i];
        break;
      }
    }
    return registeredUser
  }

}