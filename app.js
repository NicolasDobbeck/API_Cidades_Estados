//import da biblioteca do express
const express =  require('express')

//import da biblioteca do cors
const cors = require('cors')

//import da biblioteca do body-parser
const bodyParser = require('body-parser')

//Criando o objeto app
const app = express();

//import das funcoes utilizadas
const {alunosFilter, getAlunos, getAlunoCurso, getAlunoDisciplina, alunoAno} = require('./module/alunos.js');
const {getCursos, getCursosByName} = require('./module/cursos.js');
const { response } = require('express');

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

//EndPoint: Busca aluno pela matricula // status: Funcionando
app.get('/aluno/:matriculaAluno', cors(), async function(request, response, next){
    let id = request.params.matriculaAluno;
    let aluno = alunosFilter(id);
    let alunoDescricao = {}

    if (aluno) {
        alunoDescricao.alunoInfo = aluno;
        response.status(200);
        response.json(alunoDescricao);
    }else{
        response.status(404);
    }
})

//Endpoint: Mostra todos os alunos // status: Funcionando
app.get('/alunos', cors(), async function(request, response, next){
    let alunos = getAlunos();
    let jsonAlunos = {}

    if (alunos) {
        jsonAlunos.alunos = alunos
        response.status(200);
        response.json(jsonAlunos);
    }else{
        response.status(404);
    
    }
    
})

//EndPoint: Mostra todas as informacoes do curso do aluno // Funcionando
app.get('/disciplinas/:matriculaAluno', cors(), async function(request, response, next){
    let id = request.params.matriculaAluno;
    let aluno = getAlunoCurso(id);
    let alunoInfoCurso = {}

    if (aluno) {
        alunoInfoCurso.aluno = aluno
        response.status(200)
        response.json(alunoInfoCurso)
    }else{
        response.status(404)
    }
    
})

//EndPoint: Filtra os alunos pelo Curso // status
app.get('/disciplina/:disciplinaAluno', cors(), async function(request, response, next){
    let id = request.params.disciplinaAluno;
    let disciplina = getAlunoDisciplina(id);
    let infoDisciplina = {}

    if (disciplina) {
        infoDisciplina.disciplina = disciplina
        response.status(200)
        response.json(infoDisciplina)
    }else{
        response.status(404)
    }
})

//EndPoint: Filtra alunos pelo ano
app.get('/conclusao/:anoDeConclusao', cors(), async function(request, response, next){
    let id = request.params.anoDeConclusao;
    let ano = alunoAno(id);
    let jsonAno = {};

    if (ano) {
        jsonAno.ano = ano;
        response.status(200)
        response.json(jsonAno)
    }else{
        response.status(404)
    }
})

//EndPoint: Mostra todos os cursos // status: funcionando
app.get('/cursos', cors(), async function(request, response, next){
    let cursos = getCursos();
    let jsonCursos = {};
    
    if (cursos) {
        jsonCursos.cursos = cursos;
        response.status(200)
        response.json(jsonCursos)
    }else{
        response.status(404)
    }
        
    
})

app.get('/curso/:nomeCurso', cors(), async function(request, response, next){
    let id = request.params.nomeCurso
    let cursos = getCursosByName(id)
    let jsonCursosNomes = {}

    if (cursos) {
        jsonCursosNomes.cursos = cursos
        response.status(200)
        response.json(jsonCursosNomes)
    }else{
        response.status(404)
    }
})


app.listen(3030, function(){
    console.log('Servidor aguardando requisicoes');
})