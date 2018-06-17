import { User_Donation } from "../models/user_donation";
import { CharityRepository } from "../repositories/charity.repository";
export declare class DonationsController {
    private donationRepo;
    private charityRepo;
    constructor(donationRepo: User_Donation, charityRepo: CharityRepository);
    private token;
    allDonationForUser(UserToFind: number): Promise<User_Donation | null>;
    charitiesDonatedTo(jwt: string): Promise<any[]>;
    getAllDonation(): Promise<Array<User_Donation>>;
    addDonation(user_Id: number, charity_Id: number, donation_amount: number): Promise<any>;
}
