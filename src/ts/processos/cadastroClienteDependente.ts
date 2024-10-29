import Processo from '../abstracoes/processo';
import Cliente from '../modelos/cliente';
import Armazem from '../dominio/armazem';
import ImpressorCliente from '../impressores/impressorCliente';
import { TipoDocumento } from '../enumeracoes/TipoDocumento';

export default class CadastroClienteDependente extends Processo {
    private clientes: Cliente[];
    private titular: Cliente | undefined;
    private dependente: Cliente;

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
        this.dependente = new Cliente('', '', new Date()); // Inicialização temporária, dados são capturados posteriormente
    }

    processar(): void {
        console.clear();
        console.log('Iniciando o cadastro de um novo cliente dependente...');

        this.capturarDadosTitular();
        
        if (this.titular) {
            this.inicializarDependente();
            this.capturarDadosDependente();

            // Adiciona dependente ao titular e ao Armazem
            this.titular.adicionarDependente(this.dependente);
            Armazem.InstanciaUnica.Clientes.push(this.dependente);

            console.log('Dependente cadastrado com sucesso!');
            const impressor = new ImpressorCliente(this.dependente);
            console.log(impressor.imprimir());
        } else {
            console.log('Titular não encontrado. Cadastro de dependente cancelado.');
        }
    }

    private capturarDadosTitular(): void {
        const cpfTitular = this.entrada.receberTexto('Digite o CPF do titular: ');
        this.titular = this.clientes.find(cliente => 
            cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === cpfTitular)
        );
    }

    private inicializarDependente(): void {
        // Copiar dados de endereço e telefones do titular para o dependente
        if (this.titular) {
            this.dependente.Endereco = this.titular.Endereco;
            this.dependente.Telefones = [...this.titular.Telefones];
            this.dependente.Titular = this.titular;
        }
    }

    private capturarDadosDependente(): void {
        this.dependente.Nome = this.entrada.receberTexto('Digite o nome do dependente: ');
        this.dependente.NomeSocial = this.entrada.receberTexto('Digite o nome social do dependente: ');
        this.dependente.DataNascimento = this.entrada.receberData('Digite a data de nascimento do dependente (dd/mm/yyyy): ');
    }
}
