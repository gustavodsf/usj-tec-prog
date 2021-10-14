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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const user_dto_1 = require("./dto/user.dto");
const login_dto_1 = require("../auth/dto/login.dto");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.password = this.passwordEnrich(data.password, data.email);
            const user = yield this.prisma.user.create({ data });
            return new user_dto_1.UserDTO(user.id, user.name, user.email, user.role, user.createdOn, user.updateOn);
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbUser = yield this.prisma.user.findUnique({
                where: { id: data.id },
            });
            if (dbUser.password !== data.password) {
                data.password = this.passwordEnrich(data.password, data.email);
            }
            const user = yield this.prisma.user.update({
                where: {
                    id: data.id,
                },
                data,
            });
            return this.toUserDTO(user);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.delete({ where: { id: id } });
            return this.toUserDTO(user);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.prisma.user.findMany();
            return users.map((user) => this.toUserDTO(user));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({ where: { id: id } });
            return this.toUserDTO(user);
        });
    }
    findByPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { email: payload.email },
            });
            return this.toUserDTO(user);
        });
    }
    findByLogin(loginDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { email: loginDTO.email },
            });
            if (!user) {
                throw new common_1.HttpException('Senha ou usuário inválido', common_1.HttpStatus.UNAUTHORIZED);
            }
            const areEqual = bcrypt.compareSync(`${loginDTO.password}_${loginDTO.email}`, user.password);
            if (!areEqual) {
                throw new common_1.HttpException('Senha ou usuário inválido', common_1.HttpStatus.UNAUTHORIZED);
            }
            return this.toUserDTO(user);
        });
    }
    passwordEnrich(password, salt) {
        const newPassword = `${password}_${salt}`;
        return bcrypt.hashSync(newPassword, 10);
    }
    toUserDTO(user) {
        return new user_dto_1.UserDTO(user.id, user.name, user.email, user.role, user.createdOn, user.updateOn);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map