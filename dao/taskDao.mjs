import { connectionQuery } from '../app.mjs';
class TaskDao {
    async addTask(data) {
        return new Promise((resolve, reject) => {
            connectionQuery("insert into task set ?", data, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }
    async getAllTasks(id) {
        return new Promise((resolve, reject) => {
            connectionQuery("SELECT * FROM task where user_id  = ? ", id, (result) => {
                if (result === null) {
                    reject("Failed to execute the query.");
                } else {
                    resolve(result);
                }
            });

        });
    }
}
export default TaskDao;