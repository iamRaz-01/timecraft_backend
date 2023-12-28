import UserService from "../../service/userService.mjs"

let data = {
    username: 'abdul razak',
    email: 'abdul@gmail.com',
    password: 12345
}
const userService = new UserService();
console.log(await userService.authorizedUser('Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V2JGbDNXa1JTVjFKc2JETlhhMUpUVmpBeFdHVkliRmhoTWsweFdWZHplRll4WkhWalJtUnBWa1ZhU1ZkV1ZtRlRNazE0Vkc1T2FWSnVRazlWYlhoM1pWWmtWMWRzV214U2JWSkpWbTEwYTJGR1NuUmhSemxWVm14YU0xWldXbXRXTVZaeVdrWndWMDFWY0VwV2JHUXdWakZaZVZOclpGaGhlbXhZV1ZkMGQyUnNXbk5YYlVacVlraENSbFpYZUd0VWJGcDFVV3hvVjFKc2NGaFdha3BIVTBaYWRWSnNTbGRTTTAwMQ=='));