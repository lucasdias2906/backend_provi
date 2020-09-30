import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controller/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
    '/address',
    ensureAuthenticated,
    usersController.createAddress,
);
usersRouter.post('/cpf', ensureAuthenticated, usersController.createCPF);
usersRouter.post(
    '/full-name',
    ensureAuthenticated,
    usersController.createFullName,
);

usersRouter.post(
    '/birth-date',
    ensureAuthenticated,
    usersController.createBirthday,
);

usersRouter.post(
    '/phone-number',
    ensureAuthenticated,
    usersController.createPhone,
);

usersRouter.post(
    '/amount-requested',
    ensureAuthenticated,
    usersController.createAmount_requested,
);

usersRouter.post('/register', usersController.createUser);

export default usersRouter;

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDEzMTczMDAsImV4cCI6MTY4NzcxNzMwMCwic3ViIjoiMSJ9.00-cmJO9FiKpKp3djk71M7I0I0CcfNETzLIhDPZaJRs"
