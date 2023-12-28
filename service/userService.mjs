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
                return await this.userDao.createUser(data);
            } else throw new Error("user exists")
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async login(data) {
        try {
            let user = await this.userDao.getUserByEmail(data.email);
            if (user.length != 0) {
                if (data.password === user[0].password) {
                    this.userDao.updateLogin(user[0].user_id);
                    return encryptToken(user[0].email, user[0].user_id);;
                } else throw new Error("Invalid email or password");
            } else {
                throw new Error("Invalid user")
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
let data = {
    username: 'razak',
    email: 'abdulrazak@gmail.com',
    password: '123445',
}





function encryptToken(email, id) {
    let string = email + id;
    for (let i = 0; i < 10; i++) {
        string = btoa(string);
    }
    return string;
}
function decryptToken(str) {
    for (let i = 0; i < 10; i++) {
        str = atob(str);
    }
    return str;
}

export default UserService;