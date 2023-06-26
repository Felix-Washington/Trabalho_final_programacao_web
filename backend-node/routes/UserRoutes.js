const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  logUser,
} = require("../controllers/UserController");

const router = express.Router();

router.route("/api/users/").get(getAllUsers);
router.route("/api/users/register-user").post(createUser);
router.route("/api/users/id/:id").get(getUserById);
router.route("/api/users/").get(getUserByEmail);
router.route("/api/users/updateusers/:id").post(updateUser);
router.route("/api/users/auth/").get(logUser);
//router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
 
module.exports = router;