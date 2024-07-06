const userDocs = require('./userDocs');
const authDocs = require('./authDocs');
const forumDocs = require('./forumDocs');
const postDocs = require('./postDocs');
const profileDocs = require('./profileDocs');
const topicDocs = require('./topicDocs');

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
        },
        {
          "url": "https://mindwellapi.onrender.com"
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
       ...forumDocs,
       ...postDocs,
       ...profileDocs,
       ...topicDocs,
       // Agrega más paths aquí...
    }
}
