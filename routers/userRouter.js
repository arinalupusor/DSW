const Router = require('../utils/router.js');
const {userRoutes} = require("../settings/_serverSettings");
const userController = require("../controllers/userController");

const userRouter = new Router();
userRouter.get(userRoutes.get.route, userController.get);
userRouter.post(userRoutes.create.route, userController.create);
userRouter.delete(userRoutes.delete.route, userController.delete);
userRouter.put(userRoutes.put.route, userController.put)


module.exports = userRouter