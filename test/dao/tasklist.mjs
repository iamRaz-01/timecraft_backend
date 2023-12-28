import TagDao from "../../dao/tagDao.mjs";
let tasklist = new TagDao();
let data = { user_id: 1, tag_name: 'productivity' }
console.log(await tasklist.createTag(data));
console.log(await tasklist.getAllTags(1))