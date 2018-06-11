import { Entity, property, model } from '@loopback/repository';

@model()
export class PaymentMethod extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
    })
    user_id: number;

    @property({
        type: 'string',
    })
    expiry: string;

    @property({
        type: 'string',
    })
    cardNumber: string;

    @property({
        type: 'number',
    })
    bankId: number;

    getId() {
        return this.id;
    }
}