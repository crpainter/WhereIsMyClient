import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { User_Donation } from '../models/user_donation';

export class DonationRepository extends DefaultCrudRepository<
User_Donation,
    typeof User_Donation.prototype.id
    > {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(User_Donation, datasource);
    }
}