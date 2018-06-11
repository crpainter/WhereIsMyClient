import { Entity, property, model } from '@loopback/repository';

@model()
export class CharityBank extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
    })
    bankName: string;

    @property({
        type: 'number',
    })
    charityId: number;

    getId() {
        return this.id;
    }
}