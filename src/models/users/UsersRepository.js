import pg from "../../database/index.js";

export default class UsersRepository {
  constructor() {
    this.pg = pg;
  }

  async getUsers() {
    const allUsers = await this.pg.manyOrNone("SELECT * FROM users");
   // console.log(allUsers);
    return allUsers;  

  }

  async getUserById(id) {
    const user = await this.pg.oneOrNone("SELECT * FROM users WHERE id = $1", id);
    console.log(user);
    return user;
  }

  getUserByEmail(email) {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  createUser(user) {
    this.users.push(user);
    return user;
  }

  updateUser(id, name, email, password) {
    const user = this.getUserById(id);

    if (!user) {
      return null;
    }

    user.name = name;
    user.email = email;
    user.password = password;

    return user;
  }

  deleteUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
