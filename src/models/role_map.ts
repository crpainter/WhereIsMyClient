import { Entity, property, model } from '@loopback/repository';

@model({
    name: "role_map"
})
export class RoleMap extends Entity {
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
    role_id: number;

    getId() {
        return this.id;
    }
}