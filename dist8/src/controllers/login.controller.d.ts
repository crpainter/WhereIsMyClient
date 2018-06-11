import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { Login } from "../models/login";
export declare class LoginController {
    private userRepo;
    constructor(userRepo: UserRepository);
    loginUser(login: Login): Promise<User | null>;
}
