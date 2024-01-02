import { connectionQuery } from '../app.mjs';
class TagDao {
    async addTag(data) {
        return new Promise((resolve, reject) => {
            connectionQuery("insert into tag set ?", data, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }
    async getAllTags(id) {
        return new Promise((resolve, reject) => {
            connectionQuery("SELECT * FROM tag where user_id  = ? ", id, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result);
                }
            });

        });
    }


}
let tag = new TagDao();
console.log(await tag.getAllTags(1))

export default TagDao;