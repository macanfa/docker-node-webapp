var router = require('express').Router()

router.get('/', function(req, res) {
    res.render('api', {
        title: 'RestFul API',
        code: 'Webservice RestFul API'
    })
})
router.post('/', function(req, res) {
    response(req, res)
})
router.get('/id/:id', function(req, res) {
    response(req, res)
})
router.put('/id/:id', function(req, res) {
    response(req, res)
})
router.delete('/id/:id', function(req, res) {
    response(req, res)
})
module.exports = router

function response(req, res) {
    res.json({ method: req.method, id: req.params.id, body: req.body })
}