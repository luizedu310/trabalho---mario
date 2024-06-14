const express = require('express');
const path = require('path');
const pool = require('./database'); // Importando a conexão do banco de dados

const app = express();

// Middleware para verificar se há eleições no banco de dados
app.use(async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM eleicao');
        const count = rows[0].count;
        if (count > 0) {
            next(); // Continua para a próxima middleware ou rota
        } else {
            res.redirect('/sem-eleicoes'); // Redireciona para outra página se não houver eleições
        }
    } catch (err) {
        console.error('Erro ao acessar o banco de dados', err);
        res.status(500).send('Erro no servidor');
    }
});

app.get('/welcome', (req, res) => {
    res.render('welcome');
});

// Configuração da engine de visualização, por exemplo, EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
