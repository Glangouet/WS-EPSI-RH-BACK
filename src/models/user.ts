import {RolesEnum} from "../enum/roles.enum";

class User {
    id: number;
    email: string;
    password: string;
    role: string;

    constructor(id?: number, email?: string, role?: string, password?: string) {
        role ? this.role = role : RolesEnum.ROLE_USER;
        this.id = id;
        this.email = email;
        password ? this.password = password : null;
    }
}

export default User;