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

    public validatorCpf(cpf: string) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf === '') return false;
        if (
            cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999'
        )
            return false;

        let add = 0;
        for (let i = 0; i < 9; i++) add += Number(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== Number(cpf.charAt(9))) return false;

        add = 0;
        for (let i = 0; i < 10; i++) add += Number(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== Number(cpf.charAt(10))) return false;
        return true;
    }
}

const validators = new FormatValidators();

export default validators;
