import { sign } from 'jsonwebtoken';

import User from '../entities/User';
import authConfig from '../../../config/auth';
import UsersRepository from '../repositories/UserRepository';
import encrypted from '../providers/Hash/implementations/BCryptHashProvider';

import AppError from '../../../errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await Promise.resolve(UsersRepository.findByEmail(email));

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await encrypted.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { expiresIn, secret } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { token, user };
    }
}

const authenticateUserService = new AuthenticateUserService();
export default authenticateUserService;
