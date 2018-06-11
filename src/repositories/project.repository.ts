import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { CharityProject } from '../models/charity_project';

export class ProjectRepository extends DefaultCrudRepository<
    CharityProject,
    typeof CharityProject.prototype.id
    > {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(CharityProject, datasource);
    }
}