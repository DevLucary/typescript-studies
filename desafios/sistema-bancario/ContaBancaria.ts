class Conta {
    readonly numeroConta: number
    titular: string
    private saldo: number

    constructor (numeroConta: number, titular: string, saldoInicial: number) {
        if(saldoInicial < 0) {
            throw new Error('Saldo inicial não pode ser negativo')
        }

        if(saldoInicial > 100000) {
            throw new Error('Limite máximo de saldo excedido')
        }

        this.numeroConta = numeroConta
        this.titular = titular
        this.saldo = saldoInicial
    }

    depositar(valor: number): object {
        if(valor <= 0) {
            throw new Error('O valor depositado não deve ser negativo ou 0')
        }

        if(this.saldo + valor > 100000) {
            throw new Error('Limite máximo de saldo excedido')
        }

        this.saldo += valor

        return {
            success: true,
            message: 'Valor depositado com sucesso: ' + valor
        }
    }

    sacar(valor: number): object {
        if(valor <= 0) {
            throw new Error('O valor do saque não deve ser negativo ou 0')
        }

        if(valor > this.saldo) {
            throw new Error('Saldo insuficiente')
        }

        this.saldo -= valor

        return {
            success: true,
            message: 'Valor sacado com sucesso: ' + valor
        }
    }

    consultarSaldo(): number {
        return this.saldo
    }
}

const user = new Conta(0, 'Lucary', 20000)
// const user2 = new Conta(1, 'Lucary', 200000)

console.log('Conta')
console.log('----------------------------------------------------------')
console.log(user.consultarSaldo())
console.log(user.depositar(10000))
// console.log(user.depositar(-100))
// console.log(user.depositar(0))
// console.log(user.depositar(200000))
// console.log(user.consultarSaldo())
console.log(user.sacar(20000))
// console.log(user.sacar(-200))
// console.log(user.sacar(0))
// console.log(user.sacar(40000))
console.log(user.consultarSaldo())


class Banco {
    private contas: Conta[]

    constructor() {
        this.contas = []
    }

    criarConta(titular: string, saldoInicial: number): object {
        const numeroConta: number = this.contas.length + 1

        const user: Conta = new Conta(numeroConta, titular, saldoInicial)

        this.contas.push(user)

        return user
    }

    buscarConta (numeroConta: number): Conta | undefined {
        return this.contas.find(conta => conta.numeroConta === numeroConta)
    }

    transferir(numeroConta: number, destino: number, valor: number): object {
        const origem: Conta | undefined = this.contas.find(conta => conta.numeroConta === numeroConta)

        if(origem === undefined) {
            throw new Error('Conta de origem não encontrada')
        }

        const contaDestino: Conta | undefined = this.contas.find(conta => conta.numeroConta === destino)

        if(contaDestino === undefined) {
            throw new Error('Conta de destino não encontrada')
        }

        if(valor > origem.consultarSaldo()) {
            throw new Error('Saldo insuficiente')
        }

        origem.sacar(valor)

        contaDestino.depositar(valor)

        return {
            success: true,
            message: 'Valor transferido com sucesso'
        }
    }
}

const banco = new Banco()
console.log('')
console.log('Banco')
console.log('----------------------------------------------------------')
console.log(banco.criarConta('Lucary', 5000))
console.log(banco.criarConta('Maria', 3000))
// console.log(banco.buscarConta(1))
// console.log(banco.buscarConta(2))
console.log('')
console.log('----------------------------------------------------------')
console.log('Deve transferir 2000 para a segunda conta')
console.log(banco.transferir(1, 2, 2000))
console.log(banco.buscarConta(1))
console.log(banco.buscarConta(2))
console.log('')
console.log('----------------------------------------------------------')
console.log('Deve transferir 4000 para a primeira conta')
console.log(banco.transferir(2, 1, 4000))
console.log(banco.buscarConta(1))
console.log(banco.buscarConta(2))
// console.log(banco.transferir(3, 2, 2000))
// console.log(banco.transferir(1, 3, 2000))
// console.log(banco.transferir(1, 2, 20000))