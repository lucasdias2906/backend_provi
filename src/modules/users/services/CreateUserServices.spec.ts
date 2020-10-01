import { verify } from 'jsonwebtoken';
// import AppError from '../../../errors/AppError';
import validators from '../validators/format';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import authConfig from '../../../config/auth';

// import RegisterUser from '../controller/RegisterController';

describe('Criando o CPF', () => {
    it('Fazendo a criação do cpf', async () => {
        const tokenReq =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDE1MjIwNTksImV4cCI6MTY4NzkyMjA1OSwic3ViIjoiNjcifQ.bag9oiGA3oYJmF4pQe3ac0owV0i7tCzf65p6lpSSmdc';

        const cpfRequest = '66837734750';

        console.log(tokenReq);
        const { sub }: any = verify(tokenReq, authConfig.jwt.secret);

        const user = await FakeUsersRepository.findById(sub);

        expect(validators.validatorCpf(cpfRequest)).toBe(true);

        if (cpfRequest === user?.cpf?.replace(/./g, '').trim() || !user.cpf) {
            FakeUsersRepository.update({
                ...user,
                cpf: cpfRequest,
                updated_at: Date(),
            });
        }

        FakeUsersRepository.create({
            ...user,
            cpf: validators.formatcpf(cpfRequest),
        });

        console.log('USER CPF', user.cpf);

        console.log('ooooooooooooo', user);
        expect(FakeUsersRepository.users.length).toBe(2);
        console.log(FakeUsersRepository.users);
        expect(FakeUsersRepository.users[1].cpf.replace(/[^\d]/g, '')).toBe(
            cpfRequest,
        );

        return user;
    });
});

// const cpfRequest = '66291783606';
// const cpfValidaate = validators.validatorCpf(cpfRequest);

// if (!cpfValidaate) {
//     return new Error('ERROR');
// }
