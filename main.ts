import Cliente from './modelos/cliente';
import Endereco from './modelos/endereco';
import Telefone from './modelos/telefone';
import Documento from './modelos/documento';
import Entrada from './teste/entrada';
import { TipoDocumento } from './enumeracoes/tipoDocumento';

class Main {
    static run(): void {
        const entrada = new Entrada();

        // Criação do protótipo de Endereço (pode ser uma instância padrão)
        let prototipoEndereco = new Endereco();
        prototipoEndereco.rua = "Rua Padrão";
        prototipoEndereco.bairro = "Bairro Padrão";
        prototipoEndereco.cidade = "Cidade Padrão";
        prototipoEndereco.estado = "Estado Padrão";
        prototipoEndereco.pais = "País Padrão";
        prototipoEndereco.codigoPostal = "00000-000";

        // Clonando o protótipo para criar um novo Endereço
        let endereco = prototipoEndereco.clonar() as Endereco;
        endereco.rua = entrada.receberTexto("Digite a rua do endereço");
        endereco.bairro = entrada.receberTexto("Digite o bairro do endereço");
        endereco.cidade = entrada.receberTexto("Digite a cidade do endereço");
        endereco.estado = entrada.receberTexto("Digite o estado do endereço");
        endereco.pais = entrada.receberTexto("Digite o país do endereço");
        endereco.codigoPostal = entrada.receberTexto("Digite o código postal do endereço");

        // Criação do protótipo de Telefone (pode ser uma instância padrão)
        let prototipoTelefone = new Telefone();
        prototipoTelefone.ddd = "00";
        prototipoTelefone.numero = "00000-0000";

        // Clonando o protótipo para criar um novo Telefone
        let telefone = prototipoTelefone.clonar() as Telefone;
        telefone.ddd = entrada.receberTexto("Digite o DDD");
        telefone.numero = entrada.receberTexto("Digite o número");

        // Criação do protótipo de Documento (pode ser uma instância padrão)
        let prototipoDocumento = new Documento();
        prototipoDocumento.numero = "00000000000";
        prototipoDocumento.tipo = TipoDocumento.CPF;
        prototipoDocumento.dataExpedicao = new Date("2000-01-01");

        // Clonando o protótipo para criar um novo Documento
        let documento = prototipoDocumento.clonar() as Documento;
        documento.numero = entrada.receberTexto("Digite o número do documento");
        documento.tipo = TipoDocumento[entrada.receberTexto("Digite o tipo de documento (CPF, RG, Passaporte)")] as TipoDocumento;
        documento.dataExpedicao = entrada.receberData("Digite a data de expedição do documento");

        // Criação do protótipo de Cliente (pode ser uma instância padrão)
        let prototipoCliente = new Cliente();
        prototipoCliente.nome = "Nome Padrão";
        prototipoCliente.nomeSocial = "Nome Social Padrão";
        prototipoCliente.endereco = prototipoEndereco.clonar() as Endereco; // Clonar o endereço padrão

        // Clonando o protótipo para criar um novo Cliente
        let cliente = prototipoCliente.clonar() as Cliente;
        cliente.nome = entrada.receberTexto("Digite o nome do cliente");
        cliente.nomeSocial = entrada.receberTexto("Digite o nome social do cliente");
        cliente.dataNascimento = entrada.receberData("Digite a data de nascimento do cliente");
        cliente.endereco = endereco; // Atribuindo o endereço clonado ao cliente
        cliente.telefones.push(telefone); // Adicionando o telefone clonado ao cliente
        cliente.documentos.push(documento); // Adicionando o documento clonado ao cliente

        // Adicionando dependentes ao cliente
        let adicionarDependente = entrada.receberTexto("Deseja adicionar um dependente? (sim/não)").toLowerCase();
        while (adicionarDependente === "sim") {
            let dependente = cliente.clonar() as Cliente;
            dependente.nome = entrada.receberTexto("Digite o nome do dependente");
            dependente.nomeSocial = entrada.receberTexto("Digite o nome social do dependente");
            dependente.dataNascimento = entrada.receberData("Digite a data de nascimento do dependente");
            dependente.documentos = []; // Limpar documentos herdados e adicionar novos
            let documentoDependente = prototipoDocumento.clonar() as Documento;
            documentoDependente.numero = entrada.receberTexto("Digite o número do documento do dependente");
            documentoDependente.tipo = TipoDocumento[entrada.receberTexto("Digite o tipo de documento do dependente (CPF, RG, Passaporte)")] as TipoDocumento;
            documentoDependente.dataExpedicao = entrada.receberData("Digite a data de expedição do documento do dependente");
            dependente.documentos.push(documentoDependente);

            cliente.dependentes.push(dependente);

            adicionarDependente = entrada.receberTexto("Deseja adicionar outro dependente? (sim/não)").toLowerCase();
        }

        // Exibindo as informações do cliente
        console.log('Nome:', cliente.nome);
        console.log('Nome Social:', cliente.nomeSocial);
        console.log('Data de Nascimento:', cliente.dataNascimento.toLocaleDateString());
        console.log('Endereço:', `${cliente.endereco.rua}, ${cliente.endereco.bairro}, ${cliente.endereco.cidade}`);
        console.log('Telefone:', `(${telefone.ddd}) ${telefone.numero}`);
        console.log('Documento:', `${documento.tipo}: ${documento.numero}, Expedido em: ${documento.dataExpedicao.toLocaleDateString()}`);

        // Exibindo as informações dos dependentes
        cliente.dependentes.forEach((dependente, index) => {
            console.log(`\nDependente ${index + 1}:`);
            console.log('Nome:', dependente.nome);
            console.log('Nome Social:', dependente.nomeSocial);
            console.log('Data de Nascimento:', dependente.dataNascimento.toLocaleDateString());
            console.log('Endereço:', `${dependente.endereco.rua}, ${dependente.endereco.bairro}, ${dependente.endereco.cidade}`);
            console.log('Telefone:', `(${dependente.telefones[0].ddd}) ${dependente.telefones[0].numero}`);
            console.log('Documento:', `${dependente.documentos[0].tipo}: ${dependente.documentos[0].numero}, Expedido em: ${dependente.documentos[0].dataExpedicao.toLocaleDateString()}`);
        });
    }
}

Main.run();
