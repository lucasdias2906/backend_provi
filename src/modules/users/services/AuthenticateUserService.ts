import { sign } from 'jsonwebtoken';

import { compare } from 'bcryptjs';
import User from '../entities/User';
import authConfig from '../../../config/auth';
import UsersRepository from '../repositories/UserRepository';

// import AppError from '../../../errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User | undefined;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await Promise.resolve(UsersRepository.findByEmail(email));

        if (!user) {
            throw new Error('Incorrect email/password combination');
        }

        const passwordMatched = await compare(password, user.password);

        // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEE');
        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination');
        }

        const { expiresIn, secret } = authConfig.jwt;

        console.log(user);
        const token = sign({}, secret, {
            subject: user?.id.toString(),
            expiresIn,
        });

        return { token, user };
    }
}

const authenticateUserService = new AuthenticateUserService();
export default authenticateUserService;
