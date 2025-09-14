const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const options = {
    definition: {
        openapi : '3.0.0',
        info : {
            title : 'Task Manager API',
            version : '1.0.0',
            description: 'API documentation for Task Manager project',
        },
        servers : [
            {
                url: 'https://personal-task-manager-api-6.onrender.com', // Render base URL
            }
        ],
        components : {
            securitySchemes : {
                ApiKeyAuth : {
                    type : 'apiKey',
                    in : 'query',  // secrete passed in query params
                    name : 'secret_token', // Param name where your token will be passed
                    description : 'Enter your secret token to access this API'
                }
            }
        },
        security : [
            { 
                ApiKeyAuth : [] // apply globally to all endpoints
            }
        ]
    },
    apis : [__dirname + './routes/*.js'] // where routes are defined
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };