"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("./utils/fs");
const app = (0, express_1.default)();
// 1.2
app.use(express_1.default.json()); // Body parser -- Untuk mengambil data Body from client
const port = 5000;
app.get("/", (req, res) => {
    // Req : Digunakan  untuk Mengambil Resource Dari cliebt
    // Res : Digunakan Untuk Mengirim Response Keke client
    res.send("welcome to Express + Typescript API");
});
// Get Data user
app.get("/users", (req, res) => {
    try {
        // Step -01 : Reading File
        // Json.parse : Digunakan Untuk Merubah  format Buffer Menjadi Object Js
        const { users } = (0, fs_2.read)();
        // Step -02 : Response
        res.send({
            error: false,
            message: "Get Users Success!",
            data: users,
        });
    }
    catch (error) {
        console.log(error);
    }
});
app.post("/users", (req, res) => {
    try {
        // Step -01 : Get Resource Body Form Client
        // Step -02 : Reading File
        // Json.parse : Digunakan Untuk Merubah  format Buffer Menjadi Object Js
        const findAllUsers = JSON.parse(fs_1.default.readFileSync("./database/db.json", "utf8"));
        const data = Object.assign({ id: findAllUsers.users.length + 1 }, req.body); // Object
        // Push -03 Push "data " into "users"
        findAllUsers.users.push(data);
        // Step -4 save "Users"  Into "db.json"
        fs_1.default.writeFileSync("./database/db.json", JSON.stringify(findAllUsers));
        // Step -05 : Response
        res.send({
            error: false,
            message: "Create Users Success!",
            data: null,
        });
    }
    catch (error) { }
});
// PUT DATA
app.put("/users/:id", (req, res) => {
    try {
        // Step -01 : Reading "db.json"
        const findAllUsers = JSON.parse(fs_1.default.readFileSync("./database/db.json", "utf8"));
        // Step-02 Get data  from "req.body"
        const { id } = req.params;
        const data = Object.assign({ id: parseInt(req.params.id) }, req.body);
        // Step-03 Manipulate Data
        // findAllUser.users = [{0}, {1}]
        findAllUsers.users.forEach((item, index) => {
            // {id, username, email, password}
            if (item.id === Number(id)) {
                findAllUsers.users[index] = Object.assign(Object.assign({}, data), { id: item.id });
            }
        });
        (0, fs_2.write)(findAllUsers);
        // Step -05 : Response
        res.send({
            error: false,
            message: "Update Users Success!",
            data: null,
        });
    }
    catch (error) {
        console.log(error);
    }
});
app.delete("/users/:id", (req, res) => {
    try {
        // Step -01 : Reading "db.json"
        const findAllUsers = (0, fs_2.read)();
        // Step-02 Get data  from "req.body"
        const { id } = req.params;
        // Step-03 Manipulate Data
        // findAllUser.users = [{0}, {1}]
        findAllUsers.users.forEach((item, index) => {
            // {id, username, email, password}
            if (item.id === Number(id))
                findAllUsers.users.splice(index, 1);
        });
        (0, fs_2.write)(findAllUsers);
        res.send({
            error: false,
            message: "Delete Users Success!",
            data: null
        });
    }
    catch (error) {
    }
});
app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running on Port ${port}`);
});
// Excercise
// Buatlah end point login, dengan ketentuan
//    - Method : GET
//    - Login By : Email/Username & Password
// Login
app.get('/users', (req, res) => {
    try {
        const { login } = (0, fs_2.read)();
    }
    catch (error) {
    }
});
