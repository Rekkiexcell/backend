import fs from "fs"; // FS: File System ---> Untuk Reading file
export const read = () : any => {
     return JSON.parse(fs.readFileSync("./database/db.json", "utf8"))
  
     }

export const write = (findAllUsers: {}) : any => {
  fs.writeFileSync("./database/db.json", JSON.stringify(findAllUsers));
}