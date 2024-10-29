import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroCpf extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        const numero = this.entrada.receberTexto('Qual o número do CPF?');
        const dataExpedicao = this.entrada.receberData('Qual a data de expedição do CPF?');
        const cpf = new Documento(numero, TipoDocumento.CPF, dataExpedicao);
        this.cliente.Documentos.push(cpf);
    }
}
