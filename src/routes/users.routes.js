//lembrando "destructuring", isso equivale a usar o "express.Router()"" se eu tivesse importanto toda a biblioteca express (const express = require("express"))
const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.tomate);

module.exports = usersRoutes;
