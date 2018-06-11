import { CharityRepository } from "../repositories/charity.repository";
import { Charity } from "../models/charity";
export declare class CharitiesController {
    private charityRepo;
    constructor(charityRepo: CharityRepository);
    findCharity(idToBeFound: number): Promise<Charity | null>;
    getAllUsers(): Promise<Array<Charity>>;
    addCharity(charity: Charity): Promise<Charity>;
}
