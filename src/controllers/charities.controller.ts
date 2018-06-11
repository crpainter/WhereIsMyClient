import { repository } from "@loopback/repository";
import { CharityRepository } from "../repositories/charity.repository";
import { post, get, requestBody, param } from "@loopback/rest";
import { Charity } from "../models/charity";

export class CharitiesController {

  constructor(
    @repository(CharityRepository.name) private charityRepo: CharityRepository
  ) { }

  @get('/charity/{id}')
  async findCharity(@param.path.number('id') idToBeFound: number): Promise<Charity | null> {
    var AllCharities = await this.charityRepo.find();
    let foundCharity: Charity | null = null;
    for (var i=0;i<AllCharities.length;i++) {
      var idtocompare = AllCharities[i].id;
      if(idtocompare == idToBeFound){
        foundCharity = AllCharities[i];
        break;
      }
    }
    return foundCharity
  }

  @get('/charity')
  async getAllUsers(): Promise<Array<Charity>> {
    return await this.charityRepo.find();
  }

  @post('/addCharity')
  async addCharity(@requestBody() charity: Charity) {
    return await this.charityRepo.create(charity);
  }
}