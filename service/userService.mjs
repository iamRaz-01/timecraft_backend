import UserDao from "../dao/userDao.mjs";
class UserService {
    userDao = new UserDao();
    async authorizedUser(token) {
        try {
            token = decryptToken(token);
            let tokenArr = token.split('.com');
            let email = tokenArr[0] + '.com'
            if (await this.isUserByEmail(email)) {
                return tokenArr[1];
            } else return false;

        } catch (error) {
            throw new Error('Invalid Api Token')

        }

    }
    async getProfileById(id) {
        if (await this.isUserById(id)) {
            return await this.userDao.getProfilePic(id);
        } else {
            throw new Error('Invalid User');
        }

    }
    async isUserByEmail(email) {
        const check = await this.userDao.getUserByEmail(email);
        if (check.length === 0) return false;
        else return true; // existing user
    }
    async isUserById(id) {
        const check = await this.userDao.getUserById(id);
        if (check.length === 0) return false;
        else return true; // existing user
    }
    async createUser(data) {
        try {
            if (!await this.isUserByEmail(data.email)) {
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