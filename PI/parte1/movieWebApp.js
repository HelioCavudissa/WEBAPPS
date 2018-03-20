'use strict'

const http = require('http')
const url = require('url')
const fs = require('fs')
const hbs = require('handlebars')
const mov = require('./movieService')()
const port = 3000

/**
 * Init HTTP server
 */
const server = http.createServer(router)
server.listen(port)

/**
 * Endpoints paths
 */
const routes = [
    {
        action: (cb) => cb(null, ''),
        paramHandler: handleParametersWithoutQuery('/'),
        view: view('./views/homeView.hbs')
    },
    {
        action: mov.searchMovies,
        paramHandler: handleParametersWithQuery('/search?name=*&page=*'),
        view: view('./views/searchView.hbs')
    },
    {
        action: mov.getMovie,
        paramHandler: handleParametersWithoutQuery('/movies/:id'),
        view: view('./views/movieView.hbs')
    },
    {
        action: mov.getActor,
        paramHandler: handleParametersWithoutQuery('/actors/:id'),
        view: view('./views/actorView.hbs')
    },
]

hbs.registerPartial('layout', fs.readFileSync('./views/partials/layout.hbs').toString())

function router(req, resp) {
    if(req.url.indexOf('.css') > 0 || req.url.indexOf('favicon') > 0) {
        return readCss(req.url, resp)
    }
    let parameters
    const route = routes.find(r => (parameters = r.paramHandler(req.url)) != undefined)
    if(route != undefined) {
        parameters.push(actionCallback(resp, route.view))
        route.action.apply(this, parameters)
    } else {
        resp.statusCode = 404 // Resource Not Found
        resp.end()
    }
}

/*
 * 2. Representação: Obter uma String com a representação HTML do recurso.
 * 3. Envio da resposta: statusCode 200 + setHeader() + end()
 */
function actionCallback(resp, view) {
    return (err, obj) => {
        let data
        if(err) {
            data = err.message
            resp.statusCode = 500
        } else {
            data =  view(obj)
            resp.statusCode = 200
        }
        resp.setHeader('Content-Type', 'text/html')
        resp.end(data)
    }
}

function readCss(path, resp) {
    const file = path.substring(path.indexOf('p'))
    fs.readFile(file, (err, data) => {
        if(err)  {
            data = err.message
            resp.statusCode = 500
        } else {
            //data = data.toString()
            resp.statusCode = 200
        }
        resp.end(data)
    })
}


/**
 * Returns template Handlebars.
 * 
 * @param {*} viewPath Path for handlebars template source.
 */
function view(viewPath) {
    const viewSrc = fs.readFileSync(viewPath).toString()
    return hbs.compile(viewSrc)
}

function handleParametersWithoutQuery(urlTemplate) {
    return function(url) {

        let splitUrl = url.substring(1).split('/')
        let splitTemplate = urlTemplate.substring(1).split('/')
        if(splitUrl.length != splitTemplate.length) return;

        let params = []
        for(let idx in splitTemplate) {
            if(splitTemplate[idx].charAt(0) == ':')
                params.push(splitUrl[idx])
            else if(splitUrl[idx] != splitTemplate[idx])    
                return;
        }
        return params
    }
}

function handleParametersWithQuery(urlTemplate) {
    return function(url) {

        let splitUrl = url.substring(1).split('?')
        let splitTemplate = urlTemplate.substring(1).split('?')
        if(splitUrl[0] != splitTemplate[0]) return;

        let urlQuery = splitUrl[1].split('&').map(q => q.split('='))
        let tempQuery = splitTemplate[1].split('&').map(q => q.split('='))
        let params = []

        for(let idx in splitTemplate) {
            if(urlQuery[idx][0] == tempQuery[idx][0])
                params.push(urlQuery[idx][1])
            else
                return;
        }
        return params
    }
}
