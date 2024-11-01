import Processo from "../abstracoes/processo";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";
import Armazem from "../dominio/armazem";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class RegistrarHospedagem extends Processo {
    private cliente!: Cliente;
    private acomodacao: Acomodacao;

    constructor(acomodacao: Acomodacao) {
        super();
        this.acomodacao = acomodacao;
    }

    processar(): void {
        console.clear();
        console.log("Iniciando o processo de registro de hospedagem...");

        // Solicitar o número do documento do cliente
        const numeroDocumento = this.entrada.receberTexto("Digite o número do documento do cliente: ");
        const cliente = Armazem.InstanciaUnica.Clientes.find(cliente =>
            cliente.Documentos.some(doc => doc.Numero === numeroDocumento && doc.Tipo === TipoDocumento.CPF)
        );

        if (!cliente) {
            console.log("Cliente não encontrado. Certifique-se de que o cliente esteja cadastrado.");
            return;
        }

        this.cliente = cliente;

        // Criar e registrar a hospedagem
        const checkIn = new Date();
        const novaHospedagem = new Hospedagem(this.cliente.Nome, this.cliente.Documentos[0], this.acomodacao, checkIn);

        // Adiciona a hospedagem diretamente ao array de hospedagens ativas
        Armazem.InstanciaUnica.HospedagensAtivas.push(novaHospedagem);

        console.log(`Hospedagem registrada para ${this.cliente.Nome} na acomodação ${this.acomodacao.NomeAcomodacao}.`);
    }
}
