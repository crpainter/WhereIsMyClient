import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { CharityProject } from '../models/charity_project';
export declare class ProjectRepository extends DefaultCrudRepository<CharityProject, typeof CharityProject.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
