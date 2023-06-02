const express = require('express');
const app = express();
const port = 3030;
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

app.get("/apiTest", async (req,res)=>{
    console.log("AQUI")
    let object = await readFile('./dbTest.json')
    object = JSON.parse(object)
    console.log(object)
    res.status(200).send({status: 'success', data: object})
})

app.listen(port,()=>{
    console.log('Servidor a correr na porta ' + port)
})