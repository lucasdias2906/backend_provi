class FormatValidators {
    public async formatcpf(cpf: string): Promise<string> {
        cpf = cpf.toString().replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cpf;
    }

    public async mBirthDay(date: any): Promise<any> {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        date = new Date(2020, 11, 31);

        const format = date.toLocaleDateString('pt-br', {
            ...options,
            month: 'numeric',
        });

        return format;
    }

    public async mTel(tel: string): Promise<number> {
        tel = tel.replace(/\D/g, '');
        tel = tel.replace(/^(\d)/, '+$1');
        tel = tel.replace(/(.{3})(\d)/, '$1($2');
        tel = tel.replace(/(.{6})(\d)/, '$1)$2');
        if (tel.length === 12) {
            tel = tel.replace(/(.{1})$/, '-$1');
        } else if (tel.length === 13) {
            tel = tel.replace(/(.{2})$/, '-$1');
        } else if (tel.length === 14) {
            tel = tel.replace(/(.{3})$/, '-$1');
        } else if (tel.length === 15) {
            tel = tel.replace(/(.{4})$/, '-$1');
        } else if (tel.length > 15) {
            tel = tel.replace(/(.{4})$/, '-$1');
        }

        const format = parseInt(tel);
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
        cpf = cpf.replace(/\D/g, '');
        if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf))
            return false;
        let result = true;
        [9, 10].forEach(function (j) {
            let soma = 0;
            let r;
            cpf.split(/(?=)/)
                .splice(0, j)
                .forEach(function (e, i) {
                    soma += parseInt(e) * (j + 2 - (i + 1));
                });
            r = soma % 11;
            r = r < 2 ? 0 : 11 - r;
            if (r != cpf.substring(j, j + 1)) result = false;
        });
        return result;
    }
}

const validators = new FormatValidators();

export default validators;
