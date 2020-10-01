import { verify } from 'jsonwebtoken';
// import CreateUserServices from './CreateUserServices';
import validators from '../validators/format';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import authConfig from '../../../config/auth';

// import RegisterUser from '../controller/RegisterController';

describe('Criando o CPF', () => {
    it('Fazendo o primeiro registro do usuario', async () => {
        const tokenReq =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDE1MjIwNTksImV4cCI6MTY4NzkyMjA1OSwic3ViIjoiNjcifQ.bag9oiGA3oYJmF4pQe3ac0owV0i7tCzf65p6lpSSmdc';

        console.log(tokenReq);
        const { sub }: any = verify(tokenReq, authConfig.jwt.secret);

        const user = await FakeUsersRepository.findById(sub);
        const cpfRequest = '25468621118';
        const cpfValidaate = validators.validatorCpf(cpfRequest);

        if (!cpfValidaate) {
            return new Error('ERROR');
        }

        await FakeUsersRepository.create({
            // token: tokenReq,
            cpf: cpfRequest,
        });

        console.log(user);
        expect(user).toHaveProperty('id');
        return user;
    });
});

// const tokenReq =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDE1MDcwNDAsImV4cCI6MTY4NzkwNzA0MCwic3ViIjoiNjUifQ.xeq_slM71EcczhPvqG2v46rknYAeyVpwT9hzwO_-G7E';
