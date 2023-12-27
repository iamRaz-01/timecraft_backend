import UserDao from "../dao/userDao.mjs";
class UserService {
    userDao = new UserDao();
    async isUser(email) {
        const check = await this.userDao.getUserByEmail(email);
        if (check.length === 0) return false;
        else return true; // existing user
    }
    async createUser(data) {
        try {
            if (!await this.isUser(data.email)) {
                const id = await this.userDao.createUser(data);
                let encrypt = btoa(data.email + id);
                return encrypt;
            } else throw new Error("user exists")
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
let data = {
    username: 'razak',
    email: 'abdulrazak@gmail.com',
    password: '123445',
    first_name: "abdul",
    last_name: "razak",

}


export default UserService;