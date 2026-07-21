const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

// Get All Users
router.get("/", UserController.getAllUsers);

// Create User
router.post("/add", UserController.createUser);

// Get User By ID
router.get("/users/:id", UserController.getUserById);

// Update User
router.put("/update/:id", UserController.updateUser);

// Delete User
router.delete("/delete/:id", UserController.deleteUser);

module.exports = router;