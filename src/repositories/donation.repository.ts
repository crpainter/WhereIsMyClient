import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { UserDonation } from '../models/user_donation';

export class DonationRepository extends DefaultCrudRepository<
UserDonation,
    typeof UserDonation.prototype.id
    > {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(UserDonation, datasource);
    }
}