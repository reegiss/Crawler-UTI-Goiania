const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'Hello World', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'A sample API', // Description (optional)
    },

    basePath: '/', // Base path (optional)
};

const options = {
    // Import swaggerDefinitions
    swaggerDefinition,
    // Path to the API docs
    // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
    apis: ['./api-docs.json'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;