import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class LoginController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post('/login')
  async loginUser(@requestBody() user: User) {
    if (!user.username || !user.password) {
      throw new HttpErrors.Unauthorized('Please enter a password and a username');
    }
    var AllUsers = await this.userRepo.find();
    let registeredUser: Boolean = false;
    for (var i=0;i<AllUsers.length;i++) {
      var usertocompare = AllUsers[i];
      if((usertocompare.username == user.username)&&(await bcrypt.compare(user.password, usertocompare.password))){
        registeredUser = true;
        var jwt = sign(
          {
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            },
            anything: "hello"
          },
          'shh',
          {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za',
          },
        );
        console.log('succesful login')
        console.log(await bcrypt.compare(user.password, usertocompare.password))
        return jwt;
      }
      else {
        //console.log(bcrypt.compare(user.password, usertocompare.password))
        
      }
    }
    if (!registeredUser) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }
    
  }

}