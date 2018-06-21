import { Entity } from '@loopback/repository';
export declare class PaymentMethod extends Entity {
    id?: number;
    user_id: number;
    expiry: string;
    cardNumber: string;
    bankId: number;
    getId(): number | undefined;
}
