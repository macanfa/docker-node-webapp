var router = require('express').Router(),
    fs = require('fs')

router.get('/', function(req, res) {
    res.render('index', {
        title: 'Willkommen',
        content: 'NodeJS, ExpressJS & Template Engine',
        code: fs.readFileSync('./README.md', 'utf8')
    })
})

module.exports = router