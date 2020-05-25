const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');
const path = require('path')

module.exports = () => {
    const app = express();

    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || config.get('server.port'));
    app.use(express.static(path.join(__dirname, '../public')))
        .set('views', path.join(__dirname, '../views'))
        .set('view engine', 'ejs')
        .get('/', (req, res) => res.render('pages/index'));

    // MIDDLEWARES
    app.use(bodyParser.json());

    // ENDPOINTS
    consign({
            cwd: 'src/api'
        })
        .then('data')
        .then('controllers')
        .then('routes')
        .then('services')
        .into(app);

    return app;
};