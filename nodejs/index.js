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

function executeQuery(sqlExpression, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(sqlExpression, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

async function insertNewRandonPerson() {
  const randomName = faker.name.findName();
  await executeQuery(`INSERT INTO people(name) values (?)`, [randomName]);
  return randomName
}

async function getAllNamesInHtmlFormat() {
  const rows = executeQuery('SELECT * FROM people')
  
  let htmlResponse = '<h1>Full Cycle Rocks!</h1><br><ul>';
  rows.forEach(row => {
    htmlResponse += `<li>${JSON.stringify(row)}</li>`;
  });
  htmlResponse += '</ul>';
  return htmlResponse
}

app.get('/', async (req, res) => {
  try {
    await insertNewRandonPerson()
    const htmlResponse = await getAllNamesInHtmlFormat();
 
    res.send(htmlResponse);  
  } catch (error) {
    console.error(`Erro ao conectar-se ao banco de dados: ${error}`);
    res.status(500).send('Erro de servidor');
  }
  });

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
