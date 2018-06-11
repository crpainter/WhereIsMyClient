import { Entity, property, model } from '@loopback/repository';

@model()
export class CharityProject extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number'
    })
    charity_id: number;

    @property({
        type: 'string'
    })
    name: string;

    @property({
        type: 'number',
    })
    budget: number;

    getId() {
        return this.id;
    }
}