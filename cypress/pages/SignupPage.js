// *** PADRÃO PAGE OBJECTS ***

class SignupPage{ //classe usa pascalcase

    go() { //função que vai acessar a pagina que tem o formulário de cadastro
        //cy.viewport(1440, 900)//função define resolução da tela/transf p/arq 'cypress.json'
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) { //função camelCase que irá receber uma massa de teste e preenche todos os campos
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)
        
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        //localiza a lista de opções e o click é feito no nome passado na massa (metodo_entrega)
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        //pega a imagem dentro da pasta fixtures subpasta "images" e faz o upload 
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    submit() {
        //clica no botão cadastrar
        cy.get('button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        //validar mensagem de cadastro com sucesso
        cy.get('.swal2-container .swal2-html-container')
        .should('have.text', expectedMessage)
    }
    //método alerta de msg
    alertMessageShouldBe(expectedMessage) {
        // *** a forma abaixo faz um get em todos os elementos de uma unica vez, dessa forma o script se perdeu devido a ambiguidade dos elementos
        //cy.get('.alert-error').should('have.text', expectedMessage)
        //compara a msg alerta de campo obrigatório com o elemento visivel naquele campo
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

//Fica aqui pq é genérico p/todos os casos de testes
//para usar as funções encapsuladas na "SignupPage", é preciso instanciar
//Instanciando para 'signup' ter todas as funções de 'SignupPage
//exporta o Page Objects poder importar na camada de testes
// o 'new' é para os casos de teste entender que precisa criar uma nova instancia
export default new SignupPage; //exporta instanciado