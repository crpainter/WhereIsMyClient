import { UserDonation } from "../models/user_donation";
export declare class DonationsController {
    private donationRepo;
    constructor(donationRepo: UserDonation);
    allDonationForUser(UserToFind: number): Promise<UserDonation | null>;
    getAllDonation(): Promise<Array<UserDonation>>;
    addDonation(user_Id: number, charity_Id: number, donation_amount: number): Promise<any>;
}
