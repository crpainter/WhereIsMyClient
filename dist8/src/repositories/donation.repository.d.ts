import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { UserDonation } from '../models/user_donation';
export declare class DonationRepository extends DefaultCrudRepository<UserDonation, typeof UserDonation.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
