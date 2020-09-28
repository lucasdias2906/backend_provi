// uma biblioteca ou uma forma da gente implementar a questao de hash
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';

class BCryptHashProvider {
    private PASSWORD_SIZE = 128;

    private SALT_SIZE: string = genSaltSync(this.PASSWORD_SIZE);

    // Criptografando a senha

    public generateHash = (password: string): string => {
        return hashSync(password, this.SALT_SIZE);
    };

    public compareHash = (password: string, hashed: string): boolean => {
        return compareSync(password, hashed);
    };
}

const Encrypted = new BCryptHashProvider();
export default Encrypted;
