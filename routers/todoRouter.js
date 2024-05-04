const Router = require('../utils/router.js');
const {todoRoutes} = require("../settings/_serverSettings");
const todoController = require("../controllers/todoController");

const todoRouter = new Router();
todoRouter.get(todoRoutes.get.route, todoController.get);
todoRouter.post(todoRoutes.create.route, todoController.create);
todoRouter.delete(todoRoutes.delete.route, todoController.delete);
todoRouter.put(todoRoutes.put.route, todoController.put)


module.exports = todoRouter