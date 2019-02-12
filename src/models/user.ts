class User {
    id: number;
    username: string;
    role: string;

    constructor() {
        this.role = RolesEnum.ROLE_USER;
    }
}

export default User;