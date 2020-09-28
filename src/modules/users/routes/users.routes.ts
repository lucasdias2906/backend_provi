import { Router } from 'express';

import UsersController from '../controller/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/address', usersController.createAddress);
usersRouter.post('/cpf', usersController.createCPF);
usersRouter.post('/full-name', usersController.createFullName);

usersRouter.post('/register', usersController.createUser);

export default usersRouter;
