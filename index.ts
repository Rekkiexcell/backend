import expres, { Express, Request, Response } from "express";
import fs from "fs";
import { read, write} from './utils/fs';

const app: Express = expres();
// 1.2
app.use(expres.json()); // Body parser -- Untuk mengambil data Body from client
const port: number = 5000;

app.get("/", (req: Request, res: Response) => {
  // Req : Digunakan  untuk Mengambil Resource Dari cliebt
  // Res : Digunakan Untuk Mengirim Response Keke client
  res.send("welcome to Express + Typescript API");
});

interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Get Data user
app.get("/users", (req: Request, res: Response) => {
  try {
    // Step -01 : Reading File
    // Json.parse : Digunakan Untuk Merubah  format Buffer Menjadi Object Js
    const { users }: { users: Array<IUsers> } = read()

    // Step -02 : Response
    res.send({
      error: false,
      message: "Get Users Success!",
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", (req: Request, res: Response) => {
  try {
    // Step -01 : Get Resource Body Form Client


    // Step -02 : Reading File
    // Json.parse : Digunakan Untuk Merubah  format Buffer Menjadi Object Js
    const findAllUsers: { users: Array<IUsers> } = JSON.parse(fs.readFileSync("./database/db.json", "utf8"));
    const data: IUsers = { id: findAllUsers.users.length + 1, ...req.body }; // Object

    // Push -03 Push "data " into "users"
    findAllUsers.users.push(data);

    // Step -4 save "Users"  Into "db.json"
    fs.writeFileSync("./database/db.json", JSON.stringify(findAllUsers));

    // Step -05 : Response
    res.send({
      error: false,
      message: "Create Users Success!",
      data: null,
    });
  } catch (error) {}
});
// PUT DATA
app.put("/users/:id", (req: Request, res: Response) => {
  try {
    // Step -01 : Reading "db.json"
    const findAllUsers: { users: Array<IUsers> } = JSON.parse(
      fs.readFileSync("./database/db.json", "utf8")
    );
    // Step-02 Get data  from "req.body"
    const { id } = req.params;
    const data: IUsers = { id: parseInt(req.params.id), ...req.body };

    // Step-03 Manipulate Data
    // findAllUser.users = [{0}, {1}]
    findAllUsers.users.forEach((item, index) => {
        // {id, username, email, password}
      if (item.id === Number(id)) {
        findAllUsers.users[index] = {...data, id: item.id };
      }
    });
    write(findAllUsers);

    // Step -05 : Response
    res.send({
      error: false,
      message: "Update Users Success!",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/users/:id", ( req, res ) => {
    try {
        // Step -01 : Reading "db.json"
        const findAllUsers: { users: Array<IUsers> } = read()
 
        // Step-02 Get data  from "req.body"
        const { id } = req.params;
    
        // Step-03 Manipulate Data
        // findAllUser.users = [{0}, {1}]
        findAllUsers.users.forEach((item, index) => {
            // {id, username, email, password}
          if(item.id === Number(id)) findAllUsers.users.splice(index, 1) 
          
        });
        write(findAllUsers);

        res.send({
                error: false,
                message: "Delete Users Success!",
                data: null
            })
        } catch (error) {
            
        }
    }    
)

app.listen(port, () => {
  console.log(`⚡️[SERVER]: Server is running on Port ${port}`);
});


// Excercise
// Buatlah end point login, dengan ketentuan
//    - Method : GET
//    - Login By : Email/Username & Password

// Login
app.get('/users', (req: Request, res: Response) => {
    try {
        const { login } : { login: Array<IUsers> } = read()
    } catch (error) {

    
    }

})