import TagDao from "../dao/tagDao.mjs";
import UserService from "./userService.mjs";
class TagService {
    userService = new UserService();
    async createTag(data) {
        if (await this.userService.isUserById(data.user_id)) {
            const tagDao = new TagDao();
            return await tagDao.addTag(data);
        } else {
            throw new Error('invalid user')
        }

    }
    async getAllTags(id) {
        if (await this.userService.isUserById(id)) {
            const tagDao = new TagDao();
            return await tagDao.getAllTags(id);
        } else {
            throw new Error('invalid user')
        }
    }
}
export default TagService