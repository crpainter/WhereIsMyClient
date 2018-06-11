import { repository } from "@loopback/repository";
import { DonationRepository } from "../repositories/donation.repository";
import { post, get, requestBody, param } from "@loopback/rest";
import { UserDonation } from "../models/user_donation";

export class DonationsController {

  constructor(
    @repository(DonationRepository.name) private donationRepo: UserDonation
  ) { }

  @get('/donation/{user_id}')
  async allDonationForUser(@param.path.number('user_id') UserToFind: number): Promise<UserDonation | null> {
     return await this.donationRepo.find({where: {user_id: UserToFind}});
  }

  @get('/donation')
  async getAllDonation(): Promise<Array<UserDonation>> {
    return await this.donationRepo.find();
  }

  @post('/user/{user_Id}/charity/{charity_Id}/donation')
  async addDonation(
    @param.path.number('user_Id') user_Id: number, 
    @param.path.number('charity_Id') charity_Id: number, 
    @requestBody() donation_amount: number
  ) {
    var donation = new UserDonation;
    donation.DonationSum = donation_amount;
    donation.user_id = user_Id;
    donation.charity_id = charity_Id;
    return await this.donationRepo.create(donation);
  }
}