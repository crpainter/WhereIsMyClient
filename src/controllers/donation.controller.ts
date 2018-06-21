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
    var jwtBody = verify(jwt, 'JumpHigher') as any;
    let allDonations: User_Donation[] =  await this.donationRepo.find({where: {user_id: jwtBody.user.id}});
    let charityIdArray : number[] = [];
    for (var i = 0; i < allDonations.length; ++i) {
      charityIdArray.push(allDonations[i].charity_id)
    }
    
    let charitiesDonatedToList = await this.charityRepo.find({
      where: {
        id: { inq: charityIdArray }
      }
    });
    let charitiesDonatedToWithSums: any[] = [];
    for (var i = 0; i< charitiesDonatedToList.length; ++i) {
      var counter = 0;
      var DonationsToThisCharity = allDonations.filter(function(obj){
        return (obj.charity_id == charitiesDonatedToList[i].id)
      });
      for (var j = 0; j< DonationsToThisCharity.length; ++j) {
        counter = counter + DonationsToThisCharity[j].DonationSum;
      }
      let { id, name, description, logourl, siteurl, userDonationTotal, featuredimage1, featuredimage2, featuredimage3 } = charitiesDonatedToList[i];
      userDonationTotal = counter;
      charitiesDonatedToWithSums.push({
        id,
        name,
        description,
        logourl,
        siteurl,
        userDonationTotal,
        counter,
        featuredimage1,
        featuredimage2,
        featuredimage3

      })
    }
    return charitiesDonatedToWithSums;
    }
    catch(err) {
      throw new HttpErrors.BadRequest('JWT token invalid');
    }
  }

  @get('/donation')
  async getAllDonation(): Promise<Array<User_Donation>> {
    return await this.donationRepo.find();
  }

  @post('/user/charity/addDonation')
  async addDonation(
    @param.query.string('jwt') jwt: string, 
    @param.query.number('charity_id') charity_id: number, 
    @param.query.number('donation_amount') donation_amount: number
  ) {
    var jsBody:any = verify(jwt, 'JumpHigher');
    var donation = new User_Donation;
    donation.DonationSum = donation_amount;
    donation.user_id = jsBody.user.id;
    donation.charity_id = charity_id;
    return await this.donationRepo.create(donation);
  }
}