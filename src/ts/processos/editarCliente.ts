import Processo from '../abstracoes/processo';
import Armazem from '../dominio/armazem';
import { TipoDocumento } from '../enumeracoes/TipoDocumento';

export default class EditarCliente extends Processo {
    processar(): void {
        console.log('Iniciando a edição de um cliente...');
        const cpf = this.entrada.receberTexto('Digite o CPF do cliente a ser editado: ');
        const cliente = Armazem.InstanciaUnica.Clientes.find(cli =>
            cli.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === cpf)
        );

        if (cliente) {
            cliente.Nome = this.entrada.receberTexto('Digite o novo nome do cliente: ');
            cliente.NomeSocial = this.entrada.receberTexto('Digite o novo nome social do cliente: ');
            cliente.DataNascimento = this.entrada.receberData('Digite a nova data de nascimento: ');
            console.log('Dados do cliente atualizados com sucesso.');
        } else {
            console.log('Cliente não encontrado.');
        }
    }
}
