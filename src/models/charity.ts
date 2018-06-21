import { Entity, property, model } from '@loopback/repository';

@model()
export class Charity extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        required: true
    })
    name: string;

    @property({
        type: 'string'
    })
    description: string;

    @property({
        type: 'string',
    })
    logourl: string;

    @property({
        type: 'string',
    })
    siteurl: string;

    @property({
        type: 'number',
    })
    userDonationTotal: number;

    @property({
        type: 'string',
    })
    featuredimage1: string;

    @property({
        type: 'string',
    })
    featuredimage2: string;

    @property({
        type: 'string',
    })
    featuredimage3: string;

    @property({
        type: 'string',
    })
    cause: string;

    getId() {
        return this.id;
    }
}