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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUser() {
        return this.userService.findAll();
    }
    getUserBuyId(id) {
        return this.userService
            .findById(id)
            .then((user) => {
            console.log(user);
            return user || {};
        })
            .catch((err) => {
            throw new common_1.HttpException('Erro! ao tentar retornar o usuário', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    createUser(user) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
            throw new common_1.HttpException('Erro! o e-mail informado é inválido', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.userService
            .save(user)
            .then((user) => {
            return user;
        })
            .catch((_) => {
            throw new common_1.HttpException('Erro! ao tentar salvar o usuário', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    updateUser(user) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
            throw new common_1.HttpException('Erro! o e-mail informado é inválido', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.role != 'user' && user.role != 'admin') {
            throw new common_1.HttpException('Erro! o perfil informado está errado', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.userService
            .update(user)
            .then((user) => {
            return user;
        })
            .catch((_) => {
            throw new common_1.HttpException('Erro! ao tentar atualizar o usuário', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    deleteUser(id, response) {
        return this.userService
            .delete(id)
            .then(() => {
            return response.status(common_1.HttpStatus.OK).send();
        })
            .catch((_) => {
            return response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .send('Erro! ao tentar excluir o usuário');
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserBuyId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map