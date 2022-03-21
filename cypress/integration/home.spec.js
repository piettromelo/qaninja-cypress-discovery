//Exemplo da estrutura básica para abrir um navegador e validar que está na tela correta
//aqui vai a definição dos casos de teste
describe('home page', ()=>{
    it('app deve estar online', ()=>{ //caso de teste
        //cy.viewport(1440, 900)  //função define resolução da tela
        cy.visit('/')  //função para acessar o site
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats') //usou o inspecionador do cypress e pegou o H1 - passou o texto exato que aparece na tela para validar

    })

})