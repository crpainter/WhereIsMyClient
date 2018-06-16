import { repository } from "@loopback/repository";
import { DonationRepository } from "../repositories/donation.repository";
import { post, get, requestBody, param, HttpErrors } from "@loopback/rest";
import { User_Donation } from "../models/user_donation";
import { Charity } from "../models/charity";
import { CharityRepository } from "../repositories/charity.repository";
import { verify } from 'jsonwebtoken';


export class DonationsController {

  constructor(
    @repository(DonationRepository.name) private donationRepo: User_Donation,
    @repository(CharityRepository.name) private charityRepo: CharityRepository
  ) { }
  private token: string;

  @get('/donation/{user_id}')
  async allDonationForUser(@param.path.number('user_id') UserToFind: number): Promise<User_Donation | null> {
     return await this.donationRepo.find({where: {user_id: UserToFind}});
  }

  @get('/donation1/charitiesDonatedTo')
  async charitiesDonatedTo(@param.query.string('jwt') jwt: string) {
    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

    try {
    var jwtBody = verify(jwt, 'shh') as any;
    let allDonations: User_Donation[] =  await this.donationRepo.find({where: {user_id: jwtBody.user.id}});
    let charityIdArray : number[] = [];
    for (var i = 0; i < allDonations.length; ++i) {
      charityIdArray.push(allDonations[i].charity_id)
    }
    
    var charitiesDonatedToList = await this.charityRepo.find({
      where: {
        id: { inq: charityIdArray }
      }
    });
    return charitiesDonatedToList;
    }
    catch(err) {
      throw new HttpErrors.BadRequest('JWT token invalid');
    }
  }

  @get('/donation')
  async getAllDonation(): Promise<Array<User_Donation>> {
    return await this.donationRepo.find();
  }

  @post('/user/{user_Id}/charity/{charity_Id}/donation')
  async addDonation(
    @param.path.number('user_Id') user_Id: number, 
    @param.path.number('charity_Id') charity_Id: number, 
    @requestBody() donation_amount: number
  ) {
    var donation = new User_Donation;
    donation.DonationSum = donation_amount;
    donation.user_id = user_Id;
    donation.charity_id = charity_Id;
    return await this.donationRepo.create(donation);
  }
}