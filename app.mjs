// importing the required packages 
import express from 'express';
import bodyparser from 'body-parser'
import mySql from 'mysql2';
import UserService from './service/userService.mjs';
import UserDao from './dao/userDao.mjs';
import cors from 'cors';

// get the instance of express library 
const app = express();
const port = 3030;
app.use(bodyparser.json());
app.use(cors())

// data base credentials 
const connection = mySql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'timecraft',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// universal query function 
function connectionQuery(query, data, callback) {
    connection.getConnection((err, connect) => {
        if (err) {
            throw new Error("Database connection error: " + err.message);
        } else {
            if (data !== undefined) {
                connect.query(query, data, (error, response) => {
                    if (error) {
                        console.log("error in executing the query :" + error.message);
                        return callback(null)
                    } else {
                        // Release the connection back to the pool when done
                        connect.release();
                        callback(response);
                        return response;
                    }
                });
            } else {
                connect.query(query, (error, response) => {
                    if (error) {
                        console.log("error in executing the query :" + error.message);
                        return callback(null)
                    } else {
                        // Release the connection back to the pool when done
                        connect.release();
                        callback(response);
                        return response;
                    }
                });
            }
        }
    });
}

// code is running on Server 
app.listen(port, () => {
    console.log("server is running ");
})

app.post('/api/user/create', async (req, res) => {
    try {
        let data = req.body;
        let service = new UserService();
        let result = await service.createUser(data);
        res.json({ 'status': 200, 'token': result })
    }
    catch (error) {
        res.json({ 'status': 500, 'error': error.message })
    }
})
app.get('/api/user/getalluser', async (req, res) => {
    let dao = new UserDao()
    let result = await dao.getAllUser();

    res.json({ 'status': 200, 'result': result })

})
export { connectionQuery }