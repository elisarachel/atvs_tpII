import Menu from "../interfaces/menu";

export default class MenuTipoListagemDependentes implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual o tipo de listagem desejada? `)
        console.log(`----------------------`)
        console.log('1 - Listar dependentes de um titular específico');
        console.log('2 - Listar titular de um dependente específico');
        console.log(`----------------------`)
    }
}