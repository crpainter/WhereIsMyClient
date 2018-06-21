"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const project_repository_1 = require("../repositories/project.repository");
const rest_1 = require("@loopback/rest");
const charity_project_1 = require("../models/charity_project");
let ProjectsController = class ProjectsController {
    constructor(projectRepo) {
        this.projectRepo = projectRepo;
    }
    async findProject(charity_id, idToBeFound) {
        function checkId(project) {
            project.charity_id == charity_id;
        }
        var array = await this.projectRepo.find();
        var AllProjectsforUser = array.filter(checkId);
        let foundProject = null;
        for (var i = 0; i < AllProjectsforUser.length; i++) {
            var idtocompare = AllProjectsforUser[i].id;
            if (idtocompare == idToBeFound) {
                foundProject = AllProjectsforUser[i];
                break;
            }
        }
        return foundProject;
    }
    async getAllProjectsForCharity(charityImLookingFor) {
        function checkId(project) {
            project.charity_id == charityImLookingFor;
        }
        var array = await this.projectRepo.find();
        return array.filter(checkId);
    }
    async registerUser(charity_id, name) {
        var project = new charity_project_1.CharityProject;
        project.charity_id = charity_id;
        project.name = name;
        project.budget = 0;
        console.log('yo');
        return await this.projectRepo.create(project);
    }
};
__decorate([
    rest_1.get('/charity/{charity_id}/project/{project_id}'),
    __param(0, rest_1.param.path.number('charity_id')),
    __param(1, rest_1.param.path.number('project_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findProject", null);
__decorate([
    rest_1.get('/charity/{charity_id}/project'),
    __param(0, rest_1.param.path.number('charity_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getAllProjectsForCharity", null);
__decorate([
    rest_1.post('/charity/{charity_id}/addProject'),
    __param(0, rest_1.param.path.number('charity_id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "registerUser", null);
ProjectsController = __decorate([
    __param(0, repository_1.repository(project_repository_1.ProjectRepository.name)),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository])
], ProjectsController);
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map