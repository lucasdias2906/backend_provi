import { Router } from 'express';

import usersRoutes from '../modules/users/routes/users.routes';
import registerRoutes from '../modules/users/routes/register.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/register', registerRoutes);

export default routes;
