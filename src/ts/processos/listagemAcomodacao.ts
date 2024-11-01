import Processo from "../abstracoes/processo";

export default class ListagemAcomodacao extends Processo {
    constructor() {
        super();
    }

    processar(): void {
        console.clear();
        console.log("Tipos de acomodações disponíveis:");

        console.log(`\n1. Casal Simples`);
        console.log(`   - 1 Cama de Casal`);
        console.log(`   - Climatização: Sim`);
        console.log(`   - Garagem: 1 vaga`);
        console.log(`   - Suíte: Sim`);
        
        console.log(`\n2. Família Simples`);
        console.log(`   - 1 Cama de Casal, 2 Camas de Solteiro`);
        console.log(`   - Climatização: Sim`);
        console.log(`   - Garagem: 1 vaga`);
        console.log(`   - Suíte: Sim`);
        
        console.log(`\n3. Família Mais`);
        console.log(`   - 1 Cama de Casal, 5 Camas de Solteiro`);
        console.log(`   - Climatização: Sim`);
        console.log(`   - Garagem: 2 vagas`);
        console.log(`   - Suíte: 2 Suítes`);

        console.log(`\n4. Família Super`);
        console.log(`   - 2 Camas de Casal, 6 Camas de Solteiro`);
        console.log(`   - Climatização: Sim`);
        console.log(`   - Garagem: 2 vagas`);
        console.log(`   - Suíte: 3 Suítes`);

        console.log(`\n5. Solteiro Simples`);
        console.log(`   - 1 Cama de Solteiro`);
        console.log(`   - Climatização: Sim`);
        console.log(`   - Garagem: 0 vagas`);
        console.log(`   - Suíte: Sim`);

        console.log(`\n6. Solteiro Mais`);
        console.log(`   - 1 Cama de Casal`);
        console.log(`   - Climatização: Sim`);
        console.log(`   - Garagem: 1 vaga`);
        console.log(`   - Suíte: Sim`);
        
        console.log("\n----------------------");
    }
}
