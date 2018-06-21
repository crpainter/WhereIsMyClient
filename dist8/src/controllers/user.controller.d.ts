import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
export declare class UserController {
    private userRepo;
    constructor(userRepo: UserRepository);
    findUser(jwt: string): Promise<User | null>;
    updateUser(jwt: string, obj: Partial<User>): Promise<any>;
    getAllUsers(): Promise<Array<User>>;
}
