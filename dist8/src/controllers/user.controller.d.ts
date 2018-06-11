import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
export declare class UserController {
    private userRepo;
    constructor(userRepo: UserRepository);
    findUser(idToBeFound: number): Promise<User | null>;
    getAllUsers(): Promise<Array<User>>;
}
