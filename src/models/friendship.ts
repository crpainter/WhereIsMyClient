import { Entity, property, model } from '@loopback/repository';

@model()
export class Friendship extends Entity {
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
    friend_id: number;

    getId() {
        return this.id;
    }
}