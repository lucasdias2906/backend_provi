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

export default usersRouter;
