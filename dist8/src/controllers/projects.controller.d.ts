import { ProjectRepository } from "../repositories/project.repository";
import { CharityProject } from "../models/charity_project";
export declare class ProjectsController {
    private projectRepo;
    constructor(projectRepo: ProjectRepository);
    findProject(charity_id: number, idToBeFound: number): Promise<CharityProject | null>;
    getAllProjectsForCharity(charityImLookingFor: number): Promise<Array<CharityProject>>;
    registerUser(charity_id: number, name: string): Promise<CharityProject>;
}
