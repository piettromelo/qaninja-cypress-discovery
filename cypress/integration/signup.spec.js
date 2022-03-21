//importa ja instanciado
import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup', () => { //function substituido pelo '=>'

    /*     // EXEMPLO 4 TIPOS DE GANHOS
        before(function() {
            cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de teste')
        })
        beforeEach(function() {
            cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
        })
        after(function() {
            cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de teste')
        })
        afterEach(function() {
            cy.log('Tudo aqui é executado sempre DEPPOIS de CADA caso de teste')
        }) */

        //*** aula 19 - não vai usar fixture nessa suite de teste
/*     beforeEach(function () {
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    }) */

    it('User should be deliver', function () {

        //aula 19 - importa a massa da pasta factories arq SignupFactory.js
        var deliver = signupFactory.deliver()

        SignupPage.go()
        SignupPage.fillForm(deliver) //usa aqui a massa do deliver
        SignupPage.submit()
        //Precisa definir a massa antes. Pega a const e adc
        //constante é um objeto imutável (valor constante que não vai mudar a nível de código)
        //o que pode mudar é o texto da mensagem
        //criado a constante para poder armazenar o texto da mensagem (boa prática)
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        SignupPage.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function () {
        
        //aula 19 - importa a massa da pasta factories arq SignupFactory.js
        var deliver = signupFactory.deliver()

        //aula 19 - força o script utilizar o CPF informado aqui dentro do cenário
        deliver.cpf = '066419591aa'

        SignupPage.go()
        SignupPage.fillForm(deliver) //usa aqui a massa do deliver
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function () {

        //aula 19 - importa a massa da pasta factories arq SignupFactory.js
        var deliver = signupFactory.deliver()

        //aula 19 - força o script utilizar o email informado aqui dentro do cenário
        deliver.email = 'piettro.com.br'

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        //criando uma função de gancho. Serve para o script rodar esse passo 1 única vez e testar o contexto do cenário, que é submeter o formulário sem preencher os campos obrigatório
        before(function () { //before simples para ser executado uma unica vez
            SignupPage.go()
            SignupPage.submit()
        })

        //faz a validação campo por campo ao invés de usa
        //chamando a constante messages e a função forEach, pq messages é um array usado para percorrer a lista de msg através de um loop
        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () { //it = caso de teste, apostrofo para poder concatenar valores
                SignupPage.alertMessageShouldBe(msg.output) //implementação da msg esperada
            })
        })

    })

    /* it('Required fields', function () {  //=>>>>>>>>>>> DE NOOB, SUBSTITUIDO PELO DE CIMA
        SignupPage.go()
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('É necessário informar o nome')
        SignupPage.alertMessageShouldBe('É necessário informar o CPF')
        SignupPage.alertMessageShouldBe('É necessário informar o email')
        SignupPage.alertMessageShouldBe('É necessário informar o CEP')
        SignupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        SignupPage.alertMessageShouldBe('Selecione o método de entrega')
        SignupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    }) */
})