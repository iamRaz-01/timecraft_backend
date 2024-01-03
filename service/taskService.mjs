import TagService from "./tagService.mjs";
import TaskDao from "../dao/taskDao.mjs";
class TaskService {
    async createTask(data) {
        const tag = new TagService()
        const task = new TaskDao();
        if (await tag.getTagById(data.tag_id)) {
            return await task.addTask(data)
        } else {
            throw new Error('invalid tag')
        }
    }
}
export default TaskService