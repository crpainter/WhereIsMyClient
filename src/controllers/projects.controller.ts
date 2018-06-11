import { repository } from "@loopback/repository";
import { ProjectRepository } from "../repositories/project.repository";
import { post, get, requestBody, param } from "@loopback/rest";
import { CharityProject } from "../models/charity_project";

export class ProjectsController {

  constructor(
    @repository(ProjectRepository.name) private projectRepo: ProjectRepository
  ) { }

  @get('/charity/{charity_id}/project/{project_id}')
  async findProject(
    @param.path.number('charity_id') charity_id: number, 
    @param.path.number('project_id') idToBeFound: number
  ) {
    function checkId(project: CharityProject){
      project.charity_id == charity_id;
    }
    var array = await this.projectRepo.find();

    var AllProjectsforUser = array.filter(checkId);
    let foundProject: CharityProject | null = null;
    for (var i=0;i<AllProjectsforUser.length;i++) {
      var idtocompare = AllProjectsforUser[i].id;
      if(idtocompare == idToBeFound){
        foundProject = AllProjectsforUser[i];
        break;
      }
    }
    return foundProject
  }

  @get('/charity/{charity_id}/project')
  async getAllProjectsForCharity(@param.path.number('charity_id') charityImLookingFor: number): Promise<Array<CharityProject>> {
    function checkId(project: CharityProject){
      project.charity_id == charityImLookingFor;
    }
    var array = await this.projectRepo.find();
    return array.filter(checkId);
  }

  @post('/charity/{charity_id}/addProject')
  async registerUser(
    @param.path.number('charity_id') charity_id: number,
    @requestBody() name: string
  ) {
    var project: CharityProject = new CharityProject;
    project.charity_id = charity_id
    project.name = name;
    project.budget = 0;
    console.log('yo')
    return await this.projectRepo.create(project);
    }
}