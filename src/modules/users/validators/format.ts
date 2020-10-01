class FormatValidators {
    public formatcpf(cpf: string) {
        cpf = cpf.toString().replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cpf;
    }

    public mBirthDay(dateValue: any) {
        dateValue = dateValue.toString();
        return `${dateValue.substr(0, 2)}/${dateValue.substr(
            2,
            2,
        )}/${dateValue.substr(4, 7)}`;
    }

    public mTel(dateValue: string) {
        dateValue = dateValue.toString();
        const format = `${dateValue.substr(0, 0)}(${dateValue.substr(
            0,
            2,
        )}) ${dateValue.substr(2, 5)}-${dateValue.substr(7, 9)}`;

        console.warn(format);
        return format;
    }

    public convertToCent(amount: number) {
        return amount * 100;
    }

    public async firstName(nome: string): Promise<any> {
        const arr = nome.split(' ');
        if (arr[1][0].toUpperCase() !== arr[1][0]) arr.splice(1, 0);
        return arr.slice(0, 1).join(' ');
    }

    public async lastName(nome: string): Promise<any> {
        const arr = nome.split(' ');
        if (arr[1][0].toUpperCase() !== arr[1][0]) arr.splice(0, 3);
        return arr.slice(0, 1).join(' ');
    }

    public validatorCpf(inputCPF: string) {
        let soma = 0;
        let resto;

        if (inputCPF === '00000000000') return false;
        for (let i = 1; i <= 9; i++)
            soma += Number(inputCPF.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== Number(inputCPF.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++)
            soma += Number(inputCPF.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== Number(inputCPF.substring(10, 11))) return false;
        return true;
    }
}

const validators = new FormatValidators();

export default validators;
