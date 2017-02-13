var fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    configFile = __dirname + '/config/modules.json',
    appPort = 8080

//
//  Express Configurations
//
//  app.disable('x-powered-by')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//
//  CORS for APIs
//
CORS = function (req,res,next) {
    res.header("X-Powered-By","NodeJS")
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Api-Key, User')
    next()
}
app.use(CORS)

//
//  Load Routes/Modules
//
function modLoader(configFile) {
    modules = JSON.parse(fs.readFileSync(configFile))
    for (var key in modules) {
        console.log("Loading Module => " + key)
        app.use('/' + key, require('./routes/' + key))
    }
}
modLoader(configFile)

fs.watchFile(configFile, function(curr, prev) {
    if (prev.mtime.toString() !== curr.mtime.toString()) {
        modLoader(configFile)
    }
});

//
//  Get Mavigation
//
function getNav() {
    navString = '[ <a href="/">/</a> ] '
    nav = JSON.parse(fs.readFileSync(configFile))
    for (var key in nav) {
        navString += "[ <a href='" + key + "'>" + nav[key] + "</a> ] "
    }
    return navString
}

//
//  Simple Template Engine
//
var debugString = ' -- undefined -- '
app.engine('shtml', function(filePath, options, callback) {
    fs.readFile(filePath, function(err, content) {
        if (err) return callback(new Error(err))
        var rendered = content.toString()
            .replace(/#navigation#/g, getNav() || debugString)
            .replace(/#title#/g, options.title || debugString)
            .replace(/#content#/g, options.content || debugString)
            .replace(/#code#/g, options.code || debugString)
            .replace(/#status#/g, options.status || debugString)
            .replace(/#message#/g, options.message || debugString)
            .replace(/#error#/g, options.error || debugString)
        return callback(null, rendered)
    })
})
app.set('views', './views')
app.set('view engine', 'shtml')

//
//  Routes
//
app.use('/', require('./routes/index'))

//
//  Catch 404 and forward to Error Handler
//
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

//
//  Error Handler
//
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', { status: err.status || 500, message: err, error: err.stack })
});

//
//  Start Server
//
app.listen(appPort, function() {
    console.log("INFO:", new Date(), ": Listening on port " + appPort)
})
