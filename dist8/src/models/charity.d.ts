import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    description: string;
    logourl: string;
    siteurl: string;
    userDonationTotal: number;
    featuredimage1: string;
    featuredimage2: string;
    featuredimage3: string;
    cause: string;
    getId(): number | undefined;
}
