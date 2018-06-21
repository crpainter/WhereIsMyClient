import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id?: number;
    username: string;
    password: string;
    getId(): number | undefined;
}
