import { connectionQuery } from "../app.mjs";
class User {
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




}
try {
    const user = new User()
    console.log(await user.getUserById(1))
} catch (e) {
    console.log(e)
}

