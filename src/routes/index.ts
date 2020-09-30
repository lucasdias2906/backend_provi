import { Router } from 'express';

import usersRoutes from '../modules/users/routes/users.routes';
import sessionsRoutes from '../modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/session', sessionsRoutes);

export default routes;
