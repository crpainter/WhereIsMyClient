import { Entity } from '@loopback/repository';
export declare class UserBank extends Entity {
    id?: number;
    bankName: string;
    getId(): number | undefined;
}
