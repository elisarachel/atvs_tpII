import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroPassaporte extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        const numero = this.entrada.receberTexto('Qual o número do Passaporte?');
        const dataExpedicao = this.entrada.receberData('Qual a data de expedição do Passaporte?');
        const passaporte = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao);
        this.cliente.Documentos.push(passaporte);
    }
}
