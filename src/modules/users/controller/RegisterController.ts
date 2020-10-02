import { Request, Response } from 'express';

import { hashSync } from 'bcryptjs';
import AuthenticateUserService from '../services/AuthenticateUserService';
import userService from '../services/CreateUserServices';

class RegisterController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('check information');
        }

        const salt = 10;
        const hashProvider = hashSync(password, salt);

        try {
            await userService.create({
                email,
                password: hashProvider,
            });

            const { user, token } = await AuthenticateUserService.execute({
                email,
                password,
            });

            delete user?.password;

            return res.status(200).json({
                user,
                token,
            });
        } catch (error) {
            return res.status(404).send({
                success: false,
                message: error
            });

        }

    }
}

const registerController = new RegisterController();

export default registerController;
