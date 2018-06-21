import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, param } from "@loopback/rest";
import { User } from "../models/user";
import { verify } from 'jsonwebtoken';

export class UserController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @get('/user')
  async findUser(@param.query.string('jwt') jwt: string): Promise<User | null> {
    // var AllUsers = await this.userRepo.find();
    let foundUser: User | null = null;
    // for (var i=0;i<AllUsers.length;i++) {
    //   var idtocompare = AllUsers[i].id;
    //   if(idtocompare == idToBeFound){
    //     foundUser = AllUsers[i];
    //     break;
    //   }
    // }
    var jsBody:any = verify(jwt, 'shh');
    foundUser = jsBody.user;
  
    return foundUser
  }

  @get('/users')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }
}