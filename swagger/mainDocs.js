const userDocs = require('./userDocs');
const authDocs = require('./authDocs');
const customerDocs = require('./customerDocs');

module.exports = {
    "openapi": "3.0.0",
    "info": {
        "title": "Mind Well",
        "version": "2.0",
        "description": "API para mentes perdidas"
    },
    "servers": [
        {
            "url": "http://localhost:3000"
        }
    ],
    "components": {
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    },
    "paths": {
       ...userDocs,
       ...authDocs,
       ...customerDocs
    }
}
