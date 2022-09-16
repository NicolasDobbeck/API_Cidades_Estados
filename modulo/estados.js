/**********************************************************************
 * Objetivo: Obter uma lista de estados
 * Autor: Nicolas Dobbeck Mendes 
 * Data de Criação: 04/ 08/2022
 * Data de modificação: 
 * O que foi modificado:
 * Versão: 1.0
 *********************************************************************/

//Simulando o resultado de uma API
var estados = [
    {
        sigla: 'SP',
        nome: 'São Paulo'
    },
    {
        sigla: 'AC',
        nome: 'Acre'
    },
    {
        sigla: 'BA',
        nome: 'Bahia'
    },
    {
        sigla: 'RJ',
        nome: 'Rio de Janeiro'
    },
    {
        sigla: 'CE',
        nome: 'Ceará'
    },
    {
        sigla: 'MG',
        nome: 'Minas Gerais'
    },
    {
        sigla: 'GO',
        nome: 'Goias'
    },
    {
        sigla: 'SC',
        nome: 'Santa Catarina'
    }
]

//Retorna todos os estados pela sigla
const getListEstados = function () {
    let listaEstados = []
    let erro = true

    estados.forEach(item => {
        listaEstados.push(item.sigla)
        erro = false
    })
    if (erro) {
        return false
    } else {
        //Converte um array para JSON
        return listaEstados;
    }
}

//retorna os dados de um estado tendo como base a sigla
const getEstado = function (siglaEstado) {
    let sigla = siglaEstado
    //Cria um objeto do tipo JSON
    let estado = {}
    let erro = true

    if (typeof(sigla) != 'undefined') 
    {
        //Tratamento para validacao de sigla vazia e diferenca de caracteres 
        if (sigla != '' && sigla.length == 2) {
            estados.forEach(item => {
                //Localiza um item no array (indexOf())
                if (item.sigla.indexOf(sigla.toUpperCase()) == 0) {
                    //Criamos as chaves uf e descricao para nviar pelo JSON
                    estado.uf = item.sigla,
                    estado.descricao = item.nome
                    erro = false
                }
            })
        }
    }
    if (erro) {
        return false
    } else {
        return estado
    }
}



module.exports = {
    getListEstados, 
    getEstado
}