import { Entity } from '@loopback/repository';
export declare class CharityBank extends Entity {
    id?: number;
    bankName: string;
    charityId: number;
    getId(): number | undefined;
}
