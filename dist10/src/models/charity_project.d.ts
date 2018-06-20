import { Entity } from '@loopback/repository';
export declare class CharityProject extends Entity {
    id?: number;
    charity_id: number;
    name: string;
    budget: number;
    getId(): number | undefined;
}
