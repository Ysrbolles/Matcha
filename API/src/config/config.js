const dotenv = require('dotenv')

dotenv.config()

const environment = process.env.NODE_ENV || 'production'

console.log(`Server envirenment is ${environment}`)

const config = {
    production: {
        SERVER: {
            HOST: 'localhost',
            PORT: '4242'
        },
        DATABASE: {
            HOST: process.env.DB_HOST || 'localhost',
            NAME: process.env.DB_NAME || 'Matcha',
            USER: process.env.DB_USER || 'root',
            PASS: process.env.DB_PASSWORD || 'tiger'
        },
        MAIL: {
            USER: process.env.MAIL_USER || 'ysrbolles@gmail.com',
            PASS: process.env.MAIL_PASSWORD || 'vhcretlphmeqgjkf',
            ADMIN: process.env.MAIL_ADMIN || 'ysrbolles@gmail.com'
        },
        JWT: {
            DURATION: 60 * 15,
            SECRET: process.env.SECRET_KEY || 'ABFA422265CE21265CDECF71CD8DF',
        }
    },
    development: {
        SERVER: {
          HOST: 'localhost',
          PORT: '8081',
        },
        DATABASE: {
          HOST: process.env.DB_HOST || 'localhost',
          NAME: process.env.DB_NAME || 'Matcha',
          USER: process.env.DB_USER || 'root',
          PASS: process.env.DB_PASSWORD || 'tiger'
        },
        MAIL: {
          USER: process.env.MAIL_USER,
          PASS: process.env.MAIL_PASS,
          ADMIN: process.env.MAIL_ADMIN || 'ysrbolles@gmail.com',
        },
        JWT: {
          DURATION: 86400,
          SECRET: process.env.SECRET_KEY,
        },
      },
      test: {
        SERVER: {
          HOST: 'localhost',
          PORT: '4242',
        },
        DATABASE: {
          HOST: process.env.DB_HOST || 'localhost',
          NAME: process.env.DB_NAME || 'Matcha_test',
          USER: process.env.DB_USER || 'root',
          PASS: process.env.DB_PASSWORD || 'tiger'
        },
        MAIL: {
          USER: process.env.MAIL_USER,
          PASS: process.env.MAIL_PASS,
          ADMIN: process.env.MAIL_ADMIN || 'ysrbolles@gmail.com',
        },
        JWT: {
          DURATION: 84600,
          SECRET: process.env.SECRET_KEY,
        },
      }
}
module.exports = config[environment]
