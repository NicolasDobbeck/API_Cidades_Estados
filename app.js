//import da biblioteca do express
const express =  require('express')

//import da biblioteca do cors
const cors = require('cors')

//import da biblioteca do body-parser
const bodyParser = require('body-parser')

//import das funcoes utilizadas
const {alunosFilter, getAlunos, getAlunoCurso, getAlunoDisciplina, alunoAno} = require('./alunos.js');
const {getCursos} = require('./module/cursos.js');

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

//EndPoint: Busca aluno pela matricula
app.get('/aluno/:matricula', cors(), async function(request, response, next){
    let matricula = request.params.matricula;
    let aluno = alunosFilter(matricula);
    let alunoDescricao = {}

    if (aluno) {
        alunoDescricao.alunoInfo = aluno;
        response.status(200);
        response.json(aluno);
    }else{
        response.status(404);
    }
})

//Endpoint: Mostra todos os alunos 
app.get('/alunos', cors(), async function(request, response, next){
    let alunos = getAlunos();
    let jsonAlunos = {}

    if (alunos) {
        jsonAlunos.alunos = alunos
        response.status(200);
        response.json(alunos);
    }else{
        response.status(404);
    
    }
    
})

app.get('/disciplinas/:matricula', cors(), async function(request, response, next){
    let id = request.params.matricula;
    
})

app.get('/cursos', cors(), async function(request, response, next){
    let cursos = getCursos();
    let jsonCursos = {};
    
    if (cursos) {
        jsonCursos.cursos = cursos;
        response.status(200)
        response.json(jsonCursos)
    }else[
        response.status(404)
    ]
})


app.listen(3030, function(){
    console.log('Servidor aguardando requisicoes');
})