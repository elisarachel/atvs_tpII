import Processo from '../abstracoes/processo';
import Armazem from '../dominio/armazem';
import { TipoDocumento } from '../enumeracoes/TipoDocumento';

export default class ExcluirCliente extends Processo {
    processar(): void {
        console.log('Iniciando a exclusão de um cliente...');
        const cpf = this.entrada.receberTexto('Digite o CPF do cliente a ser excluído: ');
        const index = Armazem.InstanciaUnica.Clientes.findIndex(cli =>
            cli.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === cpf)
        );

        if (index !== -1) {
            Armazem.InstanciaUnica.Clientes.splice(index, 1);
            console.log('Cliente excluído com sucesso.');
        } else {
            console.log('Cliente não encontrado.');
        }
    }
}
