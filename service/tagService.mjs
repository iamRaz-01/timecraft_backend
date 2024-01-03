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
    async getTagById(id) {
        const tagDao = new TagDao();
        const check = await tagDao.getTagById(id);
        if (check.length === 0) return false;
        else return true; // existing tag
    }
    async getTagByName(name) {
        const tagDao = new TagDao();
        const check = await tagDao.getTagByName(name);
        if (check.length === 0) return false;
        else return check;
    }
}
export default TagService