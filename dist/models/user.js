"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_enum_1 = require("../enum/roles.enum");
class User {
    constructor(id, email, role, password) {
        role ? this.role = role : roles_enum_1.RolesEnum.ROLE_USER;
        this.id = id;
        this.email = email;
        password ? this.password = password : null;
    }
}
exports.default = User;
