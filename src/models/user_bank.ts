import { Entity, property, model } from '@loopback/repository';

@model({
    name: "user_bank"
})
export class UserBank extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
    })
    bankName: string;

    getId() {
        return this.id;
    }
}