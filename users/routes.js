import * as dao from "./dao.js";
import { sha256 } from "./utils.js";

function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    console.log("findAllUsers");
    const users = await dao.findAllUsers();
    res.send(users);
  };
  const findUserById = async (req, res) => {
    const { id } = req.params;
    const user = await dao.findUserById(id);
    res.send(user);
  };
  const findUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await dao.findUserByUsername(username);
    res.send(user);
  };
  
  const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const status = await dao.updateUser(id, user);
    const currentUser = await dao.findUserById(id);
    req.session["currentUser"] = currentUser;
    res.send(status);
  };

  const signin = async (req, res) => {
    let { email, password } = req.body;
    password = await sha256(password);
    const currentUser = await dao.findUserByCredentials(email, password);
    if (!currentUser) {
      res.json(401);
    } else {
      req.session['currentUser'] = currentUser;
      res.status(200).send(currentUser);
    }

  };


  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};

const signOut = (req, res) => {
  req.session.destroy();
  res.json(200);
};

  
const signup = async (req, res) => {
  const user = await dao.findUserByUsername(
    req.body.username);
  if (user) {
    res.status(400).json(
      { message: "Username already taken" });
  }
  req.body = {
    ...req.body,
    password: await sha256(req.body.password),

  }
  const currentUser = await dao.createUser(req.body);
  req.session['currentUser'] = currentUser;
  res.json(currentUser);
};


  const account = async (req, res) => {
    res.json(req.session['currentUser']);
  };


  app.post("/api/users/signin", signin);
  app.post("/api/users/account", account);
  app.post("/api/users/signout", signOut);
  app.post("/api/users/signup", signup);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/username/:username", findUserByUsername);

  // app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);

  app.delete("/api/users/:userId", deleteUser);
}

export default UserRoutes;
