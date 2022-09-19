
var cursos = [
    {
        "nome": "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla": "DS",
        "icone": "https://image.shutterstock.com/image-vector/api-interface-vector-icon-600w-659203513.jpg",
        "carga": "1200",
    },
    {
        "nome": "002 - Técnico em Redes de Computadores",
        "sigla": "RDS",
        "icone": "https://img.icons8.com/ultraviolet/344/thin-client.png",
        "carga": "1200"
    }
];

const getCursos = () => {
    let listaCursos = [];

    cursos.forEach(item => {
        listaCursos.push(
            {
                nome: item.nome,
                sigla: item.sigla,
                icone: item.icone,
                carga: item.carga
            }
        )
    })
    return listaCursos
}

const getCursosByName = (id) => {
    let nomeCurso = id;
    let listaDosCursos = []

    cursos.forEach(item => {
        if (item.nome.toLowerCase().includes(nomeCurso.toLowerCase())) {
            let curso = {}

            curso.nome = item.nome
            curso.sigla = item.sigla
            curso.carga = item.carga
            curso.icone = item.icone

            listaDosCursos.push(curso)
        }
    })
    return listaDosCursos
}

module.exports = {
    getCursos, getCursosByName
}

console.log(getCursosByName('Desenvolvimento'));