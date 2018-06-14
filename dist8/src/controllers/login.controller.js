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
const user_1 = require("../models/user");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let LoginController = class LoginController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async loginUser(user) {
        if (!user.username || !user.password) {
            throw new rest_1.HttpErrors.Unauthorized('Please enter a password and a username');
        }
        var AllUsers = await this.userRepo.find();
        let registeredUser = false;
        for (var i = 0; i < AllUsers.length; i++) {
            var usertocompare = AllUsers[i];
            console.log("usernames I'm tryin");
            console.log(user.username);
            console.log(usertocompare.username);
            console.log("passwords I'm tryin");
            console.log(user.password);
            console.log(usertocompare.password);
            if ((usertocompare.username == user.username) && (await bcrypt.compare(user.password, usertocompare.password))) {
                registeredUser = true;
                var jwt = jsonwebtoken_1.sign({
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    },
                    anything: "hello"
                }, 'shh', {
                    issuer: 'auth.ix.co.za',
                    audience: 'ix.co.za',
                });
                console.log('succesful login');
                console.log(await bcrypt.compare(user.password, usertocompare.password));
                return jwt;
            }
            else {
                //console.log(bcrypt.compare(user.password, usertocompare.password))
            }
        }
        if (!registeredUser) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
    }
};
__decorate([
    rest_1.post('/login'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "loginUser", null);
LoginController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map