import { Router } from 'express';

import RegistersController from '../controller/RegisterController';

const registerRouter = Router();

registerRouter.post('/', RegistersController.create);

export default registerRouter;
