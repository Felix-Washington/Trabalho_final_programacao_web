const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

router.route("/api/users/").get(getAllUsers);
router.route("/api/users/register-user").post(createUser);
router.route("/api/users/id/:id").get(getUserById);
router.route("/api/users/:email").get(getUserByEmail);
router.route("/api/users/updateusers/:id").post(updateUser);
//router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
 
module.exports = router;