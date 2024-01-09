// importing the required packages
import express, { json } from "express";
import bodyparser from "body-parser";
import mySql from "mysql2";
import UserService from "./service/userService.mjs";
import UserDao from "./dao/userDao.mjs";
import cors from "cors";
import TagService from "./service/tagService.mjs";
import TaskService from "./service/taskService.mjs";

// get the instance of express library
const app = express();
const port = 3030;
app.use(bodyparser.json());
app.use(cors());

// data base credentials

const connection = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "susi123@SMsm",
  database: "timecraft",
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
            return callback(null);
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
            return callback(null);
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
});
const userService = new UserService();
const tagService = new TagService();
const taskService = new TaskService();

// user
app.post("/api/user/create", async (req, res) => {
  try {
    let data = req.body;
    let result = await userService.createUser(data);
    res.status(200).json({ status: 200, message: "success" });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

app.put("/api/user/login", async (req, res) => {
  try {
    let data = req.body;
    let result = await userService.login(data);
    res.status(200).json({ status: 200, token: result });
  } catch (error) {
    res.json({ status: 500, error: error.message });
  }
});

app.get("/api/user/getalluser", async (req, res) => {
  let dao = new UserDao();
  let result = await dao.getAllUser();
  res.status(200).json({ status: 200, result: result });
});

app.get("/api/user/profile_pic", async (req, res) => {
  try {
    const token = req.headers["apitoken"];
    let service = new UserService();
    let user_id = await service.authorizedUser(token);
    const userService = new UserService();
    const result = await userService.getProfileById(user_id);
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    res.status(200).json({ status: 500, error: error.message });
  }
});

// Tag
app.post("/api/tag/create", async (req, res) => {
  let data = req.body;
  try {
    let user_id = await userService.authorizedUser(data.token);
    data = { user_id, tag_name: data.tag_name };
    let result = await tagService.createTag(data);
    res.status(200).json({ status: 200, message: "success", data: result });
  } catch (error) {
    res.json({ status: 500, error: error.message });
  }
});
app.post("/api/tag/getalltags", async (req, res) => {
  let data = req.body;
  try {
    let user_id = await userService.authorizedUser(data.token);
    let result = await tagService.getAllTags(user_id);
    res.status(200).json({ status: 200, message: "success", data: result });
  } catch (error) {
    res.json({ status: 500, error: error.message });
  }
});
app.post("/api/task/create", async (req, res) => {
  let data = req.body;
  try {
    const user_id = await userService.authorizedUser(data.token);
    const tag = await tagService.getTagByName(data.tag_id);
    const json = {
      title: data.title,
      description: data.description,
      due_date: data.due_date,
      timer: data.timer,
      tag_id: tag[0].tag_id,
      priority: data.priority,
    };
    let result = await taskService.createTask(json);
    res.status(200).json({ status: 200, message: "success", data: result });
  } catch (error) {
    res.json({ status: 500, error: error.message });
  }
});
export { connectionQuery };
