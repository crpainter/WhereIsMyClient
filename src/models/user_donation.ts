import { Entity, property, model } from '@loopback/repository';

@model()
export class UserDonation extends Entity {
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
        type: 'number'
    })
    charity_id: number;

    @property({
        type: 'number',
    })
    DonationSum: number;

    @property({
        type: 'number'
    })
    project_id: number;

    getId() {
        return this.id;
    }
}