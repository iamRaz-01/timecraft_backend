import { connectionQuery } from "../app.mjs";
class UserDao {

    async createUser(data) {
        return new Promise((resolve, reject) => {
            connectionQuery("insert into user set ?", data, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    let id = result.insertId;
                    resolve(id);
                }
            });

        });
    }
    async getAllUser() {
        return new Promise((resolve, reject) => {
            connectionQuery("SELECT * FROM user", undefined, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result);
                }
            });

        });
    }
    async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            connectionQuery("SELECT * FROM user where email = ?", email, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result);
                }
            });

        });

    }
    async getUserById(id) {
        return new Promise((resolve, reject) => {
            connectionQuery("SELECT * FROM user where user_id = ?", id, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result);
                }
            });

        });

    }
    async getProfilePic(id) {
        return new Promise((resolve, reject) => {
            connectionQuery("SELECT profile_image FROM user where user_id = ?", id, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result);
                }
            });

        });

    }
    async getUserById(id) {
        return new Promise((resolve, reject) => {
            connectionQuery("SELECT * FROM user where user_id = ?", id, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result);
                }
            });

        });


    }


    async updateLogin(id) {
        return new Promise((resolve, reject) => {
            connectionQuery("UPDATE user SET is_login = true  WHERE  user_id = ? ", id, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result);
                }
            });

        });

    }




}


export default UserDao;