//importando a biblioteca faker
var faker = require('faker')
//importa a biblioteca gerador cpf
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(), //gera o cpf dinamico
            email: faker.internet.email(firstName), //monta um email dinamico com o 1°nome
            whatsapp: '19996787756',
            address: {
                postalcode: '13175653',
                street: 'Alameda das Cássias',
                number: '100',
                details: 'apto 30',
                district: 'Parque Villa Flores',
                city_state: 'Sumaré/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data // metedo deliver vai devolver uma massa de teste completa
    }

}