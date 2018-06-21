import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    description: string;
    logourl: string;
    siteurl: string;
    userDonationTotal: number;
    getId(): number | undefined;
}
