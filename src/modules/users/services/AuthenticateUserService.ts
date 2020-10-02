import { sign } from 'jsonwebtoken';

import User from '../entities/User';
import authConfig from '../../../config/auth';
import UsersRepository from '../repositories/UserRepository';


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User | undefined;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email }: IRequest): Promise<IResponse> {
        const user = await Promise.resolve(UsersRepository.findByEmail(email));

        const { expiresIn, secret } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user?.id.toString(),
            expiresIn,
        });

        return { token, user };
    }
}

const authenticateUserService = new AuthenticateUserService();
export default authenticateUserService;
