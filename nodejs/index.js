const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'desafiofull'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values ('Luiza')`
connection.query(sql)

app.get('/', (req, res) => {
    //const name = faker.name.findName()
    //connection.query(`INSERT INTO people (nome) VALUES ('${name}')`)

    // Realiza o SELECT no banco de dados
    connection.query('SELECT * FROM people', (error, results) => {
      if (error) {
        return res.status(500).send('Erro ao realizar a consulta no banco de dados.');
      }
  
      // Cria uma string HTML para mostrar os resultados
      let htmlResponse = '<h1>Full Cycle Rocks!</h1><br><ul>';
      results.forEach(row => {
        htmlResponse += `<li>${JSON.stringify(row)}</li>`;
      });
      htmlResponse += '</ul>';
  
      // Envia a resposta
      res.send(htmlResponse);  
    });
  });

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
