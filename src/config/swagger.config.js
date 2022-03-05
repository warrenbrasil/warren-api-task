const swaggerJSDoc = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            version: '1.0.0',
            title: 'Documentação da API',
            description: 'Documentação dos endpoints',
            termsOfService: '',
            contact: {
                name: 'Eduardo Andrade',
                email: 'eduardo.andrade1111@gmail.com',
            },
            servers: [
                {
                    url: 'http://localhost:3000/v1/',
                    description: 'Local server'
                },
            ],
        }
    },
    apis: ['./src/doc/**/*.swagger.ts', './src/doc/*.component.yaml']
}

const swaggerConfig = swaggerJSDoc(options);

module.exports = {
    options,
    swaggerConfig
}

