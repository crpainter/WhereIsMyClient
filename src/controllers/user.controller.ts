import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, param, patch, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

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
    var jsBody:any = verify(jwt, 'JumpHigher');
    foundUser = jsBody.user;
  
    return foundUser
  }

  @patch('/updateUser') 
    async updateUser(
      @param.query.string('jwt') jwt: string,
      @requestBody() obj: Partial<User>): Promise<any> {
      if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

      try {
        var jwtBody = verify(jwt, 'JumpHigher') as any;
        await this.userRepo.updateById(jwtBody.user.id, obj);
        var changedUser = await this.userRepo.findById(jwtBody.user.id);

        if (changedUser.password.length < 15) {
          let hashedPassword = await bcrypt.hash(changedUser.password, 10);
          obj.password = hashedPassword;
          await this.userRepo.updateById(changedUser.id, obj);
        }
        
        var jwt = sign(
          {
            user: {
              id: changedUser.id,
              username: changedUser.username,
              password: changedUser.password
            },
          },
          'JumpHigher',
          {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za',
          },
        );

        console.log(jwt)
        
        return {
          token: jwt,
        };

      } catch (err) {
        throw new HttpErrors.BadRequest('JWT token invalid');
      }
    }

  @get('/users')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }
}