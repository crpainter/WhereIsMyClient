import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { User_Donation } from '../models/user_donation';
export declare class DonationRepository extends DefaultCrudRepository<User_Donation, typeof User_Donation.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
