require('dotenv').config()
const mysql = require('mysql')

const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

const conecta = async (req, res) => {

  await conn.connect(function (err) {
    if (err) {
      console.log(err)
      res.json({ messge: err })
      return
    }

    console.log('Conectou ao MYSQL!')
    res.json({ messge: 'Helo World' })
  })
}

const insert = async (req, res) => {
  const nome = req.body.nome
  const cpf = req.body.cpf
  const dataNasc = req.body.dataNasc
  const dataCons = req.body.dataCons
  const ano = req.body.ano
  const mes = req.body.mes
  const colaborador = req.body.colaborador
  const query = `INSERT INTO consultas (nome, cpf, dataNasc, dataCons, ano, mes, colaborador) VALUES ('${nome}', '${cpf}', '${dataNasc}', '${dataCons}', '${ano}', '${mes}', '${colaborador}')`

  await conn.query(query, function (err) {
    if (err) {
      console.log(err)
      res.json({ messge: err })
      return
    }
    res.json({ messge: 'Inserido com sucesso!'})
  })
}

module.exports = {
  conecta,
  insert
}