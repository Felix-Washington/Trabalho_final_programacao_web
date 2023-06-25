const UserService = require("../services/UserService");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail(req.params.email);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.name, req.email, req.password);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};