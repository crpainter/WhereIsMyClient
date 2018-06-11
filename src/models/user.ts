import { Entity, property, model } from '@loopback/repository';
import { Charity } from '../models/charity';

@model()
export class User extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        required: true
    })
    username: string;

    @property({
        type: 'string'
    })
    password: string;

    // Working on adding the arrays of charities from my webapp here.
    // @property.array(Charity) charitiesDonatedTo: Charity[];
    // @property.array(Charity) charitiesNotDonatedTo: Charity[];

    getId() {
        return this.id;
    }
}