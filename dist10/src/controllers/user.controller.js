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
const user_repository_1 = require("../repositories/user.repository");
const rest_1 = require("@loopback/rest");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let UserController = class UserController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async findUser(jwt) {
        // var AllUsers = await this.userRepo.find();
        let foundUser = null;
        // for (var i=0;i<AllUsers.length;i++) {
        //   var idtocompare = AllUsers[i].id;
        //   if(idtocompare == idToBeFound){
        //     foundUser = AllUsers[i];
        //     break;
        //   }
        // }
        var jsBody = jsonwebtoken_1.verify(jwt, 'JumpHigher');
        foundUser = jsBody.user;
        return foundUser;
    }
    async updateUser(jwt, obj) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'JumpHigher');
            await this.userRepo.updateById(jwtBody.user.id, obj);
            var changedUser = await this.userRepo.findById(jwtBody.user.id);
            if (changedUser.password.length < 15) {
                let hashedPassword = await bcrypt.hash(changedUser.password, 10);
                obj.password = hashedPassword;
                await this.userRepo.updateById(changedUser.id, obj);
            }
            var jwt = jsonwebtoken_1.sign({
                user: {
                    id: changedUser.id,
                    username: changedUser.username,
                    password: changedUser.password
                },
            }, 'JumpHigher', {
                issuer: 'auth.ix.co.za',
                audience: 'ix.co.za',
            });
            console.log(jwt);
            return {
                token: jwt,
            };
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
    async getAllUsers() {
        return await this.userRepo.find();
    }
};
__decorate([
    rest_1.get('/user'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    rest_1.patch('/updateUser'),
    __param(0, rest_1.param.query.string('jwt')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    rest_1.get('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
UserController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map