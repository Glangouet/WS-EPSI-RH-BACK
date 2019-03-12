import {RolesEnum} from "../enum/roles.enum";

class User {
    id: number;
    username: string;
    role: string;

    constructor(id?: number, username?: string, role?: string) {
        role ? this.role = role : RolesEnum.ROLE_USER;
        this.id = id;
        this.username = username;
    }
}

export default User;