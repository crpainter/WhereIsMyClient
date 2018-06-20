import { Entity } from '@loopback/repository';
export declare class RoleMap extends Entity {
    id?: number;
    user_id: number;
    role_id: number;
    getId(): number | undefined;
}
