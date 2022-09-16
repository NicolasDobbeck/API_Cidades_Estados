/*
    --Bibliotecas necessarias para criar uma API--
        * É uma bilioteca para criar aplicacoes em node no formato 
            de API
            express - (npm install express --save)
        * É uma biblioteca para manipular as permissoes 
            do protocolo https 
            cors - (npm install cors --save)
        * É uma biblioteca que permite manipular o corpo do protocolo https
            body-parser - (npm install body-parser --save)
*/

//import da biblioteca do express para criar a API
const express = require('express');

//import da biblioteca do cors para manipular as permissões protocolo http
const cors = require('cors');

//import da biblioteca do body-parser que irá manipular os corpos das requisisões do protocolo http
const bodyParser = require('body-parser');
const { request } = require('express');

//Cria um objeto chamado app que será especialista nas funções do express
const app = express();

//importe da funcao que lista os estados
const { getListEstados, getEstado } = require('./modulo/estados.js');
const {getCidades} = require('./modulo/cidades.js')

// request - Receber dados
// response - Devolve dados
app.use((request, response, next) => {
    //header - contém permissão / segurança
    //body - dados(JSON)
    //Permite especificar quem serao os IP's que podem acessar a API (no caso (* == significa todos))
    response.header('Acess-Control-Allow-Origin', '*')
    //Permite especificar quais serao os verbos (metodos) que API irá reconhecer 
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //Estabelece que as opcoes acima serao respresentadas pelo cors
    app.use(cors());

    next();
});

//EndPoint: Listagem de estados
app.get('/estados', cors(), async function (request, response, next) {
    //Recebe o array de estados
    let estados = getListEstados();
    //Cria uma variavel do tipo JSON
    let estadosJSON = {};
    if (estados) 
    {
        //Criamos uma chave chamada uf para recebeber o array de estados
        estadosJSON.uf = estados;
        response.status(200);
        response.json(estadosJSON);
    }else{
        response.status(404);
        response.json('{message : "Nenhum item encontrado"}');
    }

});

//Endpoint: Busca estados pela sigla
app.get('/estado/:sigla', cors(), async function(request, response, next){
    //Recebe a sigla enviada por parametro no EndPoint
    let sigla = request.params.sigla;
    //Chama a funcao que vai localizar o estado solicitado
    let estado = getEstado(sigla);

    if(estado)
    {
        response.status(200);
        response.json(estado);
    }else
    {
        response.status(404);
    }
    
});

//EndPoint: Listagem de cidades
app.get('/cidades/:sigla', cors(), async function (request, response, next) {
    let sigla = request.params.sigla;
    let cidades = getCidades(sigla);
    let cidadesJSON = {};

    if (cidades) {
        cidadesJSON.city = cidades;
        response.status(200);
        response.json(cidadesJSON);
    }else{
        response.status(404);
    }
});

//Para que os EndPoints possam estar funcionando, precisamos obrigatoriamente finalizar
//a API essa function, que representa o start da API
app.listen(3030, function () {
    console.log('Servidor aguardando requisicoes');
})