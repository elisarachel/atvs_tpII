import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import ImpressorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class ListagemDependentes {
    private clientes: Cliente[];
    private impressor!: Impressor;

    constructor() {
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    listarDependentesDeTitular(cpfTitular: string): void {
        const titular = this.clientes.find(cliente =>
            cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === cpfTitular)
        );

        if (titular) {
            console.log(`Dependentes do titular ${titular.Nome}:`);
            titular.Dependentes.forEach(dependente => {
                this.impressor = new ImpressorCliente(dependente);
                console.log(this.impressor.imprimir());
            });
        } else {
            console.log('Titular não encontrado.');
        }
    }

    listarTitularDeDependente(cpfDependente: string): void {
        const dependente = this.clientes.find(cliente =>
            cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === cpfDependente)
        );

        if (dependente && dependente.Titular) {
            console.log(`Titular do dependente ${dependente.Nome}:`);
            this.impressor = new ImpressorCliente(dependente.Titular);
            console.log(this.impressor.imprimir());
        } else if (dependente) {
            console.log('Este cliente não possui um titular associado.');
        } else {
            console.log('Dependente não encontrado.');
        }
    }
}
