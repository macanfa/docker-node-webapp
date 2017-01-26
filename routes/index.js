var router = require('express').Router()

router.get('/', function(req, res) {
    res.render('index', {
        title: 'Willkommen',
        content: 'NodeJS, ExpressJS & Template Engine',
        code: '--- Running PID:' + process.pid + ' ---'
    })
})

module.exports = router