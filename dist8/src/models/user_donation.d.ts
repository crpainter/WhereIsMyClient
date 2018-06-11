import { Entity } from '@loopback/repository';
export declare class UserDonation extends Entity {
    id?: number;
    user_id: number;
    charity_id: number;
    DonationSum: number;
    project_id: number;
    getId(): number | undefined;
}
