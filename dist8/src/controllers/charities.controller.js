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
const charity_repository_1 = require("../repositories/charity.repository");
const rest_1 = require("@loopback/rest");
const charity_1 = require("../models/charity");
let CharitiesController = class CharitiesController {
    constructor(charityRepo) {
        this.charityRepo = charityRepo;
    }
    async findCharity(idToBeFound) {
        var AllCharities = await this.charityRepo.find();
        let foundCharity = null;
        for (var i = 0; i < AllCharities.length; i++) {
            var idtocompare = AllCharities[i].id;
            if (idtocompare == idToBeFound) {
                foundCharity = AllCharities[i];
                break;
            }
        }
        return foundCharity;
    }
    async getAllUsers() {
        return await this.charityRepo.find();
    }
    async addCharity(charity) {
        return await this.charityRepo.create(charity);
    }
};
__decorate([
    rest_1.get('/charity/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "findCharity", null);
__decorate([
    rest_1.get('/charity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "getAllUsers", null);
__decorate([
    rest_1.post('/addCharity'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charity_1.Charity]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "addCharity", null);
CharitiesController = __decorate([
    __param(0, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __metadata("design:paramtypes", [charity_repository_1.CharityRepository])
], CharitiesController);
exports.CharitiesController = CharitiesController;
//# sourceMappingURL=charities.controller.js.map