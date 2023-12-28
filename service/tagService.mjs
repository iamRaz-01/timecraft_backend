import TagDao from "../dao/tagDao.mjs";
import UserService from "./userService.mjs";

class TagService {
    userService = new UserService();
    tagDao = new TagDao();
    async createTag(data) {
        if (await this.userService.isUserById(data.user_id)) {
            return await this.tagDao.addTag(data);
        } else {
            throw new Error('invalid user')
        }

    }
}
export default TagService