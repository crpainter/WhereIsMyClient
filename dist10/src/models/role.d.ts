import { Entity } from '@loopback/repository';
export declare class Role extends Entity {
    id?: number;
    type: string;
    getId(): number | undefined;
}
